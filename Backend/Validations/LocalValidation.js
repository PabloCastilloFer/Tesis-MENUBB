const Joi = require('joi');

const scheduleSchema = Joi.object({
    day: Joi.string()
        .valid('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo')
        .required(),
    open: Joi.string()
        .pattern(/^\d{2}:\d{2}$/)
        .when('isOpen', { is: true, then: Joi.required() }),
    close: Joi.string()
        .pattern(/^\d{2}:\d{2}$/)
        .when('isOpen', { is: true, then: Joi.required() }),
    isOpen: Joi.boolean().default(true)
});

const localValidationSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    description: Joi.string().allow(''),
    image: Joi.string().allow(''),
    schedule: Joi.array().items(scheduleSchema)
});

function validateLocal(data) {
    return localValidationSchema.validate(data, { abortEarly: false });
}

module.exports = validateLocal;