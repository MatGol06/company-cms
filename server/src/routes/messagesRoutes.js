const express = require('express');
const router = express.Router();
const { createMessage, getMessages, getMessageById, deleteMessage } = require('../controllers/messagesController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.route('/')
  .post(createMessage) // Public boleh hantar
  .get(protect, adminOnly, getMessages); // Admin je boleh baca

router.route('/:id')
  .get(protect, adminOnly, getMessageById) 
  .delete(protect, adminOnly, deleteMessage); 

module.exports = router;
