import { Router } from 'express';
import * as reviewController from '../controllers/reviewController';
import auth from '../middleware/auth';

const router = Router();

router.get('/:id', reviewController.showReviewFuncs);
router.put('/:id', auth, reviewController.updateReviewFuncs);
router.delete('/:id', auth, reviewController.destroyReviewFuncs);

export default router;
