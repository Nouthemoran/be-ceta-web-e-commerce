const express = require('express');
const router = express.Router();
const { createProductVariant, getProductVariantById, getProductVariants, updateProductVariant, deleteProductVariant } = require('../controllers/variantController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createProductVariant);
router.get('/product/:productId', authMiddleware, getProductVariants);
router.get('/:id', authMiddleware, getProductVariantById);
router.put('/:id', authMiddleware, updateProductVariant);
router.delete('/:id', authMiddleware, deleteProductVariant);

module.exports = router;
