import bcrypt from "bcryptjs";
import User from "../Models/user.model.js";
import Role from "../Models/role.model.js";
import Local from "../Models/local.model.js";

class UserService {
  /**
   * Crear un usuario con roles personalizados
   * @param {Object} data - Datos del usuario
   * @returns {Object} - Usuario creado
   */
  static async createUser({ username, email, password, roles, local }) {
    try {  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw { status: 400, message: "El correo ya está registrado." };
      }

      let validRole = null;
      if (roles) {
        validRole = await Role.findOne({ name: roles });
        if (!validRole) {
          throw { status: 400, message: "El rol proporcionado no es válido." };
        }
      } else {
        const defaultRole = await Role.findOne({ name: "user" });
        if (!defaultRole) {
          throw { status: 500, message: "Rol predeterminado 'user' no encontrado." };
        }
        validRole = defaultRole;
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      let validLocal = null;
      if (roles === "encargado") {
        if (!local) {
          throw { status: 400, message: "Debe proporcionar un local para el rol de encargado." };
        }
        validLocal = await Local.findById(local);
        if (!validLocal) {
          throw { status: 400, message: "El local proporcionado no es válido." };
        }
      }
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        roles: validRole._id,
        ...(validLocal && { local: validLocal._id }),
      });
  
      const savedUser = await newUser.save();
  
      return {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        roles: validRole.name,
        local: validLocal ? validLocal.name : null,
      };
    } catch (error) {
      throw { status: error.status || 500, message: error.message || "Error interno del servidor." };
    }
  }

  /**
   * Obtener todos los usuarios
   * @returns {Array} - Lista de usuarios
   */
  static async getUsers() {
    try {
      const users = await User.find().populate("roles", "name").populate("local", "name");
      return users.map((user) => ({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles.name,
        local: user.local ? user.local.name : null,
      }));
    } catch (error) {
      throw new Error("Error al obtener usuarios.");
    }
  }

  /**
   * Obtener un usuario por ID
   * @param {String} id - ID del usuario
   * @returns {Object} - Usuario encontrado
   */
  static async getUserById(id) {
    try {
      const user = await User.findById(id).populate("roles", "name").populate("local", "name");
      if (!user) {
        throw { status: 404, message: "Usuario no encontrado." };
      }
      return {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles.name,
        local: user.local ? user.local.name : null,
      };
    } catch (error) {
      throw { status: error.status || 500, message: error.message || "Error al obtener el usuario." };
    }
  }

/**
 * Actualizar un usuario
 * @param {String} id - ID del usuario
 * @param {Object} data - Datos a actualizar
 * @returns {Object} - Usuario actualizado
 */
static async updateUser(id, data) {
  try {
      const { username, email, roles, local } = data;

      // Validar si el usuario existe
      const existingUser = await User.findById(id);
      if (!existingUser) {
          throw { status: 404, message: "Usuario no encontrado." };
      }

      // Validar el rol si se proporciona
      let validRole = null;
      if (roles) {
          validRole = await Role.findOne({ name: roles });
          if (!validRole) {
              throw { status: 400, message: "El rol proporcionado no es válido." };
          }
      }

      // Validar el local si se proporciona y el rol es "encargado"
      let validLocal = null;
      if (roles === "encargado") {
          if (!local) {
              throw { status: 400, message: "Debe proporcionar un local para el rol de encargado." };
          }
          validLocal = await Local.findById(local);
          if (!validLocal) {
              throw { status: 400, message: "El local proporcionado no es válido." };
          }
      } else {
          // Si el rol no es "encargado", eliminar el local asociado
          data.local = null; // Establecer local a null para eliminarlo
      }

      // Construir los campos a actualizar
      const updateData = {
          ...(username && { username }),
          ...(email && { email }),
          ...(validRole && { roles: validRole._id }),
          ...(roles === "encargado" && validLocal && { local: validLocal._id }),
          ...(roles !== "encargado" && { local: null }), // Eliminar local si el rol cambia
      };

      // Actualizar el usuario
      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
          new: true,
      })
          .populate("roles", "name")
          .populate("local", "name");

      if (!updatedUser) {
          throw { status: 404, message: "Usuario no encontrado." };
      }

      return {
          id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          roles: updatedUser.roles.name,
          local: updatedUser.local ? updatedUser.local.name : null,
      };
  } catch (error) {
      throw { status: error.status || 500, message: error.message || "Error al actualizar el usuario." };
  }
}

/**
 * Actualizar la contraseña de un usuario
 * @param {String} id - ID del usuario
 * @param {String} password - Nueva contraseña
 * @returns {Object} - Mensaje de éxito
 */
static async updatePassword(id, password) {
  try {
    if (!id || !password) {
      throw { status: 400, message: "ID y contraseña son obligatorios." };
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Actualizar la contraseña en la base de datos
    const user = await User.findByIdAndUpdate(id, { password: hashedPassword });
    if (!user) {
      throw { status: 404, message: "Usuario no encontrado." };
    }

    return { message: "Contraseña actualizada exitosamente." };
  } catch (error) {
    console.error("Error en UserService.updatePassword:", error);
    throw error;
  }
}



  /**
 * Eliminar un usuario
 * @param {String} id - ID del usuario
 * @param {String} currentUserId - ID del usuario que solicita la eliminación
 * @returns {Object} - Mensaje de éxito
 */
static async deleteUser(id, currentUserId) {
  if (!id || !currentUserId) {
    throw { status: 400, message: "IDs inválidos." };
  }
  
  const userToDelete = await User.findById(id).populate("roles", "name");
  if (!userToDelete) {
    throw { status: 404, message: "Usuario no encontrado." };
  }

  const isAdmin = userToDelete.roles && userToDelete.roles.name === "admin";
  
  if (isAdmin) {
    const remainingAdmins = await User.countDocuments({ roles: { $elemMatch: { name: "admin" } } });
    if (remainingAdmins <= 1) {
      throw { status: 400, message: "No se puede eliminar el último administrador." };
    }

    if (currentUserId === id) {
      throw { status: 400, message: "No puedes eliminarte como el único administrador restante." };
    }
  }

  await User.findByIdAndDelete(id);

  return { message: "Usuario eliminado exitosamente." };
}
}

export default UserService;