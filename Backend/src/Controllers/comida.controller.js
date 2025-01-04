import comida from '../Models/comida.model.js';
import { crearComidaSchema } from '../Validations/comida.validation.js';
import { HOST, PORT } from '../Config/configEnv.js';
import User from '../Models/user.model.js';
import Local from '../Models/local.model.js'; // Importa el modelo de Local
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import ComidaService from '../Services/comida.service.js';

export const createComida = async (req, res) => {
    try {
        const { nombreComida } = req.body;
        let archivoURL = null;

        // Verifica si hay un archivo subido
        if (req.file) {
            const imagen = req.file.filename;
            archivoURL = `http://${HOST}:${PORT}/api/src/Upload/` + imagen;
        }

        // Obtener el ID del usuario autenticado
        const userId = req.user.id; // Suponiendo que el middleware añade req.user
        const user = await User.findById(userId).populate('local');

        if (!user || !user.local) {
            return res.status(400).json({ message: "El usuario no tiene un local asociado." });
        }

        // Obtener el local utilizando el ID
        const local = await Local.findById(user.local._id);

        if (!local) {
            return res.status(400).json({ message: "El local asociado no existe." });
        }

        const nuevaComida = {
            nombreComida: req.body.nombreComida,
            precio: req.body.precio,
            calorias: req.body.calorias || null,
            proteinas: req.body.proteinas || null,
            lipidos: req.body.lipidos || null,
            carbohidratos: req.body.carbohidratos || null,
            imagen: archivoURL,
            estado: false,
            local: local._id, // Asignar el ID del local, no su nombre
        };

        // Reemplazar valores nulos por "Información no proporcionada"
        Object.keys(nuevaComida).forEach((key) => {
            if (nuevaComida[key] === null || nuevaComida[key] === undefined) {
                nuevaComida[key] = "Información no proporcionada";
            }
        });

        // Comprobación de duplicados considerando nombre y local
        const comidaExistente = await comida.findOne({ 
            nombreComida, 
            local: local._id // Compara el nombre y el local
        });

        if (comidaExistente) {
            return res.status(400).json({ message: "La comida ya existe en este local." });
        }

        // Validación con Joi
        const { error } = crearComidaSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Guardar en la base de datos
        const newComida = new comida(nuevaComida);
        const comidaGuardada = await newComida.save();

        res.status(201).json({
            message: "Comida creada exitosamente",
            comida: comidaGuardada
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al crear la comida." });
    }
};




export const getComidas = async (req, res) => {
    try {
        const comidas = await comida.find();
        if (comidas.length === 0) {
            return res.status(200).json({ message: "No hay comidas registradas" });
        }
        res.status(200).json(comidas);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getComida = async (req, res) => {
    const { id } = req.params;
    try {
        const comidaEncontrada = await comida.findById(id);
        if (!comidaEncontrada) {
            return res.status(200).json({ message: "Comida no encontrada" });
        }
        res.status(200).json(comidaEncontrada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateComida = async (req, res) => {
    const { id } = req.params;
    try {
        const comidaModificada = await comida.findOne({ _id: id });
        if (!comidaModificada) {
            return res.status(404).json({ message: "Comida no encontrada" });
        }

        const imagen = req.file ? req.file.filename : comidaModificada.imagen.split('/').pop();
        const URL = `http://${HOST}:${PORT}/api/src/Upload/`;

        const updateComida = {
            nombreComida: req.body.nombreComida || comidaModificada.nombreComida,
            precio: req.body.precio || comidaModificada.precio,
            calorias: req.body.calorias || comidaModificada.calorias,
            proteinas: req.body.proteinas || comidaModificada.proteinas,
            lipidos: req.body.lipidos || comidaModificada.lipidos,
            carbohidratos: req.body.carbohidratos || comidaModificada.carbohidratos,
            imagen: req.file ? URL + imagen : comidaModificada.imagen,
            estado: req.body.estado !== undefined ? req.body.estado : comidaModificada.estado
        };

        const { error } = updateComidaSchema.validate(updateComida);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        Object.assign(comidaModificada, updateComida);
        console.log(comidaModificada);
        const comidaActualizada = await comidaModificada.save();
        res.status(200).json({
            message: "Comida actualizada exitosamente!",
            comida: comidaActualizada
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteComida = async (req, res) => {
    try {
        const { id } = req.params;
        const comidaEliminada = await comida.findOneAndDelete({ _id: id });
        if (!comidaEliminada) {
            return res.status(404).json({ message: "Comida no encontrada" });
        }
        return res.status(200).json({ message: "Comida eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Obtener las comidas del local
 */

export const getComidasLocal = async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
      // Validar que el ID del local sea un ObjectId válido
      if (!decoded.local || !mongoose.Types.ObjectId.isValid(decoded.local)) {
        return res.status(400).json({ message: "ID de local no válido." });
      }
  
      // Obtener las comidas del local desde el servicio
      const comidas = await ComidaService.getComidasByLocal(token);
  
      res.status(200).json(comidas);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  };
  
  export const getComidasLocalUser = async (req, res) => {
    try {
        // Obtén el ID del local desde los parámetros de la URL
        const localId = req.params.localId;

        // Verifica si el ID del local es válido
        if (!localId) {
            return res.status(400).json({ message: 'El ID del local es obligatorio' });
        }

        // Encuentra las comidas asociadas al local
        const comidas = await comida.find({ local: localId });

        // Si no se encuentran comidas, responde con un mensaje
        if (comidas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron comidas para este local' });
        }

        // Responde con las comidas encontradas
        res.status(200).json(comidas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las comidas del local' });
    }
};

  