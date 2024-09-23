import { body } from "express-validator";

export class TreatmentValidator {
    public createValidate = [
        body('patient_id')
            .isString().withMessage('El nombre debe ser una cadena de texto.')
            .isLength({ max: 256 }).withMessage('El nombre no puede tener más de 256 caracteres.')
            .notEmpty().withMessage('El nombre no puede estar vacío.'),
        body('observation')
            .isString().withMessage('La descripción debe ser una cadena de texto.')
            .notEmpty().withMessage('La descripción no puede estar vacía.'),
        body('status')
            .isIn(['not supplied', 'partially supplied', 'supplied']).withMessage('El estado debe ser uno de los siguientes valores: not supplied, partially supplied, supplied.')
            .optional(),
    ];

    public updateValidate = [
        body('id')
            .isNumeric().withMessage('El id debe ser un número.')
            .notEmpty().withMessage('El id no puede estar vacío.'),
        body('status')
            .optional()
            .isIn(['not supplied', 'partially supplied', 'supplied']).withMessage('El estado debe ser uno de los siguientes valores: not supplied, partially supplied, supplied.'),
        body('observation')
            .optional()
            .isString().withMessage('La descripción debe ser una cadena de texto.')
            .notEmpty().withMessage('La descripción no puede estar vacía.'),
    ];
}