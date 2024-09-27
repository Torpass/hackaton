"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationExpirationDateValidator = void 0;
const express_validator_1 = require("express-validator");
class MedicationExpirationDateValidator {
    constructor() {
        this.createValidate = [
            (0, express_validator_1.body)('medication_id')
                .isInt().withMessage('El id del medicamento debe ser un número entero.')
                .notEmpty().withMessage('El id del medicamento no puede estar vacío.'),
            (0, express_validator_1.body)('expiration_date')
                .isDate().withMessage('La fecha de expiración debe ser una fecha válida.')
                .notEmpty().withMessage('La fecha de expiración no puede estar vacía.'),
            (0, express_validator_1.body)('quantity')
                .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor que 0.')
                .notEmpty().withMessage('La cantidad no puede estar vacía.')
        ];
        this.updateValidate = [
            (0, express_validator_1.param)('id')
                .isInt().withMessage('El id debe ser un número entero.')
                .notEmpty().withMessage('El id no puede estar vacío.'),
            (0, express_validator_1.body)('medication_id')
                .optional()
                .isInt().withMessage('El id del medicamento debe ser un número entero.'),
            (0, express_validator_1.body)('expiration_date')
                .optional()
                .isDate().withMessage('La fecha de expiración debe ser una fecha válida.'),
            (0, express_validator_1.body)('quantity')
                .optional()
                .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor que 0.')
        ];
    }
}
exports.MedicationExpirationDateValidator = MedicationExpirationDateValidator;
