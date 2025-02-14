const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// Route daftar/register user
router.post('/register', registerUser);

// Route login user
router.post('/login', loginUser);

module.exports = router;
