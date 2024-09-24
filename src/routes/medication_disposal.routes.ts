import express from 'express';
import { MedicationDisposalController } from '../controllers/medication_disposal.controller';
import { MedicationDisposalValidator } from '../validators/medication_disposal.validator';
import { validateFields} from '../middlewares/validateFields.middleware';
import {verifyToken} from "../middlewares/verifyTokem.middleware"

const router = express.Router();
const medicationDisposalController = new MedicationDisposalController();
const medicationDisposalValidator = new MedicationDisposalValidator();

router.post(
    '/create',
    medicationDisposalValidator.createValidate,
    validateFields,
    verifyToken, 
    medicationDisposalController.create
);

router.get(
    '/getById/:id',
    verifyToken,
    medicationDisposalController.getById
);

router.get(
    '/getAll',
    verifyToken,
    medicationDisposalController.getAll
);

module.exports = router