import { Router } from 'express';
import * as stallController from '../controllers/stallController';
import auth from '../middleware/auth';

const router = Router();

router.get('/', stallController.indexStallFuncs);
router.get('/:id', stallController.showStallFuncs);
router.post('/', auth, stallController.createStallFuncs);
router.put('/:id', auth, stallController.updateStallFuncs);
router.delete('/:id', auth, stallController.destroyStallFuncs);
router.post('/:id/upload', auth, stallController.uploadStallImagesFuncs);

export default router;
