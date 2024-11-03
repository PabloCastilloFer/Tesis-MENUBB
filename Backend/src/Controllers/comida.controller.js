
import comida from '../Models/comida.model.js';
import { crearComidaSchema } from '../Validations/comida.validation.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';


//falta asociar una comida a un local
export const createComida = async (req, res) => {
    try {
        let archivoURL = null;

        if (req.file) {
            const imagen = req.file.filename;
            archivoURL = archivoURL = `http://localhost:3000/api/src/Upload/` + imagen;
        }

        const nuevaComida = {
            nombreComida: req.body.nombreComida,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            imagen: archivoURL,
            estado: false // al momento de crear una comida la ponemos en false para no mostrarla en pantalla de los usuarios
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
    const { nombreComida } = req.params;
    try {
        const comidaEncontrada = await comida.findOne({ nombreComida });
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
        const comidaActual = req.params.nombreComida;
        const comidaModificada = await comida.findOneAndUpdate({ nombreComida: comidaActual });
        if (!comidaModificada) {
            return res.status(200).json({ message: "Comida no encontrada" });
        }

        const imagen = req.file ? req.file.filename : comidaModificada.imagen.split('/').pop();
        const URL = `http://localhost:3000/api/src/Upload/`

        const updateComida = {
            nombreComida: req.body.nombreComida || comidaModificada.nombreComida,
            precio: req.body.precio || comidaModificada.precio,
            descripcion: req.body.descripcion || comidaModificada.descripcion,
            imagen: req.file ? URL + imagen : comidaModificada.imagen || comidaModificada.imagen,
            estado: req.body.estado
        };

        const { error } = crearComidaSchema.validate(updateComida);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        comidaModificada.nombreComida = updateComida.nombreComida;
        comidaModificada.precio = updateComida.precio;
        comidaModificada.descripcion = updateComida.descripcion;
        comidaModificada.imagen = updateComida.imagen;
        comidaModificada.estado = updateComida.estado;

        const comidaActualizada = await comidaModificada.save();
        res.status(200).json({
            message: "Comida actualizada exitosamente!",
            comida: comidaActualizada
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteComida = async (req, res) => {
    try {
        const { nombreComida } = req.params;
        const comidaEliminada = await comida.findOneAndDelete({ nombreComida: nombreComida });
        res.status(200).json({
            message: "Comida eliminada exitosamente",
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
