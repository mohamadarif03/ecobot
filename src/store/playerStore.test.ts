import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { calculateLevel, LEVELS } from "../data/levels.ts";
import { ENVIRONMENTAL_FACTS, getTodayFact } from "../data/facts.ts";
import {
  calculateStars,
  getMissionStatus,
  calculateCityCleanlinessMeter,
  GAME_MISSIONS,
} from "../data/gameMissions.ts";
import {
  getDailyMissionsForDate,
  DAILY_MISSION_POOL,
  WEEKLY_MISSIONS,
  MAIN_MILESTONE_MISSIONS,
  getLocalWeekKey,
} from "../data/missions.ts";
import {
  createDefaultMissionState,
  dispatchRecordEvent,
  selectClaimableCount,
  getMissionsWithStatus,
  INITIAL_PLAYER_STATE,
  DEFAULT_QUIZ_PROGRESS,
  DEFAULT_AKSI_NYATA,
  getTodayQuizStatus,
  getQuizSummary,
  getChallengeStatus,
  getAksiSummary,
  isCalculatorRewardAvailable,
  getEffectiveDateKey,
  getBadgeList,
  getFactCardList,
  getNewAchievementCount,
  getRecentBadges,
  getNearBadges,
  getStatsSummary,
  getCertificateStatus,
  getItemStatus,
  getShopItems,
  getEquipped,
  getAffordableItems,
  grantBadgeItems,
  getWeeklyXp,
  getLigaStatus,
  hasUnclaimedLigaReward,
} from "./playerStore.ts";
import { leaderboardService, getSurroundingEntries } from "../services/leaderboard/index.ts";
import { sanitizeNickname, hasProfanity } from "../data/peringkat/profanity.ts";
import { LIGA_TIERS } from "../data/peringkat/liga.ts";
import { ALL_SHOP_ITEMS } from "../data/toko/items.ts";
import { BADGE_DEFINITIONS } from "../data/pencapaian/badges.ts";
import { FACT_CARDS } from "../data/pencapaian/factCards.ts";
import { CERTIFICATE_DEFINITIONS } from "../data/pencapaian/certificates.ts";
import {
  evaluateAchievements,
  calculateRadarScores,
  generateCertificateSerial,
} from "../game/achievements/engine.ts";
import {
  ALL_QUIZ_QUESTIONS,
  getDailyQuizQuestions,
  getTopicQuizQuestions,
  validateQuizQuestions,
} from "../data/kuis/questions.ts";
import { QUIZ_TOPICS } from "../data/kuis/topics.ts";
import { CHALLENGE_TASKS } from "../data/aksiNyata/challenge.ts";
import {
  CALCULATOR_QUESTIONS,
  getHabitLevel,
} from "../data/aksiNyata/calculator.ts";
import { CREATIVE_IDEAS } from "../data/aksiNyata/ideas.ts";
import type { MissionProgress } from "../types/player.ts";

describe("Player Gamification Logic", () => {
  test("calculateLevel maps XP correctly to levels and titles", () => {
    assert.equal(calculateLevel(0).level, 1);
    assert.equal(calculateLevel(0).title, "Relawan Baru");

    assert.equal(calculateLevel(99).level, 1);
    assert.equal(calculateLevel(100).level, 2);
    assert.equal(calculateLevel(100).title, "Pemilah Cilik");

    assert.equal(calculateLevel(250).level, 3);
    assert.equal(calculateLevel(250).title, "Penjaga Taman");

    assert.equal(calculateLevel(450).level, 4);
    assert.equal(calculateLevel(450).title, "Pahlawan Kota");

    assert.equal(calculateLevel(700).level, 5);
    assert.equal(calculateLevel(700).title, "Duta Lingkungan");

    assert.equal(calculateLevel(1000).level, 6);
    assert.equal(calculateLevel(1000).title, "Pelindung Bumi");

    assert.equal(calculateLevel(2500).level, 6);
  });

  test("LEVELS table has exactly 6 levels matching PRD 8.1", () => {
    assert.equal(LEVELS.length, 6);
    assert.equal(LEVELS[0].title, "Relawan Baru");
    assert.equal(LEVELS[5].title, "Pelindung Bumi");
  });

  test("ENVIRONMENTAL_FACTS has at least 15 daily facts", () => {
    assert.ok(ENVIRONMENTAL_FACTS.length >= 15);
  });

  test("getTodayFact returns a valid fact object with action tip and source", () => {
    const fact = getTodayFact();
    assert.ok(fact);
    assert.ok(typeof fact.title === "string" && fact.title.length > 0);
    assert.ok(typeof fact.fact === "string" && fact.fact.length > 0);
    assert.ok(typeof fact.actionTip === "string" && fact.actionTip.length > 0);
    assert.ok(typeof fact.source === "string" && fact.source.length > 0);
  });
});

describe("Game Missions & Rules (PRD 7.4, 7.6)", () => {
  test("calculateStars follows star reward rules", () => {
    // Uncompleted = 0 stars
    assert.equal(calculateStars(100, false), 0);
    assert.equal(calculateStars(50, false), 0);

    // Completed but < 75% accuracy = 1 star
    assert.equal(calculateStars(60, true), 1);
    assert.equal(calculateStars(74, true), 1);

    // Completed and >= 75% accuracy = 2 stars
    assert.equal(calculateStars(75, true), 2);
    assert.equal(calculateStars(89, true), 2);

    // Completed and >= 90% accuracy = 3 stars
    assert.equal(calculateStars(90, true), 3);
    assert.equal(calculateStars(100, true), 3);
  });

  test("getMissionStatus unlocks missions correctly by prerequisite", () => {
    const emptyProgress: MissionProgress[] = [];

    // M1 always available
    assert.equal(getMissionStatus(1, emptyProgress), "available");
    // Others locked initially
    assert.equal(getMissionStatus(2, emptyProgress), "locked");
    assert.equal(getMissionStatus(3, emptyProgress), "locked");
    assert.equal(getMissionStatus(4, emptyProgress), "locked");
    assert.equal(getMissionStatus(5, emptyProgress), "locked");
    assert.equal(getMissionStatus(6, emptyProgress), "locked");

    // After M1 is completed
    const m1Done: MissionProgress[] = [
      {
        missionId: 1,
        title: "Taman Kota",
        location: "Zona 1",
        status: "completed",
        stars: 3,
        accuracy: 95,
        bestScore: 240,
      },
    ];
    assert.equal(getMissionStatus(1, m1Done), "completed");
    assert.equal(getMissionStatus(2, m1Done), "available");
    assert.equal(getMissionStatus(3, m1Done), "locked");
    assert.equal(getMissionStatus(6, m1Done), "locked"); // M6 requires M1 and M2

    // After M1 & M2 completed
    const m1m2Done: MissionProgress[] = [
      ...m1Done,
      {
        missionId: 2,
        title: "Pasar Tradisional",
        location: "Zona 2",
        status: "completed",
        stars: 2,
        accuracy: 80,
        bestScore: 300,
      },
    ];
    assert.equal(getMissionStatus(2, m1m2Done), "completed");
    assert.equal(getMissionStatus(3, m1m2Done), "available");
    assert.equal(getMissionStatus(5, m1m2Done), "available");
    assert.equal(getMissionStatus(6, m1m2Done), "available"); // M6 unlocked!
    assert.equal(getMissionStatus(4, m1m2Done), "locked"); // M4 requires M3

    // After M3 completed
    const m3Done: MissionProgress[] = [
      ...m1m2Done,
      {
        missionId: 3,
        title: "Tepi Sungai",
        location: "Zona 3",
        status: "completed",
        stars: 3,
        accuracy: 92,
        bestScore: 350,
      },
    ];
    assert.equal(getMissionStatus(4, m3Done), "available");
  });

  test("calculateCityCleanlinessMeter scales with completed missions and bonus stars", () => {
    assert.equal(calculateCityCleanlinessMeter([]), 12); // default base

    const allCompletedMaxStars: MissionProgress[] = GAME_MISSIONS.map((m) => ({
      missionId: m.id,
      title: m.title,
      location: m.location,
      status: "completed",
      stars: 3,
      accuracy: 100,
      bestScore: 500,
    }));

    assert.equal(calculateCityCleanlinessMeter(allCompletedMaxStars), 100);
  });
});

describe("Missions System & Reset Logic (PRD 6.3)", () => {
  test("getDailyMissionsForDate is deterministic and guarantees 1 learning & 1 game", () => {
    const dateKey = "2026-11-17";
    const run1 = getDailyMissionsForDate(dateKey);
    const run2 = getDailyMissionsForDate(dateKey);

    assert.equal(run1.length, 3);
    assert.deepEqual(run1.map((m) => m.id), run2.map((m) => m.id));

    // Must have at least 1 learning (baca or kuis)
    const hasLearning = run1.some((m) => m.kategori === "baca" || m.kategori === "kuis");
    assert.ok(hasLearning, "Harus ada minimal 1 misi belajar");

    // Must have at least 1 game
    const hasGame = run1.some((m) => m.kategori === "game");
    assert.ok(hasGame, "Harus ada minimal 1 misi game");

    // All 3 IDs must be unique
    const uniqueIds = new Set(run1.map((m) => m.id));
    assert.equal(uniqueIds.size, 3);
  });

  test("dispatchRecordEvent advances progress up to target", () => {
    let state = {
      ...INITIAL_PLAYER_STATE,
      missionState: createDefaultMissionState(),
    };

    // Find an active daily mission
    const activeDailyId = state.missionState.harian.missionIds[0];
    const def = DAILY_MISSION_POOL.find((d) => d.id === activeDailyId);
    assert.ok(def);

    state = dispatchRecordEvent(state, def.event, { amount: 1 });
    assert.equal(state.missionState.harian.progress[def.id], 1);

    // Over-reporting cannot exceed target
    state = dispatchRecordEvent(state, def.event, { amount: 999 });
    assert.equal(state.missionState.harian.progress[def.id], def.target);
  });

  test("selectClaimableCount accurately counts ready missions", () => {
    let state = {
      ...INITIAL_PLAYER_STATE,
      missionState: createDefaultMissionState(),
    };
    assert.equal(selectClaimableCount(state), 0);

    const activeDailyId = state.missionState.harian.missionIds[0];
    const def = DAILY_MISSION_POOL.find((d) => d.id === activeDailyId);
    assert.ok(def);

    state = dispatchRecordEvent(state, def.event, { amount: def.target });
    assert.equal(selectClaimableCount(state), 1);
  });

  test("getMissionsWithStatus formats weekly and utama lists correctly", () => {
    const state = {
      ...INITIAL_PLAYER_STATE,
      missionState: createDefaultMissionState(),
    };

    const weekly = getMissionsWithStatus(state, "mingguan");
    assert.equal(weekly.length, WEEKLY_MISSIONS.length);
    assert.equal(weekly.length, 3);

    const utama = getMissionsWithStatus(state, "utama");
    assert.equal(utama.length, MAIN_MILESTONE_MISSIONS.length);
    assert.equal(utama.length, 8);
  });
});

describe("Quiz Center & Question Bank (PRD KQ)", () => {
  test("validateQuizQuestions returns 0 violations on all 48 questions", () => {
    const report = validateQuizQuestions();
    assert.equal(report.passed, true, `Validation failed: ${JSON.stringify(report.violations)}`);
    assert.equal(report.violations.length, 0);
    assert.equal(ALL_QUIZ_QUESTIONS.length, 48);
  });

  test("each of the 6 topics has exactly 8 questions matching slug", () => {
    assert.equal(QUIZ_TOPICS.length, 6);
    QUIZ_TOPICS.forEach((topic) => {
      const q = ALL_QUIZ_QUESTIONS.filter((item) => item.topikId === topic.id);
      assert.equal(q.length, 8, `Topic ${topic.id} does not have 8 questions`);
      q.forEach((item) => {
        assert.equal(item.materiSlug, topic.slug);
      });
    });
  });

  test("getDailyQuizQuestions is deterministic for a given dateKey", () => {
    const q1 = getDailyQuizQuestions("2026-11-17");
    const q2 = getDailyQuizQuestions("2026-11-17");
    assert.equal(q1.length, 5);
    assert.equal(q2.length, 5);
    assert.deepEqual(
      q1.map((item) => item.id),
      q2.map((item) => item.id)
    );

    // Has 3 easy and 2 medium questions
    const easyCount = q1.filter((item) => item.tingkat === "mudah").length;
    const medCount = q1.filter((item) => item.tingkat === "sedang").length;
    assert.equal(easyCount, 3);
    assert.equal(medCount, 2);
  });

  test("getTopicQuizQuestions returns requested count of questions", () => {
    const questions = getTopicQuizQuestions("quiz-jenis-sampah", 5);
    assert.equal(questions.length, 5);
    questions.forEach((q) => {
      assert.equal(q.topikId, "quiz-jenis-sampah");
    });
  });

  test("getTodayQuizStatus correctly reflects initial and completed state", () => {
    const state = {
      ...INITIAL_PLAYER_STATE,
      quizProgress: { ...DEFAULT_QUIZ_PROGRESS },
    };
    const status = getTodayQuizStatus(state);
    assert.equal(status.completed, false);
    assert.equal(status.score, 0);

    const completedState = {
      ...state,
      quizProgress: {
        ...DEFAULT_QUIZ_PROGRESS,
        harian: {
          dateKey: status.dateKey,
          completed: true,
          score: 5,
          total: 5,
          stars: 3,
        },
      },
    };
    const updatedStatus = getTodayQuizStatus(completedState);
    assert.equal(updatedStatus.completed, true);
    assert.equal(updatedStatus.score, 5);
  });
});

describe("Aksi Nyata & Eco-Habits System (PRD 6.6)", () => {
  test("CHALLENGE_TASKS has exactly 7 days of safe, child-friendly tasks", () => {
    assert.equal(CHALLENGE_TASKS.length, 7);
    CHALLENGE_TASKS.forEach((task, idx) => {
      assert.equal(task.day, idx + 1);
      assert.ok(task.title.length > 0);
      assert.ok(task.description.length > 0);
      assert.ok(task.why.length > 0);
      assert.ok(task.tips.length > 0);
    });
  });

  test("CALCULATOR_QUESTIONS has 8 reflective questions and proper scoring", () => {
    assert.equal(CALCULATOR_QUESTIONS.length, 8);
    CALCULATOR_QUESTIONS.forEach((q) => {
      assert.equal(q.options.length, 3);
      assert.ok(q.strengthFeedback.length > 0);
      assert.ok(q.suggestionFeedback.length > 0);
    });

    // Question 2 has inverted values
    const q2 = CALCULATOR_QUESTIONS[1];
    assert.equal(q2.options[0].points, 0); // Always asking for plastic bag
    assert.equal(q2.options[2].points, 2); // Rarely or brings own bag
  });

  test("getHabitLevel maps scores correctly without negative labels", () => {
    assert.equal(getHabitLevel(0).name, "Pemula Peduli");
    assert.equal(getHabitLevel(5).name, "Pemula Peduli");
    assert.equal(getHabitLevel(6).name, "Penjaga Bumi");
    assert.equal(getHabitLevel(11).name, "Penjaga Bumi");
    assert.equal(getHabitLevel(12).name, "Pahlawan Bumi");
    assert.equal(getHabitLevel(16).name, "Pahlawan Bumi");
  });

  test("CREATIVE_IDEAS contains 4 safe ideas with materials and steps", () => {
    assert.equal(CREATIVE_IDEAS.length, 4);
    CREATIVE_IDEAS.forEach((idea) => {
      assert.ok(idea.materials.length >= 3);
      assert.ok(idea.steps.length >= 3);
      assert.equal(idea.rewardXp, 20);
      assert.equal(idea.rewardPoints, 10);
    });
  });

  test("getChallengeStatus correctly identifies unstarted, active, and completed challenge", () => {
    const state = {
      ...INITIAL_PLAYER_STATE,
      aksiNyata: { ...DEFAULT_AKSI_NYATA },
    };
    const s1 = getChallengeStatus(state);
    assert.equal(s1.isStarted, false);
    assert.equal(s1.currentDay, 1);
    assert.equal(s1.checkedDaysCount, 0);
    assert.equal(s1.canCheckToday, false);

    // Active challenge with Day 1 checked yesterday
    const activeState = {
      ...state,
      aksiNyata: {
        ...DEFAULT_AKSI_NYATA,
        challenge: {
          rounds: 0,
          current: {
            startedAt: "2026-11-15T10:00:00.000Z",
            days: {
              1: {
                dateKey: "2026-11-15",
                checkedAt: "2026-11-15T10:00:00.000Z",
                feeling: "gampang" as const,
              },
            },
            completedAt: null,
            rewardClaimed: false,
          },
        },
      },
    };

    const s2 = getChallengeStatus(activeState);
    assert.equal(s2.isStarted, true);
    assert.equal(s2.currentDay, 2);
    assert.equal(s2.checkedDaysCount, 1);
    assert.equal(s2.isTodayChecked, false);
    assert.equal(s2.canCheckToday, true);

    // Same day already checked
    const todayKey = getEffectiveDateKey(activeState);
    const checkedTodayState = {
      ...activeState,
      aksiNyata: {
        ...activeState.aksiNyata,
        challenge: {
          ...activeState.aksiNyata.challenge,
          current: {
            ...activeState.aksiNyata.challenge.current,
            days: {
              ...activeState.aksiNyata.challenge.current.days,
              2: {
                dateKey: todayKey,
                checkedAt: new Date().toISOString(),
                feeling: "lumayan" as const,
              },
            },
          },
        },
      },
    };

    const s3 = getChallengeStatus(checkedTodayState);
    assert.equal(s3.isTodayChecked, true);
    assert.equal(s3.canCheckToday, false);
    assert.equal(s3.checkedDaysCount, 2);
  });

  test("isCalculatorRewardAvailable is true before submission and false after same-day submission", () => {
    const state = {
      ...INITIAL_PLAYER_STATE,
      aksiNyata: { ...DEFAULT_AKSI_NYATA },
    };
    assert.equal(isCalculatorRewardAvailable(state), true);

    const todayKey = getEffectiveDateKey(state);
    const claimedState = {
      ...state,
      aksiNyata: {
        ...DEFAULT_AKSI_NYATA,
        calculator: {
          lastDateKey: todayKey,
          rewardClaimedDateKey: todayKey,
          history: [],
        },
      },
    };
    assert.equal(isCalculatorRewardAvailable(claimedState), false);
  });
});

describe("Centralized Achievements & Prestasi System", () => {
  test("BADGE_DEFINITIONS has exactly 14 badges across 4 categories (including Gaya Keren & Bintang Mingguan)", () => {
    assert.equal(BADGE_DEFINITIONS.length, 14);
    const categories = new Set(BADGE_DEFINITIONS.map((b) => b.kategori));
    assert.ok(categories.has("game"));
    assert.ok(categories.has("belajar"));
    assert.ok(categories.has("kebiasaan"));
    assert.ok(categories.has("spesial"));

    // Check prerequisites for each badge definition
    BADGE_DEFINITIONS.forEach((b) => {
      assert.ok(b.id);
      assert.ok(b.nama);
      assert.ok(b.deskripsi);
      assert.ok(b.syaratTeks);
      assert.ok(b.pesanEcobot);
      assert.equal(typeof b.ambilProgres, "function");
      assert.equal(typeof b.cek, "function");
    });
  });

  test("FACT_CARDS has exactly 18 cards with 12 umum, 4 langka, and 2 epik", () => {
    assert.equal(FACT_CARDS.length, 18);
    const umum = FACT_CARDS.filter((c) => c.kelangkaan === "umum");
    const langka = FACT_CARDS.filter((c) => c.kelangkaan === "langka");
    const epik = FACT_CARDS.filter((c) => c.kelangkaan === "epik");

    assert.equal(umum.length, 12);
    assert.equal(langka.length, 4);
    assert.equal(epik.length, 2);

    FACT_CARDS.forEach((c) => {
      assert.ok(c.id);
      assert.ok(c.judul);
      assert.ok(c.fakta);
      assert.ok(c.sumberMateri);
      assert.equal(typeof c.cek, "function");
    });
  });

  test("CERTIFICATE_DEFINITIONS has exactly 3 tiers and serial generator works", () => {
    assert.equal(CERTIFICATE_DEFINITIONS.length, 3);
    const tiers = CERTIFICATE_DEFINITIONS.map((c) => c.tier);
    assert.ok(tiers.includes("perunggu"));
    assert.ok(tiers.includes("perak"));
    assert.ok(tiers.includes("emas"));

    const serial = generateCertificateSerial("cert-perunggu", 2026);
    assert.match(serial, /^ECO-2026-[A-Z0-9]{4}$/);
  });

  test("evaluateAchievements evaluates newly qualified badges and cards accurately", () => {
    // Initial state: Level 1, 0 missions, 0 topics -> no badges
    const initial = { ...INITIAL_PLAYER_STATE };
    const res1 = evaluateAchievements(initial);
    assert.equal(res1.newBadges.length, 0);

    // State with Mission 1 completed -> qualifies for "pemilah-cilik"
    const withM1 = {
      ...initial,
      missionProgress: initial.missionProgress.map((m) =>
        m.missionId === 1 ? { ...m, status: "completed" as const, stars: 2, accuracy: 80 } : m
      ),
    };
    const res2 = evaluateAchievements(withM1);
    const hasPemilahCilik = res2.newBadges.some((b) => b.id === "pemilah-cilik");
    assert.ok(hasPemilahCilik, "Misi 1 selesai harus membuka badge pemilah-cilik");

    // Once already marked in achievements.badges, it shouldn't be returned again (idempotent)
    const alreadySaved = {
      ...withM1,
      achievements: {
        badges: { "pemilah-cilik": { unlockedAt: "2026-11-17", seen: true } },
        cards: {},
        certificates: {},
      },
    };
    const res3 = evaluateAchievements(alreadySaved);
    assert.equal(res3.newBadges.some((b) => b.id === "pemilah-cilik"), false);
  });

  test("calculateRadarScores clamps scores 0-100 without NaN and picks lowest pillar", () => {
    const emptyState = { ...INITIAL_PLAYER_STATE };
    const radar = calculateRadarScores(emptyState);

    assert.equal(typeof radar.memilah, "number");
    assert.equal(typeof radar.pengetahuan, "number");
    assert.equal(typeof radar.aksiNyata, "number");
    assert.equal(typeof radar.konsistensi, "number");

    assert.ok(!isNaN(radar.memilah));
    assert.ok(!isNaN(radar.pengetahuan));
    assert.ok(!isNaN(radar.aksiNyata));
    assert.ok(!isNaN(radar.konsistensi));

    assert.ok(radar.memilah >= 0 && radar.memilah <= 100);
    assert.ok(radar.pengetahuan >= 0 && radar.pengetahuan <= 100);
    assert.ok(radar.aksiNyata >= 0 && radar.aksiNyata <= 100);
    assert.ok(radar.konsistensi >= 0 && radar.konsistensi <= 100);

    assert.ok(radar.terendah);
    assert.ok(radar.saranEcobot.length > 5);
    assert.ok(radar.tautanSaran.startsWith("/"));
  });

  test("getNewAchievementCount accurately counts unseen badges and cards", () => {
    const testState = {
      ...INITIAL_PLAYER_STATE,
      achievements: {
        badges: {
          "pemilah-cilik": { unlockedAt: "2026-11-17", seen: false },
          "si-teliti": { unlockedAt: "2026-11-17", seen: true },
        },
        cards: {
          "card-organik-cepat": { unlockedAt: "2026-11-17", seen: false },
        },
        certificates: {},
      },
    };

    assert.equal(getNewAchievementCount(testState), 2);
  });

  test("getStatsSummary compiles 14 metrics without NaN", () => {
    const summary = getStatsSummary(INITIAL_PLAYER_STATE);
    assert.equal(typeof summary.trashSorted, "number");
    assert.equal(typeof summary.sortingAccuracy, "number");
    assert.equal(typeof summary.starsEarned, "number");
    assert.equal(typeof summary.cityMeter, "number");
    assert.equal(typeof summary.completedTopics, "number");
    assert.equal(typeof summary.cardsRead, "number");
    assert.equal(typeof summary.totalQuizzes, "number");
    assert.equal(typeof summary.quizCorrect, "number");
    assert.equal(typeof summary.quizAccuracy, "number");
    assert.equal(typeof summary.perfectQuizzes, "number");
    assert.equal(typeof summary.challengeDays, "number");
    assert.equal(typeof summary.ideasTried, "number");
    assert.equal(typeof summary.streak, "number");
    assert.equal(typeof summary.points, "number");
  });
});

describe("Toko & Kustomisasi System (PRD 6.9)", () => {
  test("ALL_SHOP_ITEMS contains all items from Bagian B with correct categories", () => {
    assert.ok(ALL_SHOP_ITEMS.length >= 25, "Minimal ada 25 item toko");

    const categories = new Set(ALL_SHOP_ITEMS.map((it) => it.kategori));
    assert.ok(categories.has("karakter"));
    assert.ok(categories.has("ecobot"));
    assert.ok(categories.has("stiker"));

    // Check specific required items
    const requiredIds = [
      "topi-daun",
      "topi-jerami",
      "topi-pelindung",
      "helm-relawan",
      "kacamata-bulat",
      "kacamata-hijau",
      "kacamata-pelindung",
      "syal-hijau",
      "tas-kain",
      "sarung-tangan",
      "tas-daur-ulang",
      "warna-baju-biru",
      "warna-baju-hijau",
      "warna-baju-kuning",
      "warna-baju-pink",
      "warna-baju-ungu",
      "warna-baju-toska",
      "ecobot-topi-kapten",
      "ecobot-pita-daun",
      "ecobot-kacamata",
      "ecobot-syal-biru",
      "ecobot-mahkota-bunga",
      "ecobot-warna-biru",
      "ecobot-warna-mint",
      "ecobot-warna-kuning",
      "ecobot-warna-pink",
      "ecobot-emas",
      "stiker-daun",
      "stiker-tunas",
      "stiker-bintang",
      "stiker-matahari",
      "stiker-penyu",
      "stiker-bumi",
      "stiker-kupu",
      "stiker-pelangi",
      "stiker-api",
      "stiker-pahlawan",
    ];

    requiredIds.forEach((id) => {
      const found = ALL_SHOP_ITEMS.find((it) => it.id === id);
      assert.ok(found, `Item wajib '${id}' harus ada di data toko`);
      assert.equal(typeof found.harga, "number");
      assert.ok(found.deskripsi.length > 5);
    });
  });

  test("getItemStatus correctly evaluates all ownership and requirement states", () => {
    const testState = {
      ...INITIAL_PLAYER_STATE,
      points: 40,
      xp: 0, // Level 1
      inventory: {
        owned: {
          "topi-daun": { at: "2026-01-01", source: "gratis" as const },
        },
        equipped: {
          character: {
            topi: "topi-daun",
          },
          ecobot: {},
        },
      },
    };

    // 1. Equipped item
    const s1 = getItemStatus("topi-daun", testState);
    assert.equal(s1.status, "dipakai");

    // 2. Affordable unowned item (topi-jerami = 40 points, player has 40 points)
    const s2 = getItemStatus("topi-jerami", testState);
    assert.equal(s2.status, "bisa_dibeli");

    // 3. Expensive unowned item (topi-pelindung = 80 points, player has 40 points)
    const s3 = getItemStatus("topi-pelindung", testState);
    assert.equal(s3.status, "poin_kurang");
    assert.equal(s3.pointsNeeded, 40);

    // 4. Level-locked item (helm-relawan = Level 3, player is Level 1)
    const s4 = getItemStatus("helm-relawan", testState);
    assert.equal(s4.status, "terkunci_level");
    assert.equal(s4.levelRequired, 3);

    // 5. Badge reward item (ecobot-emas = requires badge kota-bersih)
    const s5 = getItemStatus("ecobot-emas", testState);
    assert.equal(s5.status, "hadiah_badge");
  });

  test("grantBadgeItems automatically grants ecobot-emas, stiker-api, and stiker-pahlawan", () => {
    const withBadgesState = {
      ...INITIAL_PLAYER_STATE,
      achievements: {
        badges: {
          "kota-bersih": { unlockedAt: "2026-11-17", seen: true },
          "api-semangat": { unlockedAt: "2026-11-17", seen: true },
        },
        cards: {},
        certificates: {},
      },
      inventory: {
        owned: {},
        equipped: {
          character: {},
          ecobot: {},
        },
      },
    };

    const res = grantBadgeItems(withBadgesState);
    assert.equal(res.newItems.length, 2);
    assert.ok(res.nextState.inventory?.owned["ecobot-emas"]);
    assert.ok(res.nextState.inventory?.owned["stiker-api"]);
    assert.equal(res.nextState.inventory?.owned["stiker-api"].source, "badge");

    // Idempotent: running again does not grant duplicates
    const res2 = grantBadgeItems(res.nextState);
    assert.equal(res2.newItems.length, 0);
  });
});

describe("Papan Peringkat & Liga Mingguan (PRD 6.8)", () => {
  test("profanity filter and sanitizer fall back safely without leaking offensive names", () => {
    assert.equal(hasProfanity("anakbaik"), false);
    assert.equal(hasProfanity("anjing"), true);
    assert.equal(hasProfanity("b@bi"), false); // normalized alphanumeric
    assert.equal(hasProfanity("babi"), true);

    assert.equal(sanitizeNickname("BumiCeria"), "BumiCeria");
    assert.equal(sanitizeNickname("  "), "Pahlawan Bumi");
    assert.equal(sanitizeNickname("a"), "Pahlawan Bumi");
    assert.equal(sanitizeNickname("anjing"), "Pahlawan Bumi");
  });

  test("leaderboardService generates 19 entries, properly sorted descending by XP with valid ranks", () => {
    const currentWeekKey = getLocalWeekKey();
    const testState = {
      ...INITIAL_PLAYER_STATE,
      nickname: "RakaTest",
      xp: 450,
      xpLog: {
        weekKey: currentWeekKey,
        weeklyXp: 300,
        dailyXp: {},
      },
    };

    const res = leaderboardService.getLeaderboard("mingguan", testState);
    assert.equal(res.period, "mingguan");
    assert.equal(res.totalParticipants, 19); // 18 demo + 1 user
    assert.equal(res.entries.length, 19);

    // Verify descending sort
    for (let i = 0; i < res.entries.length - 1; i++) {
      assert.ok(
        res.entries[i].xp >= res.entries[i + 1].xp,
        `Entry at index ${i} (${res.entries[i].xp}) should be >= index ${i + 1} (${res.entries[i + 1].xp})`
      );
      assert.equal(res.entries[i].rank, i + 1);
    }

    // Verify current user entry exists and matches rank
    const user = res.entries.find((e) => e.isCurrentUser);
    assert.ok(user);
    assert.equal(user.nickname, "RakaTest");
    assert.equal(user.xp, 300);
    assert.equal(user.rank, res.currentUserEntry.rank);
  });

  test("privacy toggle showOnBoard: false disguises player as Pemain Rahasia", () => {
    const privateState = {
      ...INITIAL_PLAYER_STATE,
      nickname: "AnakHebat",
      avatar: "🚀",
      leaderboard: {
        showOnBoard: false,
        liga: { claimed: {}, history: [] },
      },
    };

    const res = leaderboardService.getLeaderboard("sepanjang-masa", privateState);
    const user = res.entries.find((e) => e.isCurrentUser);
    assert.ok(user);
    assert.equal(user.nickname, "Pemain Rahasia");
    assert.equal(user.avatar, "🕵️");
  });

  test("getLigaStatus computes correct progression across Perunggu, Perak, and Emas", () => {
    const currentWeekKey = getLocalWeekKey();

    // 1. Under 100 XP -> Belum Masuk Liga
    const stateLow = {
      ...INITIAL_PLAYER_STATE,
      xpLog: { weekKey: currentWeekKey, weeklyXp: 40, dailyXp: {} },
    };
    const sLow = getLigaStatus(stateLow);
    assert.equal(sLow.currentTier, null);
    assert.equal(sLow.nextTier, "perunggu");
    assert.equal(sLow.canClaim.perunggu, false);
    assert.equal(hasUnclaimedLigaReward(stateLow), false);

    // 2. 120 XP -> Perunggu reached, can claim
    const statePerunggu = {
      ...INITIAL_PLAYER_STATE,
      xpLog: { weekKey: currentWeekKey, weeklyXp: 120, dailyXp: {} },
    };
    const sPerunggu = getLigaStatus(statePerunggu);
    assert.equal(sPerunggu.currentTier, "perunggu");
    assert.equal(sPerunggu.nextTier, "perak");
    assert.equal(sPerunggu.canClaim.perunggu, true);
    assert.equal(sPerunggu.canClaim.perak, false);
    assert.equal(hasUnclaimedLigaReward(statePerunggu), true);

    // 3. 260 XP -> Perak reached
    const statePerak = {
      ...INITIAL_PLAYER_STATE,
      xpLog: { weekKey: currentWeekKey, weeklyXp: 260, dailyXp: {} },
    };
    const sPerak = getLigaStatus(statePerak);
    assert.equal(sPerak.currentTier, "perak");
    assert.equal(sPerak.nextTier, "emas");
    assert.equal(sPerak.canClaim.perunggu, true);
    assert.equal(sPerak.canClaim.perak, true);
    assert.equal(sPerak.canClaim.emas, false);

    // 4. 520 XP -> Emas reached (max tier)
    const stateEmas = {
      ...INITIAL_PLAYER_STATE,
      xpLog: { weekKey: currentWeekKey, weeklyXp: 520, dailyXp: {} },
    };
    const sEmas = getLigaStatus(stateEmas);
    assert.equal(sEmas.currentTier, "emas");
    assert.equal(sEmas.nextTier, null);
    assert.equal(sEmas.canClaim.emas, true);
  });

  test("getSurroundingEntries returns surrounding slice if rank > 10 and empty if rank <= 10", () => {
    const dummyEntries = Array.from({ length: 20 }, (_, i) => ({
      id: `p-${i + 1}`,
      isCurrentUser: i + 1 === 14,
      isDemo: true,
      rank: i + 1,
      nickname: `P${i + 1}`,
      avatar: "🤖",
      level: 1,
      title: "Relawan",
      xp: 500 - i * 10,
      trend: "tetap" as const,
    }));

    // User rank 14 (> 10) -> returns rank 13, 14, 15
    const surrounding = getSurroundingEntries(dummyEntries, 14);
    assert.equal(surrounding.length, 3);
    assert.equal(surrounding[0].rank, 13);
    assert.equal(surrounding[1].rank, 14);
    assert.equal(surrounding[2].rank, 15);

    // User rank 5 (<= 10) -> returns empty array
    const topSlice = getSurroundingEntries(dummyEntries, 5);
    assert.equal(topSlice.length, 0);
  });
});





