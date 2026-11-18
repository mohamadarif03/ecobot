import React from "react";
import { Link } from "react-router-dom";
import {
  Gamepad2,
  BookOpen,
  HelpCircle,
  Leaf,
  Flame,
  CheckCircle2,
  Sparkles,
  Coins,
  ArrowRight,
  Gift,
} from "lucide-react";
import type { MissionWithStatus } from "../../store/playerStore";

interface MissionCardProps {
  mission: MissionWithStatus;
  onClaim: (missionId: string) => void;
  isClaiming?: boolean;
}

export const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  onClaim,
  isClaiming = false,
}) => {
  const percent = Math.min(100, Math.round((mission.current / mission.target) * 100));

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case "game":
        return {
          icon: <Gamepad2 className="w-5 h-5 text-emerald-600" />,
          bg: "bg-emerald-50 border-emerald-100",
          badgeBg: "bg-emerald-100 text-emerald-800",
          label: "Game 3D",
        };
      case "baca":
        return {
          icon: <BookOpen className="w-5 h-5 text-emerald-600" />,
          bg: "bg-emerald-50 border-emerald-100",
          badgeBg: "bg-emerald-100 text-emerald-800",
          label: "Pustaka",
        };
      case "kuis":
        return {
          icon: <HelpCircle className="w-5 h-5 text-amber-600" />,
          bg: "bg-amber-50 border-amber-100",
          badgeBg: "bg-amber-100 text-amber-800",
          label: "Kuis",
        };
      case "aksi-nyata":
        return {
          icon: <Leaf className="w-5 h-5 text-lime-600" />,
          bg: "bg-lime-50 border-lime-100",
          badgeBg: "bg-lime-100 text-lime-800",
          label: "Aksi Nyata",
        };
      case "streak":
      default:
        return {
          icon: <Flame className="w-5 h-5 text-orange-500" />,
          bg: "bg-orange-50 border-orange-100",
          badgeBg: "bg-orange-100 text-orange-800",
          label: "Kebiasaan",
        };
    }
  };

  const cat = getCategoryConfig(mission.kategori);

  return (
    <article
      className={`rounded-[22px] border p-4 sm:p-5 transition-all duration-200 relative ${
        mission.status === "diklaim"
          ? "bg-slate-50/80 border-slate-200/70 opacity-75"
          : mission.status === "siap"
          ? "bg-gradient-to-br from-white via-emerald-50/30 to-sky-50/40 border-emerald-300 shadow-[0_4px_16px_rgba(16,185,129,0.12)] ring-2 ring-emerald-400/20"
          : "bg-white border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-emerald-200"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        {/* Left: Icon & Description */}
        <div className="flex items-start gap-3.5 min-w-0">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${cat.bg} shadow-2xs`}
          >
            {cat.icon}
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${cat.badgeBg}`}
              >
                {cat.label}
              </span>

              {/* Status Badge */}
              {mission.status === "diklaim" && (
                <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Selesai & Diklaim</span>
                </span>
              )}
              {mission.status === "siap" && (
                <span className="inline-flex items-center gap-1 text-[10.5px] font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full animate-pulse">
                  <Gift className="w-3 h-3 text-emerald-600" />
                  <span>Siap Diklaim!</span>
                </span>
              )}
            </div>

            <h3 className="text-[15px] sm:text-[16px] font-black text-slate-900 leading-snug">
              {mission.judul}
            </h3>
            <p className="text-[12.5px] text-slate-500 leading-relaxed line-clamp-2">
              {mission.deskripsi}
            </p>
          </div>
        </div>

        {/* Right Action Button */}
        <div className="flex items-center justify-end sm:shrink-0 pt-1 sm:pt-0">
          {mission.status === "diklaim" ? (
            <div className="h-11 px-4 rounded-full bg-slate-100 text-slate-400 font-bold text-[12.5px] flex items-center gap-1.5 cursor-default select-none border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Sudah Diklaim</span>
            </div>
          ) : mission.status === "siap" ? (
            <button
              type="button"
              disabled={isClaiming}
              onClick={() => onClaim(mission.id)}
              aria-label={`Klaim hadiah misi ${mission.judul}: ${mission.xp} XP dan ${mission.poin} Poin`}
              className="h-11 px-5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-[13px] flex items-center gap-2 shadow-[0_4px_14px_rgba(16,185,129,0.3)] transition transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Gift className="w-4 h-4 animate-bounce" />
              <span>Klaim Hadiah!</span>
            </button>
          ) : (
            <Link
              to={mission.tautan}
              className="h-11 px-4.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[12.5px] flex items-center gap-1.5 transition border border-emerald-200/80 hover:border-emerald-300"
            >
              <span>Kerjakan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Progress Bar & Reward Chips */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        {/* Progress bar container */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div
            role="progressbar"
            aria-label={`Progres ${mission.judul}`}
            aria-valuenow={mission.current}
            aria-valuemin={0}
            aria-valuemax={mission.target}
            className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden"
          >
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                mission.status === "diklaim"
                  ? "bg-slate-400"
                  : mission.status === "siap"
                  ? "bg-gradient-to-r from-emerald-400 to-teal-500"
                  : "bg-emerald-600"
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>

          <span className="text-[12px] font-bold text-slate-500 shrink-0 font-mono">
            {mission.current}/{mission.target}
          </span>
        </div>

        {/* Reward Chips */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>+{mission.xp} XP</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-amber-50 text-amber-800 border border-amber-100 px-2.5 py-1 rounded-full">
            <Coins className="w-3 h-3 text-amber-600" />
            <span>+{mission.poin} Poin</span>
          </span>
        </div>
      </div>
    </article>
  );
};
