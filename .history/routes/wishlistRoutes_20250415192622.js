const express = require('express');
const router = express.Router();
const { getAllWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const {} authMiddleware } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getAllWishlist);
router.post('/', authMiddleware, addToWishlist);
router.delete('/:wishlistId', authMiddleware, removeFromWishlist);

module.exports = router;
