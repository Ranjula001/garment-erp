import jwt from 'jsonwebtoken';
import { getUserByIdService } from '../services/auth.services.js';
import { UnauthorizedError } from '../utils/customErrors.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Verify JWT token and authenticate user
export const authenticate = asyncHandler(async (req, res, next) => {
    // Get token from header
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        throw new UnauthorizedError('Not authorized to access this route');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    const user = await getUserByIdService(decoded.userId);
    if (!user) {
        throw new UnauthorizedError('User not found');
    }
    if (user.status === 'inactive') {
        throw new UnauthorizedError('Account is deactivated');
    }

    // Attach user to request
    req.user = user;
    next();
});

// Authorize based on user roles
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user){
            throw new UnauthorizedError('Authentication required');
        }
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('Insufficient permissions');
        }

        next();
    };
}