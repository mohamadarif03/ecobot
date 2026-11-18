import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Flame,
  CheckCircle2,
  Gift,
  Target,
  Gamepad2,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import {
  usePlayerStore,
  getMissionsWithStatus,
  selectClaimableCountByTab,
  type MissionWithStatus,
} from "../store/playerStore";
import { EcobotMascot } from "../components/ecobot/EcobotMascot";
import { MissionCard } from "../components/missions/MissionCard";
import { ChestCard } from "../components/missions/ChestCard";
import { RewardsSummaryPanel } from "../components/missions/RewardsSummaryPanel";
import { LevelUpModal } from "../components/missions/LevelUpModal";
import { DailyCountdown, WeeklyCountdown } from "../components/missions/CountdownTimers";
import type { MissionType } from "../data/missions";

export default function MisiPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabParam = searchParams.get("tab") as MissionType | null;
  const activeTab: MissionType =
    activeTabParam === "mingguan" || activeTabParam === "utama"
      ? activeTabParam
      : "harian";

  const {
    state,
    claimMission,
    claimChest,
    claimAllMissions,
  } = usePlayerStore();

  // Redirect to onboarding if nickname is empty
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

  // Level up modal state
  const [levelUpData, setLevelUpData] = useState<{
    isOpen: boolean;
    level: number;
    title: string;
  }>({
    isOpen: false,
    level: 1,
    title: "",
  });

  const tabCounts = selectClaimableCountByTab(state);
  const totalClaimableCount = tabCounts.harian + tabCounts.mingguan + tabCounts.utama;

  const harianMissions = getMissionsWithStatus(state, "harian");
  const mingguanMissions = getMissionsWithStatus(state, "mingguan");
  const utamaMissions = getMissionsWithStatus(state, "utama");

  const completedDailyCount = harianMissions.filter(
    (m: MissionWithStatus) => m.isClaimed
  ).length;
  const allDailyClaimed =
    harianMissions.length > 0 && completedDailyCount === harianMissions.length;

  const completedWeeklyCount = mingguanMissions.filter(
    (m: MissionWithStatus) => m.isClaimed
  ).length;
  const allWeeklyClaimed =
    mingguanMissions.length > 0 && completedWeeklyCount === mingguanMissions.length;

  // Unclaimed totals
  const allMissions: MissionWithStatus[] = [
    ...harianMissions,
    ...mingguanMissions,
    ...utamaMissions,
  ];
  let unclaimedXp = allMissions.reduce(
    (acc: number, m: MissionWithStatus) => (m.isReadyToClaim ? acc + m.xp : acc),
    0
  );
  let unclaimedPoints = allMissions.reduce(
    (acc: number, m: MissionWithStatus) => (m.isReadyToClaim ? acc + m.poin : acc),
    0
  );
  if (allDailyClaimed && !state.missionState.harian.chestClaimed) {
    unclaimedXp += 30;
    unclaimedPoints += 20;
  }
  if (allWeeklyClaimed && !state.missionState.mingguan.chestClaimed) {
    unclaimedXp += 100;
    unclaimedPoints += 60;
  }

  // Handle Tab Switch
  const handleSelectTab = (tab: MissionType) => {
    setSearchParams({ tab });
  };

  // Keyboard navigation for ARIA tabs
  const tabsList: MissionType[] = ["harian", "mingguan", "utama"];
  const handleTabKeyDown = (e: React.KeyboardEvent, currentTab: MissionType) => {
    const currentIndex = tabsList.indexOf(currentTab);
    if (e.key === "ArrowRight") {
      const nextIndex = (currentIndex + 1) % tabsList.length;
      handleSelectTab(tabsList[nextIndex]);
    } else if (e.key === "ArrowLeft") {
      const prevIndex = (currentIndex - 1 + tabsList.length) % tabsList.length;
      handleSelectTab(tabsList[prevIndex]);
    }
  };

  // Claim actions
  const handleClaimMission = (missionId: string) => {
    const res = claimMission(missionId);
    if (res.success && res.mission) {
      showToast(`+${res.xp} XP & +${res.poin} Poin! Hadiah "${res.mission.judul}" diterima.`);
      if (res.leveledUp) {
        setLevelUpData({
          isOpen: true,
          level: res.newLevel,
          title: res.newTitle,
        });
      }
    }
  };

  const handleClaimChest = (type: "harian" | "mingguan") => {
    const res = claimChest(type);
    if (res.success) {
      showToast(`Harta Karun Terbuka! +${res.xp} XP & +${res.poin} Poin bonus diterima.`);
      if (res.leveledUp) {
        setLevelUpData({
          isOpen: true,
          level: res.newLevel,
          title: res.newTitle,
        });
      }
    }
  };

  const handleClaimAll = () => {
    const res = claimAllMissions();
    if (res.claimedCount > 0) {
      showToast(`Bagus sekali! ${res.claimedCount} hadiah berhasil diklaim (+${res.totalXp} XP, +${res.totalPoints} Poin).`);
      if (res.leveledUp) {
        setLevelUpData({
          isOpen: true,
          level: res.newLevel,
          title: res.newTitle,
        });
      }
    }
  };

  // Hero title logic
  const getHeroTitle = () => {
    if (totalClaimableCount > 0) {
      return `Wah, ${totalClaimableCount} hadiah menunggumu!`;
    }
    if (allDailyClaimed) {
      return "Hebat! Misi hari ini beres semua.";
    }
    return "Yuk kerjakan misi hari ini!";
  };

  // 6 City missions summary
  const completedCityMissions = state.missionProgress.filter(
    (m) => m.status === "completed"
  ).length;

  return (
    <DashboardLayout
      title="Misi"
      subtitle="Selesaikan tugas, kumpulkan hadiah, naik level!"
    >
      {/* Toast Notification (Aria-live) */}
      <div
        aria-live="polite"
        className="fixed bottom-6 right-6 z-50 pointer-events-none"
      >
        {toastMessage && (
          <div className="bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-in slide-in-from-bottom duration-300">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>



      {/* ==================== HERO BANNER ==================== */}
      <section className="rounded-[26px] bg-gradient-to-r from-[#4ADE80] via-[#22C55E] to-[#16A34A] px-6 sm:px-8 py-6 relative overflow-hidden shadow-[0_4px_20px_rgba(14,165,233,0.18)] min-h-[178px] flex flex-col justify-between mb-6">
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-16 left-1/3 w-56 h-56 bg-emerald-300/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-xl">
          {/* Label */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-[11px] font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Dari Ecobot</span>
          </div>

          {/* Dynamic Hero Title */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
            {getHeroTitle()}
          </h2>

          <p className="text-[13px] sm:text-[14px] text-emerald-50 mt-1 font-medium">
            Kumpulkan poin dan XP untuk membuka perlengkapan baru dan naik level!
          </p>

          {/* Chips */}
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <span className="bg-white/20 backdrop-blur-xs text-white text-[11.5px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>{completedDailyCount}/3 Misi Harian</span>
            </span>

            <span className="bg-white/20 backdrop-blur-xs text-white text-[11.5px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
              <span>Reset harian dalam</span>
              <DailyCountdown className="text-amber-200" />
            </span>

            <span className="bg-white/20 backdrop-blur-xs text-white text-[11.5px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
              <Flame className="w-3.5 h-3.5 text-orange-300 fill-orange-300" />
              <span>Streak {state.streak} Hari</span>
            </span>
          </div>
        </div>

        {/* Action Button & Ecobot Mascot */}
        <div className="mt-5 relative z-10 flex items-center justify-between">
          <button
            type="button"
            disabled={totalClaimableCount === 0}
            onClick={handleClaimAll}
            className={`px-5 py-2.5 rounded-full font-black text-[13px] flex items-center gap-2 shadow-sm transition transform ${
              totalClaimableCount > 0
                ? "bg-white hover:bg-emerald-50 text-emerald-800 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                : "bg-white/40 text-white/70 cursor-not-allowed shadow-none"
            }`}
          >
            <Gift className="w-4 h-4 text-emerald-600" />
            <span>
              {totalClaimableCount > 0
                ? `Klaim Semua (${totalClaimableCount})`
                : "Belum Ada yang Siap"}
            </span>
          </button>
        </div>

        {/* Mascot in Hero Banner */}
        <div className="absolute right-3 sm:right-6 bottom-0 w-28 sm:w-36 h-32 sm:h-40 flex items-end justify-center pointer-events-none">
          <EcobotMascot
            pose={totalClaimableCount > 0 ? "happy" : "wave"}
            size="banner"
            className="w-full h-full object-contain filter drop-shadow-lg"
          />
        </div>
      </section>

      {/* ==================== MAIN CONTENT GRID ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ==================== LEFT 2 COLUMNS: TABS & MISSION LIST ==================== */}
        <div className="lg:col-span-2 space-y-5">
          {/* ARIA Pill Tabs Navigation */}
          <div
            role="tablist"
            aria-label="Pilihan Kategori Misi"
            className="bg-white rounded-2xl p-1.5 shadow-[0_2px_10px_rgba(14,165,233,0.05)] border border-emerald-100 flex items-center gap-1.5 select-none"
          >
            <button
              role="tab"
              id="tab-harian"
              aria-selected={activeTab === "harian"}
              aria-controls="panel-harian"
              tabIndex={activeTab === "harian" ? 0 : -1}
              onClick={() => handleSelectTab("harian")}
              onKeyDown={(e) => handleTabKeyDown(e, "harian")}
              className={`flex-1 py-2.5 px-3 rounded-xl font-black text-[13px] flex items-center justify-center gap-2 transition cursor-pointer ${
                activeTab === "harian"
                  ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-emerald-50/60"
              }`}
            >
              <span>Harian</span>
              {tabCounts.harian > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-black text-[10px] flex items-center justify-center shadow-2xs">
                  {tabCounts.harian}
                </span>
              )}
            </button>

            <button
              role="tab"
              id="tab-mingguan"
              aria-selected={activeTab === "mingguan"}
              aria-controls="panel-mingguan"
              tabIndex={activeTab === "mingguan" ? 0 : -1}
              onClick={() => handleSelectTab("mingguan")}
              onKeyDown={(e) => handleTabKeyDown(e, "mingguan")}
              className={`flex-1 py-2.5 px-3 rounded-xl font-black text-[13px] flex items-center justify-center gap-2 transition cursor-pointer ${
                activeTab === "mingguan"
                  ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-emerald-50/60"
              }`}
            >
              <span>Mingguan</span>
              {tabCounts.mingguan > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-black text-[10px] flex items-center justify-center shadow-2xs">
                  {tabCounts.mingguan}
                </span>
              )}
            </button>

            <button
              role="tab"
              id="tab-utama"
              aria-selected={activeTab === "utama"}
              aria-controls="panel-utama"
              tabIndex={activeTab === "utama" ? 0 : -1}
              onClick={() => handleSelectTab("utama")}
              onKeyDown={(e) => handleTabKeyDown(e, "utama")}
              className={`flex-1 py-2.5 px-3 rounded-xl font-black text-[13px] flex items-center justify-center gap-2 transition cursor-pointer ${
                activeTab === "utama"
                  ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-emerald-50/60"
              }`}
            >
              <span>Utama</span>
              {tabCounts.utama > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-black text-[10px] flex items-center justify-center shadow-2xs">
                  {tabCounts.utama}
                </span>
              )}
            </button>
          </div>

          {/* TAB 1: HARIAN */}
          {activeTab === "harian" && (
            <div
              role="tabpanel"
              id="panel-harian"
              aria-labelledby="tab-harian"
              className="space-y-4 animate-in fade-in-50 duration-200"
            >
              <div className="flex items-center justify-between px-1">
                <span className="text-[12.5px] font-black text-slate-800 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-emerald-600" />
                  <span>Daftar Misi Harian ({completedDailyCount}/3)</span>
                </span>
                <span className="text-[11.5px] text-slate-500 font-bold">
                  Berganti tiap tengah malam
                </span>
              </div>

              {harianMissions.map((mission: MissionWithStatus) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  onClaim={handleClaimMission}
                />
              ))}

              {/* Peti Bonus Harian */}
              <div className="pt-2">
                <ChestCard
                  type="harian"
                  isUnlocked={allDailyClaimed}
                  isClaimed={state.missionState.harian.chestClaimed}
                  onClaimChest={handleClaimChest}
                  claimedCount={completedDailyCount}
                  totalMissions={harianMissions.length}
                />
              </div>
            </div>
          )}

          {/* TAB 2: MINGGUAN */}
          {activeTab === "mingguan" && (
            <div
              role="tabpanel"
              id="panel-mingguan"
              aria-labelledby="tab-mingguan"
              className="space-y-4 animate-in fade-in-50 duration-200"
            >
              <div className="flex items-center justify-between px-1">
                <span className="text-[12.5px] font-black text-slate-800 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-emerald-600" />
                  <span>Daftar Misi Mingguan ({completedWeeklyCount}/3)</span>
                </span>
                <WeeklyCountdown />
              </div>

              {mingguanMissions.map((mission: MissionWithStatus) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  onClaim={handleClaimMission}
                />
              ))}

              {/* Peti Bonus Mingguan */}
              <div className="pt-2">
                <ChestCard
                  type="mingguan"
                  isUnlocked={allWeeklyClaimed}
                  isClaimed={state.missionState.mingguan.chestClaimed}
                  onClaimChest={handleClaimChest}
                  claimedCount={completedWeeklyCount}
                  totalMissions={mingguanMissions.length}
                />
              </div>
            </div>
          )}

          {/* TAB 3: UTAMA (TONGGAK JANGKA PANJANG) */}
          {activeTab === "utama" && (
            <div
              role="tabpanel"
              id="panel-utama"
              aria-labelledby="tab-utama"
              className="space-y-4 animate-in fade-in-50 duration-200"
            >
              {/* City Missions Summary Banner */}
              <div className="rounded-[24px] p-5 bg-gradient-to-r from-sky-50 via-white to-emerald-50 border border-emerald-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-[15.5px] font-black text-slate-900">
                      Misi Petualangan Kota Harapan
                    </h3>
                    <p className="text-[12.5px] text-slate-600">
                      {completedCityMissions}/6 zona telah berhasil kamu bersihkan
                    </p>
                    <div className="w-36 h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{
                          width: `${Math.round((completedCityMissions / 6) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <Link
                  to="/main-game"
                  className="h-11 px-5 rounded-full bg-emerald-600 hover:bg-emerald-600 text-slate-950 font-black text-[12.5px] flex items-center gap-2 self-start sm:self-center shadow-xs transition hover:scale-105"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Buka Peta Misi</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="px-1 pt-1">
                <span className="text-[13px] font-black text-slate-900">
                  Tonggak Prestasi & Jejak Belajar
                </span>
                <p className="text-[12px] text-slate-500">
                  Target jangka panjang yang otomatis tercapai saat kamu terus aktif
                </p>
              </div>

              {/* Vertical Milestone Pathway */}
              <div className="space-y-3.5">
                {utamaMissions.map((mission: MissionWithStatus) => (
                  <MissionCard
                    key={mission.id}
                    mission={mission}
                    onClaim={handleClaimMission}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ==================== RIGHT COLUMN: REWARDS SUMMARY ==================== */}
        <div className="lg:col-span-1">
          <RewardsSummaryPanel
            state={state}
            unclaimedXp={unclaimedXp}
            unclaimedPoints={unclaimedPoints}
            totalClaimableCount={totalClaimableCount}
            onClaimAll={handleClaimAll}
          />
        </div>
      </div>

      {/* Level Up Modal */}
      <LevelUpModal
        isOpen={levelUpData.isOpen}
        onClose={() => setLevelUpData((prev) => ({ ...prev, isOpen: false }))}
        newLevel={levelUpData.level}
        newTitle={levelUpData.title}
        nickname={state.nickname}
      />
    </DashboardLayout>
  );
}
