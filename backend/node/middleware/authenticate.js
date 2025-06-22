import jwt from 'jsonwebtoken';
import { Doctor } from '../models/doctor.model.js';

export const authenticate = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        // Extract token
        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        
        // Get user from token
        const doctor = await Doctor.findById(decoded.id).select('-password');
        
        if (!doctor) {
            return res.status(401).json({
                success: false,
                message: 'Token is not valid.'
            });
        }

        req.user = doctor;
        next();
        
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({
            success: false,
            message: 'Token is not valid.'
        });
    }
};

// Optional authentication - doesn't fail if no token
export const optionalAuth = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token && req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const doctor = await Doctor.findById(decoded.id).select('-password');
            
            if (doctor && doctor.is_active && !doctor.is_locked) {
                req.user = doctor;
            }
        }

        next();
    } catch (error) {
        // Continue without authentication
        next();
    }
};

// Role-based authorization
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'Authentication required.'
                }
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: {
                    message: 'Insufficient permissions.'
                }
            });
        }

        next();
    };
};

// Permission-based authorization
export const hasPermission = (permission) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'Authentication required.'
                }
            });
        }

        if (!req.user.permissions.includes(permission)) {
            return res.status(403).json({
                success: false,
                error: {
                    message: `Permission '${permission}' required.`
                }
            });
        }

        next();
    };
}; 