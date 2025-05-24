import express from 'express';
const router = express.Router();

// Mengimpor controller dengan import ES6
import { registerUser, loginUser, logoutUser } from '../controllers/userController.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;
