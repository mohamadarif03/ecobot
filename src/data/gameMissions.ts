import type { MissionProgress } from "../types/player";

export interface GameMissionConfig {
  id: number;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  targetDescription: string;
  targetCount: number;
  durationSeconds?: number;
  icon: "park" | "market" | "river" | "warn" | "facility" | "conveyor";
  priority: "P0" | "P1" | "P2";
  available: boolean; // P2 mission 4 is "Segera hadir"
  prerequisiteText: string;
  trashTypesIncluded: ("Organik" | "Anorganik" | "B3")[];
}

export const GAME_MISSIONS: GameMissionConfig[] = [
  {
    id: 1,
    title: "Taman Kota",
    subtitle: "Tutorial Dasar",
    location: "Zona 1 · Taman Hijau",
    description: "Pilah 8 sampah mudah ke tong yang benar untuk menghidupkan kembali taman.",
    targetDescription: "8 sampah masuk tong yang tepat",
    targetCount: 8,
    icon: "park",
    priority: "P0",
    available: true,
    prerequisiteText: "Misi pertama dibuka untuk semua relawan baru",
    trashTypesIncluded: ["Organik", "Anorganik"],
  },
  {
    id: 2,
    title: "Pasar Tradisional",
    subtitle: "Tantangan Memilah",
    location: "Zona 2 · Kios & Los Pasar",
    description: "Pilah sampah yang membingungkan dan jawab pertanyaan pedagang pasar.",
    targetDescription: "12 sampah dipilah + 3 pertanyaan dijawab",
    targetCount: 12,
    icon: "market",
    priority: "P0",
    available: true,
    prerequisiteText: "Selesaikan Misi 1 (Taman Kota) dulu",
    trashTypesIncluded: ["Organik", "Anorganik", "B3"],
  },
  {
    id: 3,
    title: "Tepi Sungai",
    subtitle: "Penyelamatan Air",
    location: "Zona 3 · Bantaran Sungai",
    description: "Bersihkan tepi sungai dan dorong sampah besar yang tersangkut ke gerobak daur ulang.",
    targetDescription: "10 sampah diambil + 2 objek besar didorong",
    targetCount: 10,
    icon: "river",
    priority: "P1",
    available: true,
    prerequisiteText: "Selesaikan Misi 2 (Pasar Tradisional) dulu",
    trashTypesIncluded: ["Organik", "Anorganik"],
  },
  {
    id: 4,
    title: "Tegur Pelaku",
    subtitle: "Edukasi Warga",
    location: "Zona 4 · Pemukiman Warga",
    description: "Kejar si pembuang sampah liar dan ajak dia membuang sampah dengan benar dan bertanggung jawab.",
    targetDescription: "3 orang pembuang sampah liar ditegur",
    targetCount: 3,
    icon: "warn",
    priority: "P2",
    available: false, // Flagged P2: Segera hadir
    prerequisiteText: "Selesaikan Misi 3 (Tepi Sungai) dulu",
    trashTypesIncluded: ["Anorganik"],
  },
  {
    id: 5,
    title: "Bangun Fasilitas",
    subtitle: "Infrastruktur Bersih",
    location: "Zona 5 · Bank Sampah Kota",
    description: "Pakai poin hasil petualanganmu untuk memasang tong pilah baru dan unit bank sampah.",
    targetDescription: "3 fasilitas kebersihan berhasil dipasang",
    targetCount: 3,
    icon: "facility",
    priority: "P1",
    available: true,
    prerequisiteText: "Selesaikan Misi 2 (Pasar Tradisional) dulu",
    trashTypesIncluded: ["Organik", "Anorganik", "B3"],
  },
  {
    id: 6,
    title: "Ban Berjalan Cepat",
    subtitle: "Tantangan Final",
    location: "Zona 6 · Pabrik Daur Ulang",
    description: "Pilah sampah secepat kilat di atas ban berjalan pabrik daur ulang dengan kombo ekstra!",
    targetDescription: "30 sampah dalam waktu 90 detik",
    targetCount: 30,
    durationSeconds: 90,
    icon: "conveyor",
    priority: "P0",
    available: true,
    prerequisiteText: "Selesaikan Misi 1 dan Misi 2 dulu",
    trashTypesIncluded: ["Organik", "Anorganik", "B3"],
  },
];

/**
 * Pure function: calculates stars based on completion and accuracy (PRD 7.6)
 * 1 star = Selesai
 * 2 stars = Selesai & Akurasi >= 75%
 * 3 stars = Selesai & Akurasi >= 90%
 */
export function calculateStars(accuracy: number, isCompleted: boolean): number {
  if (!isCompleted) return 0;
  if (accuracy >= 90) return 3;
  if (accuracy >= 75) return 2;
  return 1;
}

/**
 * Pure function: calculates lock status for each mission based on user progress (PRD 7.4)
 */
export function getMissionStatus(
  missionId: number,
  missionProgressList: MissionProgress[]
): "locked" | "available" | "completed" {
  const existing = missionProgressList.find((m) => m.missionId === missionId);
  if (existing && existing.status === "completed") {
    return "completed";
  }

  // Mission 1 is always unlocked
  if (missionId === 1) {
    return "available";
  }

  const isCompleted = (id: number) => {
    return missionProgressList.some((m) => m.missionId === id && m.status === "completed");
  };

  // Mission 2: requires Mission 1
  if (missionId === 2) {
    return isCompleted(1) ? "available" : "locked";
  }

  // Mission 3: requires Mission 2
  if (missionId === 3) {
    return isCompleted(2) ? "available" : "locked";
  }

  // Mission 5: requires Mission 2
  if (missionId === 5) {
    return isCompleted(2) ? "available" : "locked";
  }

  // Mission 4: requires Mission 3
  if (missionId === 4) {
    return isCompleted(3) ? "available" : "locked";
  }

  // Mission 6: requires Mission 1 and 2 completed
  if (missionId === 6) {
    return isCompleted(1) && isCompleted(2) ? "available" : "locked";
  }

  return "locked";
}

/**
 * Pure function: calculates City Cleanliness Meter (0 - 100%) from completed missions
 */
export function calculateCityCleanlinessMeter(missionProgressList: MissionProgress[]): number {
  const totalMissions = 6;
  let completedCount = 0;
  let bonusStars = 0;

  missionProgressList.forEach((m) => {
    if (m.status === "completed") {
      completedCount++;
      bonusStars += m.stars;
    }
  });

  if (completedCount === 0) return 12; // Base starting point

  // Base progress per completed mission: ~13.5%
  // Star bonuses: up to ~19%
  const base = (completedCount / totalMissions) * 75;
  const starBonus = (bonusStars / (totalMissions * 3)) * 25;
  const total = Math.min(100, Math.round(base + starBonus));
  return total;
}
