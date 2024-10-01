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
const treatmentValidator = new validators_1.TreatmentValidator();
const treatmentController = new controllers_1.TreatmentController();
router.get('/getAll', treatmentController.getAll);
router.post('/create', treatmentValidator.createValidate, validateFields_middleware_1.validateFields, treatmentController.create);
router.get("/getById/:id", verifyTokem_middleware_1.verifyToken, treatmentController.getById);
router.put("/update/:id", validateFields_middleware_1.validateFields, treatmentValidator.updateValidate, verifyTokem_middleware_1.verifyToken, treatmentController.update);
router.put("/delete/:id", validateFields_middleware_1.validateFields, treatmentValidator.updateValidate, verifyTokem_middleware_1.verifyToken, treatmentController.deleteTreatment);
module.exports = router;
