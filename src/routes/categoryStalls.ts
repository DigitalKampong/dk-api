import { Router } from 'express';
import * as categoryStallController from '../controllers/categoryStallController';

const router = Router();

router.get('/', categoryStallController.indexCategoryStallFuncs);
router.get('/:id', categoryStallController.showCategoryStallFuncs);
router.post('/', categoryStallController.createCategoryStallFuncs);
router.put('/:id', categoryStallController.updateCategoryStallFuncs);
router.delete('/:id', categoryStallController.destroyCategoryStallFuncs);

export default router;
