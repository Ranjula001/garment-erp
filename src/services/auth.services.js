import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { ConflictError, ValidationError, UnauthorizedError } from '../utils/customErrors.js';

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret-key', {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
};

// Register new user
export const registerUserService = async (userData) => {
    const { username, email, password, role } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({
        where: {
            $or: [{ email }, { username }]
        }
    });

    if (existingUser) {
        throw new ConflictError('User with this email or username already exists');
    }

    // Create new user
    const user = await User.create({
        username,
        email,
        password,
        role: role || 'employee'
    });

    // Generate token
    const token = generateToken(user.id);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toJSON();

    return {
        user: userWithoutPassword,
        token
    };
};

// Login user
export const loginUserService = async (loginData) => {
    const { email, password } = loginData;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.checkPassword(password))) {
        throw new UnauthorizedError('Invalid email or password');
    }

    if (user.status === 'inactive') {
        throw new UnauthorizedError('Account is deactivated');
    }

    // Generate token
    const token = generateToken(user.id);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toJSON();

    return {
        user: userWithoutPassword,
        token
    };
};

// Get user by ID
export const getUserByIdService = async (userId) => {
    const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }
    });

    if (!user) {
        throw new NotFoundError('User not found');
    }

    return user;
};
