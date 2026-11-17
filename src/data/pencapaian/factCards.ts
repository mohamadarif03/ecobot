import type { FactCardDefinition } from "./types.ts";
import type { PlayerState } from "../../types/player.ts";
import { calculateLevel } from "../levels.ts";

export const FACT_CARDS: FactCardDefinition[] = [
  // ==================== 12 KARTU UMUM ====================
  // Topik 1: jenis-sampah
  {
    id: "card-organik-cepat",
    judul: "Sampah Organik Cepat Terurai",
    fakta: "Sisa makanan dan dedaunan dapat terurai alami oleh mikroorganisme tanah dalam hitungan minggu menjadi nutrisi tanaman.",
    kategori: "Organik",
    kelangkaan: "umum",
    ikon: "Apple",
    sumberMateri: "Mengenal Jenis Sampah",
    pustakaSlug: "jenis-sampah",
    syaratTeks: "Selesaikan membaca materi 'Mengenal Jenis Sampah'",
    cek: (state: PlayerState) => Boolean(state.contentProgress?.["jenis-sampah"]?.completed),
  },
  {
    id: "card-kaca-abadi",
    judul: "Kaca Bertahan Sangat Lama",
    fakta: "Botol dan toples kaca membutuhkan waktu hingga jutaan tahun untuk hancur di alam jika tidak didaur ulang.",
    kategori: "Anorganik",
    kelangkaan: "umum",
    ikon: "Wine",
    sumberMateri: "Mengenal Jenis Sampah",
    pustakaSlug: "jenis-sampah",
    syaratTeks: "Selesaikan membaca materi 'Mengenal Jenis Sampah'",
    cek: (state: PlayerState) => Boolean(state.contentProgress?.["jenis-sampah"]?.completed),
  },

  // Topik 2: cara-memilah
  {
    id: "card-bilas-wadah",
    judul: "Bilas Bersih Sebelum Dibuang",
    fakta: "Membilas sisa susu atau minyak pada botol plastik mencegah bau busuk dan mempermudah pabrik mendaur ulangnya.",
    kategori: "Pemilahan",
    kelangkaan: "umum",
    ikon: "Droplets",
    sumberMateri: "Cara Memilah Sampah",
    pustakaSlug: "cara-memilah",
    syaratTeks: "Selesaikan membaca materi 'Cara Memilah Sampah'",
    cek: (state: PlayerState) => Boolean(state.contentProgress?.["cara-memilah"]?.completed),
  },
  {
    id: "card-warna-tong",
    judul: "Warna Standar Tong Sampah",
    fakta: "Tong hijau untuk sampah organik, tong kuning untuk anorganik, dan tong merah khusus limbah B3 berbahaya.",
    kategori: "Pemilahan",
    kelangkaan: "umum",
    ikon: "Trash2",
    sumberMateri: "Cara Memilah Sampah",
    pustakaSlug: "cara-memilah",
    syaratTeks: "Selesaikan membaca materi 'Cara Memilah Sampah'",
    cek: (state: PlayerState) => Boolean(state.contentProgress?.["cara-memilah"]?.completed),
  },

  // Topik 3: daur-ulang
  {
    id: "card-daur-ulang-kertas",
    judul: "Serat Kertas Didaur Ulang Berkali-kali",
    fakta: "Kertas bekas dapat diolah kembali menjadi kertas baru hingga 5-7 kali sebelum serat kayunya menjadi terlalu pendek.",
    kategori: "Daur Ulang",
    kelangkaan: "umum",
    ikon: "FileText",
    sumberMateri: "Daur Ulang Kreatif",
    pustakaSlug: "daur-ulang",
    syaratTeks: "Selesaikan membaca materi 'Daur Ulang Kreatif'",
    cek: (state: PlayerState) => Boolean(state.contentProgress?.["daur-ulang"]?.completed),
  },
  {
    id: "card-baju-plastik",
    judul: "Botol Plastik Jadi Pakaian",
    fakta: "Botol plastik PET yang dicacah dan dilelehkan dapat dipintal menjadi serat poliester untuk membuat baju olahraga dan tas.",
    kategori: "Daur Ulang",
    kelangkaan: "umum",
    ikon: "Shirt",
    sumberMateri: "Daur Ulang Kreatif",
    pustakaSlug: "daur-ulang",
    syaratTeks: "Selesaikan membaca materi 'Daur Ulang Kreatif'",
    cek: (state: PlayerState) => Boolean(state.contentProgress?.["daur-ulang"]?.completed),
  },

  // Topik 4: dampak-plastik
  {
    id: "card-mikroplastik",
    judul: "Bahaya Mikroplastik",
    fakta: "Plastik yang terjemur matahari tidak hilang, melainkan hancur menjadi serpihan mikroplastik kecil yang dapat termakan ikan.",
    kategori: "Bahaya Plastik",
    kelangkaan: "umum",
    ikon: "ShieldAlert",
    sumberMateri: "Dampak Sampah Plastik",
    pustakaSlug: "dampak-plastik",
    syaratTeks: "Selesaikan membaca materi 'Dampak Sampah Plastik'",
    cek: (state: PlayerState) => Boolean(state.contentProgress?.["dampak-plastik"]?.completed),
  },
  {
    id: "card-plastik-laut",
    judul: "Lindungi Penyu dari Plastik",
    fakta: "Kantong plastik transparan yang hanyut di laut sering disangka ubur-ubur oleh penyu laut sehingga tertelan dan melukai mereka.",
    kategori: "Bahaya Plastik",
    kelangkaan: "umum",
    ikon: "Fish",
    sumberMateri: "Dampak Sampah Plastik",
    pustakaSlug: "dampak-plastik",
    syaratTeks: "Selesaikan membaca materi 'Dampak Sampah Plastik'",
    cek: (state: PlayerState) => Boolean(state.contentProgress?.["dampak-plastik"]?.completed),
  },

  // Topik 5: kompos
  {
    id: "card-cacing-tanah",
    judul: "Cacing Sahabat Kompos",
    fakta: "Cacing tanah membantu menggemburkan sisa daun dan mempercepat pembentukan pupuk kascing yang kaya nutrisi bagi tanah.",
    kategori: "Kompos",
    kelangkaan: "umum",
    ikon: "Sprout",
    sumberMateri: "Membuat Kompos Alami",
    pustakaSlug: "kompos",
    syaratTeks: "Selesaikan membaca materi 'Membuat Kompos Alami'",
    cek: (state: PlayerState) => Boolean(state.contentProgress?.["kompos"]?.completed),
  },
  {
    id: "card-kompos-metana",
    judul: "Cegah Gas Metana dengan Kompos",
    fakta: "Mengolah sampah sayur menjadi kompos di rumah mencegah timbunan gas metana yang dapat memicu kebakaran di tempat pembuangan.",
    kategori: "Kompos",
    kelangkaan: "umum",
    ikon: "Flame",
    sumberMateri: "Membuat Kompos Alami",
    pustakaSlug: "kompos",
    syaratTeks: "Selesaikan membaca materi 'Membuat Kompos Alami'",
    cek: (state: PlayerState) => Boolean(state.contentProgress?.["kompos"]?.completed),
  },

  // Topik 6: sampah-b3
  {
    id: "card-baterai-b3",
    judul: "Baterai Mengandung Logam Beracun",
    fakta: "Baterai bekas mengandung timbal dan merkuri yang dapat merembes mencemari air tanah bila dibuang ke tempat sampah biasa.",
    kategori: "Limbah B3",
    kelangkaan: "umum",
    ikon: "BatteryCharging",
    sumberMateri: "Mengenal Limbah B3",
    pustakaSlug: "sampah-b3",
    syaratTeks: "Selesaikan membaca materi 'Mengenal Limbah B3'",
    cek: (state: PlayerState) => Boolean(state.contentProgress?.["sampah-b3"]?.completed),
  },
  {
    id: "card-simbol-b3",
    judul: "Kenali Simbol Tengkorak dan Api",
    fakta: "Simbol tengkorak menandakan bahan beracun dan simbol api menandakan mudah terbakar; mintalah orang dewasa menanganinya.",
    kategori: "Limbah B3",
    kelangkaan: "umum",
    ikon: "AlertTriangle",
    sumberMateri: "Mengenal Limbah B3",
    pustakaSlug: "sampah-b3",
    syaratTeks: "Selesaikan membaca materi 'Mengenal Limbah B3'",
    cek: (state: PlayerState) => Boolean(state.contentProgress?.["sampah-b3"]?.completed),
  },

  // ==================== 4 KARTU LANGKA ====================
  {
    id: "card-kuis-sempurna",
    judul: "Master Pengetahuan Hijau",
    fakta: "Anak yang memahami cara memilah sampah dapat menularkan kebiasaan baik kepada seluruh teman di sekolahnya.",
    kategori: "Kuis",
    kelangkaan: "langka",
    ikon: "Brain",
    sumberMateri: "Pusat Kuis & Tantangan",
    syaratTeks: "Raih skor 100% pada minimal 1 kuis",
    cek: (state: PlayerState) => (state.quizProgress?.stats?.perfectCount || 0) >= 1,
  },
  {
    id: "card-misi-taman",
    judul: "Penyelamat Taman Kota",
    fakta: "Taman kota yang bersih dari sampah plastik dapat menyerap polusi udara kendaraan hingga tiga kali lebih efektif.",
    kategori: "Petualangan",
    kelangkaan: "langka",
    ikon: "TreePine",
    sumberMateri: "Game Kota Harapan",
    syaratTeks: "Selesaikan Misi 1 di Zona Taman Kota",
    cek: (state: PlayerState) => {
      const m1 = state.missionProgress.find((m) => m.missionId === 1);
      return Boolean(m1 && m1.status === "completed");
    },
  },
  {
    id: "card-misi-pasar",
    judul: "Penjaga Pasar Bersih",
    fakta: "Pasar tradisional yang memisahkan sampah organik sayuran setiap sore menghasilkan berton-ton pupuk alami berkualitas.",
    kategori: "Petualangan",
    kelangkaan: "langka",
    ikon: "Store",
    sumberMateri: "Game Kota Harapan",
    syaratTeks: "Selesaikan Misi 2 atau raih akurasi ≥ 80% di game",
    cek: (state: PlayerState) => {
      const m2 = state.missionProgress.find((m) => m.missionId === 2);
      const hasAcc80 = state.missionProgress.some((m) => (m.accuracy || 0) >= 80);
      return Boolean((m2 && m2.status === "completed") || hasAcc80);
    },
  },
  {
    id: "card-tantangan-7",
    judul: "Pahlawan Kebiasaan Rumah",
    fakta: "Membawa botol minum sendiri dan mematikan saklar listrik di rumah menghemat banyak energi bumi setiap minggunya.",
    kategori: "Aksi Nyata",
    kelangkaan: "langka",
    ikon: "Home",
    sumberMateri: "Aksi Nyata 7 Hari",
    syaratTeks: "Selesaikan Tantangan 7 Hari Aksi Nyata",
    cek: (state: PlayerState) => {
      const daysCount = Object.keys(state.aksiNyata?.challenge?.current?.days || {}).length;
      return daysCount >= 7 || (state.aksiNyata?.challenge?.rounds || 0) > 0;
    },
  },

  // ==================== 2 KARTU EPIK ====================
  {
    id: "card-kolektor-badge",
    judul: "Kolektor Prestasi Bumi",
    fakta: "Pahlawan bumi sejati menggabungkan aksi nyata di dunia fisik dengan wawasan edukasi yang luas dan mendalam.",
    kategori: "Koleksi",
    kelangkaan: "epik",
    ikon: "Trophy",
    sumberMateri: "Etalase Pencapaian",
    syaratTeks: "Miliki minimal 5 badge pencapaian",
    cek: (state: PlayerState) => {
      // Check count of unlocked badges in achievements or legacy badges array
      const unlockedCount = state.achievements?.badges
        ? Object.keys(state.achievements.badges).length
        : state.badges.length;
      return unlockedCount >= 5;
    },
  },
  {
    id: "card-duta-bumi",
    judul: "Duta Pelindung Harapan",
    fakta: "Anak-anak adalah generasi penerus yang membawa harapan terbesar agar bumi tetap hijau, asri, dan layak dihuni.",
    kategori: "Spesial",
    kelangkaan: "epik",
    ikon: "Crown",
    sumberMateri: "Pencapaian Level",
    syaratTeks: "Capai Level 5 (Duta Lingkungan)",
    cek: (state: PlayerState) => calculateLevel(state.xp).level >= 5,
  },
];
