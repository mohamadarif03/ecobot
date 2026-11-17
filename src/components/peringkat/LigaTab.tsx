import React, { useState } from "react";
import {
  Award,
  CheckCircle2,
  Gift,
  Lock,
  Sparkles,
  Calendar,
  History,
  Star,
  Coins,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { ProgressBar } from "../ui/ProgressBar";
import { LIGA_TIER_LIST } from "../../data/peringkat/liga.ts";
import type { LigaStatus, LigaTier } from "../../data/peringkat/types.ts";
import type { LigaHistoryItem } from "../../types/player.ts";

interface LigaTabProps {
  status: LigaStatus;
  history: LigaHistoryItem[];
  onClaim: (tier: LigaTier) => void;
}

export const LigaTab: React.FC<LigaTabProps> = ({ status, history, onClaim }) => {
  const [claimingTier, setClaimingTier] = useState<LigaTier | null>(null);

  const handleClaim = (tier: LigaTier) => {
    setClaimingTier(tier);
    onClaim(tier);
    setTimeout(() => {
      setClaimingTier(null);
    }, 600);
  };

  return (
    <div className="space-y-8">
      {/* 1. Explainer Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 border-2 border-emerald-200 dark:border-slate-700 rounded-3xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <Award className="w-6 h-6" />
          </div>

          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-white">
              Tantangan Pribadi Liga Mingguan 🌱
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Liga ini <strong>bukan perlombaan saling mengalahkan</strong>, melainkan target pribadi untuk mengasah kebiasaan baik setiap minggu. Setiap tingkat yang berhasil kamu capai akan memberikan bonus poin toko dan XP ekstra!
            </p>
          </div>
        </div>
      </div>

      {/* 2. Step Milestone Ladder */}
      <Card className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-extrabold text-base text-slate-800 dark:text-white">
              Kemajuan Minggumu
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kumpulkan hingga 500 XP setiap minggu untuk membuka Liga Emas
            </p>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {status.weeklyXp}
            </span>
            <span className="text-xs font-bold text-slate-400 ml-1">/ 500 XP</span>
          </div>
        </div>

        {/* Global Progress Bar to Emas (500 XP) */}
        <div className="space-y-3">
          <ProgressBar
            progress={Math.min(100, (status.weeklyXp / 500) * 100)}
            color="emerald"
            height="h-3"
          />

          {/* Stepper Markers */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 px-1">
            <span className="text-slate-400">0 XP</span>
            <span className={status.weeklyXp >= 100 ? "text-amber-600 font-black" : ""}>
              100 XP (🥉 Perunggu)
            </span>
            <span className={status.weeklyXp >= 250 ? "text-slate-700 dark:text-slate-200 font-black" : ""}>
              250 XP (🥈 Perak)
            </span>
            <span className={status.weeklyXp >= 500 ? "text-yellow-600 font-black" : ""}>
              500 XP (🥇 Emas)
            </span>
          </div>
        </div>
      </Card>

      {/* 3. Three Tier Milestone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {LIGA_TIER_LIST.map((tier) => {
          const isReached = status.weeklyXp >= tier.minXp;
          const isClaimed = status.claimed[tier.id];
          const canClaim = status.canClaim[tier.id];

          return (
            <Card
              key={tier.id}
              className={`relative overflow-hidden p-5 flex flex-col justify-between border-2 rounded-3xl transition-all ${
                isClaimed
                  ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20"
                  : isReached
                  ? "border-yellow-300 dark:border-yellow-700 bg-yellow-50/40 dark:bg-yellow-950/20 shadow-md scale-[1.02]"
                  : "border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900"
              }`}
            >
              <div>
                {/* Header: Icon & Tier Name */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{tier.ikon}</span>
                    <div>
                      <h4 className="font-extrabold text-base text-slate-800 dark:text-white">
                        {tier.nama}
                      </h4>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Target {tier.minXp} XP
                      </span>
                    </div>
                  </div>

                  {isClaimed ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="w-3 h-3" /> Diklaim
                    </span>
                  ) : isReached ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 animate-pulse">
                      <Sparkles className="w-3 h-3" /> Siap!
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                      <Lock className="w-3 h-3" /> Terkunci
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {tier.deskripsi}
                </p>

                {/* Hadiah Section */}
                <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800 mb-4 space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Hadiah Pencapaian
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs font-black text-amber-600 dark:text-amber-400">
                      <Coins className="w-3.5 h-3.5" />
                      +{tier.hadiahPoin} Poin Toko
                    </div>
                    <div className="flex items-center gap-1 text-xs font-black text-emerald-600 dark:text-emerald-400">
                      <Star className="w-3.5 h-3.5 fill-emerald-600 dark:fill-emerald-400" />
                      +{tier.hadiahXp} XP
                    </div>
                  </div>

                  {tier.id === "emas" && (
                    <div className="pt-1 text-[11px] font-bold text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                      <span>🌟</span>
                      <span>Badge Spesial 'Bintang Mingguan'</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div>
                {isClaimed ? (
                  <Button
                    variant="outline"
                    disabled
                    className="w-full text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
                    Hadiah Telah Diklaim
                  </Button>
                ) : canClaim ? (
                  <Button
                    onClick={() => handleClaim(tier.id)}
                    disabled={claimingTier === tier.id}
                    className="w-full text-xs font-black bg-emerald-500 hover:bg-emerald-600 text-white shadow-md animate-bounce"
                  >
                    <Gift className="w-4 h-4 mr-1.5" />
                    {claimingTier === tier.id ? "Mengklaim..." : "Klaim Hadiah!"}
                  </Button>
                ) : (
                  <div className="text-center py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Kurang {Math.max(0, tier.minXp - status.weeklyXp)} XP lagi
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* 4. History (8 Weeks) */}
      <Card className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-extrabold text-base text-slate-800 dark:text-white">
              Riwayat Liga Mingguan
            </h4>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Maks. 8 minggu terakhir
          </span>
        </div>

        {history && history.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {history.map((item, idx) => {
              const tierDef = item.tier ? LIGA_TIER_LIST.find((t) => t.id === item.tier) : null;

              return (
                <div
                  key={`${item.weekKey}-${idx}`}
                  className="py-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 px-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-lg">
                      {tierDef ? tierDef.ikon : "🌱"}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-800 dark:text-white">
                        {tierDef ? tierDef.nama : "Belum Masuk Liga"}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Minggu {item.weekKey}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-black text-slate-800 dark:text-white">
                      {item.weeklyXp} XP
                    </span>
                    <div className="text-[11px] text-slate-400">Total terkumpul</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-400 text-xs sm:text-sm">
            <div className="text-3xl mb-2">📜</div>
            Belum ada riwayat liga sebelumnya. Kumpulkan XP minggu ini untuk mencatatkan prestasimu!
          </div>
        )}
      </Card>
    </div>
  );
};
