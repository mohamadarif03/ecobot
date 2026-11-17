/**
 * Definisi Tipe Data Pusat Bantuan ECOBOT
 */

export type HelpTabKey = "cara-bermain" | "kontrol" | "faq" | "peta";

export type FaqCategory =
  | "bermain"
  | "hadiah"
  | "belajar"
  | "akun"
  | "teknis";

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  keywords: string[];
  actionLink?: {
    label: string;
    href: string;
  };
  tips?: string;
}

export interface TrashBinInfo {
  id: "organik" | "anorganik" | "b3";
  name: string;
  category: string;
  colorHex: string;
  bgLight: string;
  borderLight: string;
  badgeBg: string;
  badgeText: string;
  description: string;
  examples: string[];
  tips: string;
  funFact: string;
}

export interface StarRuleInfo {
  stars: number;
  label: string;
  condition: string;
  description: string;
  badgeText: string;
}

export interface EconomyConceptInfo {
  icon: string;
  name: string;
  shortDesc: string;
  howToEarn: string;
  usage: string;
  badgeColor: string;
}

export interface DailyPlayStep {
  step: number;
  title: string;
  description: string;
  href: string;
  badge: string;
}

export interface FeatureMenuItem {
  id: string;
  name: string;
  path: string;
  iconName: string;
  shortDescription: string;
  highlights: string[];
  status: "siap" | "segera";
  targetUserNote: string;
}

export interface TourStep {
  id: string;
  stepNumber: number;
  title: string;
  targetSelector?: string;
  description: string;
  mascotMood: "senang" | "semangat" | "bangga" | "fokus" | "bicara";
  ecobotTip: string;
  quickAction?: {
    label: string;
    path: string;
  };
}

export interface SearchResultItem {
  id: string;
  tab: HelpTabKey;
  sourceCategory: "FAQ" | "Cara Bermain" | "Kontrol" | "Peta Fitur";
  title: string;
  snippet: string;
  targetId?: string; // id elemen untuk di-scroll
  actionUrl?: string;
  score: number;
}
