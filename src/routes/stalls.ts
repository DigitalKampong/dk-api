import { Router } from 'express';
import * as stallController from '../controllers/stallController';

const router = Router();

router.get('/', stallController.indexStallFuncs);
router.get('/:id', stallController.showStallFuncs);
router.post('/', stallController.createStallFuncs);
router.put('/:id', stallController.updateStallFuncs);
router.delete('/:id', stallController.destroyStallFuncs);
router.post('/:id/upload', stallController.uploadStallImagesFuncs);

export default router;
