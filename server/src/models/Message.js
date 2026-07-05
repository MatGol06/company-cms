const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  isRead: { type: Boolean, default: false }, // true bila admin dah klik buka
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
