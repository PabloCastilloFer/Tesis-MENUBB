import UserService from "../Services/user.service.js";
import { respondSuccess, respondError } from "../Utils/resHandler.js";

/**
 * Crear un nuevo usuario
 * Requiere rol de administrador para asignar roles personalizados.
 */
export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles, local } = req.body;

    const user = await UserService.createUser({ username, email, password, roles, local });

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

    const users = await UserService.getUsers();

    if (!users || users.length === 0) {
      return respondSuccess(req, res, 200, "No se encontraron usuarios.");
    }

    return respondSuccess(req, res, 200, "Usuarios obtenidos exitosamente.", users);
  } catch (error) {
    return respondError(req, res, 500, "Error interno del servidor.");
  }
};
/**
 * Obtener un usuario por ID
 */
export const getUserById = async (req, res) => {
  try {

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

    const { id } = req.params;
    const { username, email, roles, local } = req.body;

    const user = await UserService.updateUser(id, { username, email, roles, local });

    return respondSuccess(req, res, 200, "Usuario actualizado exitosamente.", user);
  } catch (error) {
    return respondError(req, res, error.status || 500, error.message || "Error interno del servidor.");
  }
};

/**
 * Actualizar la contraseña de un usuario por ID
 */
export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // Validación de los datos recibidos
    if (!id || !password) {
      return respondError(req, res, 400, "ID y contraseña son obligatorios.");
    }

    // Llamar al servicio para actualizar la contraseña
    const result = await UserService.updatePassword(id, password);

    // Responder con éxito
    return respondSuccess(req, res, 200, result.message);
  } catch (error) {
    // Devolver error al cliente con información detallada si es posible
    return respondError(
      req,
      res,
      error.status || 500,
      error.message || "Error al actualizar la contraseña."
    );
  }
};


/**
 * Eliminar un usuario por ID
 * Requiere rol de administrador.
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await UserService.deleteUser(id, req.user.id);
    return respondSuccess(req, res, 200, result.message);
  } catch (error) {
    return respondError(req, res, error.status || 500, error.message || "Error al eliminar el usuario.");
  }
};