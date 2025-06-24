import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    speciality: { 
        type: String, 
        required: true 
    },
    license_number: { 
        type: String, 
        required: true,
        unique: true
    },
    hospital: {
        type: String,
        required: true
    },
    phone: {
        type: String
    }
}, { 
    timestamps: true
});

// Hash password before saving
doctorSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password method
doctorSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export const Doctor = mongoose.model('Doctor', doctorSchema);
