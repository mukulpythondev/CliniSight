import jwt from 'jsonwebtoken';
import { Doctor } from '../models/doctor.model.js';

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '24h'
    });
};

// Doctor Registration
export const registerDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, license_number, hospital, phone } = req.body;

        // Check if doctor already exists
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Create doctor
        const doctor = await Doctor.create({
            name,
            email,
            password,
            speciality,
            license_number,
            hospital,
            phone
        });

        // Generate token
        const token = generateToken(doctor._id);

        res.status(201).json({
            success: true,
            message: 'Doctor registered successfully',
            data: {
                doctor: {
                    id: doctor._id,
                    name: doctor.name,
                    email: doctor.email,
                    speciality: doctor.speciality,
                    hospital: doctor.hospital
                },
                token
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed'
        });
    }
};

// Doctor Login
export const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find doctor by email
        const doctor = await Doctor.findOne({ email }).select('+password');
        if (!doctor) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isPasswordValid = await doctor.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate token
        const token = generateToken(doctor._id);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                doctor: {
                    id: doctor._id,
                    name: doctor.name,
                    email: doctor.email,
                    speciality: doctor.speciality,
                    hospital: doctor.hospital
                },
                token
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed'
        });
    }
};

// Doctor Logout
export const logoutDoctor = async (req, res) => {
    try {
        // In a stateless JWT system, logout is typically handled client-side
        // by removing the token from storage. However, we can implement
        // a simple logout endpoint that returns success.
        
        res.status(200).json({
            success: true,
            message: 'Logout successful'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Logout failed'
        });
    }
};

// Get Current User
export const getCurrentUser = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.user.id).select('-password');
        
        res.status(200).json({
            success: true,
            data: {
                doctor
            }
        });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get user data'
        });
    }
}; 