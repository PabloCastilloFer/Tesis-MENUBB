import comida from '../Models/comida.model.js';
import { crearComidaSchema } from '../Validations/comida.validation.js';
import { HOST, PORT } from '../Config/configEnv.js';
import User from '../Models/user.model.js';
import Local from '../Models/local.model.js'; // Importa el modelo de Local

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

        // Comprobación de duplicados
        const comidaExistente = await comida.findOne({ nombreComida });
        if (comidaExistente) {
            return res.status(400).json({ message: "La comida ya existe." });
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
