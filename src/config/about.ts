/**
 * Konfigurasi Tentang Aplikasi ECOBOT
 * Informasi tim pengembang, versi rilis, dan visi edukasi.
 * Catatan: Sesuaikan detail tim dan institusi sesuai kebutuhan kompetisi/sekolah.
 */

export interface AboutConfig {
  appName: string;
  shortName: string;
  tagline: string;
  version: string;
  releaseDate: string;
  targetAudience: string;
  mission: string;
  description: string;
  // TODO: Isi nama tim pengembang resmi jika diperlukan untuk juri / pengumpulan lomba
  teamName: string;
  // TODO: Isi nama institusi / sekolah / universitas
  institution: string;
  credits: {
    role: string;
    description: string;
  }[];
}

export const ABOUT_CONFIG: AboutConfig = {
  appName: "ECOBOT - Petualangan Edukasi Lingkungan 3D",
  shortName: "ECOBOT",
  tagline: "Belajar memilah sampah dan mencintai bumi bersama Ecobot si robot ramah!",
  version: "1.0.0",
  releaseDate: "November 2026",
  targetAudience: "Anak usia 8 - 13 tahun, Orang Tua, dan Guru",
  mission:
    "Membangun kesadaran lingkungan anak Indonesia sejak dini lewat pengalaman bermain 3D interaktif yang seru, edukatif, aman, dan tanpa iklan.",
  description:
    "ECOBOT adalah platform gamifikasi web interaktif yang menggabungkan simulasi pemilahan sampah 3D kota bersih, pustaka edukasi ramah anak, kuis penguat pemahaman, serta tantangan aksi nyata di dunia rumah.",
  teamName: "Tim Inovasi Edukasi ECOBOT", // TODO: Ganti dengan nama tim pengembang Anda
  institution: "Inisiatif Edukasi Hijau Indonesia", // TODO: Ganti dengan institusi Anda
  credits: [
    {
      role: "Desain Karakter & 3D Web",
      description: "Dunia 3D kota bersih dan maskot Ecobot ramah anak.",
    },
    {
      role: "Kurikulum & Materi Edukasi",
      description: "Mengacu pada prinsip 3R (Reduce, Reuse, Recycle) dan jenis pemilahan sampah Indonesia.",
    },
    {
      role: "Gamifikasi & Rekayasa Perangkat Lunak",
      description: "Sistem misi, level, lencana prestasi, dan penyimpanan lokal aman privasi anak.",
    },
  ],
};
