export type ChallengeCategory =
  | "kebiasaan"
  | "listrik"
  | "air"
  | "plastik"
  | "pakai-ulang"
  | "berbagi";

export interface ChallengeTask {
  day: number; // 1 - 7
  title: string;
  description: string;
  why: string;
  tips: string;
  category: ChallengeCategory;
  iconName: string; // Lucide icon identifier
  needsAdultSupervision?: boolean;
  adultNote?: string;
  pustakaSlug?: string;
}

export type HabitLevelName = "Pemula Peduli" | "Penjaga Bumi" | "Pahlawan Bumi";

export interface HabitLevelInfo {
  name: HabitLevelName;
  minScore: number;
  maxScore: number;
  badge: string;
  color: string;
  description: string;
  ecobotMessage: string;
}

export interface CalculatorOption {
  text: string;
  points: number; // 0, 1, 2
  icon?: string;
}

export interface CalculatorQuestion {
  id: number;
  question: string;
  options: [CalculatorOption, CalculatorOption, CalculatorOption];
  strengthFeedback: string; // Shown if score === 2
  suggestionFeedback: string; // Shown if score <= 1
  pustakaSlug: string;
  pustakaTitle: string;
}

export interface CreativeIdea {
  id: string;
  title: string;
  difficulty: "Mudah" | "Sedang";
  estimatedTime: string;
  needsAdultSupervision?: boolean;
  adultNote?: string;
  icon: string;
  color: string;
  description: string;
  materials: string[];
  steps: string[]; // 3-6 steps, 1 sentence each
  safetyNote?: string;
  tips: string;
  rewardXp: number;
  rewardPoints: number;
}
