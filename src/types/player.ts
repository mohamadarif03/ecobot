export interface MissionProgress {
  missionId: number;
  title: string;
  location: string;
  status: "locked" | "available" | "completed";
  stars: number; // 0-3
  accuracy: number; // 0-100%
  bestScore: number;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  rewardXp: number;
  rewardPoints: number;
  claimed: boolean;
  type: "game" | "reading" | "quiz";
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  rarity?: "common" | "rare" | "epic";
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "reading" | "quiz" | "game" | "badge" | "streak" | "action";
  xpEarned: number;
  pointsEarned: number;
}

export interface PlayerSettings {
  musicVolume: number;
  sfxVolume: number;
  graphicsQuality: "low" | "medium" | "high";
  language: "id" | "en";
  controlMode: "auto" | "touch" | "keyboard";
}

export interface PlayerUpgrades {
  bag: number;
  shoes: number;
  grabber: number;
}

export interface CharacterCustomization {
  skin: string;
  outfitColor: string;
  accessory: string;
}

export interface PlayerStats {
  trashSorted: number;
  sortingAccuracy: number;
  topicsRead: number;
  quizzesCompleted: number;
  totalSortedCorrect?: number;
  totalSortedAll?: number;
  streakTerpanjang?: number;
  comboTertinggi?: number;
  hariAktif?: string[];
}

export interface MissionState {
  harian: {
    dateKey: string;
    missionIds: string[];
    progress: Record<string, number>;
    claimed: Record<string, boolean>;
    chestClaimed: boolean;
  };
  mingguan: {
    weekKey: string;
    missionIds: string[];
    progress: Record<string, number>;
    claimed: Record<string, boolean>;
    chestClaimed: boolean;
  };
  utama: {
    progress: Record<string, number>;
    claimed: Record<string, boolean>;
  };
}

export interface ClaimHistoryItem {
  id: string;
  missionId: string;
  title: string;
  xp: number;
  poin: number;
  at: string;
}

export interface UniqueEventSets {
  topicsRead: string[];
  perfectQuizzes: string[];
}

export interface TopicReadingProgress {
  cardIndex: number;
  viewedCards: string[];
  completed: boolean;
  completedAt?: string;
  rewardClaimed?: boolean;
}

export interface QuizHistoryItem {
  id: string;
  mode: "harian" | "topik" | "latihan";
  topikId?: string;
  topicTitle: string;
  score: number;
  total: number;
  stars: number;
  xpEarned: number;
  pointsEarned: number;
  at: string;
}

export interface QuizProgress {
  harian: {
    dateKey: string;
    completed: boolean;
    score: number;
    total: number;
    stars: number;
  };
  topik: Record<
    string,
    {
      bestScore: number;
      bestStars: number;
      attempts: number;
      firstCompleted: boolean;
      perfectClaimed: boolean;
    }
  >;
  history: QuizHistoryItem[];
  stats: {
    totalQuizzes: number;
    totalCorrect: number;
    totalAnswered: number;
    perfectCount: number;
  };
  duelBest?: number;
}

export interface ChallengeDayRecord {
  dateKey: string;
  checkedAt: string;
  feeling?: "gampang" | "lumayan" | "susah";
  parentConfirmed?: boolean;
}

export interface ChallengeState {
  rounds: number;
  current: {
    startedAt: string | null;
    days: Record<number, ChallengeDayRecord>;
    completedAt: string | null;
    rewardClaimed: boolean;
  };
}

export interface CalculatorHistoryItem {
  score: number;
  level: "Pemula Peduli" | "Penjaga Bumi" | "Pahlawan Bumi";
  at: string;
}

export interface CalculatorState {
  lastDateKey: string | null;
  rewardClaimedDateKey: string | null;
  history: CalculatorHistoryItem[];
}

export interface AksiNyataState {
  challenge: ChallengeState;
  calculator: CalculatorState;
  ideas: Record<string, { tried: boolean; at: string }>;
}

export interface AchievementsState {
  badges: Record<string, { unlockedAt: string; seen: boolean }>;
  cards: Record<string, { unlockedAt: string; seen: boolean }>;
  certificates: Record<string, { issuedAt: string; serial: string }>;
}

export interface PlayerState {
  nickname: string;
  avatar: string; // avatar identifier
  xp: number;
  points: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  activeDays: string[]; // List of YYYY-MM-DD for the 7-day indicator
  cityCleanlinessMeter: number; // 0 - 100%
  missionProgress: MissionProgress[];
  upgrades: PlayerUpgrades;
  character: CharacterCustomization;
  dailyMissions: DailyMission[];
  missionState: MissionState;
  claimHistory: ClaimHistoryItem[];
  uniqueSets: UniqueEventSets;
  contentProgress: Record<string, TopicReadingProgress>;
  quizProgress: QuizProgress;
  aksiNyata?: AksiNyataState;
  achievements?: AchievementsState;
  simulatedDateOffsetDays?: number;
  badges: Badge[];
  activityLog: ActivityItem[];
  stats: PlayerStats;
  settings: PlayerSettings;
}
