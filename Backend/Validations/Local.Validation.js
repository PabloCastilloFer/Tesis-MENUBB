const Joi = require('joi');

const timePattern = /^\d{2}:\d{2}$/;

const scheduleSchema = Joi.object({
    day: Joi.string()
        .valid('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo')
        .required()
        .messages({
            'any.only': 'El día debe ser uno de los días de la semana.',
            'any.required': 'El día es obligatorio.'
        }),
    isOpen: Joi.boolean().default(true),
    open: Joi.string()
        .pattern(timePattern)
        .when('isOpen', { is: true, then: Joi.required() })
        .custom((value, helpers) => {
            // Validar que la hora sea entre 00:00 y 23:59
            const [hour, minute] = value.split(':').map(Number);
            if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
                return helpers.message('La hora de apertura debe estar entre 00:00 y 23:59.');
            }
            return value;
        }),
    close: Joi.string()
        .pattern(timePattern)
        .when('isOpen', { is: true, then: Joi.required() })
        .custom((value, helpers) => {
            // Validar que la hora sea entre 00:00 y 23:59
            const [hour, minute] = value.split(':').map(Number);
            if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
                return helpers.message('La hora de cierre debe estar entre 00:00 y 23:59.');
            }
            return value;
        })
        .custom((value, helpers) => {
            const openTime = helpers.state.ancestors[0].open; // Acceder a la hora de apertura
            if (openTime) {
                const openHour = parseInt(openTime.split(':')[0], 10);
                const closeHour = parseInt(value.split(':')[0], 10);
                const openMinute = parseInt(openTime.split(':')[1], 10);
                const closeMinute = parseInt(value.split(':')[1], 10);

                if (closeHour < openHour || (closeHour === openHour && closeMinute <= openMinute)) {
                    return helpers.message('La hora de cierre debe ser después de la hora de apertura.');
                }
            }
            return value;
        })
});

const localValidationSchema = Joi.object({
    name: Joi.string().trim().required().messages({
        'string.empty': 'El nombre es obligatorio.',
        'any.required': 'El nombre es obligatorio.'
    }),
    address: Joi.string().required().messages({
        'string.empty': 'La dirección es obligatoria.',
        'any.required': 'La dirección es obligatoria.'
    }),
    description: Joi.string().allow('').optional(),
    image: Joi.string().default('default.jpg'),
    schedule: Joi.array().items(scheduleSchema)
});

function validateLocal(data) {
    return localValidationSchema.validate(data, { abortEarly: false });
}

module.exports = validateLocal;