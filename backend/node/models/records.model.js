import mongoose from 'mongoose';

const recordsSchema = new mongoose.Schema({
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
    type: {
        type: String,
        enum: ['consultation', 'lab_result', 'medication', 'procedure'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

export const Record = mongoose.model('Record', recordsSchema); 