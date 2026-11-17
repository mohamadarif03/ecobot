import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { User, Gamepad2, Eye, ShieldCheck } from "lucide-react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { usePlayerStore } from "../store/playerStore";
import { PengaturanHero } from "../components/pengaturan/PengaturanHero";
import { TabProfil } from "../components/pengaturan/TabProfil";
import { TabGame } from "../components/pengaturan/TabGame";
import { TabTampilan } from "../components/pengaturan/TabTampilan";
import { TabDataPrivasi } from "../components/pengaturan/TabDataPrivasi";
import { SettingsToast } from "../components/pengaturan/SettingsToast";
import Tabs from "../components/ui/Tabs";

export const PengaturanPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTab = searchParams.get("tab") || "profil";
  const activeTab = ["profil", "game", "tampilan", "data"].includes(rawTab)
    ? rawTab
    : "profil";

  const {
    state,
    updateSettings,
    resetSettingsSection,
    updateProfile,
    setShowOnBoard,
    resetGameProgress,
    resetAllData,
    restoreBackupData,
    undoRestoreBackup,
  } = usePlayerStore();

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  // Debounced Toast Notification for Auto-Save
  const [toastMessage, setToastMessage] = useState<string>("Pengaturan tersimpan");
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerToast = (msg = "Pengaturan tersimpan otomatis") => {
    setToastMessage(msg);
    setShowToast(true);

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const tabsConfig = [
    {
      id: "profil",
      label: "Profil",
      icon: <User className="w-4 h-4" />,
    },
    {
      id: "game",
      label: "Game",
      icon: <Gamepad2 className="w-4 h-4" />,
    },
    {
      id: "tampilan",
      label: "Tampilan",
      icon: <Eye className="w-4 h-4" />,
    },
    {
      id: "data",
      label: "Data & Privasi",
      icon: <ShieldCheck className="w-4 h-4" />,
    },
  ];

  return (
    <DashboardLayout
      title="Pengaturan"
      subtitle="Atur Ecobot sesuai kenyamananmu"
    >
      <div className="space-y-6">
        {/* 1. Hero Banner Ringkas */}
        <PengaturanHero
          nickname={state.nickname}
          settings={state.settings}
        />

        {/* 2. Navigation Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-800">
          <Tabs
            tabs={tabsConfig}
            activeTab={activeTab}
            onChange={handleTabChange}
          />
        </div>

        {/* 3. Tab Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "profil" && (
            <TabProfil
              state={state}
              onUpdateProfile={updateProfile}
              onNotifySave={triggerToast}
            />
          )}

          {activeTab === "game" && (
            <TabGame
              settings={state.settings}
              onUpdateSettings={(partial) => {
                updateSettings(partial);
                triggerToast();
              }}
              onResetSection={resetSettingsSection}
              onNotifySave={triggerToast}
            />
          )}

          {activeTab === "tampilan" && (
            <TabTampilan
              settings={state.settings}
              onUpdateSettings={(partial) => {
                updateSettings(partial);
                triggerToast();
              }}
              onResetSection={resetSettingsSection}
              onNotifySave={triggerToast}
            />
          )}

          {activeTab === "data" && (
            <TabDataPrivasi
              state={state}
              showOnBoard={state.leaderboard?.showOnBoard ?? true}
              onToggleShowOnBoard={setShowOnBoard}
              onResetGameProgress={resetGameProgress}
              onResetAllData={resetAllData}
              onRestoreBackup={restoreBackupData}
              onUndoRestoreBackup={undoRestoreBackup}
              onNotifySave={triggerToast}
            />
          )}
        </div>
      </div>

      {/* Auto-Save Status Toast */}
      <SettingsToast show={showToast} message={toastMessage} />
    </DashboardLayout>
  );
};

export default PengaturanPage;
