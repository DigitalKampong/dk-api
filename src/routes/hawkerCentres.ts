import { Router } from 'express';
import * as hawkerCentreController from '../controllers/hawkerCentreController';
import auth from '../middleware/auth';

const router = Router();

router.get('/', hawkerCentreController.indexHawkerCentreFuncs);
router.get('/:id', hawkerCentreController.showHawkerCentreFuncs);
router.post('/', auth, hawkerCentreController.createHawkerCentreFuncs);
router.put('/:id', auth, hawkerCentreController.updateHawkerCentreFuncs);
router.delete('/:id', auth, hawkerCentreController.destroyHawkerCentreFuncs);
router.post('/:id/upload', auth, hawkerCentreController.uploadHawkerCentreImagesFuncs);
router.post('/:id/delete-images', auth, hawkerCentreController.destroyHawkerCentreImagesFuncs);

export default router;
