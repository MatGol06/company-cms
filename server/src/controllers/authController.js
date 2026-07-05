const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Fungsi untuk hasilkan JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// @desc    Log masuk admin
// @route   POST /api/v1/auth/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Semak jika user wujud dalam database
    const user = await User.findOne({ email });

    // Semak jika password betul
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id), // Hantar token ke frontend
      });
    } else {
      res.status(401).json({ message: 'E-mel atau kata laluan salah' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ralat pelayan (Server Error)' });
  }
};

module.exports = { login };
