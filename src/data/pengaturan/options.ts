export interface QualityOption {
  id: "low" | "medium" | "high";
  label: string;
  deskripsi: string;
}

export const GRAPHICS_OPTIONS: QualityOption[] = [
  { id: "low", label: "Rendah", deskripsi: "Lebih ringan, cocok untuk HP lama dan menghemat baterai." },
  { id: "medium", label: "Sedang", deskripsi: "Keseimbangan seimbang antara visual bersih dan lancar." },
  { id: "high", label: "Tinggi", deskripsi: "Grafis paling detail dan pencahayaan kota lebih hidup." },
];

export interface ControlModeOption {
  id: "auto" | "keyboard" | "touch";
  label: string;
  deskripsi: string;
}

export const CONTROL_MODE_OPTIONS: ControlModeOption[] = [
  { id: "auto", label: "Otomatis", deskripsi: "Menyesuaikan otomatis dengan laptop atau layar sentuh HP." },
  { id: "keyboard", label: "Keyboard", deskripsi: "Gunakan tombol W A S D dan E/Spasi untuk bermain." },
  { id: "touch", label: "Analog Virtual", deskripsi: "Gunakan analog sentuh dan tombol aksi di layar." },
];

export interface JoystickSizeOption {
  id: "kecil" | "sedang" | "besar";
  label: string;
  pixels: number;
}

export const JOYSTICK_SIZE_OPTIONS: JoystickSizeOption[] = [
  { id: "kecil", label: "Kecil", pixels: 110 },
  { id: "sedang", label: "Sedang", pixels: 136 },
  { id: "besar", label: "Besar", pixels: 165 },
];

export interface ReduceMotionOption {
  id: "ikuti" | "ya" | "tidak";
  label: string;
  deskripsi: string;
}

export const REDUCE_MOTION_OPTIONS: ReduceMotionOption[] = [
  { id: "ikuti", label: "Ikuti Perangkat", deskripsi: "Mengikuti pengaturan gerak di sistem operasi perangkatmu." },
  { id: "ya", label: "Kurangi Gerak", deskripsi: "Meniadakan animasi goyang, konfeti, dan efek pantul agar tenang." },
  { id: "tidak", label: "Penuh Animasi", deskripsi: "Tampilkan semua efek animasi ceria dan transisi bergerak." },
];

export interface TextSizeOption {
  id: "normal" | "besar" | "sangat-besar";
  label: string;
  scalePercent: number;
  deskripsi: string;
}

export const TEXT_SIZE_OPTIONS: TextSizeOption[] = [
  { id: "normal", label: "Normal", scalePercent: 100, deskripsi: "Ukuran standar yang pas dan rapi." },
  { id: "besar", label: "Besar", scalePercent: 110, deskripsi: "Teks lebih jelas terbaca untuk mata anak." },
  { id: "sangat-besar", label: "Sangat Besar", scalePercent: 120, deskripsi: "Teks paling besar dengan keterbacaan tinggi." },
];

export interface LanguageOption {
  id: "id" | "en";
  label: string;
  flag: string;
  available: boolean;
  tag?: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { id: "id", label: "Bahasa Indonesia", flag: "🇮🇩", available: true },
  { id: "en", label: "English", flag: "🇬🇧", available: false, tag: "Segera hadir" },
];

export const PARENT_TEACHER_INFO = {
  title: "Panduan untuk Orang Tua & Guru",
  summary: "ECOBOT dirancang khusus sebagai media edukasi lingkungan ramah anak (usia 8-13 tahun) dengan kepatuhan privasi ketat.",
  points: [
    {
      title: "Data Disimpan Lokal",
      desc: "Seluruh progres belajar, poin, skor kuis, dan nama panggilan hanya tersimpan di memori peramban (localStorage) perangkat ini.",
    },
    {
      title: "Nol Pelacakan & Nol Iklan",
      desc: "Tidak ada cookie analitik pihak ketiga, tidak ada pelacak perilaku, dan tidak ada iklan komersial.",
    },
    {
      title: "Privasi Tanpa PII",
      desc: "Kami tidak pernah meminta email, kata sandi, nama lengkap, nomor telepon, alamat rumah, maupun nama sekolah.",
    },
    {
      title: "Aman dari Ruang Chat Asing",
      desc: "Tidak ada fitur pesan pribadi atau obrolan bebas antar pengguna asing, sehingga anak fokus belajar dengan tenang.",
    },
  ],
};
