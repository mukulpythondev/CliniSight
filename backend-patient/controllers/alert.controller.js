const Alert = require('../models/alert.model');

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ patient: req.user.id }).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const alert = await Alert.findOneAndUpdate(
      { _id: req.params.id, patient: req.user.id },
      { read: true },
      { new: true }
    );
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    res.json(alert);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 