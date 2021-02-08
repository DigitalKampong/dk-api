import { Router } from 'express';
import * as userController from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/login', userController.loginFuncs);
router.post('/register', userController.registerFuncs);
router.put('/updateUser', auth, userController.updateUserFuncs);

export default router;
