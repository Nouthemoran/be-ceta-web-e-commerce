import express from 'express';
const router = express.Router();

// Mengimpor controller dan middleware dengan import ES6
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

router.get('/', authMiddleware, getAllCategories);
router.get('/:id', authMiddleware, getCategoryById);
router.post('/', authMiddleware, createCategory);
router.put('/:id', authMiddleware, updateCategory);
router.delete('/:id', authMiddleware, deleteCategory);

export default router;
