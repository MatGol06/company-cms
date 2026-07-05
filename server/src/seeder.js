const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const path = require('path');

// Baca fail .env
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔄 Memadam data lama...');
    
    // Padam semua user lama (reset bersih)
    await User.deleteMany();

    console.log('👤 Mencipta Admin Baru...');
    // Cipta admin baru
    await User.create({
      name: 'Admin Utama',
      email: 'admin@company.com',
      password: 'password123', // Akan di-hash oleh model secara auto
      role: 'admin'
    });

    console.log('✅ Seeder Berjaya: Admin berjaya dimasukkan ke database!');
    process.exit();
  } catch (error) {
    console.error('❌ Ralat Seeder:', error);
    process.exit(1);
  }
};

seedData();
