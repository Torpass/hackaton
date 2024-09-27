"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnValidator = void 0;
const express_validator_1 = require("express-validator");
class ReturnValidator {
    constructor() {
        this.createValidate = [
            (0, express_validator_1.body)('reason')
                .isString().withMessage('El campo reason debe ser una string.')
                .notEmpty().withMessage('El campo reason debe estar vacío.'),
            (0, express_validator_1.body)('date')
                .isDate().withMessage('El campo date debe ser una fecha.')
                .notEmpty().withMessage('El date no puede estar vacío.'),
            (0, express_validator_1.body)('delivery_id')
                .isInt().withMessage('El id de la delivery_id debe ser un número entero.')
                .notEmpty().withMessage('El id de la delivery_id no puede estar vacío.'),
            (0, express_validator_1.body)('medications')
                .isArray().withMessage('Las medications deben ser un array.')
                .custom((value) => {
                value.forEach((medication) => {
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
        this.updateValidate = [
            (0, express_validator_1.body)('id')
                .isNumeric().withMessage('El id debe ser un número.')
                .notEmpty().withMessage('El id no puede estar vacío.'),
            (0, express_validator_1.body)('reason')
                .optional()
                .isString().withMessage('El campo reason debe ser una string.')
                .notEmpty().withMessage('El campo reason debe estar vacío.'),
            (0, express_validator_1.body)('date')
                .optional()
                .isDate().withMessage('El campo date debe ser una fecha.')
                .notEmpty().withMessage('El date no puede estar vacío.'),
            (0, express_validator_1.body)('delivery_id')
                .optional()
                .isInt().withMessage('El id de la delivery_id debe ser un número entero.')
                .notEmpty().withMessage('El id de la delivery_id no puede estar vacío.'),
            (0, express_validator_1.body)('medications')
                .optional()
                .isArray().withMessage('Las medications deben ser un array.')
                .custom((value) => {
                value.forEach((medication) => {
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
}
exports.ReturnValidator = ReturnValidator;
