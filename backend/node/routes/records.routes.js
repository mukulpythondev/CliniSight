import express from 'express';
import { 
    getAllRecords, 
    getRecord, 
    createRecord, 
    updateRecord, 
    deleteRecord,
    getPatientRecords 
} from '../controllers/records.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Records routes
router.get('/', getAllRecords);
router.get('/patient/:patientId', getPatientRecords);
router.post('/', createRecord);
router.get('/:id', getRecord);
router.put('/:id', updateRecord);
router.delete('/:id', deleteRecord);

export default router; 