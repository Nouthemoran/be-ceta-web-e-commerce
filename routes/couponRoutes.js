import express from 'express';
const router = express.Router();

// Mengimpor controller dan middleware dengan import ES6
import { authMiddleware } from '../middleware/authMiddleware.js';
import { checkoutFromCart, buyNow, getOrders } from '../controllers/orderController.js';

router.post('/checkout', authMiddleware, checkoutFromCart);
router.post('/buy-now', authMiddleware, buyNow);
router.get('/', authMiddleware, getOrders);

export default router;
