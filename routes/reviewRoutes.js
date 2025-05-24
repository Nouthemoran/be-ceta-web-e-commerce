import express from 'express';
const router = express.Router();

// Mengimpor controller dan middleware dengan import ES6
import { createReview, getProductReviews, deleteReview } from '../controllers/reviewController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

// Tambah review
router.post('/', authMiddleware, createReview);

// Ambil semua review untuk 1 produk
router.get('/product/:productId', authMiddleware, getProductReviews);

// Hapus review
router.delete('/:reviewId', authMiddleware, deleteReview);

export default router;
