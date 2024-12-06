import etiqueta from '../Models/etiqueta.model.js';
import { createEtiquetaSchema } from '../Validations/etiqueta.validation.js';

export const createEtiqueta = async (req, res) => {
    try {
        const { nombre } = req.body;

        // Validación de datos
        const { error } = createEtiquetaSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Comprobación de duplicados
        const etiquetaExistente = await etiqueta.findOne({ nombre });
        if (etiquetaExistente) {
            return res.status(400).json({ message: "La etiqueta ya existe." });
        }

        // Creación de nueva etiqueta
        const newEtiqueta = new etiqueta({
            nombre,
            estado: false,
        });

        const etiquetaSaved = await newEtiqueta.save();
        res.status(201).json(etiquetaSaved);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};


export const getEtiquetas = async (req, res) => {
    try {
        const etiquetas = await etiqueta.find();
        res.status(200).json(etiquetas);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

export const getEtiqueta = async (req, res) => {
    try {
       const { nombre } = req.params;
       const etiquetaFound = await etiqueta.findOne({ nombre });
       if (!etiquetaFound) {
        return res.status(200).json({ message: "Etiqueta no encontrada" });
    }
       res.status(200).json(etiquetaFound);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const deleteEtiqueta = async (req, res) => {
    try {
        const { nombre } = req.params;
        const etiquetaFound = await etiqueta.findOneAndDelete({ nombre });
        if (!etiquetaFound) {
            return res.status(204).json();
        }
        return res.status(200).json({ message: "Etiqueta eliminada exitosamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const updateEtiqueta = async (req, res) => {
    try {
        const updateEtiqueta = await etiqueta.findByIdAndUpdate(req.params.nombre, req.body, {
            new: true
        });
        if (!updateEtiqueta) return res.status(204).json();
        res.json(updateEtiqueta);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};