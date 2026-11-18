import { Engine, Scene } from "@babylonjs/core";
import {
  type CreateGameOptions,
  type IGameInstance,
  type MissionModule,
  type MoveVector,
  type GraphicsQuality,
  normalizeGraphicsQuality,
} from "./types";
import { TamanKotaScene } from "../scenes/tamanKota/tamanKotaScene";
import { QualityManager } from "../systems/QualityManager";

export async function createGame(options: CreateGameOptions): Promise<IGameInstance> {
  const { canvas, mission, settings, callbacks } = options;

  // 1. Initialize Babylon Engine & Scene
  const engine = new Engine(canvas, true, {
    preserveDrawingBuffer: false,
    stencil: false,
    powerPreference: "high-performance",
    failIfMajorPerformanceCaveat: false,
  });

  const scene = new Scene(engine);
  scene.clearColor.set(0.85, 0.94, 0.88, 1); // Soft pastel eco background

  // 2. Quality Manager (hardware scaling & adaptive FPS)
  const qualityManager = new QualityManager(
    engine,
    normalizeGraphicsQuality(settings?.graphicsQuality),
    (newQ) => {
      callbacks.onEcobotReaction?.("encourage", "Ecobot menyesuaikan grafis agar permainan tetap lancar.");
    }
  );

  // 3. Resize handling with ResizeObserver
  const resizeObserver = new ResizeObserver(() => {
    engine.resize();
  });
  resizeObserver.observe(canvas);

  // 4. WebGL Context Lost / Restored Protection
  const handleContextLost = (e: Event) => {
    e.preventDefault();
    callbacks.onError?.({
      code: "WEBGL_CONTEXT_LOST",
      message: "Koneksi grafis WebGL terputus. Silakan tekan Coba Lagi untuk memuat ulang taman.",
    });
  };

  const handleContextRestored = () => {
    // Engine will attempt to restore resources
  };

  canvas.addEventListener("webglcontextlost", handleContextLost);
  canvas.addEventListener("webglcontextrestored", handleContextRestored);

  // 5. Build Mission Scene
  // Currently supports Mission 1 (Taman Kota), easily extensible to Mission 2 & 6
  let activeMission: MissionModule;
  if (mission.id === 1 || mission.id === "taman-kota" as any) {
    activeMission = new TamanKotaScene();
  } else {
    // Fallback to Taman Kota
    activeMission = new TamanKotaScene();
  }

  const missionCtx = {
    canvas,
    engine,
    scene,
    options,
    callbacks,
    requestEcobotBubble: (text: string, mood?: "happy" | "encourage" | "cheer" | "shock") => {
      callbacks.onEcobotReaction?.(mood || "happy", text);
    },
  };

  await activeMission.buildScene(missionCtx);

  // 6. Loop & Lifecycle Variables
  let isPaused = false;
  let lastTime = performance.now();
  const activeMoveInput: MoveVector = { x: 0, y: 0 };
  (scene as any).__activeMoveInput = activeMoveInput;

  // Auto-pause when browser tab is hidden
  const handleVisibilityChange = () => {
    if (document.hidden && !isPaused) {
      isPaused = true;
      callbacks.onEcobotReaction?.("encourage", "Permainan dijeda otomatis karena kamu berpindah tab.");
    }
  };
  document.addEventListener("visibilitychange", handleVisibilityChange);

  // 7. Start Render Loop
  const renderLoop = () => {
    if (isPaused) return;

    const now = performance.now();
    let dt = (now - lastTime) / 1000;
    lastTime = now;

    // Clamp delta time to 50ms (0.05s) to prevent physics explosion after tab focus
    if (dt > 0.05) dt = 0.05;

    // Monitor FPS & Adaptive Quality
    qualityManager.monitorFps(dt);

    // Update active mission
    activeMission.onUpdate(dt);

    // Render Scene
    scene.render();
  };

  engine.runRenderLoop(renderLoop);

  return {
    start: () => {
      isPaused = false;
      lastTime = performance.now();
      activeMission.onStart();
    },

    pause: () => {
      isPaused = true;
    },

    resume: () => {
      isPaused = false;
      lastTime = performance.now();
    },

    setQuality: (quality: GraphicsQuality) => {
      qualityManager.applyQuality(quality);
    },

    setMuted: (muted: boolean) => {
      // Handled via audio in mission context
    },

    setInput: (vector: MoveVector) => {
      activeMoveInput.x = vector.x;
      activeMoveInput.y = vector.y;
    },

    pressAction: () => {
      if (isPaused) return;
      activeMission.onAction();
    },

    selectBagSlot: (index: number) => {
      // Forward to inventory slot selection
    },

    requestHint: () => {
      if (typeof (activeMission as any).requestHint === "function") {
        (activeMission as any).requestHint();
      }
    },

    devFinishMission: () => {
      if (typeof (activeMission as any).devFinishMission === "function") {
        (activeMission as any).devFinishMission();
      }
    },

    devTeleportToBin: () => {
      if (typeof (activeMission as any).devTeleportToBin === "function") {
        (activeMission as any).devTeleportToBin();
      }
    },

    devTeleportToTrash: () => {
      if (typeof (activeMission as any).devTeleportToTrash === "function") {
        (activeMission as any).devTeleportToTrash();
      }
    },

    dispose: () => {
      isPaused = true;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      resizeObserver.disconnect();

      engine.stopRenderLoop();
      activeMission.dispose();
      scene.dispose();
      engine.dispose();
    },
  };
}
