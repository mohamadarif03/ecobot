import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  History,
  TrendingUp,
  Award,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import {
  CALCULATOR_QUESTIONS,
  getHabitLevel,
} from "../../data/aksiNyata/calculator";
import type { CalculatorQuestion } from "../../data/aksiNyata/types";
import { usePlayerStore, isCalculatorRewardAvailable } from "../../store/playerStore";

export const WasteCalculatorCard: React.FC = () => {
  const { state, submitCalculator } = usePlayerStore();
  const rewardAvailable = isCalculatorRewardAvailable(state);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [calculatorResult, setCalculatorResult] = useState<{
    score: number;
    level: string;
    xpEarned: number;
    pointsEarned: number;
  } | null>(null);

  const currentQuestion: CalculatorQuestion = CALCULATOR_QUESTIONS[currentIndex];
  const isAnswered = selectedAnswers[currentQuestion.id] !== undefined;

  const handleSelectOption = (points: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: points,
    }));
  };

  const handleNext = () => {
    if (currentIndex + 1 < CALCULATOR_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    const answersArray = CALCULATOR_QUESTIONS.map(
      (q) => selectedAnswers[q.id] ?? 0
    );
    const res = submitCalculator(answersArray);
    setCalculatorResult({
      score: res.score,
      level: res.level,
      xpEarned: res.xpEarned,
      pointsEarned: res.pointsEarned,
    });
    setIsFinished(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
    setCalculatorResult(null);
  };

  // Result View
  if (isFinished && calculatorResult) {
    const habitInfo = getHabitLevel(calculatorResult.score);

    // Identify strengths (scored 2) and suggestions (scored 0 or 1)
    const strengths = CALCULATOR_QUESTIONS.filter(
      (q) => selectedAnswers[q.id] === 2
    ).slice(0, 2);

    const suggestions = CALCULATOR_QUESTIONS.filter(
      (q) => (selectedAnswers[q.id] ?? 0) <= 1
    ).slice(0, 2);

    return (
      <div className="space-y-6">
        <article className="rounded-[28px] border border-sky-100 bg-white p-6 sm:p-8 shadow-[0_4px_24px_rgba(14,165,233,0.06)] text-center space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-sky-50 text-sky-600 mx-auto flex items-center justify-center text-3xl shadow-xs">
            {habitInfo.badge}
          </div>

          <div className="space-y-1">
            <span
              className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${habitInfo.color}`}
            >
              Tingkat: {habitInfo.name}
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-2">
              Skor Kebiasaanmu: {calculatorResult.score} / 16
            </h3>
            <p className="text-xs font-semibold text-slate-600 max-w-md mx-auto leading-relaxed">
              {habitInfo.description}
            </p>
          </div>

          {/* Reward notification */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {calculatorResult.xpEarned > 0
                ? `Hadiah Hari Ini Diterima: +${calculatorResult.xpEarned} XP · +${calculatorResult.pointsEarned} Poin`
                : "Mode Refleksi: Hadiah kalkulator hari ini sudah kamu dapatkan."}
            </span>
          </div>

          {/* Strengths & Suggestions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-2">
            {/* Strengths */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>2 Kebiasaan Terhebatmu</span>
              </div>
              {strengths.length > 0 ? (
                <ul className="text-xs text-slate-700 font-semibold space-y-2">
                  {strengths.map((s) => (
                    <li key={s.id} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{s.strengthFeedback}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500">
                  Kamu sedang dalam proses membangun kebiasaan baru. Terus semangat!
                </p>
              )}
            </div>

            {/* Suggestions */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-800">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span>Saran untuk Ditingkatkan</span>
              </div>
              {suggestions.length > 0 ? (
                <ul className="text-xs text-slate-700 font-semibold space-y-2">
                  {suggestions.map((s) => (
                    <li key={s.id} className="space-y-1">
                      <div className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{s.suggestionFeedback}</span>
                      </div>
                      <Link
                        to={`/pustaka/${s.pustakaSlug}`}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 hover:text-sky-800 hover:underline pl-3"
                      >
                        <BookOpen className="w-3 h-3 text-sky-600" />
                        <span>Pelajari di materi &quot;{s.pustakaTitle}&quot;</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500">
                  Luar biasa! Semua kebiasaanmu sudah sangat ramah lingkungan!
                </p>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleReset}
              className="h-11 px-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs flex items-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Hitung Ulang</span>
            </button>

            <Link
              to="/aksi-nyata?tab=tantangan"
              className="h-11 px-6 rounded-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-slate-950 font-black text-xs flex items-center gap-2 shadow-2xs hover:scale-105 transition"
            >
              <span>Lakukan Tantangan 7 Hari</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>

        {/* History of last 5 attempts */}
        {state.aksiNyata?.calculator?.history && state.aksiNyata.calculator.history.length > 0 && (
          <div className="rounded-[24px] border border-slate-100 bg-white p-5 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-black text-xs">
              <History className="w-4 h-4 text-sky-500" />
              <span>Riwayat Refleksi Terakhir</span>
            </div>

            <div className="space-y-2">
              {state.aksiNyata.calculator.history.slice(0, 5).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs font-bold"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center text-[11px] font-black">
                      #{idx + 1}
                    </span>
                    <span className="text-slate-800">{item.level}</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-500">
                    <span className="font-black text-slate-900">{item.score}/16 Poin</span>
                    <span className="text-[11px]">
                      {new Date(item.at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Active Questions Step
  const progressPercent = Math.round(
    ((currentIndex + 1) / CALCULATOR_QUESTIONS.length) * 100
  );

  return (
    <article className="rounded-[28px] border border-sky-100 bg-white p-6 sm:p-8 shadow-[0_4px_24px_rgba(14,165,233,0.06)] space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
            Refleksi Kebiasaan Rumah
          </span>
          <h3 className="text-lg font-black text-slate-900 mt-1">
            Kalkulator Jejak Sampah Cilik
          </h3>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {rewardAvailable ? (
            <span className="text-[11px] font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              +10 XP · +5 Poin (1x per hari)
            </span>
          ) : (
            <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              Hadiah hari ini sudah diklaim
            </span>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
          <span>
            Pertanyaan <strong className="text-slate-800">{currentIndex + 1}</strong> dari {CALCULATOR_QUESTIONS.length}
          </span>
          <span>{progressPercent}%</span>
        </div>

        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-sky-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="space-y-4 py-2">
        <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
          {currentQuestion.question}
        </h4>

        {/* 3 Choices */}
        <div className="space-y-2.5">
          {currentQuestion.options.map((opt, oIdx) => {
            const isSelected = selectedAnswers[currentQuestion.id] === opt.points;
            return (
              <button
                key={oIdx}
                type="button"
                onClick={() => handleSelectOption(opt.points)}
                className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition cursor-pointer ${
                  isSelected
                    ? "bg-sky-50 border-sky-400 ring-2 ring-sky-200 font-black text-slate-900"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/70"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                      isSelected
                        ? "bg-sky-500 text-white"
                        : "bg-white border border-slate-200 text-slate-600"
                    }`}
                  >
                    {["A", "B", "C"][oIdx]}
                  </span>
                  <span className="text-[13.5px] leading-snug font-bold">
                    {opt.text}
                  </span>
                </div>

                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <button
          type="button"
          disabled={currentIndex === 0}
          onClick={handlePrev}
          className={`h-10 px-4 rounded-full font-black text-xs flex items-center gap-1.5 transition ${
            currentIndex > 0
              ? "bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
              : "opacity-30 cursor-not-allowed bg-slate-100 text-slate-400"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <button
          type="button"
          disabled={!isAnswered}
          onClick={handleNext}
          className={`h-11 px-6 rounded-full font-black text-xs flex items-center gap-2 transition ${
            isAnswered
              ? "bg-slate-900 hover:bg-slate-800 text-white shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          <span>
            {currentIndex + 1 < CALCULATOR_QUESTIONS.length
              ? "Lanjut"
              : "Lihat Hasil Refleksi"}
          </span>
          <ChevronRight className="w-4 h-4 text-sky-400" />
        </button>
      </div>
    </article>
  );
};
