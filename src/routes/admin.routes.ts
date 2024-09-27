import express from "express";
import { AdminController } from "../controllers";
import { AdminValidator } from "../validators";
import { validateFields } from "../middlewares/validateFields.middleware";
import { verifyToken } from "../middlewares/verifyTokem.middleware";

const router = express.Router();

const adminValidator = new AdminValidator();
const adminController = new AdminController();

router.get("/getAllActive", verifyToken, adminController.getAllActive);
router.get("/getAll", adminController.getAll);

router.post(
  "/create",
  adminValidator.createValidate,
  validateFields,
  adminController.create
);
router.post("/login", adminController.login);
router.post("/logout", adminController.logout);
router.put(
  "/update/:id",
  validateFields,
  adminValidator.createValidate,
  adminController.update
);

router.delete("/delete/:id", adminController.deleteUser);

module.exports = router;
