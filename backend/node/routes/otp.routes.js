import express from 'express';
import { generateAccessOTP, verifyAccessOTP } from '../controllers/otp.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();
router.use(authenticate);

router.post('/generate', generateAccessOTP);
router.post('/verify', verifyAccessOTP);

export default router; 