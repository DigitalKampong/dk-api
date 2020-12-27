import { Router } from 'express';
import * as resetController from '../controllers/resetController';

const router = Router();

router.get('/', resetController.resetFuncs);

export default router;
