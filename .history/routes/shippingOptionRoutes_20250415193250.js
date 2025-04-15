const express = require('express');
const router = express.Router();
const shippingOptionController = require('../controllers/shippingOptionController');
const { authMiddleware = require('../middleware/authMiddleware');

// Simpan shipping option
router.post('/select', authMiddleware, shippingOptionController.createShippingOption);

// Ambil shipping option dari order
router.get('/:orderId', authMiddleware, shippingOptionController.getShippingOptionByOrder);

module.exports = router;
