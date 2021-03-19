import { Router } from 'express';
import * as securityQuestionController from '../controllers/securityQuestionController';
import { adminAuth } from '../middleware/auth';

const router = Router();

router.get('/', securityQuestionController.indexSecurityQuestionFuncs);
router.get('/active', securityQuestionController.indexActiveSecurityQuestionFuncs);
router.get('/:id', securityQuestionController.showSecurityQuestionFuncs);
router.post('/', adminAuth, securityQuestionController.createSecurityQuestionFuncs);
router.put('/:id', adminAuth, securityQuestionController.updateSecurityQuestionFuncs);
router.delete('/:id', adminAuth, securityQuestionController.destroySecurityQuestionFuncs);
router.put('/:id/activate', adminAuth, securityQuestionController.activateSecurityQuestionFuncs);
router.put(
  '/:id/deactivate',
  adminAuth,
  securityQuestionController.deactivateSecurityQuestionFuncs
);

export default router;
