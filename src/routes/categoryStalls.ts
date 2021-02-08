import { Router } from 'express';
import * as categoryStallController from '../controllers/categoryStallController';
import { adminAuth } from '../middleware/auth';

const router = Router();

router.get('/', categoryStallController.indexCategoryStallFuncs);
router.get('/:id', categoryStallController.showCategoryStallFuncs);
router.post('/', adminAuth, categoryStallController.createCategoryStallFuncs);
router.put('/:id', adminAuth, categoryStallController.updateCategoryStallFuncs);
router.delete('/:id', adminAuth, categoryStallController.destroyCategoryStallFuncs);

export default router;
