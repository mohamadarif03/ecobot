import React, { useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Trophy, Calendar, Award } from "lucide-react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { usePlayerStore } from "../store/playerStore";
import { leaderboardService } from "../services/leaderboard/index.ts";
import type { LeaderboardPeriod } from "../data/peringkat/types.ts";
import { PeringkatHero } from "../components/peringkat/PeringkatHero";
import { HonestyBanner } from "../components/peringkat/HonestyBanner";
import { PodiumTop3 } from "../components/peringkat/PodiumTop3";
import { LeaderboardTable } from "../components/peringkat/LeaderboardTable";
import { PosisimuRightPanel } from "../components/peringkat/PosisimuRightPanel";
import { LigaTab } from "../components/peringkat/LigaTab";
import Tabs from "../components/ui/Tabs";

export const PapanPeringkatPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTab = searchParams.get("tab") || "mingguan";
  const activeTab = ["mingguan", "sepanjang-masa", "liga"].includes(rawTab)
    ? rawTab
    : "mingguan";

  const {
    state,
    setShowOnBoard,
    claimLigaReward,
    updateRankSnapshot,
    getLigaStatus,
    getWeeklyXp,
  } = usePlayerStore();

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  const period: LeaderboardPeriod =
    activeTab === "sepanjang-masa" ? "sepanjang-masa" : "mingguan";

  // Fetch leaderboard data for the active period
  const leaderboardData = useMemo(() => {
    return leaderboardService.getLeaderboard(period, state);
  }, [period, state]);

  // Also fetch all-time data to update snapshots
  const allTimeData = useMemo(() => {
    return leaderboardService.getLeaderboard("sepanjang-masa", state);
  }, [state]);

  const ligaStatus = getLigaStatus();
  const weeklyXp = getWeeklyXp();

  // Snapshot ranks periodically or on load to track trends
  useEffect(() => {
    if (leaderboardData.currentUserEntry && allTimeData.currentUserEntry) {
      updateRankSnapshot(
        leaderboardData.currentUserEntry.rank,
        allTimeData.currentUserEntry.rank
      );
    }
  }, [leaderboardData.currentUserEntry.rank, allTimeData.currentUserEntry.rank]);

  const tabsConfig = [
    {
      id: "mingguan",
      label: "Mingguan",
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: "sepanjang-masa",
      label: "Sepanjang Masa",
      icon: <Trophy className="w-4 h-4" />,
    },
    {
      id: "liga",
      label: "Liga Mingguan",
      icon: <Award className="w-4 h-4" />,
      count:
        ligaStatus.canClaim.perunggu || ligaStatus.canClaim.perak || ligaStatus.canClaim.emas
          ? 1
          : undefined,
    },
  ];

  return (
    <DashboardLayout
      title="Papan Peringkat"
      subtitle="Belajar seru, rawat bumi, dan rayakan prestasimu bersama teman-teman"
    >
      <div className="space-y-6">
        {/* 1. Hero Banner */}
        <PeringkatHero
          nickname={state.nickname}
          period={period}
          currentRank={leaderboardData.currentUserEntry.rank}
          totalParticipants={leaderboardData.totalParticipants}
          xpAmount={period === "mingguan" ? weeklyXp : state.xp}
          currentLigaTier={ligaStatus.currentTier}
          nextResetDate={leaderboardData.nextResetDate}
          onOpenLigaTab={() => handleTabChange("liga")}
        />

        {/* 2. Honesty & Privacy Disclaimer Banner */}
        <HonestyBanner />

        {/* 3. Navigation Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-800">
          <Tabs
            tabs={tabsConfig}
            activeTab={activeTab}
            onChange={handleTabChange}
          />
        </div>

        {/* 4. Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Podium & Table or Liga Tab (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "liga" ? (
              <LigaTab
                status={ligaStatus}
                history={state.leaderboard?.liga?.history || []}
                onClaim={claimLigaReward}
              />
            ) : (
              <>
                {/* Top 3 Podium */}
                <PodiumTop3 entries={leaderboardData.entries} />

                {/* Table for Ranks 4-10 and Sekitarmu slice */}
                <LeaderboardTable
                  entries={leaderboardData.entries}
                  currentUserRank={leaderboardData.currentUserEntry.rank}
                />
              </>
            )}
          </div>

          {/* Right Column: Posisimu, Mini-Liga, XP Tips, Child Privacy (1 col) */}
          <div className="lg:col-span-1 sticky top-6">
            <PosisimuRightPanel
              currentUserEntry={leaderboardData.currentUserEntry}
              entries={leaderboardData.entries}
              period={period}
              ligaStatus={ligaStatus}
              showOnBoard={state.leaderboard?.showOnBoard ?? true}
              onToggleShowOnBoard={setShowOnBoard}
              onOpenLigaTab={() => handleTabChange("liga")}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PapanPeringkatPage;
