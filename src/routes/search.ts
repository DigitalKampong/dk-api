import { Router } from 'express';
import * as searchController from '../controllers/searchController';
import * as stallController from '../controllers/stallController';

const router = Router();

router.get('/', stallController.indexStallFuncs);
router.get('/:query', searchController.searchFuncs);

export default router;
