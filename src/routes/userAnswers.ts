import { Router } from 'express';
import * as userAnswerController from '../controllers/userAnswerController';
import { auth, adminAuth } from '../middleware/auth';

const router = Router();

router.post('/', auth, userAnswerController.createUserAnswerFuncs);
router.post('/validate', userAnswerController.validateUserAnswerFuncs);
router.delete('/:id', adminAuth, userAnswerController.destroyUserAnswerFuncs);

export default router;
