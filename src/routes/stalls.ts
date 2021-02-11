import { Router } from 'express';
import * as stallController from '../controllers/stallController';
import * as reviewController from '../controllers/reviewController';
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
router.get('/:id/reviews', reviewController.indexReviewFuncs);
router.post('/:id/reviews', auth, reviewController.createReviewFuncs);

export default router;
