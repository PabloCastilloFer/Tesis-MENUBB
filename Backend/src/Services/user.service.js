import User from "../Models/user.model.js";
import Role from "../Models/role.model.js";

class UserService {
  /**
   * Crear un usuario con roles personalizados
   * @param {Object} data - Datos del usuario
   * @returns {Object} - Usuario creado
   */
  static async createUser({ username, email, password, roles }) {
    // Verificar si el email ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw { status: 400, message: "El correo ya está registrado." };
    }

    // Verificar roles proporcionados
    let validRoles = [];
    if (roles && roles.length > 0) {
      validRoles = await Role.find({ name: { $in: roles } });
      if (validRoles.length !== roles.length) {
        throw { status: 400, message: "Uno o más roles no son válidos." };
      }
    } else {
      // Asignar rol predeterminado ("user") si no se proporcionan roles
      const defaultRole = await Role.findOne({ name: "user" });
      if (!defaultRole) {
        throw { status: 500, message: "Rol predeterminado 'user' no encontrado." };
      }
      validRoles = [defaultRole];
    }

    // Crear el usuario
    const newUser = new User({
      username,
      email,
      password, // La contraseña se cifra automáticamente en el modelo
      roles: validRoles.map((role) => role._id),
    });

    // Guardar en la base de datos
    const savedUser = await newUser.save();

    return {
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: validRoles.map((role) => role.name),
    };
  }

  /**
   * Obtener todos los usuarios
   * @returns {Array} - Lista de usuarios
   */
  static async getUsers() {
    try {
      const users = await User.find().populate("roles", "name"); // Asegúrate de que "roles" sea correcto
      return users.map((user) => ({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles.map((role) => role.name), // Extrae los nombres de los roles
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
      const user = await User.findById(id).populate("roles", "name");
      if (!user) {
        throw { status: 404, message: "Usuario no encontrado." };
      }
      return {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles.map((role) => role.name),
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
      const { username, email, password, roles } = data;

      // Verificar roles proporcionados
      let validRoles = [];
      if (roles && roles.length > 0) {
        validRoles = await Role.find({ name: { $in: roles } });
        if (validRoles.length !== roles.length) {
          throw { status: 400, message: "Uno o más roles no son válidos." };
        }
      }

      // Actualizar usuario
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          username,
          email,
          ...(password && { password }), // Solo actualizar contraseña si se proporciona
          ...(validRoles.length > 0 && { roles: validRoles.map((role) => role._id) }),
        },
        { new: true }
      ).populate("roles", "name");

      if (!updatedUser) {
        throw { status: 404, message: "Usuario no encontrado." };
      }

      return {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        roles: updatedUser.roles.map((role) => role.name),
      };
    } catch (error) {
      throw { status: error.status || 500, message: error.message || "Error al actualizar el usuario." };
    }
  }

  /**
   * Eliminar un usuario
   * @param {String} id - ID del usuario
   * @returns {Object} - Usuario eliminado
   */
  static async deleteUser(id) {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        throw { status: 404, message: "Usuario no encontrado." };
      }
      return {
        id: deletedUser._id,
        username: deletedUser.username,
        email: deletedUser.email,
      };
    } catch (error) {
      throw { status: error.status || 500, message: error.message || "Error al eliminar el usuario." };
    }
  }
}

export default UserService;