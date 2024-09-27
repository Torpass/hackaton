import { body } from "express-validator";

export class AdminValidator {
  public createValidate = [
    body("first_name")
      .isString()
      .withMessage("El primer nombre debe ser una cadena de texto.")
      .isLength({ max: 100 })
      .withMessage("El primer nombre no puede tener más de 256 caracteres.")
      .notEmpty()
      .withMessage("El primer nombre no puede estar vacío."),
    body("last_name")
      .isString()
      .withMessage("El apellido debe ser una cadena de texto.")
      .isLength({ max: 100 })
      .withMessage("El apellido no puede tener más de 256 caracteres.")
      .notEmpty()
      .withMessage("El apellido no puede estar vacío."),
    body("cedula")
      .isString()
      .withMessage("La cédula debe ser una cadena de texto.")
      .notEmpty()
      .withMessage("La cédula no puede estar vacía."),
    body("email")
      .isString()
      .withMessage("El email debe ser una cadena de texto.")
      .notEmpty()
      .withMessage("El email no puede estar vacía."),
    body("password")
      .notEmpty()
      .withMessage('El campo "password" no puede estar vacío')
      .isString()
      .withMessage('El campo "password" debe ser una cadena de texto')
      .isLength({ min: 5, max: 255 })
      .withMessage('El campo "password" debe tener entre 5 y 255 caracteres'),
    body("status")
      .isIn(["active", "inactive", "deleted"])
      .withMessage(
        "El estado debe ser uno de los siguientes valores: active, inactive, deleted."
      )
      .optional(),
    body("userType")
      .isIn(["admin", "donor"])
      .withMessage(
        "El tipo debe ser uno de los siguientes valores: admin, donor."
      )
      .optional(),
  ];

  public updateValidate = [
    body("id")
      .isNumeric()
      .withMessage("El id debe ser un número.")
      .notEmpty()
      .withMessage("El id no puede estar vacío."),
    body("first_name")
      .optional()
      .isLength({ max: 100 })
      .withMessage("El nombre no puede tener más de 100 caracteres.")
      .notEmpty()
      .withMessage("El nombre no puede estar vacío."),
    body("last_name")
      .optional()
      .isLength({ max: 100 })
      .withMessage("El apellido no puede tener más de 100 caracteres.")
      .notEmpty()
      .withMessage("El apellido no puede estar vacío."),
    body("cedula")
      .optional()
      .isString()
      .withMessage("La cédula debe ser una cadena de texto."),
    body("email")
      .optional()
      .isString()
      .withMessage("El email debe ser una cadena de texto.")
      .notEmpty()
      .withMessage("El email no puede estar vacía."),
    body("status")
      .isIn(["active", "inactive", "deleted"])
      .withMessage(
        "El estado debe ser uno de los siguientes valores: active, inactive, deleted."
      )
      .optional(),
    body("userType")
      .isIn(["admin", "donor"])
      .withMessage(
        "El tipo debe ser uno de los siguientes valores: admin, donor."
      )
      .optional(),
  ];
}
