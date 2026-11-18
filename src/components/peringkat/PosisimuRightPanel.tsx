import React from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  ArrowUpCircle,
  Sparkles,
  BookOpen,
  HelpCircle,
  Gamepad2,
  Heart,
  Eye,
  EyeOff,
  ShieldAlert,
  ChevronRight,
} from "lucide-react";
import { Card } from "../ui/Card";
import { ProgressBar } from "../ui/ProgressBar";
import type { LeaderboardEntry, LeaderboardPeriod, LigaStatus } from "../../data/peringkat/types.ts";
import { LIGA_TIERS } from "../../data/peringkat/liga.ts";

interface PosisimuRightPanelProps {
  currentUserEntry: LeaderboardEntry;
  entries: LeaderboardEntry[];
  period: LeaderboardPeriod;
  ligaStatus: LigaStatus;
  showOnBoard: boolean;
  onToggleShowOnBoard: (value: boolean) => void;
  onOpenLigaTab?: () => void;
}

export const PosisimuRightPanel: React.FC<PosisimuRightPanelProps> = ({
  currentUserEntry,
  entries,
  period,
  ligaStatus,
  showOnBoard,
  onToggleShowOnBoard,
  onOpenLigaTab,
}) => {
  const currentRank = currentUserEntry.rank;
  const currentXp = currentUserEntry.xp;

  // Calculate distance to next rank player
  const nextHigherEntry = entries.find((e) => e.rank === currentRank - 1);
  const gapToNext = nextHigherEntry ? nextHigherEntry.xp - currentXp + 1 : 0;

  // Calculate distance to top 3 (entry with rank 3)
  const rank3Entry = entries.find((e) => e.rank === 3);
  const gapToTop3 =
    currentRank > 3 && rank3Entry ? Math.max(1, rank3Entry.xp - currentXp + 1) : 0;

  const currentLigaDef = ligaStatus.currentTier ? LIGA_TIERS[ligaStatus.currentTier] : null;
  const nextLigaDef = ligaStatus.nextTier ? LIGA_TIERS[ligaStatus.nextTier] : null;

  return (
    <div className="space-y-6">
      {/* 1. Posisimu Card */}
      <Card className="p-5 border-2 border-emerald-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-base text-slate-800 dark:text-white">
              Posisimu Sekarang
            </h3>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            {period === "mingguan" ? "Minggu Ini" : "Sepanjang Masa"}
          </span>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/10 to-transparent border border-emerald-100 dark:border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex flex-col items-center justify-center font-black shadow-md">
            <span className="text-xs uppercase tracking-wider text-emerald-100">Pos</span>
            <span className="text-xl leading-none">#{currentRank}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Skor XP Kamu
            </div>
            <div className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-1.5">
              <span>{currentXp.toLocaleString("id-ID")}</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">XP</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {currentUserEntry.nickname} • Lv.{currentUserEntry.level}
            </div>
          </div>
        </div>

        {/* Dynamic Gap Tips */}
        <div className="mt-4 space-y-2.5">
          {currentRank === 1 ? (
            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-medium">
              <span className="text-base">👑</span>
              <div>
                <strong>Luar biasa!</strong> Kamu berada di posisi puncak peringkat. Terus pertahankan semangatmu!
              </div>
            </div>
          ) : nextHigherEntry ? (
            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50 dark:bg-sky-950/30 border border-emerald-200 dark:border-sky-800 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
              <ArrowUpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                Butuh <strong>+{gapToNext} XP</strong> lagi untuk menyalip{" "}
                <span className="font-bold underline">{nextHigherEntry.nickname}</span> (#{currentRank - 1})!
              </div>
            </div>
          ) : null}

          {currentRank > 3 && gapToTop3 > 0 && (
            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                Hanya butuh <strong>+{gapToTop3} XP</strong> lagi untuk masuk ke <strong>Podium 3 Teratas</strong>!
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* 2. Mini Liga Progress Card */}
      <Card className="p-5 border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-3xl">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
            <span>{currentLigaDef ? currentLigaDef.ikon : "🌱"}</span>
            <span>{currentLigaDef ? currentLigaDef.nama : "Liga Mingguan"}</span>
          </h4>
          <button
            onClick={onOpenLigaTab}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-0.5"
          >
            Detail <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-semibold">
            <span>Target Berikutnya</span>
            <span>
              {nextLigaDef ? `${ligaStatus.weeklyXp} / ${nextLigaDef.minXp} XP` : "Liga Emas Maksimal! 🎉"}
            </span>
          </div>

          <ProgressBar
            progress={nextLigaDef ? (ligaStatus.weeklyXp / nextLigaDef.minXp) * 100 : 100}
            color="emerald"
            height="h-2.5"
          />

          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            {nextLigaDef
              ? `Kumpulkan ${ligaStatus.xpToNextTier} XP lagi untuk naik ke ${nextLigaDef.nama}!`
              : "Hebat! Kamu telah mencapai tingkat tertinggi liga minggu ini!"}
          </p>
        </div>
      </Card>

      {/* 3. Cara Cepat Dapat XP */}
      <Card className="p-5 border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-3xl">
        <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Cara Cepat Dapat XP</span>
        </h4>

        <div className="space-y-2.5">
          <Link
            to="/kuis"
            className="group flex items-center justify-between p-2.5 rounded-2xl hover:bg-emerald-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-purple-600 transition-colors">
                  Kuis Harian
                </div>
                <div className="text-[11px] text-slate-400">Jawab 5 soal seru</div>
              </div>
            </div>
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
              +50 XP
            </span>
          </Link>

          <Link
            to="/main-game"
            className="group flex items-center justify-between p-2.5 rounded-2xl hover:bg-emerald-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 flex items-center justify-center">
                <Gamepad2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 transition-colors">
                  Main Game Pilah
                </div>
                <div className="text-[11px] text-slate-400">Bantu Ecobot di taman</div>
              </div>
            </div>
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
              +75 XP
            </span>
          </Link>

          <Link
            to="/pustaka"
            className="group flex items-center justify-between p-2.5 rounded-2xl hover:bg-emerald-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-sky-950/50 dark:text-emerald-400 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 transition-colors">
                  Baca Pustaka
                </div>
                <div className="text-[11px] text-slate-400">Geser kartu edukasi</div>
              </div>
            </div>
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
              +30 XP
            </span>
          </Link>

          <Link
            to="/aksi-nyata"
            className="group flex items-center justify-between p-2.5 rounded-2xl hover:bg-amber-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-amber-600 transition-colors">
                  Aksi Nyata
                </div>
                <div className="text-[11px] text-slate-400">Centang kebiasaan baik</div>
              </div>
            </div>
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
              +50 XP
            </span>
          </Link>
        </div>
      </Card>

      {/* 4. Child Privacy Controls Card */}
      <Card className="p-5 border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 shadow-sm rounded-3xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {showOnBoard ? (
              <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <EyeOff className="w-4 h-4 text-slate-400" />
            )}
            <h4 className="font-bold text-sm text-slate-800 dark:text-white">
              Privasi Anak
            </h4>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showOnBoard}
              onChange={(e) => onToggleShowOnBoard(e.target.checked)}
              className="sr-only peer"
              aria-label="Tampilkan namaku di papan peringkat"
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {showOnBoard
            ? "Namamu dan avatar tampil di papan peringkat untuk menyemangati teman-teman."
            : "Privasi aktif: Namamu disamarkan sebagai 'Pemain Rahasia' 🕵️ bagi pengguna lain."}
        </p>

        <div className="mt-3 pt-3 border-t border-slate-200/70 dark:border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
          <span>Ecobot tidak pernah meminta nama lengkap atau alamat sekolah anak.</span>
        </div>
      </Card>
    </div>
  );
};
