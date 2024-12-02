import { Router } from "express";
import { login, logout, refresh, register } from "../Controllers/auth.controller.js";

const router = Router();

router.post("/login", login); // Inicio de sesión
router.post("/logout", logout); // Cierre de sesión
router.post("/refresh", refresh); // Refrescar token
router.post("/register", register); // Registro de usuario

export default router;