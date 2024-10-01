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
const communityValidator = new validators_1.CommunityValidator();
const communityController = new controllers_1.CommunityController();
router.post("/create", communityValidator.createValidate, validateFields_middleware_1.validateFields, verifyTokem_middleware_1.verifyToken, communityController.create);
router.get("/getAll", verifyTokem_middleware_1.verifyToken, communityController.getAll);
router.put("/update/:id", validateFields_middleware_1.validateFields, communityValidator.createValidate, verifyTokem_middleware_1.verifyToken, communityController.update);
module.exports = router;
