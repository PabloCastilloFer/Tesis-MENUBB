import Joi from 'joi';

// Patrón para validar el formato del rut
const rutPattern = /^\d{7,8}-[0-9kK]$/;

const userValidationSchema = Joi.object({
    username: Joi.string().trim().required().messages({
        'string.empty': 'El nombre de usuario es obligatorio.',
        'any.required': 'El nombre de usuario es obligatorio.'
    }),
    rut: Joi.string().pattern(rutPattern).required().messages({
        'string.pattern.base': 'El RUT debe estar en un formato válido (ejemplo: 12345678-9).',
        'any.required': 'El RUT es obligatorio.'
    }),
    password: Joi.string().min(8).required().messages({
        'string.empty': 'La contraseña es obligatoria.',
        'string.min': 'La contraseña debe tener al menos 8 caracteres.',
        'any.required': 'La contraseña es obligatoria.'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'El correo electrónico es obligatorio.',
        'string.email': 'Debe ser un correo electrónico válido.',
        'any.required': 'El correo electrónico es obligatorio.'
    }),
    roles: Joi.array().items(Joi.string()).required().messages({
        'array.includesRequiredUnknowns': 'Debe asignarse al menos un rol al usuario.',
        'any.required': 'El rol es obligatorio.'
    }),
    locales: Joi.array()
        .items(Joi.string().messages({
            'string.base': 'El ID de local debe ser un string.'
        }))
        .when('roles', {
            is: Joi.array().has('672c1888fcc0838f8d8e7218'),
            then: Joi.array().min(1).required().messages({
                'array.min': 'Un usuario con rol de encargado debe tener al menos un local asignado.',
                'any.required': 'Debe asignarse al menos un local si el usuario tiene rol de encargado.'
            }),
            otherwise: Joi.array().max(0).messages({
                'array.max': 'Un usuario con rol de usuario no debe tener locales asignados.'
            })
        }),
    favoritos: Joi.array().items(Joi.string()).messages({
        'array.includesRequiredUnknowns': 'Cada favorito debe ser un ID de local válido.',
    })
});

function validateUser(data) {
    return userValidationSchema.validate(data, { abortEarly: false });
}

export { validateUser };
export default validateUser;