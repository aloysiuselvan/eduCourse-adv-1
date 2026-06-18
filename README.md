# eduCourse-adv-1

EduCourse Backend API built with Node.js, Express, Prisma ORM, and MySQL. This API features authentication, email verification, query parameters for filtering/sorting/searching, and file uploads.

## Fitur Utama

- **Autentikasi & Otorisasi**: Registrasi, verifikasi email menggunakan token unik, login, dan proteksi endpoint menggunakan JSON Web Token (JWT) Bearer.
- **Manajemen Kelas**: CRUD lengkap untuk kelas dengan relasi kategori dan tutor.
- **Pencarian & Penyaringan**: Dukungan query parameters untuk filter kategori, search judul (LIKE), dan sorting harga.
- **Upload File**: Upload thumbnail/gambar menggunakan middleware Multer.

---

## Prasyarat

Sebelum memulai, pastikan kamu memiliki:
- Node.js versi terbaru
- MySQL / MariaDB Server

---

## Langkah Instalasi & Setup

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/aloysiuselvan/eduCourse-adv-1.git
   cd eduCourse-adv-1/backend
   ```

2. **Install Dependensi**:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variable**:
   Salin file `.env.example` menjadi `.env` di dalam folder `backend/`:
   ```bash
   cp .env.example .env
   ```
   Buka file `.env` dan sesuaikan nilainya:
   - `DATABASE_URL`: URL koneksi database MySQL/MariaDB kamu.
   - `JWT_SECRET`: Kunci rahasia untuk signature JWT.
   - `EMAIL_USER` & `EMAIL_PASS`: Email pengirim verifikasi (disarankan menggunakan Google App Password).

4. **Migrasi Database & Generate Client**:
   Jalankan perintah prisma untuk sinkronisasi database dan generate client:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Seed Data Dummy**:
   Masukkan 12 data course dummy awal ke database:
   ```bash
   node seed.js
   ```

---

## Cara Menjalankan Server

Untuk menjalankan server backend:
```bash
node index.js
```
Server akan berjalan di `http://localhost:5000`.

---

## Dokumentasi API & Endpoint

### 1. Autentikasi (`/auth`)

- **Register Pengguna Baru**:
  - **Method**: `POST`
  - **URL**: `/auth/register`
  - **Body (JSON)**:
    ```json
    {
      "fullname": "John Doe",
      "username": "johndoe",
      "email": "john@email.com",
      "password": "rahasia123"
    }
    ```
- **Verifikasi Email**:
  - **Method**: `GET`
  - **URL**: `/auth/verifikasi-email?token=<token_verifikasi>`
- **Login Pengguna**:
  - **Method**: `POST`
  - **URL**: `/auth/login`
  - **Body (JSON)**:
    ```json
    {
      "email": "john@email.com",
      "password": "rahasia123"
    }
    ```
  - **Response**: Mengembalikan token JWT untuk autentikasi endpoint lainnya.

---

### 2. Kelas & Kursus (`/course`) - *Butuh Bearer Token*

Semua endpoint berikut wajib menyertakan Header: `Authorization: Bearer <token_jwt>`.

- **Get All Kelas** (Mendukung filter, search, & sort):
  - **Method**: `GET`
  - **URL**: `/course`
  - **Query Params**:
    - `filter`: ID Kategori (misal: `?filter=2`)
    - `search`: Judul yang dicari (misal: `?search=React`)
    - `sortBy`: Field pengurutan (misal: `?sortBy=harga`)
    - `order`: Arah pengurutan (`asc` atau `desc`, misal: `?order=desc`)
- **Get Kelas by ID**:
  - **Method**: `GET`
  - **URL**: `/course/:id`
- **Create Kelas**:
  - **Method**: `POST`
  - **URL**: `/course`
  - **Body (JSON)**:
    ```json
    {
      "judul": "Belajar React Modern",
      "kategoriId": 2,
      "tutorId": 2,
      "harga": 350000,
      "deskripsi": "Deskripsi materi...",
      "thumbnail": "/src/assets/card_image/card-1.jpg"
    }
    ```
- **Update Kelas**:
  - **Method**: `PATCH`
  - **URL**: `/course/:id`
- **Delete Kelas**:
  - **Method**: `DELETE`
  - **URL**: `/course/:id`

---

### 3. Upload File (`/upload`) - *Butuh Bearer Token*

- **Upload Gambar**:
  - **Method**: `POST`
  - **URL**: `/upload`
  - **Body (Form-Data)**:
    - Key: `file` (Pilih file gambar format JPEG/PNG/WEBP, maksimal 5MB)
