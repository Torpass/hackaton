import { body } from "express-validator";

export class DeliveryValidator {
    public createValidate = [
        body('appointment_date')
            .isDate().withMessage('El id del appointment_date debe ser una fecha.')
            .notEmpty().withMessage('El id no puede estar vacío.'),
        body('withdrawal_date')
            .optional()
            .isDate().withMessage('El id del withdrawal_date debe ser una fecha.'),
        body('expiration_date')
            .isDate().withMessage('El id del expiration_date debe ser una fecha.')
            .notEmpty().withMessage('El id no puede estar vacío.'),
        body('treatment_id')
            .isInt().withMessage('El id de la treatment_id debe ser un número entero.')
            .notEmpty().withMessage('El id de la treatment_id no puede estar vacío.'),
        body('patient_id')
            .isInt().withMessage('El id de la patient_id debe ser un número entero.')
            .notEmpty().withMessage('El id de la treatment_id no puede estar vacío.'),
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
            });
            return true;
        }).withMessage('Las medications deben ser un array de objetos con medication_id y quantity válidos.'),  
    ];

    public updateValidate = [
        body('id')
            .isNumeric().withMessage('El id debe ser un número.')
            .notEmpty().withMessage('El id no puede estar vacío.'),

        body('appointment_date')
            .optional()
            .isDate().withMessage('El appointment_date debe ser una fecha válida.'),

        body('withdrawal_date')
            .optional()
            .isDate().withMessage('El withdrawal_date debe ser una fecha válida.'),

        body('expiration_date')
            .optional()
            .isDate().withMessage('El expiration_date debe ser una fecha válida.'),

        body('treatment_id')
            .optional()
            .isInt().withMessage('El treatment_id debe ser un número entero.'),

        body('patient_id')
            .optional()
            .isInt().withMessage('El patient_id debe ser un número entero.'),

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
                });
                return true;
            }).withMessage('Las medications deben ser un array de objetos con medication_id y quantity válidos.'),
    ];
}