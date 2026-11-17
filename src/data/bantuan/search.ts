import type { SearchResultItem } from "./types.ts";
import { FAQ_ITEMS } from "./faq.ts";
import { CORE_PLAY_STEPS, ADVANCED_PLAY_STEPS, TRASH_BINS, STAR_RULES, ECONOMY_CONCEPTS } from "./guide.ts";
import { PC_KEYBOARD_CONTROLS, MOBILE_TOUCH_CONTROLS, HUD_ELEMENTS } from "./controls.ts";
import { FEATURE_MENU_ITEMS } from "./featureMap.ts";

/**
 * Mencari konten bantuan secara fleksibel dan ramah anak di seluruh tab
 */
export function searchHelpContent(query: string): SearchResultItem[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed || trimmed.length < 2) {
    return [];
  }

  const queryTerms = trimmed.split(/\s+/).filter((t) => t.length > 0);
  const results: SearchResultItem[] = [];

  // 1. Search in FAQ
  for (const faq of FAQ_ITEMS) {
    let score = 0;
    const qLower = faq.question.toLowerCase();
    const aLower = faq.answer.toLowerCase();
    const kwJoined = faq.keywords.join(" ").toLowerCase();

    if (qLower.includes(trimmed)) score += 100;
    if (kwJoined.includes(trimmed)) score += 60;
    if (aLower.includes(trimmed)) score += 30;

    for (const term of queryTerms) {
      if (qLower.includes(term)) score += 25;
      if (kwJoined.includes(term)) score += 15;
      if (aLower.includes(term)) score += 5;
    }

    if (score > 0) {
      results.push({
        id: faq.id,
        tab: "faq",
        sourceCategory: "FAQ",
        title: faq.question,
        snippet: faq.answer.length > 120 ? faq.answer.slice(0, 120) + "..." : faq.answer,
        targetId: faq.id,
        actionUrl: faq.actionLink?.href,
        score,
      });
    }
  }

  // 2. Search in Cara Bermain (Steps & Bins)
  for (const step of [...CORE_PLAY_STEPS, ...ADVANCED_PLAY_STEPS]) {
    let score = 0;
    const tLower = step.title.toLowerCase();
    const dLower = step.description.toLowerCase();

    if (tLower.includes(trimmed)) score += 90;
    if (dLower.includes(trimmed)) score += 30;

    for (const term of queryTerms) {
      if (tLower.includes(term)) score += 20;
      if (dLower.includes(term)) score += 10;
    }

    if (score > 0) {
      results.push({
        id: `guide-step-${step.step}`,
        tab: "cara-bermain",
        sourceCategory: "Cara Bermain",
        title: `Langkah ${step.step}: ${step.title}`,
        snippet: step.description,
        targetId: `guide-step-${step.step}`,
        score,
      });
    }
  }

  for (const bin of TRASH_BINS) {
    let score = 0;
    const nLower = bin.name.toLowerCase();
    const dLower = bin.description.toLowerCase();
    const exJoined = bin.examples.join(" ").toLowerCase();

    if (nLower.includes(trimmed)) score += 95;
    if (exJoined.includes(trimmed)) score += 70;
    if (dLower.includes(trimmed)) score += 35;

    for (const term of queryTerms) {
      if (nLower.includes(term)) score += 25;
      if (exJoined.includes(term)) score += 20;
      if (dLower.includes(term)) score += 10;
    }

    if (score > 0) {
      results.push({
        id: `bin-${bin.id}`,
        tab: "cara-bermain",
        sourceCategory: "Cara Bermain",
        title: bin.name,
        snippet: `${bin.category}. Contoh: ${bin.examples.slice(0, 3).join(", ")}.`,
        targetId: "section-tiga-tong",
        score,
      });
    }
  }

  for (const star of STAR_RULES) {
    let score = 0;
    const lLower = star.label.toLowerCase();
    const dLower = star.description.toLowerCase();

    if (lLower.includes(trimmed) || trimmed.includes("bintang")) score += 40;
    if (dLower.includes(trimmed)) score += 25;

    if (score > 0) {
      results.push({
        id: `star-rule-${star.stars}`,
        tab: "cara-bermain",
        sourceCategory: "Cara Bermain",
        title: star.label,
        snippet: `${star.condition} - ${star.description}`,
        targetId: "section-aturan-bintang",
        score,
      });
    }
  }

  for (const eco of ECONOMY_CONCEPTS) {
    let score = 0;
    const nLower = eco.name.toLowerCase();
    const sLower = eco.shortDesc.toLowerCase();

    if (nLower.includes(trimmed)) score += 80;
    if (sLower.includes(trimmed)) score += 30;

    for (const term of queryTerms) {
      if (nLower.includes(term)) score += 20;
      if (sLower.includes(term)) score += 10;
    }

    if (score > 0) {
      results.push({
        id: `eco-${eco.name}`,
        tab: "cara-bermain",
        sourceCategory: "Cara Bermain",
        title: eco.name,
        snippet: `${eco.shortDesc} Cara dapat: ${eco.howToEarn}`,
        targetId: "section-gamifikasi",
        score,
      });
    }
  }

  // 3. Search in Kontrol & HUD
  for (const ctrl of PC_KEYBOARD_CONTROLS) {
    let score = 0;
    const aLower = ctrl.action.toLowerCase();
    const kLower = ctrl.key.toLowerCase();
    const dLower = ctrl.description.toLowerCase();

    if (aLower.includes(trimmed)) score += 85;
    if (kLower.includes(trimmed)) score += 75;
    if (dLower.includes(trimmed)) score += 25;

    for (const term of queryTerms) {
      if (aLower.includes(term) || kLower.includes(term)) score += 20;
      if (dLower.includes(term)) score += 5;
    }

    if (score > 0) {
      results.push({
        id: `ctrl-pc-${ctrl.key}`,
        tab: "kontrol",
        sourceCategory: "Kontrol",
        title: `Tombol ${ctrl.key} (${ctrl.action})`,
        snippet: ctrl.description,
        targetId: "section-kontrol-pc",
        score,
      });
    }
  }

  for (const ctrl of MOBILE_TOUCH_CONTROLS) {
    let score = 0;
    const eLower = ctrl.element.toLowerCase();
    const dLower = ctrl.description.toLowerCase();

    if (eLower.includes(trimmed)) score += 85;
    if (dLower.includes(trimmed)) score += 30;

    for (const term of queryTerms) {
      if (eLower.includes(term)) score += 20;
      if (dLower.includes(term)) score += 10;
    }

    if (score > 0) {
      results.push({
        id: `ctrl-mobile-${ctrl.element}`,
        tab: "kontrol",
        sourceCategory: "Kontrol",
        title: `Kontrol Layar Sentuh: ${ctrl.element}`,
        snippet: ctrl.description,
        targetId: "section-kontrol-mobile",
        score,
      });
    }
  }

  for (const hud of HUD_ELEMENTS) {
    let score = 0;
    const nLower = hud.name.toLowerCase();
    const dLower = hud.description.toLowerCase();

    if (nLower.includes(trimmed)) score += 80;
    if (dLower.includes(trimmed)) score += 30;

    for (const term of queryTerms) {
      if (nLower.includes(term)) score += 20;
      if (dLower.includes(term)) score += 10;
    }

    if (score > 0) {
      results.push({
        id: `hud-${hud.number}`,
        tab: "kontrol",
        sourceCategory: "Kontrol",
        title: `HUD #${hud.number}: ${hud.name} (${hud.position})`,
        snippet: hud.description,
        targetId: "section-hud-layout",
        score,
      });
    }
  }

  // 4. Search in Peta Fitur
  for (const feat of FEATURE_MENU_ITEMS) {
    let score = 0;
    const nLower = feat.name.toLowerCase();
    const dLower = feat.shortDescription.toLowerCase();
    const hlJoined = feat.highlights.join(" ").toLowerCase();

    if (nLower.includes(trimmed)) score += 95;
    if (dLower.includes(trimmed)) score += 40;
    if (hlJoined.includes(trimmed)) score += 30;

    for (const term of queryTerms) {
      if (nLower.includes(term)) score += 25;
      if (dLower.includes(term)) score += 10;
      if (hlJoined.includes(term)) score += 10;
    }

    if (score > 0) {
      results.push({
        id: `feat-${feat.id}`,
        tab: "peta",
        sourceCategory: "Peta Fitur",
        title: `Menu: ${feat.name}`,
        snippet: `${feat.shortDescription} Hal seru: ${feat.highlights[0]}`,
        actionUrl: feat.path,
        targetId: `feature-card-${feat.id}`,
        score,
      });
    }
  }

  // Sort descending by score and remove duplicate targets
  results.sort((a, b) => b.score - a.score);

  return results;
}
