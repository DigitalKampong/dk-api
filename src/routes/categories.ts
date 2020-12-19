import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';

const router = Router();

router.get('/', categoryController.indexCategoryFuncs);
router.get('/:id', categoryController.showCategoryFuncs);
router.post('/', auth, categoryController.createCategoryFuncs);
router.put('/:id', auth, categoryController.updateCategoryFuncs);
router.delete('/:id', auth, categoryController.destroyCategoryFuncs);

export default router;
