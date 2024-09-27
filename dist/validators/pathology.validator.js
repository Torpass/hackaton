"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathologyValidator = void 0;
const express_validator_1 = require("express-validator");
class PathologyValidator {
    constructor() {
        this.CreateValidate = [
            (0, express_validator_1.body)("name")
                .isString().withMessage("El nombre solo debe contener letras")
                .notEmpty().withMessage("El nombre no puede Estar vacio")
        ];
    }
}
exports.PathologyValidator = PathologyValidator;
