import express from 'express';
const router = express.Router();

// Mengimpor controller dan middleware dengan import ES6
import { getCartItems, addCartItem, updateCartItem, deleteCartItem } from '../controllers/cartController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

router.get('/', authMiddleware, getCartItems);
router.post('/', authMiddleware, addCartItem);
router.put('/:id', authMiddleware, updateCartItem);
router.delete('/:id', authMiddleware, deleteCartItem);

export default router;
