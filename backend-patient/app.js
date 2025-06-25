const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const patientRoutes = require('./routes/patient.routes');
app.use('/api/patient', patientRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/api/patient/auth', authRoutes);

const alertRoutes = require('./routes/alert.routes');
app.use('/api/patient/alerts', alertRoutes);

app.get('/', (req, res) => {
  res.send('Patient API is running');
});

module.exports = app; 