const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  relationship: { type: String, required: true }
}, { _id: false });

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  blood_group: { type: String },
  emergency_contact: { type: emergencyContactSchema, required: true },
  medical_history: [{ type: String }],
  allergies: [{ type: String }],
  current_medications: [{ type: String }],
  precautions: [{ type: String }],
  next_steps: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema); 