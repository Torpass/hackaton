import express from 'express';
import { DeliveryController } from "../controllers";
import { DeliveryValidator } from '../validators';
import { validateFields } from '../middlewares/validateFields.middleware';
/* import { verifyToken } from '../middlewares/verifyTokem.middleware';
 */

const router = express.Router();

const deliveryValidator = new DeliveryValidator();
const deliveryController = new DeliveryController();

router.get('/getAll',deliveryController.getAll);

router.post('/create',deliveryValidator.createValidate, validateFields, deliveryController.create);

router.get('/getById/:id', deliveryController.getById);

/* router.put('/update/:id', validateFields,treatmentValidator.updateValidate , verifyToken, treatmentController.update);

router.put('/delete/:id', validateFields,treatmentValidator.updateValidate , verifyToken, treatmentController.deleteTreatment); */


module.exports = router;