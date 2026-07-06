const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getSettings) // Awam (untuk dipapar kat header/footer frontend)
  .put(protect, adminOnly, updateSettings); // Hanya Admin boleh edit

module.exports = router;
