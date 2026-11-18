# ECOBOT: Pengembangan Website Edukasi Interaktif Berbasis Game 3D untuk Meningkatkan Pemahaman Pemilahan Sampah pada Anak guna Mewujudkan Generasi Peduli Lingkungan

[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20TypeScript%20%7C%20Babylon.js%20%7C%20Tailwind-emerald)](https://github.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📌 1. Informasi Tim & Pengembang

| Peran | Nama Anggota | Institusi / Asal | Kontak / Media Sosial |
| :--- | :--- | :--- | :--- |
| **Ketua Tim / Fullstack & WebGL Engineer** | *[Nama Ketua Tim]* | *[Nama Sekolah / Universitas]* | *[Email / LinkedIn]* |
| **Anggota / UI/UX & Game Designer** | *[Nama Anggota 1]* | *[Nama Sekolah / Universitas]* | *[Email / LinkedIn]* |
| **Anggota / Content & Environmental Research** | *[Nama Anggota 2]* | *[Nama Sekolah / Universitas]* | *[Email / LinkedIn]* |

> **Nama Tim:** *[Nama Tim Anda]*  
> **Kompetisi:** Technoversary Vol. III — Web Design Competition  

---

## 📖 2. Deskripsi Proyek

**ECOBOT** adalah platform web edukasi interaktif masa kini yang menggabungkan kecanggihan **teknologi WebGL/3D modern** dengan konsep **gamifikasi ramah anak (usia 8–13 tahun)**. Proyek ini hadir sebagai solusi kreatif terhadap krisis pengelolaan sampah di Indonesia, di mana pemahaman memilah sampah sejak sumber (Organik, Anorganik, dan B3) sering kali terasa membosankan atau teoritis bagi generasi muda.

Melalui **ECOBOT**, anak-anak diajak berpetualang bersama **Ecobot** (maskot robot pemilah ramah lingkungan) untuk menyelamatkan dan mengembalikan keindahan **Kota Harapan**. Setiap aksi memilah sampah di dunia 3D memberikan dampak visual langsung terhadap kebersihan kota, mengajarkan anak bahwa kontribusi nyata menjaga bumi itu menyenangkan, bermakna, dan mudah dilakukan dalam kehidupan sehari-hari.

---

## ✨ 3. Fitur Utama

### 🎮 A. Real 3D Interactive Game Engine (Babylon.js)
- **Misi 1: Taman Kota (Tutorial & Eksplorasi)**: Lingkungan taman 3D interaktif yang menyajikan tantangan memilah 8 sampah tersebar ke dalam 3 tong spesifik:
  - 🟢 **Tong Hijau (Organik)**: Sisa nasi, daun kering, kulit pisang.
  - 🟡 **Tong Kuning (Anorganik)**: Botol plastik, kaleng soda, kardus bekas.
  - 🔴 **Tong Merah (B3 - Berbahaya & Beracun)**: Baterai bekas, bohlam lampu bekas.
- **Karakter 3D Blocky & Kustomisasi**: Karakter pemain bergaya *low-poly blocky* yang dinamis, dilengkapi animasi prosedural (berjalan, idle bernapas, ayunan mengambil/membuang) dan adaptasi warna pakaian dari profil pemain.
- **Dynamic 3D Trash & Label Tong**: Tong sampah interaktif dengan label teks & ikon berbasis *DynamicTexture*, animasi buka tutup tutup tong, serta cincin partikel lembut penanda sampah.
- **Efek Visual Dunia Berubah (World Progress)**: Semakin banyak sampah yang dibersihkan, rumput taman berubah lebih hijau cerah, air mancur mulai mengalir jernih, dan bunga-bunga bermekaran.
- **Dynamic Import (Zero Lag)**: Seluruh modul engine 3D diunduh secara *on-demand (lazy load)* saat tombol bermain ditekan, menjaga landing page dan dashboard tetap super ringan diakses pada koneksi apapun.

### 🌟 B. Dashboard Gamifikasi & Pembelajaran
- **Kota Harapan Cleanliness Meter**: Indikator persentase kebersihan kota yang bertambah setiap pemain menyelesaikan misi pemilahan sampah.
- **Sistem Level, XP & Koin Poin**: Reward edukatif untuk memotivasi anak terus belajar.
- **Pustaka Edukasi Lingkungan**: Ensiklopedia interaktif seputar jenis-jenis sampah, masa urai (biodegradasi), bahaya limbah B3, dan tips 3R (*Reduce, Reuse, Recycle*).
- **Kuis Lingkungan Interaktif**: Tantangan soal harian berbobot edukasi untuk menguji pemahaman anak setelah bermain.
- **Toko Perlengkapan & Upgrade**: Fitur peningkatan tas (kapasitas 3 hingga 8 sampah), sepatu cepat, dan alat capit sampah menggunakan poin yang diperoleh dari bermain.

### ♿ C. Kontrol Responsif & Aksesibilitas
- **Dukungan Multi-Platform**:
  - **PC / Laptop**: Kontrol tombol Keyboard W, A, S, D atau tombol Panah + Spasi / E untuk aksi.
  - **Smartphone / Tablet**: *Virtual Analog Joystick* responsif + Tombol Aksi sentuh besar.
- **Mode Kidal (Left-Handed Mode)**: Posisi analog joystick dan tombol aksi dapat ditukar untuk kenyamanan pengguna kidal.
- **Reduce Motion & Pilihan Kualitas Grafis**: Opsi grafis adaptif (Rendah, Sedang, Tinggi) dan pengurangan gerak untuk kenyamanan mata anak.
- **Audio Sintetis Bebas Lisensi**: Sound effect ramah anak yang dibangun murni menggunakan Web Audio API internal (tanpa beban file eksternal).

---

## 🛠️ 4. Arsitektur & Teknologi

| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Framework Utama** | React 19 | Komponen modular dengan State Management modern |
| **Bahasa Pemrograman** | TypeScript 5+ | Type-safety penuh, meminimalisir bug saat runtime |
| **Build Tool & Bundler** | Vite 8 | Kompilasi ultra-cepat dan efisiensi Hot Module Replacement |
| **3D Engine** | `@babylonjs/core` | Pemuatan 3D modular berbasis WebGL, instanced rendering, zero-texture procedural |
| **Styling & Desain** | Tailwind CSS v4 | Antarmuka cerah, ramah anak, dan responsif |
| **Ikonografi & Animasi**| Lucide React & Motion | Visual pendukung modern dan interaktif |
| **Penyimpanan Data** | LocalStorage API | Penyimpanan progres lokal yang persisten tanpa butuh login server rumit |
| **Audio Engine** | Web Audio API | Sintesis nada frekuensi dinamis (koin, lempar, sukses, fanfare) |

---

## 💻 5. Petunjuk Instalasi & Menjalankan Proyek

Pastikan komputer/laptop telah terpasang **Node.js** (versi 18.0.0 atau yang lebih baru) dan **npm**.

### Langkah 1: Kloning atau Ekstrak Repository
```bash
# Menggunakan Git
git clone https://github.com/username/lingkungan.git
cd lingkungan
```
*Atau ekstrak file zip proyek ini lalu buka terminal di dalam folder tersebut.*

### Langkah 2: Instalasi Dependensi
Jalankan perintah berikut untuk mengunduh seluruh library yang dibutuhkan:
```bash
npm install
```

### Langkah 3: Menjalankan Mode Pengembangan (Local Dev Server)
```bash
npm run dev
```
Setelah server berjalan, buka peramban web (Google Chrome, Microsoft Edge, Mozilla Firefox, dll) di alamat:
```
http://localhost:5173
```

### Langkah 4: Membangun Versi Produksi (Production Build)
Untuk melakukan kompilasi akhir proyek menjadi aset statis yang optimal:
```bash
npm run build
```
Hasil build akan tersimpan di dalam direktori `dist/`.

### Langkah 5: Menguji Hasil Build (Preview)
```bash
npm run preview
```

---

## 📂 6. Struktur Direktori Utama

```text
├── public/                 # Favicon dan aset statis publik
├── src/
│   ├── assets/             # Logo dan ilustrasi vektor pendukung
│   ├── components/         # Komponen UI React
│   │   ├── auth/           # Onboarding & pemilihan avatar
│   │   ├── dashboard/      # Layout, Sidebar, Header, dan Kartu Statistik
│   │   ├── ecobot/         # Komponen maskot Ecobot interaktif
│   │   ├── game/           # GameStage, VirtualJoystick, HUD Overlay
│   │   └── ui/             # Komponen tombol, modal, badge, dan kartu
│   ├── data/               # Data misi, pustaka materi edukasi, kuis, tips
│   ├── game/               # Arsitektur 3D Babylon.js Engine
│   │   ├── engine/         # Lifecycle loop, createGame, event adapter
│   │   ├── entities/       # Player, Tong Sampah (Bins), Ecobot 3D
│   │   ├── scenes/         # Scene Misi 1 (Taman Kota), lighting, terrain
│   │   ├── systems/        # Spawner sampah, inventory tas, audio synthesizer
│   │   └── gameBridge.ts   # Bridge penghubung antara UI React dan Babylon.js
│   ├── pages/              # Halaman Beranda, Main Game, Pustaka, Kuis, Toko, Profil
│   ├── store/              # Zustand state (playerStore, inventaris, progres)
│   ├── App.tsx             # Routing aplikasi
│   └── main.tsx            # Entry point React DOM
├── package.json            # Daftar dependensi dan scripts
├── tsconfig.json           # Konfigurasi TypeScript
├── vite.config.ts          # Konfigurasi Vite bundler
└── README.md               # Dokumentasi utama proyek
```

---

## 🌟 7. Nilai Edukasi & Dampak Lingkungan

1. **Pemahaman Tiga Kategori Sampah**: Memberikan pemahaman aplikatif tentang perbedaan karakteristik sampah organik, anorganik, dan limbah B3.
2. **Koneksi Pembelajaran Kontekstual**: Setiap sampah yang dipungut disertai dengan popup fakta sains mikro (contoh: masa penguraian plastik, bahaya racun timbal pada baterai bekas).
3. **Pembiasaan Positif**: Menggunakan penguatan positif (*positive reinforcement*) lewat bintang, animasi selebrasi, dan pemulihan keasrian taman kota untuk memupuk kebiasaan membuang sampah pada tempatnya di dunia nyata.

---

<p align="center">
  Dibuat dengan cinta dan semangat pelestarian lingkungan hidup untuk <b>Technoversary Vol. III</b> 🌿
</p>
