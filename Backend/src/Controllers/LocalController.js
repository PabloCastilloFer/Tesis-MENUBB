const Local = require('../Models/Local.js');

exports.getLocals = async (req, res) => {
    try {
        const locals = await Local.find();
        res.status(200).json(locals);
        if (!locals) {
            return res.status(404).send('No hay locales registrados');
        }
    } catch (error) {
        console.error('Error al obtener locales:', error);
        res.status(500).send({ message: 'Hubo un error al obtener locales' });  // Usa res.status(500).send para errores
    }
};

exports.getLocalById = async (req, res) => {
    try {
        const local = await Local.findById(req.params.id);
        if (!local) {
            return res.status(404).send('Local no encontrado');
        }
        res.status(200).json(local);
    } catch (error) {
        res.status(500).send('Hubo un error al obtener el local', error);
    }
};

exports.createLocal = async (req, res) => {
    try {
        const { name, address, description, image, schedule } = req.body;

        const newLocal = new Local({
            name,
            address,
            description,
            image,
            schedule
        });

        const savedLocal = await newLocal.save();
        res.status(201).json(savedLocal);
    } catch (error) {
        console.error('Error al crear el local:', error);
        res.status(500).send('Hubo un error al crear el local', error);
    }
};

exports.updateLocal = async (req, res) => {
    try {
        const { id } = req.params;
        const { schedule } = req.body;

        const updatedLocal = await Local.findByIdAndUpdate(
            id,
            { schedule },
            { new: true }
        );

        if (!updatedLocal) {
            return res.status(404).send('Local no encontrado');
        }
        res.status(200).json_(this.updateLocal);
    } catch (error) {
        res.status(400).send('Hubo un error al actualizar el local', error);
    }
};

exports.deleteLocal = async (req, res) => {
    try {
        const deletedLocal = await Local.findByIdAndDelete(req.params.id);
        if (!deletedLocal) {
            return res.status(404).json({ message: 'Local no encontrado' });
        }
        res.status(200).json({ message: 'Local eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el local', error });
    }
};