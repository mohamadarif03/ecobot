export type UpgradeId = "bag" | "shoes" | "grabber";

export interface UpgradeLevel {
  level: number;
  cost: number;
  effectDescription: string;
}

export interface GameUpgradeConfig {
  id: UpgradeId;
  name: string;
  icon: "bag" | "shoes" | "grabber";
  description: string;
  maxLevel: number;
  levels: Record<number, UpgradeLevel>;
}

export const GAME_UPGRADES: Record<UpgradeId, GameUpgradeConfig> = {
  bag: {
    id: "bag",
    name: "Tas Daur Ulang Besar",
    icon: "bag",
    description: "Tingkatkan kapasitas tas untuk membawa lebih banyak sampah sebelum dibuang ke tong.",
    maxLevel: 3,
    levels: {
      1: { level: 1, cost: 0, effectDescription: "Kapasitas 3 sampah" },
      2: { level: 2, cost: 100, effectDescription: "Kapasitas 5 sampah (+2)" },
      3: { level: 3, cost: 250, effectDescription: "Kapasitas 8 sampah (+3)" },
    },
  },
  shoes: {
    id: "shoes",
    name: "Sepatu Lari Ringan",
    icon: "shoes",
    description: "Sepatu ramah lingkungan bertenaga pegas untuk mempercepat langkah saat menjelajah kota.",
    maxLevel: 3,
    levels: {
      1: { level: 1, cost: 0, effectDescription: "Kecepatan jalan normal (100%)" },
      2: { level: 2, cost: 80, effectDescription: "Kecepatan jalan +15%" },
      3: { level: 3, cost: 200, effectDescription: "Kecepatan jalan +30%" },
    },
  },
  grabber: {
    id: "grabber",
    name: "Penjepit Sampah Panjang",
    icon: "grabber",
    description: "Alat penjepit mekanik agar bisa mengambil sampah dari jarak yang lebih jauh dan aman.",
    maxLevel: 2,
    levels: {
      1: { level: 1, cost: 0, effectDescription: "Jarak jangkau normal (1.5 meter)" },
      2: { level: 2, cost: 150, effectDescription: "Jarak jangkau jauh (+40%)" },
    },
  },
};
