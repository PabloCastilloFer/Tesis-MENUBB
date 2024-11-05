const Joi = require('joi');

const usuarioValidationSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    role: Joi.string().required(),
    password: Joi.string().min(8).required(),
    local: Joi.string().optional(),
    favorite: Joi.string().optional()
});

module.exports = usuarioValidationSchema;