const express = require('express');
const router = express.Router();
const { getProvinces, getCities, calculateShippingCost } = require('../controllers/shippingController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Get all provinces
router.get('/provinces', getProvinces);

// Get cities in a province
router.get('/cities/:provinceId', getCities);

// Get shipping cost
router.post('/cost', auth, calculateShippingCost);

module.exports = router;
