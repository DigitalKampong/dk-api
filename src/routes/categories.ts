import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';
import { adminAuth } from '../middleware/auth';

const router = Router();

router.get('/', categoryController.indexCategoryFuncs);
router.get('/:id', categoryController.showCategoryFuncs);
router.post('/', adminAuth, categoryController.createCategoryFuncs);
router.put('/:id', adminAuth, categoryController.updateCategoryFuncs);
router.delete('/:id', adminAuth, categoryController.destroyCategoryFuncs);

export default router;
