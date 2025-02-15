const express = require('express');
const { getCartItems, addCartItem, updateCartItem, deleteCartItem } = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getCartItems);
router.post('/', authMiddleware, addCartItem);
router.put('/:id', authMiddleware, updateCartItem);
router.delete('/:id', authMiddleware, deleteCartItem);

module.exports = router;
