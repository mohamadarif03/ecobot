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
} from "../data/missions.ts";
import {
  createDefaultMissionState,
  dispatchRecordEvent,
  selectClaimableCount,
  getMissionsWithStatus,
  INITIAL_PLAYER_STATE,
  DEFAULT_QUIZ_PROGRESS,
  getTodayQuizStatus,
  getQuizSummary,
} from "./playerStore.ts";
import {
  ALL_QUIZ_QUESTIONS,
  getDailyQuizQuestions,
  getTopicQuizQuestions,
  validateQuizQuestions,
} from "../data/kuis/questions.ts";
import { QUIZ_TOPICS } from "../data/kuis/topics.ts";
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

