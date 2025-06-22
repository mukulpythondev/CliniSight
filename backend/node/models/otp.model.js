import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    expires_at: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

otpSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

export const OTP = mongoose.model('OTP', otpSchema); 