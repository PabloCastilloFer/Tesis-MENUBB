import Joi from "joi";

/**
 * Esquema de validación para la creación de una comida
 * @constant {Object}
 */
export const crearComidaSchema = Joi.object({
    nombreComida: Joi.string()
        .label('nombreComida')
        .required()
        .regex(/^[A-Za-zÁ-Úá-ú0-9\s]+$/u)
        .messages({
            "string.empty": "El nombre de la comida no puede estar vacío.",
            "any.required": "El nombre de la comida es obligatorio.",
            "string.base": "El nombre de la comida debe ser de tipo string.",
            "string.pattern.base": "El nombre solo puede contener letras y espacios.",
        }),
    precio: Joi.number()
        .label('precio')
        .required()
        .min(1)
        .messages({
            "number.base": "El precio debe ser de tipo numérico.",
            "number.min": "El precio debe ser mayor a 0.",
            "any.required": "El precio es obligatorio.",
        }),
    calorias: Joi.number()
        .label('calorias')
        .optional()
        .min(1)
        .messages({
            "number.base": "Las calorías deben ser de tipo numérico.",
            "number.min": "Las calorías deben ser mayor a 0.",
        }),
    proteinas: Joi.number()
        .label('proteinas')
        .optional()
        .min(1)
        .messages({
            "number.base": "Las proteínas deben ser de tipo numérico.",
            "number.min": "Las proteínas deben ser mayor a 0.",
        }),
    lipidos: Joi.number()
        .label('lípidos')
        .optional()
        .min(1)
        .messages({
            "number.base": "Los lípidos deben ser de tipo numérico.",
            "number.min": "Los lípidos deben ser mayor a 0.",
        }),
    carbohidratos: Joi.number()
        .label('carbohidratos')
        .optional()
        .min(1)
        .messages({
            "number.base": "Los carbohidratos deben ser de tipo numérico.",
            "number.min": "Los carbohidratos deben ser mayor a 0.",
        }),
    imagen: Joi.string()
        .label('archivo')
        .optional()
        .allow(null)
        .messages({
            "string.base": "El archivo debe ser de tipo string.",
        }),
    estado: Joi.boolean()
        .label('estado')
        .optional()
        .allow(null)
        .messages({
            "boolean.base": "El estado debe ser de tipo boolean.",
        }),
});

export const updateComidaSchema = Joi.object({
    nombreComida: Joi.string()
    .label('nombreComida')
    .required()
    .regex(/^[A-Za-zÁ-Úá-ú0-9\s]+$/u)
    .messages({
        "string.empty": "El nombre de la comida no puede estar vacío.",
        "any.required": "El nombre de la comida es obligatorio.",
        "string.base": "El nombre de la comida debe ser de tipo string.",
        "string.pattern.base": "El nombre solo puede contener letras y espacios.",
    }),
precio: Joi.number()
    .label('precio')
    .required()
    .min(1)
    .messages({
        "number.base": "El precio debe ser de tipo numérico.",
        "number.min": "El precio debe ser mayor a 0.",
        "any.required": "El precio es obligatorio.",
    }),
calorias: Joi.number()
    .label('calorias')
    .optional()
    .min(1)
    .messages({
        "number.base": "Las calorías deben ser de tipo numérico.",
        "number.min": "Las calorías deben ser mayor a 0.",
    }),
proteinas: Joi.number()
    .label('proteinas')
    .optional()
    .min(1)
    .messages({
        "number.base": "Las proteínas deben ser de tipo numérico.",
        "number.min": "Las proteínas deben ser mayor a 0.",
    }),
lipidos: Joi.number()
    .label('lípidos')
    .optional()
    .min(1)
    .messages({
        "number.base": "Los lípidos deben ser de tipo numérico.",
        "number.min": "Los lípidos deben ser mayor a 0.",
    }),
carbohidratos: Joi.number()
    .label('carbohidratos')
    .optional()
    .min(1)
    .messages({
        "number.base": "Los carbohidratos deben ser de tipo numérico.",
        "number.min": "Los carbohidratos deben ser mayor a 0.",
    }),
imagen: Joi.string()
    .label('archivo')
    .optional()
    .allow(null)
    .messages({
        "string.base": "El archivo debe ser de tipo string.",
    }),
estado: Joi.boolean()
    .label('estado')
    .optional()
    .allow(null)
    .messages({
        "boolean.base": "El estado debe ser de tipo boolean.",
    }),
});