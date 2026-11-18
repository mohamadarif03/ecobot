import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Flame,
  ShieldCheck,
  Coins,
  Sparkles,
  Gamepad2,
  ArrowRight,
  Target,
  BookOpen,
  Trophy,
  Star,
  CheckCircle2,
  History,
  LayoutDashboard,
  Calendar,
  Check,
  ChevronRight,
  Info,
} from "lucide-react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { EcobotMascot } from "../components/ecobot/EcobotMascot";
import { ItemArt } from "../data/toko/art";
import { usePlayerStore, getWeeklyXp, getLigaStatus } from "../store/playerStore";
import { calculateLevel } from "../data/levels";
import { getTodayFact } from "../data/facts";

function getPast7Days(activeDays: string[]) {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    const dateStr = d.toISOString().split("T")[0];
    const dayName = d.toLocaleDateString("id-ID", { weekday: "narrow" });
    const isActive = activeDays.includes(dateStr);
    return { dateStr, dayName, isActive };
  });
}

export default function BerandaPage() {
  const navigate = useNavigate();
  const { state, updateStreak, claimDailyMission, recordEvent } = usePlayerStore();
  const [activeTab, setActiveTab] = useState<"ringkasan" | "aktivitas">("ringkasan");
  const [showFactModal, setShowFactModal] = useState(false);

  // Redirect to onboarding if nickname is empty
  useEffect(() => {
    if (!state.nickname || state.nickname.trim() === "") {
      navigate("/onboarding", { replace: true });
    }
  }, [state.nickname, navigate]);

  // Update daily streak and record daily fact read on mount
  useEffect(() => {
    updateStreak();
    recordEvent("fakta_dibaca");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const levelInfo = calculateLevel(state.xp);
  const todayFact = getTodayFact();
  const weeklyXp = getWeeklyXp(state);
  const ligaStatus = getLigaStatus(state);

  // Progress in current level
  const currentLevelXp = Math.max(0, state.xp - levelInfo.minXp);
  const neededLevelXp = levelInfo.nextXp - levelInfo.minXp;
  const levelProgressPercent = Math.min(
    100,
    Math.round((currentLevelXp / Math.max(1, neededLevelXp)) * 100)
  );

  // Find the latest incomplete or available mission to continue
  const nextMission =
    state.missionProgress.find((m) => m.status === "available") ||
    state.missionProgress.find((m) => m.status === "completed") ||
    state.missionProgress[0];

  const hasPlayedBefore = state.missionProgress.some((m) => m.stars > 0);

  // 7-day indicators calculation
  const past7Days = useMemo(() => getPast7Days(state.activeDays), [state.activeDays]);

  return (
    <DashboardLayout
      title="Beranda"
      subtitle="Pantau progres petualanganmu dan lanjutkan misi hari ini"
    >
      {/* ==================== HERO BANNER ==================== */}
      <section className="rounded-[26px] bg-gradient-to-r from-[#4ADE80] via-[#22C55E] to-[#16A34A] px-6 sm:px-7 py-6 relative overflow-hidden shadow-[0_4px_20px_rgba(14,165,233,0.18)] min-h-[178px] flex flex-col justify-between">
        {/* Background ambient accents */}
        <div className="w-16 h-16 rounded-full bg-emerald-200/40 absolute -top-4 left-44 pointer-events-none"></div>
        <div className="w-[85px] h-[85px] rounded-full bg-emerald-400/35 absolute top-1 right-[160px] pointer-events-none"></div>
        <div className="w-[120px] h-[120px] rounded-full bg-white/10 absolute -bottom-8 right-[110px] pointer-events-none"></div>

        <div className="relative z-10 max-w-[620px]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/25 backdrop-blur-xs text-slate-950 text-xs font-bold mb-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Dari Ecobot</span>
          </div>

          <h2 className="text-[26px] sm:text-[32px] font-black text-slate-950 tracking-tight leading-tight mt-1 mb-3">
            Halo, {state.nickname}! Siap bersihkan kota?
          </h2>

          {/* Status Chips */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* Streak Chip */}
            <div className="bg-white/95 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xs border border-white/60">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-[12px] font-black text-slate-900">
                {state.streak} hari beruntun
              </span>
            </div>

            {/* Level Chip */}
            <div className="bg-[#BAE6FD]/95 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xs border border-emerald-300/60">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span className="text-[12px] font-black text-slate-900">
                Level {levelInfo.level} · {levelInfo.title}
              </span>
            </div>

            {/* Points Chip */}
            <div className="bg-amber-100/90 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xs border border-amber-200">
              <Coins className="w-4 h-4 text-amber-600" />
              <span className="text-[12px] font-black text-amber-950">
                {state.points} poin
              </span>
            </div>

            {/* Action Button inside Hero */}
            <Link
              to="/main-game"
              className="bg-slate-950 hover:bg-slate-900 text-white font-black text-[12px] px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm transition hover:scale-105"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Lanjutkan Petualangan</span>
            </Link>
          </div>
        </div>

        {/* Right Illustration & Ecobot Mascot */}
        <div className="pointer-events-none select-none">
          <div className="w-[140px] sm:w-[155px] h-[140px] sm:h-[155px] absolute -bottom-1 right-2 sm:right-6 z-10">
            <EcobotMascot
              size="hero"
              equippedOverrides={state.inventory?.equipped?.ecobot}
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* ==================== SUB-NAVIGATION PILLS ROW ==================== */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        {/* Left Tabs */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("ringkasan")}
            className={`font-bold text-[13px] px-4 py-2.5 rounded-full flex items-center gap-2 shadow-2xs transition cursor-pointer ${
              activeTab === "ringkasan"
                ? "bg-[#4ADE80] text-slate-950"
                : "bg-white hover:bg-emerald-50 text-slate-700 border border-emerald-100"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Ringkasan</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("aktivitas")}
            className={`font-bold text-[13px] px-4 py-2.5 rounded-full flex items-center gap-2 border border-emerald-100 shadow-2xs transition cursor-pointer ${
              activeTab === "aktivitas"
                ? "bg-[#4ADE80] text-slate-950"
                : "bg-white hover:bg-emerald-50 text-slate-700"
            }`}
          >
            <History className="w-4 h-4 text-slate-600" />
            <span>Aktivitas Terakhir ({state.activityLog.length})</span>
          </button>
        </div>

        {/* Right Action Pills */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFactModal(true)}
            className="bg-white hover:bg-emerald-50 text-emerald-800 font-bold text-[12.5px] px-3.5 py-2 rounded-full transition flex items-center gap-1.5 border border-emerald-200/80 shadow-2xs cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-emerald-600" />
            <span>Fakta Hari Ini</span>
          </button>

          <Link
            to="/misi"
            className="bg-white hover:bg-emerald-50 text-slate-700 font-bold text-[12.5px] px-4 py-2 rounded-full flex items-center gap-1.5 border border-emerald-100 shadow-2xs transition"
          >
            <Target className="w-3.5 h-3.5 text-emerald-600" />
            <span>Lihat Misi</span>
          </Link>
        </div>
      </div>

      {/* ==================== MAIN 2-COLUMN WORKSPACE ==================== */}
      <div className="mt-4 grid grid-cols-12 gap-5 items-start">
        {/* ==================== LEFT COLUMN (CARDS) ==================== */}
        <div className="col-span-12 lg:col-span-8 space-y-5">
          {activeTab === "ringkasan" ? (
            <>
              {/* CARD 1: Meter Kebersihan Kota */}
              <div className="bg-white rounded-[24px] p-5 sm:p-6 shadow-[0_2px_10px_rgba(14,165,233,0.04)] border border-emerald-100/80">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-black text-slate-900 leading-tight">
                        Meter Kebersihan Kota
                      </h3>
                      <p className="text-[12px] font-medium text-slate-400">
                        Target akhir petualangan: 100% kota bebas sampah
                      </p>
                    </div>
                  </div>
                  <span className="text-[20px] font-black text-emerald-600">
                    {state.cityCleanlinessMeter}%
                  </span>
                </div>

                {/* Progress Bar with smooth animation */}
                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50 mt-3">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${Math.max(5, state.cityCleanlinessMeter)}%` }}
                  ></div>
                </div>

                {/* Ecobot Encouragement Message */}
                <div className="mt-3.5 p-3 rounded-2xl bg-[#F0FDF4] border border-emerald-100/80 flex items-center gap-2.5">
                  <span className="text-xl">🤖</span>
                  <p className="text-[12.5px] font-bold text-emerald-900">
                    {state.cityCleanlinessMeter >= 80
                      ? "Luar biasa! Kota hampir sepenuhnya bersih dan hijau!"
                      : state.cityCleanlinessMeter >= 40
                      ? "Taman dan pasar sudah mulai bebas sampah! Ayo bersihkan tepi sungai!"
                      : "Ecobot butuh bantuanmu memilah sampah di Taman Kota hari ini!"}
                  </p>
                </div>
              </div>

              {/* CARD 2: Lanjutkan Petualangan */}
              <div className="bg-white rounded-[24px] p-5 sm:p-6 shadow-[0_2px_10px_rgba(14,165,233,0.04)] border border-emerald-100/80">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Gamepad2 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-black text-slate-900 leading-tight">
                        Lanjutkan Petualangan
                      </h3>
                      <p className="text-[12px] font-medium text-slate-400">
                        Misi berikutnya yang siap kamu selesaikan
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/main-game"
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <span>Semua Zona</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {!hasPlayedBefore ? (
                  /* Empty state for fresh players */
                  <div className="p-6 rounded-[20px] bg-[#F3F9FF] border border-emerald-100/70 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mb-2.5">
                      🎮
                    </div>
                    <h4 className="text-[15px] font-black text-slate-900">
                      Belum Ada Petualangan Dimulai
                    </h4>
                    <p className="text-[12.5px] text-slate-500 max-w-[380px] mt-1 mb-4">
                      Kamu belum memainkan misi apa pun. Ayo mulai dari Misi 1 di Taman Kota untuk mempelajari cara memilah sampah!
                    </p>
                    <Link
                      to="/main-game"
                      className="bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-slate-950 font-black text-[13px] px-6 py-2.5 rounded-full flex items-center gap-2 shadow-xs transition hover:scale-105"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Mulai Misi Pertama (Taman Kota)</span>
                    </Link>
                  </div>
                ) : (
                  /* Active mission card */
                  <div className="p-4 sm:p-5 rounded-[20px] bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-slate-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10.5px] font-black tracking-wider uppercase bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                        Misi {nextMission.missionId} · {nextMission.location}
                      </span>
                      <h4 className="text-[16px] font-black text-slate-900">
                        {nextMission.title}
                      </h4>
                      <p className="text-[12px] text-slate-500">
                        Akurasi terbaik: {nextMission.accuracy}% · Skor: {nextMission.bestScore}
                      </p>

                      {/* Stars */}
                      <div className="flex items-center gap-1 pt-1">
                        {[1, 2, 3].map((starIndex) => (
                          <Star
                            key={starIndex}
                            className={`w-4 h-4 ${
                              starIndex <= nextMission.stars
                                ? "text-amber-400 fill-amber-400"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                        <span className="text-xs font-bold text-slate-500 ml-1.5">
                          {nextMission.stars}/3 Bintang
                        </span>
                      </div>
                    </div>

                    <Link
                      to="/main-game"
                      className="bg-[#15803D] hover:bg-[#0369A1] text-white font-black text-[13px] px-6 py-2.5 rounded-full flex items-center gap-2 shadow-xs transition shrink-0 hover:scale-105"
                    >
                      <Gamepad2 className="w-4 h-4" />
                      <span>Main Sekarang</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* CARD 3: Fakta Harian dari Ecobot */}
              <div className="bg-white rounded-[24px] p-5 sm:p-6 shadow-[0_2px_10px_rgba(14,165,233,0.04)] border border-emerald-100/80">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-black text-slate-900 leading-tight">
                        Fakta Harian dari Ecobot
                      </h3>
                      <p className="text-[12px] font-medium text-slate-400">
                        Pengetahuan lingkungan baru setiap hari
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    Rotasi Harian
                  </span>
                </div>

                <div className="p-4 rounded-[20px] bg-gradient-to-r from-sky-50/70 via-blue-50/50 to-emerald-50/60 border border-emerald-100/80">
                  <h4 className="text-[14.5px] font-black text-emerald-950 mb-1">
                    "{todayFact.title}"
                  </h4>
                  <p className="text-[13px] text-slate-700 leading-relaxed">
                    {todayFact.fact}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <p className="text-emerald-800 font-bold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{todayFact.actionTip}</span>
                    </p>
                    <span className="text-[10.5px] text-slate-400">
                      Sumber: {todayFact.source}
                    </span>
                  </div>
                </div>
              </div>

              {/* CARD 4: Statistik Singkat (4 Angka) */}
              <div className="bg-white rounded-[24px] p-5 sm:p-6 shadow-[0_2px_10px_rgba(14,165,233,0.04)] border border-emerald-100/80">
                <h3 className="text-[16px] font-black text-slate-900 leading-tight mb-4">
                  Statistik Singkat Pemain
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  <div className="p-3.5 rounded-2xl bg-[#F0FDF4] border border-emerald-100 text-center">
                    <p className="text-[22px] font-black text-emerald-600">
                      {state.stats.trashSorted}
                    </p>
                    <p className="text-[11.5px] font-bold text-slate-600 mt-0.5">
                      Sampah Dipilah
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F0F9FF] border border-emerald-100 text-center">
                    <p className="text-[22px] font-black text-emerald-600">
                      {state.stats.sortingAccuracy}%
                    </p>
                    <p className="text-[11.5px] font-bold text-slate-600 mt-0.5">
                      Akurasi Pemilahan
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FEF3C7] border border-amber-200/80 text-center">
                    <p className="text-[22px] font-black text-amber-700">
                      {state.stats.topicsRead}
                    </p>
                    <p className="text-[11.5px] font-bold text-slate-600 mt-0.5">
                      Materi Dibaca
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#EDE9FE] border border-indigo-100 text-center">
                    <p className="text-[22px] font-black text-indigo-700">
                      {state.stats.quizzesCompleted}
                    </p>
                    <p className="text-[11.5px] font-bold text-slate-600 mt-0.5">
                      Kuis Selesai
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 5: Badge Terbaru */}
              <div className="bg-white rounded-[24px] p-5 sm:p-6 shadow-[0_2px_10px_rgba(14,165,233,0.04)] border border-emerald-100/80">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-black text-slate-900 leading-tight">
                        Badge Terbaru
                      </h3>
                      <p className="text-[12px] font-medium text-slate-400">
                        Prestasi yang berhasil kamu buka
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/pencapaian"
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <span>Semua Badge ({state.badges.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {state.badges.length === 0 ? (
                  <div className="py-8 px-4 rounded-2xl bg-slate-50 text-center border border-dashed border-slate-200">
                    <p className="text-[13.5px] font-bold text-slate-600">
                      Belum Ada Badge Terbuka
                    </p>
                    <p className="text-[12px] text-slate-400 mt-1">
                      Selesaikan misi di game atau baca materi untuk meraih badge pertamamu!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {state.badges.slice(0, 3).map((badge) => (
                      <div
                        key={badge.id}
                        className="p-3.5 rounded-2xl bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] border border-emerald-100 flex items-center gap-3"
                      >
                        <div className="w-11 h-11 rounded-2xl bg-white shadow-2xs border border-amber-200/70 flex items-center justify-center text-2xl shrink-0">
                          {badge.icon}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[13px] font-black text-slate-900 truncate">
                            {badge.name}
                          </h4>
                          <p className="text-[10.5px] text-slate-500 line-clamp-1">
                            {badge.description}
                          </p>
                          <span className="text-[10px] font-bold text-emerald-700">
                            {badge.unlockedAt || "Terbuka"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CARD 6: Peringkat & Liga Mingguan */}
              <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/10 to-teal-500/10 rounded-[24px] p-5 sm:p-6 border border-emerald-200/80 shadow-[0_2px_10px_rgba(14,165,233,0.04)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
                    {ligaStatus.currentTier ? (ligaStatus.currentTier === "emas" ? "🥇" : ligaStatus.currentTier === "perak" ? "🥈" : "🥉") : "🏆"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[16px] font-black text-slate-900 leading-tight">
                        Peringkat Mingguanmu
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {ligaStatus.currentTier ? `Liga ${ligaStatus.currentTier.charAt(0).toUpperCase() + ligaStatus.currentTier.slice(1)}` : "Tantangan Baru"}
                      </span>
                    </div>
                    <p className="text-[12px] font-medium text-slate-500 mt-0.5">
                      Kamu sudah mengumpulkan <strong className="text-emerald-600 font-bold">{weeklyXp} XP</strong> minggu ini. Terus tingkatkan untuk naik podium!
                    </p>
                  </div>
                </div>

                <Link
                  to="/papan-peringkat"
                  className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-sm transition-all"
                >
                  <span>Lihat Papan Peringkat</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          ) : (
            /* TAB 2: AKTIVITAS TERAKHIR */
            <div className="bg-white rounded-[26px] p-6 shadow-[0_2px_10px_rgba(14,165,233,0.04)] border border-emerald-100/80">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <History className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-[17px] font-black text-slate-900 leading-tight">
                    Catatan Aktivitas Terakhir
                  </h3>
                  <p className="text-[12.5px] font-medium text-slate-400">
                    Jejak belajar dan bermain bersama Ecobot
                  </p>
                </div>
              </div>

              {state.activityLog.length === 0 ? (
                <div className="py-14 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center text-2xl mb-3">
                    🌱
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-800">
                    Belum Ada Aktivitas Tercatat
                  </h4>
                  <p className="text-[12.5px] text-slate-500 max-w-[360px] mx-auto mt-1 mb-5">
                    Aktivitasmu saat membaca materi, menyelesaikan kuis, atau memilah sampah di game akan muncul di sini.
                  </p>
                  <Link
                    to="/main-game"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-600 px-5 py-2.5 rounded-full transition"
                  >
                    <span>Mulai Aktivitas Pertama</span>
                  </Link>
                </div>
              ) : (
                <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-100">
                  {state.activityLog.map((act) => (
                    <div key={act.id} className="relative group">
                      {/* Timeline Dot */}
                      <span className="w-4 h-4 rounded-full bg-emerald-400 border-2 border-white absolute -left-[22px] top-1 shadow-2xs group-hover:scale-125 transition"></span>

                      <div className="p-3.5 rounded-2xl bg-[#F8FAFC] hover:bg-emerald-50/70 border border-slate-100 transition">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-[13.5px] font-black text-slate-900">
                            {act.title}
                          </h4>
                          <span className="text-[11px] font-bold text-slate-400 shrink-0">
                            {act.timestamp}
                          </span>
                        </div>
                        <p className="text-[12px] text-slate-600 mt-0.5">
                          {act.description}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          {act.xpEarned > 0 && (
                            <span className="text-[10.5px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                              +{act.xpEarned} XP
                            </span>
                          )}
                          {act.pointsEarned > 0 && (
                            <span className="text-[10.5px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                              +{act.pointsEarned} Poin
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ==================== RIGHT COLUMN: PROFIL PEMAIN ==================== */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-[26px] p-5 shadow-[0_2px_10px_rgba(14,165,233,0.04)] border border-emerald-100/80 flex flex-col gap-4">
            {/* Header: Profil Pemain */}
            <div className="flex items-center gap-3.5 pb-2 border-b border-slate-100">
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-emerald-500 text-slate-950 flex items-center justify-center text-2xl shadow-2xs">
                  {state.avatar || "🤖"}
                </div>
                {state.inventory?.equipped?.stiker && (
                  <div
                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-xs p-0.5 border border-emerald-100 flex items-center justify-center"
                    title={`Stiker: ${state.inventory.equipped.stiker}`}
                  >
                    <ItemArt
                      itemId={state.inventory.equipped.stiker}
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[17px] font-black text-slate-900 leading-tight truncate">
                    {state.nickname || "Pahlawan Cilik"}
                  </h3>
                </div>
                <p className="text-[12px] font-bold text-emerald-700 leading-tight mt-0.5">
                  Level {levelInfo.level} · {levelInfo.title}
                </p>
              </div>
            </div>

            {/* Level & XP Progress Bar */}
            <div className="p-3.5 rounded-2xl bg-[#F0FDF4] border border-emerald-100/80">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>XP Level {levelInfo.level}</span>
                <span className="text-emerald-800 font-black">
                  {state.xp} / {levelInfo.nextXp} XP
                </span>
              </div>
              <div className="w-full h-3 bg-white rounded-full overflow-hidden p-0.5 border border-emerald-100">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500"
                  style={{ width: `${levelProgressPercent}%` }}
                ></div>
              </div>
              <p className="text-[10.5px] text-slate-500 text-right mt-1 font-medium">
                {levelInfo.nextXp - state.xp} XP lagi menuju Level {levelInfo.level + 1}
              </p>
            </div>

            {/* Total Points & Streak */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Coins className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-amber-900">Total Poin</p>
                  <p className="text-[16px] font-black text-amber-950">{state.points}</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-orange-50/80 border border-orange-200/80 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-orange-950">Streak Hari</p>
                  <p className="text-[16px] font-black text-orange-950">{state.streak} Hari</p>
                </div>
              </div>
            </div>

            {/* 7-Day Streak Calendar Indicators */}
            <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11.5px] font-bold text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Keaktifan 7 Hari Terakhir</span>
                </span>
                <span className="text-[10.5px] font-extrabold text-emerald-700">
                  {past7Days.filter((d) => d.isActive).length}/7 Hari Aktif
                </span>
              </div>
              <div className="flex items-center justify-between gap-1">
                {past7Days.map((d, index) => (
                  <div key={index} className="flex flex-col items-center gap-1">
                    <span className="text-[9.5px] font-semibold text-slate-400">
                      {d.dayName}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition ${
                        d.isActive
                          ? "bg-emerald-500 text-white shadow-2xs"
                          : "bg-slate-200 text-slate-400"
                      }`}
                      title={`${d.dateStr}: ${d.isActive ? "Aktif belajar" : "Tidak aktif"}`}
                    >
                      {d.isActive ? <Check className="w-3 h-3 stroke-[3]" /> : "·"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Missions Section */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <h4 className="text-[14px] font-black text-slate-900 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-emerald-600" />
                  <span>Misi Harian ({state.dailyMissions.filter((m) => m.claimed).length}/3)</span>
                </h4>
                <Link
                  to="/misi"
                  className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700"
                >
                  Detail
                </Link>
              </div>

              {state.dailyMissions.map((mission) => {
                const isComplete = mission.current >= mission.target;
                return (
                  <div
                    key={mission.id}
                    className={`p-3 rounded-2xl border transition ${
                      mission.claimed
                        ? "bg-slate-50 border-slate-200/80 opacity-70"
                        : isComplete
                        ? "bg-[#F0FDF4] border-emerald-300 shadow-2xs"
                        : "bg-[#F8FAFC] border-slate-100"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[12.5px] font-bold text-slate-900 leading-tight">
                          {mission.title}
                        </p>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {mission.description}
                        </p>
                      </div>

                      {mission.claimed ? (
                        <span className="text-[10.5px] font-extrabold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Klaim</span>
                        </span>
                      ) : isComplete ? (
                        <button
                          type="button"
                          onClick={() => claimDailyMission(mission.id)}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[11px] px-3 py-1 rounded-full shadow-xs transition hover:scale-105 shrink-0 cursor-pointer animate-pulse"
                        >
                          Klaim!
                        </button>
                      ) : (
                        <span className="text-[11px] font-bold text-slate-400 shrink-0">
                          {mission.current}/{mission.target}
                        </span>
                      )}
                    </div>

                    {/* Progress Bar & Rewards */}
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.round((mission.current / mission.target) * 100)
                            )}%`,
                          }}
                        ></div>
                      </div>

                      <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded-full shrink-0">
                        +{mission.rewardXp} XP · +{mission.rewardPoints} Poin
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Primary Button */}
            <Link
              to="/main-game"
              className="mt-2 w-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 hover:brightness-105 text-slate-950 font-black text-[14.5px] py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md transition hover:scale-[1.02] cursor-pointer text-center"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Lanjutkan Petualangan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ==================== FAKTA HARI INI MODAL ==================== */}
      {showFactModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowFactModal(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-[28px] p-6 shadow-2xl border border-emerald-100 text-left relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl">
                  💡
                </div>
                <div>
                  <h3 className="text-[17px] font-black text-slate-900 leading-tight">
                    Fakta Lingkungan Hari Ini
                  </h3>
                  <p className="text-[11.5px] font-bold text-emerald-700">
                    Edisi Spesial Ecobot
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowFactModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <h4 className="text-[16px] font-black text-emerald-950">
                "{todayFact.title}"
              </h4>
              <p className="text-[14px] text-slate-700 leading-relaxed bg-[#F8FAFC] p-4 rounded-2xl border border-slate-100">
                {todayFact.fact}
              </p>

              <div className="p-3.5 rounded-2xl bg-[#F0FDF4] border border-emerald-200 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] font-black uppercase text-emerald-800 tracking-wider">
                    Aksi Nyata yang Bisa Kamu Lakukan
                  </p>
                  <p className="text-[13px] font-bold text-emerald-950 mt-0.5">
                    {todayFact.actionTip}
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 text-right pt-1">
                Sumber referensi: {todayFact.source}
              </p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowFactModal(false)}
                className="bg-emerald-600 hover:bg-emerald-600 text-white font-bold text-[13px] px-6 py-2.5 rounded-full transition cursor-pointer"
              >
                Mengerti, Terima Kasih Ecobot!
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
