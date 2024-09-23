import express from 'express';
import { PathologyController } from "../controllers";
import { pathologyValidator } from '../validators';
import { verifyToken } from '../middlewares/verifyTokem.middleware';
import { validateFields } from '../middlewares/validateFields.middleware';
const router = express.Router();

const PathologyValidator = new pathologyValidator();
const pathologyController = new PathologyController();

router.get('/getAll', verifyToken,pathologyController.getAll);
router.post('/create',verifyToken,validateFields,PathologyValidator.CreateValidate,pathologyController.create);
router.put('/update/:id',verifyToken,validateFields,PathologyValidator.CreateValidate ,pathologyController.update);
router.get('/getById/:id', verifyToken,pathologyController.getById);




module.exports = router;