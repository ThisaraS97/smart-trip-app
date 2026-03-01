import express from 'express';
import { registerVendor } from '../controllers/vendorController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/register').post(protect, registerVendor);

export default router;
