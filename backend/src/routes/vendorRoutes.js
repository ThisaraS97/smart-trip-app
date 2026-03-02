import express from 'express';
import {
  registerVendor,
  getVendorProfile,
  updateVendorProfile,
  getAllVendors,
  updateVendorStatus,
} from '../controllers/vendorController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Vendor self-service
router.post('/register', protect, registerVendor);
router.route('/profile')
  .get(protect, getVendorProfile)
  .put(protect, updateVendorProfile);

// Admin routes
router.get('/', protect, getAllVendors);
router.patch('/:id/status', protect, adminOnly, updateVendorStatus);

export default router;
