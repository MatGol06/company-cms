# Coding Standards & Conventions 📜

## 1. Naming Conventions (Penamaan)
- **Fail React (Komponen/Pages):** `PascalCase.jsx` (Cth: `AdminDashboard.jsx`)
- **Fail Biasa (Utils/Services/Hooks):** `camelCase.js` (Cth: `useAuth.js`, `apiClient.js`)
- **Fungsi & Pembolehubah:** `camelCase` (Cth: `fetchData()`, `isActive`)
- **CSS Classes:** `kebab-case` (Jika guna custom CSS). Untuk Tailwind, kekalkan susunan standard.

## 2. React Components
- Gunakan **Functional Components** dengan Hooks.
- Jangan gunakan Class Components.
- Asingkan logik kompleks ke dalam Custom Hooks.

## 3. REST API Naming
- Gunakan kata nama jamak (plural) untuk endpoints.
  - Betul: `/api/users`, `/api/posts`
  - Salah: `/api/getUser`, `/api/post`
- Gunakan HTTP Methods dengan betul (GET, POST, PUT, DELETE).

## 4. Git Commit Messages
Format: `[Type]: [Keterangan Ringkas]`
- `feat:` - Fungsi baru (Cth: `feat: add login page`)
- `fix:` - Pembetulan pepijat (Cth: `fix: resolve crash on dashboard`)
- `docs:` - Kemas kini dokumentasi (Cth: `docs: update API.md`)
- `style:` - Format, koma, ruang (Tiada perubahan logik)
- `refactor:` - Kemas kini kod tanpa mengubah fungsinya
