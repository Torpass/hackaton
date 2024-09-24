import { body } from "express-validator";

export class CharityValidator {
    public createValidate = [
        body('razon_social')
            .isString().withMessage('La razón social debe ser una cadena de texto.')
            .isLength({ max: 256 }).withMessage('La razón social no puede tener más de 256 caracteres.')
            .notEmpty().withMessage('La razón social no puede estar vacía.'),
        body('description')
            .isString().withMessage('La descripción debe ser una cadena de texto.')
            .notEmpty().withMessage('La descripción no puede estar vacía.'),
        body('status')
            .isIn(['active', 'inactive', 'deleted']).withMessage('El estado debe ser uno de los siguientes valores: active, inactive, deleted.')
            .optional(),
        body('identification')
            .isString().withMessage('La identificación debe ser una cadena de texto.')
            .isLength({ max: 256 }).withMessage('La identificación no puede tener más de 256 caracteres.')
            .notEmpty().withMessage('La identificación no puede estar vacía.'),
        body('indentification_type')
            .isIn(['J', 'V', 'E', 'G']).withMessage('El tipo de identificación debe ser uno de los siguientes valores: J, V, E, G.')
            .notEmpty().withMessage('El tipo de identificación no puede estar vacío.'),
        body('is_fundation')
            .isBoolean().withMessage('El campo "es fundación" debe ser un valor booleano.')
            .notEmpty().withMessage('El campo "es fundación" no puede estar vacío.'),
    ];

    public updateValidate = [
        body('id')
            .isNumeric().withMessage('El id debe ser un número.'),
        body('razon_social')
            .isString().withMessage('La razón social debe ser una cadena de texto.')
            .isLength({ max: 256 }).withMessage('La razón social no puede tener más de 256 caracteres.')
            .optional(),
        body('description')
            .isString().withMessage('La descripción debe ser una cadena de texto.')
            .optional(),
        body('status')
            .isIn(['active', 'inactive', 'deleted']).withMessage('El estado debe ser uno de los siguientes valores: active, inactive, deleted.')
            .optional(),
        body('identification')
            .isString().withMessage('La identificación debe ser una cadena de texto.')
            .isLength({ max: 256 }).withMessage('La identificación no puede tener más de 256 caracteres.')
            .optional(),
        body('indentification_type')
            .isIn(['J', 'V', 'E', 'G']).withMessage('El tipo de identificación debe ser uno de los siguientes valores: J, V, E, G.')
            .optional(),
        body('is_fundation')
            .isBoolean().withMessage('El campo "es fundación" debe ser un valor booleano.')
            .optional(),
    ];
}