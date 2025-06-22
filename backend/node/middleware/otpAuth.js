import { OTP } from '../models/otp.model.js';
import mongoose from 'mongoose';

export const requireOTPVerification = async (req, res, next) => {
    try {
        const patient_id = req.params.patientId || req.params.id || req.body.patient_id;
        const doctor_id = req.user._id;

        // If no patient_id is provided, skip OTP check (for general record operations)
        if (!patient_id) {
            return next();
        }

        // Validate patient_id
        if (!mongoose.Types.ObjectId.isValid(patient_id)) {
            return res.status(400).json({
                success: false,
                message: 'Valid patient ID is required'
            });
        }

        // Check if doctor has verified OTP for this patient
        const verifiedOTP = await OTP.findOne({
            patient_id,
            doctor_id,
            is_verified: true,
            expires_at: { $gt: new Date() }
        });

        if (!verifiedOTP) {
            return res.status(403).json({
                success: false,
                message: 'OTP verification required to access patient records',
                error: 'OTP_REQUIRED',
                data: {
                    patient_id: patient_id,
                    message: 'Please generate and verify OTP to access this patient\'s records'
                }
            });
        }

        // Add OTP info to request for potential use
        req.otpInfo = {
            verified_at: verifiedOTP.verified_at,
            expires_at: verifiedOTP.expires_at
        };

        next();
    } catch (error) {
        console.error('OTP verification middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to verify OTP access'
        });
    }
}; 