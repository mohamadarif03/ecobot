export interface EnvironmentalFact {
  id: number;
  title: string;
  fact: string;
  actionTip: string;
  source: string;
}

export const ENVIRONMENTAL_FACTS: EnvironmentalFact[] = [
  {
    id: 1,
    title: "Misteri Botol Plastik",
    fact: "Satu botol plastik butuh waktu hingga 450 tahun untuk terurai di alam bebas!",
    actionTip: "Yuk bawa botol minum (tumbler) sendiri saat pergi ke sekolah.",
    source: "Kementerian Lingkungan Hidup dan Kehutanan (KLHK)",
  },
  {
    id: 2,
    title: "Emas Hitam Bernama Kompos",
    fact: "Sampah sisa sayur dan kulit buah bisa diubah menjadi pupuk kompos yang menyuburkan tanah.",
    actionTip: "Pisahkan sisa makananmu ke dalam tempat sampah hijau khusus organik.",
    source: "Dinas Lingkungan Hidup",
  },
  {
    id: 3,
    title: "Bahaya Tersembunyi Baterai Bekas",
    fact: "Baterai bekas mengandung zat beracun (merkuri & timbal) yang bisa mencemari air tanah.",
    actionTip: "Jangan buang baterai sembarangan! Kumpulkan ke wadah limbah B3 khusus.",
    source: "Badan Pengelolaan Lingkungan Hidup",
  },
  {
    id: 4,
    title: "Pahlawan Kertas Daur Ulang",
    fact: "Mendaur ulang 1 ton kertas dapat menyelamatkan 17 pohon dewasa dari penebangan.",
    actionTip: "Gunakan kedua sisi kertas buku tulismu sebelum dibuang.",
    source: "World Wide Fund for Nature (WWF)",
  },
  {
    id: 5,
    title: "Sedotan Plastik di Samudra",
    fact: "Sedotan plastik adalah salah satu sampah paling sering melukai penyu laut karena bentuknya.",
    actionTip: "Tolak sedotan plastik sekali pakai, minum langsung dari gelasmu.",
    source: "Ocean Conservancy",
  },
  {
    id: 6,
    title: "Energi dari Kaleng Bekas",
    fact: "Mendaur ulang satu kaleng minuman aluminium menghemat energi untuk menyalakan TV selama 3 jam!",
    actionTip: "Remas kaleng bekas minumanmu sebelum dimasukkan ke tong daur ulang.",
    source: "The Aluminum Association",
  },
  {
    id: 7,
    title: "Si Kecil Mikroplastik",
    fact: "Plastik tidak benar-benar lenyap, tapi terpecah menjadi serpihan mikroskopis yang termakan ikan.",
    actionTip: "Gunakan kantong belanja kain saat pergi berbelanja bersama orang tua.",
    source: "United Nations Environment Programme (UNEP)",
  },
  {
    id: 8,
    title: "Keajaiban Kaca",
    fact: "Kaca adalah bahan yang dapat didaur ulang tanpa batas tanpa kehilangan kualitas atau kemurniannya.",
    actionTip: "Kumpulkan botol kaca kosong untuk disetorkan ke bank sampah terdekat.",
    source: "Glass Packaging Institute",
  },
  {
    id: 9,
    title: "Jejak Karbon Makanan",
    fact: "Membuang-buang makanan sama saja membuang air, bahan bakar, dan energi yang dipakai untuk menanamnya.",
    actionTip: "Ambil makanan secukupnya di piring dan habiskan sampai bersih ya!",
    source: "Food and Agriculture Organization (FAO)",
  },
  {
    id: 10,
    title: "Pohon Penyaring Udara",
    fact: "Satu pohon rindang mampu menyerap hingga 22 kilogram karbon dioksida per tahun.",
    actionTip: "Ayo siram tanaman di halaman rumahmu setiap pagi atau sore.",
    source: "KLHK RI",
  },
  {
    id: 11,
    title: "Lampu Hemat Energi",
    fact: "Lampu LED memakai energi hingga 80% lebih sedikit dibandingkan lampu pijar zaman dulu.",
    actionTip: "Matikan lampu kamar saat kamu keluar bermain siang hari.",
    source: "Kementerian ESDM",
  },
  {
    id: 12,
    title: "Sampah Elektronik (E-Waste)",
    fact: "Ponsel dan tablet lama mengandung emas, perak, dan tembaga yang berharga jika didaur ulang dengan benar.",
    actionTip: "Bawa gawai rusak ke tempat daur ulang elektronik khusus.",
    source: "Global E-waste Monitor",
  },
  {
    id: 13,
    title: "Tiga Warna Tong Sampah",
    fact: "Warna hijau untuk Organik, kuning untuk Anorganik, dan merah untuk B3 berbahaya.",
    actionTip: "Ingat-ingat warnanya saat melihat tong sampah umum di taman kota!",
    source: "Standar Pengelolaan Sampah Indonesia",
  },
  {
    id: 14,
    title: "Kardus Karton yang Ramah",
    fact: "Kardus bekas cokelat mudah terurai alami dalam waktu beberapa bulan jika terkena tanah basah.",
    actionTip: "Manfaatkan kardus bekas sepatu untuk wadah mainan atau prakarya.",
    source: "Indonesia Packaging Federation",
  },
  {
    id: 15,
    title: "Hemat Air Mandi",
    fact: "Mematikan keran saat menyikat gigi dapat menghemat hingga 12 liter air bersih setiap kali sikat gigi!",
    actionTip: "Gunakan gayung atau gelas kumur saat menyikat gigi.",
    source: "Kementerian PUPR",
  },
  {
    id: 16,
    title: "Bank Sampah di Lingkungan",
    fact: "Di Indonesia ada ribuan bank sampah tempat kamu bisa menukar sampah terpilah menjadi tabungan!",
    actionTip: "Tanyakan pada guru atau orang tuamu apakah ada bank sampah di dekat rumahmu.",
    source: "Kementerian LHK",
  },
];

export function getTodayFact(): EnvironmentalFact {
  const now = new Date();
  // Simple deterministic day-of-year rotation
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const index = Math.abs(dayOfYear) % ENVIRONMENTAL_FACTS.length;
  return ENVIRONMENTAL_FACTS[index];
}
