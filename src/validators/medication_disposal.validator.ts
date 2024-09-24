import { body } from "express-validator";

export class MedicationDisposalValidator {
    public createValidate = [
        body('medication_id')
            .isInt({ min: 1 }).withMessage('El ID del medicamento debe ser un número entero positivo.')
            .notEmpty().withMessage('El ID del medicamento no puede estar vacío.'),
        body('quantity')
            .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero positivo.')
            .notEmpty().withMessage('La cantidad no puede estar vacía.'),
        body('reason')
            .isString().withMessage('La razón debe ser una cadena de texto.')
            .notEmpty().withMessage('La razón no puede estar vacía.'),
    ];

    public updateValidate = [
        body('id')
            .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo.')
            .notEmpty().withMessage('El ID no puede estar vacío.'),
        body('medication_id')
            .optional()
            .isInt({ min: 1 }).withMessage('El ID del medicamento debe ser un número entero positivo.'),
        body('quantity')
            .optional()
            .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero positivo.'),
        body('reason')
            .optional()
            .isString().withMessage('La razón debe ser una cadena de texto.'),
    ];
}