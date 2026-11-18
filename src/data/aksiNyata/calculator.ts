import type { CalculatorQuestion, HabitLevelInfo } from "./types";

export const CALCULATOR_LEVELS: HabitLevelInfo[] = [
  {
    name: "Pemula Peduli",
    minScore: 0,
    maxScore: 5,
    badge: "🌱",
    color: "text-amber-600 bg-amber-50 border-amber-200",
    description: "Langkah awal yang luar biasa! Kamu sudah mulai memperhatikan lingkungan sekitarmu.",
    ecobotMessage: "Setiap pahlawan besar bermula dari satu langkah kecil. Yuk coba tantangan 7 hari!",
  },
  {
    name: "Penjaga Bumi",
    minScore: 6,
    maxScore: 11,
    badge: "🌿",
    color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    description: "Keren sekali! Kamu sudah punya banyak kebiasaan hijau yang sangat bermanfaat bagi kota.",
    ecobotMessage: "Kamu sudah menjadi sahabat bumi yang hebat! Tingkatkan sedikit lagi untuk jadi Pahlawan Bumi.",
  },
  {
    name: "Pahlawan Bumi",
    minScore: 12,
    maxScore: 16,
    badge: "🌟",
    color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    description: "Luar biasa! Gaya hidupmu sangat ramah lingkungan dan menjadi teladan bagi teman-temanmu.",
    ecobotMessage: "Wah, kamu pahlawan sejati! Pertahankan kebiasaan ini dan ajak lebih banyak orang di sekitarmu.",
  },
];

export function getHabitLevel(score: number): HabitLevelInfo {
  if (score >= 12) return CALCULATOR_LEVELS[2];
  if (score >= 6) return CALCULATOR_LEVELS[1];
  return CALCULATOR_LEVELS[0];
}

export const CALCULATOR_QUESTIONS: CalculatorQuestion[] = [
  {
    id: 1,
    question: "Seberapa sering kamu membawa botol minum sendiri saat bepergian?",
    options: [
      { text: "Jarang, sering beli minuman kemasan", points: 0 },
      { text: "Kadang-kadang, kalau ingat", points: 1 },
      { text: "Selalu bawa tumbler sendiri", points: 2 },
    ],
    strengthFeedback: "Hebat! Kamu rutin membawa tumbler sendiri dan menghemat puluhan botol plastik.",
    suggestionFeedback: "Cobalah menyiapkan botol minum di dekat tas sekolahmu setiap malam.",
    pustakaSlug: "dampak-plastik",
    pustakaTitle: "Dampak Sampah Plastik",
  },
  {
    id: 2,
    question: "Seberapa sering kamu memakai kantong plastik sekali pakai saat berbelanja?",
    options: [
      { text: "Selalu minta kantong plastik baru", points: 0 },
      { text: "Kadang-kadang pakai kantong kain", points: 1 },
      { text: "Jarang atau selalu bawa tas belanja sendiri", points: 2 },
    ],
    strengthFeedback: "Mantap! Membawa tas belanja sendiri sangat membantu mengurangi gunungan sampah plastik.",
    suggestionFeedback: "Ingatkan orang tua untuk selalu menyimpan satu tas lipat kain di dalam kendaraan.",
    pustakaSlug: "dampak-plastik",
    pustakaTitle: "Dampak Sampah Plastik",
  },
  {
    id: 3,
    question: "Seberapa sering kamu memilah sampah organik dan anorganik di rumah?",
    options: [
      { text: "Belum pernah, semuanya jadi satu", points: 0 },
      { text: "Kadang-kadang memisahkan botol", points: 1 },
      { text: "Selalu membuang sampah ke wadah yang sesuai", points: 2 },
    ],
    strengthFeedback: "Keren! Pemilahan sampah dari rumah membuat proses daur ulang menjadi jauh lebih cepat.",
    suggestionFeedback: "Mulai dari hal mudah: pisahkan sisa makanan dengan botol dan kertas bekas.",
    pustakaSlug: "cara-memilah",
    pustakaTitle: "Cara Memilah Sampah",
  },
  {
    id: 4,
    question: "Seberapa sering kamu menghabiskan makanan di piring tanpa sisa?",
    options: [
      { text: "Sering tidak habis dan bersisa banyak", points: 0 },
      { text: "Kadang bersisa sedikit", points: 1 },
      { text: "Selalu habis bersih sesuai porsi", points: 2 },
    ],
    strengthFeedback: "Bagus sekali! Menghabiskan makanan mencegah penumpukan sampah sisa makanan yang bau.",
    suggestionFeedback: "Ambil porsi makanan secukupnya dulu; kamu selalu boleh tambah jika masih lapar.",
    pustakaSlug: "kompos",
    pustakaTitle: "Membuat Kompos Alami",
  },
  {
    id: 5,
    question: "Seberapa sering kamu mematikan lampu atau kipas saat meninggalkan ruangan?",
    options: [
      { text: "Sering lupa dan tetap dibiarkan menyala", points: 0 },
      { text: "Kadang-kadang kalau teringat", points: 1 },
      { text: "Selalu mematikan saklar listrik", points: 2 },
    ],
    strengthFeedback: "Juara! Menekan saklar listrik saat ruangan kosong adalah cara termudah menghemat energi.",
    suggestionFeedback: "Tengok kembali ke dalam kamarmu sebelum keluar dan pastikan semua lampu mati.",
    pustakaSlug: "daur-ulang",
    pustakaTitle: "Daur Ulang Kreatif",
  },
  {
    id: 6,
    question: "Seberapa sering kamu menutup keran air saat sedang menyikat gigi?",
    options: [
      { text: "Keran dibiarkan menyala terus", points: 0 },
      { text: "Kadang dimatikan saat ingat", points: 1 },
      { text: "Selalu ditutup dan hanya dibuka saat berkumur", points: 2 },
    ],
    strengthFeedback: "Sangat peduli! Tindakan kecil menutup keran menghemat berliter-liter air bersih.",
    suggestionFeedback: "Gunakan cangkir kecil berisi air untuk berkumur agar keran tidak mengalir terus.",
    pustakaSlug: "jenis-sampah",
    pustakaTitle: "Mengenal Jenis Sampah",
  },
  {
    id: 7,
    question: "Seberapa sering kamu menggunakan kembali kardus, botol, atau kertas bekas?",
    options: [
      { text: "Langsung dibuang ke tempat sampah", points: 0 },
      { text: "Kadang disimpan untuk menggambar", points: 1 },
      { text: "Sering diubah jadi barang berguna", points: 2 },
    ],
    strengthFeedback: "Kreatif! Menggunakan kembali wadah bekas memberi kehidupan kedua bagi barang-barang rumah tangga.",
    suggestionFeedback: "Lihat tab Ide Kreatif untuk inspirasi menyulap botol bekas jadi pot tanaman atau celengan.",
    pustakaSlug: "daur-ulang",
    pustakaTitle: "Daur Ulang Kreatif",
  },
  {
    id: 8,
    question: "Seberapa sering kamu mengajak teman atau keluarga ikut menjaga kebersihan lingkungan?",
    options: [
      { text: "Belum pernah berbicara soal lingkungan", points: 0 },
      { text: "Pernah sesekali mengingatkan teman", points: 1 },
      { text: "Sering berbagi cerita seru dari ECOBOT", points: 2 },
    ],
    strengthFeedback: "Inspiratif! Kamu telah menjadi duta lingkungan yang menularkan kebaikan kepada orang lain.",
    suggestionFeedback: "Ajak orang tua atau saudaramu mencoba Tantangan 7 Hari Aksi Nyata bersama.",
    pustakaSlug: "jenis-sampah",
    pustakaTitle: "Mengenal Jenis Sampah",
  },
];
