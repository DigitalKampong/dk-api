import {Router} from 'express';
import * as regionController from '../controllers/regionController';

const router = Router();

router.get('/', regionController.indexRegionFuncs);
router.get('/:id', regionController.showRegionFuncs);
router.post('/', regionController.createRegionFuncs);
router.put('/:id', regionController.updateRegionFuncs);
router.delete('/:id', regionController.destroyRegionFuncs);

export default router;
