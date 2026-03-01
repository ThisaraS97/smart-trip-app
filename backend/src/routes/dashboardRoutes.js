// smart-trip-app/backend/src/routes/dashboardRoutes.js
import express from 'express';
const router = express.Router();
import { getDashboardData } from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js'; // Assuming authMiddleware for protected routes

// Protect all dashboard routes
router.use(protect); // This middleware should verify JWT and attach user to req

// @route   GET /api/dashboard
// @desc    Get dashboard data
// @access  Private
router.get('/', getDashboardData);

export default router;
