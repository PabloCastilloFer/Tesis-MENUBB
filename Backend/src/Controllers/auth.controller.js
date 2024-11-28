import { respondSuccess, respondError } from "../Utils/resHandler.js";
import AuthService from "../Services/auth.service.js";

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

export default { login, logout, refresh };