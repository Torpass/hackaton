"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidator = void 0;
const express_validator_1 = require("express-validator");
class AdminValidator {
    constructor() {
        this.createValidate = [
            (0, express_validator_1.body)('first_name')
                .isString().withMessage('El primer nombre debe ser una cadena de texto.')
                .isLength({ max: 100 }).withMessage('El primer nombre no puede tener más de 256 caracteres.')
                .notEmpty().withMessage('El primer nombre no puede estar vacío.'),
            (0, express_validator_1.body)('last_name')
                .isString().withMessage('El apellido debe ser una cadena de texto.')
                .isLength({ max: 100 }).withMessage('El apellido no puede tener más de 256 caracteres.')
                .notEmpty().withMessage('El apellido no puede estar vacío.'),
            (0, express_validator_1.body)('cedula')
                .isString().withMessage('La cédula debe ser una cadena de texto.')
                .isLength({ min: 6, max: 8 }).withMessage('La cédula debe tener entre 6 y 8 caracteres.')
                .notEmpty().withMessage('La cédula no puede estar vacía.'),
            (0, express_validator_1.body)('password')
                .notEmpty().withMessage('El campo "password" no puede estar vacío')
                .isString().withMessage('El campo "password" debe ser una cadena de texto')
                .isLength({ min: 5, max: 255 }).withMessage('El campo "password" debe tener entre 5 y 255 caracteres'),
            (0, express_validator_1.body)('status')
                .isIn(['active', 'inactive', 'deleted']).withMessage('El estado debe ser uno de los siguientes valores: active, inactive, deleted.')
                .optional()
        ];
        this.updateValidate = [
            (0, express_validator_1.body)('id')
                .isNumeric().withMessage('El id debe ser un número.')
                .notEmpty().withMessage('El id no puede estar vacío.'),
            (0, express_validator_1.body)('first_name')
                .optional()
                .isLength({ max: 100 }).withMessage('El nombre no puede tener más de 100 caracteres.')
                .notEmpty().withMessage('El nombre no puede estar vacío.'),
            (0, express_validator_1.body)('last_name')
                .optional()
                .isLength({ max: 100 }).withMessage('El apellido no puede tener más de 100 caracteres.')
                .notEmpty().withMessage('El apellido no puede estar vacío.'),
            (0, express_validator_1.body)('cedula')
                .optional()
                .isString().withMessage('La cédula debe ser una cadena de texto.')
                .isLength({ min: 10, max: 30 }).withMessage('La cédula debe tener entre 10 y 30 caracteres.'),
            (0, express_validator_1.body)('status')
                .isIn(['active', 'inactive', 'deleted']).withMessage('El estado debe ser uno de los siguientes valores: active, inactive, deleted.')
                .optional()
        ];
    }
}
exports.AdminValidator = AdminValidator;
