import {Router} from 'express';
import * as storeController from '../controllers/storeController';

const router = Router();

router.get('/:id', storeController.retrieveStore, storeController.showStore);
router.post('/', storeController.createStore);
router.delete('/:id', storeController.retrieveStore, storeController.destroyStore);

export default router;
