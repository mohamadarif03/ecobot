import type {
  TrashBinInfo,
  StarRuleInfo,
  EconomyConceptInfo,
  DailyPlayStep,
} from "./types.ts";

export interface CorePlayStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  badge: string;
  badgeColor: string;
  tips: string;
}

export const CORE_PLAY_STEPS: CorePlayStep[] = [
  {
    step: 1,
    title: "Jelajahi Kota Bersih",
    subtitle: "Cari sampah yang tercecer di jalan dan taman",
    description:
      "Gunakan joystick atau tombol keyboard (WASD / Panah) untuk menggerakkan karaktermu berkeliling kota 3D. Perhatikan sudut jalan, bawah pohon, dan pinggir trotoar tempat sampah berserakan.",
    icon: "🚶‍♂️",
    badge: "Langkah 1",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-300",
    tips: "Tingkatkan Sepatu Cepat di halaman Game agar karaktermu bisa berlari lebih gesit!",
  },
  {
    step: 2,
    title: "Dekati dan Ambil Sampah",
    subtitle: "Tekan tombol AMBIL saat indikator menyala",
    description:
      "Saat kamu berada dekat dengan sampah, tombol aksi besar akan menyala dan menampilkan teks 'AMBIL'. Tekan tombol aksi atau tombol Spasi / E pada keyboard untuk memungutnya ke dalam kantong.",
    icon: "📦",
    badge: "Langkah 2",
    badgeColor: "bg-amber-100 text-amber-700 border-amber-300",
    tips: "Perhatikan kapasitas kantongmu! Jika penuh, kamu harus membuangnya ke tong sampah dulu sebelum bisa memungut sampah lagi.",
  },
  {
    step: 3,
    title: "Pilah ke Tong yang Tepat",
    subtitle: "Pilih Hijau, Kuning, atau Merah",
    description:
      "Bawa sampah ke deretan tong sampah di kota. Dekati tong yang warnanya sesuai dengan jenis sampah yang kamu bawa, lalu tekan tombol 'BUANG'. Jika benar, kamu mendapat poin, XP, dan kombo pemilahan!",
    icon: "♻️",
    badge: "Langkah 3",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-300",
    tips: "Jangan asal buang ya! Membuang ke tong yang salah akan memutus kombo dan mengurangi persentase akurasi misimu.",
  },
];

export const ADVANCED_PLAY_STEPS: CorePlayStep[] = [
  {
    step: 4,
    title: "Selesaikan Misi & Raih 3 Bintang",
    subtitle: "Capai target harian dan raih akurasi sempurna",
    description:
      "Setiap misi memiliki target jenis sampah dan akurasi minimal. Jika kamu memilah minimal 90% dengan benar, kamu akan dihadiahi 3 Bintang emas dan bonus XP berlimpah!",
    icon: "⭐",
    badge: "Langkah 4",
    badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-300",
    tips: "Periksa daftar misi di pojok atas layar game atau buka menu Misi di dashboard.",
  },
  {
    step: 5,
    title: "Level Up & Dandani Karakter",
    subtitle: "Tukar koin di Toko dan pamerkan lencana prestasimu",
    description:
      "XP yang terkumpul akan menaikkan level dan gelar kepedulianmu. Koin yang kamu peroleh bisa ditukar di Toko Daur Ulang untuk kostum karakter, warna baru Ecobot, dan stiker profil yang keren!",
    icon: "👑",
    badge: "Langkah 5",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-300",
    tips: "Seluruh item di toko diperoleh murni dari bermain dan belajar, 100% tanpa uang sungguhan!",
  },
];

export const TRASH_BINS: TrashBinInfo[] = [
  {
    id: "organik",
    name: "Tong Hijau: Organik",
    category: "Sisa Mahluk Hidup & Bahan Alami",
    colorHex: "#10B981",
    bgLight: "bg-emerald-50",
    borderLight: "border-emerald-200",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-800",
    description:
      "Sampah yang berasal dari sisa tumbuhan, hewan, atau makanan. Sampah ini mudah membusuk secara alami oleh bakteri tanah dan dapat diolah menjadi pupuk kompos yang menyuburkan tanaman.",
    examples: [
      "Kulit pisang & sisa buah",
      "Daun kering & ranting gugur",
      "Sisa sayuran dapur",
      "Kulit telur & cangkang",
      "Ampas teh & kopi",
      "Tulang ikan & sisa nasi",
    ],
    tips: "Pastikan tidak ada bungkus plastik atau styrofoam yang ikut terbawa ya!",
    funFact:
      "Sampah organik yang dibuat kompos bisa mengurangi emisi gas metana di tempat pembuangan akhir hingga 50%!",
  },
  {
    id: "anorganik",
    name: "Tong Kuning: Anorganik",
    category: "Bahan Buatan yang Dapat Didaur Ulang",
    colorHex: "#F59E0B",
    bgLight: "bg-amber-50",
    borderLight: "border-amber-200",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
    description:
      "Sampah dari bahan buatan manusia yang tidak mudah terurai secara alami, namun masih bersih dan bisa didaur ulang kembali menjadi barang baru yang bermanfaat di pabrik daur ulang.",
    examples: [
      "Botol plastik PET & gelas air mineral",
      "Kaleng minuman aluminium & biskuit",
      "Kardus bekas & kertas buku",
      "Kantong kresek bersih",
      "Tutup botol & sedotan plastik",
      "Koran & majalah bekas",
    ],
    tips: "Bilas dan keringkan botol atau kaleng dari sisa cairan sebelum dibuang agar tidak bau dan mengundang lalat.",
    funFact:
      "Mendaur ulang 1 kaleng aluminium menghemat energi yang cukup untuk menyalakan TV selama 3 jam penuh!",
  },
  {
    id: "b3",
    name: "Tong Merah: B3 (Bahan Berbahaya & Beracun)",
    category: "Barang Kimia & Elektronik Berbahaya",
    colorHex: "#EF4444",
    bgLight: "bg-rose-50",
    borderLight: "border-rose-200",
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-800",
    description:
      "Sampah yang mengandung bahan kimia beracun, mudah meledak, berkarat keras, atau dapat mencemari air tanah dan membahayakan kesehatan manusia serta hewan jika dibuang sembarangan.",
    examples: [
      "Baterai bekas (AA, AAA, kancing)",
      "Lampu neon & bohlam kaca pecah",
      "Pecahan botol kaca & cermin tajam",
      "Wadah semprotan aerosol (obat nyamuk)",
      "Kemasan obat kedaluwarsa & jarum",
      "Botol pembersih lantai & aki bekas",
    ],
    tips: "Jangan pernah membakar atau memecahkan sampah B3! Minta tolong orang dewasa saat membuangnya.",
    funFact:
      "Satu butir baterai kancing bekas yang dibuang sembarangan bisa mencemari ribuan liter air tanah di sekitarnya!",
  },
];

export const STAR_RULES: StarRuleInfo[] = [
  {
    stars: 1,
    label: "1 Bintang (Lolos)",
    condition: "Selesaikan target jumlah sampah",
    description: "Kumpulkan dan buang seluruh sampah sesuai target misi, berapa pun persentase akurasinya.",
    badgeText: "Cukup Bagus",
  },
  {
    stars: 2,
    label: "2 Bintang (Hebat)",
    condition: "Akurasi pemilahan minimal 75%",
    description: "Selesaikan misi dan pastikan setidaknya 3 dari 4 sampah dibuang ke tong yang tepat tanpa banyak keliru.",
    badgeText: "Pilah Cermat",
  },
  {
    stars: 3,
    label: "3 Bintang (Sempurna)",
    condition: "Akurasi pemilahan minimal 90%",
    description: "Hampir tidak ada kesalahan sama sekali! Kamu memilah sampah layaknya pahlawan lingkungan sejati dan mendapat bonus XP!",
    badgeText: "Master Pemilah",
  },
];

export const ECONOMY_CONCEPTS: EconomyConceptInfo[] = [
  {
    icon: "⚡",
    name: "XP (Experience Points)",
    shortDesc: "Poin pengalaman yang menunjukkan jam terbang dan kemahiranmu.",
    howToEarn: "Memilah sampah dengan benar, membaca topik pustaka, mengerjakan kuis, dan menyelesaikan misi harian.",
    usage: "Menaikkan Level karaktermu dari 'Pemula Hijau' hingga 'Pahlawan Bumi'. XP tidak pernah berkurang!",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
  },
  {
    icon: "🪙",
    name: "Poin Daur Ulang (Koin)",
    shortDesc: "Mata uang virtual ramah anak yang dapat kamu belanjakan.",
    howToEarn: "Klaim hadiah misi harian/mingguan, selesaikan tantangan 7 hari, dan raih nilai tinggi di kuis.",
    usage: "Membeli kostum keren, warna baru untuk Ecobot, dan stiker dekorasi profil di Toko Kustomisasi.",
    badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
  {
    icon: "🎖️",
    name: "Level & Gelar",
    shortDesc: "Pangkat kehormatan yang mencerminkan dedikasi belajarmu.",
    howToEarn: "Otomatis naik setiap kali XP mencapai batas ambang level berikutnya.",
    usage: "Membuka lencana eksklusif, sertifikat digital resmi, dan akses barang langka di toko.",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    icon: "🔥",
    name: "Hari Berturut-turut (Streak)",
    shortDesc: "Catatan berapa hari kamu aktif belajar lingkungan tanpa terputus.",
    howToEarn: "Buka ECOBOT dan selesaikan minimal 1 aktivitas seru setiap hari (main game, baca, kuis, atau aksi).",
    usage: "Membuka lencana Api Ketekunan dan meningkatkan kepercayaan diri merawat bumi.",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
  },
  {
    icon: "🏆",
    name: "Lencana (Badges)",
    shortDesc: "Tanda penghargaan bergengsi atas pencapaian istimewa.",
    howToEarn: "Selesaikan syarat unik seperti kombo pemilahan 10x, membaca semua topik, atau 7 hari tantangan nyata.",
    usage: "Dipajang di etalase profil dan halaman Pencapaian agar teman-teman bisa melihatnya.",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
  },
  {
    icon: "💚",
    name: "Meter Kebersihan Kota",
    shortDesc: "Indikator kesehatan lingkungan kota 3D secara langsung.",
    howToEarn: "Ambil sampah dan buang ke tong yang benar. Indikator akan naik mendekati 100%.",
    usage: "Kota tampak lebih cerah, asri, dan kamu merasa bangga telah merawat taman kota bersama Ecobot.",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
];

export const ICON_LEGEND = [
  { icon: "⚡", label: "XP", desc: "Poin Pengalaman untuk Naik Level" },
  { icon: "🪙", label: "Poin", desc: "Koin Belanja untuk Toko Daur Ulang" },
  { icon: "🔥", label: "Streak", desc: "Hari Aktif Berturut-turut" },
  { icon: "⭐", label: "Bintang Misi", desc: "Tingkat Akurasi Pemilahan Game" },
  { icon: "🏆", label: "Lencana", desc: "Prestasi Spesial yang Terbuka" },
  { icon: "💚", label: "Kebersihan", desc: "Kesehatan & Keindahan Kota 3D" },
];

export const ONE_DAY_FLOW: DailyPlayStep[] = [
  {
    step: 1,
    title: "1. Buka Beranda & Sambut Hadiah Harian",
    description: "Cek progres level, sapa Ecobot, dan lihat misi apa saja yang siap kamu selesaikan hari ini.",
    href: "/beranda",
    badge: "01 Menit",
  },
  {
    step: 2,
    title: "2. Cek Daftar Misi Harian",
    description: "Lihat 3 misi harian di halaman Misi untuk mengetahui sampah apa yang perlu diprioritaskan.",
    href: "/misi",
    badge: "02 Menit",
  },
  {
    step: 3,
    title: "3. Main Game 3D Kota Bersih",
    description: "Jelajahi kota, ambil sampah, dan pilah ke tong yang benar untuk meraih 3 bintang emas.",
    href: "/main-game",
    badge: "05 - 10 Menit",
  },
  {
    step: 4,
    title: "4. Baca 1 Topik & Ikuti Kuis Harian",
    description: "Pelajari kartu geser seru di Pustaka, lalu uji pemahamanmu di Kuis Harian untuk bonus XP.",
    href: "/kuis",
    badge: "05 Menit",
  },
  {
    step: 5,
    title: "5. Catat Aksi Nyata di Rumah",
    description: "Centang tantangan kebiasaan baik hari ini atau hitung jejak sampah keluargamu.",
    href: "/aksi-nyata",
    badge: "03 Menit",
  },
];
