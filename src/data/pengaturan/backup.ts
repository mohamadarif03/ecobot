import type { PlayerState } from "../../types/player.ts";
import type { BackupFileStructure, BackupValidationResult } from "./types.ts";
import { calculateLevel } from "../levels.ts";
import { sanitizeNickname } from "../peringkat/profanity.ts";

export const CURRENT_SCHEMA_VERSION = 2;
export const MAX_BACKUP_SIZE_BYTES = 1024 * 1024; // 1 MB

/**
 * Creates a clean backup file payload from the current player state
 */
export function generateBackupPayload(state: PlayerState): BackupFileStructure {
  // Extract strictly persistent fields, omitting temporary dev or runtime session flags
  const persistentData: Partial<PlayerState> = {
    nickname: state.nickname,
    avatar: state.avatar,
    xp: state.xp,
    points: state.points,
    streak: state.streak,
    lastActiveDate: state.lastActiveDate,
    activeDays: state.activeDays,
    cityCleanlinessMeter: state.cityCleanlinessMeter,
    missionProgress: state.missionProgress,
    upgrades: state.upgrades,
    character: state.character,
    dailyMissions: state.dailyMissions,
    missionState: state.missionState,
    claimHistory: state.claimHistory,
    uniqueSets: state.uniqueSets,
    contentProgress: state.contentProgress,
    quizProgress: state.quizProgress,
    aksiNyata: state.aksiNyata,
    achievements: state.achievements,
    inventory: state.inventory,
    toko: state.toko,
    badges: state.badges,
    activityLog: state.activityLog,
    stats: state.stats,
    settings: state.settings,
    xpLog: state.xpLog,
    leaderboard: state.leaderboard,
  };

  return {
    app: "ecobot",
    schemaVersion: CURRENT_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    data: persistentData,
  };
}

/**
 * Initiates download of the backup file in the browser
 */
export function triggerBackupDownload(state: PlayerState): void {
  if (typeof window === "undefined") return;

  const payload = generateBackupPayload(state);
  const jsonString = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonString], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const dateStr = new Date().toISOString().split("T")[0];
  const filename = `ecobot-cadangan-${dateStr}.json`;

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up URL after dispatch
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 2000);
}

/**
 * Validates, checks prototype safety, and sanitizes untrusted uploaded JSON backup files
 */
export function validateAndSanitizeBackup(rawJsonText: string): BackupValidationResult {
  if (!rawJsonText || typeof rawJsonText !== "string") {
    return { valid: false, error: "Berkas kosong atau tidak dapat dibaca." };
  }

  // 1. File size check
  if (rawJsonText.length > MAX_BACKUP_SIZE_BYTES) {
    return { valid: false, error: "Ukuran berkas melebihi batas maksimal 1 MB." };
  }

  // 2. Reject dangerous prototype pollution tokens in raw string
  if (
    rawJsonText.includes("__proto__") ||
    rawJsonText.includes("constructor") ||
    rawJsonText.includes("prototype")
  ) {
    return { valid: false, error: "Berkas ditolak karena mengandung struktur yang tidak aman." };
  }

  // 3. Parse JSON
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJsonText);
  } catch {
    return { valid: false, error: "Format berkas bukan JSON yang valid." };
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { valid: false, error: "Struktur data cadangan tidak valid." };
  }

  const obj = parsed as Record<string, unknown>;

  // 4. Verify application signature
  if (obj.app !== "ecobot") {
    return { valid: false, error: "Berkas ini bukan cadangan resmi ECOBOT." };
  }

  // 5. Schema version check
  const schemaVersion = typeof obj.schemaVersion === "number" ? obj.schemaVersion : 1;
  if (schemaVersion > CURRENT_SCHEMA_VERSION) {
    return {
      valid: false,
      error: `Berkas cadangan berasal dari versi aplikasi yang lebih baru (v${schemaVersion}). Silakan perbarui ECOBOT terlebih dahulu.`,
    };
  }

  const rawData = obj.data;
  if (!rawData || typeof rawData !== "object" || Array.isArray(rawData)) {
    return { valid: false, error: "Isi data cadangan tidak ditemukan atau rusak." };
  }

  const src = rawData as Record<string, unknown>;

  // 6. Build a brand new sanitized object (NEVER spread raw input)
  const rawNickname = typeof src.nickname === "string" ? src.nickname : "Raka";
  const nickname = sanitizeNickname(rawNickname);
  const avatar = typeof src.avatar === "string" ? src.avatar : "🤖";

  const rawXp = typeof src.xp === "number" && !isNaN(src.xp) ? Math.max(0, Math.floor(src.xp)) : 0;
  const rawPoints = typeof src.points === "number" && !isNaN(src.points) ? Math.max(0, Math.floor(src.points)) : 0;
  const streak = typeof src.streak === "number" && !isNaN(src.streak) ? Math.max(1, Math.floor(src.streak)) : 1;
  const cityMeter =
    typeof src.cityCleanlinessMeter === "number" && !isNaN(src.cityCleanlinessMeter)
      ? Math.max(0, Math.min(100, Math.floor(src.cityCleanlinessMeter)))
      : 12;

  const sanitized: Partial<PlayerState> = {
    nickname,
    avatar,
    xp: rawXp,
    points: rawPoints,
    streak,
    lastActiveDate: typeof src.lastActiveDate === "string" ? src.lastActiveDate : new Date().toISOString().split("T")[0],
    activeDays: Array.isArray(src.activeDays) ? (src.activeDays.filter((d) => typeof d === "string") as string[]) : [],
    cityCleanlinessMeter: cityMeter,
    missionProgress: Array.isArray(src.missionProgress) ? (src.missionProgress as any) : undefined,
    upgrades: typeof src.upgrades === "object" && src.upgrades ? (src.upgrades as any) : undefined,
    character: typeof src.character === "object" && src.character ? (src.character as any) : undefined,
    dailyMissions: Array.isArray(src.dailyMissions) ? (src.dailyMissions as any) : undefined,
    missionState: typeof src.missionState === "object" && src.missionState ? (src.missionState as any) : undefined,
    claimHistory: Array.isArray(src.claimHistory) ? (src.claimHistory as any) : undefined,
    uniqueSets: typeof src.uniqueSets === "object" && src.uniqueSets ? (src.uniqueSets as any) : undefined,
    contentProgress: typeof src.contentProgress === "object" && src.contentProgress ? (src.contentProgress as any) : undefined,
    quizProgress: typeof src.quizProgress === "object" && src.quizProgress ? (src.quizProgress as any) : undefined,
    aksiNyata: typeof src.aksiNyata === "object" && src.aksiNyata ? (src.aksiNyata as any) : undefined,
    achievements: typeof src.achievements === "object" && src.achievements ? (src.achievements as any) : undefined,
    inventory: typeof src.inventory === "object" && src.inventory ? (src.inventory as any) : undefined,
    toko: typeof src.toko === "object" && src.toko ? (src.toko as any) : undefined,
    badges: Array.isArray(src.badges) ? (src.badges as any) : undefined,
    activityLog: Array.isArray(src.activityLog) ? (src.activityLog as any) : undefined,
    stats: typeof src.stats === "object" && src.stats ? (src.stats as any) : undefined,
    settings: typeof src.settings === "object" && src.settings ? (src.settings as any) : undefined,
    xpLog: typeof src.xpLog === "object" && src.xpLog ? (src.xpLog as any) : undefined,
    leaderboard: typeof src.leaderboard === "object" && src.leaderboard ? (src.leaderboard as any) : undefined,
  };

  const levelInfo = calculateLevel(rawXp);

  // Compute summary for user confirmation preview
  const badgesCount =
    sanitized.achievements?.badges
      ? Object.keys(sanitized.achievements.badges).length
      : Array.isArray(sanitized.badges)
      ? sanitized.badges.length
      : 0;

  const topicsReadCount =
    sanitized.contentProgress
      ? Object.values(sanitized.contentProgress).filter((p) => p.completed).length
      : 0;

  const quizzesCompletedCount = sanitized.quizProgress?.stats?.totalQuizzes || 0;

  return {
    valid: true,
    sanitizedData: sanitized,
    summary: {
      nickname,
      avatar,
      level: levelInfo.level,
      xp: rawXp,
      badgesCount,
      topicsReadCount,
      quizzesCompletedCount,
      exportedAt: typeof obj.exportedAt === "string" ? obj.exportedAt : "Tidak tercantum",
    },
  };
}
