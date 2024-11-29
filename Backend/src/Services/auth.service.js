import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";
import { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } from "../Config/configEnv.js";

class AuthService {
  static async login({ email, password }) {
    try {
      const user = await User.findOne({ email }).populate("roles", "name");
      if (!user) {
        return [null, null, "El usuario no existe."];
      }

      const isPasswordValid = await User.comparePassword(password, user.password);
      if (!isPasswordValid) {
        return [null, null, "Contraseña incorrecta."];
      }

      const accessToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
          roles: user.roles.map((role) => role.name),
        },
        ACCESS_JWT_SECRET,
        { expiresIn: "1h" }
      );

      const refreshToken = jwt.sign(
        { id: user._id, email: user.email },
        REFRESH_JWT_SECRET,
        { expiresIn: "7d" }
      );

      return [accessToken, refreshToken, null];
    } catch (error) {
      console.error("Error en AuthService -> login:", error);
      throw new Error("Error al autenticar usuario.");
    }
  }
}

export default AuthService;