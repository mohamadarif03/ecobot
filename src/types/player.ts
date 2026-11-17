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
  type: "reading" | "quiz" | "game" | "badge" | "streak";
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
  badges: Badge[];
  activityLog: ActivityItem[];
  stats: PlayerStats;
  settings: PlayerSettings;
}
