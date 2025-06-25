const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['diagnosis', 'reminder', 'info'], default: 'info' },
  read: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema); 