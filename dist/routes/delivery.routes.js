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
/* import { verifyToken } from '../middlewares/verifyTokem.middleware';
 */
const router = express_1.default.Router();
const deliveryValidator = new validators_1.DeliveryValidator();
const deliveryController = new controllers_1.DeliveryController();
router.get('/getPending', (req, res) => deliveryController.getAll(req, res, 'pendiente'));
router.get('/getDelivered', (req, res) => deliveryController.getAll(req, res, 'entregado'));
router.get('/getExpired', (req, res) => deliveryController.getAll(req, res, 'vencido'));
router.get('/getDeleted', (req, res) => deliveryController.getAll(req, res, 'eliminado'));
router.get("/getCommunitiesMostDelivered", deliveryController.communitiesMostDelivered);
router.get("/getDeliveredMedications", deliveryController.deliveriesMedicationReport);
router.get("/getMostDeliveredPatients", deliveryController.getMostDeliveredPatients);
router.get("/getMedicationByDelivery/:id", verifyTokem_middleware_1.verifyToken, deliveryController.getMedicationByDelivery);
router.post('/create', deliveryValidator.createValidate, validateFields_middleware_1.validateFields, deliveryController.create);
router.get('/getById/:id', deliveryController.getById);
router.put('/changePending/:id', (req, res) => deliveryController.changeStatus(req, res, 'pendiente'));
router.put('/changeDelivered/:id', (req, res) => deliveryController.changeStatus(req, res, 'entregado'));
router.put('/changeExpired/:id', (req, res) => deliveryController.changeStatus(req, res, 'vencido'));
router.put('/changeDeleted/:id', (req, res) => deliveryController.changeStatus(req, res, 'eliminado'));
/* router.put('/update/:id', validateFields,treatmentValidator.updateValidate , verifyToken, treatmentController.update); */
module.exports = router;
