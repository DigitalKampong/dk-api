import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';

const router = Router();

router.get('/', categoryController.indexCategoryFuncs);
router.get('/:id', categoryController.showCategoryFuncs);
router.post('/', categoryController.createCategoryFuncs);
router.put('/:id', categoryController.updateCategoryFuncs);
router.delete('/:id', categoryController.destroyCategoryFuncs);

export default router;
