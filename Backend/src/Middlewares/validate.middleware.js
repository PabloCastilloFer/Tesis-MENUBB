import Joi from "joi";

export const validateRequest = (schema) => async (req, res, next) => {
    try {
        // Validar la solicitud usando el esquema proporcionado
        await schema.validateAsync(req.body, { abortEarly: false });
        next(); // Continuar si la validación es exitosa
    } catch (error) {
        // Formatear los errores de validación
        const errorDetails = error.details.map((detail) => ({
            field: detail.context.key, // Campo que falló
            message: detail.message,  // Mensaje de error
            value: detail.context.value, // Valor proporcionado
        }));

        return res.status(400).json({
            success: false,
            message: "Error de validación",
            errors: errorDetails,
        });
    }
};