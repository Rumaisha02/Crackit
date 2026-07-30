import express from 'express';
import {
  addResource,
  getResourcesByInternship,
  deleteResource,
} from '../controllers/resourceController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/', addResource);
router.get('/:internshipId', getResourcesByInternship);
router.get('/internship/:internshipId', getResourcesByInternship);
router.delete('/:id', deleteResource);

export default router;
