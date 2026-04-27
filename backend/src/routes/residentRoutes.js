import express from 'express';
import * as residentController from '../controllers/residentController.js';

const router = express.Router();

router.get('/', residentController.listResidents);
router.get('/summary/insights', residentController.getResidentSummary);
router.get('/:id', residentController.getResidentById);
router.post('/', residentController.createResident);
router.put('/:id', residentController.updateResident);
router.delete('/:id', residentController.deleteResident);
router.post('/:id/feedback', residentController.addFeedback);

export default router;
