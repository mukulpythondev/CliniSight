const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alert.controller');
const auth = require('../middleware/auth');

router.get('/', auth, alertController.getAlerts);
router.patch('/:id/read', auth, alertController.markAsRead);

module.exports = router; 