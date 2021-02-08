import { Router } from 'express';
import * as hawkerCentreController from '../controllers/hawkerCentreController';
import { adminAuth } from '../middleware/auth';

const router = Router();

router.get('/', hawkerCentreController.indexHawkerCentreFuncs);
router.get('/:id', hawkerCentreController.showHawkerCentreFuncs);
router.post('/', adminAuth, hawkerCentreController.createHawkerCentreFuncs);
router.put('/:id', adminAuth, hawkerCentreController.updateHawkerCentreFuncs);
router.delete('/:id', adminAuth, hawkerCentreController.destroyHawkerCentreFuncs);
router.post('/:id/upload', adminAuth, hawkerCentreController.uploadHawkerCentreImagesFuncs);
router.post('/:id/delete-images', adminAuth, hawkerCentreController.destroyHawkerCentreImagesFuncs);

export default router;
