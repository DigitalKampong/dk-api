import {Router} from 'express';
import * as storeController from '../controllers/storeController';

const router = Router();

router.get('/stores/:id', storeController.showStore);
router.post('/stores', storeController.createStore);
router.delete('/stores/:id', storeController.destroyStore);

export default router;
