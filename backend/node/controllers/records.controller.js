import { Record } from '../models/records.model.js';
import { Patient } from '../models/patient.model.js';
import mongoose from 'mongoose';

// Get all records
export const getAllRecords = async (req, res) => {
    try {
        const records = await Record.find()
            .populate('patient_id', 'name patient_id')
            .populate('doctor_id', 'name speciality')
            .sort({ date: -1 });
        
        res.status(200).json({
            success: true,
            count: records.length,
            data: records
        });
    } catch (error) {
        console.error('Get records error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch records'
        });
    }
};

// Get records by patient
export const getPatientRecords = async (req, res) => {
    try {
        const { patientId } = req.params;

        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        const records = await Record.find({ patient_id: patientId })
            .populate('doctor_id', 'name speciality')
            .sort({ date: -1 });
        
        res.status(200).json({
            success: true,
            data: {
                patient,
                records
            }
        });
    } catch (error) {
        console.error('Get patient records error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch patient records'
        });
    }
};

// Get single record
export const getRecord = async (req, res) => {
    try {
        const record = await Record.findById(req.params.id)
            .populate('patient_id', 'name patient_id')
            .populate('doctor_id', 'name speciality');
        
        if (!record) {
            return res.status(404).json({
                success: false,
                message: 'Record not found'
            });
        }

        res.status(200).json({
            success: true,
            data: record
        });
    } catch (error) {
        console.error('Get record error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch record'
        });
    }
};

// Create record
export const createRecord = async (req, res) => {
    try {
        const { patient_id, type, title, description, notes } = req.body;
        
        const record = await Record.create({
            patient_id : new mongoose.Types.ObjectId(patient_id),
            doctor_id: new mongoose.Types.ObjectId(req.user._id), // From auth middleware
            type,
            title,
            description,
            notes
        });

        const populatedRecord = await Record.findById(record._id)
            .populate('patient_id', 'name patient_id')
            .populate('doctor_id', 'name speciality');

        res.status(201).json({
            success: true,
            message: 'Record created successfully',
            data: populatedRecord
        });
    } catch (error) {
        console.error('Create record error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create record'
        });
    }
};

// Update record
export const updateRecord = async (req, res) => {
    try {
        const record = await Record.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('patient_id', 'name patient_id')
         .populate('doctor_id', 'name speciality');

        if (!record) {
            return res.status(404).json({
                success: false,
                message: 'Record not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Record updated successfully',
            data: record
        });
    } catch (error) {
        console.error('Update record error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update record'
        });
    }
};

// Delete record
export const deleteRecord = async (req, res) => {
    try {
        const record = await Record.findByIdAndDelete(req.params.id);

        if (!record) {
            return res.status(404).json({
                success: false,
                message: 'Record not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Record deleted successfully'
        });
    } catch (error) {
        console.error('Delete record error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete record'
        });
    }
}; 