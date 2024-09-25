"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationValidator = void 0;
const express_validator_1 = require("express-validator");
class MedicationValidator {
    constructor() {
        this.createValidate = [
            (0, express_validator_1.body)('name')
                .isString().withMessage('El nombre debe ser una cadena de texto.')
                .isLength({ max: 512 }).withMessage('El nombre no puede tener más de 512 caracteres.')
                .notEmpty().withMessage('El nombre no puede estar vacío.'),
            (0, express_validator_1.body)('quantity')
                .isInt({ min: 0 }).withMessage('La cantidad debe ser un número entero mayor o igual a 0.')
                .notEmpty().withMessage('La cantidad no puede estar vacía.'),
        ];
        this.updateValidate = [
            (0, express_validator_1.param)('id')
                .isNumeric().withMessage('El id debe ser un número.')
                .notEmpty().withMessage('El id no puede estar vacío.'),
            (0, express_validator_1.body)('name')
                .optional()
                .isString().withMessage('El nombre debe ser una cadena de texto.')
                .isLength({ max: 512 }).withMessage('El nombre no puede tener más de 512 caracteres.'),
            (0, express_validator_1.body)('quantity')
                .optional()
                .isInt({ min: 0 }).withMessage('La cantidad debe ser un número entero mayor o igual a 0.'),
            (0, express_validator_1.body)('status')
                .isIn(['entregado', 'pendiente', 'vencido', 'eliminado']).withMessage('El estado debe ser uno de los siguientes valores: entregado, pendiente, vencido, eliminado.')
                .optional(),
        ];
    }
}
exports.MedicationValidator = MedicationValidator;
