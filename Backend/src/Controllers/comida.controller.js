
import comida from '../Models/comida.model.js';
import { crearComidaSchema } from '../Validations/comida.validation.js';
import { HOST, PORT } from '../Config/configEnv.js';

export const createComida = async (req, res) => {
    try {
        let archivoURL = null;

        if (req.file) {
            const imagen = req.file.filename;
            archivoURL = archivoURL = `http://${HOST}:${PORT}/api/src/Upload/` + imagen;
        }

        const nuevaComida = {
            nombreComida: req.body.nombreComida,
            precio: req.body.precio,
            calorias: req.body.calorias,
            proteinas: req.body.proteinas,
            lipidos: req.body.lipidos,
            carbohidratos: req.body.carbohidratos,
            imagen: archivoURL,
            estado: false
        };

const { error } = crearComidaSchema.validate(nuevaComida);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        const newComida = new comida(nuevaComida);
        const comidaGuardada = await newComida.save();

        res.status(201).json({
            message: "Comida creada exitosamente",
            comida: comidaGuardada
        });
    } catch (error) {
        console.log(error);
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
        const comidaEncontrada = await comida.findOne({ id });
        if (!comidaEncontrada) {
            return res.status(200).json({ message: "Comida no encontrada" });
        }
        res.status(200).json(comidaEncontrada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateComida = async (req, res) => {
    try {
        const comidaActual = req.params.id;
        const comidaModificada = await comida.findOne({ id: comidaActual });
        if (!comidaModificada) {
            return res.status(404).json({ message: "Comida no encontrada" });
        }

        const imagen = req.file ? req.file.filename : comidaModificada.imagen.split('/').pop();
        const URL = `http://localhost:3000/api/src/Upload/`;

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

        const { error } = crearComidaSchema.validate(updateComida);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        Object.assign(comidaModificada, updateComida);

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
        const comidaEliminada = await comida.findOneAndDelete({ id: id });
        res.status(200).json({
            message: "Comida eliminada exitosamente",
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
