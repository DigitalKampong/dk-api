import { Router } from 'express';
import * as userAnswerController from '../controllers/userAnswerController';
import { adminAuth } from '../middleware/auth';

const router = Router();

router.post('/validate', userAnswerController.validateUserAnswerFuncs);
router.delete('/:id', adminAuth, userAnswerController.destroyUserAnswerFuncs);

export default router;
