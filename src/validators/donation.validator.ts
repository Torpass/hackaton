import { body } from "express-validator";

export class DonationValidator {
    public createValidate = [
        body('name')
            .isString().withMessage('El nombre debe ser una cadena de texto.')
            .isLength({ max: 256 }).withMessage('El nombre no puede tener más de 256 caracteres.')
            .notEmpty().withMessage('El nombre no puede estar vacío.'),
        body('description')
            .isString().withMessage('La descripción debe ser una cadena de texto.')
            .notEmpty().withMessage('La descripción no puede estar vacía.'),
        body('status')
            .isIn(['procesado', 'pendiente', 'cancelado']).withMessage('El estado debe ser uno de los siguientes valores: procesado, pendiente, cancelado.')
            .optional(),
        body('category_id')
            .isInt().withMessage('El id de la categoría debe ser un número entero.')
            .notEmpty().withMessage('El id de la categoría no puede estar vacío.'),
        body('charity_id')
            .isInt().withMessage('El id de la categoría debe ser un número entero.')
            .notEmpty().withMessage('El id de la categoría no puede estar vacío.'),
    ];

    public updateValidate = [
        body('id')
            .isNumeric().withMessage('El id debe ser un número.')
            .notEmpty().withMessage('El id no puede estar vacío.'),
        body('name')
            .optional()
            .isString().withMessage('El nombre debe ser una cadena de texto.')
            .isLength({ max: 256 }).withMessage('El nombre no puede tener más de 256 caracteres.'),
        body('description')
            .optional()
            .isString().withMessage('La descripción debe ser una cadena de texto.'),
        body('status')
            .optional()
            .isIn(['procesado', 'pendiente', 'cancelado']).withMessage('El estado debe ser uno de los siguientes valores: procesado, pendiente, cancelado.'),
        body('category_id')
            .optional()
            .isInt().withMessage('El id de la categoría debe ser un número entero.'),
        body('charity_id')
            .isInt().withMessage('El id de la categoría debe ser un número entero.')
            .notEmpty().withMessage('El id de la categoría no puede estar vacío.'),
    ];
}