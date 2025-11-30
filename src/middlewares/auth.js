import jwt from 'jsonwebtoken';
import { getUserByIdService } from '../services/auth.services.js';
import { UnauthorizedError } from '../utils/customErrors.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { hasPermission, hasAnyPermission, ROLES } from '../utils/rolePermissions.js';

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

// Authorize based on user roles (legacy)
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
};

// Authorize by permissions (new system)
export const requirePermission = (...permissions) => {
    return (req, res, next) => {
        if (!req.user) {
            throw new UnauthorizedError('Authentication required');
        }

        if (!hasAnyPermission(req.user.role, permissions)) {
            throw new UnauthorizedError('Insufficient permissions for this operation');
        }

        next();
    };
};

// Super admin only
export const requireSuperAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== ROLES.SUPER_ADMIN) {
        throw new UnauthorizedError('Super admin access required');
    }
    next();
};

// Admin or Super Admin
export const requireAdmin = (req, res, next) => {
    if (!req.user || ![ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(req.user.role)) {
        throw new UnauthorizedError('Admin access required');
    }
    next();
};

// Manager level or above
export const requireManager = (req, res, next) => {
    if (!req.user || ![ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER].includes(req.user.role)) {
        throw new UnauthorizedError('Manager access or above required');
    }
    next();
};