const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Muat pembolehubah dari fail .env
dotenv.config({ path: './.env' });

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require('./routes/authRoutes');
const pagesRoutes = require('./routes/pagesRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const messagesRoutes = require('./routes/messagesRoutes');

// Mount Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/pages', pagesRoutes);
app.use('/api/v1/services', servicesRoutes);
app.use('/api/v1/messages', messagesRoutes);

// Endpoint Asas (Untuk test adakah server hidup)
app.get('/', (req, res) => {
  res.json({ message: '🚀 Company CMS API is running!' });
});

const PORT = process.env.PORT || 5000;

// Sambungan ke Database dan Mula Server
const startServer = async () => {
  try {
    // Cuba connect ke MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Berjaya Disambungkan!');
    
    app.listen(PORT, () => {
      console.log(`🟢 Server sedang berjalan di port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Gagal sambung ke MongoDB:', error.message);
    
    // Walaupun DB gagal, kita hidupkan juga server supaya nampak ralat
    app.listen(PORT, () => {
      console.log(`⚠️ Server berjalan di port ${PORT} (TANPA DATABASE)`);
    });
  }
};

startServer();
