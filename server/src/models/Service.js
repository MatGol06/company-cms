const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String, // Class icon (contoh: fa-solid fa-code) atau link imej
  },
  order: {
    type: Number,
    default: 0, // Untuk susunan dalam page
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
