import { Router } from 'express';
import * as userController from '../controllers/userController';
import { auth, adminAuth } from '../middleware/auth';

const router = Router();

router.post('/login', userController.loginFuncs);
router.post('/register', userController.registerFuncs);
router.put('/updateUser', auth, userController.updateUserFuncs);
router.get('/users', adminAuth, userController.indexUserFuncs);

export default router;
