import Joi from "joi";

export const authLoginBodySchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "El email debe ser válido.",
    "any.required": "El email es obligatorio.",
    "string.empty": "El email no puede estar vacío.",
  }),
  password: Joi.string().required().messages({
    "any.required": "La contraseña es obligatoria.",
    "string.empty": "La contraseña no puede estar vacía.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

export const authRegisterBodySchema = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    "string.min": "El nombre de usuario debe tener al menos 3 caracteres.",
    "string.max": "El nombre de usuario no puede tener más de 50 caracteres.",
    "any.required": "El nombre de usuario es obligatorio.",
    "string.empty": "El nombre de usuario no puede estar vacío.",
  }),
  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@(alumnos\.)?ubiobio\.cl$/)
    .required()
    .messages({
      "string.email": "El email debe ser válido.",
      "any.required": "El email es obligatorio.",
      "string.empty": "El email no puede estar vacío.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

export const authForgotPasswordBodySchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "El email debe ser válido.",
    "any.required": "El email es obligatorio.",
    "string.empty": "El email no puede estar vacío.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

export const authRefreshTokenBodySchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    "any.required": "El token de actualización es obligatorio.",
    "string.empty": "El token de actualización no puede estar vacío.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});