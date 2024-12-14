import Joi from "joi";
import ROLES from "../Constants/roles.constants.js";

  export const userCreateSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.min": "El nombre de usuario debe tener al menos 3 caracteres.",
    "string.max": "El nombre de usuario no puede tener más de 30 caracteres.",
    "any.required": "El nombre de usuario es obligatorio.",
    "string.empty": "El nombre de usuario no puede estar vacío.",
  }),
  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@(alumnos\.)?ubiobio\.cl$/)
    .required()
    .messages({
      "string.email": "El correo debe ser válido.",
      "string.pattern.base": "El correo debe pertenecer al dominio @ubiobio.cl.",
      "any.required": "El correo es obligatorio.",
    }),
  password: Joi.string().min(8).required().messages({
    "string.min": "La contraseña debe tener al menos 8 caracteres.",
    "any.required": "La contraseña es obligatoria.",
    "string.empty": "La contraseña no puede estar vacía.",
  }),
  roles: Joi.string()
    .valid(...ROLES)
    .required()
    .messages({
      "array.base": "El rol debe ser de tipo array.",
      "any.required": "El rol es obligatorio.",
      "string.base": "El rol debe ser de tipo string.",
      "any.only": "El rol proporcionado no es válido.",
    }),
  local: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .when("roles", {
      is: "encargado",
      then: Joi.required().messages({
        "any.required": "Debe asignar un Local si el usuario es encargado.",
      }),
      otherwise: Joi.forbidden().messages({
        "any.unknown": "Solo los usuarios con rol de encargado pueden tener un local asignado.",
      }),
    }),
});

  export const userUpdateSchema = Joi.object({
    username: Joi.string().min(3).max(30).optional().messages({
      "string.min": "El nombre de usuario debe tener al menos 3 caracteres.",
      "string.max": "El nombre de usuario no puede tener más de 30 caracteres.",
    }),
    email: Joi.string()
      .email()
      .pattern(/^[a-zA-Z0-9._%+-]+@ubiobio\.cl$/)
      .optional()
      .messages({
        "string.email": "El correo debe ser válido.",
        "string.pattern.base": "El correo debe pertenecer al dominio @ubiobio.cl.",
      }),
    password: Joi.string().min(8).optional().messages({
      "string.min": "La contraseña debe tener al menos 8 caracteres.",
    }),
    roles: Joi.string()
      .valid(...ROLES)
      .optional()
      .messages({
        "array.base": "Los roles deben ser un array de strings.",
      }),
    local: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .when("roles", {
        is: "encargado",
        then: Joi.required().messages({
          "any.required": "Debe asignar un local si el usuario es encargado.",
        }),
        otherwise: Joi.forbidden().messages({
          "any.unknown": "Solo los usuarios con rol de encargado pueden tener un local asignado.",
        }),
      })
      .messages({
        "string.pattern.base": "El local debe ser un ID válido de MongoDB.",
      }),
  });

  export const userIdSchema = Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "El ID debe ser un ObjectId válido de MongoDB.",
        "any.required": "El ID es obligatorio.",
      }),
  });