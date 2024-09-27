import express from "express";
import { PatientController } from "../controllers";
import { PatientValidator } from "../validators";
import { validateFields } from "../middlewares/validateFields.middleware";
import upload from "../middlewares/handleHistory.middleware.";
import { verifyToken } from "../middlewares/verifyTokem.middleware";

const router = express.Router();

const patientValidator = new PatientValidator();
const patientController = new PatientController();

router.get("/getAllActive", verifyToken, patientController.getAllActive);
router.get("/getAll", verifyToken, patientController.getAll);
router.get("/getById/:id", verifyToken, patientController.getById);
router.post(
  "/create",
  validateFields,
  patientValidator.createValidate,
  upload.array("images", 5),
  verifyToken,
  patientController.create
);

router.put(
  "/update/:id",
  validateFields,
  patientValidator.createValidate,
  verifyToken,
  patientController.update
);
router.delete("/delete/:id", verifyToken, patientController.deletePatient);

module.exports = router;
