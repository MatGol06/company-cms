const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.post('/', protect, adminOnly, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Tiada fail dimuat naik.' });
    }
    // Semak samada menggunakan Cloudinary (ada req.file.path yang mula dengan http) 
    // atau Local Storage (guna req.file.filename)
    let imageUrl = '';
    if (req.file.path && req.file.path.startsWith('http')) {
      imageUrl = req.file.path; // URL Penuh dari Cloudinary
    } else {
      imageUrl = `/uploads/${req.file.filename}`; // Local Path
    }
    
    res.json({ imageUrl });
  });
});

module.exports = router;
