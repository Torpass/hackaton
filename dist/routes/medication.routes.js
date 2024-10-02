"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const validators_1 = require("../validators");
const validateFields_middleware_1 = require("../middlewares/validateFields.middleware");
const verifyTokem_middleware_1 = require("../middlewares/verifyTokem.middleware");
const router = express_1.default.Router();
const medicationController = new controllers_1.MedicationController();
const medicationValidator = new validators_1.MedicationValidator();
router.post('/create', medicationValidator.createValidate, validateFields_middleware_1.validateFields, medicationController.create);
// Ruta para actualizar un medicamento existente
router.put('/update/:id', verifyTokem_middleware_1.verifyToken, medicationValidator.updateValidate, validateFields_middleware_1.validateFields, medicationController.update);
// Ruta para obtener todos los medicamentos
router.get('/getAll', medicationController.getAll);
// Ruta para obtener un medicamento por ID
router.get('/getById/:id', medicationController.getById);
router.get('/getExpireSoon/', medicationController.getExpireSoon);
router.get('/getExpired/', medicationController.getExpired);
router.get('/getMostRequired/', medicationController.getMostRequeried);
router.get('/getUrgency/', medicationController.getUrgency);
router.get('/getMostDonated/', medicationController.getMostDonated);
router.get('/getMostRequeriedByCommunity/', medicationController.getMostRequeriedByCommunity);
router.delete('/delete/:id', medicationController.delete);
module.exports = router;
