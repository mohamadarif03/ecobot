import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  X,
  Star,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  Flame,
  Clock,
  HelpCircle,
  Check,
} from "lucide-react";
import {
  usePlayerStore,
  getEffectiveDateKey,
} from "../store/playerStore";
import { QUIZ_TOPICS } from "../data/kuis/topics";
import {
  ALL_QUIZ_QUESTIONS,
  getDailyQuizQuestions,
  getTopicQuizQuestions,
} from "../data/kuis/questions";
import type { QuizQuestion, QuizOption } from "../data/kuis/types";
import { EcobotMascot } from "../components/ecobot/EcobotMascot";
import { LevelUpModal } from "../components/missions/LevelUpModal";

interface AnsweredQuestion {
  question: QuizQuestion;
  selectedOptionId: string;
  isCorrect: boolean;
}

export default function KuisPlayerPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { state, submitQuizResult } = usePlayerStore();

  const mode = (searchParams.get("mode") as "harian" | "topik" | "latihan") || "latihan";
  const topikParam = searchParams.get("topik");
  const countParam = parseInt(searchParams.get("jumlah") || "5", 10);
  const isTimerEnabled = searchParams.get("timer") === "true";

  const totalQuestionCount = isNaN(countParam) ? 5 : countParam;

  // Selected topic meta if any
  const topicMeta = useMemo(() => {
    if (!topikParam) return null;
    return QUIZ_TOPICS.find((t) => t.id === topikParam) || null;
  }, [topikParam]);

  const quizTitle = useMemo(() => {
    if (mode === "harian") return "Kuis Harian Ecobot";
    if (mode === "topik" && topicMeta) return `Kuis: ${topicMeta.judul}`;
    return "Latihan Bebas";
  }, [mode, topicMeta]);

  // Load questions
  const questions: QuizQuestion[] = useMemo(() => {
    if (mode === "harian") {
      const dateKey = getEffectiveDateKey(state);
      return getDailyQuizQuestions(dateKey);
    }
    if (mode === "topik" && topikParam) {
      return getTopicQuizQuestions(topikParam, totalQuestionCount);
    }
    // Latihan campur
    if (topikParam) {
      return getTopicQuizQuestions(topikParam, totalQuestionCount);
    }
    // Shuffle all questions
    const shuffled = [...ALL_QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, totalQuestionCount);
  }, [mode, topikParam, totalQuestionCount, state]);

  // Quiz active state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [hiddenOptionIds, setHiddenOptionIds] = useState<string[]>([]);
  const [usedHintOverall, setUsedHintOverall] = useState<boolean>(false);
  const [hintUsedOnCurrentQuestion, setHintUsedOnCurrentQuestion] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  const [highestStreak, setHighestStreak] = useState<number>(0);

  // Time per question (30s) if timer is enabled
  const [timeLeft, setTimeLeft] = useState<number>(30);

  // Answers history
  const [answers, setAnswers] = useState<AnsweredQuestion[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Exit Modal
  const [showExitModal, setShowExitModal] = useState<boolean>(false);

  // Result submission state
  const [submissionResult, setSubmissionResult] = useState<{
    stars: number;
    xpEarned: number;
    pointsEarned: number;
    isFirstDaily: boolean;
    leveledUp: boolean;
    newLevel: number;
    newTitle: string;
  } | null>(null);

  const hasSubmittedRef = useRef<boolean>(false);

  const currentQuestion: QuizQuestion | undefined = questions[currentIndex];

  // Options shuffled once for current question
  const currentOptions: QuizOption[] = useMemo(() => {
    if (!currentQuestion) return [];
    return [...currentQuestion.pilihan];
  }, [currentQuestion]);

  // Timer effect
  useEffect(() => {
    if (!isTimerEnabled || isAnswerSubmitted || isFinished) return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up: auto select wrong or mark answered
          handleAutoTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isTimerEnabled, isAnswerSubmitted, isFinished, currentIndex]);

  const handleAutoTimeUp = () => {
    if (isAnswerSubmitted || !currentQuestion) return;
    setIsAnswerSubmitted(true);
    setStreak(0);
    // Find a wrong option to represent timeout
    const wrongOpt = currentQuestion.pilihan.find((o) => o.id !== currentQuestion.benarId);
    const chosen = wrongOpt?.id || currentQuestion.pilihan[0].id;
    setSelectedOptionId(chosen);

    setAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion,
        selectedOptionId: chosen,
        isCorrect: false,
      },
    ]);
  };

  // Keyboard shortcut listener (1-4, A-D, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showExitModal || isFinished) return;

      if (!isAnswerSubmitted && currentQuestion) {
        let chosenIdx = -1;
        if (["1", "a", "A"].includes(e.key)) chosenIdx = 0;
        else if (["2", "b", "B"].includes(e.key)) chosenIdx = 1;
        else if (["3", "c", "C"].includes(e.key)) chosenIdx = 2;
        else if (["4", "d", "D"].includes(e.key)) chosenIdx = 3;

        if (chosenIdx >= 0 && chosenIdx < currentOptions.length) {
          const opt = currentOptions[chosenIdx];
          if (!hiddenOptionIds.includes(opt.id)) {
            handleSelectOption(opt.id);
          }
        }
      } else if (isAnswerSubmitted) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleNextQuestion();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    showExitModal,
    isFinished,
    isAnswerSubmitted,
    currentQuestion,
    currentOptions,
    hiddenOptionIds,
  ]);

  // Handle selecting an option
  const handleSelectOption = (optId: string) => {
    if (isAnswerSubmitted || !currentQuestion) return;

    setSelectedOptionId(optId);
    setIsAnswerSubmitted(true);

    const isCorrect = optId === currentQuestion.benarId;
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > highestStreak) setHighestStreak(newStreak);
    } else {
      setStreak(0);
    }

    setAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion,
        selectedOptionId: optId,
        isCorrect,
      },
    ]);
  };

  // Handle Hint: eliminates 1 wrong answer
  const handleUseHint = () => {
    if (hintUsedOnCurrentQuestion || isAnswerSubmitted || !currentQuestion) return;

    setUsedHintOverall(true);
    setHintUsedOnCurrentQuestion(true);

    // Pick 1 wrong option that is not yet hidden
    const wrongOptions = currentQuestion.pilihan.filter(
      (o: QuizOption) => o.id !== currentQuestion.benarId && !hiddenOptionIds.includes(o.id)
    );

    if (wrongOptions.length > 0) {
      const eliminated = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
      setHiddenOptionIds((prev) => [...prev, eliminated.id]);
    }
  };

  // Move to next question or finish
  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
      setHiddenOptionIds([]);
      setHintUsedOnCurrentQuestion(false);
      setTimeLeft(30);
    } else {
      finishQuiz();
    }
  };

  // Submit and finish quiz
  const finishQuiz = () => {
    setIsFinished(true);

    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    const correctCount = answers.filter((a) => a.isCorrect).length;
    const finalScore = isAnswerSubmitted && selectedOptionId === currentQuestion?.benarId
      ? correctCount
      : correctCount;

    const res = submitQuizResult({
      mode,
      topikId: topikParam || undefined,
      topicTitle: quizTitle,
      score: finalScore,
      total: questions.length,
      usedHint: usedHintOverall,
    });

    setSubmissionResult({
      stars: res.stars,
      xpEarned: res.xpEarned,
      pointsEarned: res.pointsEarned,
      isFirstDaily: res.isFirstDaily,
      leveledUp: res.leveledUp,
      newLevel: res.newLevel,
      newTitle: res.newTitle,
    });
  };

  // Restart quiz
  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setHiddenOptionIds([]);
    setUsedHintOverall(false);
    setHintUsedOnCurrentQuestion(false);
    setStreak(0);
    setHighestStreak(0);
    setTimeLeft(30);
    setAnswers([]);
    setIsFinished(false);
    setSubmissionResult(null);
    hasSubmittedRef.current = false;
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md text-center shadow-md space-y-4">
          <p className="text-base font-black text-slate-800">
            Tidak ada soal yang tersedia untuk mode ini.
          </p>
          <Link
            to="/kuis"
            className="inline-block px-6 py-2.5 rounded-full bg-emerald-600 text-white font-black text-xs"
          >
            Kembali ke Pusat Kuis
          </Link>
        </div>
      </div>
    );
  }

  // ==================== SCREEN 2: RESULTS SCREEN ====================
  if (isFinished) {
    const totalCorrect = answers.filter((a) => a.isCorrect).length;
    const percentage = Math.round((totalCorrect / questions.length) * 100);
    const earnedStars = submissionResult?.stars ?? (percentage === 100 ? (usedHintOverall ? 2 : 3) : percentage >= 80 ? 2 : 1);

    // Mascot feedback
    let ecobotMessage = "Bagus sekali! Terus latih ingatanmu!";
    let mascotPose: "happy" | "wave" = "wave";
    if (percentage === 100) {
      ecobotMessage = "Luar biasa! Kamu pahlawan lingkungan sejati!";
      mascotPose = "happy";
    } else if (percentage >= 80) {
      ecobotMessage = "Hebat! Sedikit lagi mencapai nilai sempurna!";
      mascotPose = "happy";
    } else if (percentage >= 50) {
      ecobotMessage = "Usaha yang bagus! Baca materinya lagi yuk biar makin jago!";
    }

    return (
      <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 py-8 px-4 sm:px-6">
        {/* Level Up Modal */}
        {submissionResult?.leveledUp && (
          <LevelUpModal
            isOpen={true}
            onClose={() =>
              setSubmissionResult((prev) => (prev ? { ...prev, leveledUp: false } : null))
            }
            newLevel={submissionResult.newLevel}
            newTitle={submissionResult.newTitle}
            nickname={state.nickname}
          />
        )}

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Main Result Card */}
          <section className="rounded-[32px] border border-emerald-100 bg-white p-6 sm:p-8 text-center shadow-[0_8px_30px_rgba(14,165,233,0.08)] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-gradient-to-b from-sky-200/50 to-transparent blur-2xl pointer-events-none" />

            {/* Mascot */}
            <div className="w-24 h-24 mx-auto mb-3 flex items-center justify-center">
              <EcobotMascot
                pose={mascotPose}
                size="hero"
                className="w-full h-full object-contain filter drop-shadow-md animate-in zoom-in duration-300"
              />
            </div>

            <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
              {quizTitle}
            </span>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Kuis Selesai!
            </h1>
            <p className="text-sm font-bold text-slate-600 mt-1 max-w-md mx-auto">
              {ecobotMessage}
            </p>

            {/* Animated Stars */}
            <div className="flex items-center justify-center gap-2 my-5">
              {[1, 2, 3].map((starIdx) => (
                <div
                  key={starIdx}
                  className={`transition-all transform duration-500 ${
                    starIdx <= earnedStars
                      ? "scale-110 text-amber-400"
                      : "scale-95 text-slate-200"
                  }`}
                >
                  <Star
                    className={`w-10 h-10 ${
                      starIdx <= earnedStars ? "fill-amber-400 drop-shadow-md" : ""
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Score & Rewards Grid */}
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-6">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-bold text-slate-400">Skor Akhir</p>
                <p className="text-2xl font-black text-slate-900 mt-0.5">
                  {totalCorrect}/{questions.length}
                </p>
                <p className="text-[11px] font-bold text-slate-500">
                  Akurasi: {percentage}%
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <p className="text-xs font-bold text-emerald-600">Hadiah Didapat</p>
                <p className="text-xl font-black text-emerald-800 mt-0.5">
                  +{submissionResult?.xpEarned ?? 0} XP
                </p>
                <p className="text-[11px] font-bold text-emerald-600">
                  +{submissionResult?.pointsEarned ?? 0} Poin
                </p>
              </div>
            </div>

            {/* Hint Notice if used */}
            {usedHintOverall && percentage === 100 && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl py-2 px-3 mb-5 inline-block">
                *Bantuan digunakan: Bintang maksimal dibatasi 2 bintang.
              </p>
            )}

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleRestartQuiz}
                className="h-11 px-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs flex items-center gap-2 transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Kuis</span>
              </button>

              <Link
                to="/kuis"
                className="h-11 px-6 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-slate-950 font-black text-xs flex items-center gap-2 shadow-2xs hover:scale-105 transition"
              >
                <span>Pilih Kuis Lain</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Review Answers Accordion */}
          <section className="rounded-[28px] border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-black text-slate-900">
                Tinjauan Jawaban
              </h2>
            </div>

            <div className="space-y-3">
              {answers.map((item, idx) => {
                const correctOption = item.question.pilihan.find(
                  (o: QuizOption) => o.id === item.question.benarId
                );
                const userOption = item.question.pilihan.find(
                  (o: QuizOption) => o.id === item.selectedOptionId
                );

                return (
                  <article
                    key={item.question.id}
                    className={`p-4 rounded-2xl border transition ${
                      item.isCorrect
                        ? "bg-emerald-50/40 border-emerald-100"
                        : "bg-rose-50/40 border-rose-100"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[11px] font-black uppercase text-slate-400">
                          Soal {idx + 1}
                        </span>
                        <h3 className="text-sm font-black text-slate-900 leading-snug">
                          {item.question.teks}
                        </h3>
                      </div>

                      {item.isCorrect ? (
                        <div className="flex items-center gap-1 text-emerald-600 shrink-0 bg-emerald-100 px-2.5 py-1 rounded-full text-xs font-black">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Benar</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-rose-600 shrink-0 bg-rose-100 px-2.5 py-1 rounded-full text-xs font-black">
                          <XCircle className="w-4 h-4" />
                          <span>Kurang Tepat</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100/80 text-xs space-y-1">
                      <p className="text-slate-600">
                        <span className="font-bold text-slate-400">Jawabanmu: </span>
                        <span
                          className={`font-black ${
                            item.isCorrect ? "text-emerald-700" : "text-rose-700"
                          }`}
                        >
                          {userOption?.teks || "-"}
                        </span>
                      </p>

                      {!item.isCorrect && (
                        <p className="text-slate-600">
                          <span className="font-bold text-slate-400">Kunci Jawaban: </span>
                          <span className="font-black text-emerald-700">
                            {correctOption?.teks}
                          </span>
                        </p>
                      )}

                      <p className="text-slate-500 text-[11.5px] italic mt-1 leading-relaxed bg-white/70 p-2 rounded-xl">
                        💡 {item.question.penjelasan}
                      </p>
                    </div>

                    {/* Quick Link to Material if incorrect */}
                    {!item.isCorrect && item.question.materiSlug && (
                      <div className="mt-3 pt-2 border-t border-rose-100/60 flex justify-end">
                        <Link
                          to={`/pustaka/${item.question.materiSlug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-200 transition"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Baca Materi Terkait</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    );
  }

  // ==================== SCREEN 1: ACTIVE QUIZ PLAYER ====================
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <main className="min-h-screen bg-slate-50/70 flex flex-col justify-between p-4 sm:p-6 md:p-8">
      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="w-full max-w-sm bg-white rounded-[28px] p-6 text-center space-y-4 shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                Yakin Ingin Keluar?
              </h2>
              <p className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed">
                Progres kuis yang sedang kamu kerjakan saat ini tidak akan tersimpan jika kamu keluar sekarang.
              </p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowExitModal(false)}
                className="flex-1 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs transition"
              >
                Lanjut Kuis
              </button>
              <button
                type="button"
                onClick={() => navigate("/kuis")}
                className="flex-1 h-10 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-black text-xs transition"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TOP BAR ==================== */}
      <header className="max-w-3xl w-full mx-auto space-y-3">
        <div className="flex items-center justify-between gap-3">
          {/* Exit Button */}
          <button
            type="button"
            onClick={() => setShowExitModal(true)}
            aria-label="Keluar dari kuis"
            className="w-10 h-10 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 flex items-center justify-center shadow-2xs transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Streak Badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs truncate max-w-[180px] sm:max-w-xs">
              {quizTitle}
            </span>

            {streak >= 2 && (
              <span className="inline-flex items-center gap-1 text-xs font-black text-amber-900 bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-xl animate-in zoom-in">
                <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                <span>{streak}x Benar</span>
              </span>
            )}
          </div>

          {/* Timer or Hint Button */}
          <div className="flex items-center gap-2">
            {isTimerEnabled && (
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs border ${
                  timeLeft <= 5
                    ? "bg-rose-50 border-rose-300 text-rose-700 animate-pulse"
                    : "bg-white border-slate-200 text-slate-700"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{timeLeft}s</span>
              </div>
            )}

            <button
              type="button"
              disabled={hintUsedOnCurrentQuestion || isAnswerSubmitted}
              onClick={handleUseHint}
              title="Bantuan: hilangkan 1 pilihan salah"
              className={`h-10 px-3.5 rounded-2xl border flex items-center gap-1.5 text-xs font-black transition ${
                hintUsedOnCurrentQuestion
                  ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                  : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100 shadow-2xs cursor-pointer"
              }`}
            >
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">Bantuan</span>
            </button>
          </div>
        </div>

        {/* Progress Bar & Question Counter */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>
              Soal <strong className="text-slate-800">{currentIndex + 1}</strong> dari {questions.length}
            </span>
            <span>{progressPercent}%</span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-slate-200/80 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* ==================== CENTER: QUESTION CARD ==================== */}
      <section className="max-w-2xl w-full mx-auto my-6 space-y-5">
        <article className="rounded-[30px] border border-emerald-100 bg-white p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-6">
          {/* Question Text */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1 text-[10.5px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Pertanyaan</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
              {currentQuestion?.teks}
            </h2>
          </div>

          {/* Options Radiogroup */}
          <div
            role="radiogroup"
            aria-label="Pilihan Jawaban"
            className="space-y-3"
          >
            {currentOptions.map((option: QuizOption, optIndex: number) => {
              const isHidden = hiddenOptionIds.includes(option.id);
              const isSelected = selectedOptionId === option.id;
              const isCorrectAnswer = option.id === currentQuestion?.benarId;

              let optionStyle =
                "bg-slate-50 border-slate-200 text-slate-800 hover:bg-emerald-50/50 hover:border-emerald-300";

              if (isHidden) {
                optionStyle = "opacity-30 pointer-events-none bg-slate-100 border-slate-200 text-slate-400";
              } else if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  optionStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-200";
                } else if (isSelected && !isCorrectAnswer) {
                  optionStyle = "bg-rose-50 border-rose-400 text-rose-950 font-black";
                } else {
                  optionStyle = "opacity-50 bg-slate-50 border-slate-200 text-slate-500";
                }
              } else if (isSelected) {
                optionStyle = "bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-2 ring-sky-200";
              }

              const letterLabel = ["A", "B", "C", "D"][optIndex] || `${optIndex + 1}`;

              return (
                <button
                  key={option.id}
                  role="radio"
                  aria-checked={isSelected}
                  disabled={isAnswerSubmitted || isHidden}
                  type="button"
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all duration-150 cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                        isAnswerSubmitted && isCorrectAnswer
                          ? "bg-emerald-500 text-white"
                          : isAnswerSubmitted && isSelected
                          ? "bg-rose-500 text-white"
                          : isSelected
                          ? "bg-emerald-600 text-white"
                          : "bg-white border border-slate-200 text-slate-600"
                      }`}
                    >
                      {letterLabel}
                    </span>

                    <span className="text-[14px] leading-snug font-bold">
                      {option.teks}
                    </span>
                  </div>

                  {/* Feedback Icon */}
                  {isAnswerSubmitted && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Explanation Box */}
          {isAnswerSubmitted && currentQuestion && (
            <div
              className={`p-4 rounded-2xl border animate-in fade-in duration-200 space-y-1.5 ${
                selectedOptionId === currentQuestion.benarId
                  ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                  : "bg-amber-50/70 border-amber-200 text-amber-950"
              }`}
            >
              <div className="flex items-center gap-1.5 font-black text-xs">
                {selectedOptionId === currentQuestion.benarId ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Jawabanmu Tepat Sekali! 🎉</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <span>Yuk Pahami Bersama!</span>
                  </>
                )}
              </div>
              <p className="text-xs font-semibold leading-relaxed">
                {currentQuestion.penjelasan}
              </p>
            </div>
          )}
        </article>
      </section>

      {/* ==================== BOTTOM BAR / NEXT BUTTON ==================== */}
      <footer className="max-w-2xl w-full mx-auto flex items-center justify-between gap-4">
        <span className="text-[11.5px] font-bold text-slate-400">
          Tip: Gunakan tombol angka 1-4 atau A-D pada keyboard!
        </span>

        {isAnswerSubmitted && (
          <button
            type="button"
            onClick={handleNextQuestion}
            className="h-12 px-7 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-[13px] flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition"
          >
            <span>
              {currentIndex + 1 < questions.length
                ? "Lanjut Soal Berikutnya"
                : "Lihat Hasil Akhir"}
            </span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
        )}
      </footer>
    </main>
  );
}
