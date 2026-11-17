/**
 * Panduan Kontrol & Tata Letak HUD Game 3D ECOBOT
 */

export interface ControlBinding {
  key: string;
  action: string;
  description: string;
}

export const PC_KEYBOARD_CONTROLS: ControlBinding[] = [
  {
    key: "W / ↑",
    action: "Maju ke Depan",
    description: "Menggerakkan karakter berjalan maju ke arah hadap kamera.",
  },
  {
    key: "S / ↓",
    action: "Mundur ke Belakang",
    description: "Menggerakkan karakter melangkah mundur secara perlahan.",
  },
  {
    key: "A / ←",
    action: "Geser ke Kiri",
    description: "Menggerakkan karakter menyamping ke sisi kiri.",
  },
  {
    key: "D / →",
    action: "Geser ke Kanan",
    description: "Menggerakkan karakter menyamping ke sisi kanan.",
  },
  {
    key: "Spasi / E",
    action: "Aksi Interaksi",
    description: "Memungut sampah yang didekati atau membuang sampah ke tong yang berada tepat di hadapanmu.",
  },
  {
    key: "Esc",
    action: "Menu Jeda (Pause)",
    description: "Membuka menu jeda untuk melihat misi, mengatur suara, grafis, atau kembali ke beranda.",
  },
  {
    key: "Klik & Geser Mouse",
    action: "Putar Kamera Orbit",
    description: "Menggeser sudut pandang kamera agar kamu bisa melihat sekeliling taman kota dengan leluasa.",
  },
];

export const MOBILE_TOUCH_CONTROLS = [
  {
    element: "Virtual Joystick (Analog)",
    position: "Pojok Kiri Bawah (Default) atau Kanan Bawah (Mode Kidal)",
    description:
      "Sentuh dan geser lingkaran analog ke arah mana pun kamu ingin karakter melangkah. Semakin jauh kamu menarik lingkaran, semakin mantap larinya.",
    tips: "Ukuran joystick bisa kamu atur di Pengaturan: Kecil, Sedang, atau Besar sesuai kenyamanan jemarimu.",
  },
  {
    element: "Tombol Aksi Bulat Besar",
    position: "Pojok Kanan Bawah (Default) atau Kiri Bawah (Mode Kidal)",
    description:
      "Tombol warna cerah bertuliskan AMBIL saat di dekat sampah, atau BUANG saat berada di depan tong sampah.",
    tips: "Tombol ini hanya aktif saat ada objek yang bisa kamu interaksikan di sekitarmu.",
  },
  {
    element: "Tombol Jeda (Pause)",
    position: "Pojok Kanan Atas",
    description: "Tombol ikon garis dua untuk menjeda permainan, memeriksa ringkasan misi, atau menyesuaikan setelan audio.",
    tips: "Waktu misi tidak akan berkurang saat menu jeda sedang terbuka.",
  },
  {
    element: "Sentuh & Usap Layar",
    position: "Area Layar Kosong",
    description: "Geser jarimu di luar lingkaran joystick untuk mengarahkan kamera pandangan karakter ke kiri, kanan, atas, atau bawah.",
    tips: "Gunakan dua jari jika ingin memperbesar atau memperkecil jarak pandang (zoom).",
  },
];

export interface HudElementInfo {
  number: number;
  name: string;
  position: string;
  description: string;
  icon: string;
}

export const HUD_ELEMENTS: HudElementInfo[] = [
  {
    number: 1,
    name: "Level & Bilah XP",
    position: "Kiri Atas",
    description:
      "Menampilkan level karaktermu saat ini dan bilah progres XP yang terus bertambah seiring kamu memilah sampah.",
    icon: "⚡",
  },
  {
    number: 2,
    name: "Penghitung Poin & Koin",
    position: "Kiri Atas (di bawah Level)",
    description:
      "Jumlah koin daur ulang yang berhasil kamu kumpulkan dan siap dibelanjakan di Toko Kustomisasi.",
    icon: "🪙",
  },
  {
    number: 3,
    name: "Meter Kebersihan Kota",
    position: "Kanan Atas",
    description:
      "Bilah persentase kebersihan kota. Jika kamu memilah dengan benar, meteran ini akan naik mendekati 100%.",
    icon: "💚",
  },
  {
    number: 4,
    name: "Panel Misi Aktif & Target Bintang",
    position: "Tengah Atas",
    description:
      "Menampilkan target sampah yang harus dikumpulkan dan indikator bintang misi (1, 2, atau 3 bintang).",
    icon: "🎯",
  },
  {
    number: 5,
    name: "Tombol Jeda (Pause) & Bantuan",
    position: "Pojok Kanan Atas",
    description:
      "Membuka menu darurat untuk membaca instruksi, mengubah volume musik, atau mengulang permainan.",
    icon: "⏸️",
  },
  {
    number: 6,
    name: "Virtual Joystick Analog",
    position: "Bawah (Kiri/Kanan sesuai mode kidal)",
    description:
      "Kontrol sentuh fleksibel untuk mengarahkan gerakan karakter di layar sentuh ponsel atau tablet.",
    icon: "🕹️",
  },
  {
    number: 7,
    name: "Tombol Aksi Dinamis (Ambil / Buang)",
    position: "Bawah (Kanan/Kiri sesuai mode kidal)",
    description:
      "Tombol pintar berukuran besar yang otomatis berubah warna dan teks saat kamu mendekati sampah atau tong pemilahan.",
    icon: "🔘",
  },
];
