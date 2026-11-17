import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  History,
  Timer,
  Star,
  Award,
  Zap,
} from "lucide-react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import {
  usePlayerStore,
  getTodayQuizStatus,
  getQuizSummary,
} from "../store/playerStore";
import { QUIZ_TOPICS } from "../data/kuis/topics";
import { QuizCard } from "../components/kuis/QuizCard";
import { FreePracticeCard } from "../components/kuis/FreePracticeCard";
import { QuizReportPanel } from "../components/kuis/QuizReportPanel";
import { QuizDailyCountdown } from "../components/kuis/QuizDailyCountdown";
import { EcobotMascot } from "../components/ecobot/EcobotMascot";
import type { QuizHistoryItem } from "../types/player";

type QuizTabType = "kuis" | "riwayat" | "duel";

export default function KuisPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabParam = searchParams.get("tab") as QuizTabType | null;
  const activeTab: QuizTabType =
    activeTabParam === "riwayat" || activeTabParam === "duel"
      ? activeTabParam
      : "kuis";

  const { state } = usePlayerStore();
  const dailyStatus = getTodayQuizStatus(state);
  const summary = getQuizSummary(state);

  // History filtering
  const [historyFilter, setHistoryFilter] = useState<
    "semua" | "harian" | "topik" | "latihan"
  >("semua");

  // Redirect to onboarding if nickname is not set
  useEffect(() => {
    if (!state.nickname || state.nickname.trim() === "") {
      navigate("/onboarding");
    }
  }, [state.nickname, navigate]);

  const handleSelectTab = (tab: QuizTabType) => {
    setSearchParams({ tab });
  };

  const heroTitle = dailyStatus.completed
    ? "Kuis hari ini selesai. Hebat!"
    : "Kuis harian menunggumu!";

  const filteredHistory = (state.quizProgress?.history || []).filter((item) => {
    if (historyFilter === "semua") return true;
    return item.mode === historyFilter;
  });

  return (
    <DashboardLayout
      title="Kuis & Tantangan"
      subtitle="Uji pengetahuanmu, Ecobot siap menemani"
    >
      {/* ==================== HERO BANNER ==================== */}
      <section className="rounded-[26px] bg-gradient-to-r from-[#38BDF8] via-[#20B5F0] to-[#0EA5E9] px-6 sm:px-8 py-6 relative overflow-hidden shadow-[0_4px_20px_rgba(14,165,233,0.18)] min-h-[178px] flex flex-col justify-between mb-6">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-16 left-1/3 w-56 h-56 bg-sky-300/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-xl">
          {/* Label */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-[11px] font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Dari Ecobot</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-[28px] font-black text-white tracking-tight leading-tight">
            {heroTitle}
          </h2>

          {/* Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-white text-xs font-bold border border-white/20">
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>
                Kuis Harian:{" "}
                <strong className="font-black">
                  {dailyStatus.completed ? "Selesai" : "Belum"}
                </strong>
              </span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-white text-xs font-bold border border-white/20">
              <Star className="w-3.5 h-3.5 text-amber-300" />
              <span>
                Rata-rata:{" "}
                <strong className="font-black">{summary.avgScore}%</strong>
              </span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-white text-xs font-bold border border-white/20">
              <Award className="w-3.5 h-3.5 text-sky-100" />
              <span>
                <strong className="font-black">{summary.totalQuizzes}</strong> Kuis Selesai
              </span>
            </span>
          </div>

          {/* CTA */}
          <Link
            to="/kuis/main?mode=harian"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-sky-900 font-black text-[13px] hover:bg-sky-50 shadow-md hover:scale-105 active:scale-95 transition"
          >
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{dailyStatus.completed ? "Main Latihan Lagi" : "Mulai Kuis Harian"}</span>
            <ArrowRight className="w-4 h-4 text-sky-700" />
          </Link>
        </div>

        {/* Mascot */}
        <div className="absolute right-3 sm:right-6 bottom-0 w-28 sm:w-36 h-32 sm:h-40 flex items-end justify-center pointer-events-none">
          <EcobotMascot
            pose={dailyStatus.completed ? "happy" : "wave"}
            size="banner"
            className="w-full h-full object-contain filter drop-shadow-lg"
          />
        </div>
      </section>

      {/* ==================== TABS NAVIGATION ==================== */}
      <div
        role="tablist"
        aria-label="Pilihan Menu Kuis"
        className="bg-white rounded-2xl p-1.5 shadow-[0_2px_10px_rgba(14,165,233,0.05)] border border-sky-100 flex items-center gap-1.5 select-none mb-6 max-w-md"
      >
        <button
          role="tab"
          id="tab-kuis"
          aria-selected={activeTab === "kuis"}
          aria-controls="panel-kuis"
          onClick={() => handleSelectTab("kuis")}
          className={`flex-1 py-2.5 px-3 rounded-xl font-black text-[13px] flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === "kuis"
              ? "bg-gradient-to-r from-sky-400 to-sky-500 text-slate-950 shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-sky-50/60"
          }`}
        >
          <span>Kuis</span>
        </button>

        <button
          role="tab"
          id="tab-riwayat"
          aria-selected={activeTab === "riwayat"}
          aria-controls="panel-riwayat"
          onClick={() => handleSelectTab("riwayat")}
          className={`flex-1 py-2.5 px-3 rounded-xl font-black text-[13px] flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === "riwayat"
              ? "bg-gradient-to-r from-sky-400 to-sky-500 text-slate-950 shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-sky-50/60"
          }`}
        >
          <History className="w-4 h-4" />
          <span>Riwayat</span>
        </button>

        <button
          role="tab"
          id="tab-duel"
          aria-selected={activeTab === "duel"}
          aria-controls="panel-duel"
          onClick={() => handleSelectTab("duel")}
          className={`flex-1 py-2.5 px-3 rounded-xl font-black text-[13px] flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === "duel"
              ? "bg-gradient-to-r from-sky-400 to-sky-500 text-slate-950 shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-sky-50/60"
          }`}
        >
          <Timer className="w-4 h-4" />
          <span>Duel Skor</span>
        </button>
      </div>

      {/* ==================== TAB 1: KUIS ==================== */}
      {activeTab === "kuis" && (
        <div id="panel-kuis" role="tabpanel" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Kuis Harian Card */}
            <article className="rounded-[24px] border border-sky-100 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
                    <Zap className="w-6 h-6 fill-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                        Setiap Hari Baru
                      </span>
                      {dailyStatus.completed && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Sudah Selesai
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mt-1">
                      Kuis Harian Ecobot
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 self-start sm:self-auto">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Reset dalam:</span>
                  <strong className="text-slate-700">
                    <QuizDailyCountdown />
                  </strong>
                </div>
              </div>

              <p className="text-[13px] text-slate-600 leading-relaxed">
                5 soal acak dari seluruh bank materi untuk mengasah ingatanmu. Kerjakan setiap hari untuk mengumpulkan hadiah XP dan koin daur ulang!
              </p>

              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>+40 XP & +15 Poin</span>
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    (1x per hari)
                  </span>
                </div>

                <Link
                  to="/kuis/main?mode=harian"
                  className="h-11 px-6 rounded-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-slate-950 font-black text-[13px] flex items-center justify-center gap-2 shadow-2xs hover:scale-105 transition"
                >
                  <span>
                    {dailyStatus.completed ? "Latihan Ulang Kuis Harian" : "Mulai Kuis Harian"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>

            {/* Grid 6 Kuis per Materi */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Kuis per Materi
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    Uji pemahamanmu setelah membaca di Pustaka
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {QUIZ_TOPICS.map((topic) => (
                  <QuizCard key={topic.id} topic={topic} />
                ))}
              </div>
            </div>

            {/* Latihan Bebas Card */}
            <FreePracticeCard />
          </div>

          {/* Right Column: Quiz Report Panel */}
          <QuizReportPanel />
        </div>
      )}

      {/* ==================== TAB 2: RIWAYAT ==================== */}
      {activeTab === "riwayat" && (
        <div id="panel-riwayat" role="tabpanel" className="max-w-4xl space-y-5">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-2">
            {(["semua", "harian", "topik", "latihan"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setHistoryFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-black capitalize transition ${
                  historyFilter === filter
                    ? "bg-sky-500 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-sky-300"
                }`}
              >
                {filter === "semua" ? "Semua Kuis" : `Mode ${filter}`}
              </button>
            ))}
          </div>

          {/* History List */}
          {filteredHistory.length > 0 ? (
            <div className="space-y-3">
              {filteredHistory.map((item: QuizHistoryItem) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {item.mode}
                      </span>
                      <h4 className="text-[14.5px] font-black text-slate-900">
                        {item.topicTitle || (item.mode === "harian" ? "Kuis Harian" : "Latihan Bebas")}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 font-bold">
                      <span>{new Date(item.at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}</span>
                      <span>·</span>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3].map((starIdx) => (
                          <Star
                            key={starIdx}
                            className={`w-3.5 h-3.5 ${
                              starIdx <= item.stars
                                ? "text-amber-400 fill-amber-400"
                                : "text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6 shrink-0 self-end sm:self-auto">
                    <div className="text-right">
                      <p className="text-lg font-black text-slate-900 leading-tight">
                        {item.score}/{item.total}{" "}
                        <span className="text-xs font-bold text-slate-400">
                          ({Math.round((item.score / Math.max(1, item.total)) * 100)}%)
                        </span>
                      </p>
                      <p className="text-[11px] font-extrabold text-emerald-700">
                        +{item.xpEarned} XP · +{item.pointsEarned} Poin
                      </p>
                    </div>

                    <Link
                      to={
                        item.mode === "topik" && item.topikId
                          ? `/kuis/main?mode=topik&topik=${item.topikId}&jumlah=5`
                          : item.mode === "harian"
                          ? "/kuis/main?mode=harian"
                          : "/kuis/main?mode=latihan&jumlah=5"
                      }
                      className="h-9 px-4 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-800 font-black text-xs border border-sky-200 flex items-center gap-1.5 transition"
                    >
                      <span>Coba Lagi</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[24px] border border-dashed border-slate-200 bg-white p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-sky-50 text-sky-500 mx-auto flex items-center justify-center">
                <History className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto">
                <h4 className="text-base font-black text-slate-900">
                  Belum Ada Riwayat Kuis
                </h4>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  Kamu belum mengerjakan kuis dalam kategori ini. Yuk selesaikan kuis harian pertamamu!
                </p>
              </div>
              <Link
                to="/kuis/main?mode=harian"
                className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-black text-xs shadow-xs transition"
              >
                <span>Mulai Kuis Harian Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* ==================== TAB 3: DUEL SKOR ==================== */}
      {activeTab === "duel" && (
        <div id="panel-duel" role="tabpanel" className="max-w-3xl space-y-6">
          <article className="rounded-[24px] border border-amber-200 bg-gradient-to-br from-amber-500/10 via-amber-50/50 to-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/25 shrink-0">
                <Timer className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900">
                  Tantangan Kilat
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Duel Waktu: Tantang Rekormu Sendiri!
                </h3>
              </div>
            </div>

            <p className="text-[13.5px] text-slate-600 leading-relaxed">
              Uji ketangkasan dan fokusmu! Dalam mode Duel Waktu, kamu akan menghadapi 10 soal acak dari seluruh materi dengan batas waktu 30 detik untuk setiap soal.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-amber-100 shadow-2xs">
                <p className="text-xs font-bold text-slate-400">Aturan Main</p>
                <ul className="text-xs text-slate-700 font-semibold space-y-1.5 mt-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>10 soal acak dari 6 materi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>30 detik per nomor soal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>Pilihan ganda dengan umpan balik cepat</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-amber-100 shadow-2xs">
                <p className="text-xs font-bold text-slate-400">Rekor Pribadimu</p>
                <p className="text-2xl font-black text-amber-600 mt-2">
                  {summary.perfectCount > 0
                    ? `${summary.perfectCount}x Nilai 100%`
                    : `${summary.avgScore}% Rata-rata`}
                </p>
                <p className="text-[11.5px] text-slate-400 font-bold mt-1">
                  Total kuis diselesaikan: {summary.totalQuizzes} kali
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-amber-100 flex items-center justify-between gap-4">
              <p className="text-xs text-slate-500 font-semibold">
                Siap memecahkan rekor skor tertinggi hari ini?
              </p>

              <Link
                to="/kuis/main?mode=latihan&jumlah=10&timer=true"
                className="h-11 px-6 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-black text-[13px] flex items-center gap-2 shadow-md hover:scale-105 transition"
              >
                <span>Mulai Duel Waktu Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        </div>
      )}
    </DashboardLayout>
  );
}
