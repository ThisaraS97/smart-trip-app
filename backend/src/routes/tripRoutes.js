import express from 'express';
import {
  getUserTrips,
  getTripById,
  createTrip,
  cancelTrip,
  updateTripStatus,
  deleteTrip,
} from '../controllers/tripController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getUserTrips)
  .post(protect, createTrip);

router.get('/:id', protect, getTripById);
router.patch('/:id/cancel', protect, cancelTrip);
router.patch('/:id/status', protect, updateTripStatus);
router.delete('/:id', protect, deleteTrip);

export default router;
