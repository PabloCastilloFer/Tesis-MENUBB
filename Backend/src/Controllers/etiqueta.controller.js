import etiqueta from '../Models/etiqueta.model.js';
import comida from '../Models/comida.model.js';
import { createEtiquetaSchema } from '../Validations/etiqueta.validation.js';
import mongoose from 'mongoose';

export const createEtiqueta = async (req, res) => {
    try {
        const { nombre } = req.body;
        const { error } = createEtiquetaSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const etiquetaExistente = await etiqueta.findOne({ nombre });
        if (etiquetaExistente) {
            return res.status(400).json({ message: "La etiqueta ya existe." });
        }
        const newEtiqueta = new etiqueta({
            nombre,
            estado: false,
        });

        const etiquetaSaved = await newEtiqueta.save();
        res.status(201).json(etiquetaSaved);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Solo se puede asignar las etiquetas: vegano, vegetariano, celiaco, diabetico, hipertenso, hipotiroideo, hipoglucemico, hipercolesterolemico, hipertrigliceridemico, otro" });
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
            return res.status(404).json({ message: "Etiqueta no encontrada" });
        }
        return res.status(200).json({ message: "Etiqueta eliminada exitosamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const updateEtiqueta = async (req, res) => {
    try {
        const { nombre } = req.params;
        const etiquetaFound = await etiqueta.findOne({ nombre });
        if (!etiquetaFound) {
            return res.status(404).json({ message: "Etiqueta no encontrada" });
        }
        const etiquetaUpdated = await etiqueta.findOneAndUpdate({ nombre }, req.body, {
            new: true
        });
        res.status(200).json(etiquetaUpdated);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const asignarEtiqueta = async (req, res) => {
    try {
        const { idComida } = req.params;

        if (!mongoose.isValidObjectId(idComida)) {
            return res.status(400).json({ message: "El ID de la comida no es válido." });
        }

        const comidaExistente = await comida.findById(idComida);

        if (!comidaExistente) {
            return res.status(404).json({ message: "La comida no existe." });
        }
        const { etiquetas } = req.body;
        if (!etiquetas || !Array.isArray(etiquetas)) {
            return res.status(400).json({ message: "El campo etiquetas debe ser un array de IDs." });
        }
        const etiquetasDuplicadas = etiquetas.filter(
            etiquetaId => comidaExistente.etiquetas.includes(etiquetaId)
        );

        if (etiquetasDuplicadas.length > 0) {
            return res.status(400).json({
                message: `Esa etiqueta ya está asignada a esta comida.`
            });
        }
        comidaExistente.etiquetas = [...comidaExistente.etiquetas, ...etiquetas];
        await comidaExistente.save();

        res.status(200).json({
            message: "Etiquetas asignadas exitosamente.",
            comida: comidaExistente
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al asignar etiquetas." });
    }
};

export const desasignarEtiqueta = async (req, res) => {
    try {
        const { idComida } = req.params;
        const { etiquetas } = req.body;

        if (!etiquetas || !Array.isArray(etiquetas) || etiquetas.length === 0) {
            return res.status(400).json({ message: "Se debe proporcionar al menos una etiqueta." });
        }
        const idEtiqueta = etiquetas[0];
        if (!mongoose.Types.ObjectId.isValid(idEtiqueta)) {
            return res.status(400).json({ message: "El ID de la etiqueta no es válido." });
        }

        const comidaExistente = await comida.findById(idComida);
        if (!comidaExistente) {
            return res.status(404).json({ message: "La comida no existe." });
        }

        const etiquetaId = new mongoose.Types.ObjectId(idEtiqueta);
        if (!comidaExistente.etiquetas.some(etiqueta => etiqueta.equals(etiquetaId))) {
            return res.status(400).json({ message: "La etiqueta no está asignada a esta comida." });
        }

        comidaExistente.etiquetas = comidaExistente.etiquetas.filter(
            (etiqueta) => !etiqueta.equals(etiquetaId)
        );

        await comidaExistente.save();
        res.status(200).json({
            message: "Etiqueta desasignada exitosamente.",
            comida: comidaExistente
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al desasignar la etiqueta." });
    }
};
