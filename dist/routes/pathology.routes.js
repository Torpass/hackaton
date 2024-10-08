"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const validators_1 = require("../validators");
const verifyTokem_middleware_1 = require("../middlewares/verifyTokem.middleware");
const validateFields_middleware_1 = require("../middlewares/validateFields.middleware");
const router = express_1.default.Router();
const pathologyValidator = new validators_1.PathologyValidator();
const pathologyController = new controllers_1.PathologyController();
router.get('/getAll', verifyTokem_middleware_1.verifyToken, pathologyController.getAll);
router.get('/getById/:id', verifyTokem_middleware_1.verifyToken, pathologyController.getById);
router.post('/create', verifyTokem_middleware_1.verifyToken, pathologyValidator.CreateValidate, validateFields_middleware_1.validateFields, pathologyController.create);
router.put('/update/:id', verifyTokem_middleware_1.verifyToken, pathologyValidator.CreateValidate, validateFields_middleware_1.validateFields, pathologyController.update);
module.exports = router;
