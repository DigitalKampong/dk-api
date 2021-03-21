import { Router } from 'express';
import * as userController from '../controllers/userController';
import { auth, adminAuth } from '../middleware/auth';

const router = Router();

router.post('/login', userController.loginFuncs);
router.post('/register', userController.registerFuncs);
router.post('/register-admin', adminAuth, userController.registerAdminFuncs);
router.put('/updateUser', auth, userController.updateUserFuncs);
router.get('/users', adminAuth, userController.indexUserFuncs);
router.get('/users/email', auth, userController.retrieveUserByEmailFuncs);
router.put('/users/:id', adminAuth, userController.updateOtherUserFuncs);

export default router;
