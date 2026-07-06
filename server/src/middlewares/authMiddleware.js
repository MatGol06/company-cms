const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Ambil token dari HTTP-Only Cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // Decode dan sahkan token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Cari pengguna berdasarkan ID dalam token, buang field password
      req.user = await User.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Tidak sah (Not authorized), token tidak valid atau luput' });
    }
  } else {
    res.status(401).json({ message: 'Tidak sah (Not authorized), tiada token ditemui' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Akses ditolak. Hanya admin dibenarkan.' });
  }
};

module.exports = { protect, adminOnly };
