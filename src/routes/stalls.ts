import { Router } from 'express';
import * as stallController from '../controllers/stallController';
import { auth, adminAuth } from '../middleware/auth';

const router = Router();

router.get('/', stallController.indexStallFuncs);
router.get('/:id', stallController.showStallFuncs);
router.post('/', adminAuth, stallController.createStallFuncs);
router.post('/bulkCreate', adminAuth, stallController.bulkCreateStallsFuncs);
router.put('/:id', adminAuth, stallController.updateStallFuncs);
router.delete('/:id', adminAuth, stallController.destroyStallFuncs);

router.post('/:id/upload', adminAuth, stallController.uploadStallImagesFuncs);
router.post('/:id/delete-images', adminAuth, stallController.destroyStallImagesFuncs);

router.get('/:id/reviews', stallController.indexStallReviewFuncs);
router.post('/:id/reviews', auth, stallController.createStallReviewFuncs);

router.post('/:id/favourites', auth, favouriteController.createFavouriteFuncs);
router.delete('/:id/favourites', auth, favouriteController.deleteFavouriteFuncs);

export default router;
