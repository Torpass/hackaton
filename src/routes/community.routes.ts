import express from "express";
import { CommunityController } from "../controllers";
import { CommunityValidator } from "../validators";
import { validateFields } from "../middlewares/validateFields.middleware";
import { verifyToken } from "../middlewares/verifyTokem.middleware";

const router = express.Router();

const communityValidator = new CommunityValidator();
const communityController = new CommunityController();

router.post(
  "/create",
  communityValidator.createValidate,
  validateFields,
  verifyToken,
  communityController.create
);

router.delete(
  "/delete/:id",
  communityController.delete
);

router.get(
  "/getAllActives",
  communityController.getAllActivities
);

router.get("/getAll", verifyToken, communityController.getAllActivities);
router.put(
  "/update/:id",
  validateFields,
  communityValidator.createValidate,
  verifyToken,
  communityController.update
);

module.exports = router;
