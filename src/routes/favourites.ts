import { Router } from 'express';
import * as favouriteController from '../controllers/favouriteController';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/', auth, favouriteController.indexFavouriteFuncs);
router.delete('/:id', auth, favouriteController.destroyFavouriteFuncs);

export default router;
