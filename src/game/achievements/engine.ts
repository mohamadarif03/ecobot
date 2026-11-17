import type { PlayerState } from "../../types/player.ts";
import { BADGE_DEFINITIONS } from "../../data/pencapaian/badges.ts";
import { FACT_CARDS } from "../../data/pencapaian/factCards.ts";
import type {
  BadgeDefinition,
  FactCardDefinition,
  RadarScoreInfo,
} from "../../data/pencapaian/types.ts";
import { QUIZ_TOPICS } from "../../data/kuis/topics.ts";

/**
 * Pure evaluation function returning newly qualified badges and fact cards
 */
export function evaluateAchievements(state: PlayerState): {
  newBadges: BadgeDefinition[];
  newCards: FactCardDefinition[];
} {
  const currentBadges = state.achievements?.badges || {};
  const currentCards = state.achievements?.cards || {};

  // Find newly qualified badges
  const newBadges = BADGE_DEFINITIONS.filter((badge) => {
    if (!badge.available) return false;
    if (currentBadges[badge.id]) return false;
    // Also check legacy badges array for backward compatibility
    if (state.badges?.some((b) => b.id === badge.id)) return false;
    return badge.cek(state);
  });

  // Find newly qualified fact cards
  const newCards = FACT_CARDS.filter((card) => {
    if (currentCards[card.id]) return false;
    return card.cek(state);
  });

  return { newBadges, newCards };
}

/**
 * Calculates 4 radar scores for "Rapor Kepedulian" (Bagian D)
 * All values clamped 0-100 without NaN
 */
export function calculateRadarScores(state: PlayerState): RadarScoreInfo {
  // 1. Memilah = Rata-rata akurasi seluruh misi game yang pernah dimainkan
  const playedMissions = (state.missionProgress || []).filter(
    (m) => (m.accuracy || 0) > 0 || m.status === "completed"
  );
  let memilah = 0;
  if (playedMissions.length > 0) {
    const totalAccuracy = playedMissions.reduce(
      (sum, m) => sum + (m.accuracy || 0),
      0
    );
    memilah = Math.round(totalAccuracy / playedMissions.length);
  }

  // 2. Pengetahuan = 50% rata-rata skor terbaik kuis per topik + 50% persentase materi dibaca (x/6)
  const topicStats = state.quizProgress?.topik || {};
  let totalBestScore = 0;
  QUIZ_TOPICS.forEach((t) => {
    totalBestScore += topicStats[t.id]?.bestScore || 0;
  });
  const maxPossibleQuizScore = QUIZ_TOPICS.length * 5; // 6 topics * 5 questions = 30
  const quizPercent =
    maxPossibleQuizScore > 0 ? (totalBestScore / maxPossibleQuizScore) * 100 : 0;

  const readCount = Object.values(state.contentProgress || {}).filter(
    (p) => p.completed
  ).length;
  const readPercent = (readCount / 6) * 100;

  const pengetahuan = Math.round(0.5 * quizPercent + 0.5 * readPercent);

  // 3. Aksi Nyata = 70% (hari tantangan / 7) + 30% (ide dicoba / 4)
  const challengeDaysCount = Object.keys(
    state.aksiNyata?.challenge?.current?.days || {}
  ).length;
  const daysPercent = Math.min(100, (challengeDaysCount / 7) * 100);

  const ideasTriedCount = Object.values(state.aksiNyata?.ideas || {}).filter(
    (i) => i.tried
  ).length;
  const ideasPercent = Math.min(100, (ideasTriedCount / 4) * 100);

  const aksiNyata = Math.round(0.7 * daysPercent + 0.3 * ideasPercent);

  // 4. Konsistensi = min(100, (streak / 7) * 100)
  const currentStreak = state.streak || 0;
  const longestStreak = (state.stats as any)?.streakTerpanjang || currentStreak;
  const bestStreak = Math.max(currentStreak, longestStreak);
  const konsistensi = Math.min(100, Math.round((bestStreak / 7) * 100));

  // Clamp 0-100
  const clampedMemilah = Math.max(0, Math.min(100, isNaN(memilah) ? 0 : memilah));
  const clampedPengetahuan = Math.max(0, Math.min(100, isNaN(pengetahuan) ? 0 : pengetahuan));
  const clampedAksiNyata = Math.max(0, Math.min(100, isNaN(aksiNyata) ? 0 : aksiNyata));
  const clampedKonsistensi = Math.max(0, Math.min(100, isNaN(konsistensi) ? 0 : konsistensi));

  // Find lowest score for friendly recommendation
  const scores: { axis: "memilah" | "pengetahuan" | "aksiNyata" | "konsistensi"; val: number }[] = [
    { axis: "memilah", val: clampedMemilah },
    { axis: "pengetahuan", val: clampedPengetahuan },
    { axis: "aksiNyata", val: clampedAksiNyata },
    { axis: "konsistensi", val: clampedKonsistensi },
  ];
  scores.sort((a, b) => a.val - b.val);
  const lowest = scores[0].axis;

  let saranEcobot = "Ayo tingkatkan kebiasaan ramah lingkunganmu bersama Ecobot!";
  let tautanSaran = "/beranda";

  if (lowest === "memilah") {
    saranEcobot = "Ayo latih ketelitian memilah di Game Kota Harapan agar akurasi pemilahanmu makin tajam!";
    tautanSaran = "/main-game";
  } else if (lowest === "pengetahuan") {
    saranEcobot = "Baca kartu seru di Pustaka Edukasi dan uji ingatanmu lewat Kuis Harian!";
    tautanSaran = "/pustaka";
  } else if (lowest === "aksiNyata") {
    saranEcobot = "Coba kebiasaan baru di Tantangan 7 Hari atau praktikkan Ide Daur Ulang di rumah!";
    tautanSaran = "/aksi-nyata";
  } else if (lowest === "konsistensi") {
    saranEcobot = "Buka ECOBOT setiap hari untuk merawat streak belajarmu bersama teman-teman!";
    tautanSaran = "/beranda";
  }

  return {
    memilah: clampedMemilah,
    pengetahuan: clampedPengetahuan,
    aksiNyata: clampedAksiNyata,
    konsistensi: clampedKonsistensi,
    terendah: lowest,
    saranEcobot,
    tautanSaran,
  };
}

/**
 * Generates an idempotent serial number for certificates
 * Format: ECO-{YYYY}-{RANDOM 4 CHARS}
 */
export function generateCertificateSerial(
  certId: string,
  year = new Date().getFullYear()
): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomPart = "";
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ECO-${year}-${randomPart}`;
}
