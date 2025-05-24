import express from 'express';
const router = express.Router();

// Mengimpor controller dan middleware dengan import ES6
import shippingOptionController from '../controllers/shippingOptionController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

// Simpan shipping option
router.post('/select', authMiddleware, shippingOptionController.createShippingOption);

// Ambil shipping option dari order
router.get('/:orderId', authMiddleware, shippingOptionController.getShippingOptionByOrder);

export default router;
