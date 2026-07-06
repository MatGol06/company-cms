// Import Modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const morgan = require('morgan');
require('dotenv').config();

// Create Express App
const app = express();

// Middleware
app.use(morgan('dev')); // 'CCTV' untuk merakam setiap request API
app.use(helmet()); // Kunci HTTP Headers supaya tak terdedah kepada hacker
app.use(cors({
  origin: 'http://localhost:5173', // Benarkan Frontend
  credentials: true // Benarkan penghantaran Cookies
}));
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize()); // Halang NoSQL Injection (buang tanda $ dan .)
app.use(xss()); // Halang serangan XSS (bersihkan tag HTML jahat dari input)

// Import Routes
const authRoutes = require('./routes/authRoutes');
const pagesRoutes = require('./routes/pagesRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const messagesRoutes = require('./routes/messagesRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

// Mount Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/pages', pagesRoutes);
app.use('/api/v1/services', servicesRoutes);
app.use('/api/v1/messages', messagesRoutes);
app.use('/api/v1/settings', settingsRoutes);

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
