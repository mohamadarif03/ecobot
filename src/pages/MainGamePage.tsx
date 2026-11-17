import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Sparkles,
  Gamepad2,
  Lock,
  CheckCircle2,
  Play,
  RotateCcw,
  Star,
  Info,
  Volume2,
  VolumeX,
  Smartphone,
  Laptop,
  RotateCw,
  ShoppingBag,
  Zap,
  Target,
  AlertCircle,
  HelpCircle,
  Compass,
  ArrowRight,
  ShieldAlert,
  TreePine,
  Store,
  Waves,
  Hammer,
  Clock,
} from "lucide-react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { EcobotMascot } from "../components/ecobot/EcobotMascot";
import { usePlayerStore } from "../store/playerStore";
import { calculateLevel } from "../data/levels";
import {
  GAME_MISSIONS,
  getMissionStatus,
  calculateStars,
  GameMissionConfig,
} from "../data/gameMissions";
import {
  CHARACTER_SKINS,
  CHARACTER_COLORS,
  CHARACTER_ACCESSORIES,
} from "../data/characterOptions";
import { GAME_UPGRADES, UpgradeId } from "../data/gameUpgrades";
import { LOADING_TIPS, getRandomLoadingTip, LoadingTip } from "../data/loadingTips";
import { CharacterPreview } from "../components/game/CharacterPreview";
import { GameStage } from "../components/game/GameStage";

export default function MainGamePage() {
  const navigate = useNavigate();
  const {
    state,
    setCharacter,
    purchaseUpgrade,
    resetGameProgress,
    updateSettings,
    updateStreak,
  } = usePlayerStore();

  // Active game stage session
  const [playingMissionId, setPlayingMissionId] = useState<number | null>(null);

  // Modals & UI states
  const [showStarInfoModal, setShowStarInfoModal] = useState(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const [resetConfirmStep, setResetConfirmStep] = useState<1 | 2>(1);
  const [currentTip, setCurrentTip] = useState<LoadingTip>(getRandomLoadingTip);
  const [controlCheckTab, setControlCheckTab] = useState<"auto" | "keyboard" | "touch">("auto");
  const [upgradeFeedback, setUpgradeFeedback] = useState<string | null>(null);

  // Device detection
  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  // Auto-detect recommended graphics quality based on device memory and concurrency
  const recommendedQuality = useMemo<"low" | "medium" | "high">(() => {
    if (typeof window === "undefined") return "medium";
    const cores = navigator.hardwareConcurrency || 4;
    // @ts-expect-error deviceMemory is supported in Chromium
    const memory = navigator.deviceMemory || 4;
    if (cores >= 8 && memory >= 6) return "high";
    if (cores <= 2 || memory <= 2) return "low";
    return "medium";
  }, []);

  // 1. Redirect to onboarding if no nickname
  useEffect(() => {
    if (!state.nickname || state.nickname.trim() === "") {
      navigate("/onboarding", { replace: true });
    }
  }, [state.nickname, navigate]);

  // 2. Daily streak tracking on mount
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  const levelInfo = calculateLevel(state.xp);

  // Total stars earned
  const totalStars = state.missionProgress.reduce((sum, m) => sum + (m.stars || 0), 0);
  const hasGameProgress = state.missionProgress.some((m) => m.stars > 0 || m.status === "completed");

  // Determine the next mission to continue
  const nextPlayableMission = useMemo(() => {
    // 1. First available mission not yet completed
    const firstAvailable = GAME_MISSIONS.find((m) => {
      if (!m.available) return false;
      const status = getMissionStatus(m.id, state.missionProgress);
      return status === "available";
    });
    if (firstAvailable) return firstAvailable;

    // 2. Or the highest completed mission with less than 3 stars
    const replayable = GAME_MISSIONS.find((m) => {
      if (!m.available) return false;
      const progress = state.missionProgress.find((p) => p.missionId === m.id);
      return progress && progress.status === "completed" && progress.stars < 3;
    });
    if (replayable) return replayable;

    // Fallback to mission 1
    return GAME_MISSIONS[0];
  }, [state.missionProgress]);

  const handleStartMission = (missionId: number) => {
    const config = GAME_MISSIONS.find((m) => m.id === missionId);
    if (!config || !config.available) return;
    const status = getMissionStatus(missionId, state.missionProgress);
    if (status === "locked") return;

    setPlayingMissionId(missionId);
  };

  const handlePurchase = (upgradeId: UpgradeId) => {
    const success = purchaseUpgrade(upgradeId);
    if (success) {
      const config = GAME_UPGRADES[upgradeId];
      setUpgradeFeedback(`Berhasil upgrade ${config.name}! Poin telah dipotong.`);
      setTimeout(() => setUpgradeFeedback(null), 3000);
    }
  };

  const handleConfirmReset = () => {
    if (resetConfirmStep === 1) {
      setResetConfirmStep(2);
      return;
    }
    resetGameProgress();
    setShowResetConfirmModal(false);
    setResetConfirmStep(1);
  };

  // Helper for mission icons
  const renderMissionIcon = (icon: GameMissionConfig["icon"]) => {
    switch (icon) {
      case "park":
        return <TreePine className="w-5 h-5 text-emerald-600" />;
      case "market":
        return <Store className="w-5 h-5 text-amber-600" />;
      case "river":
        return <Waves className="w-5 h-5 text-sky-600" />;
      case "warn":
        return <AlertCircle className="w-5 h-5 text-rose-600" />;
      case "facility":
        return <Hammer className="w-5 h-5 text-indigo-600" />;
      case "conveyor":
      default:
        return <Clock className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <DashboardLayout
      title="Main Game"
      subtitle="Bersihkan Kota Harapan bersama Ecobot"
    >
      {/* ==================== GAME STAGE OVERLAY ==================== */}
      {playingMissionId !== null && (
        <GameStage
          missionId={playingMissionId}
          onExit={() => setPlayingMissionId(null)}
          onMissionSelect={(nextId) => setPlayingMissionId(nextId)}
        />
      )}

      {/* ==================== 1. HERO BANNER ==================== */}
      <section className="rounded-[26px] bg-gradient-to-r from-[#38BDF8] via-[#20B5F0] to-[#0EA5E9] px-6 sm:px-7 py-6 relative overflow-hidden shadow-[0_4px_20px_rgba(14,165,233,0.18)] min-h-[178px] flex flex-col justify-between">
        {/* Background ambient accents */}
        <div className="w-16 h-16 rounded-full bg-sky-200/40 absolute -top-4 left-44 pointer-events-none" />
        <div className="w-[85px] h-[85px] rounded-full bg-emerald-400/35 absolute top-1 right-[160px] pointer-events-none" />
        <div className="w-[120px] h-[120px] rounded-full bg-white/10 absolute -bottom-8 right-[110px] pointer-events-none" />

        <div className="relative z-10 max-w-[620px]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/25 backdrop-blur-xs text-slate-950 text-xs font-bold mb-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Dari Ecobot</span>
          </div>

          <h2 className="text-[26px] sm:text-[32px] font-black text-slate-950 tracking-tight leading-tight mt-1 mb-3">
            Siap bersihkan kota, {state.nickname}?
          </h2>

          {/* Metric Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-white/90 text-sky-950 text-xs font-black shadow-2xs">
              Meter Kota {state.cityCleanlinessMeter}%
            </span>
            <span className="px-3 py-1 rounded-full bg-white/90 text-amber-900 text-xs font-black shadow-2xs flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{totalStars}/18 bintang</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-white/90 text-emerald-900 text-xs font-black shadow-2xs">
              Level {levelInfo.level} · {levelInfo.title}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => handleStartMission(nextPlayableMission.id)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-900 text-white font-black text-sm shadow-md hover:scale-[1.02] active:scale-95 transition cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4 text-sky-400" />
              <span>
                {hasGameProgress
                  ? `Lanjutkan: ${nextPlayableMission.title}`
                  : "Mulai Petualangan"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {hasGameProgress && (
              <button
                type="button"
                onClick={() => {
                  setResetConfirmStep(1);
                  setShowResetConfirmModal(true);
                }}
                className="px-4 py-2.5 rounded-full bg-white/80 hover:bg-white text-rose-700 font-bold text-xs shadow-2xs transition cursor-pointer border border-rose-200"
              >
                Mulai Baru
              </button>
            )}
          </div>
        </div>

        {/* Mascot Peeking on the Right */}
        <div className="w-[130px] sm:w-[150px] h-[130px] sm:h-[150px] absolute -bottom-1 right-2 sm:right-6 pointer-events-none select-none drop-shadow-xl">
          <EcobotMascot size="hero" className="w-full h-full" />
        </div>
      </section>

      {/* ==================== 2-COLUMN MAIN CONTENT ==================== */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ==================== LEFT COLUMN: PETA MISI ==================== */}
        <section className="lg:col-span-7 bg-white rounded-[26px] p-6 shadow-sm border border-sky-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                  <Compass className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Misi Kota Harapan</h3>
                  <p className="text-xs text-slate-500">
                    Selesaikan 6 zona berurutan untuk mencapai 100% Kebersihan Kota
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowStarInfoModal(true)}
                className="p-1.5 text-slate-400 hover:text-sky-600 rounded-lg hover:bg-sky-50 transition cursor-pointer"
                title="Aturan Bintang"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>

            {/* Missions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {GAME_MISSIONS.map((mission) => {
                const status = getMissionStatus(mission.id, state.missionProgress);
                const progress = state.missionProgress.find((m) => m.missionId === mission.id);
                const starsEarned = progress?.stars || 0;
                const isLocked = status === "locked" || !mission.available;
                const isCompleted = status === "completed";

                return (
                  <div
                    key={mission.id}
                    className={`rounded-2xl p-4 border transition flex flex-col justify-between ${
                      isCompleted
                        ? "bg-emerald-50/60 border-emerald-200/90 shadow-2xs"
                        : isLocked
                        ? "bg-slate-50/70 border-slate-200 opacity-80"
                        : "bg-white border-sky-200 hover:border-sky-400 shadow-xs hover:shadow-md"
                    }`}
                  >
                    <div>
                      {/* Top Bar: Icon, Number, Stars / Status */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shadow-2xs">
                            {renderMissionIcon(mission.icon)}
                          </div>
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                            Misi {mission.id}
                          </span>
                        </div>

                        {!mission.available ? (
                          <span className="text-[10px] font-black uppercase tracking-wide bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200">
                            Segera Hadir
                          </span>
                        ) : isCompleted ? (
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  s <= starsEarned
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-none text-slate-300"
                                }`}
                              />
                            ))}
                          </div>
                        ) : isLocked ? (
                          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Terkunci</span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-black uppercase tracking-wide bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">
                            Tersedia
                          </span>
                        )}
                      </div>

                      {/* Title & Description */}
                      <h4 className="text-[15px] font-black text-slate-900 leading-snug">
                        {mission.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {mission.description}
                      </p>

                      {/* Target Pill */}
                      <div className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100/80 px-2.5 py-0.5 rounded-md">
                        <Target className="w-3 h-3 text-sky-600 shrink-0" />
                        <span className="truncate">{mission.targetDescription}</span>
                      </div>
                    </div>

                    {/* Bottom Action / Lock Requirement */}
                    <div className="mt-4 pt-3 border-t border-slate-150/70">
                      {isLocked ? (
                        <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                          <Lock className="w-3 h-3 shrink-0" />
                          <span className="truncate">{mission.prerequisiteText}</span>
                        </p>
                      ) : isCompleted ? (
                        <button
                          type="button"
                          onClick={() => handleStartMission(mission.id)}
                          className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-2xs transition cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Main Ulang ({starsEarned}/3 Bintang)</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleStartMission(mission.id)}
                          className="w-full py-2 rounded-xl bg-[#5BC0EB] hover:bg-[#38BDF8] text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition hover:scale-[1.02] cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-slate-950" />
                          <span>Main Sekarang</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== RIGHT COLUMN: KARAKTERKU, PENGATURAN, UPGRADE ==================== */}
        <div className="lg:col-span-5 space-y-6">
          {/* ==================== KARTU KARAKTERKU ==================== */}
          <section className="bg-white rounded-[26px] p-6 shadow-sm border border-sky-100">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">Karakterku</h3>
              <span className="text-xs font-black text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
                Pratinjau Langsung
              </span>
            </div>

            <div className="flex items-center gap-6">
              {/* Live Character Preview */}
              <div className="p-4 rounded-3xl bg-gradient-to-b from-sky-50 to-emerald-50/50 border border-sky-100/80 flex items-center justify-center shadow-inner">
                <CharacterPreview character={state.character} size="md" />
              </div>

              {/* Customization Selectors */}
              <div className="flex-1 space-y-3">
                {/* Skin Selector */}
                <div>
                  <span className="text-xs font-black text-slate-700 block mb-1">
                    Kostum Karakter
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {CHARACTER_SKINS.map((skinItem) => {
                      const isSelected = state.character.skin === skinItem.id;
                      const isLocked = !skinItem.unlockedByDefault;

                      return (
                        <button
                          key={skinItem.id}
                          type="button"
                          disabled={isLocked}
                          onClick={() => setCharacter({ skin: skinItem.id })}
                          className={`p-2 rounded-xl text-left border text-[11px] font-bold transition flex items-center justify-between ${
                            isSelected
                              ? "bg-sky-500 text-white border-sky-600 shadow-2xs"
                              : isLocked
                              ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed opacity-60"
                              : "bg-white text-slate-700 border-slate-200 hover:border-sky-300"
                          }`}
                        >
                          <span className="truncate">{skinItem.name}</span>
                          {isLocked && <Lock className="w-3 h-3 text-slate-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Outfit Color Swatches */}
                <div>
                  <span className="text-xs font-black text-slate-700 block mb-1">
                    Warna Baju
                  </span>
                  <div className="flex items-center gap-1.5">
                    {CHARACTER_COLORS.map((color) => {
                      const isSelected = state.character.outfitColor === color.hex;
                      return (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => setCharacter({ outfitColor: color.hex })}
                          title={color.name}
                          style={{ backgroundColor: color.hex }}
                          className={`w-7 h-7 rounded-full border-2 transition hover:scale-110 cursor-pointer shadow-xs ${
                            isSelected
                              ? "ring-2 ring-sky-500 ring-offset-2 border-slate-900 scale-110"
                              : "border-black/15"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Accessory Selector */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-slate-700">
                      Aksesori Kepala
                    </span>
                    <Link
                      to="/toko?tab=karakter"
                      className="text-[10px] font-bold text-sky-600 hover:underline"
                    >
                      Buka Toko &rarr;
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {CHARACTER_ACCESSORIES.map((acc) => {
                      const isSelected = state.character.accessory === acc.id;
                      const mappedShopId =
                        acc.id === "leaf_hat"
                          ? "topi-daun"
                          : acc.id === "eco_goggles"
                          ? "kacamata-pelindung"
                          : null;

                      const isOwned =
                        acc.id === "none" ||
                        (mappedShopId
                          ? !!state.inventory?.owned?.[mappedShopId]
                          : acc.unlockedByDefault);

                      if (!isOwned && mappedShopId) {
                        return (
                          <Link
                            key={acc.id}
                            to={`/toko?tab=karakter&item=${mappedShopId}`}
                            title="Item belum dimiliki. Beli di Toko Ecobot"
                            className="p-1.5 rounded-xl border border-dashed border-amber-300 bg-amber-50/50 hover:bg-amber-100/70 text-[10px] font-bold text-amber-800 text-center transition flex flex-col items-center justify-center gap-0.5"
                          >
                            <span className="truncate w-full">{acc.name}</span>
                            <span className="text-[9px] text-amber-600 flex items-center gap-0.5">
                              <Lock className="w-2.5 h-2.5" />
                              <span>Beli di Toko</span>
                            </span>
                          </Link>
                        );
                      }

                      return (
                        <button
                          key={acc.id}
                          type="button"
                          onClick={() => setCharacter({ accessory: acc.id })}
                          className={`p-1.5 rounded-xl border text-[10px] font-bold text-center transition truncate cursor-pointer ${
                            isSelected
                              ? "bg-sky-500 text-white border-sky-600 shadow-2xs"
                              : "bg-white text-slate-700 border-slate-200 hover:border-sky-300"
                          }`}
                        >
                          {acc.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==================== KARTU PENGATURAN BERMAIN ==================== */}
          <section className="bg-white rounded-[26px] p-6 shadow-sm border border-sky-100">
            <h3 className="text-base font-black text-slate-900 mb-1">Pengaturan Bermain</h3>
            <p className="text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
              Sesuaikan kontrol, audio, dan performa grafis sesuai kenyamananmu
            </p>

            <div className="space-y-4 text-xs">
              {/* Graphics Quality Control */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-700">Kualitas Grafis 3D</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Saran: {recommendedQuality === "high" ? "Tinggi" : recommendedQuality === "low" ? "Rendah" : "Sedang"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
                  {(["low", "medium", "high"] as const).map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => updateSettings({ graphicsQuality: q })}
                      className={`py-1.5 rounded-lg text-xs font-black uppercase transition cursor-pointer ${
                        state.settings.graphicsQuality === q
                          ? "bg-sky-500 text-white shadow-2xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {q === "low" ? "Rendah" : q === "medium" ? "Sedang" : "Tinggi"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control Mode */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-700">Mode Kontrol</span>
                  <span className="text-[10px] text-slate-500">
                    {isTouchDevice ? "Layar sentuh terdeteksi" : "Keyboard & Mouse terdeteksi"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
                  {(["auto", "keyboard", "touch"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => updateSettings({ controlMode: mode })}
                      className={`py-1.5 rounded-lg text-xs font-black transition cursor-pointer ${
                        state.settings.controlMode === mode
                          ? "bg-sky-500 text-white shadow-2xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {mode === "auto" ? "Otomatis" : mode === "keyboard" ? "Keyboard" : "Analog"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sound Settings */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <div className="flex justify-between font-bold text-slate-600 mb-1">
                    <span>Musik Latar</span>
                    <span>{state.settings.musicVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={state.settings.musicVolume}
                    onChange={(e) => updateSettings({ musicVolume: Number(e.target.value) })}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between font-bold text-slate-600 mb-1">
                    <span>Efek Suara</span>
                    <span>{state.settings.sfxVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={state.settings.sfxVolume}
                    onChange={(e) => updateSettings({ sfxVolume: Number(e.target.value) })}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Visual Control Check Panel Tabs */}
              <div className="mt-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                    Panduan Cepat Tombol
                  </span>
                  <div className="flex gap-1 text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => setControlCheckTab("keyboard")}
                      className={`px-2 py-0.5 rounded-md ${
                        controlCheckTab === "keyboard" || (!isTouchDevice && controlCheckTab === "auto")
                          ? "bg-sky-100 text-sky-800"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Laptop
                    </button>
                    <button
                      type="button"
                      onClick={() => setControlCheckTab("touch")}
                      className={`px-2 py-0.5 rounded-md ${
                        controlCheckTab === "touch" || (isTouchDevice && controlCheckTab === "auto")
                          ? "bg-emerald-100 text-emerald-800"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      HP / Tablet
                    </button>
                  </div>
                </div>

                {controlCheckTab === "touch" || (isTouchDevice && controlCheckTab === "auto") ? (
                  <div className="space-y-1 text-slate-600 text-[11px]">
                    <p>• <strong>Analog Kiri Bawah:</strong> Geser jempol untuk berjalan bebas.</p>
                    <p>• <strong>Tombol Bulat Kanan:</strong> Tap untuk mengambil atau membuang sampah.</p>
                  </div>
                ) : (
                  <div className="space-y-1 text-slate-600 text-[11px]">
                    <p>• <strong>W A S D / Panah:</strong> Berjalan ke depan, belakang, dan belok.</p>
                    <p>• <strong>E / Spasi:</strong> Mengambil sampah dan membuang ke tong.</p>
                    <p>• <strong>Esc:</strong> Jeda permainan dan buka menu pause.</p>
                  </div>
                )}
              </div>

              {/* Mobile Portrait Recommendation Banner */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-sky-50 to-emerald-50 border border-sky-100 text-slate-700 flex items-center gap-2.5">
                <RotateCw className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-[11px] font-medium leading-relaxed">
                  Bermain di HP? Putar ke <strong>posisi landscape</strong> (mendatar) agar area pandang kota lebih luas dan lega.
                </span>
              </div>
            </div>
          </section>

          {/* ==================== KARTU UPGRADE ==================== */}
          <section className="bg-white rounded-[26px] p-6 shadow-sm border border-sky-100">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">Perlengkapan & Upgrade</h3>
                <p className="text-xs text-slate-500">Gunakan poin petualanganmu untuk memperkuat karakter</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-amber-900 text-xs font-black">
                {state.points} Poin
              </div>
            </div>

            {upgradeFeedback && (
              <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-fade-rise">
                {upgradeFeedback}
              </div>
            )}

            <div className="space-y-3">
              {(["bag", "shoes", "grabber"] as UpgradeId[]).map((upId) => {
                const config = GAME_UPGRADES[upId];
                const currentLvl = state.upgrades[upId] || 1;
                const isMax = currentLvl >= config.maxLevel;
                const nextLvl = currentLvl + 1;
                const nextCost = config.levels[nextLvl]?.cost || 0;
                const canAfford = state.points >= nextCost && !isMax;

                return (
                  <div
                    key={upId}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold shrink-0">
                        {upId === "bag" ? (
                          <ShoppingBag className="w-5 h-5 text-sky-600" />
                        ) : upId === "shoes" ? (
                          <Zap className="w-5 h-5 text-amber-600" />
                        ) : (
                          <Target className="w-5 h-5 text-emerald-600" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-black text-slate-900 truncate">
                            {config.name}
                          </h4>
                          <span className="text-[10px] font-black text-slate-500 bg-white px-2 py-0.2 rounded-full border border-slate-200">
                            Lvl {currentLvl}/{config.maxLevel}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {config.levels[currentLvl]?.effectDescription}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isMax ? (
                        <span className="text-[11px] font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                          Maksimal
                        </span>
                      ) : (
                        <button
                          type="button"
                          disabled={!canAfford}
                          onClick={() => handlePurchase(upId)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-black transition ${
                            canAfford
                              ? "bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-2xs hover:scale-105 cursor-pointer"
                              : "bg-slate-200 text-slate-400 cursor-not-allowed"
                          }`}
                        >
                          {nextCost} Poin
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ==================== KARTU TIPS DARI ECOBOT ==================== */}
          <section className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 rounded-[26px] p-5 shadow-sm border border-sky-100 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-sky-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-sky-800">
                  Tips dari Ecobot
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentTip(getRandomLoadingTip())}
                  className="text-[11px] font-bold text-sky-600 hover:text-sky-800 hover:underline cursor-pointer"
                >
                  Tips Lain
                </button>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed mt-1">
                "{currentTip.tip}"
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* ==================== MODAL: ATURAN BINTANG ==================== */}
      {showStarInfoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl text-slate-900 border border-sky-100 text-left">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-black text-slate-900">Aturan Bintang Misi</h4>
              <button
                type="button"
                onClick={() => setShowStarInfoModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200">
                <div className="flex gap-0.5 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <strong className="text-slate-900 block">1 Bintang:</strong>
                  Selesaikan target misi pemilahan sampai selesai.
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200">
                <div className="flex gap-0.5 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <strong className="text-slate-900 block">2 Bintang:</strong>
                  Selesai dengan akurasi pemilahan minimal 75%.
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200">
                <div className="flex gap-0.5 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <strong className="text-slate-900 block">3 Bintang:</strong>
                  Selesai dengan akurasi pemilahan sempurna minimal 90%!
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowStarInfoModal(false)}
              className="mt-5 w-full py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}

      {/* ==================== MODAL: RESET PROGRESS KONFIRMASI 2 LANGKAH ==================== */}
      {showResetConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl text-slate-900 border border-rose-100 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <h4 className="text-base font-black text-slate-900 mb-1">
              {resetConfirmStep === 1
                ? "Mulai Petualangan Baru?"
                : "Yakin Hapus Progres Misi?"}
            </h4>

            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              {resetConfirmStep === 1
                ? "Semua bintang misi dan upgrade di game akan diatur ulang dari Misi 1. Profil, nama panggilan, dan level XP-mu tetap aman."
                : "Langkah Terakhir: Progres misi yang sudah selesai tidak dapat dikembalikan lagi setelah di-reset."}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowResetConfirmModal(false);
                  setResetConfirmStep(1);
                }}
                className="w-full py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleConfirmReset}
                className="w-full py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
              >
                {resetConfirmStep === 1 ? "Lanjutkan" : "Ya, Reset Misi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
