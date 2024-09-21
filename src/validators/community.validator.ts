import { body } from "express-validator";

class CommunityValidator {
    public createValidate = [
        body('name')
            .isString().withMessage('El nombre debe ser una cadena de texto.')
            .isLength({ max: 256 }).withMessage('El nombre no puede tener más de 256 caracteres.')
            .notEmpty().withMessage('El nombre no puede estar vacío.'),
        body('region')
            .isString().withMessage('La región debe ser una cadena de texto.')
            .notEmpty().withMessage('La región no puede estar vacía.'),
        body('status')
            .isIn(['active', 'inactive', 'deleted']).withMessage('El estado debe ser uno de los siguientes valores: active, inactive, deleted.')
            .optional()
    ];

    public updteValidate = [
        body('id')
            .isNumeric().withMessage('El id debe ser un número entero.')
            .notEmpty().withMessage('El id no puede estar vacío.'),
        body('name')
            .isString().withMessage('El nombre debe ser una cadena de texto.')
            .isLength({ max: 256 }).withMessage('El nombre no puede tener más de 256 caracteres.')
            .notEmpty().withMessage('El nombre no puede estar vacío.'),
        body('region')
            .isString().withMessage('La región debe ser una cadena de texto.')
            .notEmpty().withMessage('La región no puede estar vacía.'),
        body('status')
            .isIn(['active', 'inactive', 'deleted']).withMessage('El estado debe ser uno de los siguientes valores: active, inactive, deleted.')
            .optional()
    ];
}

export { CommunityValidator };