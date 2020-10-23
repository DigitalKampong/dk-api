import {Router} from 'express';
import * as productController from '../controllers/productController';

const router = Router();

router.get('/', productController.indexProductFuncs);
router.get('/:id', productController.showProductFuncs);
router.post('/', productController.createProductFuncs);
router.put('/:id', productController.updateProductFuncs);
router.delete('/:id', productController.destroyProductFuncs);

export default router;
