import React, { useState, useEffect, useMemo, useTransition } from "react";
import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { usePlayerStore } from "../store/playerStore";
import { BantuanHero } from "../components/bantuan/BantuanHero";
import { SearchResultsView } from "../components/bantuan/SearchResultsView";
import { TabCaraBermain } from "../components/bantuan/TabCaraBermain";
import { TabKontrol } from "../components/bantuan/TabKontrol";
import { TabFaq } from "../components/bantuan/TabFaq";
import { TabPetaFitur } from "../components/bantuan/TabPetaFitur";
import { BantuanCepatPanel } from "../components/bantuan/BantuanCepatPanel";
import { GuidedTourModal } from "../components/bantuan/GuidedTourModal";
import { searchHelpContent } from "../data/bantuan/search";
import type { HelpTabKey } from "../data/bantuan/types";

const VALID_TABS: Record<HelpTabKey, { label: string; icon: string }> = {
  "cara-bermain": { label: "Cara Bermain", icon: "🎮" },
  kontrol: { label: "Kontrol & HUD", icon: "🕹️" },
  faq: { label: "FAQ & Masalah", icon: "💬" },
  peta: { label: "Peta Fitur", icon: "🗺️" },
};

export const BantuanPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state, setTourSeen } = usePlayerStore();
  const { nickname, settings } = state;
  const [, startTransition] = useTransition();

  // Active Tab from URL search params
  const tabParam = (searchParams.get("tab") as HelpTabKey) || "cara-bermain";
  const activeTab: HelpTabKey = VALID_TABS[tabParam] ? tabParam : "cara-bermain";

  // Search Query
  const initialQuery = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState<string>(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState<string>(initialQuery);

  // Guided Tour modal state
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);

  // Debounce search input (180ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchInput);
      startTransition(() => {
        const nextParams = new URLSearchParams(searchParams);
        if (searchInput.trim()) {
          nextParams.set("q", searchInput.trim());
        } else {
          nextParams.delete("q");
        }
        setSearchParams(nextParams, { replace: true });
      });
    }, 180);

    return () => clearTimeout(timer);
  }, [searchInput, searchParams, setSearchParams]);

  // Handle Tab Change
  const handleTabChange = (newTab: HelpTabKey) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("tab", newTab);
    setSearchParams(nextParams);
  };

  // Perform Real-time Search
  const searchResults = useMemo(() => {
    return searchHelpContent(debouncedQuery);
  }, [debouncedQuery]);

  const isSearching = debouncedQuery.trim().length >= 2;

  const handleSelectSearchResult = (targetTab: HelpTabKey, targetId?: string) => {
    // Clear search and switch tab
    setSearchInput("");
    setDebouncedQuery("");
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("q");
    nextParams.set("tab", targetTab);
    setSearchParams(nextParams);

    // Scroll to element if targetId is provided
    if (targetId) {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 150);
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setDebouncedQuery("");
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("q");
    setSearchParams(nextParams);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchInput(suggestion);
    setDebouncedQuery(suggestion);
  };

  const handleCloseTour = () => {
    setIsTourOpen(false);
    if (!settings.tourSeen) {
      setTourSeen(true);
    }
  };

  const handleCompleteTour = () => {
    setIsTourOpen(false);
    setTourSeen(true);
  };

  return (
    <DashboardLayout
      title="Pusat Bantuan & Panduan"
      subtitle="Panduan bermain, cara kontrol, tanya jawab, dan tur keliling ECOBOT"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Hero Section */}
        <BantuanHero
          nickname={nickname}
          searchQuery={searchInput}
          onSearchChange={setSearchInput}
          onClearSearch={handleClearSearch}
          onStartTour={() => setIsTourOpen(true)}
          totalResultsCount={isSearching ? searchResults.length : undefined}
        />

        {/* Search Results Mode */}
        {isSearching ? (
          <div className="mb-12">
            <SearchResultsView
              query={debouncedQuery}
              results={searchResults}
              onSelectResult={handleSelectSearchResult}
              onClearSearch={handleClearSearch}
              onSuggestionClick={handleSuggestionClick}
            />
          </div>
        ) : (
          /* Normal Tabbed Content Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Main Content (8 cols on lg) */}
            <main className="lg:col-span-8 space-y-6">
              {/* Tab Navigation Pill Bar */}
              <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
                {(Object.keys(VALID_TABS) as HelpTabKey[]).map((tabKey) => {
                  const tab = VALID_TABS[tabKey];
                  const isActive = activeTab === tabKey;

                  return (
                    <button
                      key={tabKey}
                      type="button"
                      onClick={() => handleTabChange(tabKey)}
                      className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                        isActive
                          ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-base">{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Tab Panel */}
              <div className="pt-2">
                {activeTab === "cara-bermain" && <TabCaraBermain />}
                {activeTab === "kontrol" && <TabKontrol />}
                {activeTab === "faq" && <TabFaq />}
                {activeTab === "peta" && <TabPetaFitur />}
              </div>
            </main>

            {/* Right Sticky Sidebar (4 cols on lg) */}
            <div className="lg:col-span-4 lg:sticky lg:top-6 space-y-6">
              <BantuanCepatPanel />
            </div>
          </div>
        )}
      </div>

      {/* Guided Tour Modal */}
      <GuidedTourModal
        isOpen={isTourOpen}
        onClose={handleCloseTour}
        onComplete={handleCompleteTour}
      />
    </DashboardLayout>
  );
};

export default BantuanPage;
