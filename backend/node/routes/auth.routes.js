import express from 'express';
import { registerDoctor, loginDoctor, logoutDoctor, getCurrentUser } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

// Public routes
router.post('/register', registerDoctor);
router.post('/login', loginDoctor);

// Protected routes
router.post('/logout', authenticate, logoutDoctor);
router.get('/me', authenticate, getCurrentUser);

export default router; 