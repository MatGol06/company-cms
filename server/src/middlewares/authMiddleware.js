const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Semak jika header mengandungi token jenis Bearer
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Dapatkan token (Bearer [TOKEN_STRING])
      token = req.headers.authorization.split(' ')[1];

      // Dekod & sahkan token guna JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Cari user berdasarkan ID dari token (kecualikan password)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Boleh ke laluan seterusnya
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Sesi tamat atau token tidak sah. Sila log masuk semula.' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Tiada akses (No Token). Anda mesti log masuk.' });
  }
};

// Opsional: Middleware khas untuk Admin sahaja
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Akses dinafikan. Hanya Admin dibenarkan.' });
  }
};

module.exports = { protect, adminOnly };
