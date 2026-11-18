import React, { useState, useEffect } from "react";
import { Trophy, Clock, ShieldCheck, Flame, Star } from "lucide-react";
import { Card } from "../ui/Card";
import { EcobotMascot } from "../ecobot/EcobotMascot";
import type { LeaderboardPeriod, LigaTier } from "../../data/peringkat/types.ts";
import { LIGA_TIERS } from "../../data/peringkat/liga.ts";

interface PeringkatHeroProps {
  nickname: string;
  period: LeaderboardPeriod;
  currentRank: number;
  totalParticipants: number;
  xpAmount: number;
  currentLigaTier: LigaTier | null;
  nextResetDate: string;
  onOpenLigaTab?: () => void;
}

export const PeringkatHero: React.FC<PeringkatHeroProps> = ({
  nickname,
  period,
  currentRank,
  totalParticipants,
  xpAmount,
  currentLigaTier,
  nextResetDate,
  onOpenLigaTab,
}) => {
  // Countdown to next reset
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const updateTime = () => {
      const target = new Date(nextResetDate).getTime();
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ days, hours, minutes });
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, [nextResetDate]);

  const activeLigaDef = currentLigaTier ? LIGA_TIERS[currentLigaTier] : null;

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-500 text-white border-0 shadow-lg p-6 sm:p-8">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Section: Greeting & Info */}
        <div className="space-y-4 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wide">
            <Trophy className="w-3.5 h-3.5 text-yellow-300" />
            <span>
              {period === "mingguan"
                ? "Papan Peringkat Mingguan"
                : "Peringkat Sepanjang Masa"}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Halo, {nickname}! 🌟
            </h1>
            <p className="mt-2 text-sm sm:text-base text-emerald-50/90 leading-relaxed">
              Kumpulkan XP dari memilah sampah di game, membaca pustaka, kuis, dan aksi nyata untuk memanjat peringkat sekaligus menjaga bumi kita!
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            {/* Rank badge */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/25">
              <span className="text-xl font-black text-yellow-300">
                #{currentRank}
              </span>
              <span className="text-xs font-semibold text-white/90">
                dari {totalParticipants} sahabat
              </span>
            </div>

            {/* XP Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/25">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span className="text-sm font-bold">{xpAmount} XP</span>
              <span className="text-xs text-white/80">
                {period === "mingguan" ? "minggu ini" : "total"}
              </span>
            </div>

            {/* Liga Tier Badge */}
            {period === "mingguan" && (
              <button
                onClick={onOpenLigaTab}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-600/40 hover:bg-emerald-600/60 backdrop-blur-md border border-white/30 transition-all cursor-pointer"
                title="Buka detail Liga Mingguan"
              >
                <span className="text-base">
                  {activeLigaDef ? activeLigaDef.ikon : "🌱"}
                </span>
                <span className="text-xs font-bold text-white group-hover:underline">
                  {activeLigaDef ? activeLigaDef.nama : "Belum Masuk Liga"}
                </span>
              </button>
            )}

            {/* Countdown Badge */}
            {period === "mingguan" && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 text-xs font-medium text-white/90">
                <Clock className="w-3.5 h-3.5 text-emerald-200" />
                <span>
                  Reset: {timeLeft.days}h {timeLeft.hours}j {timeLeft.minutes}m
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Mascot */}
        <div className="relative shrink-0 flex items-center justify-center">
          <div className="w-32 h-32 sm:w-40 sm:h-40 relative flex items-center justify-center drop-shadow-2xl">
            <EcobotMascot
              size="hero"
              className="w-full h-full object-contain filter drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
