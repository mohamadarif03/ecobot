/**
 * Simple child safety profanity filter list and sanitizer
 */
const BANNED_WORDS = [
  "anjing",
  "babi",
  "bangsat",
  "bajingan",
  "tolol",
  "goblok",
  "bodoh",
  "idiot",
  "setan",
  "iblis",
  "kontol",
  "memek",
  "jembut",
  "itil",
  "ngentot",
  "fuck",
  "bitch",
  "shit",
  "asshole",
  "bastard",
  "dick",
  "pussy",
  "cunt",
  "kampret",
  "tai",
  "taek",
  "pecun",
  "lonte",
];

export function hasProfanity(text: string): boolean {
  if (!text) return false;
  const normalized = text.toLowerCase().replace(/[^a-z0-9]/g, "");
  return BANNED_WORDS.some((word) => normalized.includes(word));
}

export function sanitizeNickname(nickname: string, fallback = "Pahlawan Bumi"): string {
  if (!nickname || typeof nickname !== "string") return fallback;
  const trimmed = nickname.trim();
  if (trimmed.length < 2) return fallback;
  if (hasProfanity(trimmed)) {
    return fallback;
  }
  return trimmed;
}
