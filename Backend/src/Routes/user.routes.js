import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  crearUserAdmin,
} from "../Controllers/user.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import authorizeRole from "../middlewares/authorization.middleware.js";

const router = Router();

// Rutas públicas
router.post("/", createUser); // Crear un usuario sin autenticación

// Rutas protegidas
router.use(authenticationMiddleware); // Aplica autenticación a todas las rutas siguientes
router.post("/admin", authenticationMiddleware, authorizeRole(["admin"]), crearUserAdmin);
router.get("/", authorizeRole(["admin", "encargado"]), getUsers); // Solo admin o encargado pueden ver todos los usuarios
router.get("/:id", authorizeRole(["admin", "encargado"]), getUserById); // Ver detalles de un usuario
router.put("/:id", authorizeRole(["admin"]), updateUser); // Actualizar usuario
router.delete("/:id", authorizeRole(["admin"]), deleteUser); // Eliminar usuario

export default router;