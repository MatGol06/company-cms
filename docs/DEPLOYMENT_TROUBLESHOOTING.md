# Panduan Pelancaran (Deployment) & Penyelesaian Masalah MERN Stack

Dokumen ini merekodkan segala isu, ralat (error), dan penyelesaian yang kita hadapi semasa menaikkan projek **Company CMS** ke pelayan awan (Vercel & Render). Rujuk fail ini pada masa hadapan supaya kesilapan yang sama tidak berulang.

---

## 1. Isu Kegagalan 'Build' di Render (Konflik Versi Library)
**Gejala:** Pelayan Render gagal dilancarkan *(Crash)* dengan mesej ralat `Conflicting peer dependency: cloudinary`.
**Punca:** Semasa memuat turun `multer-storage-cloudinary`, Render menggunakan arahan `npm install` biasa yang ketat terhadap perbezaan versi *library*.
**Penyelesaian Kekal:**
* Telah dicipta satu fail tersembunyi bernama `.npmrc` di dalam folder `server/`.
* Kandungan fail: `legacy-peer-deps=true`.
* **Pengajaran:** Sentiasa sediakan `.npmrc` ini apabila menggunakan pakej lama atau yang mempunyai konflik versi supaya Render/Heroku tahu cara menguruskannya secara automatik.

---

## 2. Isu Keselamatan Cookies Tersangkut (Cross-Origin)
**Gejala:** Selepas log masuk, pengguna terkeluar semula atau maklumat log masuk tidak disimpan di pelayar (*browser*).
**Punca:** Secara lalai, sistem keselamatan Google Chrome menghalang fail '*Cookies*' dihantar jika Frontend (Vercel) dan Backend (Render) menggunakan domain laman web yang berbeza.
**Penyelesaian Kekal:**
* Di dalam `server/src/controllers/authController.js`, kod penghasilan Cookie telah diubah untuk mengandungi:
  ```javascript
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  ```
* **Pengajaran:** Wajib guna `sameSite: 'none'` dan `secure: true` apabila Frontend dan Backend berada di alamat yang berlainan (bukan `localhost`).

---

## 3. Isu Amaran Merah CORS (Cross-Origin Resource Sharing)
**Gejala:** Terdapat tulisan merah "CORS Error" di *Developer Tools* apabila Frontend cuba berinteraksi dengan API Backend.
**Punca:** Pengawal pelayan (CORS Middleware) terlalu ketat dan kadangkala gagal mengecam pautan Vercel jika terdapat ralat ejaan kecil, seperti tertambah tanda palang (`/`) di belakang alamat `CLIENT_URL`.
**Penyelesaian Kekal:**
* Di dalam `server/src/server.js`, tetapan CORS telah diubah menjadi sangat fleksibel tetapi selamat:
  ```javascript
    app.use(cors({
    origin: true, // Automatik pulangkan Origin sebenar (sangat kebal)
    credentials: true
  }));
  ```
* **Pengajaran:** Tetapan `origin: true` adalah ubat paling mujarab untuk sebarang masalah CORS yang memeningkan kepala apabila melibatkan Vercel dan Render.

---

## 4. Isu 404 Not Found Semasa Log Masuk
**Gejala:** Apabila menekan butang *Login*, sistem Frontend tidak menemui jalan (*404 Error*) kerana ia cuba menghantar data ke jalan yang salah.
**Punca:** Sewaktu menetapkan kunci *Environment Variables* di Vercel, pemaju terlupa memasukkan laluan API yang tepat (`/api/v1`). Ia menyebabkan Vercel menghantar trafik ke luar dari radar *Express Router*.
**Penyelesaian:**
* Pastikan di Vercel, tetapan `VITE_API_URL` mesti diakhiri dengan `/api/v1`.
* Contoh salah: `https://cms.onrender.com`
* Contoh betul: `https://cms.onrender.com/api/v1`
* **Pengajaran:** Sentiasa periksa laluan API, dan selepas menukar *Environment Variable* di Vercel, **Wajib Redeploy**!

---

## 5. Isu Halaman Putih 404 Vercel Semasa 'Refresh'
**Gejala:** Apabila berada di pautan seperti `/login` atau `/admin` dan pelayar di-*refresh*, pengguna dihidangkan dengan skrin putih yang tertera ralat "404: NOT_FOUND" dari Vercel.
**Punca:** Projek React adalah *Single Page Application* (SPA). Vercel lurus bendul mencari fail berasingan (cth: `login.html`) yang sebenarnya tidak wujud.
**Penyelesaian Kekal:**
* Telah dicipta fail `client/vercel.json` dengan arahan `rewrites` supaya Vercel mengarahkan apa jua pautan kembali ke `index.html`.
* **Pengajaran:** Setiap projek React (Vite/Create React App) yang dilancarkan ke Vercel WAJIB disertakan dengan fail `vercel.json` ini.

---

## 6. Isu Terus Ditendang Selepas Berjaya Login
**Gejala:** Status di rangkaian (Network) memaparkan `200 OK` (berjaya log masuk), tetapi pengguna hanya berkelip di muka surat *Admin* sebelum dihumban semula ke halaman *Login* dalam masa 0.1 saat.
**Punca:** Fail susun atur pelindung (`AdminLayout.jsx`) diprogramkan untuk menyemak kewujudan `cms_token` di dalam storan awam *Browser* (`localStorage`). Walau bagaimanapun, kita telah berhijrah ke sistem *HTTP-Only Cookie* (yang tersembunyi), jadi tiket itu tak dapat dijumpai secara terbuka.
**Penyelesaian Kekal:**
* Pengawal `AdminLayout.jsx` kini hanya menyemak kewujudan profil `cms_user` sahaja, dan tidak lagi memburu '*token*' yang ghaib itu.
* **Pengajaran:** Jika menggunakan *HTTP-Only Cookie*, jangan paksa Frontend (React) menyemak *Token*, cukup sekadar menyemak identiti (*User Data*) atau buat panggilan ke API Backend `/me`.

---

## 7. Amaran Keselamatan Database MongoDB Atlas
**Gejala:** Amaran kuning/merah dari MongoDB Atlas mengenai pembukaan alamat IP kepada `0.0.0.0/0` (Allow Access From Anywhere).
**Punca:** Pelayan perkhidmatan percuma seperti Render tidak mempunyai IP Statik (alamat pelayannya sering bertukar ganti).
**Penyelesaian:**
* Ini adalah normal dan selamat jika pautan rahsia `MONGO_URI` dilengkapi kata laluan yang kuat. Amaran ini boleh diabaikan demi kelancaran penyambungan sistem awan percuma.
