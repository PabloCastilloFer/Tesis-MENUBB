import Joi from "joi";

/**
 * Esquema de validación para la creación de una tarea
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
    calorias: Joi.string()
        .label('calorias')
        .optional()
        .allow(null, '')
        .custom((value, helpers) => {
            if (value && value.trim().split(/\s+/).length > 100) {
                return helpers.message("Las calorías no puede exceder las 100 palabras.");
            }
            return value;
        })
        .messages({
            "string.base": "Las calorías debe ser de tipo string.",
        }),
    proteinas: Joi.string()
        .label('proteinas')
        .optional()
        .allow(null, '')
        .custom((value, helpers) => {
            if (value && value.trim().split(/\s+/).length > 100) {
                return helpers.message("Las proteínas no puede exceder las 100 palabras.");
            }
            return value;
        })
        .messages({
            "string.base": "Las proteínas debe ser de tipo string.",
        }),
    lipidos: Joi.string()
        .label('lípidos')
        .optional()
        .allow(null, '')
        .custom((value, helpers) => {
            if (value && value.trim().split(/\s+/).length > 100) {
                return helpers.message("Los lípidos no puede exceder las 100 palabras.");
            }
            return value;
        })
        .messages({
            "string.base": "Los lípidos debe ser de tipo string.",
        }),
    carbohidratos: Joi.string()
        .label('carbohidratos')
        .optional()
        .allow(null, '')
        .custom((value, helpers) => {
            if (value && value.trim().split(/\s+/).length > 100) {
                return helpers.message("Los carbohidratos no puede exceder las 100 palabras.");
            }
            return value;
        })
        .messages({
            "string.base": "Los carbohidratos debe ser de tipo string.",
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
    etiquetas: Joi.array()
        .items(
            Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .message("Cada etiqueta debe ser un ID válido de MongoDB.")
        )
        .optional()
        .label('etiquetas')
        .messages({
            "array.base": "Las etiquetas deben ser un arreglo.",
            "array.includes": "Cada etiqueta debe ser un ID válido de MongoDB.",
        }),
});
