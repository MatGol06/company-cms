// Import Modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
require('dotenv').config();

// Create Express App
const app = express();

// Middleware
app.use(morgan('dev')); // 'CCTV' untuk merakam setiap request API
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" } // Benarkan imej diload ke localhost:5173
})); // Kunci HTTP Headers supaya tak terdedah kepada hacker
const allowedOrigin = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, '') : 'http://localhost:5173';
app.use(cors({
  origin: allowedOrigin, // Benarkan Frontend dari Cloud atau Local (buang slash di hujung jika ada)
  credentials: true // Benarkan penghantaran Cookies
}));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.params) mongoSanitize.sanitize(req.params);
  if (req.headers) mongoSanitize.sanitize(req.headers);
  // Avoid req.query because Express 5 makes it read-only
  next();
});

// Serve static files from public folder (for uploaded images)
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const pagesRoutes = require('./routes/pagesRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const messagesRoutes = require('./routes/messagesRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const projectsRoutes = require('./routes/projectsRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Mount Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/pages', pagesRoutes);
app.use('/api/v1/services', servicesRoutes);
app.use('/api/v1/messages', messagesRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/projects', projectsRoutes);
app.use('/api/v1/upload', uploadRoutes);

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
