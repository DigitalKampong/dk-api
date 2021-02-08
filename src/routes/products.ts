import { Router } from 'express';
import * as productController from '../controllers/productController';
import { adminAuth } from '../middleware/auth';

const router = Router();

router.get('/', productController.indexProductFuncs);
router.get('/:id', productController.showProductFuncs);
router.post('/', adminAuth, productController.createProductFuncs);
router.put('/:id', adminAuth, productController.updateProductFuncs);
router.delete('/:id', adminAuth, productController.destroyProductFuncs);
router.post('/:id/upload', adminAuth, productController.uploadProductImagesFuncs);
router.post('/:id/delete-images', adminAuth, productController.destoryProductImagesFuncs);

export default router;
