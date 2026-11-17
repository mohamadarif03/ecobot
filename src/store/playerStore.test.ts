import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { calculateLevel, LEVELS } from "../data/levels.ts";
import { ENVIRONMENTAL_FACTS, getTodayFact } from "../data/facts.ts";

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
