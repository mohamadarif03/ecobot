import type { Badge, DailyMission, MissionProgress } from "../types/player.ts";

export interface LevelInfo {
  level: number;
  minXp: number;
  nextXp: number;
  title: string;
}

export const LEVELS: LevelInfo[] = [
  { level: 1, minXp: 0, nextXp: 100, title: "Relawan Baru" },
  { level: 2, minXp: 100, nextXp: 250, title: "Pemilah Cilik" },
  { level: 3, minXp: 250, nextXp: 450, title: "Penjaga Taman" },
  { level: 4, minXp: 450, nextXp: 700, title: "Pahlawan Kota" },
  { level: 5, minXp: 700, nextXp: 1000, title: "Duta Lingkungan" },
  { level: 6, minXp: 1000, nextXp: 1500, title: "Pelindung Bumi" },
];

export function calculateLevel(xp: number): LevelInfo {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export const ALL_BADGES: Badge[] = [
  { id: "pemilah-cilik", name: "Pemilah Cilik", description: "Selesaikan Misi 1 di Taman Kota", icon: "🌱", rarity: "common" },
  { id: "si-teliti", name: "Si Teliti", description: "Akurasi pemilahan ≥ 90% dalam satu misi", icon: "🎯", rarity: "rare" },
  { id: "penjaga-sungai", name: "Penjaga Sungai", description: "Selesaikan Misi 3 di Sungai Kota", icon: "🌊", rarity: "common" },
  { id: "raja-combo", name: "Raja Combo", description: "Capai Combo x3 di ban berjalan", icon: "⚡", rarity: "epic" },
  { id: "pembaca-rajin", name: "Pembaca Rajin", description: "Membaca 5 materi di Pustaka Edukasi", icon: "📚", rarity: "common" },
  { id: "si-pintar", name: "Si Pintar", description: "Raih skor 100% pada 3 kuis", icon: "🧠", rarity: "rare" },
  { id: "api-semangat", name: "Api Semangat", description: "Pertahankan streak belajar selama 7 hari", icon: "🔥", rarity: "epic" },
  { id: "pahlawan-nyata", name: "Pahlawan Nyata", description: "Selesaikan Tantangan 7 Hari Aksi Nyata", icon: "🌟", rarity: "epic" },
  { id: "kota-bersih", name: "Kota Bersih!", description: "Meter Kebersihan Kota mencapai 100%", icon: "🏆", rarity: "epic" },
];

export const DEFAULT_MISSIONS: MissionProgress[] = [
  { missionId: 1, title: "Taman Kota", location: "Zona 1 - Taman", status: "available", stars: 0, accuracy: 0, bestScore: 0 },
  { missionId: 2, title: "Pasar Tradisional", location: "Zona 2 - Pasar", status: "locked", stars: 0, accuracy: 0, bestScore: 0 },
  { missionId: 3, title: "Tepi Sungai", location: "Zona 3 - Sungai", status: "locked", stars: 0, accuracy: 0, bestScore: 0 },
  { missionId: 4, title: "Tegur Pelaku", location: "Zona 4 - Pemukiman", status: "locked", stars: 0, accuracy: 0, bestScore: 0 },
  { missionId: 5, title: "Bangun Fasilitas", location: "Zona 5 - Bank Sampah", status: "locked", stars: 0, accuracy: 0, bestScore: 0 },
  { missionId: 6, title: "Ban Berjalan Cepat", location: "Zona 6 - Pusat Daur Ulang", status: "locked", stars: 0, accuracy: 0, bestScore: 0 },
];

export const DEFAULT_DAILY_MISSIONS: DailyMission[] = [
  { id: "dm-1", title: "Pilah 10 Sampah di Game", description: "Bantu Ecobot memilah sampah di Taman Kota", target: 10, current: 0, rewardXp: 30, rewardPoints: 20, claimed: false, type: "game" },
  { id: "dm-2", title: "Baca 1 Materi Pustaka", description: "Buka topik pemilahan sampah organik & anorganik", target: 1, current: 0, rewardXp: 20, rewardPoints: 15, claimed: false, type: "reading" },
  { id: "dm-3", title: "Selesaikan 1 Kuis Harian", description: "Uji pengetahuan lingkunganmu hari ini", target: 1, current: 0, rewardXp: 40, rewardPoints: 25, claimed: false, type: "quiz" },
];
