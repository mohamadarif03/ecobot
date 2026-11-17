export type LeaderboardPeriod = "mingguan" | "sepanjang-masa";

export type LigaTier = "perunggu" | "perak" | "emas";

export interface LeaderboardEntry {
  id: string;
  isCurrentUser: boolean;
  isDemo: boolean;
  rank: number;
  nickname: string;
  avatar: string;
  level: number;
  title: string;
  xp: number;
  trend: "naik" | "turun" | "tetap";
  trendDelta?: number;
  sticker?: string;
  badgeCount?: number;
}

export interface LigaTierDefinition {
  id: LigaTier;
  nama: string;
  ikon: string;
  warna: string;
  bgWarna: string;
  borderWarna: string;
  minXp: number;
  hadiahPoin: number;
  hadiahXp: number;
  deskripsi: string;
}

export interface LigaHistoryItem {
  weekKey: string;
  tier: LigaTier | null;
  weeklyXp: number;
  completedAt: string;
}

export interface LigaStatus {
  currentTier: LigaTier | null;
  nextTier: LigaTier | null;
  weeklyXp: number;
  xpToNextTier: number;
  percentToNext: number;
  canClaim: {
    perunggu: boolean;
    perak: boolean;
    emas: boolean;
  };
  claimed: {
    perunggu: boolean;
    perak: boolean;
    emas: boolean;
  };
}

export interface LeaderboardResponse {
  period: LeaderboardPeriod;
  weekKey?: string;
  entries: LeaderboardEntry[];
  currentUserEntry: LeaderboardEntry;
  totalParticipants: number;
  nextResetDate: string;
}
