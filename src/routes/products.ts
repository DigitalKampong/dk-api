import { Router } from 'express';
import * as productController from '../controllers/productController';
import auth from '../middleware/auth';

const router = Router();

router.get('/', productController.indexProductFuncs);
router.get('/:id', productController.showProductFuncs);
router.post('/', auth, productController.createProductFuncs);
router.put('/:id', auth, productController.updateProductFuncs);
router.delete('/:id', auth, productController.destroyProductFuncs);
router.post('/:id/upload', auth, productController.uploadProductImagesFuncs);

export default router;
