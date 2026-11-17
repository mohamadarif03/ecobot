/**
 * Konfigurasi Informasi Kontak & Dukungan ECOBOT
 * Ditujukan khusus untuk Orang Tua, Guru, dan Penyelenggara.
 * Catatan Privasi: Aplikasi ini tidak mengumpulkan data kontak anak.
 */

export interface ContactConfig {
  channel: string;
  // TODO: Sesuaikan alamat surel dukungan resmi jika dibutuhkan
  supportEmail: string;
  operatingHours: string;
  responseEstimate: string;
  noticeForKids: string;
  notesForParents: string;
  githubRepoUrl?: string;
}

export const CONTACT_CONFIG: ContactConfig = {
  channel: "Pusat Dukungan Orang Tua & Pendidik",
  supportEmail: "dukungan.ecobot@example.com", // TODO: Ubah ke email resmi tim Anda
  operatingHours: "Senin - Jumat, 08.00 - 16.00 WIB",
  responseEstimate: "Maksimal 1 - 2 hari kerja",
  noticeForKids:
    "Anak hebat, kamu tidak perlu menghubungi secara mandiri ya! Jika ada kendala, minta bantuan ayah, ibu, atau bapak/ibu gurumu untuk menghubungi kami.",
  notesForParents:
    "ECOBOT berkomitmen menjaga keamanan digital anak. Seluruh data permainan disimpan secara lokal di peramban (browser) perangkat Anda tanpa login maupun pelacak pihak ketiga.",
  githubRepoUrl: "https://github.com/example/ecobot-lingkungan", // TODO: Sesuaikan dengan repository publik proyek
};
