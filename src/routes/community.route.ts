import express from 'express';
import { CommunityController } from "../controllers";
import { CommunityValidator } from '../validators';
import { validateFields } from '../middlewares/validateFields.middleware';


const router = express.Router();

const communityValidator = new CommunityValidator();
const communityController = new CommunityController();


router.post('/create',communityValidator.createValidate, validateFields ,communityController.create);
router.get('/getAll', communityController.getAll);
router.put('/update/:id', validateFields,communityValidator.createValidate ,communityController.update);


module.exports = router;