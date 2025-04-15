const express = require('express');
const router = express.Router();
const {createReview, getProductReviews, deleteReview} = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Tambah review
router.post('/', authMiddleware, createReview);

// Ambil semua review untuk 1 produk
router.get('/product/:productId', authMiddleware, getProductReviews);

// Hapus review
router.delete('/:reviewId', authMiddleware, deleteReview);

module.exports = router;
