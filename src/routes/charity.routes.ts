import express from 'express';
import { CharityController } from "../controllers";
import {CharityValidator } from '../validators';
import { validateFields } from '../middlewares/validateFields.middleware';


const router = express.Router();

const charityValidator = new CharityValidator();
const charityController = new CharityController();

router.get('/getAllActive', charityController.getAllActive);
router.get('/getAll', charityController.getAll);

router.post('/create',charityValidator.createValidate, validateFields ,charityController.create);
router.put('/update/:id', validateFields,charityValidator.updateValidate ,charityController.update);

router.delete('/delete/:id',charityController.deleteCharity);



module.exports = router;