import {Router} from 'express';
import * as storeController from '../controllers/storeController';

const router = Router();

router.get('/', storeController.indexStoreFuncs);
router.get('/:id', storeController.showStoreFuncs);
router.post('/', storeController.createStoreFuncs);
router.put('/:id', storeController.updateStoreFuncs);
router.delete('/:id', storeController.destroyStoreFuncs);

export default router;
