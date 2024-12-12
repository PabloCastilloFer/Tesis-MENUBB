import Local from "../Models/local.model.js";

class LocalService {
  /**
   * Crear un nuevo local
   * @param {Object} data - Datos del local
   * @returns {Object} - Local creado
   */
  static async createLocal({ name, address, accessibility, image, schedule }) {
    // Verificar si el nombre ya está registrado
    const existingLocal = await Local.findOne({ name });
    if (existingLocal) {
      throw { status: 400, message: "El nombre del local ya está registrado." };
    }

    // Crear el nuevo local
    const newLocal = new Local({
      name,
      address,
      accessibility,
      image,
      schedule,
    });

    // Guardar en la base de datos
    const savedLocal = await newLocal.save();

    return {
      id: savedLocal._id,
      name: savedLocal.name,
      address: savedLocal.address,
      accessibility: savedLocal.accessibility,
      image: savedLocal.image,
      schedule: savedLocal.schedule,
    };
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