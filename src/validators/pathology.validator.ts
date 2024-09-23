import { body } from "express-validator";
export class pathologyValidator{
    public CreateValidate = [
        body("name")
        .isString().withMessage("El nombre solo debe contener letras")
        .notEmpty().withMessage("El nombre no puede Estar vacio")

    ]

}