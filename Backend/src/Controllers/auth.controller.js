import AuthService from "../Services/auth.service.js";
import { respondSuccess, respondError } from "../Utils/resHandler.js";
import { sendEmail } from "../Services/email.service.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [accessToken, refreshToken, errorMessage] = await AuthService.login({ email, password });

    if (errorMessage) return respondError(req, res, 401, errorMessage);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: false, // Cambiar a true en producción a "   secure: process.env.NODE_ENV === "production",  "
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    respondSuccess(req, res, 200, {
      message: "Inicio de sesión exitoso.",
      accessToken: accessToken,
    });
  } catch (error) {
    console.error("Error en login:", error);
    respondError(req, res, 500, "Error interno del servidor.");
  }
};

export const refresh = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return respondError(req, res, 400, "No hay token de actualización.");

    const refreshToken = cookies.jwt;
    const [newAccessToken, errorMessage] = await AuthService.refresh(refreshToken);

    if (errorMessage) return respondError(req, res, 401, errorMessage);

    respondSuccess(req, res, 200, {
      message: "Token refrescado exitosamente.",
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Error en refresh:", error);
    respondError(req, res, 500, "Error interno del servidor.");
  }
};

export const register = async (req, res) => {
  try {
    const { username, email } = req.body;
    const { newUser, randomPassword } = await AuthService.register({ username, email });

    const subject = "Tu cuenta ha sido creada exitosamente";
    const message = `Hola ${username},
    Tu contraseña temporal es: ${randomPassword}

    Por razones de seguridad, guarda esta contraseña en un lugar seguro.

    Si no has solicitado esta cuenta, por favor ignora este mensaje.
    `;
    const htmlMessage = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nuevo mensaje</title>
    </head>
    <body>
      <div style="background-color:#FAFAFA; padding:20px;">
        <div style="background-color:#FFFFFF; max-width:600px; margin:0 auto; padding:20px; border-radius:8px; text-align:center;">
          <img src="https://erztodh.stripocdn.email/content/guids/CABINET_67e080d830d87c17802bd9b4fe1c0912/images/55191618237638326.png" alt="Logo" style="width:100px; margin-bottom:20px;">
          <h1 style="font-size:24px; color:#333333;">¡Tu cuenta ha sido creada!</h1>
          <p style="font-size:16px; color:#333333;">Hola ${username},</p>
          <p style="font-size:14px; color:#333333;">Tu cuenta en <strong>MENUBB</strong> ha sido creada exitosamente. Tu contraseña temporal es:</p>
          <p style="font-size:18px; font-weight:bold; color:#5c68e2;">${randomPassword}</p>
          <p style="font-size:14px; color:#333333;">Por razones de seguridad, guarda esta contraseña en un lugar seguro.</p>
          <p style="font-size:14px; color:#333333;">Si no has solicitado esta cuenta, por favor ignora este mensaje.</p>
          <footer style="margin-top:20px; font-size:12px; color:#999999;">
            <p>© 2024 MENUBB. Todos los derechos reservados.</p>
          </footer>
        </div>
      </div>
    </body>
    </html>
    `;


    await sendEmail(email, subject, message, htmlMessage);

    respondSuccess(req, res, 201, {
      message: "Usuario registrado exitosamente. Contraseña enviada al correo.",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error en register:", error);
    respondError(req, res, error.status || 500, error.message || "Error interno del servidor.");
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const { username, newPassword } = await AuthService.forgotPassword(email);

    const subject = "Restablecimiento de contraseña";
    const message = `Hola ${username}, tu contraseña ha sido restablecida. Tu nueva contraseña es: ${newPassword}`;
    const htmlMessage = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Restablecimiento de contraseña</title>
    </head>
    <body>
      <div style="background-color:#FAFAFA; padding:20px;">
        <div style="background-color:#FFFFFF; max-width:600px; margin:0 auto; padding:20px; border-radius:8px; text-align:center;">
          <h1 style="font-size:24px; color:#333333;">Restablecimiento de contraseña</h1>
          <p style="font-size:16px; color:#333333;">Hola ${username},</p>
          <p style="font-size:14px; color:#333333;">Tu contraseña ha sido restablecida exitosamente. Tu nueva contraseña es:</p>
          <p style="font-size:18px; font-weight:bold; color:#5c68e2;">${newPassword}</p>
          <p style="font-size:14px; color:#333333;">Por razones de seguridad, guarda esta contraseña en un lugar seguro.</p>
          <footer style="margin-top:20px; font-size:12px; color:#999999;">
            <p>© 2024 MENUBB. Todos los derechos reservados.</p>
          </footer>
        </div>
      </div>
    </body>
    </html>
    `;


    await sendEmail(email, subject, message, htmlMessage);

    respondSuccess(req, res, 200, {
      message: "Nueva contraseña enviada al correo.",
    });
  } catch (error) {
    console.error("Error en forgotPassword:", error);
    respondError(req, res, error.status || 500, error.message || "Error interno del servidor.");
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    respondSuccess(req, res, 200, { message: "Sesión cerrada correctamente." });
  } catch (error) {
    console.error("Error en logout:", error);
    respondError(req, res, 500, "Error interno del servidor.");
  }
};