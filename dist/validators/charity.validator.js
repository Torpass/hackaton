"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharityValidator = void 0;
const express_validator_1 = require("express-validator");
class CharityValidator {
    constructor() {
        this.createValidate = [
            (0, express_validator_1.body)('razon_social')
                .isString().withMessage('La razón social debe ser una cadena de texto.')
                .isLength({ max: 256 }).withMessage('La razón social no puede tener más de 256 caracteres.')
                .notEmpty().withMessage('La razón social no puede estar vacía.'),
            (0, express_validator_1.body)('description')
                .isString().withMessage('La descripción debe ser una cadena de texto.')
                .notEmpty().withMessage('La descripción no puede estar vacía.'),
            (0, express_validator_1.body)('status')
                .isIn(['active', 'inactive', 'deleted']).withMessage('El estado debe ser uno de los siguientes valores: active, inactive, deleted.')
                .optional(),
            (0, express_validator_1.body)('identification')
                .isString().withMessage('La identificación debe ser una cadena de texto.')
                .isLength({ max: 256 }).withMessage('La identificación no puede tener más de 256 caracteres.')
                .notEmpty().withMessage('La identificación no puede estar vacía.'),
            (0, express_validator_1.body)('indentification_type')
                .isIn(['J', 'V', 'E', 'G']).withMessage('El tipo de identificación debe ser uno de los siguientes valores: J, V, E, G.')
                .notEmpty().withMessage('El tipo de identificación no puede estar vacío.'),
            (0, express_validator_1.body)('is_fundation')
                .isBoolean().withMessage('El campo "es fundación" debe ser un valor booleano.')
                .notEmpty().withMessage('El campo "es fundación" no puede estar vacío.'),
        ];
        this.updateValidate = [
            (0, express_validator_1.body)('id')
                .isNumeric().withMessage('El id debe ser un número.'),
            (0, express_validator_1.body)('razon_social')
                .isString().withMessage('La razón social debe ser una cadena de texto.')
                .isLength({ max: 256 }).withMessage('La razón social no puede tener más de 256 caracteres.')
                .optional(),
            (0, express_validator_1.body)('description')
                .isString().withMessage('La descripción debe ser una cadena de texto.')
                .optional(),
            (0, express_validator_1.body)('status')
                .isIn(['active', 'inactive', 'deleted']).withMessage('El estado debe ser uno de los siguientes valores: active, inactive, deleted.')
                .optional(),
            (0, express_validator_1.body)('identification')
                .isString().withMessage('La identificación debe ser una cadena de texto.')
                .isLength({ max: 256 }).withMessage('La identificación no puede tener más de 256 caracteres.')
                .optional(),
            (0, express_validator_1.body)('indentification_type')
                .isIn(['J', 'V', 'E', 'G']).withMessage('El tipo de identificación debe ser uno de los siguientes valores: J, V, E, G.')
                .optional(),
            (0, express_validator_1.body)('is_fundation')
                .isBoolean().withMessage('El campo "es fundación" debe ser un valor booleano.')
                .optional(),
        ];
    }
}
exports.CharityValidator = CharityValidator;
