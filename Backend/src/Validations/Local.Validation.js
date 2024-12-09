import Joi from 'joi';

const timePattern = /^\d{2}:\d{2}$/;

const scheduleSchema = Joi.object({
  day: Joi.string()
    .valid('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo')
    .required()
    .messages({
      'any.only': 'El día debe ser uno de los días de la semana.',
      'any.required': 'El día es obligatorio.',
    }),

  isOpen: Joi.boolean().default(false),

  open: Joi.string()
    .pattern(timePattern)
    .when('isOpen', { is: true, then: Joi.required() })
    .messages({
      'string.pattern.base': 'La hora de apertura debe estar en formato HH:mm.',
      'any.required': 'La hora de apertura es obligatoria cuando el local está abierto.',
    }),

  close: Joi.string()
    .pattern(timePattern)
    .when('isOpen', { is: true, then: Joi.required() })
    .messages({
      'string.pattern.base': 'La hora de cierre debe estar en formato HH:mm.',
      'any.required': 'La hora de cierre es obligatoria cuando el local está abierto.',
    })
    .custom((value, helpers) => {
      const openTime = helpers.state.ancestors[0].open;
      if (openTime) {
        const [openHour, openMinute] = openTime.split(':').map(Number);
        const [closeHour, closeMinute] = value.split(':').map(Number);

        if (closeHour < openHour || (closeHour === openHour && closeMinute <= openMinute)) {
          return helpers.message('La hora de cierre debe ser después de la hora de apertura.');
        }
      }
      return value;
    }),
});

export const localCreateSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'El nombre es obligatorio.',
    'any.required': 'El nombre es obligatorio.',
  }),

  address: Joi.string().trim().required().messages({
    'string.empty': 'La dirección es obligatoria.',
    'any.required': 'La dirección es obligatoria.',
  }),

  accessibility: Joi.object({
    isAccessible: Joi.boolean().required().messages({
      'boolean.base': 'El campo `isAccessible` debe ser un valor booleano.',
    }),
    details: Joi.string().trim().allow('').optional().messages({
      'string.base': 'El campo `details` debe ser una cadena de texto.',
    }),
  }).required().messages({
    'any.required': 'El campo `accessibility` es obligatorio.',
    'object.base': 'El campo `accessibility` debe ser un objeto con `isAccessible` y `details`.',
  }),

  image: Joi.string().trim().default('default.jpg').messages({
    'string.base': 'La imagen debe ser una cadena de texto.',
  }),

  schedule: Joi.array().items(scheduleSchema),

});

export const localUpdateSchema = Joi.object({
    name: Joi.string().trim().optional().messages({
      'string.empty': 'El nombre no puede estar vacío.',
    }),
  
    address: Joi.string().trim().optional().messages({
      'string.empty': 'La dirección no puede estar vacía.',
    }),
  
    accessibility: Joi.object({
      isAccessible: Joi.boolean().optional().messages({
        'boolean.base': 'El campo `isAccessible` debe ser un valor booleano.',
      }),
      details: Joi.string().trim().allow('').optional().messages({
        'string.base': 'El campo `details` debe ser una cadena de texto.',
      }),
    }).optional().messages({
      'object.base': 'El campo `accessibility` debe ser un objeto con `isAccessible` y `details`.',
    }),
  
    image: Joi.string().trim().optional().messages({
      'string.base': 'La imagen debe ser una cadena de texto.',
    }),
  
    schedule: Joi.array().items(scheduleSchema).optional().messages({
      'array.base': 'El horario debe ser una lista de objetos válidos.',
    }),
  });