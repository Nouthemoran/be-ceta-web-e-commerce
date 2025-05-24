import express from 'express';
const router = express.Router();

// Mengimpor controller dan middleware dengan import ES6
import { getAllWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlistController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

router.get('/', authMiddleware, getAllWishlist);
router.post('/', authMiddleware, addToWishlist);
router.delete('/:wishlistId', authMiddleware, removeFromWishlist);

export default router;
