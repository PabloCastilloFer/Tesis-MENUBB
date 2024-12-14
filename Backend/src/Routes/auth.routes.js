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

router.post("/login", validateRequest(authLoginBodySchema), login);
router.post("/logout", logout);
router.post("/refresh", validateRequest(authRefreshTokenBodySchema), refresh);
router.post("/register", validateRequest(authRegisterBodySchema), register);
router.post("/forgot-password", validateRequest(authForgotPasswordBodySchema), forgotPassword);

export default router;