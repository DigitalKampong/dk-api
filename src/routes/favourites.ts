import { Router } from 'express';

const router = Router();

router.get('/', auth, favourtiesController.indexFavouritesFuncs);
router.delete('/:id', auth, favouritesController.deleteFavouritesFuncs);

export default router;
