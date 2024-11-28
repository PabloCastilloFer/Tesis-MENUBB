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