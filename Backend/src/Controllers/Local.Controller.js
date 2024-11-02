import Local from '../Models/Local.Model.js';
import LocalValidation from '../Validations/Local.Validation.js';
const DAYS_OF_WEEK = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export const getLocals = async (req, res) => {
    try {
        const locals = await Local.find();
        res.status(200).json(locals);
        if (!locals) {
            return res.status(404).send('No hay locales registrados');
        }
    } catch (error) {
        console.error('Error al obtener locales:', error);
        res.status(500).send({ message: 'Hubo un error al obtener locales' });
    }
};

export const getLocalById = async (req, res) => {
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

export const createLocal = async (req, res) => {
    const { error, value } = LocalValidation(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map(err => err.message) });
    }

    const completedSchedule = DAYS_OF_WEEK.map(day => {
        const existingDay = value.schedule.find(s => s.day === day);
        return existingDay || { day, isOpen: false };
    });

    try {
        const local = new Local({ ...value, schedule: completedSchedule });
        await local.save();
        res.status(201).json(local);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el local' });
    }
};

export const updateLocal = async (req, res) => {
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

export const deleteLocal = async (req, res) => {
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