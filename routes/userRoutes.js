const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');

const router = express.Router();

// Route daftar/register user
router.post('/register', registerUser);

// Route login user
router.post('/login', loginUser);

// Route logout user
router.post('/logout', logoutUser);

module.exports = router;
