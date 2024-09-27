import express from 'express';
import { MedicationController } from '../controllers';
import { MedicationValidator } from '../validators';
import { validateFields } from '../middlewares/validateFields.middleware';
import { verifyToken } from '../middlewares/verifyTokem.middleware';

const router = express.Router();
const medicationController = new MedicationController();
const medicationValidator = new MedicationValidator();

router.post(
    '/create',
    verifyToken,
    medicationValidator.createValidate,
    validateFields,
    medicationController.create
);

// Ruta para actualizar un medicamento existente
router.put(
    '/update/:id',
    verifyToken,
    medicationValidator.updateValidate,
    validateFields,
    medicationController.update
);

// Ruta para obtener todos los medicamentos
router.get(
    '/getAll',
    medicationController.getAll
);

// Ruta para obtener un medicamento por ID
router.get(
    '/getById/:id',
    medicationController.getById
);

router.get(
    '/getExpireSoon/',
    medicationController.getExpireSoon
);

router.get(
    '/getExpired/',
    medicationController.getExpired
);

router.get(
    '/getMostRequired/',
    medicationController.getMostRequeried
);


router.get(
    '/getUrgency/',
    medicationController.getUrgency
);

router.get(
    '/getMostDonated/',
    medicationController.getMostDonated
);


router.get(
    '/getMostRequeriedByCommunity/',
    medicationController.getMostRequeriedByCommunity
);


module.exports = router; 