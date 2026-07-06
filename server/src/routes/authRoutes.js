const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { login, logout } = require('../controllers/authController');

// Konfigurasi Rate Limiter untuk Login (Halang Brute Force)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minit
  max: 5, // Maksimum 5 percubaan sahaja dari IP yang sama
  message: { message: 'Terlalu banyak percubaan log masuk gagal dari IP ini. Sila cuba lagi selepas 15 minit.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Route: POST /api/v1/auth/login
router.post('/login', loginLimiter, login);
router.post('/logout', logout);

module.exports = router;
