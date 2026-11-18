import type { PlayerState } from "../../types/player";
import type { GameMissionConfig } from "../../data/gameMissions";

export type GraphicsQuality = "low" | "medium" | "high";

export function normalizeGraphicsQuality(q?: string): GraphicsQuality {
  if (q === "low" || q === "rendah") return "low";
  if (q === "high" || q === "tinggi") return "high";
  return "medium";
}

export interface MoveVector {
  x: number;
  y: number;
}

export type TrashCategory = "organik" | "anorganik" | "b3";

export interface TrashItemData {
  id: string;
  name: string;
  category: TrashCategory;
  colorHex: string;
  penjelasanBenar: string;
  penjelasanSalah: Record<TrashCategory, string>;
  faktaSingkat: string;
  icon: string;
}

export interface InventorySlot {
  item: TrashItemData;
  pickedAt: number;
}

export interface ActionPromptState {
  visible: boolean;
  type: "pickup" | "bin" | "full" | "none";
  label: string;
  subLabel?: string;
  targetId?: string;
}

export interface GameCallbacks {
  onScore?: (data: { points: number; xp: number; reason: string; isCorrect: boolean; itemType?: string }) => void;
  onMissionProgress?: (data: { current: number; target: number; message?: string }) => void;
  onMissionComplete?: (data: {
    missionId: number;
    accuracy: number;
    timeSeconds: number;
    stars: number;
    score: number;
    stats: {
      correctCount: number;
      wrongCount: number;
      hintsUsed: number;
    };
    factHighlight?: string;
  }) => void;
  onCityMeter?: (percent: number) => void;
  onEcobotReaction?: (reaction: "happy" | "encourage" | "cheer" | "shock", text: string) => void;
  onBagChange?: (data: { items: TrashItemData[]; capacity: number; selectedIndex: number }) => void;
  onActionPromptChange?: (prompt: ActionPromptState) => void;
  onError?: (data: { code: string; message: string }) => void;
  onFpsUpdate?: (fps: number, drawCalls: number, meshCount: number) => void;
}

export interface CreateGameOptions {
  canvas: HTMLCanvasElement;
  mission: GameMissionConfig;
  nickname?: string;
  settings: PlayerState["settings"];
  character: PlayerState["character"];
  inventory: PlayerState["inventory"];
  upgrades: PlayerState["upgrades"];
  callbacks: GameCallbacks;
}

export interface IGameInstance {
  start: () => void;
  pause: () => void;
  resume: () => void;
  setQuality: (quality: GraphicsQuality) => void;
  setMuted: (muted: boolean) => void;
  setInput: (vector: MoveVector) => void;
  pressAction: () => void;
  selectBagSlot: (index: number) => void;
  requestHint: () => void;
  devFinishMission: () => void;
  devTeleportToBin: () => void;
  devTeleportToTrash: () => void;
  dispose: () => void;
}

export interface MissionModule {
  id: string;
  buildScene: (ctx: MissionContext) => Promise<void>;
  onStart: () => void;
  onUpdate: (dt: number) => void;
  onAction: () => void;
  dispose: () => void;
}

export interface MissionContext {
  canvas: HTMLCanvasElement;
  engine: any;
  scene: any;
  options: CreateGameOptions;
  callbacks: GameCallbacks;
  requestEcobotBubble: (text: string, mood?: "happy" | "encourage" | "cheer" | "shock") => void;
}
