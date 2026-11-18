import type { TrashItemData } from "../engine/types";

export const MISSION_1_TRASH_ITEMS: TrashItemData[] = [
  // 1. Organik
  {
    id: "kulit-pisang",
    name: "Kulit Pisang",
    category: "organik",
    colorHex: "#FACC15",
    icon: "🍌",
    penjelasanBenar: "Hebat! Kulit pisang adalah sampah organik yang mudah terurai dan bisa diolah jadi kompos subur.",
    penjelasanSalah: {
      organik: "",
      anorganik: "Kulit pisang bukan anorganik. Sampah sisa buah dan makanan harus masuk ke Tong Hijau (Organik) ya!",
      b3: "Kulit pisang tidak beracun atau B3. Masukkan ke Tong Hijau (Organik) agar bisa menjadi pupuk!",
    },
    faktaSingkat: "Kulit pisang membutuhkan waktu 2 hingga 5 minggu untuk terurai alami di dalam tanah.",
  },
  {
    id: "sisa-nasi",
    name: "Sisa Nasi",
    category: "organik",
    colorHex: "#F8FAFC",
    icon: "🍚",
    penjelasanBenar: "Tepat sekali! Sisa nasi termasuk sampah organik basah yang cepat membusuk.",
    penjelasanSalah: {
      organik: "",
      anorganik: "Sisa nasi bukan anorganik! Makanan basi masuk ke Tong Hijau agar tidak mencemari sampah daur ulang.",
      b3: "Sisa nasi bukan limbah kimia B3. Masukkan ke Tong Hijau (Organik) ya!",
    },
    faktaSingkat: "Sampah sisa makanan menyumbang lebih dari 40% dari total timbunan sampah rumah tangga di Indonesia.",
  },
  {
    id: "daun-kering",
    name: "Daun Kering",
    category: "organik",
    colorHex: "#A16207",
    icon: "🍂",
    penjelasanBenar: "Bagus! Daun gugur adalah sampah organik cokelat yang kaya karbon untuk kompos tanaman.",
    penjelasanSalah: {
      organik: "",
      anorganik: "Daun gugur berasal dari alam, bukan barang pabrik buatan. Masukkan ke Tong Hijau (Organik)!",
      b3: "Daun kering sangat alami dan tidak berbahaya. Masukkan ke Tong Hijau ya!",
    },
    faktaSingkat: "Daun kering yang dikomposkan bersama sisa sayur menghasilkan pupuk kompos berkualitas tinggi.",
  },

  // 2. Anorganik
  {
    id: "botol-plastik",
    name: "Botol Plastik",
    category: "anorganik",
    colorHex: "#38BDF8",
    icon: "🧴",
    penjelasanBenar: "Keren! Botol plastik adalah sampah anorganik yang bisa didaur ulang menjadi serat baju atau pot tanaman.",
    penjelasanSalah: {
      organik: "Botol plastik tidak bisa membusuk alami seperti daun! Masukkan ke Tong Kuning (Anorganik).",
      anorganik: "",
      b3: "Botol plastik minuman bersih bukan limbah beracun B3. Masukkan ke Tong Kuning (Anorganik) ya!",
    },
    faktaSingkat: "Satu botol plastik PET butuh hingga 450 tahun untuk hancur di alam jika dibuang sembarangan.",
  },
  {
    id: "kaleng-minuman",
    name: "Kaleng Minuman",
    category: "anorganik",
    colorHex: "#CBD5E1",
    icon: "🥫",
    penjelasanBenar: "Tepat! Kaleng aluminium bisa dilebur dan didaur ulang berulang kali tanpa kehilangan kualitas.",
    penjelasanSalah: {
      organik: "Kaleng logam tidak bisa membusuk di tanah! Masukkan ke Tong Kuning (Anorganik) agar didaur ulang.",
      anorganik: "",
      b3: "Kaleng soda biasa bukan limbah B3. Masukkan ke Tong Kuning (Anorganik) ya!",
    },
    faktaSingkat: "Mendaur ulang 1 kaleng aluminium menghemat energi setara menyalakan TV selama 3 jam!",
  },
  {
    id: "kardus-bekas",
    name: "Kardus Bekas",
    category: "anorganik",
    colorHex: "#D97706",
    icon: "📦",
    penjelasanBenar: "Pintar! Kardus kering adalah sampah anorganik kertas yang bernilai tinggi untuk pabrik daur ulang.",
    penjelasanSalah: {
      organik: "Kardus olahan pabrik lebih baik didaur ulang kering di Tong Kuning (Anorganik) daripada dibusukkan basah.",
      anorganik: "",
      b3: "Kardus kemasan aman dan tidak beracun. Masukkan ke Tong Kuning (Anorganik)!",
    },
    faktaSingkat: "Setiap 1 ton kardus yang didaur ulang menyelamatkan sekitar 17 pohon peneduh di hutan.",
  },

  // 3. B3 (Bahan Berbahaya & Beracun)
  {
    id: "baterai-bekas",
    name: "Baterai Bekas",
    category: "b3",
    colorHex: "#DC2626",
    icon: "🔋",
    penjelasanBenar: "Luar biasa teliti! Baterai bekas mengandung logam berat berbahaya, wajib dipisahkan di Tong Merah B3.",
    penjelasanSalah: {
      organik: "Awas! Baterai mengandung cairan kimia berbahaya, jangan sampai meracuni tanah di tong organik!",
      anorganik: "Baterai tidak boleh dicampur plastik/kertas biasa karena bisa bocor atau meledak! Masukkan ke Tong Merah (B3).",
      b3: "",
    },
    faktaSingkat: "Satu baterai kecil bisa mencemari ribuan liter air tanah bila dibuang ke tempat sampah biasa.",
  },
  {
    id: "lampu-bekas",
    name: "Lampu Bekas",
    category: "b3",
    colorHex: "#F1F5F9",
    icon: "💡",
    penjelasanBenar: "Hebat! Lampu neon/bohlam mengandung serbuk merkuri dan kaca tajam, harus masuk ke Tong Merah B3.",
    penjelasanSalah: {
      organik: "Peringatan! Lampu bekas mengandung kaca pecah dan gas beracun, jauhkan dari tong organik!",
      anorganik: "Lampu bekas bukan sampah anorganik biasa karena ada uap merkuri berbahaya. Masukkan ke Tong Merah (B3) ya!",
      b3: "",
    },
    faktaSingkat: "Limbah elektronik dan lampu harus ditangani oleh fasilitas pengolahan limbah B3 khusus demi keselamatan.",
  },
];
