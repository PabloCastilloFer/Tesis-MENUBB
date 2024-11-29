import User from "../Models/user.model.js";
import Role from "../Models/role.model.js";
import { respondError, respondSuccess } from "../Utils/resHandler.js";

/**
 * Obtener todos los usuarios
 */
export const getUsers = async (req, res) => {
    try {
        const usuarios = await User.find()
            .populate("roles", "name") // Poblamos los roles (solo el campo "name")
            .populate("locales", "name address"); // Si locales existe, poblamos campos básicos

        if (usuarios.length === 0) {
            return res.status(404).json({ message: "No hay usuarios registrados." });
        }

        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Obtener un usuario por ID
 */
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await User.findById(id)
            .populate("roles", "name")
            .populate("locales", "name address");

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/**
 * Crear un nuevo usuario
 */
export const createUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Verifica que no exista un usuario con el mismo email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return respondError(req, res, 400, "El email ya está registrado.");
      }
  
      // Asigna el rol 'user' automáticamente
      const userRole = await Role.findOne({ name: "user" });
      if (!userRole) {
        return respondError(req, res, 500, "No se pudo asignar el rol 'user'.");
      }
  
      // Crea el usuario
      const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
        roles: [userRole._id],
      });
  
      // Guarda en la base de datos
      const savedUser = await newUser.save();
  
      respondSuccess(req, res, 201, {
        message: "Usuario creado exitosamente.",
        user: {
          id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
        },
      });
    } catch (error) {
      console.error("Error en createUser:", error);
      respondError(req, res, 500, "Error interno del servidor.");
    }
  };

  /**
 * Crear un nuevo usuario con roles personalizados (solo para admins)
 */
  export const crearUserAdmin = async (req, res) => {
    try {
      console.log("Datos del usuario autenticado:", req.user); // Log para verificar roles
      console.log("Body recibido:", req.body); // Log para verificar los datos enviados
  
      const { username, email, password, roles } = req.body;
  
      // Verifica que el usuario autenticado tenga rol de admin
      if (!req.user || !req.user.roles.includes("admin")) {
        return res.status(403).json({ message: "No tienes permisos para realizar esta acción." });
      }
  
      // Verifica que no exista un usuario con el mismo email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "El email ya está registrado." });
      }
  
      // Verificar los roles proporcionados
      const validRoles = await Role.find({ name: { $in: roles } });
      if (validRoles.length !== roles.length) {
        return res.status(400).json({ message: "Uno o más roles no son válidos." });
      }
  
      // Crea el usuario
      const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
        roles: validRoles.map((role) => role._id),
      });
  
      // Guarda en la base de datos
      const savedUser = await newUser.save();
  
      res.status(201).json({
        message: "Usuario creado exitosamente.",
        user: {
          id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
          roles: validRoles.map((role) => role.name),
        },
      });
    } catch (error) {
      console.error("Error en CrearUserAdmin:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  };

/**
 * Actualizar un usuario por ID
 */
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, roles, locales } = req.body;

        // Verificar roles si se están actualizando
        let validRoles = [];
        if (roles) {
            validRoles = await Role.find({ name: { $in: roles } });
            if (validRoles.length !== roles.length) {
                return res.status(400).json({ message: "Uno o más roles no son válidos." });
            }
        }

        // Actualizar el usuario
        const usuarioActualizado = await User.findByIdAndUpdate(
            id,
            {
                username,
                email,
                roles: validRoles.length > 0 ? validRoles.map((role) => role._id) : undefined,
                locales,
            },
            { new: true } // Devuelve el documento actualizado
        )
            .populate("roles", "name")
            .populate("locales", "name address");

        if (!usuarioActualizado) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        res.status(200).json({
            message: "Usuario actualizado exitosamente.",
            usuario: usuarioActualizado,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Eliminar un usuario por ID
 */
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const usuarioEliminado = await User.findByIdAndDelete(id);

        if (!usuarioEliminado) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        res.status(200).json({
            message: "Usuario eliminado exitosamente.",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
