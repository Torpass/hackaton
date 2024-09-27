"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const medication_disposal_controller_1 = require("../controllers/medication_disposal.controller");
const medication_disposal_validator_1 = require("../validators/medication_disposal.validator");
const validateFields_middleware_1 = require("../middlewares/validateFields.middleware");
const verifyTokem_middleware_1 = require("../middlewares/verifyTokem.middleware");
const router = express_1.default.Router();
const medicationDisposalController = new medication_disposal_controller_1.MedicationDisposalController();
const medicationDisposalValidator = new medication_disposal_validator_1.MedicationDisposalValidator();
router.post('/create', medicationDisposalValidator.createValidate, validateFields_middleware_1.validateFields, verifyTokem_middleware_1.verifyToken, medicationDisposalController.create);
router.get('/getById/:id', verifyTokem_middleware_1.verifyToken, medicationDisposalController.getById);
router.get('/getAll', verifyTokem_middleware_1.verifyToken, medicationDisposalController.getAll);
module.exports = router;
