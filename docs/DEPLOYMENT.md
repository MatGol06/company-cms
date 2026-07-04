# Deployment Guide 🚀

## 1. Pangkalan Data: MongoDB Atlas
1. Daftar di [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Cipta projek baru dan kluster (Free Tier).
3. Tambah Database User (Simpan username & password).
4. Benarkan akses rangkaian (Network Access) ke `0.0.0.0/0` (Allow all).
5. Dapatkan *Connection String* URI dan letak dalam fail `.env` backend.

## 2. Backend: Railway (Atau Render)
1. Daftar di [Railway.app](https://railway.app/).
2. Cipta *New Project* -> *Deploy from GitHub repo*.
3. Pilih folder `server` (Sekiranya projek ini dalam satu repo monorepo, set *Root Directory* ke `/server`).
4. Masukkan Environment Variables (`.env`) ke dalam Railway (MONGO_URI, JWT_SECRET, CLOUDINARY_URL, dll).
5. Railway akan bina (build) dan beri satu URL awam.

## 3. Frontend: Vercel
1. Daftar di [Vercel](https://vercel.com).
2. *Import Project* dari GitHub.
3. Tetapkan *Root Directory* ke `/client`.
4. Tetapkan *Build Command*: `npm run build` dan *Output Directory*: `dist`.
5. Masukkan Environment Variables (`VITE_API_URL`) menghala ke URL Backend Railway.
6. Klik Deploy.