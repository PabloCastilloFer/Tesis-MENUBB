import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updatePassword,
  deleteUser,
} from "../Controllers/user.controller.js";
import authorizeRole from "../Middlewares/authorization.middleware.js";
import {
  userCreateSchema,
  userUpdateSchema,
  userPasswordSchema,
} from "../Validations/user.validation.js";
import { validateRequest } from "../Middlewares/validate.middleware.js";

const router = express.Router();

router.post("/", validateRequest(userCreateSchema), authorizeRole(["admin"]), createUser);
router.get("/", authorizeRole(["admin"]), getUsers);
router.get("/:id", authorizeRole(["admin"]), getUserById);
router.put("/:id", validateRequest(userUpdateSchema), authorizeRole(["admin"]), updateUser);
router.put("/:id/password", validateRequest(userPasswordSchema), authorizeRole(["admin","encargado","user"]), updatePassword);
router.delete("/:id", authorizeRole(["admin"]), deleteUser);

export default router;