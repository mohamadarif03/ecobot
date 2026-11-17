import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  Settings,
  HelpCircle,
  LogOut,
  Star,
  CheckCircle2,
  Trophy,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { GAME_MISSIONS, GameMissionConfig } from "../../data/gameMissions";
import { LOADING_TIPS, getRandomLoadingTip } from "../../data/loadingTips";
import { EcobotMascot } from "../ecobot/EcobotMascot";
import { VirtualJoystick } from "./VirtualJoystick";
import {
  MockGameBridge,
  IGameEngine,
  ScoreEventPayload,
  MissionProgressPayload,
  MissionCompletePayload,
  MoveVector,
} from "../../game/gameBridge";
import { usePlayerStore } from "../../store/playerStore";
import { calculateLevel } from "../../data/levels";

interface GameStageProps {
  missionId: number;
  onExit: () => void;
  onMissionSelect?: (nextMissionId: number) => void;
}

type StagePhase = "loading" | "playing" | "paused" | "result" | "unsupported";

function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export const GameStage: React.FC<GameStageProps> = ({
  missionId,
  onExit,
  onMissionSelect,
}) => {
  const { state, completeMission, updateSettings } = usePlayerStore();
  const [phase, setPhase] = useState<StagePhase>("loading");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(getRandomLoadingTip);
  const [missionConfig, setMissionConfig] = useState<GameMissionConfig>(
    () => GAME_MISSIONS.find((m) => m.id === missionId) || GAME_MISSIONS[0]
  );

  // In-Game Live State
  const [score, setScore] = useState(0);
  const [itemsSorted, setItemsSorted] = useState(0);
  const [targetCount, setTargetCount] = useState(missionConfig.targetCount);
  const [ecobotBubble, setEcobotBubble] = useState<string | null>(
    "Ayo mulai! Perhatikan warna tong sampahnya ya!"
  );
  const [scoreFloating, setScoreFloating] = useState<{ text: string; positive: boolean } | null>(
    null
  );

  // Result state
  const [resultData, setResultData] = useState<{
    stars: number;
    score: number;
    accuracy: number;
    timeSeconds: number;
    xpEarned: number;
    pointsEarned: number;
    newBadges: string[];
  } | null>(null);

  // Pause menu subview
  const [pauseView, setPauseView] = useState<"menu" | "settings" | "mission">("menu");

  // Game Engine Reference
  const engineRef = useRef<IGameEngine | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Device detection for default input HUD
  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  const levelInfo = calculateLevel(state.xp);

  // 1. Lock body scroll on mount
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // 2. Browser Back Button Trap -> triggers pause instead of accidental leave
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      if (phase === "playing") {
        setPhase("paused");
        engineRef.current?.pause();
        window.history.pushState(null, "", window.location.href);
      }
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [phase]);

  // 3. Initialize Game Engine & Simulated Loading
  useEffect(() => {
    // Check WebGL first
    if (!checkWebGLSupport()) {
      setPhase("unsupported");
      return;
    }

    setPhase("loading");
    setLoadingProgress(0);

    // Tip rotation timer during loading
    const tipInterval = setInterval(() => {
      setCurrentTip(getRandomLoadingTip());
    }, 3000);

    // Simulate 2.5s asset loading (TODO: Replace with dynamic import of Babylon.js / Three.js engine)
    const startTime = Date.now();
    const duration = 2400;

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setLoadingProgress(pct);

      if (pct >= 100) {
        clearInterval(progressInterval);
        clearInterval(tipInterval);

        // Instantiate Mock Engine Bridge
        const bridge = new MockGameBridge({
          onScore: (data: ScoreEventPayload) => {
            setScore((prev) => Math.max(0, prev + data.points));
            setScoreFloating({
              text: data.points > 0 ? `+${data.points}` : `${data.points}`,
              positive: data.points > 0,
            });
            setTimeout(() => setScoreFloating(null), 1200);
          },
          onMissionProgress: (data: MissionProgressPayload) => {
            setItemsSorted(data.current);
            setTargetCount(data.target);
          },
          onMissionComplete: (data: MissionCompletePayload) => {
            const completed = completeMission({
              missionId: data.missionId,
              accuracy: data.accuracy,
              timeSeconds: data.timeSeconds,
              score: data.score,
            });

            setResultData({
              stars: completed.stars,
              score: data.score,
              accuracy: data.accuracy,
              timeSeconds: data.timeSeconds,
              xpEarned: completed.xpEarned,
              pointsEarned: completed.pointsEarned,
              newBadges: completed.newBadges,
            });

            setPhase("result");
          },
          onEcobotReaction: (_reaction, text) => {
            setEcobotBubble(text);
          },
        });

        engineRef.current = bridge;
        bridge.startMission(missionId);
        setPhase("playing");
      }
    }, 80);

    return () => {
      clearInterval(tipInterval);
      clearInterval(progressInterval);
      engineRef.current?.destroy();
    };
  }, [missionId, completeMission]);

  // Keyboard handlers for playing
  useEffect(() => {
    if (phase !== "playing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setPhase("paused");
        engineRef.current?.pause();
        return;
      }

      if (e.key === "e" || e.key === "E" || e.key === " ") {
        e.preventDefault();
        engineRef.current?.onAction();
        return;
      }

      // Movement keys
      let vx = 0;
      let vy = 0;
      if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") vy += 1;
      if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") vy -= 1;
      if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") vx -= 1;
      if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") vx += 1;

      if (vx !== 0 || vy !== 0) {
        engineRef.current?.onMove({ x: vx, y: vy });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase]);

  const handleJoystickMove = useCallback((vector: MoveVector) => {
    engineRef.current?.onMove(vector);
  }, []);

  const handleActionButton = () => {
    engineRef.current?.onAction();
  };

  const handleResume = () => {
    setPhase("playing");
    setPauseView("menu");
    engineRef.current?.resume();
  };

  const handleRestartMission = () => {
    setPhase("loading");
    setPauseView("menu");
    setScore(0);
    setItemsSorted(0);
    setResultData(null);
    setLoadingProgress(0);

    setTimeout(() => {
      setPhase("playing");
      engineRef.current?.startMission(missionId);
    }, 800);
  };

  // ==================== 1. FALLBACK SCREEN (No WebGL) ====================
  if (phase === "unsupported") {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mb-6 shadow-xl">
          <HelpCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black mb-3 text-white">
          Perangkatmu Belum Mendukung Game 3D
        </h2>
        <p className="text-slate-400 max-w-md text-sm sm:text-base leading-relaxed mb-8">
          Jangan khawatir! Kamu tetap bisa belajar memilah sampah, mengumpulkan XP, dan membaca fakta seru di Pustaka Edukasi serta Kuis Harian.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/pustaka"
            onClick={onExit}
            className="px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg"
          >
            <BookOpen className="w-4 h-4" />
            <span>Buka Pustaka Edukasi</span>
          </Link>
          <button
            type="button"
            onClick={onExit}
            className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ==================== 2. LOADING SCREEN ====================
  if (phase === "loading") {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 text-white flex flex-col items-center justify-between p-8 sm:p-12 select-none">
        {/* Top Header */}
        <div className="w-full max-w-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-widest text-sky-950 bg-white/80 px-3.5 py-1 rounded-full shadow-2xs">
              {missionConfig.subtitle}
            </span>
          </div>
          <span className="text-xs font-bold text-sky-100">
            {missionConfig.location}
          </span>
        </div>

        {/* Center Mascot & Mission Info */}
        <div className="flex flex-col items-center text-center my-auto">
          <div className="w-44 h-44 sm:w-56 sm:h-56 animate-[bounce_3s_ease-in-out_infinite] motion-reduce:animate-none filter drop-shadow-2xl mb-4">
            <EcobotMascot size="hero" className="w-full h-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Memuat {missionConfig.title}...
          </h2>
          <p className="text-sm text-sky-950/80 font-bold max-w-md mt-2">
            {missionConfig.description}
          </p>
        </div>

        {/* Bottom Loading Progress & Rotating Tip */}
        <div className="w-full max-w-xl space-y-4">
          {/* Tip Box */}
          <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 text-slate-900 shadow-md flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-left">
              <span className="text-[11px] font-black uppercase tracking-wider text-sky-700 block">
                Tips Lingkungan dari Ecobot
              </span>
              <p className="text-xs sm:text-sm font-medium text-slate-800 mt-0.5 leading-relaxed">
                "{currentTip.tip}"
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-black text-slate-950 mb-1.5 px-1">
              <span>Menyiapkan Kota Harapan...</span>
              <span>{loadingProgress}%</span>
            </div>
            <div className="w-full h-4 rounded-full bg-sky-950/20 p-0.5 shadow-inner">
              <div
                style={{ width: `${loadingProgress}%` }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-emerald-400 transition-all duration-150 shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== 3. RESULT SCREEN ====================
  if (phase === "result" && resultData) {
    const nextMissionIndex = GAME_MISSIONS.findIndex((m) => m.id === missionId) + 1;
    const nextMissionItem =
      nextMissionIndex < GAME_MISSIONS.length ? GAME_MISSIONS[nextMissionIndex] : null;

    return (
      <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl text-white flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto select-none">
        <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 to-slate-950 border border-sky-500/30 rounded-[36px] p-6 sm:p-8 shadow-2xl text-center">
          {/* Confetti Accent / Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-10 w-44 h-44 rounded-full bg-sky-500/20 blur-3xl pointer-events-none" />

          {/* Trophy Header */}
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Trophy className="w-8 h-8" />
          </div>

          <span className="text-xs font-black uppercase tracking-widest text-sky-400 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-800">
            Misi Selesai!
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2 text-white">
            {missionConfig.title}
          </h2>

          {/* Animated 3 Stars */}
          <div className="flex items-center justify-center gap-3 my-6">
            {[1, 2, 3].map((starNum) => {
              const isEarned = starNum <= resultData.stars;
              return (
                <div
                  key={starNum}
                  style={{ animationDelay: `${starNum * 180}ms` }}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 animate-fade-rise ${
                    isEarned
                      ? "bg-amber-400/20 border-amber-400 text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.35)] scale-110"
                      : "bg-slate-800/40 border-slate-700 text-slate-600"
                  }`}
                >
                  <Star
                    className={`w-8 h-8 ${
                      isEarned ? "fill-amber-400 stroke-amber-400" : "fill-none stroke-slate-600"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-6 text-left">
            <div className="p-3 rounded-2xl bg-slate-850 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block">Skor</span>
              <span className="text-lg font-black text-white">{resultData.score}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-850 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block">Akurasi</span>
              <span className="text-lg font-black text-emerald-400">
                {resultData.accuracy}%
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-850 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block">Waktu</span>
              <span className="text-lg font-black text-sky-400">
                {resultData.timeSeconds}s
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-850 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block">Hadiah</span>
              <span className="text-xs font-black text-yellow-300 leading-tight block mt-1">
                +{resultData.xpEarned} XP · +{resultData.pointsEarned} Poin
              </span>
            </div>
          </div>

          {/* New Badge Celebration (If any) */}
          {resultData.newBadges.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-500/40 text-amber-200 text-xs font-bold flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Selamat! Kamu membuka {resultData.newBadges.length} Badge Baru!</span>
            </div>
          )}

          {/* Ecobot Final Fact */}
          <div className="p-3.5 rounded-2xl bg-sky-950/60 border border-sky-800 text-left text-xs text-sky-200 mb-4">
            <strong className="text-sky-300 block mb-0.5">Catatan Ecobot:</strong>
            Setiap sampah yang kamu buang ke tong yang tepat membuat Kota Harapan semakin bersih dan asri!
          </div>

          {/* Daily Mission Progress Notification (PRD Bagian D) */}
          {(() => {
            const activeGameDaily = state.dailyMissions.find(
              (dm) => dm.type === "game" && dm.current > 0
            );
            if (!activeGameDaily) return null;
            return (
              <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-left text-xs text-emerald-200 mb-6 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Target className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">
                    Misi harian maju: <strong>{activeGameDaily.title}</strong>
                  </span>
                </div>
                <span className="font-mono font-bold text-emerald-300 shrink-0">
                  {activeGameDaily.current}/{activeGameDaily.target}
                </span>
              </div>
            );
          })()}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {nextMissionItem && nextMissionItem.available && (
              <button
                type="button"
                onClick={() => {
                  if (onMissionSelect) {
                    onMissionSelect(nextMissionItem.id);
                  }
                }}
                className="w-full py-3.5 rounded-full bg-[#5BC0EB] hover:bg-[#38BDF8] text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition"
              >
                <span>Misi Berikutnya: {nextMissionItem.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={handleRestartMission}
              className="w-full py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Main Ulang</span>
            </button>

            <button
              type="button"
              onClick={onExit}
              className="w-full py-3.5 rounded-full bg-transparent hover:bg-white/10 text-slate-300 font-bold text-sm"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== 4. PLAYING & PAUSE VIEWS ====================
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between overflow-hidden select-none"
    >
      {/* 3D ENGINE ROOT CANVAS CONTAINER (Background Placeholder) */}
      <div id="game-root" className="absolute inset-0 z-0 overflow-hidden">
        {/* Blocky Low-Poly City Silhouette & Sky Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-200 to-emerald-400" />

        {/* City Buildings Skyline SVG Silhouette */}
        <div className="absolute inset-x-0 bottom-0 h-72 sm:h-96 pointer-events-none opacity-80">
          <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full fill-emerald-600/70">
            {/* Background blocky hills & houses */}
            <rect x="20" y="140" width="80" height="160" rx="4" fill="#047857" />
            <rect x="120" y="110" width="100" height="190" rx="4" fill="#065F46" />
            <rect x="240" y="160" width="70" height="140" rx="4" fill="#047857" />
            <rect x="330" y="80" width="120" height="220" rx="4" fill="#064E3B" />
            <rect x="470" y="130" width="90" height="170" rx="4" fill="#047857" />
            <rect x="580" y="100" width="110" height="200" rx="4" fill="#065F46" />
            <rect x="710" y="150" width="80" height="150" rx="4" fill="#047857" />
            <rect x="810" y="90" width="130" height="210" rx="4" fill="#064E3B" />
            {/* Ground Grass Plane */}
            <rect x="0" y="240" width="1000" height="60" fill="#15803D" />
          </svg>
        </div>

        {/* Center Stage Mockup Notice */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6 text-center">
          <div className="bg-slate-900/80 backdrop-blur-md border border-white/20 p-6 rounded-3xl max-w-md shadow-2xl">
            <span className="text-xs font-black uppercase tracking-wider text-sky-400 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-800">
              Dunia 3D Engine Ready
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
              Zona {missionId}: {missionConfig.title}
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Wadah canvas 3D siap dihubungkan dengan engine Babylon.js / Three.js. Gunakan kontrol di bawah atau tombol dev untuk menguji gameplay!
            </p>
          </div>
        </div>

        {/* Floating Score Animation */}
        {scoreFloating && (
          <div
            className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-black px-4 py-2 rounded-2xl shadow-2xl backdrop-blur-md animate-[bounce_0.6s_ease-out] ${
              scoreFloating.positive
                ? "bg-emerald-500/90 text-white border-2 border-emerald-300"
                : "bg-rose-500/90 text-white border-2 border-rose-300"
            }`}
          >
            {scoreFloating.text} Poin!
          </div>
        )}
      </div>

      {/* ==================== TOP HUD OVERLAY ==================== */}
      <header className="relative z-20 flex items-center justify-between p-4 sm:p-6 pointer-events-auto">
        {/* Top Left: Level & Points */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-900/85 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2">
            <span className="text-xs font-black text-sky-400">
              Level {levelInfo.level}
            </span>
            <span className="text-xs font-black text-yellow-300">
              | {score} Poin
            </span>
          </div>
        </div>

        {/* Top Center: Active Mission Progress */}
        <div className="bg-slate-900/85 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-lg flex items-center gap-3 max-w-[280px] sm:max-w-md">
          <span className="text-xs font-black text-white truncate">
            {missionConfig.title}:
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-emerald-400">
              {itemsSorted}/{targetCount}
            </span>
            <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                style={{
                  width: `${Math.min(100, Math.round((itemsSorted / targetCount) * 100))}%`,
                }}
                className="h-full bg-emerald-400 rounded-full transition-all"
              />
            </div>
          </div>
        </div>

        {/* Top Right: City Cleanliness & Pause Button */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex bg-slate-900/85 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-lg items-center gap-1.5 text-xs font-black text-emerald-400">
            <span>Kota:</span>
            <span>{state.cityCleanlinessMeter}%</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setPhase("paused");
              engineRef.current?.pause();
            }}
            className="w-10 h-10 rounded-full bg-slate-900/85 hover:bg-slate-800 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-lg active:scale-95 transition cursor-pointer"
            aria-label="Jeda Permainan"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ==================== ECOBOT HELPER BUBBLE ==================== */}
      <div className="relative z-20 px-4 sm:px-6 flex items-start gap-3 pointer-events-auto max-w-xl">
        <button
          type="button"
          onClick={() =>
            setEcobotBubble((prev) =>
              prev ? null : "Ayo perhatikan jenis sampahnya sebelum memasukkan ke tong!"
            )
          }
          className="w-12 h-12 rounded-2xl bg-sky-400 hover:bg-sky-300 text-slate-950 flex items-center justify-center shadow-lg shrink-0 transition"
          title="Petunjuk dari Ecobot"
        >
          <EcobotMascot size="mini" className="w-8 h-8" />
        </button>

        {ecobotBubble && (
          <div className="p-3 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-sky-400/40 text-xs sm:text-sm text-sky-200 shadow-xl relative animate-fade-rise">
            <p className="font-bold">{ecobotBubble}</p>
          </div>
        )}
      </div>

      {/* ==================== DEV SIMULATION TOOLBAR ==================== */}
      <div className="relative z-20 flex items-center justify-center gap-2 p-2 pointer-events-auto">
        <div className="bg-slate-950/80 backdrop-blur-md border border-slate-700/80 rounded-full px-3 py-1.5 flex items-center gap-2 text-[11px] font-bold text-slate-300">
          <span className="text-yellow-400">Dev Sim:</span>
          <button
            type="button"
            onClick={() => (engineRef.current as MockGameBridge)?.simulateCorrectSort()}
            className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 hover:bg-emerald-500 hover:text-white border border-emerald-500/40 transition"
          >
            +10 Benar
          </button>
          <button
            type="button"
            onClick={() => (engineRef.current as MockGameBridge)?.simulateWrongSort()}
            className="px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-300 hover:bg-rose-500 hover:text-white border border-rose-500/40 transition"
          >
            -2 Salah
          </button>
          <button
            type="button"
            onClick={() => (engineRef.current as MockGameBridge)?.simulateFinishMission()}
            className="px-2.5 py-0.5 rounded-full bg-sky-500/30 text-sky-300 hover:bg-sky-500 hover:text-white border border-sky-500/40 transition"
          >
            Selesaikan Misi
          </button>
        </div>
      </div>

      {/* ==================== BOTTOM CONTROLS HUD ==================== */}
      {(() => {
        const isLeftHanded = Boolean(state.settings.leftHanded);
        const joystickPixelSize =
          state.settings.joystickSize === "kecil"
            ? 110
            : state.settings.joystickSize === "besar"
            ? 165
            : 136;

        const isAnalogActive =
          state.settings.controlMode === "touch" ||
          state.settings.controlMode === "analog" ||
          ((state.settings.controlMode === "auto" || state.settings.controlMode === "otomatis") &&
            isTouchDevice);

        const joystickElement = (
          <div className="pointer-events-auto">
            {isAnalogActive ? (
              <VirtualJoystick onMove={handleJoystickMove} size={joystickPixelSize} />
            ) : (
              <div className="bg-slate-900/80 backdrop-blur-md border border-white/20 p-3.5 rounded-2xl text-xs font-bold text-slate-300 space-y-1.5 shadow-xl">
                <div className="flex items-center gap-1.5">
                  <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-white font-mono text-[11px]">
                    W A S D
                  </kbd>
                  <span>untuk bergerak</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-white font-mono text-[11px]">
                    E / Spasi
                  </kbd>
                  <span>ambil / buang</span>
                </div>
              </div>
            )}
          </div>
        );

        const actionButtonElement = (
          <div className="pointer-events-auto">
            <button
              type="button"
              onClick={handleActionButton}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 active:scale-95 text-slate-950 font-black text-xs sm:text-sm tracking-tight flex flex-col items-center justify-center shadow-[0_8px_32px_rgba(16,185,129,0.4)] border-2 border-emerald-200 transition cursor-pointer select-none"
            >
              <span className="text-base sm:text-lg">♻️</span>
              <span>AMBIL</span>
              <span className="text-[10px] font-bold text-slate-800 opacity-90">/ BUANG</span>
            </button>
          </div>
        );

        return (
          <footer
            className={`relative z-20 flex items-end justify-between p-6 sm:p-8 pointer-events-none ${
              isLeftHanded ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {joystickElement}
            {actionButtonElement}
          </footer>
        );
      })()}

      {/* ==================== PAUSE MODAL ==================== */}
      {phase === "paused" && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-sky-500/30 rounded-[32px] p-6 sm:p-8 shadow-2xl text-white text-center">
            {pauseView === "menu" && (
              <>
                <h3 className="text-2xl font-black text-white mb-2">Permainan Dijeda</h3>
                <p className="text-xs text-slate-400 mb-6">
                  {missionConfig.title} · {missionConfig.location}
                </p>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleResume}
                    className="w-full py-3.5 rounded-full bg-[#5BC0EB] hover:bg-[#38BDF8] text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-md transition"
                  >
                    <Play className="w-4 h-4" />
                    <span>Lanjutkan Bermain</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPauseView("mission")}
                    className="w-full py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm"
                  >
                    Lihat Target Misi
                  </button>

                  <button
                    type="button"
                    onClick={() => setPauseView("settings")}
                    className="w-full py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Pengaturan Suara & Grafis</span>
                  </button>

                  <a
                    href="/bantuan?tab=kontrol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-full bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/30 font-bold text-xs flex items-center justify-center gap-2 transition"
                    title="Buka panduan kontrol dan tata letak layar di tab baru"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Panduan Kontrol & Bantuan ↗</span>
                  </a>

                  <button
                    type="button"
                    onClick={onExit}
                    className="w-full py-3 rounded-full bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/40 font-bold text-sm flex items-center justify-center gap-2 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar ke Dashboard</span>
                  </button>
                </div>
              </>
            )}

            {pauseView === "mission" && (
              <>
                <h3 className="text-xl font-black text-white mb-2">Target Misi</h3>
                <p className="text-sm text-sky-400 font-bold mb-4">{missionConfig.title}</p>
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-left text-xs text-slate-300 space-y-2 mb-6">
                  <p>
                    <strong className="text-white">Deskripsi:</strong> {missionConfig.description}
                  </p>
                  <p>
                    <strong className="text-white">Target:</strong> {missionConfig.targetDescription}
                  </p>
                  <p>
                    <strong className="text-white">Progres Sekarang:</strong> {itemsSorted} / {targetCount}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPauseView("menu")}
                  className="w-full py-3 rounded-full bg-slate-800 text-white font-bold text-sm"
                >
                  Kembali
                </button>
              </>
            )}

            {pauseView === "settings" && (
              <>
                <h3 className="text-xl font-black text-white mb-4">Pengaturan Cepat</h3>
                <div className="space-y-4 text-left text-xs mb-6">
                  {/* Volume Slider */}
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Volume Efek</span>
                      <span>{state.settings.sfxVolume}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={state.settings.sfxVolume}
                      onChange={(e) => updateSettings({ sfxVolume: Number(e.target.value) })}
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                  </div>

                  {/* Graphics Quality */}
                  <div>
                    <span className="font-bold block mb-1.5">Kualitas Grafis</span>
                    <div className="grid grid-cols-3 gap-2">
                      {(["low", "medium", "high"] as const).map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => {
                            updateSettings({ graphicsQuality: q });
                            engineRef.current?.setQuality(q);
                          }}
                          className={`py-2 rounded-xl text-xs font-black uppercase transition ${
                            state.settings.graphicsQuality === q
                              ? "bg-sky-500 text-slate-950"
                              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                          }`}
                        >
                          {q === "low" ? "Rendah" : q === "medium" ? "Sedang" : "Tinggi"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPauseView("menu")}
                  className="w-full py-3 rounded-full bg-slate-800 text-white font-bold text-sm"
                >
                  Simpan & Kembali
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
