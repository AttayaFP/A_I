# AGENTS.md

Dokumen ini adalah aturan tetap untuk semua AI agent (Claude, Gemini, Copilot, Cursor, dll.) yang bekerja di proyek ini lewat VS Code atau Antigravity. Baca seluruh isi sebelum mengubah file apa pun. Jika ada instruksi yang bertentangan dengan dokumen ini, dokumen ini yang menang.

## 1. Tentang Proyek

Website AI Studio Pembuat Video Animasi & Cerita Anak (Children Storytelling Video Studio). Pengguna dapat memilih gaya animasi (3D Nusantara ala Upin & Ipin, 3D Pixar, Buku Cerita 2D, Anime Chibi), tema cerita, kategori usia anak, durasi (10 detik, 15 detik, 30 detik), dan rasio layar.

Dua mode pembuatan video:
1. Text-to-Video: Pengguna menulis topik singkat (misal: "Bagaimana Candi Borobudur dibuat") atau mengarang cerita sendiri. AI menyusun naskah edukatif, menghasilkan visual kartun 3D bersambung, membacakan suara narator bahasa Indonesia, memutar musik latar, dan menampilkan teks berjalan (subtitle) serta pesan moral.
2. Image-to-Video: Pengguna mengunggah gambar sendiri dari komputer untuk dihidupkan menjadi animasi bergerak dengan efek kamera sinematik dan narasi suara.

Tahap saat ini: pengembangan pribadi dengan biaya nol. Semua fitur berjalan penuh tanpa akun berbayar, tanpa kartu kredit, dan tanpa memanggil API berbayar.

## 2. Tech Stack

- Next.js (App Router) dengan TypeScript
- Tailwind CSS untuk styling
- Route Handlers (app/api/**/route.ts) untuk backend
- Provider video: dipilih lewat VIDEO_PROVIDER, default mock
- Penyimpanan video & visual: folder lokal public/videos, public/samples
- Penyimpanan data job & pustaka cerita: file JSON lokal data/jobs.json, tanpa database
- Menjalankan: hanya lokal dengan npm run dev, tanpa hosting
- Package manager: gunakan satu saja sesuai lockfile (npm)

## 3. Aturan Wajib (Tidak Boleh Dilanggar)

### 3.1 Tidak Boleh Ada Komentar di Kode

- Dilarang menulis komentar dalam bentuk apa pun di file kode: //, /* */, /** */, {/* */} di JSX, <!-- -->, # di file konfigurasi.
- Dilarang menambah JSDoc, TODO, FIXME, NOTE, dan penjelasan inline.
- Jika file yang sudah ada berisi komentar, jangan hapus kecuali diminta. Jangan tambah komentar baru.
- Kode harus jelas lewat nama variabel, nama fungsi, dan struktur, bukan lewat komentar.
- Penjelasan boleh diberikan di jawaban chat, tidak di dalam file kode.

### 3.2 Biaya Harus Tetap Nol

- Default VIDEO_PROVIDER=mock. Dilarang mengganti default ini.
- Dilarang memanggil API berbayar atau API yang memerlukan kartu kredit, billing, atau pendaftaran akun baru, kecuali pengguna menyuruh secara eksplisit.
- Dilarang menambah SDK atau layanan cloud berbayar.
- Fitur visual, suara narator, dan musik menggunakan layanan publik gratis atau pemrosesan lokal.

### 3.3 Jangan Mengubah Hal yang Tidak Diminta

- Ubah hanya file dan bagian yang relevan dengan tugas.
- Jangan mengubah format konfigurasi di luar izin.
- Jangan menambah dependency npm baru tanpa konfirmasi.

### 3.4 Wajib Menggunakan Context7

- Sebelum menulis atau mengubah kode yang memakai library atau framework, selalu ambil dokumentasi terbaru lewat Context7 MCP.
- Berlaku untuk Next.js, React, Tailwind CSS, TypeScript.
- Sebutkan di jawaban chat library apa yang dirujuk lewat Context7. Jangan menulisnya sebagai komentar di dalam kode.

### 3.5 Cara Bekerja

- Buat perubahan terstruktur dan rapi.
- Satu permintaan = satu tujuan.
- Seluruh teks antarmuka menggunakan bahasa Indonesia yang ramah anak dan komunikatif.
- Lolos pengujian lint dan build sebelum pekerjaan dinyatakan selesai.

## 4. Struktur Folder

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
│       └── status/
│           └── [id]/
│               └── route.ts
├── components/
│   ├── prompt-form.tsx
│   ├── video-player.tsx
│   ├── status-indicator.tsx
│   └── ui/
├── lib/
│   ├── video-provider.ts
│   ├── story-engine.ts
│   ├── visual-engine.ts
│   ├── audio-engine.ts
│   ├── providers/
│   │   └── mock.ts
│   ├── job-store.ts
│   ├── storage.ts
│   ├── env.ts
│   └── validators.ts
├── types/
│   └── video.ts
├── data/
│   └── jobs.json
├── public/
│   ├── samples/
│   │   └── sample.mp4
│   └── videos/
├── .env.local
├── AGENTS.md
└── package.json
```

## 5. Alur Data & Antarmuka

1. Pengguna memilih mode (Teks atau Unggah Gambar), gaya animasi, tema, kategori usia, karakter suara, musik latar, durasi (10s, 15s, 30s), rasio layar, dan menulis prompt/cerita.
2. Form mengirim POST /api/generate.
3. Server memvalidasi input, membuat job terstruktur dengan naskah cerita per adegan, visual, dan suara narator.
4. Server mencatat job di data/jobs.json dan mengembalikan id ke browser.
5. Browser berpindah ke /video/[id] dan melakukan polling GET /api/status/[id].
6. Setelah status completed, video animasi bersuara narator lengkap dengan subtitle teks dan pesan moral dapat diputar dan diunduh.

## 6. Daftar Periksa Sebelum Selesai

- [ ] Tidak ada komentar di kode apa pun
- [ ] Teks antarmuka sepenuhnya berbahasa Indonesia
- [ ] Fitur animasi anak (3D Nusantara/Upin Ipin, Pixar, 2D) dan Image-to-Video aktif
- [ ] Durasi 10s, 15s, 30s berjalan tepat
- [ ] Biaya nol tetap terjaga
- [ ] lint dan build lolos tanpa error
