"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientValidator = void 0;
const express_validator_1 = require("express-validator");
class PatientValidator {
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
            (0, express_validator_1.body)('birth_date')
                .isDate().withMessage('La fecha de nacimiento debe ser una fecha válida.')
                .notEmpty().withMessage('La fecha de nacimiento no puede estar vacía.'),
            (0, express_validator_1.body)('email')
                .isEmail().withMessage('El correo electrónico debe ser válido.')
                .notEmpty().withMessage('El correo electrónico no puede estar vacío.'),
            (0, express_validator_1.body)('id_card')
                .isNumeric().withMessage('la identificación debe ser un número.')
                .isLength({ min: 6, max: 8 }).withMessage('La cédula debe tener entre 6 y 8 caracteres.')
                .notEmpty().withMessage('La cédula no puede estar vacía.'),
            (0, express_validator_1.body)('phone')
                .isString().withMessage('El número de teléfono debe ser una cadena de texto.')
                .matches(/^\d+$/).withMessage('El número de teléfono debe contener solo números.')
                .isLength({ max: 12 }).withMessage('El número de teléfono debe tener 12 caracteres.'),
            (0, express_validator_1.body)('address')
                .isString().withMessage('La dirección debe ser una cadena de texto.')
                .notEmpty().withMessage('La dirección no puede estar vacía.'),
            (0, express_validator_1.body)('gender')
                .isString().withMessage('El genero debe ser una cadena de texto.')
                .notEmpty().withMessage('El género no puede estar vacío.'),
            (0, express_validator_1.body)('status')
                .isIn(['active', 'inactive', 'deleted']).withMessage('El estado debe ser uno de los siguientes valores: active, inactive, deleted.')
                .optional(),
            (0, express_validator_1.body)('community_id')
                .isInt().withMessage('El id de la categoría debe ser un número entero.')
                .notEmpty().withMessage('El id de la categoría no puede estar vacío.'),
            (0, express_validator_1.body)('economic_status')
                .isIn(["clase alta", "clase media alta", "clase media", "clase media baja", "clase baja", "no especificado"]).withMessage('El estado económico debe ser uno de los siguientes valores: l"clase alta", "clase media alta", "clase media", "clase media baja" "clase baja", "no especificado"')
                .notEmpty().withMessage('El estado económico no puede estar vacío.'),
            (0, express_validator_1.body)('vulnerability_level')
                .isIn(["muy critico", "critico", "medio", "bajo", "no especificado"]).withMessage('El nivel de vulnerabilidad debe ser uno de los siguientes valores: "muy critico", "critico", "medio", "bajo", "no especificado"')
                .notEmpty().withMessage('El nivel de vulnerabilidad no puede estar vacío.'),
            (0, express_validator_1.body)('pathologies')
                .isArray().withMessage('Las patologías deben ser un array.')
                .custom((value) => {
                value.forEach((pathology) => {
                    if (typeof pathology.id_pathology !== 'number') {
                        throw new Error('pathology_id debe ser un número.');
                    }
                    if (typeof pathology.description !== 'string') {
                        throw new Error('description debe ser una cadena de texto.');
                    }
                });
                return true;
            }).withMessage('Las patologías deben ser un array de objetos con id_pathology y description válidos.'),
        ];
        this.updateValidate = [
            (0, express_validator_1.param)('id')
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
            (0, express_validator_1.body)('birthday')
                .optional()
                .isDate().withMessage('La fecha de nacimiento debe ser una fecha válida.'),
            (0, express_validator_1.body)('email')
                .optional()
                .isEmail().withMessage('El correo electrónico debe ser válido.'),
            (0, express_validator_1.body)('id_card')
                .optional()
                .isString().withMessage('La cédula debe ser una cadena de texto.')
                .isLength({ min: 10, max: 30 }).withMessage('La cédula debe tener entre 10 y 30 caracteres.'),
            (0, express_validator_1.body)('phone')
                .optional()
                .isString().withMessage('El número de teléfono debe ser una cadena de texto.')
                .matches(/^\d+$/).withMessage('El número de teléfono debe contener solo números.')
                .isLength({ max: 12 }).withMessage('El número de teléfono debe tener 12 caracteres.'),
            (0, express_validator_1.body)('address')
                .optional()
                .isString().withMessage('La dirección debe ser una cadena de texto.'),
            (0, express_validator_1.body)('gender')
                .optional()
                .isString().withMessage('El genero debe ser una cadena de texto.')
                .notEmpty().withMessage('El género no puede estar vacío.'),
            (0, express_validator_1.body)('status')
                .optional()
                .isIn(['active', 'inactive', 'deleted']).withMessage('El estado debe ser uno de los siguientes valores: active, inactive, deleted.'),
            (0, express_validator_1.body)('community_id')
                .optional()
                .isNumeric().withMessage('El id de la comunidad debe ser un número.'),
            (0, express_validator_1.body)('economic_status')
                .isIn(["clase alta", "clase media alta", "clase media", "clase media baja", "clase baja", "no especificado"]).withMessage('El estado económico debe ser uno de los siguientes valores: l"clase alta", "clase media alta", "clase media", "clase media baja" "clase baja", "no especificado"')
                .notEmpty().withMessage('El estado económico no puede estar vacío.'),
            (0, express_validator_1.body)('vulnerability_level')
                .isIn(["muy critico", "critico", "medio", "bajo", "no especificado"]).withMessage('El nivel de vulnerabilidad debe ser uno de los siguientes valores: "muy critico", "critico", "medio", "bajo", "no especificado"')
                .notEmpty().withMessage('El nivel de vulnerabilidad no puede estar vacío.'),
            (0, express_validator_1.body)('pathologies')
                .isArray().withMessage('Las patologías deben ser un array.')
                .custom((value) => {
                value.forEach((pathology) => {
                    if (typeof pathology.id_pathology !== 'number') {
                        throw new Error('pathology_id debe ser un número.');
                    }
                    if (typeof pathology.description !== 'string') {
                        throw new Error('description debe ser una cadena de texto.');
                    }
                });
                return true;
            }).withMessage('Las patologías deben ser un array de objetos con id_pathology y description válidos.'),
        ];
    }
}
exports.PatientValidator = PatientValidator;
