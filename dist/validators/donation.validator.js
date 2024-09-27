"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationValidator = void 0;
const express_validator_1 = require("express-validator");
class DonationValidator {
    constructor() {
        this.createValidate = [
            (0, express_validator_1.body)('description')
                .isString().withMessage('La descripción debe ser una cadena de texto.')
                .notEmpty().withMessage('La descripción no puede estar vacía.'),
            (0, express_validator_1.body)('category_id')
                .isInt().withMessage('El id de la categoría debe ser un número entero.')
                .notEmpty().withMessage('El id de la categoría no puede estar vacío.'),
            (0, express_validator_1.body)('charity_id')
                .isInt().withMessage('El id de la categoría debe ser un número entero.')
                .notEmpty().withMessage('El id de la categoría no puede estar vacío.'),
            (0, express_validator_1.body)('medications')
                .isArray().withMessage('Los medicamentos deben ser un array.')
                .custom((value) => {
                value.forEach((medication) => {
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
        this.updateValidate = [
            (0, express_validator_1.param)('id')
                .isNumeric().withMessage('El id debe ser un número.')
                .notEmpty().withMessage('El id no puede estar vacío.'),
            (0, express_validator_1.body)('description')
                .optional()
                .isString().withMessage('La descripción debe ser una cadena de texto.'),
            (0, express_validator_1.body)('category_id')
                .optional()
                .isInt().withMessage('El id de la categoría debe ser un número entero.'),
            (0, express_validator_1.body)('charity_id')
                .isInt().withMessage('El id de la categoría debe ser un número entero.')
                .notEmpty().withMessage('El id de la categoría no puede estar vacío.'),
            (0, express_validator_1.body)('medications')
                .isArray().withMessage('Los medicamentos deben ser un array.')
                .custom((value) => {
                value.forEach((medication) => {
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
}
exports.DonationValidator = DonationValidator;
function params(arg0) {
    throw new Error("Function not implemented.");
}
