import express from 'express';
import { DonationController } from "../controllers";
import { DonationValidator } from '../validators';
import { validateFields } from '../middlewares/validateFields.middleware';


const router = express.Router();

const donationValidator = new DonationValidator();
const donationController = new DonationController();

router.get('/getAll', donationController.getAll);

router.post('/create',donationValidator.createValidate, validateFields ,donationController.create);
router.put('/update/:id', validateFields,donationValidator.createValidate ,donationController.update);

router.get('/getById/:id', donationController.getById);




module.exports = router;