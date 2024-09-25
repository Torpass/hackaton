"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient_Pathology_Validator = void 0;
const express_validator_1 = require("express-validator");
class Patient_Pathology_Validator {
    constructor() {
        this.CreateValidate = [
            (0, express_validator_1.body)("patient_id")
                .isNumeric().withMessage("El id del paciente debe ser un numero entero")
                .notEmpty().withMessage("patient_id no deberia estar vacio"),
            (0, express_validator_1.body)("pathology_id")
                .isNumeric().withMessage("El id de la patologia debe ser un numero entero")
                .notEmpty().withMessage("pathology_id no deberia estar vacio"),
            (0, express_validator_1.body)("description")
                .isString().withMessage("La descripcion deberia ser valores alphanumericos")
                .notEmpty().withMessage("pathology_id no deberia estar vacio"),
        ];
        this.FindUserValidator = [
            (0, express_validator_1.body)("id")
                .isNumeric().withMessage("El id del paciente debe ser un numero entero")
                .notEmpty().withMessage("patient_id no deberia estar vacio"),
        ];
    }
}
exports.Patient_Pathology_Validator = Patient_Pathology_Validator;
