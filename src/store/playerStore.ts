import { useState, useEffect } from "react";
import type {
  PlayerState,
  ActivityItem,
  PlayerUpgrades,
  CharacterCustomization,
  PlayerSettings,
  MissionState,
  ClaimHistoryItem,
  UniqueEventSets,
  DailyMission,
  TopicReadingProgress,
  QuizProgress,
  QuizHistoryItem,
  AksiNyataState,
  ChallengeDayRecord,
  CalculatorHistoryItem,
  AchievementsState,
} from "../types/player.ts";
import { DEFAULT_MISSIONS, ALL_BADGES, calculateLevel } from "../data/levels.ts";
import { GAME_UPGRADES, type UpgradeId } from "../data/gameUpgrades.ts";
import {
  calculateStars,
  calculateCityCleanlinessMeter,
  GAME_MISSIONS,
} from "../data/gameMissions.ts";
import {
  DAILY_MISSION_POOL,
  WEEKLY_MISSIONS,
  MAIN_MILESTONE_MISSIONS,
  CHEST_REWARDS,
  type MissionDefinition,
  type MissionType,
  getDailyMissionsForDate,
  getLocalDateKey,
  getLocalWeekKey,
} from "../data/missions.ts";
import { PUSTAKA_TOPICS } from "../data/pustaka/topics.ts";
import { QUIZ_TOPICS } from "../data/kuis/topics.ts";
import { CHALLENGE_TASKS } from "../data/aksiNyata/challenge.ts";
import { getHabitLevel } from "../data/aksiNyata/calculator.ts";
import { BADGE_DEFINITIONS } from "../data/pencapaian/badges.ts";
import { FACT_CARDS } from "../data/pencapaian/factCards.ts";
import { CERTIFICATE_DEFINITIONS } from "../data/pencapaian/certificates.ts";
import type {
  BadgeDefinition,
  FactCardDefinition,
} from "../data/pencapaian/types.ts";
import {
  evaluateAchievements,
  calculateRadarScores,
  generateCertificateSerial,
} from "../game/achievements/engine.ts";

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

export const DEFAULT_QUIZ_PROGRESS: QuizProgress = {
  harian: {
    dateKey: getLocalDateKey(),
    completed: false,
    score: 0,
    total: 5,
    stars: 0,
  },
  topik: {},
  history: [],
  stats: {
    totalQuizzes: 0,
    totalCorrect: 0,
    totalAnswered: 0,
    perfectCount: 0,
  },
  duelBest: 0,
};

export const DEFAULT_AKSI_NYATA: AksiNyataState = {
  challenge: {
    rounds: 0,
    current: {
      startedAt: null,
      days: {},
      completedAt: null,
      rewardClaimed: false,
    },
  },
  calculator: {
    lastDateKey: null,
    rewardClaimedDateKey: null,
    history: [],
  },
  ideas: {},
};

export const DEFAULT_ACHIEVEMENTS: AchievementsState = {
  badges: {},
  cards: {},
  certificates: {},
};

/**
 * Creates a clean default MissionState for a given date
 */
export function createDefaultMissionState(date = new Date()): MissionState {
  const dateKey = getLocalDateKey(date);
  const weekKey = getLocalWeekKey(date);
  const dailyDefs = getDailyMissionsForDate(dateKey);

  const dailyProgress: Record<string, number> = {};
  const dailyClaimed: Record<string, boolean> = {};
  dailyDefs.forEach((d) => {
    dailyProgress[d.id] = 0;
    dailyClaimed[d.id] = false;
  });

  const weeklyProgress: Record<string, number> = {};
  const weeklyClaimed: Record<string, boolean> = {};
  WEEKLY_MISSIONS.forEach((w) => {
    weeklyProgress[w.id] = 0;
    weeklyClaimed[w.id] = false;
  });

  const utamaProgress: Record<string, number> = {};
  const utamaClaimed: Record<string, boolean> = {};
  MAIN_MILESTONE_MISSIONS.forEach((u) => {
    utamaProgress[u.id] = 0;
    utamaClaimed[u.id] = false;
  });

  return {
    harian: {
      dateKey,
      missionIds: dailyDefs.map((d) => d.id),
      progress: dailyProgress,
      claimed: dailyClaimed,
      chestClaimed: false,
    },
    mingguan: {
      weekKey,
      missionIds: WEEKLY_MISSIONS.map((w) => w.id),
      progress: weeklyProgress,
      claimed: weeklyClaimed,
      chestClaimed: false,
    },
    utama: {
      progress: utamaProgress,
      claimed: utamaClaimed,
    },
  };
}

/**
 * Synchronizes the legacy dailyMissions array from missionState.harian
 */
export function syncDailyMissionsArray(missionState: MissionState): DailyMission[] {
  const dailyDefs = DAILY_MISSION_POOL.filter((d) =>
    missionState.harian.missionIds.includes(d.id)
  );

  return dailyDefs.map((def) => ({
    id: def.id,
    title: def.judul,
    description: def.deskripsi,
    target: def.target,
    current: missionState.harian.progress[def.id] || 0,
    rewardXp: def.xp,
    rewardPoints: def.poin,
    claimed: Boolean(missionState.harian.claimed[def.id]),
    type: def.kategori === "baca" ? "reading" : def.kategori === "kuis" ? "quiz" : "game",
  }));
}

/**
 * Pure check to apply daily & weekly resets
 */
export function checkAndApplyResets(prev: PlayerState, currentDate = new Date()): PlayerState {
  const effectiveDate = new Date(currentDate);
  if (prev.simulatedDateOffsetDays) {
    effectiveDate.setDate(effectiveDate.getDate() + prev.simulatedDateOffsetDays);
  }

  const currentDateKey = getLocalDateKey(effectiveDate);
  const currentWeekKey = getLocalWeekKey(effectiveDate);

  const currentMissionState = prev.missionState || createDefaultMissionState(effectiveDate);
  let needsUpdate = false;

  let newHarian = currentMissionState.harian;
  if (!newHarian || newHarian.dateKey !== currentDateKey) {
    needsUpdate = true;
    const dailyDefs = getDailyMissionsForDate(currentDateKey);
    const progress: Record<string, number> = {};
    const claimed: Record<string, boolean> = {};
    dailyDefs.forEach((d) => {
      progress[d.id] = 0;
      claimed[d.id] = false;
    });

    newHarian = {
      dateKey: currentDateKey,
      missionIds: dailyDefs.map((d) => d.id),
      progress,
      claimed,
      chestClaimed: false,
    };
  }

  let newMingguan = currentMissionState.mingguan;
  if (!newMingguan || newMingguan.weekKey !== currentWeekKey) {
    needsUpdate = true;
    const progress: Record<string, number> = {};
    const claimed: Record<string, boolean> = {};
    WEEKLY_MISSIONS.forEach((w) => {
      progress[w.id] = 0;
      claimed[w.id] = false;
    });

    newMingguan = {
      weekKey: currentWeekKey,
      missionIds: WEEKLY_MISSIONS.map((w) => w.id),
      progress,
      claimed,
      chestClaimed: false,
    };
  }

  // Quiz daily reset
  const currentQuizProgress = prev.quizProgress || DEFAULT_QUIZ_PROGRESS;
  let newQuizHarian = currentQuizProgress.harian;
  if (!newQuizHarian || newQuizHarian.dateKey !== currentDateKey) {
    needsUpdate = true;
    newQuizHarian = {
      dateKey: currentDateKey,
      completed: false,
      score: 0,
      total: 5,
      stars: 0,
    };
  }

  const updatedMissionState: MissionState = {
    harian: newHarian,
    mingguan: newMingguan,
    utama: currentMissionState.utama || { progress: {}, claimed: {} },
  };

  const updatedQuizProgress: QuizProgress = {
    ...currentQuizProgress,
    harian: newQuizHarian,
    topik: currentQuizProgress.topik || {},
    history: currentQuizProgress.history || [],
    stats: currentQuizProgress.stats || {
      totalQuizzes: 0,
      totalCorrect: 0,
      totalAnswered: 0,
      perfectCount: 0,
    },
  };

  if (needsUpdate || !prev.missionState || !prev.quizProgress) {
    return {
      ...prev,
      missionState: updatedMissionState,
      dailyMissions: syncDailyMissionsArray(updatedMissionState),
      quizProgress: updatedQuizProgress,
      contentProgress: prev.contentProgress || {},
      uniqueSets: prev.uniqueSets || { topicsRead: [], perfectQuizzes: [] },
      claimHistory: prev.claimHistory || [],
    };
  }

  return prev;
}

export const INITIAL_PLAYER_STATE: PlayerState = (() => {
  const defaultMissionState = createDefaultMissionState();
  return {
    nickname: "Raka",
    avatar: "🤖",
    xp: 0,
    points: 0,
    streak: 1,
    lastActiveDate: getLocalDateKey(),
    activeDays: [getLocalDateKey()],
    cityCleanlinessMeter: 12,
    missionProgress: DEFAULT_MISSIONS,
    upgrades: DEFAULT_UPGRADES,
    character: DEFAULT_CHARACTER,
    missionState: defaultMissionState,
    dailyMissions: syncDailyMissionsArray(defaultMissionState),
    claimHistory: [],
    uniqueSets: {
      topicsRead: [],
      perfectQuizzes: [],
    },
    contentProgress: {},
    quizProgress: DEFAULT_QUIZ_PROGRESS,
    aksiNyata: DEFAULT_AKSI_NYATA,
    achievements: DEFAULT_ACHIEVEMENTS,
    simulatedDateOffsetDays: 0,
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
})();

export const SAMPLE_PLAYER_STATE: PlayerState = (() => {
  const sampleMissionState = createDefaultMissionState();
  // Mark one sample mission completed & ready to claim
  const firstDailyId = sampleMissionState.harian.missionIds[0];
  const secondDailyId = sampleMissionState.harian.missionIds[1];
  if (firstDailyId) {
    sampleMissionState.harian.progress[firstDailyId] = 10;
    sampleMissionState.harian.claimed[firstDailyId] = true;
  }
  if (secondDailyId) {
    sampleMissionState.harian.progress[secondDailyId] = 1;
    sampleMissionState.harian.claimed[secondDailyId] = false;
  }

  return {
    nickname: "Raka",
    avatar: "🤖",
    xp: 320,
    points: 175,
    streak: 5,
    lastActiveDate: getLocalDateKey(),
    activeDays: (() => {
      const days: string[] = [];
      const today = new Date();
      for (let i = 4; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        days.push(getLocalDateKey(d));
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
    missionState: sampleMissionState,
    dailyMissions: syncDailyMissionsArray(sampleMissionState),
    claimHistory: [
      {
        id: "ch-sample-1",
        missionId: firstDailyId || "h-pilah-10",
        title: "Pilah 10 Sampah di Game",
        xp: 30,
        poin: 20,
        at: "Hari ini",
      },
    ],
    uniqueSets: {
      topicsRead: ["jenis-sampah", "cara-memilah", "daur-ulang"],
      perfectQuizzes: ["quiz-jenis-sampah"],
    },
    contentProgress: {
      "jenis-sampah": {
        cardIndex: 7,
        viewedCards: ["js-1", "js-2", "js-3", "js-4", "js-5", "js-6", "js-7", "js-8"],
        completed: true,
        completedAt: "Hari ini",
        rewardClaimed: true,
      },
      "cara-memilah": {
        cardIndex: 3,
        viewedCards: ["cm-1", "cm-2", "cm-3", "cm-4"],
        completed: false,
      },
    },
    quizProgress: {
      harian: {
        dateKey: getLocalDateKey(),
        completed: true,
        score: 4,
        total: 5,
        stars: 2,
      },
      topik: {
        "quiz-jenis-sampah": {
          bestScore: 5,
          bestStars: 3,
          attempts: 2,
          firstCompleted: true,
          perfectClaimed: true,
        },
        "quiz-cara-memilah": {
          bestScore: 4,
          bestStars: 2,
          attempts: 1,
          firstCompleted: true,
          perfectClaimed: false,
        },
      },
      history: [
        {
          id: "qh-sample-1",
          mode: "harian",
          topicTitle: "Kuis Harian",
          score: 4,
          total: 5,
          stars: 2,
          xpEarned: 40,
          pointsEarned: 15,
          at: "Hari ini",
        },
        {
          id: "qh-sample-2",
          mode: "topik",
          topikId: "quiz-jenis-sampah",
          topicTitle: "Kenalan dengan Jenis Sampah",
          score: 5,
          total: 5,
          stars: 3,
          xpEarned: 40,
          pointsEarned: 10,
          at: "Kemarin",
        },
      ],
      stats: {
        totalQuizzes: 3,
        totalCorrect: 13,
        totalAnswered: 15,
        perfectCount: 1,
      },
      duelBest: 80,
    },
    aksiNyata: DEFAULT_AKSI_NYATA,
    achievements: {
      badges: {
        "pemilah-cilik": { unlockedAt: "Hari ini", seen: true },
        "si-teliti": { unlockedAt: "Kemarin", seen: true },
        "pembaca-rajin": { unlockedAt: "2 hari lalu", seen: true },
      },
      cards: {
        "card-misi-taman": { unlockedAt: "Hari ini", seen: true },
        "card-organik-cepat": { unlockedAt: "Kemarin", seen: true },
      },
      certificates: {},
    },
    simulatedDateOffsetDays: 0,
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
})();

// =========================================================================
// CENTRALIZED ACHIEVEMENTS ENGINE INTEGRATION
// =========================================================================

type AchievementToastListener = (badge: BadgeDefinition) => void;
const achievementToastListeners = new Set<AchievementToastListener>();

export function onNewAchievementUnlocked(listener: AchievementToastListener) {
  achievementToastListeners.add(listener);
  return () => {
    achievementToastListeners.delete(listener);
  };
}

export function syncAchievements(state: PlayerState): {
  nextState: PlayerState;
  newlyUnlockedBadges: BadgeDefinition[];
  newlyUnlockedCards: FactCardDefinition[];
} {
  const { newBadges, newCards } = evaluateAchievements(state);
  if (newBadges.length === 0 && newCards.length === 0) {
    return { nextState: state, newlyUnlockedBadges: [], newlyUnlockedCards: [] };
  }

  const currentAch = state.achievements || DEFAULT_ACHIEVEMENTS;
  const updatedBadges = { ...(currentAch.badges || {}) };
  const updatedCards = { ...(currentAch.cards || {}) };
  const newActivities: ActivityItem[] = [];
  const legacyBadges = [...(state.badges || [])];

  const dateStr = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  newBadges.forEach((b) => {
    updatedBadges[b.id] = {
      unlockedAt: dateStr,
      seen: false,
    };

    newActivities.push({
      id: "act-badge-" + b.id + "-" + Date.now(),
      title: `Meraih Badge: ${b.nama}`,
      description: b.deskripsi,
      timestamp: "Baru saja",
      type: "badge",
      xpEarned: 50,
      pointsEarned: 25,
    });

    if (!legacyBadges.some((x) => x.id === b.id)) {
      legacyBadges.push({
        id: b.id,
        name: b.nama,
        description: b.deskripsi,
        icon: b.ikon,
        unlockedAt: "Baru saja",
      });
    }

    // Trigger toast notification
    if (typeof window !== "undefined") {
      setTimeout(() => {
        achievementToastListeners.forEach((fn) => fn(b));
      }, 50);
    }
  });

  newCards.forEach((c) => {
    updatedCards[c.id] = {
      unlockedAt: dateStr,
      seen: false,
    };
  });

  let nextState: PlayerState = {
    ...state,
    badges: legacyBadges,
    activityLog: [...newActivities, ...state.activityLog].slice(0, 25),
    achievements: {
      badges: updatedBadges,
      cards: updatedCards,
      certificates: currentAch.certificates || {},
    },
  };

  return {
    nextState,
    newlyUnlockedBadges: newBadges,
    newlyUnlockedCards: newCards,
  };
}

// Global in-memory cache to sync across components with safe migrations
let globalState: PlayerState = (() => {
  try {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          // Safe migration for achievements
          const legacyBadges = parsed.badges || [];
          const initialAchievements: AchievementsState = parsed.achievements || {
            badges: {},
            cards: {},
            certificates: {},
          };

          if (!parsed.achievements && legacyBadges.length > 0) {
            legacyBadges.forEach((b: any) => {
              initialAchievements.badges[b.id] = {
                unlockedAt: b.unlockedAt || "Hari ini",
                seen: true,
              };
            });
          }

          const migrated = checkAndApplyResets({
            ...INITIAL_PLAYER_STATE,
            ...parsed,
            missionState: parsed.missionState || createDefaultMissionState(),
            claimHistory: parsed.claimHistory || [],
            uniqueSets: parsed.uniqueSets || { topicsRead: [], perfectQuizzes: [] },
            contentProgress: parsed.contentProgress || {},
            quizProgress: parsed.quizProgress || DEFAULT_QUIZ_PROGRESS,
            aksiNyata: parsed.aksiNyata || DEFAULT_AKSI_NYATA,
            achievements: initialAchievements,
            simulatedDateOffsetDays: parsed.simulatedDateOffsetDays || 0,
            upgrades: { ...DEFAULT_UPGRADES, ...(parsed.upgrades || {}) },
            character: { ...DEFAULT_CHARACTER, ...(parsed.character || {}) },
            settings: { ...INITIAL_PLAYER_STATE.settings, ...(parsed.settings || {}) },
            stats: { ...INITIAL_PLAYER_STATE.stats, ...(parsed.stats || {}) },
          });

          // Run sync achievements on loaded state
          return syncAchievements(migrated).nextState;
        }
      }
    }
  } catch (e) {
    console.error("Failed to read from localStorage", e);
  }
  return syncAchievements(INITIAL_PLAYER_STATE).nextState;
})();

const listeners = new Set<(state: PlayerState) => void>();

function notify() {
  try {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(globalState));
    }
  } catch (e) {
    console.error("Failed to write to localStorage", e);
  }
  listeners.forEach((listener) => listener(globalState));
}

export function getPlayerState(): PlayerState {
  return globalState;
}

export function setPlayerState(updater: (prev: PlayerState) => PlayerState) {
  const updated = updater(globalState);
  const { nextState } = syncAchievements(updated);
  globalState = nextState;
  notify();
}

/**
 * Dispatch event to advance active missions (PRD 6.3)
 */
export function dispatchRecordEvent(
  prev: PlayerState,
  eventName: string,
  payload?: { amount?: number; id?: string }
): PlayerState {
  const stateWithReset = checkAndApplyResets(prev);
  const amount = payload?.amount ?? 1;

  // 1. Handle unique event tracking
  const uniqueSets: UniqueEventSets = {
    topicsRead: [...(stateWithReset.uniqueSets?.topicsRead || [])],
    perfectQuizzes: [...(stateWithReset.uniqueSets?.perfectQuizzes || [])],
  };

  if (eventName === "materi_dibaca_unik" && payload?.id) {
    if (!uniqueSets.topicsRead.includes(payload.id)) {
      uniqueSets.topicsRead.push(payload.id);
    }
  }

  if (eventName === "kuis_sempurna" && payload?.id) {
    if (!uniqueSets.perfectQuizzes.includes(payload.id)) {
      uniqueSets.perfectQuizzes.push(payload.id);
    }
  }

  const currentLevel = calculateLevel(stateWithReset.xp).level;
  const currentStreak = stateWithReset.streak;
  const currentMeter = stateWithReset.cityCleanlinessMeter;

  const ms = stateWithReset.missionState;

  // 2. Update Harian
  const newHarianProgress = { ...ms.harian.progress };
  ms.harian.missionIds.forEach((mId) => {
    const def = DAILY_MISSION_POOL.find((d) => d.id === mId);
    if (!def) return;

    if (def.event === eventName) {
      newHarianProgress[mId] = Math.min(def.target, (newHarianProgress[mId] || 0) + amount);
    }
  });

  // 3. Update Mingguan
  const newMingguanProgress = { ...ms.mingguan.progress };
  ms.mingguan.missionIds.forEach((mId) => {
    const def = WEEKLY_MISSIONS.find((w) => w.id === mId);
    if (!def) return;

    if (def.event === eventName) {
      if (eventName === "materi_dibaca_unik") {
        newMingguanProgress[mId] = Math.min(def.target, uniqueSets.topicsRead.length);
      } else {
        newMingguanProgress[mId] = Math.min(
          def.target,
          (newMingguanProgress[mId] || 0) + amount
        );
      }
    }
  });

  // 4. Update Utama
  const newUtamaProgress = { ...ms.utama.progress };
  MAIN_MILESTONE_MISSIONS.forEach((def) => {
    if (def.event === "level_tercapai") {
      newUtamaProgress[def.id] = Math.min(def.target, currentLevel);
    } else if (def.event === "streak_maks") {
      newUtamaProgress[def.id] = Math.min(def.target, currentStreak);
    } else if (def.event === "meter_kota") {
      newUtamaProgress[def.id] = Math.min(def.target, currentMeter);
    } else if (def.event === "materi_dibaca_unik") {
      newUtamaProgress[def.id] = Math.min(def.target, uniqueSets.topicsRead.length);
    } else if (def.event === "kuis_sempurna") {
      newUtamaProgress[def.id] = Math.min(def.target, uniqueSets.perfectQuizzes.length);
    } else if (def.event === eventName) {
      newUtamaProgress[def.id] = Math.min(
        def.target,
        (newUtamaProgress[def.id] || 0) + amount
      );
    }
  });

  const updatedMissionState: MissionState = {
    harian: {
      ...ms.harian,
      progress: newHarianProgress,
    },
    mingguan: {
      ...ms.mingguan,
      progress: newMingguanProgress,
    },
    utama: {
      ...ms.utama,
      progress: newUtamaProgress,
    },
  };

  return {
    ...stateWithReset,
    missionState: updatedMissionState,
    dailyMissions: syncDailyMissionsArray(updatedMissionState),
    uniqueSets,
  };
}

export interface MissionWithStatus extends MissionDefinition {
  current: number;
  target: number;
  isReadyToClaim: boolean;
  isClaimed: boolean;
  status: "berjalan" | "siap" | "diklaim";
}

/**
 * Returns missions for a specific tab with status and sorted
 */
export function getMissionsWithStatus(
  state: PlayerState,
  type: MissionType
): MissionWithStatus[] {
  const ms = state.missionState;
  let defs: MissionDefinition[] = [];
  let progressRecord: Record<string, number> = {};
  let claimedRecord: Record<string, boolean> = {};

  if (type === "harian") {
    defs = DAILY_MISSION_POOL.filter((d) => ms.harian.missionIds.includes(d.id));
    progressRecord = ms.harian.progress;
    claimedRecord = ms.harian.claimed;
  } else if (type === "mingguan") {
    defs = WEEKLY_MISSIONS.filter((w) => ms.mingguan.missionIds.includes(w.id));
    progressRecord = ms.mingguan.progress;
    claimedRecord = ms.mingguan.claimed;
  } else {
    defs = MAIN_MILESTONE_MISSIONS;
    progressRecord = ms.utama.progress;
    claimedRecord = ms.utama.claimed;
  }

  const items: MissionWithStatus[] = defs.map((def) => {
    let current = progressRecord[def.id] || 0;

    if (def.event === "level_tercapai") {
      current = calculateLevel(state.xp).level;
    } else if (def.event === "streak_maks") {
      current = state.streak;
    } else if (def.event === "meter_kota") {
      current = state.cityCleanlinessMeter;
    } else if (def.event === "materi_dibaca_unik") {
      current = state.uniqueSets?.topicsRead?.length || 0;
    } else if (def.event === "kuis_sempurna") {
      current = state.uniqueSets?.perfectQuizzes?.length || 0;
    }

    const isClaimed = Boolean(claimedRecord[def.id]);
    const isReadyToClaim = !isClaimed && current >= def.target;
    const status: "berjalan" | "siap" | "diklaim" = isClaimed
      ? "diklaim"
      : isReadyToClaim
      ? "siap"
      : "berjalan";

    return {
      ...def,
      current: Math.min(def.target, current),
      isReadyToClaim,
      isClaimed,
      status,
    };
  });

  return items.sort((a, b) => {
    const score = (status: "berjalan" | "siap" | "diklaim") =>
      status === "siap" ? 0 : status === "berjalan" ? 1 : 2;
    return score(a.status) - score(b.status);
  });
}

/**
 * Counts claimable items (missions and chests) across all tabs
 */
export function selectClaimableCount(state: PlayerState): number {
  const counts = selectClaimableCountByTab(state);
  return counts.harian + counts.mingguan + counts.utama;
}

/**
 * Counts claimable items separated by tab
 */
export function selectClaimableCountByTab(state: PlayerState): {
  harian: number;
  mingguan: number;
  utama: number;
} {
  const harianList = getMissionsWithStatus(state, "harian");
  const mingguanList = getMissionsWithStatus(state, "mingguan");
  const utamaList = getMissionsWithStatus(state, "utama");

  let harianCount = harianList.filter((m) => m.isReadyToClaim).length;
  let mingguanCount = mingguanList.filter((m) => m.isReadyToClaim).length;
  const utamaCount = utamaList.filter((m) => m.isReadyToClaim).length;

  const allDailyClaimed = harianList.length > 0 && harianList.every((m) => m.isClaimed);
  if (allDailyClaimed && !state.missionState.harian.chestClaimed) {
    harianCount += 1;
  }

  const allWeeklyClaimed = mingguanList.length > 0 && mingguanList.every((m) => m.isClaimed);
  if (allWeeklyClaimed && !state.missionState.mingguan.chestClaimed) {
    mingguanCount += 1;
  }

  return {
    harian: harianCount,
    mingguan: mingguanCount,
    utama: utamaCount,
  };
}

// =========================================================================
// SELECTORS UNTUK KUIS & PUSTAKA
// =========================================================================

export function getEffectiveDateKey(state: PlayerState): string {
  const effectiveDate = new Date();
  if (state.simulatedDateOffsetDays) {
    effectiveDate.setDate(effectiveDate.getDate() + state.simulatedDateOffsetDays);
  }
  return getLocalDateKey(effectiveDate);
}

export function getTodayQuizStatus(state: PlayerState): {
  dateKey: string;
  completed: boolean;
  score: number;
  total: number;
  stars: number;
} {
  const dateKey = getEffectiveDateKey(state);
  const harian = state.quizProgress?.harian;
  if (!harian) {
    return { dateKey, completed: false, score: 0, total: 5, stars: 0 };
  }
  return {
    dateKey: harian.dateKey || dateKey,
    completed: Boolean(harian.completed),
    score: harian.score || 0,
    total: harian.total || 5,
    stars: harian.stars || 0,
  };
}

export function getTopicQuizStats(
  state: PlayerState,
  topikId: string
): {
  bestScore: number;
  bestStars: number;
  attempts: number;
  completed: boolean;
} {
  const stats = state.quizProgress?.topik?.[topikId];
  if (!stats) {
    return { bestScore: 0, bestStars: 0, attempts: 0, completed: false };
  }
  return {
    bestScore: stats.bestScore || 0,
    bestStars: stats.bestStars || 0,
    attempts: stats.attempts || 0,
    completed: Boolean(stats.firstCompleted),
  };
}

export function getWeakTopics(
  state: PlayerState,
  n = 2
): typeof QUIZ_TOPICS {
  // Sort topics by lowest bestScore or unattempted
  const scored = QUIZ_TOPICS.map((topic) => {
    const stats = state.quizProgress?.topik?.[topic.id];
    return {
      topic,
      score: stats ? stats.bestScore : -1,
      attempts: stats ? stats.attempts : 0,
    };
  });

  scored.sort((a, b) => {
    if (a.score === b.score) return a.attempts - b.attempts;
    return a.score - b.score;
  });

  return scored.slice(0, n).map((s) => s.topic);
}

export function getQuizSummary(state: PlayerState): {
  totalQuizzes: number;
  avgScore: number;
  totalCorrect: number;
  perfectCount: number;
} {
  const stats = state.quizProgress?.stats;
  if (!stats || stats.totalQuizzes === 0) {
    return { totalQuizzes: 0, avgScore: 0, totalCorrect: 0, perfectCount: 0 };
  }
  const avg =
    stats.totalAnswered > 0
      ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
      : 0;
  return {
    totalQuizzes: stats.totalQuizzes,
    avgScore: avg,
    totalCorrect: stats.totalCorrect,
    perfectCount: stats.perfectCount || 0,
  };
}

// Selectors Pustaka
export function getTopicStatus(
  state: PlayerState,
  slug: string
): "belum" | "sedang" | "selesai" {
  const progress = state.contentProgress?.[slug];
  if (!progress) return "belum";
  if (progress.completed) return "selesai";
  if (progress.cardIndex > 0 || (progress.viewedCards && progress.viewedCards.length > 0)) {
    return "sedang";
  }
  return "belum";
}

export function getReadCount(state: PlayerState): number {
  return Object.values(state.contentProgress || {}).filter((p) => p.completed).length;
}

export function getRecommendedTopics(state: PlayerState, n = 3) {
  // Pick topics that are not completed yet, sorted by urutan
  const completedSlugs = new Set(
    Object.entries(state.contentProgress || {})
      .filter(([_, p]) => p.completed)
      .map(([slug]) => slug)
  );

  const unread = PUSTAKA_TOPICS.filter((t) => !completedSlugs.has(t.slug));
  if (unread.length >= n) return unread.slice(0, n);
  // If fewer than n unread, fill with the remaining
  return [...unread, ...PUSTAKA_TOPICS.filter((t) => completedSlugs.has(t.slug))].slice(0, n);
}

export function getNextUnreadTopic(state: PlayerState) {
  const completedSlugs = new Set(
    Object.entries(state.contentProgress || {})
      .filter(([_, p]) => p.completed)
      .map(([slug]) => slug)
  );
  return PUSTAKA_TOPICS.find((t) => !completedSlugs.has(t.slug)) || null;
}

// =========================================================================
// SELECTORS AKSI NYATA
// =========================================================================

export function getChallengeStatus(state: PlayerState) {
  const an = state.aksiNyata || DEFAULT_AKSI_NYATA;
  const challenge = an.challenge;
  const current = challenge.current;
  const todayKey = getEffectiveDateKey(state);

  const checkedDays = Object.keys(current.days || {}).map(Number).sort((a, b) => a - b);
  const checkedDaysCount = checkedDays.length;
  const highestCheckedDay = checkedDaysCount > 0 ? Math.max(...checkedDays) : 0;
  const isCompleted = checkedDaysCount >= 7;

  // Has today already been checked?
  const isTodayChecked = Object.values(current.days || {}).some(
    (d: ChallengeDayRecord) => d.dateKey === todayKey
  );

  const isStarted = Boolean(current.startedAt || checkedDaysCount > 0);
  const currentDay = isCompleted ? 7 : Math.min(7, highestCheckedDay + 1);
  const canCheckToday = isStarted && !isCompleted && !isTodayChecked;

  return {
    isStarted,
    currentDay,
    checkedDaysCount,
    highestCheckedDay,
    isTodayChecked,
    isCompleted,
    canCheckToday,
    rounds: challenge.rounds || 0,
    rewardClaimed: Boolean(current.rewardClaimed),
    todayKey,
    days: current.days || {},
  };
}

export function getTodayTask(state: PlayerState) {
  const status = getChallengeStatus(state);
  return CHALLENGE_TASKS.find((t) => t.day === status.currentDay) || CHALLENGE_TASKS[0];
}

export function getAksiSummary(state: PlayerState) {
  const an = state.aksiNyata || DEFAULT_AKSI_NYATA;
  const status = getChallengeStatus(state);
  const totalIdeasTried = Object.values(an.ideas || {}).filter((i) => i.tried).length;
  const lastCalc = an.calculator?.history?.[0] || null;

  return {
    checkedDaysCount: status.checkedDaysCount,
    roundsCompleted: status.rounds,
    totalIdeasTried,
    lastCalculatorScore: lastCalc ? lastCalc.score : null,
    lastCalculatorLevel: lastCalc ? lastCalc.level : null,
  };
}

export function isCalculatorRewardAvailable(state: PlayerState): boolean {
  const an = state.aksiNyata || DEFAULT_AKSI_NYATA;
  const todayKey = getEffectiveDateKey(state);
  return an.calculator?.rewardClaimedDateKey !== todayKey;
}

// =========================================================================
// HOOK UTAMA usePlayerStore
// =========================================================================

export function usePlayerStore() {
  const [state, setState] = useState<PlayerState>(globalState);

  useEffect(() => {
    const handleUpdate = (newState: PlayerState) => setState(newState);
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  // Ensure daily/weekly resets whenever app focuses or re-mounts
  useEffect(() => {
    setPlayerState((prev) => checkAndApplyResets(prev));
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
        activityLog: [newActivity, ...prev.activityLog].slice(0, 25),
      };
    });
  };

  const addPoints = (amount: number, reason: string) => {
    setPlayerState((prev) => {
      const newPoints = Math.max(0, prev.points + amount);
      const newActivity: ActivityItem = {
        id: "act-" + Date.now(),
        title: reason,
        description: `Mendapatkan +${amount} Poin`,
        timestamp: "Baru saja",
        type: "game",
        xpEarned: 0,
        pointsEarned: amount,
      };

      return {
        ...prev,
        points: newPoints,
        activityLog: [newActivity, ...prev.activityLog].slice(0, 25),
      };
    });
  };

  const updateStreak = () => {
    setPlayerState((prev) => {
      const today = getLocalDateKey();
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

      let nextState: PlayerState = {
        ...prev,
        streak: newStreak,
        lastActiveDate: today,
        activeDays: newActiveDays,
      };

      nextState = dispatchRecordEvent(nextState, "hari_aktif_minggu");
      nextState = dispatchRecordEvent(nextState, "streak_maks");

      return nextState;
    });
  };

  const recordEvent = (eventName: string, payload?: { amount?: number; id?: string }) => {
    setPlayerState((prev) => dispatchRecordEvent(prev, eventName, payload));
  };

  const ensureDailyWeeklyReset = () => {
    setPlayerState((prev) => checkAndApplyResets(prev));
  };

  // =========================================================================
  // AKSI PUSTAKA EDUKASI (READING)
  // =========================================================================

  const saveReadingPosition = (slug: string, index: number) => {
    setPlayerState((prev) => {
      const existing = prev.contentProgress?.[slug] || {
        cardIndex: 0,
        viewedCards: [],
        completed: false,
      };
      return {
        ...prev,
        contentProgress: {
          ...prev.contentProgress,
          [slug]: {
            ...existing,
            cardIndex: index,
          },
        },
      };
    });
  };

  const markCardViewed = (slug: string, cardId: string) => {
    setPlayerState((prev) => {
      const existing = prev.contentProgress?.[slug] || {
        cardIndex: 0,
        viewedCards: [],
        completed: false,
      };
      const isFirstTime = !existing.viewedCards.includes(cardId);
      const newViewed = isFirstTime ? [...existing.viewedCards, cardId] : existing.viewedCards;

      let nextState: PlayerState = {
        ...prev,
        contentProgress: {
          ...prev.contentProgress,
          [slug]: {
            ...existing,
            viewedCards: newViewed,
          },
        },
      };

      if (isFirstTime) {
        nextState = dispatchRecordEvent(nextState, "kartu_dibuka");
      }

      return nextState;
    });
  };

  const completeTopic = (slug: string) => {
    let result = {
      success: false,
      xp: 0,
      poin: 0,
      leveledUp: false,
      oldLevel: 1,
      newLevel: 1,
      newTitle: "",
      unlockedBadges: [] as string[],
    };

    setPlayerState((prev) => {
      const existing = prev.contentProgress?.[slug];
      const topic = PUSTAKA_TOPICS.find((t) => t.slug === slug);
      if (!topic) return prev;

      // Idempotency: if already completed and claimed, do not award rewards twice
      if (existing?.rewardClaimed) {
        return prev;
      }

      const xpGain = 20;
      const pointsGain = 10;
      const oldLevelInfo = calculateLevel(prev.xp);
      const newXp = prev.xp + xpGain;
      const newPoints = prev.points + pointsGain;
      const newLevelInfo = calculateLevel(newXp);
      const leveledUp = newLevelInfo.level > oldLevelInfo.level;

      const newContentProgress: Record<string, TopicReadingProgress> = {
        ...prev.contentProgress,
        [slug]: {
          cardIndex: topic.kartu.length - 1,
          viewedCards: topic.kartu.map((k) => k.id),
          completed: true,
          completedAt: "Baru saja",
          rewardClaimed: true,
        },
      };

      const completedCount = Object.values(newContentProgress).filter((p) => p.completed).length;

      // Activity log
      const newActivity: ActivityItem = {
        id: "act-" + Date.now(),
        title: `Selesai Membaca: ${topic.judul}`,
        description: `Mendapatkan +${xpGain} XP dan +${pointsGain} Poin`,
        timestamp: "Baru saja",
        type: "reading",
        xpEarned: xpGain,
        pointsEarned: pointsGain,
      };

      result = {
        success: true,
        xp: xpGain,
        poin: pointsGain,
        leveledUp,
        oldLevel: oldLevelInfo.level,
        newLevel: newLevelInfo.level,
        newTitle: newLevelInfo.title,
        unlockedBadges: [],
      };

      let nextState: PlayerState = {
        ...prev,
        xp: newXp,
        points: newPoints,
        contentProgress: newContentProgress,
        stats: {
          ...prev.stats,
          topicsRead: completedCount,
        },
        activityLog: [newActivity, ...prev.activityLog].slice(0, 25),
      };

      nextState = dispatchRecordEvent(nextState, "materi_dibaca");
      nextState = dispatchRecordEvent(nextState, "materi_dibaca_unik", { id: slug });

      return nextState;
    });

    return result;
  };

  // =========================================================================
  // AKSI KUIS & TANTANGAN (QUIZ)
  // =========================================================================

  const submitQuizResult = (payload: {
    mode: "harian" | "topik" | "latihan";
    topikId?: string;
    topicTitle: string;
    score: number;
    total: number;
    usedHint?: boolean;
  }) => {
    let result = {
      success: false,
      score: payload.score,
      total: payload.total,
      percent: 0,
      stars: 1,
      xpEarned: 0,
      pointsEarned: 0,
      isFirstDaily: false,
      isFirstTopic: false,
      isPerfectBonus: false,
      leveledUp: false,
      oldLevel: 1,
      newLevel: 1,
      newTitle: "",
      newBadges: [] as string[],
    };

    setPlayerState((prev) => {
      const percent = Math.round((payload.score / payload.total) * 100);

      // Star calculation (PRD KQ-05)
      // 3 = 100% without hint; 2 = >= 80% (or 100% with hint); 1 = completed
      let stars = 1;
      if (percent === 100) {
        stars = payload.usedHint ? 2 : 3;
      } else if (percent >= 80) {
        stars = 2;
      } else {
        stars = 1;
      }

      let xpGain = 0;
      let pointsGain = 0;
      let isFirstDaily = false;
      let isFirstTopic = false;
      let isPerfectBonus = false;

      const currentQp = prev.quizProgress || DEFAULT_QUIZ_PROGRESS;

      // Anti-farming reward logic
      if (payload.mode === "harian") {
        if (!currentQp.harian.completed) {
          xpGain = 40;
          pointsGain = 15;
          isFirstDaily = true;
        }
      } else if (payload.mode === "topik" && payload.topikId) {
        const topicStats = currentQp.topik?.[payload.topikId];
        if (!topicStats?.firstCompleted) {
          xpGain = 30;
          pointsGain = 10;
          isFirstTopic = true;
        }
        if (percent === 100 && !topicStats?.perfectClaimed) {
          xpGain += 10;
          isPerfectBonus = true;
        }
      }

      const oldLevelInfo = calculateLevel(prev.xp);
      const newXp = prev.xp + xpGain;
      const newPoints = prev.points + pointsGain;
      const newLevelInfo = calculateLevel(newXp);
      const leveledUp = newLevelInfo.level > oldLevelInfo.level;

      // Update quizProgress
      const newStats = {
        totalQuizzes: (currentQp.stats?.totalQuizzes || 0) + 1,
        totalCorrect: (currentQp.stats?.totalCorrect || 0) + payload.score,
        totalAnswered: (currentQp.stats?.totalAnswered || 0) + payload.total,
        perfectCount: (currentQp.stats?.perfectCount || 0) + (percent === 100 ? 1 : 0),
      };

      const newHistoryItem: QuizHistoryItem = {
        id: "qh-" + Date.now(),
        mode: payload.mode,
        topikId: payload.topikId,
        topicTitle: payload.topicTitle,
        score: payload.score,
        total: payload.total,
        stars,
        xpEarned: xpGain,
        pointsEarned: pointsGain,
        at: "Baru saja",
      };

      const updatedTopikRecord = { ...currentQp.topik };
      if (payload.topikId) {
        const existing = updatedTopikRecord[payload.topikId];
        updatedTopikRecord[payload.topikId] = {
          bestScore: existing ? Math.max(existing.bestScore, payload.score) : payload.score,
          bestStars: existing ? Math.max(existing.bestStars, stars) : stars,
          attempts: (existing?.attempts || 0) + 1,
          firstCompleted: true,
          perfectClaimed: existing?.perfectClaimed || isPerfectBonus,
        };
      }

      const updatedQuizProgress: QuizProgress = {
        ...currentQp,
        harian:
          payload.mode === "harian"
            ? {
                ...currentQp.harian,
                completed: true,
                score: Math.max(currentQp.harian.score || 0, payload.score),
                stars: Math.max(currentQp.harian.stars || 0, stars),
              }
            : currentQp.harian,
        topik: updatedTopikRecord,
        stats: newStats,
        history: [newHistoryItem, ...(currentQp.history || [])].slice(0, 50),
      };

      // Activity log
      const newActivity: ActivityItem = {
        id: "act-" + Date.now(),
        title: `Kuis ${payload.topicTitle}`,
        description: `Menyelesaikan kuis dengan skor ${payload.score}/${payload.total} (${percent}%) - ${stars} Bintang`,
        timestamp: "Baru saja",
        type: "quiz",
        xpEarned: xpGain,
        pointsEarned: pointsGain,
      };

      result = {
        success: true,
        score: payload.score,
        total: payload.total,
        percent,
        stars,
        xpEarned: xpGain,
        pointsEarned: pointsGain,
        isFirstDaily,
        isFirstTopic,
        isPerfectBonus,
        leveledUp,
        oldLevel: oldLevelInfo.level,
        newLevel: newLevelInfo.level,
        newTitle: newLevelInfo.title,
        newBadges: [],
      };

      let nextState: PlayerState = {
        ...prev,
        xp: newXp,
        points: newPoints,
        quizProgress: updatedQuizProgress,
        stats: {
          ...prev.stats,
          quizzesCompleted: newStats.totalQuizzes,
        },
        activityLog: [newActivity, ...prev.activityLog].slice(0, 25),
      };

      // Dispatch events for Misi
      nextState = dispatchRecordEvent(nextState, "kuis_selesai");
      if (payload.mode === "harian") {
        nextState = dispatchRecordEvent(nextState, "kuis_harian_selesai");
      }
      if (percent === 100) {
        nextState = dispatchRecordEvent(nextState, "kuis_sempurna", {
          id: payload.topikId || "harian",
        });
      }

      return nextState;
    });

    return result;
  };

  // =========================================================================
  // AKSI NYATA ACTIONS
  // =========================================================================

  const startChallenge = () => {
    setPlayerState((prev) => {
      const currentAn = prev.aksiNyata || DEFAULT_AKSI_NYATA;
      if (currentAn.challenge.current.startedAt) return prev;

      return {
        ...prev,
        aksiNyata: {
          ...currentAn,
          challenge: {
            ...currentAn.challenge,
            current: {
              ...currentAn.challenge.current,
              startedAt: new Date().toISOString(),
            },
          },
        },
      };
    });
  };

  const checkChallengeDay = (payload?: {
    feeling?: "gampang" | "lumayan" | "susah";
    parentConfirmed?: boolean;
  }) => {
    let result = {
      success: false,
      reason: "",
      day: 1,
      xpEarned: 0,
      pointsEarned: 0,
      completed: false,
      badgeUnlocked: false,
      leveledUp: false,
      newLevel: 1,
      newTitle: "",
    };

    setPlayerState((prev) => {
      const todayKey = getEffectiveDateKey(prev);
      const currentAn = prev.aksiNyata || DEFAULT_AKSI_NYATA;
      const currentChallenge = currentAn.challenge.current;

      const startedAt = currentChallenge.startedAt || new Date().toISOString();

      // Check if today is already checked
      const isTodayChecked = Object.values(currentChallenge.days || {}).some(
        (d: ChallengeDayRecord) => d.dateKey === todayKey
      );
      if (isTodayChecked) {
        result.reason = "already_checked_today";
        return prev;
      }

      const checkedDays = Object.keys(currentChallenge.days || {}).map(Number).sort((a, b) => a - b);
      const highestChecked = checkedDays.length > 0 ? Math.max(...checkedDays) : 0;
      if (highestChecked >= 7) {
        result.reason = "already_completed";
        return prev;
      }

      const nextDay = highestChecked + 1;
      const taskDef = CHALLENGE_TASKS.find((t) => t.day === nextDay);

      // Daily task reward
      const xpGain = 15;
      const pointsGain = 5;
      const isLastDay = nextDay === 7;
      let completionBonusXp = 0;
      let completionBonusPoints = 0;
      let badgeGranted = false;

      // Completion bonus (once per round / first time)
      if (isLastDay && !currentChallenge.rewardClaimed) {
        completionBonusXp = 150;
        completionBonusPoints = 80;
      }

      const totalXpGain = xpGain + completionBonusXp;
      const totalPointsGain = pointsGain + completionBonusPoints;

      const oldLevelInfo = calculateLevel(prev.xp);
      const newXp = prev.xp + totalXpGain;
      const newPoints = prev.points + totalPointsGain;
      const newLevelInfo = calculateLevel(newXp);
      const leveledUp = newLevelInfo.level > oldLevelInfo.level;

      const updatedDays: Record<number, ChallengeDayRecord> = {
        ...currentChallenge.days,
        [nextDay]: {
          dateKey: todayKey,
          checkedAt: new Date().toISOString(),
          feeling: payload?.feeling,
          parentConfirmed: payload?.parentConfirmed,
        },
      };

      const newActivity: ActivityItem = {
        id: "act-" + Date.now(),
        title: `Aksi Nyata Hari ${nextDay}: ${taskDef?.title || "Tugas Rumah"}`,
        description: isLastDay
          ? "Menyelesaikan seluruh Tantangan 7 Hari Aksi Nyata!"
          : "Mencoba kebiasaan ramah lingkungan baru di rumah",
        timestamp: "Baru saja",
        type: "action",
        xpEarned: totalXpGain,
        pointsEarned: totalPointsGain,
      };

      result = {
        success: true,
        reason: "",
        day: nextDay,
        xpEarned: totalXpGain,
        pointsEarned: totalPointsGain,
        completed: isLastDay,
        badgeUnlocked: isLastDay,
        leveledUp,
        newLevel: newLevelInfo.level,
        newTitle: newLevelInfo.title,
      };

      let nextState: PlayerState = {
        ...prev,
        xp: newXp,
        points: newPoints,
        activityLog: [newActivity, ...prev.activityLog].slice(0, 25),
        aksiNyata: {
          ...currentAn,
          challenge: {
            ...currentAn.challenge,
            current: {
              ...currentChallenge,
              startedAt,
              days: updatedDays,
              completedAt: isLastDay ? new Date().toISOString() : currentChallenge.completedAt,
              rewardClaimed: isLastDay ? true : currentChallenge.rewardClaimed,
            },
          },
        },
      };

      // Advance mission events
      nextState = dispatchRecordEvent(nextState, "aksi_nyata_dicentang", { amount: 1 });
      if (isLastDay) {
        nextState = dispatchRecordEvent(nextState, "tantangan_7_selesai", { amount: 1 });
      }

      return nextState;
    });

    return result;
  };

  const startNewRound = () => {
    setPlayerState((prev) => {
      const currentAn = prev.aksiNyata || DEFAULT_AKSI_NYATA;
      return {
        ...prev,
        aksiNyata: {
          ...currentAn,
          challenge: {
            rounds: currentAn.challenge.rounds + 1,
            current: {
              startedAt: new Date().toISOString(),
              days: {},
              completedAt: null,
              rewardClaimed: false,
            },
          },
        },
      };
    });
  };

  const resetCurrentChallenge = () => {
    setPlayerState((prev) => {
      const currentAn = prev.aksiNyata || DEFAULT_AKSI_NYATA;
      return {
        ...prev,
        aksiNyata: {
          ...currentAn,
          challenge: {
            ...currentAn.challenge,
            current: {
              startedAt: null,
              days: {},
              completedAt: null,
              rewardClaimed: false,
            },
          },
        },
      };
    });
  };

  const submitCalculator = (answers: number[]) => {
    let result = {
      score: 0,
      level: "Pemula Peduli" as "Pemula Peduli" | "Penjaga Bumi" | "Pahlawan Bumi",
      xpEarned: 0,
      pointsEarned: 0,
      leveledUp: false,
      newLevel: 1,
      newTitle: "",
    };

    setPlayerState((prev) => {
      const todayKey = getEffectiveDateKey(prev);
      const currentAn = prev.aksiNyata || DEFAULT_AKSI_NYATA;
      const totalScore = answers.reduce((sum, val) => sum + val, 0);
      const habitInfo = getHabitLevel(totalScore);

      const isClaimedToday = currentAn.calculator.rewardClaimedDateKey === todayKey;
      const xpGain = isClaimedToday ? 0 : 10;
      const pointsGain = isClaimedToday ? 0 : 5;

      const oldLevelInfo = calculateLevel(prev.xp);
      const newXp = prev.xp + xpGain;
      const newPoints = prev.points + pointsGain;
      const newLevelInfo = calculateLevel(newXp);
      const leveledUp = newLevelInfo.level > oldLevelInfo.level;

      const newHistoryItem: CalculatorHistoryItem = {
        score: totalScore,
        level: habitInfo.name,
        at: new Date().toISOString(),
      };

      const updatedHistory = [newHistoryItem, ...(currentAn.calculator.history || [])].slice(0, 10);

      result = {
        score: totalScore,
        level: habitInfo.name,
        xpEarned: xpGain,
        pointsEarned: pointsGain,
        leveledUp,
        newLevel: newLevelInfo.level,
        newTitle: newLevelInfo.title,
      };

      let nextState: PlayerState = {
        ...prev,
        xp: newXp,
        points: newPoints,
        aksiNyata: {
          ...currentAn,
          calculator: {
            lastDateKey: todayKey,
            rewardClaimedDateKey: isClaimedToday ? currentAn.calculator.rewardClaimedDateKey : todayKey,
            history: updatedHistory,
          },
        },
      };

      nextState = dispatchRecordEvent(nextState, "kalkulator_selesai", { amount: 1 });
      return nextState;
    });

    return result;
  };

  const markIdeaTried = (ideaId: string) => {
    let result = {
      success: false,
      alreadyTried: false,
      xpEarned: 0,
      pointsEarned: 0,
      leveledUp: false,
      newLevel: 1,
      newTitle: "",
    };

    setPlayerState((prev) => {
      const currentAn = prev.aksiNyata || DEFAULT_AKSI_NYATA;
      if (currentAn.ideas?.[ideaId]?.tried) {
        result.alreadyTried = true;
        return prev;
      }

      const xpGain = 20;
      const pointsGain = 10;

      const oldLevelInfo = calculateLevel(prev.xp);
      const newXp = prev.xp + xpGain;
      const newPoints = prev.points + pointsGain;
      const newLevelInfo = calculateLevel(newXp);
      const leveledUp = newLevelInfo.level > oldLevelInfo.level;

      const newActivity: ActivityItem = {
        id: "act-" + Date.now(),
        title: "Mencoba Ide Daur Ulang",
        description: "Mempraktikkan kreasi daur ulang di rumah",
        timestamp: "Baru saja",
        type: "action",
        xpEarned: xpGain,
        pointsEarned: pointsGain,
      };

      result = {
        success: true,
        alreadyTried: false,
        xpEarned: xpGain,
        pointsEarned: pointsGain,
        leveledUp,
        newLevel: newLevelInfo.level,
        newTitle: newLevelInfo.title,
      };

      let nextState: PlayerState = {
        ...prev,
        xp: newXp,
        points: newPoints,
        activityLog: [newActivity, ...prev.activityLog].slice(0, 25),
        aksiNyata: {
          ...currentAn,
          ideas: {
            ...currentAn.ideas,
            [ideaId]: {
              tried: true,
              at: new Date().toISOString(),
            },
          },
        },
      };

      nextState = dispatchRecordEvent(nextState, "ide_dicoba", { amount: 1 });
      return nextState;
    });

    return result;
  };

  // =========================================================================
  // AKSI MISI & KLAIM
  // =========================================================================

  const claimMission = (missionId: string) => {
    let claimResult = {
      success: false,
      mission: undefined as MissionDefinition | undefined,
      leveledUp: false,
      oldLevel: 1,
      newLevel: 1,
      newTitle: "",
      xp: 0,
      poin: 0,
    };

    setPlayerState((prev) => {
      const def =
        DAILY_MISSION_POOL.find((d) => d.id === missionId) ||
        WEEKLY_MISSIONS.find((w) => w.id === missionId) ||
        MAIN_MILESTONE_MISSIONS.find((u) => u.id === missionId);

      if (!def) return prev;

      const ms = prev.missionState;
      let isClaimed = false;
      let currentProgress = 0;

      if (def.tipe === "harian") {
        isClaimed = Boolean(ms.harian.claimed[missionId]);
        currentProgress = ms.harian.progress[missionId] || 0;
      } else if (def.tipe === "mingguan") {
        isClaimed = Boolean(ms.mingguan.claimed[missionId]);
        currentProgress = ms.mingguan.progress[missionId] || 0;
      } else {
        isClaimed = Boolean(ms.utama.claimed[missionId]);
        currentProgress = ms.utama.progress[missionId] || 0;
        if (def.event === "level_tercapai") currentProgress = calculateLevel(prev.xp).level;
        if (def.event === "streak_maks") currentProgress = prev.streak;
        if (def.event === "meter_kota") currentProgress = prev.cityCleanlinessMeter;
        if (def.event === "materi_dibaca_unik") currentProgress = prev.uniqueSets?.topicsRead?.length || 0;
        if (def.event === "kuis_sempurna") currentProgress = prev.uniqueSets?.perfectQuizzes?.length || 0;
      }

      if (isClaimed || currentProgress < def.target) {
        return prev;
      }

      const oldLevelInfo = calculateLevel(prev.xp);
      const newXp = prev.xp + def.xp;
      const newPoints = prev.points + def.poin;
      const newLevelInfo = calculateLevel(newXp);
      const leveledUp = newLevelInfo.level > oldLevelInfo.level;

      claimResult = {
        success: true,
        mission: def,
        leveledUp,
        oldLevel: oldLevelInfo.level,
        newLevel: newLevelInfo.level,
        newTitle: newLevelInfo.title,
        xp: def.xp,
        poin: def.poin,
      };

      const newHarianClaimed = { ...ms.harian.claimed };
      const newMingguanClaimed = { ...ms.mingguan.claimed };
      const newUtamaClaimed = { ...ms.utama.claimed };

      if (def.tipe === "harian") newHarianClaimed[missionId] = true;
      else if (def.tipe === "mingguan") newMingguanClaimed[missionId] = true;
      else newUtamaClaimed[missionId] = true;

      const updatedMissionState: MissionState = {
        harian: { ...ms.harian, claimed: newHarianClaimed },
        mingguan: { ...ms.mingguan, claimed: newMingguanClaimed },
        utama: { ...ms.utama, claimed: newUtamaClaimed },
      };

      const newClaimItem: ClaimHistoryItem = {
        id: "ch-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
        missionId: def.id,
        title: def.judul,
        xp: def.xp,
        poin: def.poin,
        at: "Baru saja",
      };

      const newActivity: ActivityItem = {
        id: "act-" + Date.now(),
        title: `Klaim Misi: ${def.judul}`,
        description: `Mendapatkan +${def.xp} XP dan +${def.poin} Poin`,
        timestamp: "Baru saja",
        type: def.kategori === "baca" ? "reading" : def.kategori === "kuis" ? "quiz" : "game",
        xpEarned: def.xp,
        pointsEarned: def.poin,
      };

      return {
        ...prev,
        xp: newXp,
        points: newPoints,
        missionState: updatedMissionState,
        dailyMissions: syncDailyMissionsArray(updatedMissionState),
        claimHistory: [newClaimItem, ...prev.claimHistory].slice(0, 30),
        activityLog: [newActivity, ...prev.activityLog].slice(0, 25),
      };
    });

    return claimResult;
  };

  const claimChest = (type: "harian" | "mingguan") => {
    let result = {
      success: false,
      type,
      xp: 0,
      poin: 0,
      leveledUp: false,
      newLevel: 1,
      newTitle: "",
    };

    setPlayerState((prev) => {
      const ms = prev.missionState;
      const config = CHEST_REWARDS[type];

      if (type === "harian") {
        const allClaimed =
          ms.harian.missionIds.length > 0 &&
          ms.harian.missionIds.every((id) => ms.harian.claimed[id]);
        if (!allClaimed || ms.harian.chestClaimed) return prev;
      } else {
        const allClaimed =
          ms.mingguan.missionIds.length > 0 &&
          ms.mingguan.missionIds.every((id) => ms.mingguan.claimed[id]);
        if (!allClaimed || ms.mingguan.chestClaimed) return prev;
      }

      const oldLevelInfo = calculateLevel(prev.xp);
      const newXp = prev.xp + config.xp;
      const newPoints = prev.points + config.poin;
      const newLevelInfo = calculateLevel(newXp);

      result = {
        success: true,
        type,
        xp: config.xp,
        poin: config.poin,
        leveledUp: newLevelInfo.level > oldLevelInfo.level,
        newLevel: newLevelInfo.level,
        newTitle: newLevelInfo.title,
      };

      const updatedMissionState: MissionState = {
        ...ms,
        [type]: {
          ...ms[type],
          chestClaimed: true,
        },
      };

      const newClaimItem: ClaimHistoryItem = {
        id: "ch-chest-" + Date.now(),
        missionId: `chest-${type}`,
        title: config.title,
        xp: config.xp,
        poin: config.poin,
        at: "Baru saja",
      };

      const newActivity: ActivityItem = {
        id: "act-chest-" + Date.now(),
        title: `Membuka ${config.title}`,
        description: `Mendapatkan bonus +${config.xp} XP dan +${config.poin} Poin!`,
        timestamp: "Baru saja",
        type: "streak",
        xpEarned: config.xp,
        pointsEarned: config.poin,
      };

      return {
        ...prev,
        xp: newXp,
        points: newPoints,
        missionState: updatedMissionState,
        claimHistory: [newClaimItem, ...prev.claimHistory].slice(0, 30),
        activityLog: [newActivity, ...prev.activityLog].slice(0, 25),
      };
    });

    return result;
  };

  const claimAllMissions = (tab?: "harian" | "mingguan" | "utama") => {
    let totalXp = 0;
    let totalPoints = 0;
    let claimedCount = 0;
    let leveledUp = false;
    let finalLevel = 1;
    let finalTitle = "";

    setPlayerState((prev) => {
      let currentState = { ...prev };
      const tabsToProcess: ("harian" | "mingguan" | "utama")[] = tab
        ? [tab]
        : ["harian", "mingguan", "utama"];

      tabsToProcess.forEach((t) => {
        const missions = getMissionsWithStatus(currentState, t);
        missions.forEach((m) => {
          if (m.isReadyToClaim) {
            const oldLevel = calculateLevel(currentState.xp).level;
            const newXp = currentState.xp + m.xp;
            const newLevelInfo = calculateLevel(newXp);

            totalXp += m.xp;
            totalPoints += m.poin;
            claimedCount += 1;
            if (newLevelInfo.level > oldLevel) {
              leveledUp = true;
              finalLevel = newLevelInfo.level;
              finalTitle = newLevelInfo.title;
            }

            const ms = currentState.missionState;
            const newClaimed = { ...ms[t].claimed, [m.id]: true };
            const updatedMissionState: MissionState = {
              ...ms,
              [t]: { ...ms[t], claimed: newClaimed },
            };

            const claimItem: ClaimHistoryItem = {
              id: "ch-" + Date.now() + "-" + m.id,
              missionId: m.id,
              title: m.judul,
              xp: m.xp,
              poin: m.poin,
              at: "Baru saja",
            };

            currentState = {
              ...currentState,
              xp: newXp,
              points: currentState.points + m.poin,
              missionState: updatedMissionState,
              dailyMissions: syncDailyMissionsArray(updatedMissionState),
              claimHistory: [claimItem, ...currentState.claimHistory].slice(0, 30),
            };
          }
        });

        if (t === "harian" || t === "mingguan") {
          const ms = currentState.missionState;
          const allClaimed =
            ms[t].missionIds.length > 0 &&
            ms[t].missionIds.every((id) => ms[t].claimed[id]);

          if (allClaimed && !ms[t].chestClaimed) {
            const cfg = CHEST_REWARDS[t];
            totalXp += cfg.xp;
            totalPoints += cfg.poin;
            claimedCount += 1;

            const oldLevel = calculateLevel(currentState.xp).level;
            const newXp = currentState.xp + cfg.xp;
            const newLevelInfo = calculateLevel(newXp);
            if (newLevelInfo.level > oldLevel) {
              leveledUp = true;
              finalLevel = newLevelInfo.level;
              finalTitle = newLevelInfo.title;
            }

            const updatedMissionState: MissionState = {
              ...ms,
              [t]: { ...ms[t], chestClaimed: true },
            };

            const chestClaimItem: ClaimHistoryItem = {
              id: "ch-chest-" + Date.now(),
              missionId: `chest-${t}`,
              title: cfg.title,
              xp: cfg.xp,
              poin: cfg.poin,
              at: "Baru saja",
            };

            currentState = {
              ...currentState,
              xp: newXp,
              points: currentState.points + cfg.poin,
              missionState: updatedMissionState,
              claimHistory: [chestClaimItem, ...currentState.claimHistory].slice(0, 30),
            };
          }
        }
      });

      return currentState;
    });

    return {
      claimedCount,
      totalXp,
      totalPoints,
      leveledUp,
      newLevel: finalLevel,
      newTitle: finalTitle,
    };
  };

  const claimDailyMission = (id: string) => {
    return claimMission(id);
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
      xpGain = 50 + Math.max(0, earnedStars - 1) * 25;
      pointsGain = Math.max(0, result.score);

      const targetMissionConfig = GAME_MISSIONS.find((m) => m.id === result.missionId);
      const missionTitle = targetMissionConfig?.title || `Misi ${result.missionId}`;

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

      const newCityMeter = calculateCityCleanlinessMeter(updatedMissions);

      const newlyUnlockedBadgeIds: string[] = [];

      const newActivity: ActivityItem = {
        id: "act-" + Date.now(),
        title: `Menyelesaikan ${missionTitle}`,
        description: `Meraih ${earnedStars} bintang dengan akurasi ${result.accuracy}%`,
        timestamp: "Baru saja",
        type: "game",
        xpEarned: xpGain,
        pointsEarned: pointsGain,
      };

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

      let nextState: PlayerState = {
        ...prev,
        xp: prev.xp + xpGain,
        points: prev.points + pointsGain,
        missionProgress: updatedMissions,
        cityCleanlinessMeter: newCityMeter,
        badges: prev.badges,
        stats: {
          ...prev.stats,
          trashSorted: newTotalSorted,
          sortingAccuracy: newOverallAccuracy,
        },
        activityLog: [newActivity, ...prev.activityLog].slice(0, 25),
      };

      nextState = dispatchRecordEvent(nextState, "sampah_benar", { amount: itemsCount });
      nextState = dispatchRecordEvent(nextState, "misi_game_dimulai");
      if (result.missionId === 1) nextState = dispatchRecordEvent(nextState, "misi_game_selesai:taman");
      if (result.missionId === 2) nextState = dispatchRecordEvent(nextState, "misi_game_selesai:pasar");
      if (earnedStars >= 2) nextState = dispatchRecordEvent(nextState, "bintang_2_plus");
      if (earnedStars >= 3) nextState = dispatchRecordEvent(nextState, "bintang_3");
      nextState = dispatchRecordEvent(nextState, "meter_kota");

      return nextState;
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

  const updateSettings = (partial: Partial<PlayerSettings>) => {
    setPlayerState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...partial,
      },
    }));
  };

  // Dev Tools helpers
  const simulateEvent = (eventName: string, payload?: { amount?: number; id?: string }) => {
    setPlayerState((prev) => dispatchRecordEvent(prev, eventName, payload));
  };

  const resetDailyMissions = () => {
    setPlayerState((prev) => {
      const currentDateKey = getLocalDateKey();
      const dailyDefs = getDailyMissionsForDate(currentDateKey);
      const progress: Record<string, number> = {};
      const claimed: Record<string, boolean> = {};
      dailyDefs.forEach((d) => {
        progress[d.id] = 0;
        claimed[d.id] = false;
      });

      const updatedMissionState: MissionState = {
        ...prev.missionState,
        harian: {
          dateKey: currentDateKey,
          missionIds: dailyDefs.map((d) => d.id),
          progress,
          claimed,
          chestClaimed: false,
        },
      };

      return {
        ...prev,
        missionState: updatedMissionState,
        dailyMissions: syncDailyMissionsArray(updatedMissionState),
      };
    });
  };

  const resetWeeklyMissions = () => {
    setPlayerState((prev) => {
      const currentWeekKey = getLocalWeekKey();
      const progress: Record<string, number> = {};
      const claimed: Record<string, boolean> = {};
      WEEKLY_MISSIONS.forEach((w) => {
        progress[w.id] = 0;
        claimed[w.id] = false;
      });

      const updatedMissionState: MissionState = {
        ...prev.missionState,
        mingguan: {
          weekKey: currentWeekKey,
          missionIds: WEEKLY_MISSIONS.map((w) => w.id),
          progress,
          claimed,
          chestClaimed: false,
        },
      };

      return {
        ...prev,
        missionState: updatedMissionState,
      };
    });
  };

  const advanceSimulatedDate = (days = 1) => {
    setPlayerState((prev) => {
      const nextOffset = (prev.simulatedDateOffsetDays || 0) + days;
      const modified = {
        ...prev,
        simulatedDateOffsetDays: nextOffset,
      };
      return checkAndApplyResets(modified);
    });
  };

  const seedSampleData = () => {
    setPlayerState(() => SAMPLE_PLAYER_STATE);
  };

  const resetData = () => {
    setPlayerState(() => INITIAL_PLAYER_STATE);
  };

  const markBadgeSeen = (badgeId: string) => {
    setPlayerState((prev) => {
      if (!prev.achievements?.badges?.[badgeId]) return prev;
      if (prev.achievements.badges[badgeId].seen) return prev;
      return {
        ...prev,
        achievements: {
          ...prev.achievements,
          badges: {
            ...prev.achievements.badges,
            [badgeId]: {
              ...prev.achievements.badges[badgeId],
              seen: true,
            },
          },
        },
      };
    });
  };

  const markCardSeen = (cardId: string) => {
    setPlayerState((prev) => {
      if (!prev.achievements?.cards?.[cardId]) return prev;
      if (prev.achievements.cards[cardId].seen) return prev;
      return {
        ...prev,
        achievements: {
          ...prev.achievements,
          cards: {
            ...prev.achievements.cards,
            [cardId]: {
              ...prev.achievements.cards[cardId],
              seen: true,
            },
          },
        },
      };
    });
  };

  const markAllSeen = () => {
    setPlayerState((prev) => {
      if (!prev.achievements) return prev;
      const newBadges = { ...prev.achievements.badges };
      let changed = false;
      for (const k in newBadges) {
        if (!newBadges[k].seen) {
          newBadges[k] = { ...newBadges[k], seen: true };
          changed = true;
        }
      }
      const newCards = { ...prev.achievements.cards };
      for (const k in newCards) {
        if (!newCards[k].seen) {
          newCards[k] = { ...newCards[k], seen: true };
          changed = true;
        }
      }
      if (!changed) return prev;
      return {
        ...prev,
        achievements: {
          ...prev.achievements,
          badges: newBadges,
          cards: newCards,
        },
      };
    });
  };

  const issueCertificate = (certId: string) => {
    const certDef = CERTIFICATE_DEFINITIONS.find((c) => c.id === certId);
    if (!certDef) return null;

    if (state.achievements?.certificates?.[certId]) {
      return state.achievements.certificates[certId];
    }

    if (!certDef.cek(state)) {
      return null;
    }

    const serial = generateCertificateSerial(certId);
    const issuedAt = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    setPlayerState((prev) => ({
      ...prev,
      achievements: {
        ...(prev.achievements || DEFAULT_ACHIEVEMENTS),
        certificates: {
          ...(prev.achievements?.certificates || {}),
          [certId]: { issuedAt, serial },
        },
      },
      activityLog: [
        {
          id: "act-" + Date.now(),
          title: `Menerima Sertifikat ${certDef.judul}`,
          description: `Nomor seri ${serial}`,
          timestamp: "Baru saja",
          type: "badge" as const,
          xpEarned: 0,
          pointsEarned: 0,
        },
        ...prev.activityLog,
      ].slice(0, 25),
    }));

    return { serial, issuedAt };
  };

  return {
    state,
    setNickname,
    addXp,
    addPoints,
    updateStreak,
    recordEvent,
    ensureDailyWeeklyReset,
    claimMission,
    claimDailyMission,
    claimChest,
    claimAllMissions,
    saveReadingPosition,
    markCardViewed,
    completeTopic,
    submitQuizResult,
    startChallenge,
    checkChallengeDay,
    startNewRound,
    resetCurrentChallenge,
    submitCalculator,
    markIdeaTried,
    simulateEvent,
    resetDailyMissions,
    resetWeeklyMissions,
    advanceSimulatedDate,
    unlockBadge,
    setCharacter,
    purchaseUpgrade,
    completeMission,
    resetGameProgress,
    updateSettings,
    seedSampleData,
    resetData,
    // Achievement Actions & Selectors
    markBadgeSeen,
    markCardSeen,
    markAllSeen,
    issueCertificate,
    getBadgeList: () => getBadgeList(state),
    getFactCardList: () => getFactCardList(state),
    getNewAchievementCount: () => getNewAchievementCount(state),
    getRecentBadges: (limit?: number) => getRecentBadges(state, limit),
    getNearBadges: (limit?: number) => getNearBadges(state, limit),
    getStatsSummary: () => getStatsSummary(state),
    getRadarScores: () => getRadarScores(state),
    getCertificateStatus: () => getCertificateStatus(state),
  };
}

/**
 * Standalone selectors for achievements & stats
 */
export function getBadgeList(state: PlayerState) {
  const badgeState = state.achievements?.badges || {};
  return BADGE_DEFINITIONS.map((def) => {
    const unlockedRecord =
      badgeState[def.id] ||
      (state.badges?.some((b) => b.id === def.id)
        ? { unlockedAt: "Telah didapat", seen: true }
        : undefined);
    const unlocked = !!unlockedRecord;
    const progress =
      def.target && def.ambilProgres
        ? Math.min(def.target, def.ambilProgres(state))
        : unlocked
        ? def.target || 1
        : 0;
    return {
      ...def,
      unlocked,
      unlockedAt: unlockedRecord?.unlockedAt,
      seen: unlockedRecord ? unlockedRecord.seen : true,
      currentProgress: progress,
    };
  });
}

export function getFactCardList(state: PlayerState) {
  const cardState = state.achievements?.cards || {};
  return FACT_CARDS.map((card) => {
    const record = cardState[card.id];
    return {
      ...card,
      unlocked: !!record,
      unlockedAt: record?.unlockedAt,
      seen: record ? record.seen : true,
    };
  });
}

export function getNewAchievementCount(state: PlayerState): number {
  const badgeState = state.achievements?.badges || {};
  const cardState = state.achievements?.cards || {};

  let count = 0;
  for (const key in badgeState) {
    if (!badgeState[key].seen) count++;
  }
  for (const key in cardState) {
    if (!cardState[key].seen) count++;
  }
  return count;
}

export function getRecentBadges(state: PlayerState, limit = 3) {
  const list = getBadgeList(state).filter((b) => b.unlocked);
  return list.slice(-limit).reverse();
}

export function getNearBadges(state: PlayerState, limit = 2) {
  const list = getBadgeList(state)
    .filter((b) => !b.unlocked && b.available && b.target && b.target > 0)
    .map((b) => ({
      ...b,
      percent: Math.round(((b.currentProgress || 0) / (b.target || 1)) * 100),
    }))
    .sort((a, b) => b.percent - a.percent);
  return list.slice(0, limit);
}

export function getStatsSummary(state: PlayerState) {
  const totalSorted = state.stats?.trashSorted || 0;
  const accuracy = state.stats?.sortingAccuracy || 0;
  const totalStars = (state.missionProgress || []).reduce(
    (acc, m) => acc + (m.stars || 0),
    0
  );
  const cityMeter = state.cityCleanlinessMeter || 0;

  const completedTopics = Object.values(state.contentProgress || {}).filter(
    (c) => c.completed
  ).length;
  const totalCardsRead = Object.values(state.contentProgress || {}).reduce(
    (acc, c) => acc + (c.viewedCards?.length || 0),
    0
  );

  const totalQuizzes = state.quizProgress?.stats?.totalQuizzes || 0;
  const totalCorrect = state.quizProgress?.stats?.totalCorrect || 0;
  const totalAnswered = state.quizProgress?.stats?.totalAnswered || 0;
  const quizAccuracy =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const perfectQuizzes = state.quizProgress?.stats?.perfectCount || 0;

  const challengeDaysCount = Object.keys(
    state.aksiNyata?.challenge?.current?.days || {}
  ).length;
  const ideasTriedCount = Object.values(state.aksiNyata?.ideas || {}).filter(
    (i) => i.tried
  ).length;

  const streak = state.streak || 0;
  const longestStreak = (state.stats as any)?.streakTerpanjang || streak;
  const activeDays = state.activeDays?.length || 1;
  const points = state.points || 0;

  return {
    trashSorted: totalSorted,
    sortingAccuracy: accuracy,
    starsEarned: totalStars,
    cityMeter,
    completedTopics,
    cardsRead: totalCardsRead,
    totalQuizzes,
    quizCorrect: totalCorrect,
    quizAccuracy,
    perfectQuizzes,
    challengeDays: challengeDaysCount,
    ideasTried: ideasTriedCount,
    streak,
    longestStreak,
    activeDays,
    points,
  };
}

export function getRadarScores(state: PlayerState) {
  return calculateRadarScores(state);
}

export function getCertificateStatus(state: PlayerState) {
  const certsState = state.achievements?.certificates || {};
  return CERTIFICATE_DEFINITIONS.map((cert) => {
    const isIssued = !!certsState[cert.id];
    const isEligible = cert.cek(state);
    return {
      ...cert,
      status: isIssued
        ? ("issued" as const)
        : isEligible
        ? ("eligible" as const)
        : ("locked" as const),
      issuedAt: certsState[cert.id]?.issuedAt,
      serial: certsState[cert.id]?.serial,
    };
  });
}
