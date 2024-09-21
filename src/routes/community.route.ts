import express from 'express';
import { CommunityController } from "../controllers";


const router = express.Router();

const communityController = new CommunityController();

router.get('/hello', communityController.hello);


module.exports = router;