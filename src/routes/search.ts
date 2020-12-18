import { Router } from 'express';
import * as searchController from '../controllers/searchController';

const router = Router();

router.get('/:query', searchController.searchFuncs);

export default router;
