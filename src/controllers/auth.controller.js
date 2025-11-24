import { registerUserService, loginUserService, getUserByIdService } from '../services/auth.services.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Register new user
export const register = asyncHandler(async (req, res) => {
    const result = await registerUserService(req.body);
    
    res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: result
    });
});

// Login user
export const login = asyncHandler(async (req, res) => {
    const result = await loginUserService(req.body);
    
    res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: result
    });
});

// Get current user profile
export const getProfile = asyncHandler(async (req, res) => {
    const user = await getUserByIdService(req.user.id);
    
    res.status(200).json({
        status: 'success',
        data: { user }
    });
});

// Logout (client-side token removal)
export const logout = asyncHandler(async (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Logged out successfully'
    });
});
