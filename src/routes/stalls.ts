import { Router } from 'express';
import * as stallController from '../controllers/stallController';
import { auth, adminAuth } from '../middleware/auth';

const router = Router();

router.get('/', stallController.indexStallFuncs);
router.get('/featured', stallController.showFeaturedStallFuncs);
router.get('/:id', stallController.showStallFuncs);
router.post('/', adminAuth, stallController.createStallFuncs);
router.post('/bulkCreate', adminAuth, stallController.bulkCreateStallsFuncs);
router.post('/import', adminAuth, stallController.importStallsFuncs);
router.put('/:id', adminAuth, stallController.updateStallFuncs);
router.delete('/:id', adminAuth, stallController.destroyStallFuncs);
router.post('/bulkDestroy', adminAuth, stallController.bulkDestroyStallsFuncs);

router.post('/:id/upload', adminAuth, stallController.uploadStallImagesFuncs);
router.post('/:id/delete-images', adminAuth, stallController.destroyStallImagesFuncs);

router.get('/:id/reviews', stallController.indexStallReviewFuncs);
router.post('/:id/reviews', auth, stallController.createStallReviewFuncs);

router.post('/:id/favourites', auth, stallController.createStallFavouriteFuncs);
router.delete('/:id/favourites', auth, stallController.destroyStallFavouriteFuncs);

router.put('/:id/categoryStalls', auth, stallController.updateCategoryStallsFuncs);

export default router;
