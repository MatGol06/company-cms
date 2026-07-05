const Message = require('../models/Message');

// @desc    Orang awam hantar mesej
// @route   POST /api/v1/messages
// @access  Public
const createMessage = async (req, res) => {
  const { name, email, subject, content } = req.body;
  try {
    const message = await Message.create({ name, email, subject, content });
    res.status(201).json({ message: 'Mesej berjaya dihantar!', data: message });
  } catch (error) {
    res.status(500).json({ message: 'Ralat pelayan: Gagal menghantar mesej' });
  }
};

// @desc    Dapatkan senarai semua mesej
// @route   GET /api/v1/messages
// @access  Private (Admin Only)
const getMessages = async (req, res) => {
  try {
    // Susun dari paling baru (descending)
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Ralat mendapatkan mesej' });
  }
};

// @desc    Buka spesifik mesej & tanda sebagai 'read' (dibaca)
// @route   GET /api/v1/messages/:id
// @access  Private (Admin Only)
const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      if (!message.isRead) {
        message.isRead = true; // Auto tanda dibaca
        await message.save();
      }
      res.json(message);
    } else {
      res.status(404).json({ message: 'Mesej tidak dijumpai' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ralat pelayan' });
  }
};

// @desc    Padam mesej dari sistem
// @route   DELETE /api/v1/messages/:id
// @access  Private (Admin Only)
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      await message.deleteOne();
      res.json({ message: 'Mesej berjaya dipadam secara kekal' });
    } else {
      res.status(404).json({ message: 'Mesej tidak dijumpai' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gagal memadam mesej' });
  }
};

module.exports = { createMessage, getMessages, getMessageById, deleteMessage };
