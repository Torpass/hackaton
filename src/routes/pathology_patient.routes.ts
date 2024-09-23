import express from 'express';
import { Patient_Pathology_Controller } from "../controllers";
import { Patient_Pathology_Validator } from '../validators';
import { validateFields } from '../middlewares/validateFields.middleware';
import { verifyToken } from '../middlewares/verifyTokem.middleware';



const router = express.Router();

const PatientPathologyController = new Patient_Pathology_Controller();
const PatientPathologyControllerValidator = new Patient_Pathology_Validator();

router.get('/getAll',verifyToken, PatientPathologyController.getall);
router.get('/getById/:id', verifyToken,PatientPathologyController.getbyid);
router.post('/create',PatientPathologyControllerValidator.CreateValidate,validateFields ,verifyToken,PatientPathologyController.create);
router.delete('/delete/:patient_id/:pathology_id',verifyToken,PatientPathologyController.Delete);




module.exports = router;