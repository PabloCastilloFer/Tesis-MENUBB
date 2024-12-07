import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../Config/configEnv.js";
import { respondError } from "../Utils/resHandler.js";

const authenticationMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return respondError(req, res, 401, "No autorizado, falta token.");
    }

    const token = authHeader.split(" ")[1];

    // Verifica y decodifica el token
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return respondError(req, res, 403, "Token inválido o expirado.");
      }

      // Asigna los datos decodificados al objeto req
      req.user = {
        id: decoded.id,
        email: decoded.email,
        roles: decoded.roles, // Asegúrate de que el token contiene los roles
      };

      next();
    });
  } catch (error) {
    respondError(req, res, 500, "Error interno del servidor.");
  }
};

export default authenticationMiddleware;