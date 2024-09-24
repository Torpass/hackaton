import express from 'express';
import { ReturnController } from "../controllers";
import { ReturnValidator } from '../validators';
import { validateFields } from '../middlewares/validateFields.middleware';


const router = express.Router();

const returnValidator = new ReturnValidator();
const returnController = new ReturnController();

router.get('/getAll', returnController.getAll);
router.get('/getById/:id', returnController.getById);
router.post('/create',returnValidator.createValidate, validateFields ,returnController.create);

module.exports = router;