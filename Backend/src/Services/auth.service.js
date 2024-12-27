import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../Models/user.model.js";
import Role from "../Models/role.model.js";
import crypto from "crypto";

class AuthService {
  /**
   * Iniciar sesión
   * @param {Object} data - Datos del usuario
   * @param {String} data.email - Correo del usuario
   * @param {String} data.password - Contraseña del usuario
   * @returns {Array} - [accessToken, refreshToken, errorMessage]
   */
  static async login({ email, password }) {
    const user = await User.findOne({ email }).populate("roles", "name").populate("local");
    if (!user) return [null, null, "Usuario no encontrado."];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return [null, null, "Contraseña incorrecta."];

    // Generar tokens
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return [accessToken, refreshToken, null];
  }

  /**
   * Refrescar token de acceso
   * @param {String} refreshToken - Token de actualización
   * @returns {Array} - [newAccessToken, errorMessage]
   */
  static async refresh(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const user = await User.findById(decoded.id).populate("roles", "name");
      if (!user) return [null, "Usuario no encontrado."];

      const newAccessToken = this.generateAccessToken(user);
      return [newAccessToken, null];
    } catch (error) {
      return [null, "Token de actualización inválido o expirado."];
    }
  }

  /**
   * Registrar un nuevo usuario
   */
  static async register({ username, email }) {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) throw { status: 400, message: "El correo ya está registrado." };

    const existingUsername = await User.findOne({ username });
    if (existingUsername) throw { status: 400, message: "El nombre de usuario ya está registrado." };

    const randomPassword = crypto.randomBytes(8).toString("hex");

    const userRole = await Role.findOne({ name: "user" });
    if (!userRole) throw { status: 500, message: "No se encontró el rol 'user'." };

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(randomPassword),
      roles: [userRole._id],
    });

    await newUser.save();

    return { newUser, randomPassword };
  }

  /**
   * Restablecer contraseña
   */
  static async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) throw { status: 404, message: "Usuario no encontrado." };

    const newPassword = crypto.randomBytes(8).toString("hex");

    user.password = await User.encryptPassword(newPassword);
    await user.save();

    return { username: user.username, newPassword };
  }

/**
 * Generar token de acceso
 */
static generateAccessToken(user) {
  const isEncargado = user.roles.name === "encargado";

  const payload = {
    id: user._id,
    username: user.username,
    roles: user.roles.name,
  };

  if (isEncargado && user.local) {
    payload.local = user.local._id;
  }

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" });
}

  /**
   * Generar token de actualización
   */
  static generateRefreshToken(user) {
    return jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
  }
}

export default AuthService;