import express from 'express';
import { register, login, getProfile, logout } from '../controllers/auth.controller.js';
import { registerValidationRules, loginValidationRules } from '../validators/auth.validator.js';
import { validate } from '../middlewares/validate.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerValidationRules, validate, register);
router.post('/login', loginValidationRules, validate, login);

// Protected routes (require authentication)
router.get('/profile', authenticate, getProfile);
router.post('/logout', authenticate, logout);

export default router;
