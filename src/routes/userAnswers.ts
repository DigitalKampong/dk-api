import { Router } from 'express';
import * as userAnswerController from '../controllers/userAnswerController';
import { adminAuth } from '../middleware/auth';

const router = Router();

router.get('/', userAnswerController.indexUserAnswerFuncs);
router.get('/:id', userAnswerController.showUserAnswerFuncs);
router.post('/', adminAuth, userAnswerController.createUserAnswerFuncs);
router.post('/validate', adminAuth, userAnswerController.validateUserAnswerFuncs);
router.put('/:id', adminAuth, userAnswerController.updateUserAnswerFuncs);
router.delete('/:id', adminAuth, userAnswerController.destroyUserAnswerFuncs);

export default router;
