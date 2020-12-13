import {Router} from 'express';
import * as searchController from '../controllers/searchController';

const router = Router();

router.get('/products/:query', searchController.searchProductFuncs);

export default router;
