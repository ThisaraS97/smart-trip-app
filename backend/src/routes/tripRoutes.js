import express from 'express';
import {
  getUserTrips,
  getTripById,
  createTrip,
  updateTrip,
  cancelTrip,
  updateTripStatus,
  deleteTrip,
} from '../controllers/tripController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateTripInput } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getUserTrips)
  .post(protect, validateTripInput, createTrip);

router.route('/:id')
  .get(protect, getTripById)
  .put(protect, validateTripInput, updateTrip)
  .delete(protect, deleteTrip);

router.patch('/:id/cancel', protect, cancelTrip);
router.patch('/:id/status', protect, updateTripStatus);

export default router;
