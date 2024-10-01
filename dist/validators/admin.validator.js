"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidator = void 0;
const express_validator_1 = require("express-validator");
class AdminValidator {
    constructor() {
        this.createValidate = [
            (0, express_validator_1.body)("first_name")
                .isString()
                .withMessage("El primer nombre debe ser una cadena de texto.")
                .isLength({ max: 100 })
                .withMessage("El primer nombre no puede tener más de 256 caracteres.")
                .notEmpty()
                .withMessage("El primer nombre no puede estar vacío."),
            (0, express_validator_1.body)("last_name")
                .isString()
                .withMessage("El apellido debe ser una cadena de texto.")
                .isLength({ max: 100 })
                .withMessage("El apellido no puede tener más de 256 caracteres.")
                .notEmpty()
                .withMessage("El apellido no puede estar vacío."),
            (0, express_validator_1.body)("cedula")
                .isString()
                .withMessage("La cédula debe ser una cadena de texto.")
                .isLength({ min: 8, max: 10 })
                .withMessage("La cédula debe tener entre 8 y 10 caracteres.")
                .notEmpty()
                .withMessage("La cédula no puede estar vacía."),
            (0, express_validator_1.body)("email")
                .isString()
                .withMessage("El email debe ser una cadena de texto.")
                .notEmpty()
                .withMessage("El email no puede estar vacía."),
            (0, express_validator_1.body)("password")
                .notEmpty()
                .withMessage('El campo "password" no puede estar vacío')
                .isString()
                .withMessage('El campo "password" debe ser una cadena de texto')
                .isLength({ min: 5, max: 255 })
                .withMessage('El campo "password" debe tener entre 5 y 255 caracteres'),
            (0, express_validator_1.body)("status")
                .isIn(["active", "inactive", "deleted"])
                .withMessage("El estado debe ser uno de los siguientes valores: active, inactive, deleted.")
                .optional(),
            (0, express_validator_1.body)("userType")
                .isIn(["admin", "donor"])
                .withMessage("El tipo debe ser uno de los siguientes valores: admin, donor.")
                .optional(),
            (0, express_validator_1.body)("razon_social")
                .isString()
                .withMessage("la razon social debe ser una cadena de texto.")
                .isLength({ max: 256 })
                .withMessage("La razon social no puede tener más de 256 caracteres.")
                .notEmpty()
                .withMessage("El nombre no puede estar vacío.")
                .optional(),
            (0, express_validator_1.body)("description")
                .isString()
                .withMessage("la razon social debe ser una cadena de texto.")
                .isLength({ max: 256 })
                .withMessage("La razon social no puede tener más de 256 caracteres.")
                .notEmpty()
                .withMessage("El nombre no puede estar vacío.")
                .optional(),
            (0, express_validator_1.body)("is_fundation")
                .isBoolean()
                .optional()
        ];
        this.updateValidate = [
            (0, express_validator_1.body)("id")
                .isNumeric()
                .withMessage("El id debe ser un número.")
                .notEmpty()
                .withMessage("El id no puede estar vacío."),
            (0, express_validator_1.body)("first_name")
                .optional()
                .isLength({ max: 100 })
                .withMessage("El nombre no puede tener más de 100 caracteres.")
                .notEmpty()
                .withMessage("El nombre no puede estar vacío."),
            (0, express_validator_1.body)("last_name")
                .optional()
                .isLength({ max: 100 })
                .withMessage("El apellido no puede tener más de 100 caracteres.")
                .notEmpty()
                .withMessage("El apellido no puede estar vacío."),
            (0, express_validator_1.body)("cedula")
                .optional()
                .isLength({ min: 8, max: 10 })
                .withMessage("La cédula debe tener entre 8 y 10 caracteres.")
                .notEmpty()
                .withMessage("La cédula no puede estar vacía.")
                .isString()
                .withMessage("La cédula debe ser una cadena de texto."),
            (0, express_validator_1.body)("email")
                .optional()
                .isString()
                .withMessage("El email debe ser una cadena de texto.")
                .notEmpty()
                .withMessage("El email no puede estar vacía."),
            (0, express_validator_1.body)("status")
                .isIn(["active", "inactive", "deleted"])
                .withMessage("El estado debe ser uno de los siguientes valores: active, inactive, deleted.")
                .optional(),
            (0, express_validator_1.body)("userType")
                .isIn(["admin", "donor"])
                .withMessage("El tipo debe ser uno de los siguientes valores: admin, donor.")
                .optional(),
        ];
    }
}
exports.AdminValidator = AdminValidator;
