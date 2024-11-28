import Joi from "joi";
import ROLES from "../constants/roles.constants.js";

const userBodySchema = Joi.object({
    username: Joi.string().required().messages({
        "string.empty": "El nombre de usuario no puede estar vacío.",
        "any.required": "El nombre de usuario es obligatorio.",
        "string.base": "El nombre de usuario debe ser de tipo string.",
    }),
    password: Joi.string().required().min(5).messages({
        "string.empty": "La contraseña no puede estar vacía.",
        "any.required": "La contraseña es obligatoria.",
        "string.base": "La contraseña debe ser de tipo string.",
        "string.min": "La contraseña debe tener al menos 5 caracteres.",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "El email no puede estar vacío.",
        "any.required": "El email es obligatorio.",
        "string.base": "El email debe ser de tipo string.",
        "string.email": "El email debe tener un formato válido.",
    }),
    roles: Joi.array()
        .items(Joi.string().valid(...ROLES))
        .required()
        .messages({
            "array.base": "El rol debe ser de tipo array.",
            "any.required": "El rol es obligatorio.",
            "string.base": "El rol debe ser de tipo string.",
            "any.only": "El rol proporcionado no es válido.",
        }),
    locales: Joi.array()
        .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
        .when('roles', {
            is: Joi.array().has('encargado'),
            then: Joi.array().min(1).required().messages({
                "array.min": "Debe asignar al menos un local si el usuario es encargado.",
                "any.required": "El campo locales es obligatorio para un usuario con rol de encargado.",
            }),
        })
        .when('roles', {
            is: Joi.array().has('admin'),
            then: Joi.forbidden().messages({
                "any.unknown": "Los administradores no deben tener locales asignados.",
            }),
        })
        .optional()
        .messages({
            "array.includesRequiredUnknowns": "Cada local debe ser un ID válido de MongoDB.",
        }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

const userIdSchema = Joi.object({
    id: Joi.string()
        .required()
        .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
        .messages({
            "string.empty": "El id no puede estar vacío.",
            "any.required": "El id es obligatorio.",
            "string.base": "El id debe ser de tipo string.",
            "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
        }),
});

export { userBodySchema, userIdSchema };