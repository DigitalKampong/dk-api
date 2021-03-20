import { Router } from 'express';
import * as securityQuestionController from '../controllers/securityQuestionController';
import { adminAuth } from '../middleware/auth';

const router = Router();

router.get('/', securityQuestionController.indexActiveSecurityQuestionFuncs);
router.get('/all', securityQuestionController.indexSecurityQuestionFuncs);
router.get('/:id', securityQuestionController.showSecurityQuestionFuncs);
router.post('/', adminAuth, securityQuestionController.createSecurityQuestionFuncs);
router.put('/:id', adminAuth, securityQuestionController.updateSecurityQuestionFuncs);
router.delete('/:id', adminAuth, securityQuestionController.destroySecurityQuestionFuncs);

export default router;
