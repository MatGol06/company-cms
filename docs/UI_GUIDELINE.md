# UI Guidelines & Design System

## 1. Konsep Reka Bentuk
- **Gaya:** Minimalist, Moden, dan Profesional.
- **Fokus:** Kebolehbacaan, kejelasan, dan kontras yang tinggi.
- **Estetika Murni (Strict Rule):** **TIDAK DIBENARKAN MENGGUNAKAN EMOJI** di dalam mana-mana teks, butang, atau komponen antaramuka (UI). Ini penting bagi mengekalkan imej korporat dan mengelakkan *design* nampak kebudak-budakan atau "murah". Gunakan Ikon Profesional (seperti FontAwesome atau Lucide Icons) sebagai ganti.

## 2. Tipografi (Typography)
- **Heading Font:** `Inter` atau `Space Grotesk` (Tegas dan Jelas).
- **Body Font:** `Roboto` atau `Inter` (Mudah dibaca).

## 3. Warna (Color Palette)
- **Primary:** `#2563EB` (Biru Korporat) - Untuk butang utama, pautan aktif.
- **Secondary:** `#1E293B` (Slate Gelap) - Untuk sidebar, teks utama.
- **Background:** `#F8FAFC` (Kelabu Cerah) - Latar belakang dashboard admin.
- **Surface:** `#FFFFFF` (Putih) - Latar belakang kad (cards) dan borang.
- **Success:** `#10B981` (Hijau)
- **Danger:** `#EF4444` (Merah)

## 4. Spacing & Bentuk (Spacing & Shapes)
- **Border Radius:** `8px` (rounded-lg) untuk butang dan kad. Sederhana lembut.
- **Padding:** Sentiasa gunakan skala gandaan 4 (4px, 8px, 16px, 24px, 32px).
- **Shadows:** Bayang-bayang lembut (`shadow-md`) pada kad untuk memberi ilusi kedalaman.

## 5. Komponen Utama
- **Butang (Buttons):** Mesti mempunyai state `:hover` dan `:focus`.
- **Borang (Forms):** Label yang jelas, sempadan kelabu, bertukar warna apabila fokus (`focus:ring-2`).
- **Maklum Balas (Feedback):** Gunakan Toast atau Alerts untuk tindakan berjaya/gagal.

---

## 6. Garis Panduan Prompt AI (Anti-Generic Design)
Bagi mengelakkan rekaan UI yang dihasilkan oleh AI nampak terlalu ringkas, tipikal, atau bosan (Generic AI Look), sentiasa gunakan **Kata Kunci Visual (Design Jargon)** di dalam prompt. Jangan sekadar menyuruh AI mencipta "laman web yang cantik". 

Gunakan format prompt berikut:

### 1. Nyatakan Estetika (Aesthetic Style)
*   **Prompt Biasa:** "Buat design yang moden."
*   **Prompt Padu:** "Gunakan gaya rekabentuk **Bento Box UI** atau **Asymmetrical Grid**. Jangan guna layout berpetak yang membosankan. Terapkan elemen **Glassmorphism** dengan `backdrop-blur` dan sempadan keputihan yang sangat nipis."

### 2. Beri "Role Model" atau Rujukan Premium
*   **Prompt Padu:** "Reka halaman ini dengan aura premium, minimalis, dan bersih seperti laman web **Stripe**, **Apple**, atau **Vercel**. Gunakan warna monokrom dengan bayang-bayang bersaiz besar tetapi sangat lembut (`shadow-2xl` dengan opacity 5%)."

### 3. Pecahkan Susunan Tradisional
*   **Prompt Padu:** "Elakkan susunan tradisional (gambar di kiri, teks di kanan). Jadikan gambar sebagai latar belakang penuh dengan kesan *gradient overlay* gelap, dan letakkan tipografi utama (Headline) di tengah dengan saiz gergasi."

### 4. Tekankan Hierarki Tipografi
*   **Prompt Padu:** "Jangan sesekali gunakan font lalai (default browser font). Gunakan **Space Grotesk** atau **Outfit** yang bersaiz sangat besar untuk Heading. Untuk subteks, gunakan warna kelabu (`text-slate-500`) untuk mewujudkan kontras dan hierarki visual yang tepat."

### 5. Arahan Animasi & Transisi (Micro-Interactions)
*   **Prompt Padu:** "Pastikan laman web nampak 'hidup'. Tambahkan transisi animasi yang lancar. Contohnya, apabila *hover* pada kad, kad tersebut terapung (`hover:-translate-y-2`) secara perlahan (`duration-500`) dan bukannya melompat secara mengejut."

> **Contoh Prompt Sempurna:**
> *"Bina satu Hero Section. Saya tak nak layout standard. Reka dengan gaya Sleek & Premium ala-ala laman web Vercel. Tolong letak efek pendar (gradient glow) halus di sebalik butang CTA utama. Terapkan kontras yang tinggi pada Tipografi dan PASTIKAN tiada satu pun emoji digunakan. Guna Lucide Icons jika perlu."*
