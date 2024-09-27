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
const returnValidator = new validators_1.ReturnValidator();
const returnController = new controllers_1.ReturnController();
router.get('/getAll', returnController.getAll);
router.get('/getById/:id', returnController.getById);
router.post('/create', returnValidator.createValidate, validateFields_middleware_1.validateFields, returnController.create);
module.exports = router;
