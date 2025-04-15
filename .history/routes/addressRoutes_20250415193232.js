const express = require('express');
const router = express.Router();
const { createAddress, getUserAddresses, deleteAddress, updateAddress } = require('../controllers/addressController');
const { authMiddleware = require('../middleware/authMiddleware');

// Buat alamat baru
router.post('/', authMiddleware, createAddress);

// Ambil semua alamat milik user yang login
router.get('/', authMiddleware, getUserAddresses);

// Ubah alamat
router.put('/:addressId', authMiddleware, updateAddress);

// Hapus alamat tertentu milik user yang login
router.delete('/:addressId', authMiddleware, deleteAddress);

module.exports = router;
