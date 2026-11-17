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

export type GraphicsQuality = "low" | "medium" | "high" | "rendah" | "sedang" | "tinggi";
export type ControlMode = "auto" | "touch" | "keyboard" | "otomatis" | "analog";
export type JoystickSize = "kecil" | "sedang" | "besar";
export type ReduceMotionSetting = "ikuti" | "ya" | "tidak";
export type TextSizeSetting = "normal" | "besar" | "sangat-besar";

export interface PlayerSettings {
  // Suara
  musicVolume: number;
  sfxVolume: number;
  muted: boolean;

  // Grafis
  graphicsQuality: GraphicsQuality;
  batterySaver: boolean;

  // Kontrol
  controlMode: ControlMode;
  leftHanded: boolean;
  joystickSize: JoystickSize;

  // Tampilan & Aksesibilitas
  reduceMotion: ReduceMotionSetting;
  textSize: TextSizeSetting;
  highContrast: boolean;
  iconLabels: boolean;

  // Bahasa
  language: "id" | "en";
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
  totalPoinDibelanjakan?: number;
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

export interface InventoryEquipped {
  character: {
    topi?: string;
    kacamata?: string;
    aksesori?: string;
    warnaBaju?: string;
  };
  ecobot: {
    topi?: string;
    kacamata?: string;
    aksesori?: string;
    syal?: string;
    warna?: string;
  };
  stiker?: string;
}

export interface InventoryOwnedItem {
  at: string;
  source: "beli" | "gratis" | "badge";
}

export interface InventoryState {
  owned: Record<string, InventoryOwnedItem>;
  equipped: InventoryEquipped;
}

export interface TokoPurchaseRecord {
  itemId: string;
  price: number;
  at: string;
}

export interface TokoState {
  totalSpent: number;
  purchases: TokoPurchaseRecord[];
}

export interface XpLogState {
  weekKey: string;
  weeklyXp: number;
  dailyXp: Record<string, number>;
}

export interface LigaHistoryItem {
  weekKey: string;
  tier: "perunggu" | "perak" | "emas" | null;
  weeklyXp: number;
  completedAt: string;
}

export interface LeaderboardState {
  showOnBoard: boolean;
  rankSnapshot?: {
    weeklyRank: number;
    allTimeRank: number;
    updatedAt: string;
  };
  liga: {
    claimed: Record<string, boolean>;
    history: LigaHistoryItem[];
  };
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
  inventory?: InventoryState;
  toko?: TokoState;
  xpLog?: XpLogState;
  leaderboard?: LeaderboardState;
  simulatedDateOffsetDays?: number;
  badges: Badge[];
  activityLog: ActivityItem[];
  stats: PlayerStats;
  settings: PlayerSettings;
}
