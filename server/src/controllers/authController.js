const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Fungsi bantuan untuk hasilkan JWT Token
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
      const token = generateToken(user._id);
      
      // Tetapkan token ke dalam HTTP-Only Cookie
      res.cookie('jwt', token, {
        httpOnly: true, // Tidak boleh diakses oleh skrip Javascript (Selamat dari XSS)
        secure: process.env.NODE_ENV === 'production', // Mesti true untuk sameSite 'none' (HTTPS)
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Benarkan cross-origin jika production
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 hari tempoh sah
      });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        message: 'Log masuk berjaya'
      });
    } else {
      res.status(401).json({ message: 'E-mel atau kata laluan salah' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ralat pelayan (Server Error)' });
  }
};

// @desc    Log keluar admin
// @route   POST /api/v1/auth/logout
// @access  Public
const logout = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Berjaya log keluar' });
};

module.exports = { login, logout };
