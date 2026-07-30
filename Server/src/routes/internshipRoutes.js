import express from 'express';
import {
  createInternship,
  getInternships,
  getInternshipById,
  updateInternship,
  updateInternshipStatus,
  deleteInternship,
} from '../controllers/internshipController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All internship routes protected by JWT auth middleware
router.use(protect);

router.route('/')
  .post(createInternship)
  .get(getInternships);

router.patch('/:id/status', updateInternshipStatus);

router.route('/:id')
  .get(getInternshipById)
  .patch(updateInternship)
  .put(updateInternship)
  .delete(deleteInternship);

export default router;
