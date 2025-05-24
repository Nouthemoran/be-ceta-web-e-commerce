import express from 'express';
const router = express.Router();

// Mengimpor controller dengan import ES6
import { googleAuthHandler } from '../controllers/authController.js';

router.post('/google', googleAuthHandler);

export default router;
