import React from "react";
import { Lock, Sparkles, Coins, CheckCircle2, Gift } from "lucide-react";
import { CHEST_REWARDS } from "../../data/missions";

interface ChestCardProps {
  type: "harian" | "mingguan";
  isUnlocked: boolean; // All 3 missions in tab are claimed
  isClaimed: boolean;
  onClaimChest: (type: "harian" | "mingguan") => void;
  claimedCount: number;
  totalMissions: number;
}

export const ChestCard: React.FC<ChestCardProps> = ({
  type,
  isUnlocked,
  isClaimed,
  onClaimChest,
  claimedCount,
  totalMissions,
}) => {
  const config = CHEST_REWARDS[type];

  return (
    <div
      className={`rounded-[26px] p-5 sm:p-6 border transition-all duration-300 relative overflow-hidden ${
        isClaimed
          ? "bg-slate-50 border-slate-200/80 opacity-80"
          : isUnlocked
          ? "bg-gradient-to-br from-amber-50 via-white to-orange-50 border-amber-300 shadow-[0_6px_24px_rgba(245,158,11,0.18)] ring-2 ring-amber-400/30"
          : "bg-[#F8FAFC] border-slate-200/80 border-dashed"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Chest Visual & Info */}
        <div className="flex items-start gap-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-transform duration-300 ${
              isClaimed
                ? "bg-slate-200/60 border-slate-300 text-slate-500"
                : isUnlocked
                ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md animate-bounce"
                : "bg-slate-100 border-slate-200 text-slate-400"
            }`}
          >
            {isClaimed ? (
              <CheckCircle2 className="w-7 h-7 text-emerald-600" />
            ) : isUnlocked ? (
              <Gift className="w-7 h-7" />
            ) : (
              <Lock className="w-6 h-6 text-slate-400" />
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10.5px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                BONUS SPESIAL
              </span>
              <span className="text-[11px] font-bold text-slate-500">
                Progres: {claimedCount}/{totalMissions} misi diklaim
              </span>
            </div>

            <h3 className="text-[16px] sm:text-[17px] font-black text-slate-900">
              {config.title}
            </h3>
            <p className="text-[12.5px] text-slate-600 max-w-md">
              {isClaimed
                ? `Peti bonus ${type} ini sudah kamu buka. Sampai jumpa di reset berikutnya!`
                : isUnlocked
                ? `Hebat! Semua misi ${type} selesai diklaim. Peti siap kamu buka sekarang!`
                : `Klaim semua ${totalMissions} misi ${type} untuk membuka peti harta karun ini.`}
            </p>
          </div>
        </div>

        {/* Right: Reward Chip & Claim Button */}
        <div className="flex flex-col sm:items-end gap-2.5 shrink-0 pt-2 sm:pt-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-black bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>+{config.xp} XP</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-black bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full">
              <Coins className="w-3.5 h-3.5 text-amber-600" />
              <span>+{config.poin} Poin</span>
            </span>
          </div>

          {isClaimed ? (
            <span className="h-10 px-4 rounded-full bg-slate-200 text-slate-500 font-bold text-[12px] inline-flex items-center gap-1.5 self-start sm:self-end">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sudah Dibuka</span>
            </span>
          ) : isUnlocked ? (
            <button
              type="button"
              onClick={() => onClaimChest(type)}
              className="h-11 px-5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black text-[13px] flex items-center gap-2 shadow-lg shadow-orange-500/25 transition transform hover:scale-105 active:scale-95 cursor-pointer self-start sm:self-end"
            >
              <Gift className="w-4 h-4" />
              <span>Buka Peti Sekarang!</span>
            </button>
          ) : (
            <span className="h-10 px-4 rounded-full bg-slate-100 text-slate-400 font-bold text-[12px] inline-flex items-center gap-1.5 self-start sm:self-end border border-slate-200/80">
              <Lock className="w-3.5 h-3.5" />
              <span>Terkunci</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
