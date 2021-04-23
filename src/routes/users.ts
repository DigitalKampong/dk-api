import { Router } from 'express';
import * as userController from '../controllers/userController';
import { auth, adminAuth } from '../middleware/auth';

const router = Router();

router.post('/login', userController.loginFuncs);
router.post('/register', userController.registerFuncs);
router.post('/register-admin', adminAuth, userController.registerAdminFuncs);
router.post('/users/passwordReset', userController.updateUserPasswordFuncs);
router.put('/updateUser', auth, userController.updateUserFuncs);
router.get('/users', adminAuth, userController.indexUserFuncs);
router.get('/users/email', userController.retrieveUserByEmailFuncs);
router.put('/users/:id', adminAuth, userController.updateOtherUserFuncs);
router.delete('/users/:id', adminAuth, userController.deleteUserFuncs);

export default router;
