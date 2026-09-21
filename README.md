# 🧠 LKPD Berpikir Komputasional — Kelas 8 SMPN 19 Kota Bekasi

Aplikasi web LKPD (Lembar Kerja Peserta Didik) interaktif berbentuk game sederhana
untuk mata pelajaran **Informatika Kelas 8** dengan materi **Berpikir Komputasional
(Computational Thinking)** — fokus pada analisis masalah dan dekomposisi.

## 🎯 Tujuan Pembelajaran

1. Menjelaskan 4 keterampilan utama berpikir komputasional.
2. Menganalisis masalah nyata dengan 4 pertanyaan kunci.
3. Melakukan dekomposisi masalah menjadi 5 langkah berurutan.
4. Mengenali pola universal dekomposisi.

## 🎮 Cara Bermain

1. Masukkan nama.
2. Pilih mode: Petualangan (berurutan) atau Bebas.
3. Selesaikan 5 level:
   - Level 1: Matching 4 keterampilan ↔ definisi
   - Level 2: Pilihan ganda analisis masalah
   - Level 3: Menyusun 5 langkah dekomposisi
   - Level 4: Menebak masalah dari langkah-langkahnya
   - Level 5: Mengisi pola dekomposisi dari word bank
4. Skor total maksimal 100.
5. Hasil dapat diunduh sebagai file `.txt` untuk dikumpulkan ke guru.

## 📁 Struktur File

- `index.html` — halaman utama (8 layar + 2 modal)
- `style.css` — styling mobile-first, tema pastel
- `script.js` — logika game, data soal, audio via Web Audio API

## 🔧 Cara Modifikasi

| Ingin ubah          | Lokasi                              |
|---------------------|-------------------------------------|
| Data soal           | `script.js` → `LEVEL1_DATA` ... `LEVEL5_DATA` |
| Warna tema          | `style.css` → `:root { --primary: ... }` |
| Nama localStorage   | `script.js` → `const STORAGE_KEY`   |
| Judul aplikasi      | `index.html` → `<title>` dan `<h1>` |

## 🌐 Cara Deploy Gratis (GitHub Pages)

Lihat langkah di bawah ini.

## 📚 Sumber Materi

"Materi_P1_Ganjil.txt — Berpikir Komputasional: Memecah Masalah Kompleks"
Informatika Kelas 8, SMPN 19 Kota Bekasi.

## 📝 Lisensi

Bebas digunakan untuk keperluan pembelajaran. Gratis, tanpa backend, tanpa iklan.