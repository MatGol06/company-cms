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
    
    // Path public yang akan dipulangkan ke client
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  });
});

module.exports = router;
