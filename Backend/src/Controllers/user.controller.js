import UserService from "../Services/user.service.js";
import { respondSuccess, respondError } from "../Utils/resHandler.js";

/**
 * Crear un nuevo usuario
 * Requiere rol de administrador para asignar roles personalizados.
 */
export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    // Verificar si el usuario autenticado tiene rol de administrador
    if (!req.user || !req.user.roles.includes("admin")) {
      return respondError(req, res, 403, "No tienes permisos para realizar esta acción.");
    }

    // Llamar al servicio para crear el usuario
    const user = await UserService.createUser({ username, email, password, roles });

    return respondSuccess(req, res, 201, "Usuario creado exitosamente.", user);
  } catch (error) {
    return respondError(req, res, error.status || 500, error.message || "Error interno del servidor.");
  }
};

/**
 * Obtener todos los usuarios
 */
export const getUsers = async (req, res) => {
  try {

    // Verificar si el usuario autenticado tiene rol de administrador
    if (!req.user || !req.user.roles.includes("admin")) {
      return respondError(req, res, 403, "No tienes permisos para realizar esta acción.");
    }

    const users = await UserService.getUsers(); // Llama al servicio para obtener los usuarios

    if (!users || users.length === 0) {
      return respondSuccess(req, res, 200, "No se encontraron usuarios.");
    }

    return respondSuccess(req, res, 200, "Usuarios obtenidos exitosamente.", users); // Incluye los usuarios en 'data'
  } catch (error) {
    return respondError(req, res, 500, "Error interno del servidor.");
  }
};
/**
 * Obtener un usuario por ID
 */
export const getUserById = async (req, res) => {
  try {

    // Verificar si el usuario autenticado tiene rol de administrador
    if (!req.user || !req.user.roles.includes("admin")) {
      return respondError(req, res, 403, "No tienes permisos para realizar esta acción.");
    }

    const { id } = req.params;
    const user = await UserService.getUserById(id);
    return respondSuccess(req, res, 200, "Usuario obtenido exitosamente.", user);
  } catch (error) {
    return respondError(req, res, error.status || 500, error.message || "Error interno del servidor.");
  }
};

/**
 * Actualizar un usuario por ID
 * Requiere rol de administrador.
 */
export const updateUser = async (req, res) => {
  try {

    // Verificar si el usuario autenticado tiene rol de administrador
    if (!req.user || !req.user.roles.includes("admin")) {
      return respondError(req, res, 403, "No tienes permisos para realizar esta acción.");
    }

    const { id } = req.params;
    const { username, email, password, roles } = req.body;

    // Verificar si el usuario autenticado tiene rol de administrador
    if (!req.user || !req.user.roles.includes("admin")) {
      return respondError(req, res, 403, "No tienes permisos para realizar esta acción.");
    }

    // Llamar al servicio para actualizar el usuario
    const user = await UserService.updateUser(id, { username, email, password, roles });

    return respondSuccess(req, res, 200, "Usuario actualizado exitosamente.", user);
  } catch (error) {
    return respondError(req, res, error.status || 500, error.message || "Error interno del servidor.");
  }
};

/**
 * Eliminar un usuario por ID
 * Requiere rol de administrador.
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el usuario autenticado tiene rol de administrador
    if (!req.user || !req.user.roles.includes("admin")) {
      return respondError(req, res, 403, "No tienes permisos para realizar esta acción.");
    }

    // Llamar al servicio para eliminar el usuario
    const user = await UserService.deleteUser(id);

    return respondSuccess(req, res, 200, "Usuario eliminado exitosamente.", user);
  } catch (error) {
    return respondError(req, res, error.status || 500, error.message || "Error interno del servidor.");
  }
};