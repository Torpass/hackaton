import { NextFunction } from "express";
import { body, param, validationResult } from "express-validator";

export class MedicationValidator {
    public createValidate = [
        body('name')
            .isString().withMessage('El nombre debe ser una cadena de texto.')
            .isLength({ max: 512 }).withMessage('El nombre no puede tener más de 512 caracteres.')
            .notEmpty().withMessage('El nombre no puede estar vacío.'),
        body('quantity')
            .isInt({ min: 0 }).withMessage('La cantidad debe ser un número entero mayor o igual a 0.')
            .notEmpty().withMessage('La cantidad no puede estar vacía.'),
    ];

    public updateValidate = [
        param('id')
            .isNumeric().withMessage('El id debe ser un número.')
            .notEmpty().withMessage('El id no puede estar vacío.'),
        body('name')
            .optional()
            .isString().withMessage('El nombre debe ser una cadena de texto.')
            .isLength({ max: 512 }).withMessage('El nombre no puede tener más de 512 caracteres.'),
        body('quantity')
            .optional()
            .isInt({ min: 0 }).withMessage('La cantidad debe ser un número entero mayor o igual a 0.'),
        body('status')
        .isIn(['entregado', 'pendiente', 'vencido', 'eliminado']).withMessage('El estado debe ser uno de los siguientes valores: entregado, pendiente, vencido, eliminado.')
        .optional(),
    ];
}