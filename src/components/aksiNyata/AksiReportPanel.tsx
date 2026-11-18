import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Award,
  CheckCircle2,
  Lock,
  Sparkles,
  Lightbulb,
  HeartHandshake,
  Check,
  Flame,
  ArrowRight,
} from "lucide-react";
import {
  usePlayerStore,
  getChallengeStatus,
  getAksiSummary,
} from "../../store/playerStore";
import { calculateLevel } from "../../data/levels";
import { getRandomActionTip } from "../../data/aksiNyata/tips";

export const AksiReportPanel: React.FC = () => {
  const { state } = usePlayerStore();
  const status = getChallengeStatus(state);
  const summary = getAksiSummary(state);
  const levelInfo = calculateLevel(state.xp);

  const [randomTip, setRandomTip] = useState<string>("");

  useEffect(() => {
    setRandomTip(getRandomActionTip());
  }, []);

  // Level progress calculation
  const currentLevelMin = levelInfo.minXp;
  const nextLevelXp = levelInfo.nextXp;
  const xpInCurrentLevel = Math.max(0, state.xp - currentLevelMin);
  const xpNeededForLevel = Math.max(1, nextLevelXp - currentLevelMin);
  const levelProgressPercent = Math.min(
    100,
    Math.round((xpInCurrentLevel / xpNeededForLevel) * 100)
  );

  const hasPahlawanBadge = state.badges.some((b) => b.id === "pahlawan-nyata");

  return (
    <aside className="space-y-5">
      {/* 1. Progres Tantangan 7 Hari Card */}
      <div className="rounded-[24px] border border-slate-100 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 leading-none">
                Aksi Nyataku
              </h3>
              <p className="text-[11.5px] text-slate-400 font-bold mt-0.5">
                Progres Tantangan 7 Hari
              </p>
            </div>
          </div>

          {status.rounds > 0 && (
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Putaran {status.rounds + 1}
            </span>
          )}
        </div>

        {/* 7 Days Circular Stepper */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Progres Minggu Ini</span>
            <span className="font-black text-emerald-700">
              {status.checkedDaysCount}/7 Hari
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7].map((dayNum) => {
              const isChecked = Boolean(status.days[dayNum]);
              const isCurrent = status.currentDay === dayNum && !isChecked;

              let circleStyle = "bg-slate-100 text-slate-400 border-slate-200";
              if (isChecked) {
                circleStyle = "bg-emerald-500 text-white border-emerald-500 shadow-2xs";
              } else if (isCurrent) {
                circleStyle = "bg-emerald-100 text-emerald-800 border-emerald-400 ring-2 ring-sky-200 animate-pulse";
              }

              return (
                <div
                  key={dayNum}
                  title={`Hari ${dayNum}: ${isChecked ? "Sudah selesai" : isCurrent ? "Hari ini" : "Belum"}`}
                  className={`h-9 rounded-xl border flex flex-col items-center justify-center font-black text-xs transition ${circleStyle}`}
                >
                  {isChecked ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <span>H{dayNum}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Level & XP Mini Bar */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[10px] flex items-center justify-center">
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
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${levelProgressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Badge Pahlawan Nyata Card */}
      <div
        className={`rounded-[24px] border p-5 transition ${
          hasPahlawanBadge
            ? "border-amber-200 bg-gradient-to-br from-amber-500/10 via-amber-50 to-white shadow-[0_2px_12px_rgba(245,158,11,0.08)]"
            : "border-slate-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                hasPahlawanBadge
                  ? "bg-amber-100 border border-amber-200 shadow-xs"
                  : "bg-slate-100 border border-slate-200 text-slate-400"
              }`}
            >
              {hasPahlawanBadge ? "🌟" : <Lock className="w-5 h-5 text-slate-400" />}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  HADIAH AKHIR
                </span>
                <span className="text-[10.5px] font-black text-amber-700">
                  +150 XP
                </span>
              </div>
              <h4 className="text-[15px] font-black text-slate-900 mt-0.5">
                Badge Pahlawan Nyata
              </h4>
            </div>
          </div>
        </div>

        <p className="text-[12px] text-slate-600 mt-2.5 leading-relaxed">
          {hasPahlawanBadge
            ? "Selamat! Kamu telah menuntaskan Tantangan 7 Hari dan resmi menjadi Pahlawan Nyata!"
            : "Selesaikan 7 tugas harian berturut-turut di rumah untuk membuka badge langka ini."}
        </p>
      </div>

      {/* 3. Ringkasan Aksi */}
      <div className="rounded-[24px] border border-slate-100 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
          Ringkasan Kebiasaan
        </h4>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs font-bold">
            <span className="text-slate-600">Aksi Dicentang</span>
            <span className="font-black text-slate-900">{summary.checkedDaysCount} kali</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs font-bold">
            <span className="text-slate-600">Ide Daur Ulang Dicoba</span>
            <span className="font-black text-slate-900">{summary.totalIdeasTried} karya</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs font-bold">
            <span className="text-slate-600">Skor Kebiasaan Terakhir</span>
            <span className="font-black text-slate-900">
              {summary.lastCalculatorScore !== null
                ? `${summary.lastCalculatorScore}/16 (${summary.lastCalculatorLevel})`
                : "Belum tes"}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Tips Ecobot Card */}
      <div className="rounded-[24px] border border-emerald-100 bg-emerald-50/70 p-5 space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Lightbulb className="w-4 h-4" />
          </div>
          <span className="text-xs font-black text-emerald-900">Tips dari Ecobot</span>
        </div>
        <p className="text-[12.5px] text-slate-700 leading-relaxed font-semibold">
          &quot;{randomTip}&quot;
        </p>
      </div>

      {/* 5. Adult Co-learning Note */}
      <div className="flex items-start gap-2.5 px-3 py-2 rounded-xl bg-slate-100/70 text-slate-500 text-[11px] leading-relaxed font-bold">
        <HeartHandshake className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <span>Ajak orang tua atau gurumu mencoba aksi ramah lingkungan ini bersama-sama di rumah!</span>
      </div>
    </aside>
  );
};
