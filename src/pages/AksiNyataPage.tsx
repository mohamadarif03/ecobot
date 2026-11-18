import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Calendar,
  Flame,
  Award,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Calculator,
} from "lucide-react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import {
  usePlayerStore,
  getChallengeStatus,
  getTodayTask,
} from "../store/playerStore";
import { EcobotMascot } from "../components/ecobot/EcobotMascot";
import { AksiReportPanel } from "../components/aksiNyata/AksiReportPanel";
import { TodayTaskCard } from "../components/aksiNyata/TodayTaskCard";
import { ChallengeStepper } from "../components/aksiNyata/ChallengeStepper";
import { ChallengeCelebrationModal } from "../components/aksiNyata/ChallengeCelebrationModal";
import { WasteCalculatorCard } from "../components/aksiNyata/WasteCalculatorCard";
import { CreativeIdeaCard } from "../components/aksiNyata/CreativeIdeaCard";
import { CREATIVE_IDEAS } from "../data/aksiNyata/ideas";

type AksiTabType = "tantangan" | "kalkulator" | "ide";

export default function AksiNyataPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabParam = searchParams.get("tab") as AksiTabType | null;
  const activeTab: AksiTabType =
    activeTabParam === "kalkulator" || activeTabParam === "ide"
      ? activeTabParam
      : "tantangan";

  const {
    state,
    startChallenge,
    checkChallengeDay,
    startNewRound,
    resetCurrentChallenge,
    markIdeaTried,
  } = usePlayerStore();

  const status = getChallengeStatus(state);
  const todayTask = getTodayTask(state);

  // Redirect to onboarding if nickname is not set
  useEffect(() => {
    if (!state.nickname || state.nickname.trim() === "") {
      navigate("/onboarding");
    }
  }, [state.nickname, navigate]);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Celebration modal state
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  // Reset confirmation state
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const handleSelectTab = (tab: AksiTabType) => {
    setSearchParams({ tab });
  };

  // Check Challenge Handler
  const handleCheckDay = (data: {
    feeling: "gampang" | "lumayan" | "susah";
    parentConfirmed: boolean;
  }) => {
    const res = checkChallengeDay(data);
    if (res.success) {
      if (res.completed) {
        setShowCelebration(true);
        showToast("Luar biasa! Seluruh 7 hari Tantangan Aksi Nyata berhasil kamu tuntaskan!");
      } else {
        showToast(`Hebat! Hari ke-${res.day} selesai (+${res.xpEarned} XP, +${res.pointsEarned} Poin).`);
      }
    } else if (res.reason === "already_checked_today") {
      showToast("Kamu sudah mencentang tugas hari ini. Lanjutkan lagi besok ya!");
    }
  };

  const handleMarkIdeaTried = (id: string) => {
    const res = markIdeaTried(id);
    if (res.success) {
      showToast(`Keren! Ide daur ulang berhasil dicoba (+${res.xpEarned} XP, +${res.pointsEarned} Poin).`);
    }
  };

  // Hero title logic
  let heroTitle = "Siap jadi Pahlawan Nyata?";
  if (status.isCompleted) {
    heroTitle = "Kamu Pahlawan Nyata! 7 hari tuntas.";
  } else if (status.isStarted) {
    if (status.isTodayChecked) {
      heroTitle = "Mantap! Sampai ketemu besok.";
    } else {
      heroTitle = `Hari ke-${status.currentDay}: ${todayTask.title}`;
    }
  }

  // XP waiting calculation
  const remainingDays = Math.max(0, 7 - status.checkedDaysCount);
  const xpWaiting = remainingDays * 15 + (status.isCompleted || status.rewardClaimed ? 0 : 150);

  return (
    <DashboardLayout
      title="Aksi Nyata"
      subtitle="Dari game ke rumah: coba kebiasaan baik untuk bumi"
    >
      {/* Toast Notification (Aria-live) */}
      <div
        aria-live="polite"
        className="fixed bottom-6 right-6 z-50 pointer-events-none"
      >
        {toastMessage && (
          <div className="bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-in slide-in-from-bottom duration-300">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* Celebration Modal */}
      <ChallengeCelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        onStartNewRound={startNewRound}
        nickname={state.nickname}
      />

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="w-full max-w-sm bg-white rounded-[28px] p-6 text-center space-y-4 shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Ulangi Tantangan dari Awal?
              </h3>
              <p className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed">
                Tindakan ini akan mengulang progres 7 hari yang sedang berjalan. XP dan hadiah yang sudah kamu klaim sebelumnya tetap aman.
              </p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  resetCurrentChallenge();
                  setShowResetConfirm(false);
                  showToast("Tantangan berhasil diatur ulang.");
                }}
                className="flex-1 h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-black text-xs transition"
              >
                Ya, Ulangi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== HERO BANNER ==================== */}
      <section className="rounded-[26px] bg-gradient-to-r from-[#10B981] via-[#16A34A] to-[#15803D] px-6 sm:px-8 py-6 relative overflow-hidden shadow-[0_4px_20px_rgba(16,185,129,0.18)] min-h-[178px] flex flex-col justify-between mb-6">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-16 left-1/3 w-56 h-56 bg-emerald-300/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-xl">
          {/* Label */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-[11px] font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Dari Ecobot</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-[28px] font-black text-white tracking-tight leading-tight">
            {heroTitle}
          </h2>

          {/* Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-white text-xs font-bold border border-white/20">
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>
                <strong className="font-black">{status.checkedDaysCount}/7</strong> Hari
              </span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-white text-xs font-bold border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                <strong className="font-black">+{xpWaiting} XP</strong> Menunggu
              </span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-white text-xs font-bold border border-white/20">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>
                Streak <strong className="font-black">{state.streak}</strong> Hari
              </span>
            </span>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            {!status.isStarted ? (
              <button
                type="button"
                onClick={startChallenge}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-emerald-950 font-black text-[13px] hover:bg-emerald-50 shadow-md hover:scale-105 active:scale-95 transition"
              >
                <span>Mulai Tantangan 7 Hari</span>
                <ArrowRight className="w-4 h-4 text-emerald-700" />
              </button>
            ) : status.isCompleted ? (
              <button
                type="button"
                onClick={startNewRound}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-emerald-950 font-black text-[13px] hover:bg-emerald-50 shadow-md hover:scale-105 active:scale-95 transition"
              >
                <RotateCcw className="w-4 h-4 text-emerald-700" />
                <span>Mulai Putaran Baru</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  const elem = document.getElementById("today-task-card");
                  elem?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-emerald-950 font-black text-[13px] hover:bg-emerald-50 shadow-md hover:scale-105 active:scale-95 transition"
              >
                <span>Kerjakan Tugas Hari Ini</span>
                <ArrowRight className="w-4 h-4 text-emerald-700" />
              </button>
            )}

            {status.isStarted && !status.isCompleted && (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                title="Ulangi dari awal"
                className="px-3.5 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 text-xs font-bold transition"
              >
                Ulangi
              </button>
            )}
          </div>
        </div>

        {/* Mascot */}
        <div className="absolute right-3 sm:right-6 bottom-0 w-28 sm:w-36 h-32 sm:h-40 flex items-end justify-center pointer-events-none">
          <EcobotMascot
            pose={status.isCompleted ? "happy" : "wave"}
            size="banner"
            className="w-full h-full object-contain filter drop-shadow-lg"
          />
        </div>
      </section>

      {/* ==================== TABS NAVIGATION ==================== */}
      <div
        role="tablist"
        aria-label="Pilihan Menu Aksi Nyata"
        className="bg-white rounded-2xl p-1.5 shadow-[0_2px_10px_rgba(16,185,129,0.05)] border border-emerald-100 flex items-center gap-1.5 select-none mb-6 max-w-lg"
      >
        <button
          role="tab"
          id="tab-tantangan"
          aria-selected={activeTab === "tantangan"}
          aria-controls="panel-tantangan"
          onClick={() => handleSelectTab("tantangan")}
          className={`flex-1 py-2.5 px-3 rounded-xl font-black text-[13px] flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === "tantangan"
              ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-950 shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-emerald-50/60"
          }`}
        >
          <span>Tantangan 7 Hari</span>
        </button>

        <button
          role="tab"
          id="tab-kalkulator"
          aria-selected={activeTab === "kalkulator"}
          aria-controls="panel-kalkulator"
          onClick={() => handleSelectTab("kalkulator")}
          className={`flex-1 py-2.5 px-3 rounded-xl font-black text-[13px] flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === "kalkulator"
              ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-950 shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-emerald-50/60"
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Kalkulator</span>
        </button>

        <button
          role="tab"
          id="tab-ide"
          aria-selected={activeTab === "ide"}
          aria-controls="panel-ide"
          onClick={() => handleSelectTab("ide")}
          className={`flex-1 py-2.5 px-3 rounded-xl font-black text-[13px] flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === "ide"
              ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-950 shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-emerald-50/60"
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>Ide Kreatif</span>
        </button>
      </div>

      {/* ==================== MAIN CONTENT GRID ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ==================== LEFT 2 COLUMNS: TAB PANELS ==================== */}
        <div className="lg:col-span-2 space-y-6">
          {/* TAB 1: TANTANGAN 7 HARI */}
          {activeTab === "tantangan" && (
            <div id="panel-tantangan" role="tabpanel" className="space-y-6">
              <div id="today-task-card">
                <TodayTaskCard
                  task={todayTask}
                  isStarted={status.isStarted}
                  canCheckToday={status.canCheckToday}
                  isTodayChecked={status.isTodayChecked}
                  isCompleted={status.isCompleted}
                  onStartChallenge={startChallenge}
                  onCheckDay={handleCheckDay}
                  onStartNewRound={startNewRound}
                />
              </div>

              <ChallengeStepper
                currentDay={status.currentDay}
                days={status.days}
                isStarted={status.isStarted}
                canCheckToday={status.canCheckToday}
                isTodayChecked={status.isTodayChecked}
              />
            </div>
          )}

          {/* TAB 2: KALKULATOR JEJAK SAMPAH */}
          {activeTab === "kalkulator" && (
            <div id="panel-kalkulator" role="tabpanel" className="space-y-6">
              <WasteCalculatorCard />
            </div>
          )}

          {/* TAB 3: IDE KREATIF */}
          {activeTab === "ide" && (
            <div id="panel-ide" role="tabpanel" className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">
                  Ide Kreasi Daur Ulang di Rumah
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  Praktikkan bersama keluarga dan ubah sampah wadah menjadi karya yang berguna
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CREATIVE_IDEAS.map((idea) => {
                  const isTried = Boolean(state.aksiNyata?.ideas?.[idea.id]?.tried);
                  return (
                    <CreativeIdeaCard
                      key={idea.id}
                      idea={idea}
                      isTried={isTried}
                      onMarkTried={handleMarkIdeaTried}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ==================== RIGHT COLUMN: AKSI REPORT PANEL ==================== */}
        <AksiReportPanel />
      </div>
    </DashboardLayout>
  );
}
