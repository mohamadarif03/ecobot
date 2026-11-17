import type { SourceReference } from "./types";

// TODO: Tim mengisi URL resmi dan memverifikasi isi materi dari sumber-sumber rujukan pemerintah & lembaga internasional.
export const PUSTAKA_SOURCES: SourceReference[] = [
  {
    id: "sumber-sipsn",
    judul: "Sistem Informasi Pengelolaan Sampah Nasional (SIPSN)",
    penerbit: "Kementerian Lingkungan Hidup dan Kehutanan (KLHK) RI",
    url: "", // TODO: verifikasi & isi tautan resmi SIPSN KLHK
    tahunAkses: "2024",
    catatan: "Rujukan komposisi timbulan sampah rumah tangga nasional dan capaian pemilahan sampah.",
  },
  {
    id: "sumber-unep",
    judul: "Drowning in Plastics – Marine Litter and Plastic Waste Vital Graphics",
    penerbit: "United Nations Environment Programme (UNEP)",
    url: "", // TODO: verifikasi & isi tautan resmi publikasi UNEP
    tahunAkses: "2023",
    catatan: "Rujukan fakta bahaya sampah plastik dan mikroplastik pada ekosistem laut.",
  },
  {
    id: "sumber-noaa",
    judul: "How Long Does It Take for Marine Debris to Decompose?",
    penerbit: "National Oceanic and Atmospheric Administration (NOAA)",
    url: "", // TODO: verifikasi & isi tautan resmi grafik dekomposisi NOAA
    tahunAkses: "2024",
    catatan: "Rujukan estimasi waktu dekomposisi alami untuk botol plastik, kaleng, dan puntung rokok.",
  },
  {
    id: "sumber-panduan-klhk",
    judul: "Panduan Praktis Pemilahan dan Pengolahan Sampah Rumah Tangga",
    penerbit: "Direktorat Pengurangan Sampah, Ditjen PSLB3, KLHK RI",
    url: "", // TODO: verifikasi & isi tautan dokumen panduan KLHK
    tahunAkses: "2024",
    catatan: "Rujukan kode warna tong sampah pilah (hijau, kuning, merah) dan pengolahan kompos di rumah.",
  },
];
