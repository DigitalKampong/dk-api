import { Router } from 'express';
import * as categoryStallController from '../controllers/categoryStallController';
import auth from '../middleware/auth';

const router = Router();

router.get('/', categoryStallController.indexCategoryStallFuncs);
router.get('/:id', categoryStallController.showCategoryStallFuncs);
router.post('/', auth, categoryStallController.createCategoryStallFuncs);
router.put('/:id', auth, categoryStallController.updateCategoryStallFuncs);
router.delete('/:id', auth, categoryStallController.destroyCategoryStallFuncs);

export default router;
