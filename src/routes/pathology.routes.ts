import express from 'express';
import { PathologyController } from "../controllers";
import { PathologyValidator } from '../validators';
import { verifyToken } from '../middlewares/verifyTokem.middleware';
import { validateFields } from '../middlewares/validateFields.middleware';
const router = express.Router();

const pathologyValidator = new PathologyValidator();
const pathologyController = new PathologyController();

router.get('/getAll', 
    verifyToken,
    pathologyController.getAll);

router.get('/getById/:id', 
    verifyToken,
    pathologyController.getById);

router.get('/getPatientCount', 
        pathologyController.patientCount);

router.delete('/delete/:id', 
            pathologyController.delete);

router.get('/getAllActive', 
            pathologyController.getAllActive);
    

router.post('/create',
    verifyToken,
    pathologyValidator.CreateValidate,
    validateFields,
    pathologyController.create);

router.put('/update/:id',
    verifyToken,
    pathologyValidator.CreateValidate,
    validateFields,
    pathologyController.update);

module.exports = router;