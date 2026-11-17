export type CardType = "isi" | "fakta" | "pilih-tong" | "coba-di-rumah" | "ringkasan";

export interface PilihTongOption {
  tong: "Organik" | "Anorganik" | "B3";
  color: string;
  label: string;
}

export interface PilihTongData {
  trashName: string;
  correctCategory: "Organik" | "Anorganik" | "B3";
  options: PilihTongOption[];
  explanation: string;
}

export interface CobaDiRumahData {
  action: string;
  duration: string;
  rewardNote?: string;
}

export interface PustakaCard {
  id: string;
  tipe: CardType;
  judul: string;
  isi: string; // Max 40 words
  gambar?: string;
  angkaBesar?: string;
  satuanBesar?: string;
  ecobot?: string; // 1-sentence Ecobot reaction
  pilihTong?: PilihTongData;
  cobaDiRumah?: CobaDiRumahData;
}

export interface PustakaTopic {
  slug: string;
  judul: string;
  ringkasan: string;
  tingkat: "Pemula" | "Menengah";
  menit: number;
  urutan: number;
  ilustrasi: string;
  quizTopicId: string;
  xp: number;
  poin: number;
  referensi: string[];
  kartu: PustakaCard[];
}

export interface GlossaryTerm {
  id: string;
  istilah: string;
  definisi: string;
  analogi: string;
  icon: string;
  relatedTopicSlug?: string;
}

export interface SourceReference {
  id: string;
  judul: string;
  penerbit: string;
  url: string; // Empty string if unverified
  tahunAkses: string;
  catatan?: string;
}
