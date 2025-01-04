import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../Config/configEnv.js";
import { respondError } from "../Utils/resHandler.js";
import { handleError } from "../Utils/errorHandler.js";

/**
 * Middleware para verificar JWT
 */
const authenticationMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return respondError(
        req,
        res,
        401,
        "No autorizado",
        "No hay un token válido en el encabezado de autorización."
      );
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return respondError(
          req,
          res,
          403,
          "Token inválido o expirado",
          err.message
        );
      }

      // Verifica que el token decodificado contiene los datos necesarios
      if (!decoded.roles || !decoded.id) {
        return respondError(req, res, 403, "Token incompleto", "Faltan datos en el token.");
      }

      req.user = {
        id: decoded.id,
        username: decoded.username,
        roles: decoded.roles,
        local: decoded.local || null,
      };

      next(); // Continúa al siguiente middleware o controlador
    });
  } catch (error) {
    handleError(error, "authentication.middleware -> verifyJWT");
  }
};

export default authenticationMiddleware;