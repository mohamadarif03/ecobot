import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Lightbulb,
  Check,
  ShieldCheck,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Flame,
} from "lucide-react";
import type { ChallengeTask } from "../../data/aksiNyata/types";
import { CheckTaskDialog } from "./CheckTaskDialog";

interface TodayTaskCardProps {
  task: ChallengeTask;
  isStarted: boolean;
  canCheckToday: boolean;
  isTodayChecked: boolean;
  isCompleted: boolean;
  onStartChallenge: () => void;
  onCheckDay: (data: {
    feeling: "gampang" | "lumayan" | "susah";
    parentConfirmed: boolean;
  }) => void;
  onStartNewRound: () => void;
}

export const TodayTaskCard: React.FC<TodayTaskCardProps> = ({
  task,
  isStarted,
  canCheckToday,
  isTodayChecked,
  isCompleted,
  onStartChallenge,
  onCheckDay,
  onStartNewRound,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleConfirmCheck = (data: {
    feeling: "gampang" | "lumayan" | "susah";
    parentConfirmed: boolean;
  }) => {
    setIsDialogOpen(false);
    onCheckDay(data);
  };

  // State 1: Not started yet
  if (!isStarted) {
    return (
      <article className="rounded-[28px] border-2 border-dashed border-emerald-200 bg-gradient-to-br from-white via-sky-50/40 to-blue-50/30 p-6 sm:p-8 shadow-sm text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-500 text-white mx-auto flex items-center justify-center shadow-md shadow-emerald-500/20">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="max-w-md mx-auto space-y-1.5">
          <span className="text-[10.5px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
            Mulai Dari Rumah
          </span>
          <h3 className="text-xl font-black text-slate-900">
            Tantangan 7 Hari Aksi Nyata
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-semibold">
            Buktikan kepedulianmu pada bumi lewat kebiasaan kecil selama 7 hari di rumah. Dapatkan total hingga +255 XP dan badge langka &quot;Pahlawan Nyata&quot;!
          </p>
        </div>

        <button
          type="button"
          onClick={onStartChallenge}
          className="h-12 px-8 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-slate-950 font-black text-[13.5px] inline-flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition"
        >
          <span>Mulai Tantangan Sekarang</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </article>
    );
  }

  // State 2: Completed all 7 days
  if (isCompleted) {
    return (
      <article className="rounded-[28px] border border-amber-200 bg-gradient-to-br from-amber-500/10 via-amber-50 to-white p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/25 shrink-0 text-2xl">
              🌟
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900">
                TUNTAS 7 HARI
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                Kamu Resmi Jadi Pahlawan Nyata!
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onStartNewRound}
            className="h-11 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm hover:scale-105 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mulai Putaran Baru (+15 XP/hari)</span>
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed font-semibold">
          Hebat sekali! 7 aksi nyata ramah lingkungan sudah berhasil kamu lakukan di rumah. Kamu bisa mengulanginya lagi di putaran baru untuk terus menjaga bumi!
        </p>
      </article>
    );
  }

  // State 3: Active Day (either can check or already checked today)
  return (
    <>
      <CheckTaskDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        task={task}
        onConfirm={handleConfirmCheck}
      />

      <article className="rounded-[28px] border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/30 to-sky-50/20 p-6 sm:p-7 shadow-[0_2px_14px_rgba(16,185,129,0.06)] space-y-4">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-emerald-100/70">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-emerald-500 text-white font-black text-sm flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
              H{task.day}
            </span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                TUGAS HARI INI
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-0.5">
                {task.title}
              </h3>
            </div>
          </div>

          {task.needsAdultSupervision && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold self-start sm:self-auto">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Butuh Dampingan Orang Dewasa</span>
            </div>
          )}
        </div>

        {/* Task Description */}
        <p className="text-sm font-bold text-slate-700 leading-relaxed">
          {task.description}
        </p>

        {/* Why & Tips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Kenapa Penting?</span>
            </div>
            <p className="text-xs text-slate-600 font-semibold leading-relaxed">
              {task.why}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-800">
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>Tips dari Ecobot</span>
            </div>
            <p className="text-xs text-slate-600 font-semibold leading-relaxed">
              {task.tips}
            </p>
          </div>
        </div>

        {/* Adult Note if any */}
        {task.adultNote && (
          <p className="text-xs text-amber-700 bg-amber-50/80 border border-amber-100 rounded-xl p-2.5 font-bold">
            💡 {task.adultNote}
          </p>
        )}

        {/* Bottom CTA Bar */}
        <div className="pt-3 border-t border-emerald-100/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              +15 XP · +5 Poin
            </span>

            {task.pustakaSlug && (
              <Link
                to={`/pustaka/${task.pustakaSlug}`}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline inline-flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Baca Materi</span>
              </Link>
            )}
          </div>

          {canCheckToday ? (
            <button
              type="button"
              onClick={() => setIsDialogOpen(true)}
              className="h-11 px-7 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 hover:scale-105 active:scale-95 transition"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Aku Sudah Melakukannya!</span>
            </button>
          ) : isTodayChecked ? (
            <div className="inline-flex items-center gap-2 text-xs font-black text-emerald-800 bg-emerald-100/80 px-4 py-2 rounded-full">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Tugas Hari Ini Sudah Selesai! Sampai jumpa besok.</span>
            </div>
          ) : null}
        </div>
      </article>
    </>
  );
};
