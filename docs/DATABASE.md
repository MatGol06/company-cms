# Database Design & ERD 🗄️

Sistem menggunakan **MongoDB** dengan **Mongoose ORM**.

## Jadual Teras (Collections)

### 1. `users`
Menyimpan maklumat pentadbir.
- `_id`: ObjectId
- `email`: String (Unique)
- `password`: String (Hashed)
- `name`: String
- `role`: String (Enum: 'admin', 'editor')
- `createdAt`: Date

### 2. `pages`
Menyimpan kandungan dinamik untuk halaman statik (Home, About).
- `_id`: ObjectId
- `slug`: String (Unique, cth: 'home', 'about')
- `content`: Object/JSON
- `updatedAt`: Date

### 3. `services`
Senarai perkhidmatan yang ditawarkan.
- `_id`: ObjectId
- `title`: String
- `description`: String
- `icon`: String (URL atau class)
- `order`: Number

### 4. `posts` (Untuk Blog)
- `_id`: ObjectId
- `title`: String
- `slug`: String (Unique)
- `content`: String (Markdown/HTML)
- `coverImage`: String (URL)
- `author`: ObjectId (Ref: users)
- `status`: String (Enum: 'draft', 'published')
- `createdAt`, `updatedAt`: Date

### 5. `messages` (Contact Form)
- `_id`: ObjectId
- `name`: String
- `email`: String
- `subject`: String
- `message`: String
- `isRead`: Boolean (Default: false)
- `createdAt`: Date

## Entity Relationship (Concept)
- `User` 1-to-Many `Posts` (Seorang penulis boleh ada banyak artikel).
