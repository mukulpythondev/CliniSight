import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    address: {
        type: String
    },
    blood_group: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    emergency_contact: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        relationship: {
            type: String,
            required: true
        }
    },
    medical_history: [{
        type: String
    }],
    allergies: [{
        type: String
    }],
    current_medications: [{
        type: String
    }]
}, {
    timestamps: true
});

export const Patient = mongoose.model('Patient', patientSchema);
