import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { SearchResultItem, HelpTabKey } from "../../data/bantuan/types";
import { EcobotMascot } from "../ecobot/EcobotMascot";

interface SearchResultsViewProps {
  query: string;
  results: SearchResultItem[];
  onSelectResult: (tab: HelpTabKey, targetId?: string) => void;
  onClearSearch: () => void;
  onSuggestionClick: (suggestion: string) => void;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  query,
  results,
  onSelectResult,
  onClearSearch,
  onSuggestionClick,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("Semua");

  const filterOptions = [
    { label: "Semua", count: results.length },
    {
      label: "FAQ",
      count: results.filter((r) => r.sourceCategory === "FAQ").length,
    },
    {
      label: "Cara Bermain",
      count: results.filter((r) => r.sourceCategory === "Cara Bermain").length,
    },
    {
      label: "Kontrol",
      count: results.filter((r) => r.sourceCategory === "Kontrol").length,
    },
    {
      label: "Peta Fitur",
      count: results.filter((r) => r.sourceCategory === "Peta Fitur").length,
    },
  ];

  const filteredResults =
    selectedFilter === "Semua"
      ? results
      : results.filter((r) => r.sourceCategory === selectedFilter);

  // Simple text highlighter for matched terms
  const highlightMatch = (text: string, term: string) => {
    if (!term.trim()) return text;
    const parts = text.split(new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <mark key={i} className="bg-amber-200 text-amber-900 rounded px-1 py-0.5 font-bold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const POPULAR_SUGGESTIONS = [
    "Tong Sampah",
    "Kantong Penuh",
    "3 Bintang",
    "Poin & Koin",
    "Kuis Harian",
    "Aksi Nyata",
    "Mode Kidal",
    "Game Lag",
    "Cadangan Data",
  ];

  if (results.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border-2 border-slate-100 shadow-sm max-w-2xl mx-auto my-6">
        <div className="flex justify-center mb-4">
          <EcobotMascot size="sidebar" pose="wave" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">
          Wah, Ecobot belum menemukan jawaban untuk &ldquo;{query}&rdquo;
        </h3>
        <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
          Coba periksa ejaan atau gunakan kata kunci yang lebih pendek dan sederhana. Kamu juga
          bisa memilih salah satu topik bantuan populer di bawah ini:
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {POPULAR_SUGGESTIONS.map((sug) => (
            <button
              key={sug}
              type="button"
              onClick={() => onSuggestionClick(sug)}
              className="px-3.5 py-1.5 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold border border-sky-200 active:scale-95 transition-all"
            >
              🔍 {sug}
            </button>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={onClearSearch}
            className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-all"
          >
            ← Kembali ke Menu Bantuan Utama
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category filter pills */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => setSelectedFilter(opt.label)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === opt.label
                  ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {opt.label} ({opt.count})
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onClearSearch}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
        >
          ✕ Tutup Pencarian
        </button>
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResults.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                    item.sourceCategory === "FAQ"
                      ? "bg-purple-100 text-purple-700"
                      : item.sourceCategory === "Cara Bermain"
                      ? "bg-emerald-100 text-emerald-700"
                      : item.sourceCategory === "Kontrol"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-sky-100 text-sky-700"
                  }`}
                >
                  {item.sourceCategory}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  Tab {item.tab}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-800 group-hover:text-sky-600 transition-colors leading-snug">
                {highlightMatch(item.title, query)}
              </h4>

              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {highlightMatch(item.snippet, query)}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onSelectResult(item.tab, item.targetId)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline"
              >
                <span>Buka di tab {item.tab}</span>
                <span>→</span>
              </button>

              {item.actionUrl && (
                <Link
                  to={item.actionUrl}
                  className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 text-xs font-semibold transition-colors"
                >
                  Kunjungi Halaman ↗
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
