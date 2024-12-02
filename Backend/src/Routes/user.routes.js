import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  crearUserAdmin,
} from "../Controllers/user.controller.js";
import authorizeRole from "../middlewares/authorization.middleware.js";

const router = Router();

router.post("/", authorizeRole(["admin"]), crearUserAdmin);
router.get("/", authorizeRole(["admin"]), getUsers); // Solo admin o encargado pueden ver todos los usuarios
router.get("/:id", authorizeRole(["admin"]), getUserById); // Ver detalles de un usuario
router.put("/:id", authorizeRole(["admin"]), updateUser); // Actualizar usuario
router.delete("/:id", authorizeRole(["admin"]), deleteUser); // Eliminar usuario

export default router;