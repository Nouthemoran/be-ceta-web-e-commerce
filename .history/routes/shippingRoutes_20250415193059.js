const express = require('express');
const router = express.Router();
const { } = require('../controllers/shippingController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Get all provinces
router.get('/provinces', shippingController.getProvinces);

// Get cities in a province
router.get('/cities/:provinceId', shippingController.getCities);

// Get shipping cost
router.post('/cost', authenticateUser, shippingController.calculateShippingCost);

module.exports = router;
