// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

/** Enrutador de comida */
import comidaRoutes from "./comida.routes.js";

/** Enrutador de etiquetas */
import etiquetaRoutes from "./etiqueta.routes.js";

/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

/** Instancia del enrutador */
const router = Router();

// Usa las rutas importadas
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/comida", comidaRoutes);
router.use("/etiqueta", etiquetaRoutes);

// Exporta el enrutador
export default router;