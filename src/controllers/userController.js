const User = require('../models/user');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const updates = {};
    if (fullName) updates.fullName = fullName;
    if (email) {
      const existing = await User.findByEmail(email);
      if (existing && existing.id !== req.userId) {
        return res.status(400).json({ error: 'Email already in use' });
      }
      updates.email = email;
    }
    if (password) updates.password = password;
    const updated = await User.update(req.userId, updates);
    if (updated === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal error' });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const deleted = await User.delete(req.userId);
    if (deleted === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal error' });
  }
};