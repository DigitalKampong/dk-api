import { Router } from 'express';
import * as regionController from '../controllers/regionController';
import { adminAuth } from '../middleware/auth';

const router = Router();

router.get('/', regionController.indexRegionFuncs);
router.get('/:id', regionController.showRegionFuncs);
router.post('/', adminAuth, regionController.createRegionFuncs);
router.put('/:id', adminAuth, regionController.updateRegionFuncs);
router.delete('/:id', adminAuth, regionController.destroyRegionFuncs);

export default router;
