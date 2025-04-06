const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const { isAdmin } = require('../middleware/authMiddleware');

// Hanya admin yang bisa buat kupon
router.post('/', isAdmin, couponController.createCoupon);

// Semua user bisa lihat kupon (misal saat checkout)
router.get('/', couponController.getCoupons);

// Validasi kupon saat checkout
router.post('/validate', couponController.validateCoupon);

module.exports = router;
