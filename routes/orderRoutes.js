const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  checkoutFromCart,
  buyNow,
  getOrders,
} = require('../controllers/orderController');

router.post('/checkout', authMiddleware, checkoutFromCart);
router.post('/buy-now', authMiddleware, buyNow);
router.get('/', authMiddleware, getOrders);

module.exports = router;
