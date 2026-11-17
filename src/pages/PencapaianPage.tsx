import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Award, BookOpen, BarChart3, FileCheck2 } from "lucide-react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { usePlayerStore } from "../store/playerStore";
import { PencapaianHero } from "../components/pencapaian/PencapaianHero";
import { PencapaianRightPanel } from "../components/pencapaian/PencapaianRightPanel";
import { BadgeGrid } from "../components/pencapaian/BadgeGrid";
import { FactCardsGrid } from "../components/pencapaian/FactCardsGrid";
import { StatsTab } from "../components/pencapaian/StatsTab";
import { CertificatesTab } from "../components/pencapaian/CertificatesTab";
import Tabs from "../components/ui/Tabs";
import { calculateLevel } from "../data/levels";

export const PencapaianPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "badge";

  const {
    state,
    getBadgeList,
    getFactCardList,
    getNewAchievementCount,
    getRecentBadges,
    getNearBadges,
    getStatsSummary,
    getRadarScores,
    getCertificateStatus,
    markBadgeSeen,
    markCardSeen,
    markAllSeen,
    issueCertificate,
  } = usePlayerStore();

  const [selectedBadgeId, setSelectedBadgeId] = useState<string | null>(null);

  const levelInfo = calculateLevel(state.xp);
  const level = levelInfo.level;
  const title = levelInfo.title;
  const badgeList = getBadgeList();
  const factCardList = getFactCardList();
  const newCount = getNewAchievementCount();
  const recentBadges = getRecentBadges(3);
  const nearBadges = getNearBadges(2);
  const statsSummary = getStatsSummary();
  const radarScores = getRadarScores();
  const certificateStatus = getCertificateStatus();

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  const handleSelectBadgeFromPanel = (badgeId: string) => {
    setSelectedBadgeId(badgeId);
    setSearchParams({ tab: "badge" });
  };

  const tabsConfig = [
    {
      id: "badge",
      label: "Lencana",
      count: badgeList.filter((b) => b.unlocked).length,
      icon: <Award className="w-4 h-4" />,
    },
    {
      id: "kartu",
      label: "Kartu Fakta",
      count: factCardList.filter((c) => c.unlocked).length,
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: "statistik",
      label: "Statistik & Rapor",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: "sertifikat",
      label: "Sertifikat",
      count: certificateStatus.filter((c) => c.status === "issued").length,
      icon: <FileCheck2 className="w-4 h-4" />,
    },
  ];

  return (
    <DashboardLayout
      title="Pencapaian"
      subtitle="Koleksi lencana, kartu fakta, rapor kepedulian, dan sertifikat resmi."
    >
      <div className="space-y-6">
        {/* Hero Banner */}
        <PencapaianHero
          nickname={state.nickname}
          badgeCount={{
            unlocked: badgeList.filter((b) => b.unlocked).length,
            total: badgeList.length,
          }}
          cardCount={{
            unlocked: factCardList.filter((c) => c.unlocked).length,
            total: factCardList.length,
          }}
          level={level}
          levelTitle={title}
          newAchievementCount={newCount}
          onMarkAllSeen={markAllSeen}
          onNavigateToStats={() => handleTabChange("statistik")}
        />

        {/* Navigation Tabs */}
        <div className="border-b border-slate-200">
          <Tabs
            tabs={tabsConfig}
            activeTab={activeTab}
            onChange={handleTabChange}
          />
        </div>

        {/* Main Grid: Content (Left) + Right Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 Cols) */}
          <div className="lg:col-span-2">
            {activeTab === "badge" && (
              <BadgeGrid
                badges={badgeList}
                onMarkSeen={markBadgeSeen}
                selectedBadgeId={selectedBadgeId}
                onClearSelectedBadge={() => setSelectedBadgeId(null)}
              />
            )}

            {activeTab === "kartu" && (
              <FactCardsGrid
                cards={factCardList}
                onMarkSeen={markCardSeen}
              />
            )}

            {activeTab === "statistik" && (
              <StatsTab
                stats={statsSummary}
                radarScores={radarScores}
                activityLog={state.activityLog || []}
              />
            )}

            {activeTab === "sertifikat" && (
              <CertificatesTab
                certificates={certificateStatus}
                nickname={state.nickname}
                onIssueCertificate={issueCertificate}
              />
            )}
          </div>

          {/* Right Column (1 Col) */}
          <div className="lg:col-span-1">
            <PencapaianRightPanel
              nickname={state.nickname}
              avatar={state.avatar}
              xp={state.xp}
              level={level}
              levelTitle={title}
              recentBadges={recentBadges}
              nearBadges={nearBadges}
              onSelectBadge={handleSelectBadgeFromPanel}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PencapaianPage;
