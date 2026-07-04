# System Architecture & Folder Structure 🏗️

## Seni Bina Sistem (Architecture)

1. **Client (React + Vite):** Bertanggungjawab untuk memaparkan UI (Public Web & Admin Dashboard) dan membuat panggilan API menggunakan Axios + TanStack Query.
2. **Server (Node + Express):** Mengendalikan logik perniagaan, pengesahan (JWT), dan sambungan ke pangkalan data.
3. **Database (MongoDB Atlas):** Menyimpan semua data secara berpusat.
4. **Media (Cloudinary):** Menyimpan gambar yang dimuat naik (supaya database tidak berat).

## Struktur Direktori Utama

```text
company-cms/
├── client/                 # Frontend React App (Vite)
│   ├── src/
│   │   ├── assets/         # Imej statik, logo
│   │   ├── components/     # Komponen UI boleh guna semula (Button, Input)
│   │   ├── hooks/          # Custom React Hooks
│   │   ├── layouts/        # Layouts (AdminLayout, PublicLayout)
│   │   ├── pages/          # Halaman (Dashboard, Login, Home)
│   │   ├── services/       # Fail integrasi Axios (api.js)
│   │   ├── store/          # State management (Zustand/Redux)
│   │   └── utils/          # Fungsi utility
├── server/                 # Backend Node.js
│   ├── src/
│   │   ├── config/         # Sambungan DB, Cloudinary
│   │   ├── controllers/    # Logik utama setiap API
│   │   ├── middlewares/    # AuthGuard, ErrorHandler
│   │   ├── models/         # Schema Mongoose
│   │   ├── routes/         # Definisi Endpoints
│   │   └── utils/          # Fungsi utility backend
├── docs/                   # Semua dokumentasi terperinci
├── README.md               # Maklumat umum projek
└── .gitignore
```
