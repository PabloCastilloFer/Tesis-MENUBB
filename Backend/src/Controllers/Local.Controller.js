import LocalService from '../Services/local.service.js';
import { respondSuccess, respondError } from '../Utils/resHandler.js';

/**
 * Obtener todos los locales
 */
export const getLocals = async (req, res) => {
  try {
    const locals = await LocalService.getAllLocals();
    return respondSuccess(req, res, 200, 'Locales obtenidos exitosamente.', locals);
  } catch (error) {
    return respondError(req, res, 500, error.message || 'Error al obtener locales.');
  }
};

/**
 * Obtener un local por ID
 */
export const getLocalById = async (req, res) => {
  try {
    const local = await LocalService.getLocalById(req.params.id);
    if (!local) {
      return respondError(req, res, 404, 'Local no encontrado.');
    }
    return respondSuccess(req, res, 200, 'Local obtenido exitosamente.', local);
  } catch (error) {
    return respondError(req, res, 500, error.message || 'Error al obtener el local.');
  }
};

/**
 * Crear un nuevo local
 */
const DEFAULT_SCHEDULE = [
  { day: 'Lunes', isOpen: false },
  { day: 'Martes', isOpen: false },
  { day: 'Miércoles', isOpen: false },
  { day: 'Jueves', isOpen: false },
  { day: 'Viernes', isOpen: false },
  { day: 'Sábado', isOpen: false },
  { day: 'Domingo', isOpen: false },
];

export const createLocal = async (req, res) => {
  try {
    if (!req.file) {
      return respondError(req, res, 400, 'La imagen es obligatoria.');
    }

    let { schedule } = req.body;

    // Función auxiliar para convertir el schedule a un array de objetos
    const parseSchedule = (scheduleString) => {
      try {
        return JSON.parse(scheduleString);
      } catch (error) {
        throw new Error('El horario debe ser una lista de objetos válida.');
      }
    };

    // Convertir el schedule si existe, de lo contrario asignar un array vacío
    schedule = schedule ? parseSchedule(schedule) : [];

    // Validar que el schedule es un array
    if (!Array.isArray(schedule)) {
      return respondError(req, res, 400, 'El horario debe ser un array de objetos.');
    }

    // Completar los días faltantes en el schedule con isOpen: false
    const completedSchedule = DEFAULT_SCHEDULE.map((defaultDay) => {
      const existingDay = schedule.find((item) => item.day === defaultDay.day);
      return existingDay || defaultDay;
    });

    // Construir el objeto localData
    const localData = {
      ...req.body,
      image: req.file.path,
      schedule: completedSchedule,
    };

    // Crear el nuevo local
    const newLocal = await LocalService.createLocal(localData);
    return respondSuccess(req, res, 201, 'Local creado exitosamente.', newLocal);
  } catch (error) {
    return respondError(req, res, 500, error.message || 'Error al crear el local.');
  }
};

/**
 * Actualizar un local por ID
 */
export const updateLocal = async (req, res) => {
    try {
      const updateData = { ...req.body };
      if (req.file) {
        updateData.image = req.file.path;
      }
  
      const updatedLocal = await LocalService.updateLocal(req.params.id, updateData);
      if (!updatedLocal) {
        return respondError(req, res, 404, 'Local no encontrado.');
      }
      return respondSuccess(req, res, 200, 'Local actualizado exitosamente.', updatedLocal);
    } catch (error) {
      return respondError(req, res, 500, error.message || 'Error al actualizar el local.');
    }
  };

/**
 * Eliminar un local por ID
 */
export const deleteLocal = async (req, res) => {
  try {
    const deletedLocal = await LocalService.deleteLocal(req.params.id);
    if (!deletedLocal) {
      return respondError(req, res, 404, 'Local no encontrado.');
    }
    return respondSuccess(req, res, 200, 'Local eliminado exitosamente.');
  } catch (error) {
    return respondError(req, res, 500, error.message || 'Error al eliminar el local.');
  }
};