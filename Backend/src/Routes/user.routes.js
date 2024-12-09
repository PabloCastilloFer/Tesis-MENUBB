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
/**  userIdSchema, //no es necesario de momento  */
} from "../Validations/user.validation.js";
import { validateRequest } from "../Middlewares/validate.middleware.js";

const router = express.Router();

router.post("/", validateRequest(userCreateSchema), authorizeRole(["admin"]), createUser);
router.get("/", authorizeRole(["admin"]), getUsers);
router.get("/:id", authorizeRole(["admin"]), getUserById);
router.put("/:id", validateRequest(userUpdateSchema), authorizeRole(["admin"]), updateUser);
router.delete("/:id", authorizeRole(["admin"]), deleteUser);

export default router;