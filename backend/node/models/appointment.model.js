import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  type: { type: String, default: 'follow-up' },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
