/**
 * ECOBOT 3D Game Engine Bridge
 * 
 * Interface kontrak antara antarmuka React dan 3D Game Engine (Babylon.js).
 * Mendukung pemuatan dinamis (dynamic import) engine 3D sesungguhnya
 * agar landing page & dashboard tetap ringan.
 */

import type { PlayerState } from "../types/player";
import { GAME_MISSIONS, type GameMissionConfig } from "../data/gameMissions";
import type { IGameInstance, ActionPromptState } from "./engine/types";

export type GraphicsQuality = "low" | "medium" | "high";

export interface MoveVector {
  x: number; // -1.0 to 1.0 (horizontal)
  y: number; // -1.0 to 1.0 (vertical)
}

export interface ScoreEventPayload {
  points: number;
  xp: number;
  reason: string;
  isCorrect: boolean;
  itemType?: "Organik" | "Anorganik" | "B3" | string;
}

export interface MissionProgressPayload {
  current: number;
  target: number;
  message?: string;
}

export interface MissionCompletePayload {
  missionId: number;
  accuracy: number; // 0 - 100
  timeSeconds: number;
  stars: number; // 1 - 3
  score: number;
  stats?: {
    correctCount: number;
    wrongCount: number;
    hintsUsed: number;
  };
  factHighlight?: string;
}

export interface BagChangePayload {
  items: Array<{ id: string; name: string; category: string; icon: string; colorHex: string }>;
  capacity: number;
  selectedIndex: number;
}

export interface IGameEngineEvents {
  onScore?: (data: ScoreEventPayload) => void;
  onMissionProgress?: (data: MissionProgressPayload) => void;
  onMissionComplete?: (data: MissionCompletePayload) => void;
  onCityMeter?: (percent: number) => void;
  onEcobotReaction?: (reaction: "happy" | "encourage" | "cheer" | "shock", text: string) => void;
  onBagChange?: (data: BagChangePayload) => void;
  onActionPromptChange?: (data: ActionPromptState) => void;
  onError?: (data: { code: string; message: string }) => void;
}

export interface IGameEngine {
  init(container: HTMLElement, options?: { quality?: GraphicsQuality; isMuted?: boolean; playerState?: PlayerState }): Promise<void>;
  startMission(missionId: number): void;
  pause(): void;
  resume(): void;
  setQuality(level: GraphicsQuality): void;
  setMuted(muted: boolean): void;
  onMove(vector: MoveVector): void;
  onAction(): void;
  selectBagSlot?(index: number): void;
  requestHint?(): void;
  devTeleportToBin?(): void;
  devTeleportToTrash?(): void;
  devFinishMission?(): void;
  destroy(): void;
}

/**
 * Real 3D Engine Bridge backed by Babylon.js with dynamic import()
 */
export class RealBabylonGameBridge implements IGameEngine {
  private events: IGameEngineEvents = {};
  private gameInstance: IGameInstance | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private activeMissionId = 1;
  private playerState?: PlayerState;
  private quality: GraphicsQuality = "medium";
  private isMuted = false;

  constructor(events: IGameEngineEvents = {}, playerState?: PlayerState) {
    this.events = events;
    this.playerState = playerState;
  }

  setEvents(events: IGameEngineEvents) {
    this.events = events;
  }

  async init(
    container: HTMLElement,
    options?: { quality?: GraphicsQuality; isMuted?: boolean; playerState?: PlayerState }
  ): Promise<void> {
    if (options?.quality) this.quality = options.quality;
    if (options?.isMuted !== undefined) this.isMuted = options.isMuted;
    if (options?.playerState) this.playerState = options.playerState;

    // Create Canvas inside container
    this.canvas = document.createElement("canvas");
    this.canvas.id = "babylon-game-canvas";
    this.canvas.className = "w-full h-full block outline-none select-none touch-none";
    this.canvas.style.display = "block";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";

    container.innerHTML = "";
    container.appendChild(this.canvas);

    // Dynamic import() so Babylon.js is loaded ONLY on demand
    const { createGame } = await import("./engine/createGame");

    const missionConfig: GameMissionConfig =
      GAME_MISSIONS.find((m) => m.id === this.activeMissionId) || GAME_MISSIONS[0];

    this.gameInstance = await createGame({
      canvas: this.canvas,
      mission: missionConfig,
      nickname: this.playerState?.nickname,
      settings: this.playerState?.settings || ({} as any),
      character: this.playerState?.character || ({} as any),
      inventory: this.playerState?.inventory || ({} as any),
      upgrades: this.playerState?.upgrades || ({} as any),
      callbacks: {
        onScore: this.events.onScore,
        onMissionProgress: this.events.onMissionProgress,
        onMissionComplete: this.events.onMissionComplete,
        onCityMeter: this.events.onCityMeter,
        onEcobotReaction: this.events.onEcobotReaction,
        onBagChange: (data) => {
          this.events.onBagChange?.({
            items: data.items.map((i) => ({
              id: i.id,
              name: i.name,
              category: i.category,
              icon: i.icon,
              colorHex: i.colorHex,
            })),
            capacity: data.capacity,
            selectedIndex: data.selectedIndex,
          });
        },
        onActionPromptChange: this.events.onActionPromptChange,
        onError: this.events.onError,
      },
    });
  }

  startMission(missionId: number): void {
    this.activeMissionId = missionId;
    if (this.gameInstance) {
      this.gameInstance.start();
    }
  }

  pause(): void {
    this.gameInstance?.pause();
  }

  resume(): void {
    this.gameInstance?.resume();
  }

  setQuality(level: GraphicsQuality): void {
    this.quality = level;
    this.gameInstance?.setQuality(level);
  }

  setMuted(muted: boolean): void {
    this.isMuted = muted;
    this.gameInstance?.setMuted(muted);
  }

  onMove(vector: MoveVector): void {
    this.gameInstance?.setInput(vector);
  }

  onAction(): void {
    this.gameInstance?.pressAction();
  }

  selectBagSlot(index: number): void {
    this.gameInstance?.selectBagSlot(index);
  }

  requestHint(): void {
    this.gameInstance?.requestHint();
  }

  devTeleportToBin(): void {
    this.gameInstance?.devTeleportToBin();
  }

  devTeleportToTrash(): void {
    this.gameInstance?.devTeleportToTrash();
  }

  devFinishMission(): void {
    this.gameInstance?.devFinishMission();
  }

  destroy(): void {
    this.gameInstance?.dispose();
    this.gameInstance = null;
    if (this.canvas) {
      this.canvas.remove();
      this.canvas = null;
    }
    this.events = {};
  }
}

/**
 * Mock Game Engine Bridge untuk ruang persiapan sebelum engine 3D resmi di-mount
 * atau pengujian dev cepat.
 */
export class MockGameBridge implements IGameEngine {
  private events: IGameEngineEvents = {};
  private activeMissionId = 1;
  private currentProgress = 0;
  private targetCount = 8;
  private correctItems = 0;
  private totalAttempts = 0;
  private score = 0;
  private startTime = 0;
  private isPaused = false;
  private quality: GraphicsQuality = "medium";
  private isMuted = false;

  constructor(events: IGameEngineEvents = {}) {
    this.events = events;
  }

  setEvents(events: IGameEngineEvents) {
    this.events = events;
  }

  async init(container: HTMLElement, options?: { quality?: GraphicsQuality; isMuted?: boolean }): Promise<void> {
    if (options?.quality) this.quality = options.quality;
    if (options?.isMuted !== undefined) this.isMuted = options.isMuted;
    this.startTime = Date.now();
  }

  startMission(missionId: number): void {
    this.activeMissionId = missionId;
    this.currentProgress = 0;
    this.correctItems = 0;
    this.totalAttempts = 0;
    this.score = 0;
    this.startTime = Date.now();
    this.isPaused = false;

    const targetMap: Record<number, number> = { 1: 8, 2: 12, 3: 10, 4: 3, 5: 3, 6: 30 };
    this.targetCount = targetMap[missionId] || 8;

    this.events.onMissionProgress?.({
      current: 0,
      target: this.targetCount,
      message: "Dekati sampah dan buang ke tong yang tepat!",
    });

    this.events.onEcobotReaction?.("happy", "Ayo mulai! Perhatikan warna tong sampahnya ya!");
  }

  pause(): void {
    this.isPaused = true;
  }

  resume(): void {
    this.isPaused = false;
  }

  setQuality(level: GraphicsQuality): void {
    this.quality = level;
  }

  setMuted(muted: boolean): void {
    this.isMuted = muted;
  }

  onMove(_vector: MoveVector): void {
    if (this.isPaused) return;
  }

  onAction(): void {
    if (this.isPaused) return;
    this.simulateCorrectSort();
  }

  simulateCorrectSort(): void {
    if (this.isPaused) return;
    this.totalAttempts++;
    this.correctItems++;
    this.currentProgress = Math.min(this.targetCount, this.currentProgress + 1);
    this.score += 10;

    this.events.onScore?.({
      points: 10,
      xp: 5,
      reason: "Sampah berhasil dipilah dengan benar!",
      isCorrect: true,
      itemType: "Organik",
    });

    this.events.onMissionProgress?.({
      current: this.currentProgress,
      target: this.targetCount,
    });

    this.events.onEcobotReaction?.("happy", "Hebat! Pilihanmu tepat sekali!");

    if (this.currentProgress >= this.targetCount) {
      this.triggerMissionComplete();
    }
  }

  simulateWrongSort(): void {
    if (this.isPaused) return;
    this.totalAttempts++;
    this.score = Math.max(0, this.score - 2);

    this.events.onScore?.({
      points: -2,
      xp: 0,
      reason: "Kurang tepat! Tong sampah tidak sesuai.",
      isCorrect: false,
      itemType: "Anorganik",
    });

    this.events.onEcobotReaction?.(
      "encourage",
      "Tidak apa-apa, ayo ingat lagi: Hijau (Organik), Kuning (Anorganik), Merah (B3)!"
    );
  }

  simulateFinishMission(): void {
    this.currentProgress = this.targetCount;
    this.correctItems = Math.max(this.correctItems, this.targetCount);
    this.totalAttempts = Math.max(this.totalAttempts, this.targetCount);
    this.score = Math.max(this.score, this.targetCount * 10);
    this.triggerMissionComplete();
  }

  private triggerMissionComplete(): void {
    const accuracy =
      this.totalAttempts > 0
        ? Math.min(100, Math.round((this.correctItems / this.totalAttempts) * 100))
        : 100;

    const timeSeconds = Math.max(12, Math.round((Date.now() - this.startTime) / 1000));
    const stars = accuracy >= 90 ? 3 : accuracy >= 75 ? 2 : 1;

    this.events.onMissionComplete?.({
      missionId: this.activeMissionId,
      accuracy,
      timeSeconds,
      stars,
      score: this.score,
      factHighlight: "Kulit pisang membutuhkan waktu 2 hingga 5 minggu untuk terurai alami di dalam tanah.",
    });
  }

  destroy(): void {
    this.events = {};
  }
}
