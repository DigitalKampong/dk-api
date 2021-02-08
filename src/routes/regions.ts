import { Router } from 'express';
import * as regionController from '../controllers/regionController';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/', regionController.indexRegionFuncs);
router.get('/:id', regionController.showRegionFuncs);
router.post('/', auth, regionController.createRegionFuncs);
router.put('/:id', auth, regionController.updateRegionFuncs);
router.delete('/:id', auth, regionController.destroyRegionFuncs);

export default router;
