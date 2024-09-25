import { body } from "express-validator";

export class ReturnValidator {
    public createValidate = [
        body('reason')
            .isString().withMessage('El campo reason debe ser una string.')
            .notEmpty().withMessage('El campo reason debe estar vacío.'),
        body('date')
            .isDate().withMessage('El campo date debe ser una fecha.')
            .notEmpty().withMessage('El date no puede estar vacío.'),
        body('delivery_id')
            .isInt().withMessage('El id de la delivery_id debe ser un número entero.')
            .notEmpty().withMessage('El id de la delivery_id no puede estar vacío.'),
        body('medications')
        .isArray().withMessage('Las medications deben ser un array.')
        .custom((value) => {
            value.forEach((medication: any) => {
                if (typeof medication.medication_id !== 'number') {
                    throw new Error('medication_id debe ser un número.');
                }
                if (typeof medication.quantity !== 'number') {
                    throw new Error('quantity debe ser un número.');
                }
                if (typeof medication.reason !== 'string') {
                    throw new Error('reason debe ser un string.');
                }
            });
            return true;
        }).withMessage('Las medications deben ser un array de objetos con medication_id, quantity y reason válidos.'),  
    ];

    public updateValidate = [
        body('id')
            .isNumeric().withMessage('El id debe ser un número.')
            .notEmpty().withMessage('El id no puede estar vacío.'),
        body('reason')
            .optional()
            .isString().withMessage('El campo reason debe ser una string.')
            .notEmpty().withMessage('El campo reason debe estar vacío.'),
        body('date')
            .optional()
            .isDate().withMessage('El campo date debe ser una fecha.')
            .notEmpty().withMessage('El date no puede estar vacío.'),
        body('delivery_id')
            .optional()
            .isInt().withMessage('El id de la delivery_id debe ser un número entero.')
            .notEmpty().withMessage('El id de la delivery_id no puede estar vacío.'),
        body('medications')
        .optional()
        .isArray().withMessage('Las medications deben ser un array.')
        .custom((value) => {
            value.forEach((medication: any) => {
                if (typeof medication.medication_id !== 'number') {
                    throw new Error('medication_id debe ser un número.');
                }
                if (typeof medication.quantity !== 'number') {
                    throw new Error('quantity debe ser un número.');
                }
                if (typeof medication.reason !== 'string') {
                    throw new Error('reason debe ser un string.');
                }
            });
            return true;
        }).withMessage('Las medications deben ser un array de objetos con medication_id, quantity y reason válidos.'),  
    ];
}