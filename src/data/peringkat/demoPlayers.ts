import { calculateLevel } from "../levels.ts";
import type { LeaderboardEntry } from "./types.ts";

export interface DemoPlayerConfig {
  id: string;
  nickname: string;
  avatar: string;
  sticker?: string;
  baseWeeklyXp: number;
  allTimeXp: number;
  badgeCount: number;
  trend: "naik" | "turun" | "tetap";
  trendDelta: number;
}

export const BASE_DEMO_PLAYERS: DemoPlayerConfig[] = [
  {
    id: "demo-1",
    nickname: "BumiCeria",
    avatar: "🌱",
    sticker: "🌟",
    baseWeeklyXp: 480,
    allTimeXp: 1850,
    badgeCount: 8,
    trend: "naik",
    trendDelta: 2,
  },
  {
    id: "demo-2",
    nickname: "PohonRindang",
    avatar: "🌳",
    sticker: "🍃",
    baseWeeklyXp: 430,
    allTimeXp: 1620,
    badgeCount: 7,
    trend: "tetap",
    trendDelta: 0,
  },
  {
    id: "demo-3",
    nickname: "LumbaLumba",
    avatar: "🐬",
    sticker: "🌊",
    baseWeeklyXp: 390,
    allTimeXp: 1490,
    badgeCount: 6,
    trend: "naik",
    trendDelta: 1,
  },
  {
    id: "demo-4",
    nickname: "BintangLaut",
    avatar: "⭐",
    baseWeeklyXp: 350,
    allTimeXp: 1340,
    badgeCount: 6,
    trend: "turun",
    trendDelta: 1,
  },
  {
    id: "demo-5",
    nickname: "KancilBijak",
    avatar: "🦌",
    baseWeeklyXp: 320,
    allTimeXp: 1210,
    badgeCount: 5,
    trend: "naik",
    trendDelta: 3,
  },
  {
    id: "demo-6",
    nickname: "SahabatHijau",
    avatar: "🍀",
    baseWeeklyXp: 290,
    allTimeXp: 1100,
    badgeCount: 5,
    trend: "tetap",
    trendDelta: 0,
  },
  {
    id: "demo-7",
    nickname: "ElangJawa",
    avatar: "🦅",
    baseWeeklyXp: 260,
    allTimeXp: 980,
    badgeCount: 4,
    trend: "turun",
    trendDelta: 2,
  },
  {
    id: "demo-8",
    nickname: "BungaMatahari",
    avatar: "🌻",
    baseWeeklyXp: 240,
    allTimeXp: 920,
    badgeCount: 4,
    trend: "naik",
    trendDelta: 1,
  },
  {
    id: "demo-9",
    nickname: "KupuKupuBiru",
    avatar: "🦋",
    baseWeeklyXp: 210,
    allTimeXp: 840,
    badgeCount: 4,
    trend: "tetap",
    trendDelta: 0,
  },
  {
    id: "demo-10",
    nickname: "PandaLucu",
    avatar: "🐼",
    baseWeeklyXp: 190,
    allTimeXp: 780,
    badgeCount: 3,
    trend: "naik",
    trendDelta: 1,
  },
  {
    id: "demo-11",
    nickname: "KsatriaHutan",
    avatar: "🦁",
    baseWeeklyXp: 170,
    allTimeXp: 710,
    badgeCount: 3,
    trend: "turun",
    trendDelta: 1,
  },
  {
    id: "demo-12",
    nickname: "RimbaKencana",
    avatar: "🌴",
    baseWeeklyXp: 150,
    allTimeXp: 640,
    badgeCount: 3,
    trend: "tetap",
    trendDelta: 0,
  },
  {
    id: "demo-13",
    nickname: "BambuKuning",
    avatar: "🎋",
    baseWeeklyXp: 130,
    allTimeXp: 570,
    badgeCount: 2,
    trend: "naik",
    trendDelta: 2,
  },
  {
    id: "demo-14",
    nickname: "PelangiPagi",
    avatar: "🌈",
    baseWeeklyXp: 110,
    allTimeXp: 510,
    badgeCount: 2,
    trend: "turun",
    trendDelta: 1,
  },
  {
    id: "demo-15",
    nickname: "PenyelamatPenyu",
    avatar: "🐢",
    baseWeeklyXp: 95,
    allTimeXp: 450,
    badgeCount: 2,
    trend: "naik",
    trendDelta: 1,
  },
  {
    id: "demo-16",
    nickname: "TunasBangsa",
    avatar: "🌿",
    baseWeeklyXp: 80,
    allTimeXp: 390,
    badgeCount: 1,
    trend: "tetap",
    trendDelta: 0,
  },
  {
    id: "demo-17",
    nickname: "PenjelajahCilik",
    avatar: "🧭",
    baseWeeklyXp: 65,
    allTimeXp: 340,
    badgeCount: 1,
    trend: "turun",
    trendDelta: 1,
  },
  {
    id: "demo-18",
    nickname: "PilarBumi",
    avatar: "🏔️",
    baseWeeklyXp: 45,
    allTimeXp: 280,
    badgeCount: 1,
    trend: "naik",
    trendDelta: 1,
  },
];

/**
 * Deterministic pseudo-random offset based on weekKey and player ID string
 */
function getDeterministicOffset(seedStr: string): number {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 40) - 20; // -20 to +19
}

/**
 * Generate demo entries for the given weekKey and period
 */
export function generateDemoEntries(
  period: "mingguan" | "sepanjang-masa",
  weekKey = "2026-W46",
  dayOfWeek = 2
): LeaderboardEntry[] {
  // Day of week factor (0 to 6, where 0 is Sun or 1 is Mon). Day makes weekly XP grow naturally over the week.
  const dayProgressFactor = Math.min(1, Math.max(0.3, (dayOfWeek + 1) / 7));

  return BASE_DEMO_PLAYERS.map((p) => {
    let xp = p.allTimeXp;

    if (period === "mingguan") {
      const variance = getDeterministicOffset(`${weekKey}-${p.id}`);
      const rawWeekly = Math.round((p.baseWeeklyXp + variance) * dayProgressFactor);
      xp = Math.max(25, rawWeekly);
    }

    const lvl = calculateLevel(xp);

    return {
      id: p.id,
      isCurrentUser: false,
      isDemo: true,
      rank: 0, // Assigned after sorting
      nickname: p.nickname,
      avatar: p.avatar,
      level: lvl.level,
      title: lvl.title,
      xp,
      trend: p.trend,
      trendDelta: p.trendDelta,
      sticker: p.sticker,
      badgeCount: p.badgeCount,
    };
  });
}
