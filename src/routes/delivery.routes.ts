import express from 'express';
import { DeliveryController } from "../controllers";
import { DeliveryValidator } from '../validators';
import { validateFields } from '../middlewares/validateFields.middleware';
/* import { verifyToken } from '../middlewares/verifyTokem.middleware';
 */

const router = express.Router();

const deliveryValidator = new DeliveryValidator();
const deliveryController = new DeliveryController();

router.get('/getPending', (req, res) => deliveryController.getAll(req, res, 'pendiente'));
router.get('/getDelivered', (req, res) => deliveryController.getAll(req, res, 'entregado'));
router.get('/getExpired', (req, res) => deliveryController.getAll(req, res, 'vencido'));
router.get('/getDeleted', (req, res) => deliveryController.getAll(req, res, 'eliminado'));

router.get("/getCommunitiesMostDelivered", 
    deliveryController.communitiesMostDelivered);

router.get("/getMedicationByDeliver/:id", 
        deliveryController.getMedicationByDelivery);
    

router.get("/getDeliveredMedications", 
    deliveryController.deliveriesMedicationReport);

router.get("/getMostDeliveredPatients", 
    deliveryController.getMostDeliveredPatients);
    

router.post('/create',deliveryValidator.createValidate, validateFields, deliveryController.create);
router.get('/getById/:id', deliveryController.getById);

router.put('/changePending/:id', (req, res) => deliveryController.changeStatus(req, res, 'pendiente'));
router.put('/changeDelivered/:id', (req, res) => deliveryController.changeStatus(req, res, 'entregado'));
router.put('/changeExpired/:id', (req, res) => deliveryController.changeStatus(req, res, 'vencido'));
router.put('/changeDeleted/:id', (req, res) => deliveryController.changeStatus(req, res, 'eliminado'));

/* router.put('/update/:id', validateFields,treatmentValidator.updateValidate , verifyToken, treatmentController.update); */

module.exports = router;