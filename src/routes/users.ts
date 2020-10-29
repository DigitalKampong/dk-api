import {Router} from 'express';
import * as userController from '../controllers/userController';
const auth = require('../middleware/auth');

const router = Router();

router.post('/login', auth, userController.loginFuncs);
router.post('/register', userController.registerFuncs);

export default router;
