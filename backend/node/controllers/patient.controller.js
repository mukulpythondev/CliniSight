import { Patient } from '../models/patient.model.js';

// Get all patients
export const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients
        });
    } catch (error) {
        console.error('Get patients error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch patients'
        });
    }
};

// Get single patient
export const getPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        console.log(patient);
        
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        res.status(200).json({
            success: true,
            data: patient
        });
    } catch (error) {
        console.error('Get patient error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch patient'
        });
    }
};

// Create patient
export const createPatient = async (req, res) => {
    try {
        const { name, phone, email, age, gender, address, blood_group, emergency_contact, medical_history, allergies, current_medications } = req.body;

        const patient = await Patient.create({
            name,
            phone,
            email,
            age,
            gender,
            address,
            blood_group,
            emergency_contact,
            medical_history,
            allergies,
            current_medications
        });

        res.status(201).json({
            success: true,
            message: 'Patient created successfully',
            data: patient
        });
    } catch (error) {
        console.error('Create patient error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create patient'
        });
    }
};

// Update patient
export const updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Patient updated successfully',
            data: patient
        });
    } catch (error) {
        console.error('Update patient error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update patient'
        });
    }
};

// Delete patient
export const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Patient deleted successfully'
        });
    } catch (error) {
        console.error('Delete patient error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete patient'
        });
    }
};

// Search patients
export const searchPatients = async (req, res) => {
    try {
        const { searchMethod, searchValue } = req.body;
        
        if (!searchValue) {
            return res.status(400).json({
                success: false,
                message: 'Search value is required'
            });
        }

        let query = {};
        if (searchMethod === 'id') {
            query = { _id: searchValue };
        } else if (searchMethod === 'phone') {
            query = { phone: searchValue };
        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid search method'
            });
        }

        const patient = await Patient.findOne(query);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        res.status(200).json({
            success: true,
            data: patient
        });
    } catch (error) {
        console.error('Search patients error:', error);
        // Handle cases like invalid ObjectId
        if (error.kind === 'ObjectId') {
             return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Failed to search for patient'
        });
    }
}; 