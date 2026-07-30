import express from 'express';
import {
  addPrepItem,
  getPrepItemsByInternship,
  updatePrepItem,
  deletePrepItem,
} from '../controllers/prepItemController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/', addPrepItem);
router.get('/:internshipId', getPrepItemsByInternship);
router.get('/internship/:internshipId', getPrepItemsByInternship);
router.put('/:id', updatePrepItem);
router.delete('/:id', deletePrepItem);

export default router;
