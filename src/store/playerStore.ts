import { useState, useEffect } from "react";
import {
  PlayerState,
  ActivityItem,
  PlayerUpgrades,
  CharacterCustomization,
  PlayerSettings,
} from "../types/player";
import { DEFAULT_MISSIONS, DEFAULT_DAILY_MISSIONS, ALL_BADGES } from "../data/levels";
import { GAME_UPGRADES, UpgradeId } from "../data/gameUpgrades";
import {
  calculateStars,
  calculateCityCleanlinessMeter,
  GAME_MISSIONS,
} from "../data/gameMissions";

const STORAGE_KEY = "ecobot_player_state_v1";

export const DEFAULT_UPGRADES: PlayerUpgrades = {
  bag: 1,
  shoes: 1,
  grabber: 1,
};

export const DEFAULT_CHARACTER: CharacterCustomization = {
  skin: "adventurer",
  outfitColor: "#38BDF8",
  accessory: "none",
};

export const INITIAL_PLAYER_STATE: PlayerState = {
  nickname: "Raka", // Default friendly nickname, or empty string if fresh
  avatar: "🤖",
  xp: 0,
  points: 0,
  streak: 1,
  lastActiveDate: new Date().toISOString().split("T")[0],
  activeDays: [new Date().toISOString().split("T")[0]],
  cityCleanlinessMeter: 12,
  missionProgress: DEFAULT_MISSIONS,
  upgrades: DEFAULT_UPGRADES,
  character: DEFAULT_CHARACTER,
  dailyMissions: DEFAULT_DAILY_MISSIONS,
  badges: [],
  activityLog: [],
  stats: {
    trashSorted: 0,
    sortingAccuracy: 0,
    topicsRead: 0,
    quizzesCompleted: 0,
  },
  settings: {
    musicVolume: 80,
    sfxVolume: 80,
    graphicsQuality: "medium",
    language: "id",
    controlMode: "auto",
  },
};

export const SAMPLE_PLAYER_STATE: PlayerState = {
  nickname: "Raka",
  avatar: "🤖",
  xp: 320,
  points: 175,
  streak: 5,
  lastActiveDate: new Date().toISOString().split("T")[0],
  activeDays: (() => {
    const days: string[] = [];
    const today = new Date();
    for (let i = 4; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      days.push(d.toISOString().split("T")[0]);
    }
    return days;
  })(),
  cityCleanlinessMeter: 58,
  missionProgress: [
    { missionId: 1, title: "Taman Kota", location: "Zona 1 - Taman", status: "completed", stars: 3, accuracy: 94, bestScore: 180 },
    { missionId: 2, title: "Pasar Tradisional", location: "Zona 2 - Pasar", status: "available", stars: 1, accuracy: 78, bestScore: 120 },
    { missionId: 3, title: "Tepi Sungai", location: "Zona 3 - Sungai", status: "locked", stars: 0, accuracy: 0, bestScore: 0 },
    { missionId: 4, title: "Tegur Pelaku", location: "Zona 4 - Pemukiman", status: "locked", stars: 0, accuracy: 0, bestScore: 0 },
    { missionId: 5, title: "Bangun Fasilitas", location: "Zona 5 - Bank Sampah", status: "locked", stars: 0, accuracy: 0, bestScore: 0 },
    { missionId: 6, title: "Ban Berjalan Cepat", location: "Zona 6 - Pusat Daur Ulang", status: "locked", stars: 0, accuracy: 0, bestScore: 0 },
  ],
  upgrades: {
    bag: 2,
    shoes: 1,
    grabber: 1,
  },
  character: {
    skin: "adventurer",
    outfitColor: "#38BDF8",
    accessory: "leaf_hat",
  },
  dailyMissions: [
    { id: "dm-1", title: "Pilah 10 Sampah di Game", description: "Bantu Ecobot memilah sampah di Taman Kota", target: 10, current: 10, rewardXp: 30, rewardPoints: 20, claimed: true, type: "game" },
    { id: "dm-2", title: "Baca 1 Materi Pustaka", description: "Buka topik pemilahan sampah organik & anorganik", target: 1, current: 1, rewardXp: 20, rewardPoints: 15, claimed: false, type: "reading" },
    { id: "dm-3", title: "Selesaikan 1 Kuis Harian", description: "Uji pengetahuan lingkunganmu hari ini", target: 1, current: 0, rewardXp: 40, rewardPoints: 25, claimed: false, type: "quiz" },
  ],
  badges: [
    { ...ALL_BADGES[0], unlockedAt: "Hari ini" },
    { ...ALL_BADGES[1], unlockedAt: "Kemarin" },
    { ...ALL_BADGES[4], unlockedAt: "2 hari lalu" },
  ],
  activityLog: [
    { id: "act-1", title: "Menyelesaikan Misi Taman Kota", description: "Meraih 3 bintang dengan akurasi 94%", timestamp: "10 menit lalu", type: "game", xpEarned: 75, pointsEarned: 50 },
    { id: "act-2", title: "Membaca Materi Daur Ulang", description: "Memahami siklus botol plastik dan kertas", timestamp: "1 jam lalu", type: "reading", xpEarned: 20, pointsEarned: 10 },
    { id: "act-3", title: "Mendapatkan Badge 'Si Teliti'", description: "Akurasi pemilahan sampah di atas 90%", timestamp: "Kemarin", type: "badge", xpEarned: 50, pointsEarned: 25 },
    { id: "act-4", title: "Streak Belajar 5 Hari!", description: "Rajin membuka dashboard dan berlatih memilah", timestamp: "Kemarin", type: "streak", xpEarned: 30, pointsEarned: 20 },
  ],
  stats: {
    trashSorted: 42,
    sortingAccuracy: 88,
    topicsRead: 3,
    quizzesCompleted: 4,
  },
  settings: {
    musicVolume: 80,
    sfxVolume: 80,
    graphicsQuality: "medium",
    language: "id",
    controlMode: "auto",
  },
};

// Global in-memory cache to sync across components with safe migrations
let globalState: PlayerState = (() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return {
          ...INITIAL_PLAYER_STATE,
          ...parsed,
          upgrades: { ...DEFAULT_UPGRADES, ...(parsed.upgrades || {}) },
          character: { ...DEFAULT_CHARACTER, ...(parsed.character || {}) },
          settings: { ...INITIAL_PLAYER_STATE.settings, ...(parsed.settings || {}) },
          stats: { ...INITIAL_PLAYER_STATE.stats, ...(parsed.stats || {}) },
        };
      }
    }
  } catch (e) {
    console.error("Failed to read from localStorage", e);
  }
  return INITIAL_PLAYER_STATE;
})();

const listeners = new Set<(state: PlayerState) => void>();

function notify() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(globalState));
  } catch (e) {
    console.error("Failed to write to localStorage", e);
  }
  listeners.forEach((listener) => listener(globalState));
}

export function getPlayerState(): PlayerState {
  return globalState;
}

export function setPlayerState(updater: (prev: PlayerState) => PlayerState) {
  globalState = updater(globalState);
  notify();
}

export function usePlayerStore() {
  const [state, setState] = useState<PlayerState>(globalState);

  useEffect(() => {
    const handleUpdate = (newState: PlayerState) => setState(newState);
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  const setNickname = (nickname: string, avatar?: string) => {
    setPlayerState((prev) => ({
      ...prev,
      nickname,
      ...(avatar ? { avatar } : {}),
    }));
  };

  const addXp = (amount: number, reason: string) => {
    setPlayerState((prev) => {
      const newXp = prev.xp + amount;
      const newActivity: ActivityItem = {
        id: "act-" + Date.now(),
        title: reason,
        description: `Mendapatkan +${amount} XP`,
        timestamp: "Baru saja",
        type: "game",
        xpEarned: amount,
        pointsEarned: 0,
      };
      return {
        ...prev,
        xp: newXp,
        activityLog: [newActivity, ...prev.activityLog].slice(0, 20),
      };
    });
  };

  const addPoints = (amount: number) => {
    setPlayerState((prev) => ({
      ...prev,
      points: Math.max(0, prev.points + amount),
    }));
  };

  const updateStreak = () => {
    const today = new Date().toISOString().split("T")[0];
    setPlayerState((prev) => {
      if (prev.lastActiveDate === today) {
        return prev;
      }

      const lastDate = new Date(prev.lastActiveDate);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let newStreak = prev.streak;
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }

      const newActiveDays = prev.activeDays.includes(today)
        ? prev.activeDays
        : [...prev.activeDays, today].slice(-14);

      return {
        ...prev,
        streak: newStreak,
        lastActiveDate: today,
        activeDays: newActiveDays,
      };
    });
  };

  const claimDailyMission = (id: string) => {
    setPlayerState((prev) => {
      const mission = prev.dailyMissions.find((m) => m.id === id);
      if (!mission || mission.claimed || mission.current < mission.target) {
        return prev;
      }

      const updatedMissions = prev.dailyMissions.map((m) =>
        m.id === id ? { ...m, claimed: true } : m
      );

      const newActivity: ActivityItem = {
        id: "act-" + Date.now(),
        title: `Klaim Hadiah: ${mission.title}`,
        description: `Mendapatkan +${mission.rewardXp} XP dan +${mission.rewardPoints} Poin!`,
        timestamp: "Baru saja",
        type: "streak",
        xpEarned: mission.rewardXp,
        pointsEarned: mission.rewardPoints,
      };

      return {
        ...prev,
        xp: prev.xp + mission.rewardXp,
        points: prev.points + mission.rewardPoints,
        dailyMissions: updatedMissions,
        activityLog: [newActivity, ...prev.activityLog].slice(0, 20),
      };
    });
  };

  const unlockBadge = (badgeId: string) => {
    setPlayerState((prev) => {
      if (prev.badges.some((b) => b.id === badgeId)) return prev;
      const targetBadge = ALL_BADGES.find((b) => b.id === badgeId);
      if (!targetBadge) return prev;

      const newBadge = { ...targetBadge, unlockedAt: "Baru saja" };
      const newActivity: ActivityItem = {
        id: "act-" + Date.now(),
        title: `Membuka Badge: ${targetBadge.name}`,
        description: targetBadge.description,
        timestamp: "Baru saja",
        type: "badge",
        xpEarned: 50,
        pointsEarned: 30,
      };

      return {
        ...prev,
        xp: prev.xp + 50,
        points: prev.points + 30,
        badges: [newBadge, ...prev.badges],
        activityLog: [newActivity, ...prev.activityLog].slice(0, 20),
      };
    });
  };

  const setCharacter = (customization: Partial<CharacterCustomization>) => {
    setPlayerState((prev) => ({
      ...prev,
      character: {
        ...prev.character,
        ...customization,
      },
    }));
  };

  const purchaseUpgrade = (upgradeId: UpgradeId): boolean => {
    const config = GAME_UPGRADES[upgradeId];
    if (!config) return false;

    let success = false;
    setPlayerState((prev) => {
      const currentLevel = prev.upgrades[upgradeId] || 1;
      if (currentLevel >= config.maxLevel) return prev;

      const nextLevel = currentLevel + 1;
      const cost = config.levels[nextLevel]?.cost || 0;

      if (prev.points < cost) return prev;

      success = true;
      const newActivity: ActivityItem = {
        id: "act-" + Date.now(),
        title: `Upgrade ${config.name}`,
        description: `Berhasil ditingkatkan ke Level ${nextLevel} (-${cost} poin)`,
        timestamp: "Baru saja",
        type: "game",
        xpEarned: 15,
        pointsEarned: -cost,
      };

      return {
        ...prev,
        points: prev.points - cost,
        xp: prev.xp + 15,
        upgrades: {
          ...prev.upgrades,
          [upgradeId]: nextLevel,
        },
        activityLog: [newActivity, ...prev.activityLog].slice(0, 25),
      };
    });

    return success;
  };

  const completeMission = (result: {
    missionId: number;
    accuracy: number;
    timeSeconds: number;
    score: number;
  }) => {
    let earnedStars = 0;
    let xpGain = 0;
    let pointsGain = 0;
    const newlyUnlockedBadgeIds: string[] = [];

    setPlayerState((prev) => {
      earnedStars = calculateStars(result.accuracy, true);
      // XP: +50 for mission completed, bonus +25 per star above 1 (PRD 8.1)
      xpGain = 50 + Math.max(0, earnedStars - 1) * 25;
      pointsGain = Math.max(0, result.score);

      const targetMissionConfig = GAME_MISSIONS.find((m) => m.id === result.missionId);
      const missionTitle = targetMissionConfig?.title || `Misi ${result.missionId}`;

      // Update missionProgress
      const existingMission = prev.missionProgress.find((m) => m.missionId === result.missionId);
      const bestStars = existingMission ? Math.max(existingMission.stars, earnedStars) : earnedStars;
      const bestScore = existingMission ? Math.max(existingMission.bestScore, result.score) : result.score;
      const bestAccuracy = existingMission ? Math.max(existingMission.accuracy, result.accuracy) : result.accuracy;

      let updatedMissions = prev.missionProgress.map((m) => {
        if (m.missionId === result.missionId) {
          return {
            ...m,
            status: "completed" as const,
            stars: bestStars,
            bestScore: bestScore,
            accuracy: bestAccuracy,
          };
        }
        return m;
      });

      // Update unlock status for subsequent missions based on rules:
      const isM1Done = updatedMissions.some((m) => m.missionId === 1 && m.status === "completed");
      const isM2Done = updatedMissions.some((m) => m.missionId === 2 && m.status === "completed");
      const isM3Done = updatedMissions.some((m) => m.missionId === 3 && m.status === "completed");

      updatedMissions = updatedMissions.map((m) => {
        if (m.status === "completed") return m;
        if (m.missionId === 2 && isM1Done) return { ...m, status: "available" as const };
        if (m.missionId === 3 && isM2Done) return { ...m, status: "available" as const };
        if (m.missionId === 5 && isM2Done) return { ...m, status: "available" as const };
        if (m.missionId === 4 && isM3Done) return { ...m, status: "available" as const };
        if (m.missionId === 6 && isM1Done && isM2Done) return { ...m, status: "available" as const };
        return m;
      });

      // Calculate city meter
      const newCityMeter = calculateCityCleanlinessMeter(updatedMissions);

      // Check badges (PRD 8.3)
      const badgesToGrant: typeof prev.badges = [];
      const hasBadge = (id: string) => prev.badges.some((b) => b.id === id);

      // Pemilah Cilik: Selesaikan Misi 1
      if (result.missionId === 1 && !hasBadge("pemilah-cilik")) {
        const b = ALL_BADGES.find((x) => x.id === "pemilah-cilik");
        if (b) {
          badgesToGrant.push({ ...b, unlockedAt: "Baru saja" });
          newlyUnlockedBadgeIds.push("pemilah-cilik");
        }
      }

      // Si Teliti: Akurasi >= 90%
      if (result.accuracy >= 90 && !hasBadge("si-teliti")) {
        const b = ALL_BADGES.find((x) => x.id === "si-teliti");
        if (b) {
          badgesToGrant.push({ ...b, unlockedAt: "Baru saja" });
          newlyUnlockedBadgeIds.push("si-teliti");
        }
      }

      // Penjaga Sungai: Selesaikan Misi 3
      if (result.missionId === 3 && !hasBadge("penjaga-sungai")) {
        const b = ALL_BADGES.find((x) => x.id === "penjaga-sungai");
        if (b) {
          badgesToGrant.push({ ...b, unlockedAt: "Baru saja" });
          newlyUnlockedBadgeIds.push("penjaga-sungai");
        }
      }

      // Kota Bersih: Meter 100%
      if (newCityMeter >= 100 && !hasBadge("kota-bersih")) {
        const b = ALL_BADGES.find((x) => x.id === "kota-bersih");
        if (b) {
          badgesToGrant.push({ ...b, unlockedAt: "Baru saja" });
          newlyUnlockedBadgeIds.push("kota-bersih");
        }
      }

      // Raja Combo: Misi 6 dengan akurasi >= 85%
      if (result.missionId === 6 && result.accuracy >= 85 && !hasBadge("raja-combo")) {
        const b = ALL_BADGES.find((x) => x.id === "raja-combo");
        if (b) {
          badgesToGrant.push({ ...b, unlockedAt: "Baru saja" });
          newlyUnlockedBadgeIds.push("raja-combo");
        }
      }

      // Activity log item
      const newActivity: ActivityItem = {
        id: "act-" + Date.now(),
        title: `Menyelesaikan ${missionTitle}`,
        description: `Meraih ${earnedStars} bintang dengan akurasi ${result.accuracy}%`,
        timestamp: "Baru saja",
        type: "game",
        xpEarned: xpGain,
        pointsEarned: pointsGain,
      };

      // Daily missions progress for type "game"
      const updatedDailyMissions = prev.dailyMissions.map((dm) => {
        if (dm.type === "game" && !dm.claimed) {
          return {
            ...dm,
            current: Math.min(dm.target, dm.current + (targetMissionConfig?.targetCount || 8)),
          };
        }
        return dm;
      });

      // Update stats
      const itemsCount = targetMissionConfig?.targetCount || 8;
      const prevTotalSorted = prev.stats.trashSorted;
      const newTotalSorted = prevTotalSorted + itemsCount;
      const newOverallAccuracy =
        newTotalSorted > 0
          ? Math.round(
              (prev.stats.sortingAccuracy * prevTotalSorted + result.accuracy * itemsCount) /
                newTotalSorted
            )
          : result.accuracy;

      return {
        ...prev,
        xp: prev.xp + xpGain,
        points: prev.points + pointsGain,
        missionProgress: updatedMissions,
        cityCleanlinessMeter: newCityMeter,
        badges: [...badgesToGrant, ...prev.badges],
        dailyMissions: updatedDailyMissions,
        stats: {
          ...prev.stats,
          trashSorted: newTotalSorted,
          sortingAccuracy: newOverallAccuracy,
        },
        activityLog: [newActivity, ...prev.activityLog].slice(0, 25),
      };
    });

    return {
      stars: earnedStars,
      xpEarned: xpGain,
      pointsEarned: pointsGain,
      newBadges: newlyUnlockedBadgeIds,
    };
  };

  const resetGameProgress = () => {
    setPlayerState((prev) => ({
      ...prev,
      missionProgress: DEFAULT_MISSIONS,
      upgrades: DEFAULT_UPGRADES,
      cityCleanlinessMeter: 12,
      activityLog: [
        {
          id: "act-" + Date.now(),
          title: "Mulai Petualangan Baru",
          description: "Progres misi dan upgrade kota di-reset kembali ke awal",
          timestamp: "Baru saja",
          type: "game" as const,
          xpEarned: 0,
          pointsEarned: 0,
        },
        ...prev.activityLog,
      ].slice(0, 25),
    }));
  };

  const updateSettings = (newSettings: Partial<PlayerSettings>) => {
    setPlayerState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings,
      },
    }));
  };

  const seedSampleData = () => {
    setPlayerState(() => SAMPLE_PLAYER_STATE);
  };

  const resetData = () => {
    setPlayerState(() => INITIAL_PLAYER_STATE);
  };

  return {
    state,
    setNickname,
    addXp,
    addPoints,
    updateStreak,
    claimDailyMission,
    unlockBadge,
    setCharacter,
    purchaseUpgrade,
    completeMission,
    resetGameProgress,
    updateSettings,
    seedSampleData,
    resetData,
  };
}
