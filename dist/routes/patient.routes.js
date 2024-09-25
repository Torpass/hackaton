"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const validators_1 = require("../validators");
const validateFields_middleware_1 = require("../middlewares/validateFields.middleware");
const router = express_1.default.Router();
const patientValidator = new validators_1.PatientValidator();
const patientController = new controllers_1.PatientController();
router.get('/getAllActive', patientController.getAllActive);
router.get('/getAll', patientController.getAll);
router.get('/getById/:id', patientController.getById);
router.post('/create', patientValidator.createValidate, validateFields_middleware_1.validateFields, patientController.create);
router.put('/update/:id', validateFields_middleware_1.validateFields, patientValidator.createValidate, patientController.update);
router.delete('/delete/:id', patientController.deletePatient);
module.exports = router;
