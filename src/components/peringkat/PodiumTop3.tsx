import React from "react";
import { Crown, Sparkles, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { LeaderboardEntry } from "../../data/peringkat/types.ts";

interface PodiumTop3Props {
  entries: LeaderboardEntry[];
}

export const PodiumTop3: React.FC<PodiumTop3Props> = ({ entries }) => {
  const rank1 = entries.find((e) => e.rank === 1);
  const rank2 = entries.find((e) => e.rank === 2);
  const rank3 = entries.find((e) => e.rank === 3);

  const renderTrend = (entry?: LeaderboardEntry) => {
    if (!entry) return null;
    if (entry.trend === "naik") {
      return (
        <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-full">
          <TrendingUp className="w-3 h-3" />
          {entry.trendDelta ? `+${entry.trendDelta}` : ""}
        </span>
      );
    }
    if (entry.trend === "turun") {
      return (
        <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.5 rounded-full">
          <TrendingDown className="w-3 h-3" />
          {entry.trendDelta ? `-${entry.trendDelta}` : ""}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center text-[11px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full">
        <Minus className="w-3 h-3" />
      </span>
    );
  };

  const renderPlayerCard = (
    entry: LeaderboardEntry | undefined,
    place: 1 | 2 | 3,
    pedestalHeight: string,
    pedestalBg: string,
    medalEmoji: string,
    borderGlow: string
  ) => {
    if (!entry) {
      return (
        <div className="flex-1 flex flex-col items-center justify-end">
          <div className="text-xs text-slate-400">Kosong</div>
          <div className={`w-full ${pedestalHeight} rounded-t-2xl bg-slate-100 dark:bg-slate-800/50 mt-2`} />
        </div>
      );
    }

    const isCurrent = entry.isCurrentUser;

    return (
      <div className={`flex-1 flex flex-col items-center justify-end ${place === 1 ? "order-2 z-10" : place === 2 ? "order-1" : "order-3"}`}>
        {/* Floating Avatar & Accents */}
        <div className="relative flex flex-col items-center mb-2">
          {place === 1 && (
            <Crown className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-400 fill-yellow-400 -mb-1 animate-bounce" />
          )}

          <div
            className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-3xl sm:text-4xl shadow-md border-4 transition-transform hover:scale-105 ${
              isCurrent
                ? "border-emerald-400 ring-4 ring-emerald-200 dark:ring-emerald-800 bg-emerald-50 dark:bg-emerald-950/40"
                : borderGlow
            }`}
          >
            <span>{entry.avatar}</span>

            {/* Sticker badge if present */}
            {entry.sticker && (
              <span className="absolute -bottom-1 -right-1 text-base sm:text-lg bg-white dark:bg-slate-800 rounded-full shadow p-0.5">
                {entry.sticker}
              </span>
            )}

            {/* Medal badge */}
            <span className="absolute -top-2 -left-2 text-xl sm:text-2xl drop-shadow">
              {medalEmoji}
            </span>
          </div>

          {/* Nickname & Label */}
          <div className="mt-2 text-center max-w-[120px] sm:max-w-[150px]">
            <div className="flex items-center justify-center gap-1">
              <span className="font-black text-xs sm:text-sm text-slate-800 dark:text-white truncate">
                {entry.nickname}
              </span>
              {renderTrend(entry)}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1 mt-0.5">
              {isCurrent ? (
                <span className="px-1.5 py-0.2 bg-emerald-500 text-white text-[10px] font-extrabold rounded-full">
                  Kamu
                </span>
              ) : entry.isDemo ? (
                <span className="px-1.5 py-0.2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-semibold rounded-full">
                  Contoh
                </span>
              ) : null}
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
                Lv.{entry.level}
              </span>
            </div>
          </div>
        </div>

        {/* Podium Pedestal */}
        <div
          className={`w-full ${pedestalHeight} ${pedestalBg} rounded-t-3xl border-t-4 flex flex-col items-center justify-start pt-3 sm:pt-4 px-2 shadow-inner transition-all`}
        >
          <span className="text-2xl sm:text-3xl font-black text-slate-800/80 dark:text-white/80">
            {place}
          </span>
          <div className="mt-1 px-2.5 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-sm border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">
              {entry.xp} XP
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-sky-50/50 via-white to-slate-50/50 dark:from-slate-900/50 dark:via-slate-900 dark:to-slate-950/50 rounded-3xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
      <div className="text-center mb-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white">
          Podium 3 Teratas 🏆
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Paling aktif mengumpulkan poin kebaikan & XP minggu ini
        </p>
      </div>

      <div className="flex items-end justify-center gap-2 sm:gap-4 max-w-xl mx-auto pt-6">
        {/* 2nd Place (Left) */}
        {renderPlayerCard(
          rank2,
          2,
          "h-28 sm:h-36",
          "bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 border-slate-300 dark:border-slate-600",
          "🥈",
          "border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800"
        )}

        {/* 1st Place (Center - Taller) */}
        {renderPlayerCard(
          rank1,
          1,
          "h-36 sm:h-48",
          "bg-gradient-to-b from-amber-200 via-yellow-200 to-amber-300 dark:from-amber-900/60 dark:via-yellow-900/50 dark:to-amber-950/70 border-amber-300 dark:border-yellow-600",
          "🥇",
          "border-yellow-400 dark:border-yellow-500 bg-yellow-50 dark:bg-yellow-950/40"
        )}

        {/* 3rd Place (Right) */}
        {renderPlayerCard(
          rank3,
          3,
          "h-24 sm:h-30",
          "bg-gradient-to-b from-amber-100 to-amber-200 dark:from-amber-950/50 dark:to-slate-800 border-amber-300/80 dark:border-amber-800",
          "🥉",
          "border-amber-400 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30"
        )}
      </div>
    </div>
  );
};
