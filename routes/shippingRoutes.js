import express from 'express';
const router = express.Router();

// Mengimpor controller dan middleware dengan import ES6
import { getProvinces, getCities, calculateShippingCost } from '../controllers/shippingController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

// Get all provinces
router.get('/provinces', getProvinces);

// Get cities in a province
router.get('/cities/:provinceId', getCities);

// Get shipping cost
router.post('/cost', authMiddleware, calculateShippingCost);

export default router;
