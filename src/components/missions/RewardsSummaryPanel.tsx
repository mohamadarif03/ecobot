import React from "react";
import {
  Coins,
  Flame,
  Calendar,
  Check,
  Sparkles,
  Gift,
  History,
  CheckCircle2,
} from "lucide-react";
import { calculateLevel } from "../../data/levels";
import type { PlayerState } from "../../types/player";

interface RewardsSummaryPanelProps {
  state: PlayerState;
  unclaimedXp: number;
  unclaimedPoints: number;
  totalClaimableCount: number;
  onClaimAll: () => void;
  isClaimingAll?: boolean;
}

export const RewardsSummaryPanel: React.FC<RewardsSummaryPanelProps> = ({
  state,
  unclaimedXp,
  unclaimedPoints,
  totalClaimableCount,
  onClaimAll,
  isClaimingAll = false,
}) => {
  const levelInfo = calculateLevel(state.xp);
  const xpCurrentLevel = state.xp - levelInfo.minXp;
  const xpNeededLevel = levelInfo.nextXp - levelInfo.minXp;
  const levelProgressPercent =
    levelInfo.nextXp === levelInfo.minXp
      ? 100
      : Math.min(100, Math.round((xpCurrentLevel / xpNeededLevel) * 100));

  // Compute 7-day indicators
  const past7Days = (() => {
    const list: { dayName: string; dateStr: string; isActive: boolean }[] = [];
    const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      const isActive =
        state.activeDays.includes(dateStr) || state.lastActiveDate === dateStr;
      list.push({
        dayName: dayNames[d.getDay()],
        dateStr,
        isActive,
      });
    }
    return list;
  })();

  const recentClaims = (state.claimHistory || []).slice(0, 5);

  return (
    <div className="bg-white rounded-[26px] p-5 sm:p-6 shadow-[0_2px_12px_rgba(14,165,233,0.06)] border border-sky-100/90 space-y-4">
      {/* Header Profile */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-2xl shadow-sm border border-sky-300/40">
          {state.avatar || "🤖"}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[16px] font-black text-slate-900 truncate">
            {state.nickname || "Pahlawan Cilik"}
          </h3>
          <p className="text-[12px] font-bold text-sky-700 leading-tight">
            Level {levelInfo.level} · {levelInfo.title}
          </p>
        </div>
      </div>

      {/* Level & XP Progress Bar */}
      <div className="p-3.5 rounded-2xl bg-[#F0F8FF] border border-sky-100/80">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
          <span>XP Level {levelInfo.level}</span>
          <span className="text-sky-800 font-black">
            {state.xp} / {levelInfo.nextXp} XP
          </span>
        </div>
        <div className="w-full h-3 bg-white rounded-full overflow-hidden p-0.5 border border-sky-100">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full transition-all duration-500"
            style={{ width: `${levelProgressPercent}%` }}
          />
        </div>
        <p className="text-[10.5px] text-slate-500 text-right mt-1 font-medium">
          {levelInfo.nextXp - state.xp} XP lagi menuju Level {levelInfo.level + 1}
        </p>
      </div>

      {/* Points & Streak Card */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Coins className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-amber-900">Total Poin</p>
            <p className="text-[16px] font-black text-amber-950">{state.points}</p>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-orange-50/80 border border-orange-200/80 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-orange-950">Streak Hari</p>
            <p className="text-[16px] font-black text-orange-950">{state.streak} Hari</p>
          </div>
        </div>
      </div>

      {/* 7-Day Indicators */}
      <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11.5px] font-bold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Keaktifan 7 Hari</span>
          </span>
          <span className="text-[10.5px] font-extrabold text-emerald-700">
            {past7Days.filter((d) => d.isActive).length}/7 Hari Aktif
          </span>
        </div>
        <div className="flex items-center justify-between gap-1">
          {past7Days.map((d, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <span className="text-[9.5px] font-semibold text-slate-400">
                {d.dayName}
              </span>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition ${
                  d.isActive
                    ? "bg-emerald-500 text-white shadow-2xs"
                    : "bg-slate-200 text-slate-400"
                }`}
                title={`${d.dateStr}: ${d.isActive ? "Aktif" : "Tidak aktif"}`}
              >
                {d.isActive ? <Check className="w-3 h-3 stroke-[3]" /> : "·"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ready to Claim Rewards Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/90 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-black text-emerald-900 flex items-center gap-1.5">
            <Gift className="w-4 h-4 text-emerald-600" />
            <span>Hadiah Siap Diklaim</span>
          </span>
          <span className="text-[11px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full shadow-2xs">
            {totalClaimableCount} Siap
          </span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <span className="inline-flex items-center gap-1 text-[11.5px] font-black bg-white text-sky-800 border border-sky-100 px-2.5 py-1 rounded-full shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>+{unclaimedXp} XP</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[11.5px] font-black bg-white text-amber-800 border border-amber-100 px-2.5 py-1 rounded-full shadow-2xs">
            <Coins className="w-3.5 h-3.5 text-amber-600" />
            <span>+{unclaimedPoints} Poin</span>
          </span>
        </div>
      </div>

      {/* Claim History List */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-[12.5px] font-black text-slate-900 flex items-center gap-1.5">
            <History className="w-3.5 h-3.5 text-slate-400" />
            <span>Riwayat Klaim Terakhir</span>
          </span>
          <span className="text-[11px] text-slate-400 font-medium">5 terakhir</span>
        </div>

        {recentClaims.length === 0 ? (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <p className="text-[12px] text-slate-400 font-medium">
              Belum ada hadiah yang diklaim. Selesaikan misimu dan ambil hadiahnya!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentClaims.map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between gap-2"
              >
                <div className="min-w-0 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <p className="text-[12px] font-bold text-slate-800 truncate">
                    {item.title}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 text-[10.5px] font-black">
                  <span className="text-sky-700">+{item.xp} XP</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-amber-700">+{item.poin} P</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA: Klaim Semua */}
      <button
        type="button"
        disabled={totalClaimableCount === 0 || isClaimingAll}
        onClick={onClaimAll}
        className={`w-full h-12 rounded-full font-black text-[13.5px] flex items-center justify-center gap-2 shadow-md transition transform ${
          totalClaimableCount > 0 && !isClaimingAll
            ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white shadow-emerald-500/25 hover:scale-[1.02] active:scale-98 cursor-pointer"
            : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/80 shadow-none"
        }`}
      >
        <Gift className="w-4 h-4" />
        <span>
          {totalClaimableCount > 0 ? "Klaim Semua Hadiah" : "Belum Ada yang Siap"}
        </span>
      </button>
    </div>
  );
};
