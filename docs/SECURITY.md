# Pelan Keselamatan (Security Architecture Plan)
Sistem Pengurusan Kandungan (CMS) - MERN Stack

Dokumen ini menyenaraikan perancangan dan penaiktarafan ciri-ciri keselamatan (security) yang akan diimplementasikan ke dalam aplikasi CMS untuk melindunginya daripada serangan siber biasa (seperti XSS, CSRF, NoSQL Injection, dan Brute Force).

---

## 1. Pengesahan & Kawalan Akses (Authentication & Authorization)
Buat masa ini, sistem kita menggunakan token JWT yang disimpan dalam `localStorage`. Ini mendedahkan sistem kepada risiko serangan **XSS (Cross-Site Scripting)** jika laman web digodam.

**Tindakan Seterusnya:**
*   [ ] **Migrasi ke HTTP-Only Cookies:** Pindahkan penyimpanan JWT token dari Frontend (localStorage) ke Backend menggunakan *Cookies* yang berstatus `httpOnly`, `Secure` dan `SameSite`. Ini menghalang token dicuri melalui skrip Javascript jahat.
*   [ ] **Token Jangka Pendek & Refresh Token:** Hadkan jangka hayat *Access Token* (cth: 15 minit) dan hasilkan *Refresh Token* (cth: 7 hari) untuk membaharui sesi secara senyap tanpa mengganggu pengguna.
*   [ ] **Polisi Kata Laluan Kuat:** Wajibkan kombinasi huruf besar, huruf kecil, nombor dan simbol semasa penciptaan akaun Admin (menggunakan validator seperti `Zod`).

## 2. Keselamatan Rangkaian & API (Network & API Protection)
API kita sekarang terbuka menerima *request* tanpa penapisan lalu lintas (traffic filtering).

**Tindakan Seterusnya:**
*   [ ] **Helmet.js:** Pasang middleware `helmet` di Express.js untuk menapis *HTTP Headers* yang mendedahkan maklumat pelayan dan menghalang serangan *Clickjacking*.
*   [ ] **CORS (Cross-Origin Resource Sharing) Ketat:** Konfigurasi CORS untuk hanya membenarkan *request* dari domain/URL yang disahkan (contohnya URL frontend sahaja) supaya penggodam tak boleh panggil API kita dari web lain.
*   [ ] **Rate Limiting (Had Trafik):** Pasang `express-rate-limit` pada laluan Login. Contoh: Hadkan maksimum 5 percubaan log masuk gagal dalam masa 15 minit (menghalang serangan *Brute Force* & DDoS).

## 3. Sanitasi & Integriti Data (Data Sanitization)
Penting untuk memastikan data yang dimasukkan oleh pengguna luar (melalui borang Peti Masuk) tidak mengandungi kod berbahaya.

**Tindakan Seterusnya:**
*   [ ] **Halang NoSQL Injection:** Pasang `express-mongo-sanitize` untuk buang tanda dolar `$` dan titik `.` dalam *request body* yang cuba memanipulasi *query* MongoDB.
*   [ ] **Halang XSS (Cross-Site Scripting):** Pasang `xss-clean` di backend dan gunakan `DOMPurify` di frontend untuk membersihkan input HTML (terutamanya mesej yang dihantar oleh pelanggan).

## 4. Pemantauan Keselamatan (Security Monitoring & Auditing)
**Tindakan Seterusnya:**
*   [ ] **Sistem Log (Logging):** Gunakan `morgan` atau `winston` untuk merakam (log) setiap *request* yang masuk ke pelayan, terutama sekali rekod percubaan log masuk (berjaya atau gagal) berserta dengan rekod alamat IP.
*   [ ] **Kunci Akaun (Account Lockout):** Jika terdapat banyak percubaan log masuk yang gagal pada e-mel yang sama, akaun tersebut akan disekat secara sementara (cth: 30 minit).

---
*Pelan ini dicadangkan untuk mencapai tahap keselamatan gred-perusahaan (enterprise-grade) sebelum sistem dilancarkan ke peringkat produksi.*
