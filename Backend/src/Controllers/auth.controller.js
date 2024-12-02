import { respondSuccess, respondError } from "../Utils/resHandler.js";
import { sendEmail } from "../Services/email.service.js";
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

    // Verifica si el email ya existe
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return respondError(req, res, 400, "El email ya está registrado.");
    }

    // Verifica si el username ya existe
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return respondError(req, res, 400, "El nombre de usuario ya está registrado.");
    }

    // Genera una contraseña aleatoria
    const randomPassword = crypto.randomBytes(8).toString("hex");

    // Busca el rol "user" por defecto
    const userRole = await Role.findOne({ name: "user" });
    if (!userRole) {
      return respondError(req, res, 500, "No se encontró el rol 'user'.");
    }

    // Crea el nuevo usuario
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(randomPassword),
      roles: [userRole._id],
    });

    await newUser.save();

    // Enviar el correo con la contraseña generada
    const subject = "Tu cuenta ha sido creada exitosamente";
    const message = `Hola ${username}, tu cuenta ha sido creada exitosamente. Tu contraseña es: ${randomPassword}`;
    const htmlMessage = `<p>Hola ${username},</p><p>Tu cuenta ha sido creada exitosamente.</p><p>Tu contraseña es: <strong>${randomPassword}</strong></p>`;

    await sendEmail(email, subject, message, htmlMessage);

    return respondSuccess(req, res, 201, {
      message: "Usuario registrado exitosamente. La contraseña ha sido enviada al correo.",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error en register:", error);
    return respondError(req, res, 500, "Error interno del servidor.", error.message);
  }
};

export default { login, logout, refresh, register};