import React from "react";
import { TrendingUp, TrendingDown, Minus, User, Award } from "lucide-react";
import type { LeaderboardEntry } from "../../data/peringkat/types.ts";
import { getSurroundingEntries } from "../../services/leaderboard/index.ts";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentUserRank: number;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  entries,
  currentUserRank,
}) => {
  // Entries 4 to 10
  const top4to10 = entries.filter((e) => e.rank >= 4 && e.rank <= 10);
  const surrounding = getSurroundingEntries(entries, currentUserRank);
  const isUserInTop10 = currentUserRank <= 10;

  const renderTrend = (entry: LeaderboardEntry) => {
    if (entry.trend === "naik") {
      return (
        <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          <TrendingUp className="w-3.5 h-3.5" />
          {entry.trendDelta ? `+${entry.trendDelta}` : ""}
        </span>
      );
    }
    if (entry.trend === "turun") {
      return (
        <span className="inline-flex items-center gap-0.5 text-xs font-bold text-rose-500 dark:text-rose-400">
          <TrendingDown className="w-3.5 h-3.5" />
          {entry.trendDelta ? `-${entry.trendDelta}` : ""}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center text-xs text-slate-400">
        <Minus className="w-3.5 h-3.5" />
      </span>
    );
  };

  const renderRow = (entry: LeaderboardEntry, isSpecialSlice = false) => {
    const isCurrent = entry.isCurrentUser;

    return (
      <tr
        key={entry.id}
        className={`transition-colors border-b border-slate-100 dark:border-slate-800 ${
          isCurrent
            ? "bg-emerald-50/80 dark:bg-emerald-950/40 font-bold border-emerald-200 dark:border-emerald-800"
            : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
        }`}
      >
        {/* Rank */}
        <td className="py-3.5 px-3 sm:px-4 text-center">
          <span
            className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs sm:text-sm font-black ${
              isCurrent
                ? "bg-emerald-500 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            }`}
          >
            {entry.rank}
          </span>
        </td>

        {/* Player Avatar & Name */}
        <td className="py-3.5 px-3 sm:px-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl shrink-0 border border-slate-200 dark:border-slate-700">
              <span>{entry.avatar}</span>
              {entry.sticker && (
                <span className="absolute -bottom-1 -right-1 text-xs bg-white dark:bg-slate-800 rounded-full shadow p-0.2">
                  {entry.sticker}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span
                  className={`text-sm sm:text-base font-extrabold truncate ${
                    isCurrent
                      ? "text-emerald-900 dark:text-emerald-100"
                      : "text-slate-800 dark:text-white"
                  }`}
                >
                  {entry.nickname}
                </span>

                {isCurrent && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider">
                    Kamu
                  </span>
                )}

                {entry.isDemo && (
                  <span className="px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-semibold border border-slate-200 dark:border-slate-700">
                    Contoh
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {entry.title}
              </div>
            </div>
          </div>
        </td>

        {/* Level */}
        <td className="py-3.5 px-3 sm:px-4 text-center hidden sm:table-cell">
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300">
            <Award className="w-3 h-3" />
            Lv.{entry.level}
          </span>
        </td>

        {/* XP */}
        <td className="py-3.5 px-3 sm:px-4 text-right">
          <span
            className={`text-sm sm:text-base font-black ${
              isCurrent
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-slate-800 dark:text-white"
            }`}
          >
            {entry.xp.toLocaleString("id-ID")}
          </span>
          <span className="text-xs font-semibold text-slate-400 ml-1">XP</span>
        </td>

        {/* Trend */}
        <td className="py-3.5 px-3 sm:px-4 text-center">{renderTrend(entry)}</td>
      </tr>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white">
            Peringkat 4 - 10
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Terus belajar dan kumpulkan XP untuk masuk ke 3 besar!
          </p>
        </div>

        {isUserInTop10 && (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            🎉 Kamu ada di 10 besar!
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" aria-label="Tabel Peringkat 4 sampai 10">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
              <th scope="col" className="py-3 px-3 sm:px-4 text-center w-14">
                Pos
              </th>
              <th scope="col" className="py-3 px-3 sm:px-4">
                Pemain
              </th>
              <th scope="col" className="py-3 px-3 sm:px-4 text-center hidden sm:table-cell">
                Level
              </th>
              <th scope="col" className="py-3 px-3 sm:px-4 text-right">
                Skor XP
              </th>
              <th scope="col" className="py-3 px-3 sm:px-4 text-center w-16">
                Tren
              </th>
            </tr>
          </thead>
          <tbody>
            {top4to10.map((entry) => renderRow(entry))}

            {/* If user is beyond rank 10, render separator and surrounding slice */}
            {!isUserInTop10 && surrounding.length > 0 && (
              <>
                <tr>
                  <td
                    colSpan={5}
                    className="py-3 text-center bg-slate-50/70 dark:bg-slate-800/40 text-slate-400 font-bold tracking-widest text-sm"
                  >
                    • • • Sekitarmu • • •
                  </td>
                </tr>
                {surrounding.map((entry) => renderRow(entry, true))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
