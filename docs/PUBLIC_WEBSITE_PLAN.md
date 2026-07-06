# Pelan Laman Web Awam (Public Facing Website Plan) 🌐

Dokumen ini merangka strategi dan struktur untuk membina bahagian hadapan (Frontend) yang akan dipaparkan kepada pelanggan dan pelawat luar. Laman web ini akan membaca data secara dinamik dari sistem CMS (Backend) yang telah kita bina.

## 1. Objektif Utama
- Membina laman web korporat yang **premium, laju, dan responsif**.
- Menggunakan data yang diuruskan sepenuhnya dari Dashboard Admin (CMS).
- Menerapkan reka bentuk UI moden (contoh: *Glassmorphism*, transisi lancar, dan *micro-animations*).

## 2. Struktur Pautan (Routing)
Laman web awam akan dipisahkan laluan (routes) daripada laluan `/admin`.
*   `/` (Laman Utama / Home): Paparan 'Hero', ringkasan servis, dan borang hubungi kami.
*   `/services` (Servis Kami): Senarai penuh perkhidmatan yang ditawarkan (dari API `services`).
*   `/contact` (Hubungi Kami): Borang khas untuk pelawat menghantar mesej ke `Peti Masuk` admin.
*   `/:slug` (Halaman Dinamik): Menangkap apa-apa halaman tambahan yang dicipta oleh admin (cth: `/tentang-kami`, `/terma-dan-syarat`) dan memaparkannya menggunakan data JSON dari API `pages`.

## 3. Komponen Utama (Public Components)
Kita akan hasilkan folder khas `client/src/components/public` dan `client/src/pages/public`:
1.  **`Navbar.jsx`**: Menu navigasi atas. Akan memanggil API `/settings` untuk memaparkan **Logo Syarikat**.
2.  **`Footer.jsx`**: Bahagian bawah laman web. Akan memaparkan **Nama Syarikat**, **Slogan**, dan **E-mel Rasmi** (juga dari API `/settings`).
3.  **`HeroSection.jsx`**: Elemen pertama yang menangkap mata pelawat (Wow Factor). Akan menggunakan animasi lembut supaya nampak 'hidup'.

## 4. Pelan Aliran Kerja (Workflow)
Untuk melaksanakan pembinaan ini secara berfasa tanpa mengacau sistem Admin sedia ada:

*   **Fasa 1: Komponen Rangka (Layout)** 
    - Bina `PublicLayout.jsx` yang mengandungi Navbar & Footer kosong.
    - Sambungkan laluan awam ke dalam fail `App.jsx`.
*   **Fasa 2: Integrasi Data Global** 
    - Pautkan API Tetapan (`settings`) supaya Navbar dan Footer boleh memaparkan maklumat rasmi syarikat.
*   **Fasa 3: Pembinaan Laman Utama (Home)** 
    - Reka bentuk halaman Utama yang memanggil API `pages` untuk kandungan muka depan.
*   **Fasa 4: Borang Peti Masuk (Contact Form)**
    - Bina borang UI yang akan POST mesej pelanggan terus ke API `/messages`.

## 5. Tema Reka Bentuk (Design Vibe)
Seperti yang disarankan dalam garis panduan (*Best Practices*), rekaan tak boleh nampak *basic* atau murah.
- **Warna:** Menggunakan tona warna jenama (rujuk `UI_GUIDELINE.md`), mungkin tema sedikit cerah dengan elemen '*dark mode*' sekiranya perlu.
- **Efek (Effects):** Menggunakan bayang lembut (*soft shadows*) dan kesan '*glass*' apabila *scroll*.
- **Font:** Menggunakan tipografi Google Fonts (*Inter/Roboto/Outfit*) yang teguh.

---
*Laman web ini adalah "wajah" syarikat. Kepuasan pelawat pada saat pandangan pertama (First Impression) adalah matlamat utama.*
