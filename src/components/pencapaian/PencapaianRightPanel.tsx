import React from "react";
import { Award, Lock, Sparkles, Check, ChevronRight, Target } from "lucide-react";
import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";
import { LEVELS, type LevelInfo } from "../../data/levels";

interface RecentBadgeItem {
  id: string;
  nama: string;
  ikon: string;
  unlockedAt?: string;
}

interface NearBadgeItem {
  id: string;
  nama: string;
  ikon: string;
  currentProgress?: number;
  target?: number;
  percent: number;
}

interface PencapaianRightPanelProps {
  nickname: string;
  avatar: string;
  xp: number;
  level: number;
  levelTitle: string;
  recentBadges: RecentBadgeItem[];
  nearBadges: NearBadgeItem[];
  onSelectBadge: (badgeId: string) => void;
}

export const PencapaianRightPanel: React.FC<PencapaianRightPanelProps> = ({
  nickname,
  avatar,
  xp,
  level,
  levelTitle,
  recentBadges,
  nearBadges,
  onSelectBadge,
}) => {
  // Current level progress
  const currentLevelConfig =
    LEVELS.find((l: LevelInfo) => l.level === level) || LEVELS[0];
  const nextLevelConfig = LEVELS.find((l: LevelInfo) => l.level === level + 1);

  const prevXpTarget = currentLevelConfig.minXp;
  const nextXpTarget = nextLevelConfig ? nextLevelConfig.minXp : currentLevelConfig.nextXp;
  const xpInCurrentLevel = xp - prevXpTarget;
  const xpNeeded = nextLevelConfig ? nextXpTarget - prevXpTarget : 1;
  const xpPercent = nextLevelConfig
    ? Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / xpNeeded) * 100)))
    : 100;

  return (
    <div className="space-y-6">
      {/* 1. Profile Summary Card */}
      <Card className="p-5 border-slate-100 shadow-sm bg-gradient-to-b from-white to-sky-50/30">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-3xl shadow-inner overflow-hidden flex-shrink-0">
            {avatar.startsWith("http") ? (
              <img src={avatar} alt={nickname} className="w-full h-full object-cover" />
            ) : (
              <span>🤖</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-800 text-lg truncate">{nickname}</h3>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold mt-0.5">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>
                Level {level}: {levelTitle}
              </span>
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex justify-between text-xs text-slate-600 mb-1.5 font-medium">
            <span>Progres Level</span>
            <span>
              {nextLevelConfig
                ? `${xp} / ${nextXpTarget} XP`
                : "Level Maksimal!"}
            </span>
          </div>
          <ProgressBar progress={xpPercent} color="amber" height="h-2.5" />
        </div>
      </Card>

      {/* 2. Level Roadmap 1-6 */}
      <Card className="p-5 border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-3.5">
          <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Peta Jalan Level</span>
          </h4>
          <span className="text-xs font-medium text-slate-500">
            {level}/6 Tercapai
          </span>
        </div>

        <div className="space-y-2.5">
          {LEVELS.map((lvl: LevelInfo) => {
            const isCompleted = level > lvl.level;
            const isCurrent = level === lvl.level;
            const isLocked = level < lvl.level;

            return (
              <div
                key={lvl.level}
                className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs transition-all ${
                  isCurrent
                    ? "bg-amber-50/70 border-amber-300 font-bold text-amber-900 shadow-sm"
                    : isCompleted
                    ? "bg-emerald-50/40 border-emerald-200/80 text-slate-700"
                    : "bg-slate-50/60 border-slate-200/60 text-slate-400"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                    isCurrent
                      ? "bg-amber-500 text-white"
                      : isCompleted
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : lvl.level}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="truncate">{lvl.title}</span>
                    {isCurrent && (
                      <span className="text-[10px] bg-amber-200 text-amber-800 px-1.5 py-0.2 rounded font-extrabold uppercase">
                        Aktif
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {lvl.minXp} XP
                  </div>
                </div>

                {isLocked && <Lock className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />}
              </div>
            );
          })}
        </div>
      </Card>

      {/* 3. Recent Badges (Terbaru) */}
      <Card className="p-5 border-slate-100 shadow-sm">
        <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Badge Baru Saja Diraih</span>
        </h4>

        {recentBadges.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-2 text-center">
            Belum ada badge yang diraih. Ayo selesaikan misi pertamamu!
          </p>
        ) : (
          <div className="space-y-2">
            {recentBadges.map((badge) => (
              <button
                key={badge.id}
                onClick={() => onSelectBadge(badge.id)}
                className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 text-left transition-colors border border-transparent hover:border-slate-100"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg flex-shrink-0">
                  {badge.ikon || "⭐"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-800 text-xs truncate">
                    {badge.nama}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">
                    {badge.unlockedAt || "Telah terbuka"}
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ))}
          </div>
        )}
      </Card>

      {/* 4. Near Badges (Paling Dekat untuk Diraih) */}
      <Card className="p-5 border-slate-100 shadow-sm">
        <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-emerald-500" />
          <span>Hampir Terbuka!</span>
        </h4>

        {nearBadges.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-2 text-center">
            Semua badge yang tersedia telah berhasil kamu koleksi! Hebat!
          </p>
        ) : (
          <div className="space-y-3">
            {nearBadges.map((badge) => (
              <button
                key={badge.id}
                onClick={() => onSelectBadge(badge.id)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-100"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-semibold text-xs text-slate-800 truncate">
                    {badge.nama}
                  </span>
                  <span className="text-[11px] font-bold text-amber-600">
                    {badge.percent}%
                  </span>
                </div>
                <ProgressBar progress={badge.percent} color="amber" height="h-1.5" />
                <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1">
                  <span>
                    {badge.currentProgress || 0}/{badge.target || 1}
                  </span>
                  <span className="text-emerald-600 font-medium hover:underline">
                    Lihat Cara Dapat &rarr;
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
