import React from "react";
import { Award, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";
import Button from "../ui/Button";

interface PencapaianHeroProps {
  nickname: string;
  badgeCount: { unlocked: number; total: number };
  cardCount: { unlocked: number; total: number };
  level: number;
  levelTitle: string;
  newAchievementCount: number;
  onMarkAllSeen: () => void;
  onNavigateToStats: () => void;
}

export const PencapaianHero: React.FC<PencapaianHeroProps> = ({
  nickname,
  badgeCount,
  cardCount,
  level,
  levelTitle,
  newAchievementCount,
  onMarkAllSeen,
  onNavigateToStats,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 md:p-8 text-white shadow-xl shadow-amber-500/20 mb-8">
      {/* Background patterns */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-yellow-300/15 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            <span>Etalase Prestasi Kamu</span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Lemari Prestasimu, {nickname}! 🏆
          </h1>

          <p className="text-amber-100 text-sm md:text-base leading-relaxed">
            Setiap aksi kecilmu memilah sampah dan belajar menjaga bumi tercatat
            di sini. Kumpulkan lencana, kartu fakta, dan sertifikat resmi!
          </p>

          {/* Quick Stat Chips */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-xs md:text-sm font-semibold">
              <Award className="w-4 h-4 text-yellow-300" />
              <span>
                {badgeCount.unlocked}/{badgeCount.total} Badge
              </span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-xs md:text-sm font-semibold">
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>
                {cardCount.unlocked}/{cardCount.total} Kartu Fakta
              </span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-xs md:text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                Level {level} ({levelTitle})
              </span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
          {newAchievementCount > 0 ? (
            <button
              onClick={onMarkAllSeen}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-amber-700 font-bold text-sm shadow-lg hover:bg-amber-50 active:scale-95 transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              <span>Tandai Semua Dilihat ({newAchievementCount})</span>
            </button>
          ) : (
            <button
              onClick={onNavigateToStats}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-bold text-sm transition-all"
            >
              <span>Lihat Rapor Kepedulian 📊</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
