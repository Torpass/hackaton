import { Router } from 'express';
import { MedicationExpirationController } from '../controllers/medication_expiration_date.controller';
import { MedicationExpirationDateValidator } from '../validators/medication_expiration_date.validator';
import {verifyToken} from "../middlewares/verifyTokem.middleware"


const router = Router();
const medicationExpirationController = new MedicationExpirationController();
const medicationExpirationValidator = new MedicationExpirationDateValidator();

router.post(
    '/create',
    verifyToken,
    medicationExpirationValidator.createValidate,
    medicationExpirationController.create
);

router.get(
    '/getAll',
    verifyToken,
    medicationExpirationController.getAll
);

router.get(
    '/getById/:id',
    verifyToken,
    medicationExpirationController.getById
);

router.put(
    '/update/:id',
    verifyToken,
    medicationExpirationValidator.updateValidate,
    medicationExpirationController.update
);

// router.delete(
//     '/:id',
//     medicationExpirationController.delete
// );

module.exports = router;