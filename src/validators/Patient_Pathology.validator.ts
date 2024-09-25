import { body } from "express-validator";
export class Patient_Pathology_Validator{
    public CreateValidate = [
        body("patient_id")
            .isNumeric().withMessage("El id del paciente debe ser un numero entero")
            .notEmpty().withMessage("patient_id no deberia estar vacio"),
        body("pathology_id")
            .isNumeric().withMessage("El id de la patologia debe ser un numero entero")
            .notEmpty().withMessage("pathology_id no deberia estar vacio"),
        body("description")
            .isString().withMessage("La descripcion deberia ser valores alphanumericos")
            .notEmpty().withMessage("pathology_id no deberia estar vacio"),

    ]
    public FindUserValidator = [
        body("id")
        .isNumeric().withMessage("El id del paciente debe ser un numero entero")
        .notEmpty().withMessage("patient_id no deberia estar vacio"),
    ]

}