// Importa el modulo 'express' para crear las rutas
import { Router } from "express";
import express from 'express';

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

/** Enrutador de locales */
import localRoutes from './local.routes.js';

/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

/** Instancia del enrutador */
const router = Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

router.use('/local', localRoutes);

// Exporta el enrutador
export default router;