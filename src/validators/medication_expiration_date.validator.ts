import { body, param } from "express-validator";

export class MedicationExpirationDateValidator {
    public createValidate = [
        body('medication_id')
            .isInt().withMessage('El id del medicamento debe ser un número entero.')
            .notEmpty().withMessage('El id del medicamento no puede estar vacío.'),
        body('expiration_date')
            .isDate().withMessage('La fecha de expiración debe ser una fecha válida.')
            .notEmpty().withMessage('La fecha de expiración no puede estar vacía.'),
        body('quantity')
            .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor que 0.')
            .notEmpty().withMessage('La cantidad no puede estar vacía.')
    ];

    public updateValidate = [
        param('id')
            .isInt().withMessage('El id debe ser un número entero.')
            .notEmpty().withMessage('El id no puede estar vacío.'),
        body('medication_id')
            .optional()
            .isInt().withMessage('El id del medicamento debe ser un número entero.'),
        body('expiration_date')
            .optional()
            .isDate().withMessage('La fecha de expiración debe ser una fecha válida.'),
        body('quantity')
            .optional()
            .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor que 0.')
    ];
}