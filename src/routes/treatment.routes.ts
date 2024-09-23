import express from 'express';
import { TreatmentController } from "../controllers";
import { TreatmentValidator } from '../validators';
import { validateFields } from '../middlewares/validateFields.middleware';
import { verifyToken } from '../middlewares/verifyTokem.middleware';


const router = express.Router();

const treatmentValidator = new TreatmentValidator();
const treatmentController = new TreatmentController();

router.get('/getAll', treatmentController.getAll);

router.post('/create',treatmentValidator.createValidate, validateFields , treatmentController.create);

router.get('/getById/:id',  verifyToken, treatmentController.getById);

router.put('/update/:id', validateFields,treatmentValidator.updateValidate , verifyToken, treatmentController.update);


module.exports = router;