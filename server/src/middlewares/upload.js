const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const path = require('path');

// Konfigurasi Cloudinary menggunakan Environment Variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Semak jika Cloudinary keys ada dalam fail .env
const useCloudinary = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY;

let storage;

if (useCloudinary) {
  console.log('☁️ Menggunakan Cloudinary untuk storan gambar');
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'company_cms', // Nama folder dalam Cloudinary
      allowed_formats: ['jpeg', 'jpg', 'png', 'webp', 'gif'],
      transformation: [{ width: 1200, crop: 'limit' }] // Auto-resize supaya jimat space
    }
  });
} else {
  console.log('💾 Menggunakan Local Storage untuk storan gambar (Development)');
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../public/uploads/'));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'img-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
}

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit 5MB
  fileFilter: (req, file, cb) => {
    // Kalau guna local storage, fileFilter ini akan jalan. Cloudinary dah filter kat 'allowed_formats'
    if (useCloudinary) {
      return cb(null, true); 
    }
    const filetypes = /jpeg|jpg|png|webp|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Hanya fail gambar dibenarkan! (jpeg, jpg, png, webp, gif)'));
  }
});

module.exports = upload;
