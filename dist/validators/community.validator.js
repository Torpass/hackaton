"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityValidator = void 0;
const express_validator_1 = require("express-validator");
class CommunityValidator {
    constructor() {
        this.createValidate = [
            (0, express_validator_1.body)('name')
                .isString().withMessage('El nombre debe ser una cadena de texto.')
                .isLength({ max: 256 }).withMessage('El nombre no puede tener más de 256 caracteres.')
                .notEmpty().withMessage('El nombre no puede estar vacío.'),
            (0, express_validator_1.body)('region')
                .isString().withMessage('La región debe ser una cadena de texto.')
                .notEmpty().withMessage('La región no puede estar vacía.'),
            (0, express_validator_1.body)('status')
                .isIn(['active', 'inactive', 'deleted']).withMessage('El estado debe ser uno de los siguientes valores: active, inactive, deleted.')
                .optional()
        ];
        this.updteValidate = [
            (0, express_validator_1.body)('id')
                .isNumeric().withMessage('El id debe ser un número entero.')
                .notEmpty().withMessage('El id no puede estar vacío.'),
            (0, express_validator_1.body)('name')
                .isString().withMessage('El nombre debe ser una cadena de texto.')
                .isLength({ max: 256 }).withMessage('El nombre no puede tener más de 256 caracteres.')
                .notEmpty().withMessage('El nombre no puede estar vacío.'),
            (0, express_validator_1.body)('region')
                .isString().withMessage('La región debe ser una cadena de texto.')
                .notEmpty().withMessage('La región no puede estar vacía.'),
            (0, express_validator_1.body)('status')
                .isIn(['active', 'inactive', 'deleted']).withMessage('El estado debe ser uno de los siguientes valores: active, inactive, deleted.')
                .optional()
        ];
    }
}
exports.CommunityValidator = CommunityValidator;
