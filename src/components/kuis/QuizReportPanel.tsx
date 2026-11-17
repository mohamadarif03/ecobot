import React from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Award,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Brain,
  AlertCircle,
} from "lucide-react";
import { usePlayerStore, getQuizSummary, getWeakTopics } from "../../store/playerStore";
import { calculateLevel } from "../../data/levels";

export const QuizReportPanel: React.FC = () => {
  const { state } = usePlayerStore();
  const summary = getQuizSummary(state);
  const levelInfo = calculateLevel(state.xp);
  const weakTopics = getWeakTopics(state, 2);

  // Calculate level progress
  const currentLevelMin = levelInfo.minXp;
  const nextLevelXp = levelInfo.nextXp;
  const xpInCurrentLevel = Math.max(0, state.xp - currentLevelMin);
  const xpNeededForLevel = Math.max(1, nextLevelXp - currentLevelMin);
  const levelProgressPercent = Math.min(
    100,
    Math.round((xpInCurrentLevel / xpNeededForLevel) * 100)
  );

  return (
    <aside className="space-y-5">
      {/* 1. Rapor Kuis Card */}
      <div className="rounded-[24px] border border-slate-100 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 leading-none">
              Rapor Kuis
            </h3>
            <p className="text-[11.5px] text-slate-400 font-bold mt-0.5">
              Catatan prestasimu
            </p>
          </div>
        </div>

        {/* 2x2 Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100/80">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold">
              <Brain className="w-3.5 h-3.5 text-sky-500" />
              <span>Selesai</span>
            </div>
            <p className="text-xl font-black text-slate-900 mt-1">
              {summary.totalQuizzes}{" "}
              <span className="text-xs font-bold text-slate-400">kali</span>
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100/80">
            <div className="flex items-center gap-1.5 text-emerald-700 text-[11px] font-bold">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Rata-rata</span>
            </div>
            <p className="text-xl font-black text-emerald-700 mt-1">
              {summary.avgScore}%
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100/80">
            <div className="flex items-center gap-1.5 text-blue-700 text-[11px] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Benar</span>
            </div>
            <p className="text-xl font-black text-blue-700 mt-1">
              {summary.totalCorrect}{" "}
              <span className="text-xs font-bold text-blue-500">soal</span>
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-100/80">
            <div className="flex items-center gap-1.5 text-amber-700 text-[11px] font-bold">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Sempurna</span>
            </div>
            <p className="text-xl font-black text-amber-700 mt-1">
              {summary.perfectCount}{" "}
              <span className="text-xs font-bold text-amber-500">kali</span>
            </p>
          </div>
        </div>

        {/* Level & XP Mini Bar */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-sky-500 text-white font-black text-[10px] flex items-center justify-center">
                {levelInfo.level}
              </span>
              <span className="font-black text-slate-800">{levelInfo.title}</span>
            </div>
            <span className="text-[11px] font-bold text-slate-400">
              {state.xp} / {levelInfo.nextXp} XP
            </span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-sky-500 rounded-full transition-all duration-500"
              style={{ width: `${levelProgressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Topik yang Perlu Diulang */}
      <div className="rounded-[24px] border border-slate-100 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <h3 className="text-[14px] font-black text-slate-900 leading-tight">
            Perlu Diperkuat
          </h3>
        </div>

        {weakTopics.length > 0 ? (
          <div className="space-y-2.5">
            {weakTopics.map((topic) => {
              const stats = state.quizProgress?.topik?.[topic.id];
              const scoreText = stats && stats.attempts > 0
                ? `Skor: ${stats.bestScore}/5 (${stats.bestScore * 20}%)`
                : "Belum pernah dicoba";

              return (
                <div
                  key={topic.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2.5 hover:border-sky-200 transition"
                >
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-black text-slate-800 truncate">
                      {topic.judul}
                    </p>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                      {scoreText}
                    </p>
                  </div>

                  <Link
                    to={`/kuis/main?mode=topik&topik=${topic.id}&jumlah=5`}
                    className="h-8 px-3 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-black border border-sky-200 flex items-center gap-1 shrink-0 transition"
                  >
                    <span>Latihan</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-2xl">
            Hebat! Semua kuis sudah kamu kerjakan dengan mantap!
          </p>
        )}
      </div>

      {/* 3. Promo Pustaka Banner */}
      <div className="rounded-[24px] border border-blue-100 bg-gradient-to-br from-blue-500 to-sky-600 p-5 text-white shadow-sm space-y-3 relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="text-[11px] font-black tracking-wide uppercase text-blue-100">
            Tips dari Ecobot
          </span>
        </div>

        <p className="text-[13px] font-bold text-white/95 leading-relaxed">
          Ingin selalu dapat skor 100% dan raih badge &quot;Si Pintar&quot;? Baca dulu materi lengkapnya!
        </p>

        <Link
          to="/pustaka"
          className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-white text-blue-900 font-black text-xs hover:bg-blue-50 transition shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Buka Pustaka Edukasi</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
};
