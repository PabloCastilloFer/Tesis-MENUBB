import Joi from "joi";

/**
 * Esquema de validación para la creación de una tarea
 * @constant {Object}
 */
export const crearComidaSchema = Joi.object({
    nombreComida: Joi.string().label('nombreComida').required().regex(/^[A-Za-zÁ-Úá-ú0-9\s]+$/u).messages ({
        "string.empty":"El nombre de la comida no puede estar vacío.",
        "any.required":"El nombre de la comida es obligatorio.",
        "string.base":"El nombre de la comida debe ser de tipo string.",
        "string.pattern.base": "El nombre solo puede contener letras y espacios."
    }),
    precio: Joi.number().label('precio').required().min(1).messages({
        "number.base": "El precio debe ser de tipo numérico.",
        "number.min": "El precio debe ser mayor a 0.",
        "any.required": "El precio es obligatorio."
    }),
    calorias: Joi.string().label('calorias').required().custom((value, helpers) => {
        const wordCount = value.trim().split(/\s+/).length;
        if (wordCount <= 100) {
            return value;
        } else {
            return helpers.message("Las calorías no puede exceder las 100 palabras.");
        }
    }).messages({
        "string.empty": "Las calorías no puede estar vacía.",
        "string.base": "Las calorías debe ser de tipo string.",
        "any.required": "Las calorías es obligatoria.",
    }),
    proteinas: Joi.string().label('proteinas').required().custom((value, helpers) => {
        const wordCount = value.trim().split(/\s+/).length;
        if (wordCount <= 100) {
            return value;
        } else {
            return helpers.message("Las proteínas no puede exceder las 100 palabras.");
        }
    }).messages({
        "string.empty": "Las proteínas no puede estar vacía.",
        "string.base": "Las proteínas debe ser de tipo string.",
        "any.required": "Las proteínas es obligatoria.",
    }),
    lipidos: Joi.string().label('lípidos').required().custom((value, helpers) => {
        const wordCount = value.trim().split(/\s+/).length;
        if (wordCount <= 100) {
            return value;
        } else {
            return helpers.message("Los lípidos no puede exceder las 100 palabras.");
        }
    }).messages({
        "string.empty": "Los lípidos no puede estar vacía.",
        "string.base": "Los lípidos debe ser de tipo string.",
        "any.required": "Los lípidos es obligatoria.",
    }),
    carbohidratos: Joi.string().label('carbohidratos').required().custom((value, helpers) => {
        const wordCount = value.trim().split(/\s+/).length;
        if (wordCount <= 100) {
            return value;
        } else {
            return helpers.message("Los carbohidratos no puede exceder las 100 palabras.");
        }
    }).messages({
        "string.empty": "Los carbohidratos no puede estar vacía.",
        "string.base": "Los carbohidratos debe ser de tipo string.",
        "any.required": "Los carbohidratos es obligatoria.",
    }),
    imagen: Joi.string().label('archivo').optional().allow(null).messages({
        "string.base": "El archivo debe ser de tipo string."
    }),
    estado: Joi.boolean().label('estado').optional().allow(null).messages({
        "boolean.base": "El estado debe ser de tipo boolean."
    }),
});

export const fileParamsSchema = Joi.object({
    filename: Joi.string()
      .label('filename')
      .required()
      .pattern(/^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/)
      .messages({
        "string.empty": "El nombre de archivo no puede estar vacío.",
        "any.required": "El nombre de archivo es obligatorio.",
        "string.base": "El nombre de archivo debe ser de tipo string.",
        "string.pattern.base": "El nombre de archivo debe seguir un formato específico, por ejemplo: archivo.pdf o archivo.png",
      }),
  });