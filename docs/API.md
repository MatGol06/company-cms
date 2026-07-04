# REST API Documentation 🔌

Base URL (Development): `http://localhost:5000/api/v1`

## 1. Authentication
- `POST /auth/login`: Log masuk dan terima JWT token.
- `GET /auth/me`: Dapatkan profil pengguna semasa.

## 2. Pages
- `GET /pages`: Dapatkan senarai halaman.
- `GET /pages/:slug`: Dapatkan kandungan halaman spesifik (Public).
- `PUT /pages/:slug`: Kemas kini kandungan halaman (Admin).

## 3. Services
- `GET /services`: Senarai semua perkhidmatan (Public).
- `POST /services`: Tambah perkhidmatan (Admin).
- `PUT /services/:id`: Kemas kini perkhidmatan (Admin).
- `DELETE /services/:id`: Buang perkhidmatan (Admin).

## 4. Blog Posts
- `GET /posts`: Senarai semua artikel (Public).
- `GET /posts/:slug`: Baca artikel (Public).
- `POST /posts`: Cipta artikel baru (Admin).
- `PUT /posts/:id`: Kemas kini artikel (Admin).
- `DELETE /posts/:id`: Buang artikel (Admin).

## 5. Messages
- `POST /messages`: Hantar mesej (Public - dari contact form).
- `GET /messages`: Lihat senarai mesej (Admin).
- `PUT /messages/:id/read`: Tanda mesej dah dibaca (Admin).

## Authentication Header
Semua route Admin memerlukan header:
`Authorization: Bearer <JWT_TOKEN>`
