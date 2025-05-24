import express from 'express';
const router = express.Router();

// Mengimpor controller dan middleware dengan import ES6
import { createAddress, getUserAddresses, deleteAddress, updateAddress } from '../controllers/addressController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

// Buat alamat baru
router.post('/', authMiddleware, createAddress);

// Ambil semua alamat milik user yang login
router.get('/', authMiddleware, getUserAddresses);

// Ubah alamat
router.put('/:addressId', authMiddleware, updateAddress);

// Hapus alamat tertentu milik user yang login
router.delete('/:addressId', authMiddleware, deleteAddress);

export default router;
