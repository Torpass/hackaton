import { body, param } from "express-validator";

export class DonationValidator {
    public createValidate = [
        body('description')
            .isString().withMessage('La descripción debe ser una cadena de texto.')
            .notEmpty().withMessage('La descripción no puede estar vacía.'),
        body('category_id')
            .isInt().withMessage('El id de la categoría debe ser un número entero.')
            .notEmpty().withMessage('El id de la categoría no puede estar vacío.'),
        body('charity_id')
            .isInt().withMessage('El id de la categoría debe ser un número entero.')
            .notEmpty().withMessage('El id de la categoría no puede estar vacío.'),
        body('medications')
            .isArray().withMessage('Los medicamentos deben ser un array.')
            .custom((value) => {
                value.forEach((medication: any) => {
                    if (typeof medication.medication_id !== 'number') {
                        throw new Error('medication_id debe ser un número.');
                    }
                    if (typeof medication.quantity !== 'number') {
                        throw new Error('quantity debe ser un número.');
                    }
                    if (typeof medication.expiration_date !== 'string') {
                        throw new Error('expiration_date debe ser una cadena de texto.');
                    }
                });
                return true;
            }).withMessage('los medicamentos deben ser un array de objetos con medication_id, quantity y expiration_date.'),  
        ];

    public updateValidate = [
        param('id')
            .isNumeric().withMessage('El id debe ser un número.')
            .notEmpty().withMessage('El id no puede estar vacío.'),
        body('description')
            .optional()
            .isString().withMessage('La descripción debe ser una cadena de texto.'),
        body('category_id')
            .optional()
            .isInt().withMessage('El id de la categoría debe ser un número entero.'),
        body('charity_id')
            .isInt().withMessage('El id de la categoría debe ser un número entero.')
            .notEmpty().withMessage('El id de la categoría no puede estar vacío.'),
        body('medications')
            .isArray().withMessage('Los medicamentos deben ser un array.')
            .custom((value) => {
                value.forEach((medication: any) => {
                    if (typeof medication.medication_id !== 'number') {
                        throw new Error('medication_id debe ser un número.');
                    }
                    if (typeof medication.quantity !== 'number') {
                        throw new Error('quantity debe ser un número.');
                    }
                    if (typeof medication.expiration_date !== 'string') {
                        throw new Error('expiration_date debe ser una cadena de texto.');
                    }
                });
                return true;
            }).withMessage('los medicamentos deben ser un array de objetos con medication_id, quantity y expiration_date.'),  
        ];
}

function params(arg0: string) {
    throw new Error("Function not implemented.");
}
