import { Router } from "express";
import { login, logout, refresh } from "../Controllers/auth.controller.js";

const router = Router();

router.post("/login", login); // Inicio de sesión
router.post("/logout", logout); // Cierre de sesión
router.post("/refresh", refresh); // Refrescar token

export default router;