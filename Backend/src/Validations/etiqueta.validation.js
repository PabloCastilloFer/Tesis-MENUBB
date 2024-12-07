import Joi from "joi";

/**
 * Esquema de validación para la creación de una tarea
 * @constant {Object}
 */

export const createEtiquetaSchema = Joi.object({
    nombre: Joi.string().label('nombre').required().regex(/^[A-Za-zÁ-Úá-ú\s]+$/u).messages ({
        "string.empty": "El campo 'nombre' no puede estar vacío",
        "any.required": "El campo 'nombre' es obligatorio",
        "string.base": "El campo 'nombre' debe ser de tipo string",
        "string.pattern.base": "El campo 'nombre' solo puede contener letras"
    }),
    estado: Joi.boolean().default(false).messages({
        "boolean.base": "El campo 'estado' debe ser de tipo boolean"
    })
});