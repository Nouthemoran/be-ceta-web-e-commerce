const express = require('express');
const router = express.Router();
const { googleAuthHandler } = require('../controllers/authController');

router.post('/google', googleAuthHandler);

module.exports = router;
