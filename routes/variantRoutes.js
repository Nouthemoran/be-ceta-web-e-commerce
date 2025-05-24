import express from 'express';
const router = express.Router();

// Mengimpor controller dan middleware dengan import ES6
import { createProductVariant, getProductVariantById, getProductVariants, updateProductVariant, deleteProductVariant } from '../controllers/variantController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

router.post('/', authMiddleware, createProductVariant);
router.get('/product/:productId', authMiddleware, getProductVariants);
router.get('/:id', authMiddleware, getProductVariantById);
router.put('/:id', authMiddleware, updateProductVariant);
router.delete('/:id', authMiddleware, deleteProductVariant);

export default router;
