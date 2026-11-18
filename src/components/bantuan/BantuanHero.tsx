import React from "react";
import { Link } from "react-router-dom";
import { EcobotMascot } from "../ecobot/EcobotMascot";

interface BantuanHeroProps {
  nickname: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  onStartTour: () => void;
  totalResultsCount?: number;
}

export const BantuanHero: React.FC<BantuanHeroProps> = ({
  nickname,
  searchQuery,
  onSearchChange,
  onClearSearch,
  onStartTour,
  totalResultsCount,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-indigo-700 text-white p-6 sm:p-8 shadow-xl shadow-emerald-500/20 mb-8">
      {/* Decorative background glows and shapes */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-48 h-48 bg-emerald-400/20 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Mascot & Greeting */}
        <div className="flex items-center gap-4 sm:gap-6 text-center sm:text-left">
          <div className="flex-shrink-0 drop-shadow-lg">
            <EcobotMascot
              size="hero"
              pose="happy"
              className="transform hover:scale-105 transition-transform"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-emerald-100 uppercase tracking-wider mb-2">
              <span>🌟</span> Pusat Bantuan & Panduan
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Halo, {nickname || "Pahlawan Lingkungan"}!
            </h1>
            <p className="mt-1 text-sm sm:text-base text-emerald-100 max-w-xl">
              Ada yang membingungkan? Tenang, Ecobot siap membantumu memahami cara bermain,
              kontrol, tips 3 bintang, dan solusi cepat!
            </p>
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 flex-shrink-0 w-full md:w-auto">
          <button
            type="button"
            onClick={onStartTour}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-sm shadow-lg shadow-amber-500/30 active:scale-95 transition-all"
            title="Mulai tur panduan keliling fitur aplikasi"
          >
            <span>🧭</span>
            <span>Mulai Tur Singkat</span>
          </button>
          <Link
            to="/pengaturan"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm border border-white/20 backdrop-blur-md active:scale-95 transition-all"
            title="Buka pusat pengaturan suara, grafis, dan kontrol"
          >
            <span>⚙️</span>
            <span>Buka Pengaturan</span>
          </Link>
        </div>
      </div>

      {/* Real-time Search Bar */}
      <div className="relative mt-6 sm:mt-8 z-10 max-w-2xl">
        <label htmlFor="bantuan-search-input" className="sr-only">
          Cari bantuan, pertanyaan, atau panduan
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-4 text-emerald-400 text-lg pointer-events-none">
            🔍
          </span>
          <input
            id="bantuan-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari topik bantuan... (misal: tong sampah, koin, lag, kontrol kidal)"
            className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-white text-slate-800 placeholder-slate-400 text-sm sm:text-base font-medium shadow-lg border-2 border-transparent focus:border-amber-400 focus:outline-none transition-all"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={onClearSearch}
              className="absolute right-3 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Bersihkan pencarian (Esc)"
            >
              <span>✕</span>
              <span>Hapus</span>
            </button>
          ) : (
            <div className="absolute right-3 hidden sm:flex items-center gap-1.5 text-xs text-slate-400 pointer-events-none">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono">
                Cari cepat
              </kbd>
            </div>
          )}
        </div>

        {/* Quick status bar when searching */}
        {searchQuery.trim().length >= 2 && typeof totalResultsCount === "number" && (
          <div className="mt-2 flex items-center justify-between text-xs text-emerald-100 px-2">
            <span>
              Ditemukan <strong>{totalResultsCount}</strong> hasil untuk &ldquo;{searchQuery}&rdquo;
            </span>
            <button
              type="button"
              onClick={onClearSearch}
              className="underline hover:text-white transition-colors"
            >
              Tutup hasil & kembali ke tab
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
