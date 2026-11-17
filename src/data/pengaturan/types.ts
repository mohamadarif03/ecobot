import type { PlayerSettings, PlayerState } from "../../types/player.ts";

export type SettingsSection = "profil" | "suara" | "grafis" | "kontrol" | "tampilan" | "privasi";

export interface BackupFileStructure {
  app: "ecobot";
  schemaVersion: number;
  exportedAt: string;
  data: Partial<PlayerState>;
}

export interface BackupValidationResult {
  valid: boolean;
  error?: string;
  sanitizedData?: Partial<PlayerState>;
  summary?: {
    nickname: string;
    avatar: string;
    level: number;
    xp: number;
    badgesCount: number;
    topicsReadCount: number;
    quizzesCompletedCount: number;
    exportedAt: string;
  };
}
