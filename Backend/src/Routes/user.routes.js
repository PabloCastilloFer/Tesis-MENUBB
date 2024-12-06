import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../Controllers/user.controller.js";
import authorizeRole from "../Middlewares/authorization.middleware.js";
import {
  userCreateSchema,
  userUpdateSchema,
  userIdSchema,
} from "../Validations/user.validation.js";
import { validateRequest } from "../Middlewares/validate.middleware.js";

const router = express.Router();

router.post("/", validateRequest(userCreateSchema), authorizeRole(["admin"]), createUser);
router.get("/", authorizeRole(["admin"]), getUsers);
router.get("/:id",  validateRequest(userIdSchema), authorizeRole(["admin"]), getUserById);
router.put("/:id", validateRequest(userIdSchema), validateRequest(userUpdateSchema), authorizeRole(["admin"]), updateUser);
router.delete("/:id", validateRequest(userIdSchema), authorizeRole(["admin"]), deleteUser);

export default router;