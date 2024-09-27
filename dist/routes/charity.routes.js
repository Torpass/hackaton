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
const charityValidator = new validators_1.CharityValidator();
const charityController = new controllers_1.CharityController();
router.get('/getAllActive', charityController.getAllActive);
router.get('/getAll', charityController.getAll);
router.post('/create', charityValidator.createValidate, validateFields_middleware_1.validateFields, charityController.create);
router.put('/update/:id', validateFields_middleware_1.validateFields, charityValidator.updateValidate, charityController.update);
router.delete('/delete/:id', charityController.deleteCharity);
module.exports = router;
