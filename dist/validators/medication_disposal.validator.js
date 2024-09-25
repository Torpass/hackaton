"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationDisposalValidator = void 0;
const express_validator_1 = require("express-validator");
class MedicationDisposalValidator {
    constructor() {
        this.createValidate = [
            (0, express_validator_1.body)('medication_id')
                .isInt({ min: 1 }).withMessage('El ID del medicamento debe ser un número entero positivo.')
                .notEmpty().withMessage('El ID del medicamento no puede estar vacío.'),
            (0, express_validator_1.body)('quantity')
                .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero positivo.')
                .notEmpty().withMessage('La cantidad no puede estar vacía.'),
            (0, express_validator_1.body)('reason')
                .isString().withMessage('La razón debe ser una cadena de texto.')
                .notEmpty().withMessage('La razón no puede estar vacía.'),
        ];
        this.updateValidate = [
            (0, express_validator_1.body)('id')
                .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo.')
                .notEmpty().withMessage('El ID no puede estar vacío.'),
            (0, express_validator_1.body)('medication_id')
                .optional()
                .isInt({ min: 1 }).withMessage('El ID del medicamento debe ser un número entero positivo.'),
            (0, express_validator_1.body)('quantity')
                .optional()
                .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero positivo.'),
            (0, express_validator_1.body)('reason')
                .optional()
                .isString().withMessage('La razón debe ser una cadena de texto.'),
        ];
    }
}
exports.MedicationDisposalValidator = MedicationDisposalValidator;
