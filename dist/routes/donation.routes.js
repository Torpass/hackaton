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
const donationValidator = new validators_1.DonationValidator();
const donationController = new controllers_1.DonationController();
router.get('/getAll', donationController.getAll);
router.post('/create', donationValidator.createValidate, validateFields_middleware_1.validateFields, donationController.create);
router.put('/update/:id', validateFields_middleware_1.validateFields, donationValidator.createValidate, donationController.update);
router.get('/getById/:id', donationController.getById);
module.exports = router;
