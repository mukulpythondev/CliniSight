const Patient = require('../models/patient.model');

exports.getProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id).select('-password');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getRecords = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id).select('medical_history allergies current_medications precautions next_steps');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json({
      medical_history: patient.medical_history,
      allergies: patient.allergies,
      current_medications: patient.current_medications,
      precautions: patient.precautions,
      next_steps: patient.next_steps
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = (({ name, phone, age, gender, address, blood_group, emergency_contact }) => ({ name, phone, age, gender, address, blood_group, emergency_contact }))(req.body);
    const patient = await Patient.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select('-password');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateRecords = async (req, res) => {
  try {
    const updates = (({ medical_history, allergies, current_medications, precautions, next_steps }) => ({ medical_history, allergies, current_medications, precautions, next_steps }))(req.body);
    const patient = await Patient.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select('medical_history allergies current_medications precautions next_steps');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 