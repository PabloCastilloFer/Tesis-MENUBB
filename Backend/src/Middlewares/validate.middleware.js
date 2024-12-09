import Joi from "joi";

export const validateRequest = (schema) => async (req, res, next) => {
    try {
    // Validar la solicitud usando el esquema proporcionado
    await schema.validateAsync(req.body, { abortEarly: false });
    next(); // Continuar si la validación es exitosa
    } catch (error) {
    // Formatear los errores de validación
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({
        success: false,
        message: "Error de validación",
        errors: errorMessages,
    });
    }
};