import { Router } from "express";
import { login, logout, refresh, register,forgotPassword } from "../Controllers/auth.controller.js";

const router = Router();

router.post("/login", login); // Inicio de sesión
router.post("/logout", logout); // Cierre de sesión
router.post("/refresh", refresh); // Refrescar token
router.post("/register", register); // Registro de usuario
router.post("/forgot-password", forgotPassword); // Olvido de contraseña

export default router;