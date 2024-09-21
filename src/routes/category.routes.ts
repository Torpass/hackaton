import express from 'express';
import { CategoryController } from "../controllers";
import { CategoryValidator } from '../validators';
import { validateFields } from '../middlewares/validateFields.middleware';


const router = express.Router();

const categoryValidator = new CategoryValidator();
const categoryController = new CategoryController();

router.get('/getAllActive', categoryController.getAllActive);
router.get('/getAll', categoryController.getAll);

router.post('/create',categoryValidator.createValidate, validateFields ,categoryController.create);
router.put('/update/:id', validateFields,categoryValidator.createValidate ,categoryController.update);

router.delete('/delete/:id',categoryController.deleteCategory);



module.exports = router;