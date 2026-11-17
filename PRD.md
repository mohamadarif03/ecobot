# PRD: Kota Bersih bersama Ecobot

**Produk:** Web edukasi lingkungan berbasis game 3D untuk anak-anak **Lomba:** EcoDigital For Environment: Web Design Competition (sub-tema: Edukasi Lingkungan) **Cakupan dokumen:** Dashboard (sidebar dan seluruh menunya) dan Game Zona Kota. Landing page tidak dibahas. **Status:** Draft v1.0

---

## 1. Ringkasan Produk

**Kota Bersih bersama Ecobot** adalah web edukasi lingkungan yang mengemas pembelajaran pengelolaan sampah ke dalam game 3D ringan bergaya blocky ala Roblox. Pemain menjelajahi kota, mengerjakan misi memilah sampah, lalu belajar lebih dalam lewat dashboard yang berisi pustaka edukasi, kuis, tantangan aksi nyata, dan sistem pencapaian. Maskot **Ecobot**, robot daur ulang berwarna biru langit, menjadi pemandu di seluruh pengalaman.

**Masalah yang diselesaikan:** materi edukasi lingkungan umumnya berbentuk teks dan terasa membosankan bagi anak. Anak tidak punya alasan untuk kembali belajar dan sulit menghubungkan teori pemilahan sampah dengan kebiasaan nyata.

**Solusi:** belajar lewat bermain (game 3D), diperkuat gamifikasi (XP, streak, badge, kuis) dan jembatan ke dunia nyata (tantangan 7 hari).

## 2. Tujuan dan Metrik Keberhasilan

### 2.1 Tujuan

1. Anak memahami jenis sampah (organik, anorganik, B3) dan cara memilahnya.
2. Anak terdorong kembali menggunakan web secara rutin (kebiasaan belajar).
3. Anak menerapkan satu kebiasaan ramah lingkungan di dunia nyata.
4. Mengesankan juri lomba lewat UI/UX yang rapi, tema kuat, dan fitur yang lengkap.

### 2.2 Metrik

| Metrik | Target |
| --- | --- |
| Pemain menyelesaikan tutorial (Misi 1) | ≥ 80% |
| Akurasi pemilahan rata-rata di game | ≥ 70% |
| Pengguna dengan streak ≥ 3 hari | ≥ 30% |
| Skor rata-rata kuis | ≥ 70% |
| Waktu muat dashboard | < 3 detik |
| Game berjalan stabil di laptop spesifikasi biasa | ≥ 30 FPS |

### 2.3 Bukan Tujuan (Non-Goals)

- Multiplayer real-time.
- Dunia 3D terbuka yang luas.
- Marketplace atau transaksi uang sungguhan.
- Chat antar pengguna.

## 3. Target Pengguna

**Primer:** anak usia 8-13 tahun (SD kelas 3 sampai SMP awal), bermain di HP atau laptop.

**Sekunder:** guru dan orang tua yang mendampingi, serta juri lomba yang menilai dari laptop.

### Persona

**Raka, 10 tahun, kelas 5 SD.** Suka Roblox dan game HP, cepat bosan membaca teks panjang, butuh visual dan hadiah. Kebutuhan: belajar tanpa terasa belajar, kontrol mudah, ada teman (Ecobot).

**Bu Sari, guru SD.** Ingin media pendamping pelajaran IPA/PLH. Kebutuhan: materi akurat, bisa dipantau hasilnya, aman untuk anak.

## 4. Alur Pengguna

```
Masuk dari Landing Page
   ↓
Onboarding (nama panggilan + pilih karakter)
   ↓
Dashboard (Beranda)
   ├── Main Game → Persiapan → Game World → Layar Hasil → kembali ke Dashboard
   ├── Misi
   ├── Pustaka Edukasi → Baca materi → Kuis materi
   ├── Kuis & Tantangan
   ├── Aksi Nyata
   ├── Pencapaian
   ├── Papan Peringkat
   ├── Toko
   └── Pengaturan / Bantuan / Tentang
```

**Siklus inti (core loop):** Bermain atau membaca → dapat XP dan poin → naik level, buka badge → klaim misi harian → jaga streak → kembali besok.

## 5. Arsitektur Informasi (Sidebar)

| # | Menu | Ikon | Prioritas |
| --- | --- | --- | --- |
| 1 | Beranda | Rumah | P0 |
| 2 | Main Game | Joystick | P0 |
| 3 | Misi | Target | P1 |
| 4 | Pustaka Edukasi | Buku | P0 |
| 5 | Kuis & Tantangan | Tanda tanya | P0 |
| 6 | Aksi Nyata | Daun | P1 |
| 7 | Pencapaian | Piala | P0 |
| 8 | Papan Peringkat | Podium | P2 |
| 9 | Toko | Tas belanja | P2 |
| 10 | Pengaturan | Gerigi | P0 |
| 11 | Bantuan / Cara Bermain | Tanda tanya bulat | P1 |
| 12 | Tentang Kami | Info | P2 |
| 13 | Keluar | Panah keluar | P0 |

**Prioritas:** P0 = wajib ada saat lomba, P1 = sebaiknya ada, P2 = bonus jika waktu tersisa.

### 5.1 Struktur Sidebar

- **Atas:** logo dan nama web (klik kembali ke Beranda).
- **Kartu profil mini:** avatar, nama panggilan, level, bar XP, total poin.
- **Menu utama:** menu 1-9. Tombol **Main Game** diberi warna kontras agar menonjol.
- **Bawah:** Pengaturan, Bantuan, Tentang Kami, Keluar.

### 5.2 Perilaku Sidebar

- Menu aktif diberi highlight.
- Bisa diciutkan menjadi ikon saja di layar menengah.
- Di HP berubah menjadi **bottom navigation** 5 ikon (Beranda, Game, Pustaka, Kuis, Pencapaian) plus menu "Lainnya".
- Badge notifikasi angka pada menu Misi dan Pencapaian.

## 6. Kebutuhan Fitur per Menu

### 6.1 Beranda (P0)

**Tujuan:** pusat ringkasan dan alasan memulai aktivitas hari ini.

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| BR-01 | Sapaan personal dari Ecobot ("Halo, Raka! Siap bersihkan kota?") | P0 |
| BR-02 | Kartu profil: avatar, level, XP, poin | P0 |
| BR-03 | Tombol besar "Lanjutkan Petualangan" (membawa ke misi terakhir) | P0 |
| BR-04 | **Streak harian** dengan ikon api dan jumlah hari | P0 |
| BR-05 | **Fakta Harian** dari Ecobot (rotasi satu fakta per hari) | P0 |
| BR-06 | Ringkasan misi harian (3 misi, progres masing-masing) | P1 |
| BR-07 | Meter Kebersihan Kota (persentase dari progres game) | P0 |
| BR-08 | Badge terbaru yang didapat | P1 |
| BR-09 | Kalender mini penanda hari aktif (streak) | P2 |

### 6.2 Main Game (P0)

Halaman persiapan sebelum masuk dunia 3D. Detail game ada di Bagian 7.

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| MG-01 | Tombol "Mulai Baru" (pengguna baru) atau "Lanjutkan" (ada progres) | P0 |
| MG-02 | Daftar misi dengan status: terkunci, tersedia, selesai, dan bintang yang didapat (0-3) | P0 |
| MG-03 | Kustomisasi karakter: skin, warna baju, aksesori dasar | P1 |
| MG-04 | Pilihan kualitas grafis: Rendah, Sedang, Tinggi (default otomatis sesuai perangkat) | P0 |
| MG-05 | Panduan kontrol singkat (WASD dan analog) dan saran memutar HP ke landscape | P0 |
| MG-06 | Loading screen dengan progress bar dan tips lingkungan dari Ecobot | P0 |
| MG-07 | Deteksi perangkat: tampilkan analog otomatis jika layar sentuh | P0 |

### 6.3 Misi (P1)

Pusat semua tugas (di dalam game dan di luar game).

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| MS-01 | Tab: **Harian**, **Mingguan**, **Utama** | P1 |
| MS-02 | Setiap misi menampilkan nama, deskripsi, progress bar, dan hadiah (XP/poin) | P1 |
| MS-03 | Tombol **Klaim** aktif setelah misi selesai | P1 |
| MS-04 | Misi harian direset setiap pukul 00.00 waktu lokal | P1 |
| MS-05 | Misi bisa dipicu dari aktivitas di luar game (baca materi, selesaikan kuis) | P1 |

**Contoh misi harian:** Baca 1 materi di Pustaka, Selesaikan 1 kuis harian, Pilah 10 sampah di game. **Contoh misi mingguan:** Raih 3 bintang di 1 misi game, Jaga streak 5 hari.

### 6.4 Pustaka Edukasi (P0)

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| PE-01 | Daftar topik berbentuk kartu bergambar: Jenis Sampah, Cara Memilah, Daur Ulang, Dampak Plastik, Kompos, Bahaya Sampah B3 | P0 |
| PE-02 | Halaman materi berbentuk kartu geser (slide pendek, 1 ide per kartu) dengan gambar besar | P0 |
| PE-03 | Selesai membaca materi: dapat XP dan tanda centang pada topik | P0 |
| PE-04 | Setiap materi diakhiri bagian **"Coba di Rumah"** | P1 |
| PE-05 | Tombol langsung ke kuis materi tersebut | P0 |
| PE-06 | Glosarium bergambar (B3, mikroplastik, kompos, daur ulang, dll.) dengan pencarian | P1 |
| PE-07 | Infografis dan video pendek (maks. 2 menit) | P2 |
| PE-08 | Daftar sumber referensi terpercaya | P1 |
| PE-09 | Filter: Semua, Belum dibaca, Sudah dibaca | P1 |

**Aturan konten:** kalimat pendek, bahasa ramah anak, setiap kartu maksimal 40 kata, fakta wajib bersumber.

### 6.5 Kuis & Tantangan (P0)

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| KQ-01 | **Kuis Harian:** 5 soal acak, bisa dikerjakan sekali per hari untuk hadiah penuh | P0 |
| KQ-02 | **Kuis per Topik:** 3-5 soal, mengikuti topik Pustaka | P0 |
| KQ-03 | Soal pilihan ganda 3-4 opsi, dengan gambar bila perlu | P0 |
| KQ-04 | Setiap jawaban menampilkan penjelasan singkat dari Ecobot, benar maupun salah | P0 |
| KQ-05 | Layar hasil: skor, bintang, XP, dan tombol ulangi atau lihat materi terkait | P0 |
| KQ-06 | Timer ringan opsional (tidak menghukum, hanya bonus kecepatan) | P2 |
| KQ-07 | Mode **Duel Skor Tinggi**: kalahkan skor terbaik sendiri | P2 |

### 6.5.1 Contoh Soal

- Kulit pisang dibuang ke tong warna apa? (Jawaban: hijau/organik)
- Baterai bekas termasuk jenis sampah apa? (Jawaban: B3)
- Berapa lama botol plastik terurai? (Jawaban: ratusan tahun)

### 6.6 Aksi Nyata (P1)

Jembatan dari belajar ke kebiasaan.

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| AN-01 | **Tantangan 7 Hari:** satu tugas kecil per hari (bawa tumbler, pilah sampah di rumah, matikan lampu, dst.) | P1 |
| AN-02 | Pengguna mencentang tugas tiap hari, dapat XP; badge setelah 7 hari selesai | P1 |
| AN-03 | Kolom opsional "Disetujui oleh orang tua/guru" (checkbox konfirmasi) | P2 |
| AN-04 | **Kalkulator Jejak Sampah** sederhana: pilih kebiasaan harian, keluar skor dan saran | P2 |
| AN-05 | Ide kreatif daur ulang: tutorial langkah-langkah (pot dari botol bekas, dll.) | P2 |

### 6.7 Pencapaian (P0)

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| PC-01 | Koleksi **badge** (terkunci tampil abu-abu dengan petunjuk cara mendapatkannya) | P0 |
| PC-02 | Koleksi **kartu fakta** (didapat dari game dan Pustaka, ada tingkat langka) | P1 |
| PC-03 | Ringkasan statistik: total sampah dipilah, akurasi, materi dibaca, kuis selesai | P0 |
| PC-04 | **Rapor Kepedulian:** grafik radar (Memilah, Pengetahuan, Aksi Nyata, Konsistensi) | P2 |
| PC-05 | **Sertifikat digital** setelah menyelesaikan seluruh misi utama; bisa diunduh sebagai gambar atau PDF | P2 |

### 6.8 Papan Peringkat (P2)

- Peringkat XP mingguan, hanya menampilkan **nama panggilan dan avatar** (tanpa data pribadi).
- Tab: Mingguan dan Sepanjang Masa.
- Pada versi tanpa backend, tampilkan peringkat dengan data contoh atau sembunyikan menu.

### 6.9 Toko (P2)

- Tukar **poin** dengan aksesori karakter dan Ecobot (topi, kacamata, warna, stiker).
- Poin hanya didapat dari aktivitas edukatif; tidak ada pembelian uang sungguhan.
- Pratinjau barang sebelum dibeli dan tombol "Pakai".

### 6.10 Pengaturan (P0)

- Suara: musik dan efek (slider terpisah), bisukan semua.
- Kualitas grafis: Rendah, Sedang, Tinggi.
- Bahasa: Indonesia (default), Inggris (opsional).
- Mode kontrol: otomatis, paksa analog, paksa keyboard.
- Ubah nama panggilan dan avatar.
- **Reset progres** (dengan konfirmasi dua langkah).

### 6.11 Bantuan, Tentang, Keluar

- **Bantuan (P1):** cara bermain bergambar, kontrol, FAQ.
- **Tentang Kami (P2):** tim, tujuan proyek, sumber data.
- **Keluar (P0):** kembali ke landing page; progres tetap tersimpan.

## 7. Spesifikasi Game: Zona Kota

### 7.1 Gambaran

Satu dunia kota 3D bergaya blocky low-poly. Pemain bebas berjalan, mengerjakan misi berurutan, dan melihat kota berubah menjadi bersih. Ecobot menjadi pemandu.

**Tujuan akhir:** Meter Kebersihan Kota mencapai 100%.

### 7.2 Kontrol

| Platform | Gerak | Aksi |
| --- | --- | --- |
| Laptop | W A S D atau tombol panah | Tombol E atau Spasi (ambil/buang), Esc (pause) |
| HP/Tablet | Analog virtual kiri bawah (kecepatan sesuai jarak geser) | Tombol aksi kanan bawah |

Kamera mengikuti dari belakang/atas karakter. Pada HP, game disarankan dalam mode landscape.

### 7.3 Mekanik Dasar

1. **Ambil:** dekati sampah, tombol aksi muncul, tekan untuk mengambil.
2. **Bawa:** kapasitas tas awal 3 sampah (bisa di-upgrade).
3. **Buang:** dekati tong, pilih tong yang benar (organik hijau, anorganik kuning, B3 merah).
4. **Umpan balik:** benar memberi poin dan efek bintang; salah memberi pengurangan kecil dan penjelasan Ecobot.
5. **Interaksi:** bicara dengan NPC dan objek, pilih jawaban dialog.

### 7.4 Daftar Misi Game

| # | Misi | Aktivitas | Syarat Selesai | Prioritas |
| --- | --- | --- | --- | --- |
| 1 | Taman Kota (tutorial) | Pilah 8 sampah mudah | 8 sampah masuk tong | P0 |
| 2 | Pasar | Pilah sampah membingungkan dan jawab pertanyaan pedagang | 12 sampah dan 3 pertanyaan | P0 |
| 3 | Sungai | Ambil sampah tepi sungai, dorong sampah besar ke gerobak | 10 sampah dan 2 objek besar | P1 |
| 4 | Tegur Pelaku | Kejar NPC pembuang sampah liar, ajak buang dengan benar | 3 NPC ditegur | P2 |
| 5 | Bangun Fasilitas | Pakai poin untuk memasang tong dan bank sampah | 3 fasilitas terpasang | P1 |
| 6 | Ban Berjalan (final) | Pilah sampah cepat di ban berjalan dengan combo | 30 sampah dalam 90 detik | P0 |

Misi dibuka berurutan. Misi 6 terbuka setelah Misi 1 dan 2 selesai (dan Misi 3 serta 5 bila tersedia).

### 7.5 Contoh Daftar Sampah dan Jawaban

| Sampah | Tong | Alasan (ditampilkan Ecobot) |
| --- | --- | --- |
| Kulit pisang | Organik | Mudah terurai dan bisa jadi kompos |
| Sisa nasi | Organik | Sisa makanan terurai alami |
| Daun kering | Organik | Bahan kompos |
| Botol plastik | Anorganik | Bisa didaur ulang |
| Kaleng minuman | Anorganik | Logam bisa dilebur kembali |
| Kardus | Anorganik | Kertas bisa didaur ulang |
| Kertas berminyak | Organik/Residu\* | Minyak menyulitkan daur ulang kertas |
| Baterai bekas | B3 | Mengandung zat berbahaya |
| Lampu bekas | B3 | Mengandung bahan berbahaya |
| Kemasan sachet | Anorganik | Plastik lapis, sulit didaur ulang |

*Untuk anak, sederhanakan menjadi satu jawaban tetap sesuai materi Pustaka agar konsisten. Validasi isi dengan sumber resmi (misalnya KLHK).*

### 7.6 Aturan Poin dan Bintang

- Benar: **+10 poin** dan **+5 XP**.
- Salah: **-2 poin** (tidak pernah di bawah 0), tanpa pengurangan XP.
- Combo (ban berjalan): benar berturut-turut menambah pengali x2 (5 benar) dan x3 (10 benar).
- **Bintang:** 1 bintang = misi selesai; 2 bintang = akurasi ≥ 75%; 3 bintang = akurasi ≥ 90%.

### 7.7 Upgrade (via poin)

| Upgrade | Efek | Biaya awal |
| --- | --- | --- |
| Tas Besar | Kapasitas 3 → 5 → 8 | 100 / 250 poin |
| Sepatu Cepat | Kecepatan jalan +15% per level | 80 / 200 poin |
| Penjepit Panjang | Jarak ambil lebih jauh | 150 poin |

### 7.8 HUD

- **Kiri atas:** level, bar XP, poin.
- **Tengah atas:** misi aktif dan progresnya.
- **Kanan atas:** Meter Kebersihan Kota dan tombol pause.
- **Kiri bawah:** analog (HP) atau panduan WASD (laptop).
- **Kanan bawah:** tombol aksi.
- **Pojok:** ikon Ecobot untuk petunjuk.

### 7.9 Peran Ecobot

- Memberi tutorial dan petunjuk kontekstual.
- Bereaksi: senang (benar), menyemangati (salah), kaget (combo).
- Menyampaikan fakta singkat setiap misi selesai.
- Opsional: mengikuti pemain sebagai teman kecil.

### 7.10 Perubahan Dunia

Setiap misi selesai: langit makin cerah, jumlah sampah di jalan berkurang, warga NPC bermunculan, asap berkurang, tanaman hijau tumbuh.

### 7.11 Menu Pause

Lanjutkan, Lihat Misi, Pengaturan Suara dan Grafis, Keluar ke Dashboard (progres tersimpan otomatis).

### 7.12 Layar Hasil

Skor, akurasi, waktu, bintang, XP dan poin didapat, badge baru, satu fakta atau aksi nyata, tombol: Misi Berikutnya, Main Ulang, Kembali ke Dashboard.

## 8. Sistem Gamifikasi

### 8.1 XP dan Level

| Sumber XP | Jumlah |
| --- | --- |
| Sampah dipilah benar (game) | +5 |
| Misi game selesai | +50 (bonus +25 per bintang tambahan) |
| Baca 1 materi | +20 |
| Kuis materi selesai | +30 (bonus +10 jika skor 100%) |
| Kuis harian | +40 |
| Tugas harian Aksi Nyata | +15 |
| Klaim misi harian | +20 s.d. +30 |
| Tantangan 7 hari tuntas | +150 |

| Level | XP kumulatif | Gelar |
| --- | --- | --- |
| 1 | 0 | Relawan Baru |
| 2 | 100 | Pemilah Cilik |
| 3 | 250 | Penjaga Taman |
| 4 | 450 | Pahlawan Kota |
| 5 | 700 | Duta Lingkungan |
| 6 | 1.000 | Pelindung Bumi |

### 8.2 Streak Harian

- Streak bertambah saat pengguna menyelesaikan minimal satu aktivitas (baca, kuis, atau game) dalam sehari.
- Streak putus jika satu hari terlewat. Opsional: **Pelindung Streak** (1 kali gratis per minggu) agar tidak mengecewakan anak.
- Bonus: streak 3 hari (+30 XP), 7 hari (+100 XP dan badge), 14 hari (badge langka).

### 8.3 Badge

| Badge | Syarat |
| --- | --- |
| Pemilah Cilik | Selesaikan Misi 1 |
| Si Teliti | Akurasi ≥ 90% di satu misi |
| Penjaga Sungai | Selesaikan Misi 3 |
| Raja Combo | Combo x3 di ban berjalan |
| Pembaca Rajin | Baca 5 materi |
| Si Pintar | Skor 100% pada 3 kuis |
| Api Semangat | Streak 7 hari |
| Pahlawan Nyata | Selesaikan Tantangan 7 Hari |
| Kota Bersih! | Meter Kebersihan 100% |

### 8.4 Poin (Mata Uang)

- Didapat dari game, kuis, dan misi harian.
- Dipakai untuk upgrade game dan membeli kustomisasi di Toko.
- **XP tidak bisa dibelanjakan** (hanya penanda progres).

### 8.5 Prinsip Desain

- Belajar dulu, hadiah kemudian: hadiah terbesar untuk pemahaman, bukan sekadar klik.
- Salah itu aman: penjelasan ramah, tanpa hukuman berat.
- Tidak ada elemen yang menekan secara emosional (tidak ada "kamu kalah").
- Tidak ada iklan dan pembelian uang sungguhan.

## 9. Persyaratan UI/UX

- **Gaya visual:** ceria, ramah anak, dominan **biru langit** (#5BC0EB) dengan aksen putih, hijau segar, dan kuning hangat.
- **Komponen:** sudut membulat, tombol besar, ikon tebal, ilustrasi Ecobot di setiap halaman utama.
- **Tipografi:** huruf sans-serif bulat dan mudah dibaca (contoh: Nunito, Fredoka); ukuran isi minimal 16 px.
- **Animasi:** transisi halus, efek bintang dan konfeti saat berhasil; hormati pengaturan *reduce motion*.
- **Responsif:** desktop, tablet, HP; target sentuh minimal 44 px.
- **Aksesibilitas:** kontras warna memadai, teks alternatif gambar, navigasi keyboard, jangan hanya mengandalkan warna (tong memakai label dan ikon, bukan warna saja).
- **Maskot Ecobot:** robot daur ulang biru langit dengan tunas daun, mata bulat besar, pipi pink. Pose: melambai, jempol, sedih, kaget, melompat, menunjuk.

## 10. Kebutuhan Non-Fungsional

| Aspek | Kebutuhan |
| --- | --- |
| Performa | Game ≥ 30 FPS di laptop standar; dashboard memuat < 3 detik; aset 3D dimuat hanya saat Main Game |
| Ukuran aset | Total aset game ideal < 20 MB; gunakan model low-poly, warna flat, instancing |
| Kompatibilitas | Chrome, Edge, Firefox, Safari versi terbaru; Android dan iOS modern |
| Penyimpanan | Progres tersimpan otomatis (LocalStorage pada versi tanpa backend; database jika ada backend) |
| Keamanan dan privasi anak | Tidak mengumpulkan data pribadi; hanya nama panggilan; tanpa chat bebas; tanpa iklan |
| Offline | Dashboard dan Pustaka disarankan berfungsi sebagai PWA sederhana (opsional) |
| Fallback | Jika WebGL tidak didukung atau perangkat lemah: tampilkan pesan dan akses ke Pustaka dan Kuis tanpa game |

## 11. Arsitektur Teknis (Usulan)

- **Frontend:** HTML, CSS, JavaScript (atau React/Vue/Svelte) untuk dashboard.
- **Game 3D:** **Babylon.js** (kolisi, kamera, GUI dan joystick virtual bawaan) atau **Three.js** (lebih ringan, kontrol penuh, joystick memakai nipple.js).
- **Penyimpanan:** LocalStorage/IndexedDB untuk versi lomba; opsi Firebase atau Supabase bila butuh papan peringkat.
- **Hosting:** Vercel, Netlify, atau GitHub Pages.
- **Aset:** model blocky dari Blender (format glTF/GLB, dikompres), suara berformat MP3/OGG ringan.

### 11.1 Model Data Utama (ringkas)

| Entitas | Atribut utama |
| --- | --- |
| Player | id, nickname, avatar, level, xp, points, streak, lastActiveDate |
| MissionProgress | missionId, status, stars, accuracy, bestScore |
| ContentProgress | topicId, isRead, quizScore |
| DailyMission | date, missionId, progress, claimed |
| Badge | badgeId, unlockedAt |
| ChallengeProgress | day (1-7), checked, checkedAt |
| Inventory | itemId, owned, equipped |
| Settings | musicVolume, sfxVolume, graphicsQuality, language, controlMode |

## 12. Rencana Rilis dan Prioritas

**Fase 1 (Wajib, MVP lomba):** Onboarding, sidebar, Beranda (streak, fakta harian, meter kota), Main Game dengan Misi 1, 2, dan 6, Pustaka Edukasi dengan kuis topik, Kuis Harian, Pencapaian (badge dan statistik), Pengaturan, kontrol WASD dan analog, penyimpanan progres.

**Fase 2 (Sebaiknya ada):** Misi harian dan mingguan, Aksi Nyata (Tantangan 7 Hari), Misi game 3 dan 5, upgrade, kustomisasi karakter, glosarium, Bantuan.

**Fase 3 (Bonus):** Misi game 4, Toko, Papan Peringkat, kartu fakta koleksi, Rapor radar, sertifikat, kalkulator jejak sampah, mode duel.

**Urutan pengerjaan yang disarankan:**

1. Desain UI dan komponen dashboard.
2. Dashboard dan sistem XP/level/streak (data dan penyimpanan).
3. Pustaka dan kuis.
4. Prototype game: karakter, kota kecil, kontrol, mekanik ambil-buang.
5. Misi 1, 2, dan 6.
6. Pencapaian dan integrasi game ke sistem XP.
7. Polish: suara, animasi, uji perangkat.
8. Fitur Fase 2 dan 3 sesuai sisa waktu.

## 13. Kriteria Penerimaan (MVP)

- Pengguna dapat membuat profil (nama panggilan dan karakter) dan progres tersimpan setelah halaman ditutup.
- Sidebar menampilkan semua menu P0 dan berfungsi pada desktop, serta berubah menjadi bottom navigation di HP.
- Pengguna dapat memainkan Misi 1, 2, dan 6 dari awal sampai selesai di laptop (WASD) dan HP (analog).
- Memilah sampah dengan benar menambah poin dan XP; salah menampilkan penjelasan Ecobot.
- Misi selesai memberi bintang, memperbarui Meter Kebersihan, dan membuka badge.
- Membaca materi dan menyelesaikan kuis memberi XP dan tercatat di Pencapaian.
- Streak bertambah saat ada aktivitas harian dan tampil di Beranda.
- Pengaturan suara dan kualitas grafis berfungsi.
- Dashboard memuat dalam < 3 detik; game dimuat hanya saat Main Game ditekan.

## 14. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Game 3D terlalu berat dikerjakan | Tinggi | Kota kecil, low-poly, 3 misi inti dulu, gunakan Babylon.js |
| Performa buruk di perangkat lemah | Sedang | Opsi kualitas grafis, instancing, fallback tanpa game |
| Scope terlalu besar | Tinggi | Patuhi prioritas P0/P1/P2; Fase 1 harus utuh dulu |
| Kontrol sentuh tidak nyaman | Sedang | Uji di beberapa HP; atur ukuran dan posisi analog |
| Konten edukasi tidak akurat | Sedang | Gunakan sumber resmi dan cantumkan referensi |
| Aset (model, suara) bermasalah lisensi | Sedang | Buat sendiri atau gunakan aset berlisensi bebas |
| Waktu pengerjaan mepet | Tinggi | Selesaikan MVP lebih awal, sisakan waktu uji dan polish |

## 15. Pertanyaan Terbuka

1. Apakah akan ada akun dan login, atau cukup nama panggilan dengan data di perangkat?
2. Apakah Papan Peringkat dan Sertifikat memerlukan backend?
3. Berapa lama sisa waktu sampai deadline lomba?
4. Siapa saja anggota tim dan pembagian perannya (desain, kode, konten, aset 3D)?
5. Memakai Babylon.js atau Three.js?
