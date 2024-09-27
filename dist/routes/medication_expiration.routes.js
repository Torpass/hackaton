"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medication_expiration_date_controller_1 = require("../controllers/medication_expiration_date.controller");
const medication_expiration_date_validator_1 = require("../validators/medication_expiration_date.validator");
const verifyTokem_middleware_1 = require("../middlewares/verifyTokem.middleware");
const router = (0, express_1.Router)();
const medicationExpirationController = new medication_expiration_date_controller_1.MedicationExpirationController();
const medicationExpirationValidator = new medication_expiration_date_validator_1.MedicationExpirationDateValidator();
router.post('/create', verifyTokem_middleware_1.verifyToken, medicationExpirationValidator.createValidate, medicationExpirationController.create);
router.get('/getAll', verifyTokem_middleware_1.verifyToken, medicationExpirationController.getAll);
router.get('/getById/:id', verifyTokem_middleware_1.verifyToken, medicationExpirationController.getById);
router.put('/update/:id', verifyTokem_middleware_1.verifyToken, medicationExpirationValidator.updateValidate, medicationExpirationController.update);
// router.delete(
//     '/:id',
//     medicationExpirationController.delete
// );
module.exports = router;
