# Pelan Halatuju Full-Stack Developer (Advanced Roadmap) 🚀

Dokumen ini menggariskan fasa-fasa lanjutan (advanced phases) yang wajib dilaksanakan oleh *Senior Full-Stack Developer* selepas fasa pembinaan fungsi asas siap. Pelan ini bertujuan untuk memastikan sistem CMS dan laman web awam kita berskala besar, pantas, dan bertaraf perusahaan (enterprise-grade).

---

## Fasa 1: Pengujian Automatik (Automated Testing & QA)
Bertujuan untuk memastikan kod baharu tidak merosakkan fungsi yang sedia ada.
*   [ ] **Unit Testing:** Menggunakan **Jest** untuk menguji logik fungsi backend dan frontend secara individu (contoh: logik JWT, pengiraan matematik, atau komponen UI).
*   [ ] **End-to-End (E2E) Testing:** Menggunakan **Cypress** atau **Playwright** untuk mensimulasikan pergerakan pengguna sebenar. Ia akan berfungsi seperti "robot" yang automatik menekan butang *Login*, mengisi borang, dan memastikan paparan keluar dengan betul.

## Fasa 2: Pengoptimuman Prestasi (Performance Optimization)
Bertujuan untuk memastikan kelajuan maksimum laman web diukur menggunakan skor *Google Lighthouse* yang tinggi.
*   [ ] **Caching Data (Redis):** Mengintegrasikan sistem memori pantas di backend supaya API tidak perlu membaca database MongoDB berulang kali untuk data statik seperti Halaman Utama atau Tetapan.
*   [ ] **Pengoptimuman Imej (Image Optimization):** Mengubah saiz dan memampatkan imej ke format *WebP* secara automatik supaya *loading* website pantas berdesup.
*   [ ] **Database Indexing:** Menambah *Index* pada struktur MongoDB untuk mempercepatkan carian jika data mencapai puluhan ribu rekod.

## Fasa 3: Saluran Automasi (CI/CD Pipeline)
Mengautomasikan proses pelancaran (Deployment) supaya lebih teratur dan selamat.
*   [ ] **GitHub Actions / GitLab CI:** Menyediakan skrip pelancaran supaya setiap kali kod ditolak (`git push`), sistem akan:
    1.  Menjalankan ujian automatik (Test).
    2.  Membina versi kod produksi (Build).
    3.  Memuat naik ke pelayan utama (Deploy) secara senyap tanpa *Downtime*.

## Fasa 4: Pemantauan & Keselamatan (Monitoring & Analytics)
Menjadi "mata dan telinga" sistem 24/7 semasa *Live*.
*   [ ] **Sentry Integration:** Memasang amaran awal (alert). Sentry akan menghantar notifikasi segera ke Telegram/E-mel berserta log ralat sekiranya sistem menghadapi ralat 500 (Server Error) atau ada *bug* JavaScript di *browser* pelawat.
*   [ ] **PostHog / Google Analytics:** Memasang sistem *tracking* di Frontend untuk memantau corak pelawat, melihat pautan mana yang kerap diklik, dan memperhalusi strategi perniagaan (SEO).

## Fasa 5: Skala Besar & Kontena (Scaling & Dockerization)
Bagi menyediakan sistem yang mampu menampung trafik luar biasa tinggi secara mengejut (High Availability).
*   [ ] **Docker:** Membungkus (containerize) aplikasi React dan Express ke dalam imej Docker supaya ia mudah dipindahkan ke mana-mana *server* baru dengan konfigurasi yang sama.
*   [ ] **Load Balancing (Nginx):** Mengkonfigurasi *Reverse Proxy* untuk membahagikan deruan trafik pelawat secara seimbang kepada beberapa *instance* (klon pelayan) jika trafik mencanak naik.

## Fasa 6: Penambahan Ciri Premium (Feature Backlog) 💡
Untuk meningkatkan taraf CMS kepada sistem bertaraf antarabangsa setanding WordPress atau Shopify.
*   [ ] **Pustaka Media (Centralized Media Library):** Modul pengurusan fail di Admin Dashboard untuk fungsi *drag-and-drop* gambar (menggunakan integrasi *Cloudinary* atau AWS S3) supaya tidak lagi perlu menyalin pautan gambar luar secara manual.
*   [ ] **Sistem Blog / Artikel Automatik (Blogging System):** Penambahan entiti "Berita" yang dilengkapi dengan *Rich Text Editor* (Quill.js) untuk Admin menulis artikel. Berfungsi sebagai senjata SEO utama di *Public Site*.
*   [ ] **Graf Analitik Dashboard (Dashboard Analytics):** Pemasangan graf interaktif (Chart.js / Recharts) di skrin utama Admin untuk memaparkan statistik ringkas seperti bilangan mesej masuk setiap bulan atau tetapan yang kerap ditukar.
*   [ ] **Sistem Janji Temu (Booking System):** Penambahan modul kalendar interaktif di mana pelawat boleh menempah slot masa untuk servis, dan Admin boleh *Approve/Reject* di Dashboard.
*   [ ] **Tema Mod Gelap (Dark Mode Toggle):** Menyediakan suis penukar tema di bahagian awam bagi membolehkan paparan UI ditukar kepada versi gelap yang lebih eksklusif dan selesa di mata.

---
*Roadmap ini membezakan sebuah projek asas daripada sebuah platform gergasi berskala industri.*
