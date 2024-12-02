import Local from '../Models/local.model.js';
import LocalValidation from '../Validations/local.validation.js';
import { HOST, PORT } from '../Config/configEnv.js';
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
    try {
        let archivoURL = null;

        if (req.file) {
            const imagen = req.file.filename;
            archivoURL = `http://${HOST}:${PORT}/api/src/Upload/` + imagen;
        }

        let parsedSchedule = [];
        if (req.body.schedule) {
            try {
                parsedSchedule = JSON.parse(req.body.schedule);
                if (!Array.isArray(parsedSchedule)) {
                    throw new Error('"schedule" debe ser un array');
                }
            } catch (err) {
                return res.status(400).json({ error: '"schedule" debe ser un array válido en formato JSON' });
            }
        }

        const nuevoLocal = {
            name: req.body.name,
            address: req.body.address,
            description: req.body.description,
            image: archivoURL,
            schedule: parsedSchedule,
        };

        const { error } = LocalValidation(nuevoLocal);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const completedSchedule = DAYS_OF_WEEK.map(day => {
            const existingDay = Array.isArray(nuevoLocal.schedule)
                ? nuevoLocal.schedule.find(s => s.day === day)
                : null;
            return existingDay || { day, isOpen: false };
        });
        nuevoLocal.schedule = completedSchedule;

        const newLocal = new Local(nuevoLocal);
        const localGuardado = await newLocal.save();

        res.status(201).json({
            message: 'Local creado exitosamente',
            local: localGuardado,
        });
    } catch (error) {
        console.error(error);
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