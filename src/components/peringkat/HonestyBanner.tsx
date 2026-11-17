import React, { useState } from "react";
import { Sparkles, X, Info } from "lucide-react";

export const HonestyBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem("ecobot_lb_disclaimer_dismissed") === "true";
    } catch {
      return false;
    }
  });

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("ecobot_lb_disclaimer_dismissed", "true");
    } catch {
      // ignore
    }
  };

  if (dismissed) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-sky-50 via-emerald-50 to-amber-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 border-2 border-sky-200 dark:border-slate-700 rounded-3xl p-4 sm:p-5 shadow-sm transition-all">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-md">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>

        <div className="flex-1 min-w-0 pr-6">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">
              Ruang Belajar Bersama Ecobot
            </h4>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
              <Info className="w-3 h-3" /> Info Ramah
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Teman-teman di papan peringkat ini adalah <strong>contoh pemain fiktif</strong> dari Ecobot untuk menyemangati langkah belajarmu. Peringkat multipemain online resmi akan hadir saat fitur interaksi antar-sekolah dibuka!
          </p>
        </div>

        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
          title="Tutup pesan ini"
          aria-label="Tutup info"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
