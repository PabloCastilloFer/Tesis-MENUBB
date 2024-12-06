import { Router } from "express";
import { login, logout, refresh, register,forgotPassword } from "../Controllers/auth.controller.js";
import { validateRequest } from "../Middlewares/validate.middleware.js";
import {
    authLoginBodySchema,
    authRegisterBodySchema,
    authForgotPasswordBodySchema,
    authRefreshTokenBodySchema,
  } from "../Validations/auth.validation.js";

const router = Router();

router.post("/login", validateRequest(authLoginBodySchema), login); // Inicio de sesión
router.post("/logout", logout); // Cierre de sesión
router.post("/refresh", validateRequest(authRefreshTokenBodySchema), refresh); // Refrescar token
router.post("/register", validateRequest(authRegisterBodySchema), register); // Registro de usuario
router.post("/forgot-password", validateRequest(authForgotPasswordBodySchema), forgotPassword); // Olvido de contraseña

export default router;