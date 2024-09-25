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
const PatientPathologyController = new controllers_1.Patient_Pathology_Controller();
const PatientPathologyControllerValidator = new validators_1.Patient_Pathology_Validator();
router.get('/getAll', verifyTokem_middleware_1.verifyToken, PatientPathologyController.getall);
router.get('/getById/:id', verifyTokem_middleware_1.verifyToken, PatientPathologyController.getbyid);
router.post('/create', PatientPathologyControllerValidator.CreateValidate, validateFields_middleware_1.validateFields, verifyTokem_middleware_1.verifyToken, PatientPathologyController.create);
router.delete('/delete/:patient_id/:pathology_id', verifyTokem_middleware_1.verifyToken, PatientPathologyController.Delete);
module.exports = router;
