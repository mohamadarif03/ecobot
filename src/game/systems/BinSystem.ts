import type { TrashItemData, TrashCategory, GameCallbacks } from "../engine/types";
import type { BinItemEntry } from "../entities/trashBins";
import type { AudioFx } from "./AudioFx";
import type { Inventory } from "./Inventory";
import { TAMAN_KOTA_CONFIG } from "../data/tamanKotaConfig";

export class BinSystem {
  public correctCount = 0;
  public wrongCount = 0;
  public totalSorted = 0;
  public targetCount = 8;
  public hintsUsed = 0;

  private wrongHistoryPerItem: Record<string, number> = {};
  private callbacks: GameCallbacks;
  private audio: AudioFx;

  constructor(callbacks: GameCallbacks, audio: AudioFx, targetCount = 8) {
    this.callbacks = callbacks;
    this.audio = audio;
    this.targetCount = targetCount;
  }

  public sortItem(
    item: TrashItemData,
    bin: BinItemEntry,
    inventory: Inventory
  ): { isCorrect: boolean; message: string } {
    const isCorrect = item.category === bin.category;

    if (isCorrect) {
      // 1. Correct sort
      this.correctCount++;
      this.totalSorted++;
      bin.triggerOpen();
      this.audio.playBinCorrect();

      // Remove from bag
      inventory.removeSelectedItem();

      // Dispatch score (+10 points, +5 XP)
      this.callbacks.onScore?.({
        points: TAMAN_KOTA_CONFIG.scoring.correctPoints,
        xp: TAMAN_KOTA_CONFIG.scoring.correctXp,
        reason: `${item.name} berhasil dipilah ke ${bin.label}!`,
        isCorrect: true,
        itemType: item.category,
      });

      // Dispatch progress
      this.callbacks.onMissionProgress?.({
        current: this.totalSorted,
        target: this.targetCount,
        message: item.penjelasanBenar,
      });

      // Ecobot reaction
      this.callbacks.onEcobotReaction?.("happy", item.penjelasanBenar);

      return { isCorrect: true, message: item.penjelasanBenar };
    } else {
      // 2. Wrong sort
      this.wrongCount++;
      bin.triggerShake();
      this.audio.playBinWrong();

      this.wrongHistoryPerItem[item.id] = (this.wrongHistoryPerItem[item.id] || 0) + 1;
      const timesWrong = this.wrongHistoryPerItem[item.id];

      let explanation = item.penjelasanSalah[bin.category] || "Jenis sampahnya kurang sesuai dengan tong ini.";
      if (timesWrong >= 2) {
        const targetTongName =
          item.category === "organik" ? "Tong Hijau (Organik)" : item.category === "anorganik" ? "Tong Kuning (Anorganik)" : "Tong Merah (B3)";
        explanation += ` Petunjuk: coba masukkan ke ${targetTongName}!`;
      }

      // Dispatch score penalty (-2 points, 0 XP)
      this.callbacks.onScore?.({
        points: -TAMAN_KOTA_CONFIG.scoring.wrongPointsPenalty,
        xp: 0,
        reason: `Kurang tepat: ${item.name} bukan untuk ${bin.label}`,
        isCorrect: false,
        itemType: item.category,
      });

      // Ecobot encouraging reaction
      this.callbacks.onEcobotReaction?.("encourage", explanation);

      return { isCorrect: false, message: explanation };
    }
  }

  public getAccuracy(): number {
    const total = this.correctCount + this.wrongCount;
    if (total === 0) return 100;
    return Math.min(100, Math.round((this.correctCount / total) * 100));
  }

  public calculateStars(): number {
    const accuracy = this.getAccuracy();
    if (accuracy >= TAMAN_KOTA_CONFIG.stars.threeStarAccuracyPct) return 3;
    if (accuracy >= TAMAN_KOTA_CONFIG.stars.twoStarAccuracyPct) return 2;
    return 1;
  }

  public isMissionFinished(): boolean {
    return this.totalSorted >= this.targetCount;
  }
}
