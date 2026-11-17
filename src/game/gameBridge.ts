/**
 * ECOBOT 3D Game Engine Bridge
 * 
 * Interface kontrak antara antarmuka React dan 3D Game Engine (Babylon.js / Three.js).
 * Saat engine 3D sesungguhnya diintegrasikan, engine mengimplementasikan IGameEngine
 * dan mendaftarkan callbacks IGameEngineEvents ke UI React.
 */

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
  itemType?: "Organik" | "Anorganik" | "B3";
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
}

export interface IGameEngineEvents {
  onScore?: (data: ScoreEventPayload) => void;
  onMissionProgress?: (data: MissionProgressPayload) => void;
  onMissionComplete?: (data: MissionCompletePayload) => void;
  onCityMeter?: (percent: number) => void;
  onEcobotReaction?: (reaction: "happy" | "encourage" | "cheer" | "shock", text: string) => void;
}

export interface IGameEngine {
  init(container: HTMLElement, options?: { quality?: GraphicsQuality; isMuted?: boolean }): Promise<void>;
  startMission(missionId: number): void;
  pause(): void;
  resume(): void;
  setQuality(level: GraphicsQuality): void;
  setMuted(muted: boolean): void;
  onMove(vector: MoveVector): void;
  onAction(): void;
  destroy(): void;
}

/**
 * Mock Game Engine Bridge untuk ruang persiapan sebelum engine 3D resmi di-mount.
 * Memungkinkan pengujian HUD, Virtual Joystick, Tombol Aksi, Skor, dan Layar Hasil.
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

    // Set target count per mission
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

  onMove(vector: MoveVector): void {
    // In real engine: translates player movement velocity
    if (this.isPaused) return;
  }

  onAction(): void {
    // In real engine: triggers pick-up or throw trash
    if (this.isPaused) return;
    this.simulateCorrectSort();
  }

  // Developer & Simulation Methods
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
    });
  }

  destroy(): void {
    this.events = {};
  }
}
