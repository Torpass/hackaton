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
const categoryValidator = new validators_1.CategoryValidator();
const categoryController = new controllers_1.CategoryController();
router.get('/getAllActive', categoryController.getAllActive);
router.get('/getAll', categoryController.getAll);
router.post('/create', categoryValidator.createValidate, validateFields_middleware_1.validateFields, categoryController.create);
router.put('/update/:id', validateFields_middleware_1.validateFields, categoryValidator.createValidate, categoryController.update);
router.delete('/delete/:id', categoryController.deleteCategory);
module.exports = router;
