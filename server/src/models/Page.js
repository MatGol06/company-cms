const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true, // cth: 'home', 'about', 'contact'
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: Object, // Simpan dalam format JSON (supaya frontend boleh map section berbeza)
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Page', pageSchema);
