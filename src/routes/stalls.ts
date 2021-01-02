import { Router } from 'express';
import * as stallController from '../controllers/stallController';
import * as reviewController from '../controllers/reviewController';
import auth from '../middleware/auth';

const router = Router();

router.get('/', stallController.indexStallFuncs);
router.get('/:id', stallController.showStallFuncs);
router.post('/', auth, stallController.createStallFuncs);
router.put('/:id', auth, stallController.updateStallFuncs);
router.delete('/:id', auth, stallController.destroyStallFuncs);
router.post('/:id/upload', auth, stallController.uploadStallImagesFuncs);
router.post('/:id/delete-images', auth, stallController.destroyStallImagesFuncs);
router.get('/:id/reviews', reviewController.indexReviewFuncs);
router.post('/:id/reviews', auth, reviewController.createReviewFuncs);

export default router;
