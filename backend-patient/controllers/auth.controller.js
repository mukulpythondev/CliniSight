const Patient = require('../models/patient.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, phone, email, password, age, gender, address, blood_group, emergency_contact } = req.body;
    if (!name || !phone || !email || !password || !age || !gender || !address || !emergency_contact) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }
    const existing = await Patient.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      return res.status(409).json({ message: 'Patient already exists with this email or phone.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const patient = new Patient({
      name, phone, email, password: hashedPassword, age, gender, address, blood_group, emergency_contact
    });
    await patient.save();
    res.status(201).json({ message: 'Patient registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const token = jwt.sign({ id: patient._id, role: 'patient' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, patient: { id: patient._id, name: patient.name, email: patient.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 