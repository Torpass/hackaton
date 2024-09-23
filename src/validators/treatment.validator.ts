import { body } from "express-validator";

export class TreatmentValidator {
    public createValidate = [
        body('patient_id')
            .isInt().withMessage('El id del paciente debe ser un número entero.')
            .notEmpty().withMessage('El id no puede estar vacío.'),
        body('observation')
            .isString().withMessage('La descripción debe ser una cadena de texto.')
            .notEmpty().withMessage('La descripción no puede estar vacía.'),
        body('status')
            .isIn(['no abastecido', 'parcialmente abastecido', 'abastecido']).withMessage('El estado debe ser uno de los siguientes valores: no abastecido, parcialmente abastecido, abastecido.')
            .optional(),
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
        body('status')
            .optional()
            .isIn(['no abastecido', 'parcialmente abastecido', 'abastecido']).withMessage('El estado debe ser uno de los siguientes valores: no abastecido, parcialmente abastecido, abastecido.'),
        body('observation')
            .optional()
            .isString().withMessage('La descripción debe ser una cadena de texto.')
            .notEmpty().withMessage('La descripción no puede estar vacía.'),
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