import { respondSuccess, respondError } from "../Utils/resHandler.js";
import AuthService from "../Services/auth.service.js";
import Role from "../Models/role.model.js";
import User from "../Models/user.model.js";
import crypto from "crypto";

/**
 * Iniciar sesión
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Llama al servicio de autenticación
    const [accessToken, refreshToken, errorMessage] = await AuthService.login({ email, password });

    if (errorMessage) {
      return respondError(req, res, 401, errorMessage);
    }

    // Configura la cookie para el refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });

    respondSuccess(req, res, 200, {
      message: "Inicio de sesión exitoso.",
      accessToken,
    });
  } catch (error) {
    console.error("Error en login:", error);
    respondError(req, res, 500, "Error interno del servidor.");
  }
};

/**
 * Cerrar sesión
 */
export const logout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return respondError(req, res, 400, "No hay sesión activa.");
    }

    // Limpia la cookie del refresh token
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    respondSuccess(req, res, 200, {
      message: "Sesión cerrada correctamente.",
    });
  } catch (error) {
    console.error("Error en logout:", error);
    respondError(req, res, 500, "Error interno del servidor.");
  }
};

/**
 * Refrescar el token de acceso
 */
export const refresh = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return respondError(req, res, 400, "No hay token de actualización.");
    }

    const refreshToken = cookies.jwt;

    // Llama al servicio para refrescar el token
    const [newAccessToken, errorMessage] = await AuthService.refresh(refreshToken);

    if (errorMessage) {
      return respondError(req, res, 401, errorMessage);
    }

    respondSuccess(req, res, 200, {
      message: "Token refrescado exitosamente.",
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Error en refresh:", error);
    respondError(req, res, 500, "Error interno del servidor.");
  }
};

/**
 * Registrar un nuevo usuario
 */
export const register = async (req, res) => {
  try {
    const { username, email } = req.body;

    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return respondError(req, res, 400, "El email ya está registrado.");
    }

    // Genera una contraseña aleatoria
    const randomPassword = crypto.randomBytes(8).toString("hex"); // Genera una contraseña de 16 caracteres (8 bytes en hex)

    // Busca el rol "user" por defecto
    const userRole = await Role.findOne({ name: "user" });
    if (!userRole) {
      return respondError(req, res, 500, "No se encontró el rol 'user'.");
    }

    // Crea el nuevo usuario con la contraseña generada
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(randomPassword), // Encripta la contraseña aleatoria
      roles: [userRole._id],
    });

    await newUser.save();

    respondSuccess(req, res, 201, {
      message: "Usuario registrado exitosamente. La contraseña ha sido generada automáticamente.",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        password: randomPassword, // Incluye la contraseña generada en la respuesta
      },
    });
  } catch (error) {
    console.error("Error en register:", error);
    respondError(req, res, 500, "Error interno del servidor.");
  }
};

export default { login, logout, refresh, register};