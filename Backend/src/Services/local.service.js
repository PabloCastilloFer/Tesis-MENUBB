import Local from "../Models/local.model.js";
import { HOST, PORT } from '../Config/configEnv.js';
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

class LocalService {
  /**
   * Crear un nuevo local
   * @param {Object} data - Datos del local
   * @returns {Object} - Local creado
   */
  static async createLocal(data) {
    try {
      // Verificar si el nombre del local ya está registrado
      const existingLocal = await Local.findOne({ name: data.name });
      if (existingLocal) {
        throw { status: 400, message: "El nombre del local ya está registrado." };
      }

      // Crear y guardar el local
      const newLocal = new Local(data);
      const savedLocal = await newLocal.save();

      console.log("Local guardado exitosamente:", savedLocal);

      return {
        id: savedLocal._id,
        name: savedLocal.name,
        address: savedLocal.address,
        accessibility: savedLocal.accessibility,
        schedule: savedLocal.schedule,
        image: savedLocal.image,
      };
    } catch (error) {
      console.error("Error en createLocal del servicio:", error);
      throw {
        status: error.status || 500,
        message: error.message || "Error al guardar el local.",
      };
    }
  }


  /**
   * Obtener todos los locales con datos específicos
   * @returns {Array} - Lista de locales
   */
  static async getAllLocalsData() {
    try {
      const locals = await Local.find();
      return locals.map((local) => ({
        id: local._id,
        name: local.name,
        image: local.image,
      }));
    } catch (error) {
      throw { status: 500, message: "Error al obtener los locales." };
    }
  }

  /**
   * Obtener todos los locales
   * @returns {Array} - Lista de locales
   */
  static async getAllLocals() {
    try {
      const locals = await Local.find();
      return locals.map((local) => ({
        id: local._id,
        name: local.name,
        address: local.address,
        accessibility: local.accessibility,
        image: local.image,
        schedule: local.schedule,
      }));
    } catch (error) {
      throw { status: 500, message: "Error al obtener los locales." };
    }
  }

  /**
   * Obtener un local por ID
   * @param {String} id - ID del local
   * @returns {Object} - Local encontrado
   */
  static async getLocalById(id) {
    try {
      const local = await Local.findById(id);
      if (!local) {
        throw { status: 404, message: "Local no encontrado." };
      }
      return {
        id: local._id,
        name: local.name,
        address: local.address,
        accessibility: local.accessibility,
        image: local.image,
        schedule: local.schedule,
      };
    } catch (error) {
      throw { status: error.status || 500, message: error.message || "Error al obtener el local." };
    }
  }

/**
 * Obtener mi local (asociado al token)
 * @param {String} token - Token de acceso
 * @returns {Object} - Local encontrado
 */
static async getMyLocal(token) {
  try {
    // Decodificar el token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Verificar que el payload contiene un local
    if (!decoded.local) {
      throw { status: 403, message: "No tienes un local asociado." };
    }

    // Validar que el ID del local sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(decoded.local)) {
      throw { status: 400, message: "ID de local no válido." };
    }

    // Buscar el local por ID
    const local = await Local.findById(decoded.local);
    if (!local) {
      throw { status: 404, message: "Local no encontrado." };
    }

    return {
      id: local._id,
      name: local.name,
      address: local.address,
      accessibility: local.accessibility,
      image: local.image,
      schedule: local.schedule,
    };
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || "Error al obtener tu local.",
    };
  }
}

/**
 * Actualizar el horario de un local por ID
 * @param {String} id - ID del local
 * @param {Object} data - Datos a actualizar
 * @returns {Object} - Local actualizado
 */
static async updateLocalSchedule(id, data) {
  try {
    const { schedule } = data;

    // Validar que el campo 'schedule' exista y sea un array
    if (!Array.isArray(schedule)) {
      throw { status: 400, message: "El horario debe ser un array válido." };
    }

    // Validar que los datos del horario sean correctos
    const validDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    for (const item of schedule) {
      if (
        !item.day ||
        !validDays.includes(item.day) ||
        typeof item.isOpen !== 'boolean' ||
        (item.isOpen && (!item.open || !item.close))
      ) {
        throw { status: 400, message: "El formato del horario es inválido." };
      }
    }

    // Actualizar el horario del local
    const updatedLocal = await Local.findByIdAndUpdate(
      id,
      { schedule },
      { new: true } // Retornar el documento actualizado
    );

    if (!updatedLocal) {
      throw { status: 404, message: "Local no encontrado." };
    }

    return {
      id: updatedLocal._id,
      name: updatedLocal.name,
      address: updatedLocal.address,
      accessibility: updatedLocal.accessibility,
      image: updatedLocal.image,
      schedule: updatedLocal.schedule,
    };
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || "Error al actualizar el horario del local.",
    };
  }
}

  /**
   * Actualizar un local por ID
   * @param {String} id - ID del local
   * @param {Object} data - Datos a actualizar
   * @returns {Object} - Local actualizado
   */
  static async updateLocal(id, data) {
    try {
      const { name, address, accessibility, image, schedule } = data;

      // Actualizar el local
      const updatedLocal = await Local.findByIdAndUpdate(
        id,
        {
          name,
          address,
          accessibility,
          image,
          schedule,
        },
        { new: true }
      );

      if (!updatedLocal) {
        throw { status: 404, message: "Local no encontrado." };
      }

      return {
        id: updatedLocal._id,
        name: updatedLocal.name,
        address: updatedLocal.address,
        accessibility: updatedLocal.accessibility,
        image: updatedLocal.image,
        schedule: updatedLocal.schedule,
      };
    } catch (error) {
      throw { status: error.status || 500, message: error.message || "Error al actualizar el local." };
    }
  }

  /**
   * Eliminar un local por ID
   * @param {String} id - ID del local
   * @returns {Object} - Mensaje de éxito
   */
  static async deleteLocal(id) {
    try {
      const deletedLocal = await Local.findByIdAndDelete(id);
      if (!deletedLocal) {
        throw { status: 404, message: "Local no encontrado." };
      }

      return { message: "Local eliminado exitosamente." };
    } catch (error) {
      throw { status: error.status || 500, message: error.message || "Error al eliminar el local." };
    }
  }
}


export default LocalService;