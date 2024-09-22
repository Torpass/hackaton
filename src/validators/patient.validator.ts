import { body } from 'express-validator';

export class PatientValidator {
    public createValidate = [
        body('first_name')
            .isString().withMessage('El primer nombre debe ser una cadena de texto.')
            .isLength({ max: 100 }).withMessage('El primer nombre no puede tener más de 256 caracteres.')
            .notEmpty().withMessage('El primer nombre no puede estar vacío.'),
        body('last_name')
            .isString().withMessage('El apellido debe ser una cadena de texto.')
            .isLength({ max: 100 }).withMessage('El apellido no puede tener más de 256 caracteres.')
            .notEmpty().withMessage('El apellido no puede estar vacío.'),
        body('birthday')
            .isDate().withMessage('La fecha de nacimiento debe ser una fecha válida.')
            .notEmpty().withMessage('La fecha de nacimiento no puede estar vacía.'),
        body('email')
            .isEmail().withMessage('El correo electrónico debe ser válido.')
            .notEmpty().withMessage('El correo electrónico no puede estar vacío.'),
        body('cedula')
            .isString().withMessage('La cédula debe ser una cadena de texto.')
            .isLength({ min: 10, max: 30 }).withMessage('La cédula debe tener entre 10 y 30 caracteres.')
            .notEmpty().withMessage('La cédula no puede estar vacía.'),
        body('phone')
            .isString().withMessage('El número de teléfono debe ser una cadena de texto.')
            .matches(/^\d+$/).withMessage('El número de teléfono debe contener solo números.')
            .isLength({ max: 12 }).withMessage('El número de teléfono debe tener 12 caracteres.'),
        body('address')
            .isString().withMessage('La dirección debe ser una cadena de texto.')
            .notEmpty().withMessage('La dirección no puede estar vacía.'),
        body('gender')
            .isString().withMessage('El genero debe ser una cadena de texto.')
            .notEmpty().withMessage('El género no puede estar vacío.'),
        body('status')
            .isIn(['active', 'inactive', 'deleted']).withMessage('El estado debe ser uno de los siguientes valores: active, inactive, deleted.')
            .optional(),
        body('community_id')
            .isInt().withMessage('El id de la categoría debe ser un número entero.')
            .notEmpty().withMessage('El id de la categoría no puede estar vacío.'),    
        ];

    public updateValidate = [
        body('id')
            .isNumeric().withMessage('El id debe ser un número.')
            .notEmpty().withMessage('El id no puede estar vacío.'),
        body('first_name')
            .optional()
            .isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres.')
            .notEmpty().withMessage('El nombre no puede estar vacío.'),
        body('last_name')
            .optional()
            .isLength({ max: 100 }).withMessage('El apellido no puede tener más de 100 caracteres.')
            .notEmpty().withMessage('El apellido no puede estar vacío.'),
        body('birthday')
            .optional()
            .isDate().withMessage('La fecha de nacimiento debe ser una fecha válida.'),
        body('email')
            .optional()
            .isEmail().withMessage('El correo electrónico debe ser válido.'),
        body('cedula')
            .optional()
            .isString().withMessage('La cédula debe ser una cadena de texto.')
            .isLength({ min: 10, max: 30 }).withMessage('La cédula debe tener entre 10 y 30 caracteres.'),
        body('phone')
            .optional()
            .isString().withMessage('El número de teléfono debe ser una cadena de texto.')
            .matches(/^\d+$/).withMessage('El número de teléfono debe contener solo números.')
            .isLength({ max: 12 }).withMessage('El número de teléfono debe tener 12 caracteres.'),
        body('address')
            .optional()
            .isString().withMessage('La dirección debe ser una cadena de texto.'),
        body('gender')
            .optional()
            .isString().withMessage('El genero debe ser una cadena de texto.')
            .notEmpty().withMessage('El género no puede estar vacío.'),
        body('status')
            .optional()
            .isIn(['active', 'inactive', 'deleted']).withMessage('El estado debe ser uno de los siguientes valores: active, inactive, deleted.'),
        body('community_id')
            .optional()
            .isNumeric().withMessage('El id de la comunidad debe ser un número.')
    ];
}
