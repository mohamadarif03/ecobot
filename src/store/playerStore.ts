import { useState, useEffect } from "react";
import { PlayerState, ActivityItem } from "../types/player";
import { DEFAULT_MISSIONS, DEFAULT_DAILY_MISSIONS, ALL_BADGES } from "../data/levels";

const STORAGE_KEY = "ecobot_player_state_v1";

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

// Global in-memory cache to sync across components
let globalState: PlayerState = (() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return { ...INITIAL_PLAYER_STATE, ...parsed };
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
    seedSampleData,
    resetData,
  };
}
