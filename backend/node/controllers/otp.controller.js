import { OTP } from '../models/otp.model.js';
import { Patient } from '../models/patient.model.js';
import { Doctor } from '../models/doctor.model.js';
import { sendVerificationCode, verifyCode } from '../utils/twilioService.js';
import mongoose from 'mongoose';

export const generateAccessOTP = async (req, res) => {
    try {
        const { patient_id } = req.body;
        const doctor_id = req.user._id;
        
        if (!patient_id || !mongoose.Types.ObjectId.isValid(patient_id)) {
            return res.status(400).json({ success: false, message: 'Valid patient ID is required' });
        }
        
        const patient = await Patient.findById(patient_id);
        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }
        
        if (!patient.phone) {
            return res.status(400).json({ success: false, message: 'Patient does not have a registered phone number' });
        }
        
        const doctor = await Doctor.findById(doctor_id);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        
        // Check if there's already a pending verification for this doctor-patient pair
        const existingOTP = await OTP.findOne({
            patient_id,
            doctor_id,
            is_verified: false,
            expires_at: { $gt: new Date() }
        });
        
        if (existingOTP) {
            return res.status(400).json({ 
                success: false, 
                message: 'A verification code has already been sent for this patient. Please wait for it to expire or verify the existing code.' 
            });
        }
        
        // Send verification code via Twilio Verify
        try {
            await sendVerificationCode(patient.phone, patient.name, doctor.name);
        } catch (twilioError) {
            console.error('Twilio verification error:', twilioError);
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to send verification code. Please try again.' 
            });
        }
        
        // Store verification attempt in database
        const expires_at = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        await OTP.create({
            patient_id,
            doctor_id,
            otp: 'TWILIO_VERIFY', // Placeholder since Twilio handles the code
            expires_at
        });
        
        res.status(200).json({ 
            success: true, 
            message: `Verification code sent to ${patient.name}'s phone (${patient.phone})` 
        });
        
    } catch (error) {
        console.error('Generate OTP error:', error);
        res.status(500).json({ success: false, message: 'Failed to generate verification code' });
    }
};

export const verifyAccessOTP = async (req, res) => {
    try {
        const { patient_id, otp } = req.body;
        const doctor_id = req.user._id;
        
        if (!patient_id || !otp || !mongoose.Types.ObjectId.isValid(patient_id)) {
            return res.status(400).json({ success: false, message: 'Valid patient ID and verification code are required' });
        }
        
        const patient = await Patient.findById(patient_id);
        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

        // Verify code with Twilio
        try {
            const verificationResult = await verifyCode(patient.phone, otp);
            
            if (verificationResult.status === 'approved') {
                // Update OTP record as verified
                await OTP.findOneAndUpdate(
                    { 
                        patient_id, 
                        doctor_id, 
                        is_verified: false,
                        expires_at: { $gt: new Date() }
                    },
                    { is_verified: true },
                    { new: true }
                );
                
                res.status(200).json({ 
                    success: true, 
                    message: 'Verification successful. Access granted.' 
                });
            } else {
                res.status(400).json({ 
                    success: false, 
                    message: 'Invalid verification code. Please try again.' 
                });
            }
        } catch (twilioError) {
            console.error('Twilio verification error:', twilioError);
            res.status(500).json({ 
                success: false, 
                message: 'Failed to verify code. Please try again.' 
            });
        }
        
    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(500).json({ success: false, message: 'Failed to verify code' });
    }
}; 