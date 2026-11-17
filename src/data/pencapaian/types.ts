import type { PlayerState } from "../../types/player.ts";

export type BadgeCategory = "game" | "belajar" | "kebiasaan" | "spesial";

export interface BadgeDefinition {
  id: string;
  nama: string;
  deskripsi: string;
  kategori: BadgeCategory;
  ikon: string;
  syaratTeks: string;
  available: boolean;
  target: number;
  pesanEcobot: string;
  tautan?: string;
  ambilProgres: (state: PlayerState) => number;
  cek: (state: PlayerState) => boolean;
}

export type FactCardRarity = "umum" | "langka" | "epik";

export interface FactCardDefinition {
  id: string;
  judul: string;
  fakta: string; // Maks 30 kata
  kategori: string;
  kelangkaan: FactCardRarity;
  ikon: string;
  sumberMateri: string;
  pustakaSlug?: string;
  syaratTeks: string;
  cek: (state: PlayerState) => boolean;
}

export type CertificateTier = "perunggu" | "perak" | "emas";

export interface CertificateDefinition {
  id: string;
  tier: CertificateTier;
  judul: string;
  namaGelar: string;
  deskripsi: string;
  alasan: string;
  borderClass: string;
  bgGradient: string;
  accentColor: string;
  syaratTeks: string;
  cek: (state: PlayerState) => boolean;
}

export interface RadarScoreInfo {
  memilah: number;
  pengetahuan: number;
  aksiNyata: number;
  konsistensi: number;
  terendah: "memilah" | "pengetahuan" | "aksiNyata" | "konsistensi";
  saranEcobot: string;
  tautanSaran: string;
}
