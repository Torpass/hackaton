import express from 'express';
import { PatientController } from "../controllers";
import { PatientValidator } from '../validators';
import { validateFields } from '../middlewares/validateFields.middleware';


const router = express.Router();

const patientValidator = new PatientValidator();
const patientController = new PatientController();

router.get('/getAllActive', patientController.getAllActive);
router.get('/getAll', patientController.getAll);
router.get('/getById/:id', patientController.getById);

router.post('/create',patientValidator.createValidate, validateFields ,patientController.create);
router.put('/update/:id', validateFields,patientValidator.createValidate ,patientController.update);

router.delete('/delete/:id',patientController.deletePatient);



module.exports = router;