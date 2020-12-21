import { Router } from 'express';
import * as hawkerCentreController from '../controllers/hawkerCentreController';
import auth from '../middleware/auth';

const router = Router();

router.get('/', hawkerCentreController.indexHawkerCentreFuncs);
router.get('/:id', hawkerCentreController.showHawkerCentreFuncs);
router.post('/', auth, hawkerCentreController.createHawkerCentreFuncs);
router.put('/:id', auth, hawkerCentreController.updateHawkerCentreFuncs);
router.delete('/:id', auth, hawkerCentreController.destroyHawkerCentreFuncs);

export default router;
