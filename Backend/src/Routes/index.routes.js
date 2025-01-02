import { Router } from "express";
import express from 'express';

import userRoutes from "./user.routes.js";

import authRoutes from "./auth.routes.js";

import comidaRoutes from "./comida.routes.js";

import etiquetaRoutes from "./etiqueta.routes.js";

import localRoutes from './local.routes.js';

import authenticationMiddleware from "../Middlewares/authentication.middleware.js";

const router = Router();

router.use("/users", authenticationMiddleware, userRoutes);
router.use("/auth", authRoutes);
router.use("/comida", authenticationMiddleware, comidaRoutes);
router.use("/etiqueta", etiquetaRoutes); // router.use("/etiqueta", authenticationMiddleware, etiquetaRoutes);

router.use('/local', authenticationMiddleware, localRoutes);

export default router;
