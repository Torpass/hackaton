"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentValidator = void 0;
const express_validator_1 = require("express-validator");
class TreatmentValidator {
    constructor() {
        this.createValidate = [
            (0, express_validator_1.body)('patient_id')
                .isInt().withMessage('El id del paciente debe ser un número entero.')
                .notEmpty().withMessage('El id no puede estar vacío.'),
            (0, express_validator_1.body)('observation')
                .isString().withMessage('La descripción debe ser una cadena de texto.')
                .notEmpty().withMessage('La descripción no puede estar vacía.'),
            (0, express_validator_1.body)('status')
                .isIn(['no abastecido', 'parcialmente abastecido', 'abastecido']).withMessage('El estado debe ser uno de los siguientes valores: no abastecido, parcialmente abastecido, abastecido.')
                .optional(),
            (0, express_validator_1.body)('active')
                .isIn(['active', 'inactive', 'deleted']).withMessage('El estado debe ser uno de los siguientes valores: active, inactive, deleted.')
                .optional(),
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
                });
                return true;
            }).withMessage('Las medications deben ser un array de objetos con medication_id y quantity válidos.'),
        ];
        this.updateValidate = [
            (0, express_validator_1.body)('id')
                .isNumeric().withMessage('El id debe ser un número.')
                .notEmpty().withMessage('El id no puede estar vacío.'),
            (0, express_validator_1.body)('status')
                .optional()
                .isIn(['no abastecido', 'parcialmente abastecido', 'abastecido']).withMessage('El estado debe ser uno de los siguientes valores: no abastecido, parcialmente abastecido, abastecido.'),
            (0, express_validator_1.body)('observation')
                .optional()
                .isString().withMessage('La descripción debe ser una cadena de texto.')
                .notEmpty().withMessage('La descripción no puede estar vacía.'),
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
                });
                return true;
            }).withMessage('Las medications deben ser un array de objetos con medication_id y quantity válidos.'),
            (0, express_validator_1.body)('active')
                .isIn(['active', 'inactive', 'deleted']).withMessage('El estado debe ser uno de los siguientes valores: active, inactive, deleted.')
                .optional()
        ];
    }
}
exports.TreatmentValidator = TreatmentValidator;
