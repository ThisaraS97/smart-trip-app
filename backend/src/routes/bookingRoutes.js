import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import {
  getMyBookings,
  getBookingById,
  createBooking,
  cancelBooking,
  updateBookingStatus,
  getAllBookings,
} from '../controllers/bookingController.js';

const router = express.Router();

// User routes
router.get('/', protect, getMyBookings);
router.post('/', protect, createBooking);
router.get('/all', protect, adminOnly, getAllBookings);
router.get('/:id', protect, getBookingById);
router.patch('/:id/cancel', protect, cancelBooking);
router.patch('/:id/status', protect, adminOnly, updateBookingStatus);

export default router;
