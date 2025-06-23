import express from 'express';
import { 
    getAllPatients, 
    getPatient, 
    createPatient, 
    updatePatient, 
    deletePatient, 
    searchPatients 
} from '../controllers/patient.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Patient routes
router.get('/', getAllPatients);
router.post('/search', searchPatients);
router.post('/', createPatient);
router.get('/:id', getPatient);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

export default router; 