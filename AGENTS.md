# AGENTS.md

Dokumen ini adalah aturan tetap untuk semua AI agent (Claude, Copilot, Cursor, dll.) yang bekerja di proyek ini lewat VS Code. Baca seluruh isi sebelum mengubah file apa pun. Jika ada instruksi yang bertentangan dengan dokumen ini, dokumen ini yang menang.

## 1. Tentang Proyek

Website AI pembuat video. Pengguna menulis prompt (dan opsional mengunggah gambar), sistem mengirim permintaan ke penyedia AI video, menunggu hasilnya, lalu menampilkan video agar bisa diputar dan diunduh.

## 2. Tech Stack

- Next.js (App Router) dengan TypeScript
- Tailwind CSS untuk styling
- Route Handlers (`app/api/**/route.ts`) untuk backend
- Penyedia AI video: `[ISI_NAMA_PROVIDER]`
- Penyimpanan hasil video: `[ISI_STORAGE]`
- Database (jika ada): `[ISI_DATABASE]`
- Package manager: `[npm | pnpm | yarn]` (pakai satu saja, jangan campur)

## 3. Aturan Wajib (Tidak Boleh Dilanggar)

### 3.1 Tidak Boleh Ada Komentar di Kode

- Dilarang menulis komentar dalam bentuk apa pun di file kode: `//`, `/* */`, `/** */`, `{/* */}` di JSX, `<!-- -->`, `#` di file konfigurasi.
- Dilarang menambah JSDoc, `TODO`, `FIXME`, `NOTE`, dan penjelasan inline.
- Jika file yang sudah ada berisi komentar, jangan hapus kecuali diminta. Jangan tambah komentar baru.
- Kode harus jelas lewat nama variabel, nama fungsi, dan struktur, bukan lewat komentar.
- Penjelasan boleh diberikan di jawaban chat, tidak di dalam file kode.

### 3.2 Jangan Mengubah Hal yang Tidak Diminta

- Ubah hanya file dan bagian yang disebut dalam permintaan.
- Jangan refactor, rename, memindahkan file, atau merapikan kode di luar permintaan.
- Jangan mengubah format kode yang sudah ada (indentasi, tanda kutip, titik koma, urutan import) mengikuti konfigurasi Prettier/ESLint proyek.
- Jangan menghapus fitur, prop, fungsi, atau route yang sudah ada.
- Jangan mengubah `package.json`, lockfile, `next.config.*`, `tsconfig.json`, `tailwind.config.*`, `.env*`, dan file konfigurasi lain tanpa izin eksplisit.
- Jangan menambah atau meng-upgrade dependency tanpa izin eksplisit. Jika perlu paket baru, tanyakan dulu dan jelaskan alasannya.

### 3.3 Cara Bekerja

- Buat perubahan sekecil mungkin (minimal diff).
- Jika permintaan ambigu, tanyakan dulu sebelum menulis kode.
- Satu permintaan = satu tujuan. Jangan menambahkan fitur bonus.
- Setelah selesai, sebutkan file apa saja yang diubah dalam jawaban chat.
- Jangan pernah menulis API key, token, atau rahasia di dalam kode. Gunakan `process.env`.

## 4. Struktur Folder

Ikuti struktur ini. Jangan membuat folder baru di luar pola ini tanpa izin.

```
.
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── generate/
│   │   └── page.tsx
│   ├── video/
│   │   └── [id]/
│   │       └── page.tsx
│   └── api/
│       ├── generate/
│       │   └── route.ts
│       ├── status/
│       │   └── [id]/
│       │       └── route.ts
│       └── video/
│           └── [id]/
│               └── route.ts
├── components/
│   ├── prompt-form.tsx
│   ├── video-player.tsx
│   ├── status-indicator.tsx
│   └── ui/
├── lib/
│   ├── video-provider.ts
│   ├── storage.ts
│   ├── env.ts
│   └── validators.ts
├── types/
│   └── video.ts
├── public/
├── .env.local
├── AGENTS.md
└── package.json
```

Tanggung jawab tiap bagian:

- `app/**/page.tsx`: tampilan halaman. Tidak berisi logika pemanggilan provider.
- `app/api/**/route.ts`: pintu masuk backend. Hanya validasi input, panggil fungsi di `lib/`, kembalikan response.
- `components/`: komponen UI yang dapat dipakai ulang.
- `lib/video-provider.ts`: satu-satunya tempat yang boleh berkomunikasi dengan penyedia AI video.
- `lib/storage.ts`: satu-satunya tempat yang boleh membaca/menulis penyimpanan video.
- `lib/env.ts`: membaca dan memvalidasi environment variable.
- `lib/validators.ts`: skema validasi input.
- `types/`: tipe TypeScript bersama.

## 5. Alur Aplikasi

### 5.1 Alur Utama (dari sudut pandang pengguna)

1. Pengguna membuka halaman `/generate`.
2. Pengguna mengisi form prompt (opsional: gambar referensi, durasi, rasio layar) di `prompt-form.tsx`.
3. Pengguna menekan tombol Generate.
4. Form mengirim `POST /api/generate`.
5. Server memvalidasi input, lalu mengirim job ke penyedia AI video lewat `lib/video-provider.ts`.
6. Server mengembalikan `id` job ke browser.
7. Browser berpindah ke `/video/[id]`.
8. Halaman `/video/[id]` memanggil `GET /api/status/[id]` secara berkala (polling) dan menampilkan `status-indicator.tsx`.
9. Saat status `completed`, server menyimpan video ke storage lewat `lib/storage.ts`.
10. Halaman menampilkan `video-player.tsx` dengan tombol unduh.
11. Jika status `failed`, halaman menampilkan pesan error dan tombol coba lagi.

### 5.2 Alur Data Backend

```
Browser
  │  POST /api/generate  { prompt, image?, duration, ratio }
  ▼
app/api/generate/route.ts
  │  1. validasi input (lib/validators.ts)
  │  2. baca env (lib/env.ts)
  │  3. kirim job (lib/video-provider.ts)
  ▼
Penyedia AI Video
  │  mengembalikan job id
  ▼
Response { id, status: "queued" }

Browser (polling tiap beberapa detik)
  │  GET /api/status/[id]
  ▼
app/api/status/[id]/route.ts
  │  cek status ke provider (lib/video-provider.ts)
  │  jika selesai: simpan video (lib/storage.ts)
  ▼
Response { id, status, videoUrl? }
```

### 5.3 Status Job

Hanya gunakan nilai berikut, didefinisikan di `types/video.ts`:

- `queued`: job diterima, belum diproses
- `processing`: sedang dibuat
- `completed`: selesai, `videoUrl` tersedia
- `failed`: gagal, `error` berisi alasan

Jangan menambah status baru tanpa izin.

### 5.4 Format Response API

Sukses:

```json
{ "id": "string", "status": "queued | processing | completed", "videoUrl": "string | null" }
```

Gagal:

```json
{ "error": "pesan singkat" }
```

Gunakan kode HTTP yang tepat: `400` input salah, `404` tidak ditemukan, `500` kesalahan server.

## 6. Konvensi Kode

- Gunakan TypeScript. Dilarang memakai `any`.
- Komponen berupa function component dengan nama file `kebab-case.tsx` dan nama komponen `PascalCase`.
- Default-nya Server Component. Tambahkan `"use client"` hanya pada komponen yang memakai state, effect, atau event handler.
- Fetch data dan akses rahasia hanya di server (route handler atau Server Component).
- Gunakan alias import `@/` sesuai `tsconfig.json`.
- Styling hanya dengan class Tailwind. Jangan menambah file CSS baru atau inline style.
- Tangani error dengan `try/catch` di route handler dan kembalikan response error yang rapi.
- Satu file satu tanggung jawab. Jangan menaruh logika provider di komponen atau halaman.

## 7. Environment Variable

Semua variabel diletakkan di `.env.local` dan dibaca hanya lewat `lib/env.ts`.

```
VIDEO_PROVIDER_API_KEY=
VIDEO_PROVIDER_BASE_URL=
STORAGE_BUCKET=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=
```

- Jangan commit `.env.local`.
- Jangan menampilkan nilai variabel di log atau response.
- Variabel yang boleh dibaca browser harus berawalan `NEXT_PUBLIC_`, dan tidak boleh berisi rahasia.

## 8. Perintah Umum

```
npm run dev
npm run build
npm run lint
```

Jalankan `lint` dan `build` sebelum menyatakan pekerjaan selesai. Gunakan package manager yang sama dengan yang sudah dipakai proyek.

## 9. Daftar Periksa Sebelum Selesai

- [ ] Tidak ada komentar di kode yang saya tulis
- [ ] Hanya file yang diminta yang berubah
- [ ] Tidak ada dependency baru tanpa izin
- [ ] Tidak ada rahasia di dalam kode
- [ ] Tidak ada `any`
- [ ] Alur di bagian 5 tetap utuh
- [ ] `lint` dan `build` lolos
