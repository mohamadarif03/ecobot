import React from "react";
import {
  Check,
  Lock,
  Clock,
  Sparkles,
  ShieldCheck,
  GlassWater,
  Trash2,
  Zap,
  Droplets,
  ShieldAlert,
  Recycle,
  HeartHandshake,
} from "lucide-react";
import { CHALLENGE_TASKS } from "../../data/aksiNyata/challenge";
import type { ChallengeTask } from "../../data/aksiNyata/types";
import type { ChallengeDayRecord } from "../../types/player";

interface ChallengeStepperProps {
  currentDay: number;
  days: Record<number, ChallengeDayRecord>;
  isStarted: boolean;
  canCheckToday: boolean;
  isTodayChecked: boolean;
}

export const ChallengeStepper: React.FC<ChallengeStepperProps> = ({
  currentDay,
  days,
  isStarted,
  canCheckToday,
  isTodayChecked,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "GlassWater":
        return <GlassWater className="w-5 h-5" />;
      case "Trash2":
        return <Trash2 className="w-5 h-5" />;
      case "Zap":
        return <Zap className="w-5 h-5" />;
      case "Droplets":
        return <Droplets className="w-5 h-5" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-5 h-5" />;
      case "Recycle":
        return <Recycle className="w-5 h-5" />;
      case "HeartHandshake":
      default:
        return <HeartHandshake className="w-5 h-5" />;
    }
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-black text-slate-900">
          Jalur 7 Hari Aksi Nyata
        </h3>
        <span className="text-xs font-bold text-slate-400">
          Selesaikan berurutan dari hari ke-1
        </span>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {CHALLENGE_TASKS.map((task: ChallengeTask) => {
          const record = days[task.day];
          const isDone = Boolean(record);
          const isCurrent = isStarted && currentDay === task.day && !isDone;
          const isLocked = !isDone && !isCurrent;

          let cardStyle = "border-slate-100 bg-white";
          let badgeText = "Terkunci";
          let badgeClass = "bg-slate-100 text-slate-500 border-slate-200";

          if (isDone) {
            cardStyle = "border-emerald-200 bg-emerald-50/20";
            badgeText = "Selesai";
            badgeClass = "bg-emerald-100 text-emerald-800 border-emerald-200";
          } else if (isCurrent) {
            cardStyle = "border-sky-300 bg-sky-50/30 ring-2 ring-sky-200 shadow-xs";
            badgeText = isTodayChecked ? "Menunggu Besok" : "Hari Ini";
            badgeClass = isTodayChecked
              ? "bg-amber-100 text-amber-800 border-amber-200"
              : "bg-sky-500 text-white border-sky-500";
          }

          return (
            <li
              key={task.day}
              aria-current={isCurrent ? "step" : undefined}
              className={`rounded-[22px] border p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 ${cardStyle}`}
            >
              <div className="space-y-3">
                {/* Header: Icon, Day, Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                        isDone
                          ? "bg-emerald-500 text-white shadow-2xs"
                          : isCurrent
                          ? "bg-sky-500 text-white shadow-2xs"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {isDone ? (
                        <Check className="w-5 h-5 stroke-[3]" />
                      ) : isLocked ? (
                        <Lock className="w-4 h-4" />
                      ) : (
                        getIcon(task.iconName)
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                        Hari ke-{task.day}
                      </span>
                      <h4 className="text-[14.5px] font-black text-slate-900 leading-snug">
                        {task.title}
                      </h4>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${badgeClass}`}
                  >
                    {badgeText}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[12.5px] text-slate-600 leading-relaxed line-clamp-2">
                  {task.description}
                </p>

                {/* Adult supervision chip if needed */}
                {task.needsAdultSupervision && (
                  <div className="inline-flex items-center gap-1 text-[10.5px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                    <ShieldCheck className="w-3 h-3 text-amber-600" />
                    <span>Dampingan dewasa</span>
                  </div>
                )}
              </div>

              {/* Bottom footer */}
              <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between text-[11px] font-bold">
                {isDone ? (
                  <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Dicentang: {record.dateKey}</span>
                  </span>
                ) : isCurrent ? (
                  <span className="text-sky-700 font-extrabold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{isTodayChecked ? "Lanjut besok" : "Siap dikerjakan"}</span>
                  </span>
                ) : (
                  <span className="text-slate-400">
                    Buka setelah Hari {task.day - 1}
                  </span>
                )}

                <span className="text-slate-400 font-black">+15 XP</span>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
