import {Router} from 'express';
import * as hawkerCentreController from '../controllers/hawkerCentreController';

const router = Router();

router.get('/', hawkerCentreController.indexHawkerCentreFuncs);
router.get('/:id', hawkerCentreController.showHawkerCentreFuncs);
router.post('/', hawkerCentreController.createHawkerCentreFuncs);
router.put('/:id', hawkerCentreController.updateHawkerCentreFuncs);
router.delete('/:id', hawkerCentreController.destroyHawkerCentreFuncs);

export default router;
