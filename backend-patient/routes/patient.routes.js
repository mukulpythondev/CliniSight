const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');
const auth = require('../middleware/auth');

router.get('/profile', auth, patientController.getProfile);
router.get('/records', auth, patientController.getRecords);
router.put('/profile', auth, patientController.updateProfile);
router.put('/records', auth, patientController.updateRecords);

module.exports = router; 