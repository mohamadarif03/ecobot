import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Award,
  BookOpen,
  Trash2,
  CheckCircle2,
  Calendar,
  Flame,
  Star,
  Target,
  Lightbulb,
  Clock,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import type { RadarScoreInfo } from "../../data/pencapaian/types";
import type { ActivityItem } from "../../types/player";

interface StatsTabProps {
  stats: {
    trashSorted: number;
    sortingAccuracy: number;
    starsEarned: number;
    cityMeter: number;
    completedTopics: number;
    cardsRead: number;
    totalQuizzes: number;
    quizCorrect: number;
    quizAccuracy: number;
    perfectQuizzes: number;
    challengeDays: number;
    ideasTried: number;
    streak: number;
    longestStreak: number;
    activeDays: number;
    points: number;
  };
  radarScores: RadarScoreInfo;
  activityLog: ActivityItem[];
}

export const StatsTab: React.FC<StatsTabProps> = ({
  stats,
  radarScores,
  activityLog,
}) => {
  // Radar chart SVG calculation
  const cx = 140;
  const cy = 140;
  const maxR = 90;

  // 4 axes:
  // Axis 0: Memilah (Top, -90 deg = -PI/2)
  // Axis 1: Pengetahuan (Right, 0 deg = 0)
  // Axis 2: Aksi Nyata (Bottom, 90 deg = PI/2)
  // Axis 3: Konsistensi (Left, 180 deg = PI)
  const axes = [
    { label: "Memilah", score: radarScores.memilah, angle: -Math.PI / 2 },
    { label: "Pengetahuan", score: radarScores.pengetahuan, angle: 0 },
    { label: "Aksi Nyata", score: radarScores.aksiNyata, angle: Math.PI / 2 },
    { label: "Konsistensi", score: radarScores.konsistensi, angle: Math.PI },
  ];

  const getCoordinates = (value: number, angle: number) => {
    const r = (Math.max(0, Math.min(100, value)) / 100) * maxR;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  const polygonPoints = axes
    .map((axis) => {
      const { x, y } = getCoordinates(axis.score, axis.angle);
      return `${x},${y}`;
    })
    .join(" ");

  // Grid levels (25, 50, 75, 100)
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  const statCards = [
    {
      label: "Sampah Dipilah",
      value: `${stats.trashSorted} item`,
      sub: "Di Game Kota Harapan",
      icon: <Trash2 className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50",
    },
    {
      label: "Akurasi Pemilahan",
      value: `${stats.sortingAccuracy}%`,
      sub: "Rata-rata ketelitian",
      icon: <Target className="w-5 h-5 text-teal-600" />,
      bg: "bg-teal-50",
    },
    {
      label: "Bintang Game",
      value: `${stats.starsEarned} / 18`,
      sub: "Bintang misi tercapai",
      icon: <Star className="w-5 h-5 text-amber-500" />,
      bg: "bg-amber-50",
    },
    {
      label: "Kebersihan Kota",
      value: `${stats.cityMeter}%`,
      sub: "Meter Kota Harapan",
      icon: <TrendingUp className="w-5 h-5 text-sky-600" />,
      bg: "bg-sky-50",
    },
    {
      label: "Materi Selesai",
      value: `${stats.completedTopics} / 6`,
      sub: "Materi Pustaka dibaca",
      icon: <BookOpen className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      label: "Kartu Pustaka Dibaca",
      value: `${stats.cardsRead} kartu`,
      sub: "Total kartu dipelajari",
      icon: <Sparkles className="w-5 h-5 text-indigo-600" />,
      bg: "bg-indigo-50",
    },
    {
      label: "Kuis Diikuti",
      value: `${stats.totalQuizzes} kali`,
      sub: "Kuis harian & topik",
      icon: <Award className="w-5 h-5 text-purple-600" />,
      bg: "bg-purple-50",
    },
    {
      label: "Akurasi Kuis",
      value: `${stats.quizAccuracy}%`,
      sub: `${stats.quizCorrect} jawaban benar`,
      icon: <CheckCircle2 className="w-5 h-5 text-violet-600" />,
      bg: "bg-violet-50",
    },
    {
      label: "Kuis Sempurna",
      value: `${stats.perfectQuizzes} kali`,
      sub: "Skor 100 tanpa salah",
      icon: <Star className="w-5 h-5 text-yellow-600" />,
      bg: "bg-yellow-50",
    },
    {
      label: "Hari Tantangan",
      value: `${stats.challengeDays} / 7 hari`,
      sub: "Aksi ramah lingkungan",
      icon: <Calendar className="w-5 h-5 text-rose-600" />,
      bg: "bg-rose-50",
    },
    {
      label: "Ide Daur Ulang",
      value: `${stats.ideasTried} dicoba`,
      sub: "Karya kreasi di rumah",
      icon: <Lightbulb className="w-5 h-5 text-orange-600" />,
      bg: "bg-orange-50",
    },
    {
      label: "Streak Belajar",
      value: `${stats.streak} hari`,
      sub: `Terpanjang: ${stats.longestStreak} hari`,
      icon: <Flame className="w-5 h-5 text-red-500" />,
      bg: "bg-red-50",
    },
    {
      label: "Hari Aktif",
      value: `${stats.activeDays} hari`,
      sub: "Kunjungan belajar",
      icon: <Clock className="w-5 h-5 text-cyan-600" />,
      bg: "bg-cyan-50",
    },
    {
      label: "Poin Lingkungan",
      value: `${stats.points}`,
      sub: "Poin aksi tersimpan",
      icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Rapor Kepedulian (Radar Chart Section) */}
      <Card className="p-6 md:p-8 border-slate-100 shadow-sm bg-gradient-to-br from-white via-sky-50/20 to-emerald-50/20">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Radar Chart SVG */}
          <div className="relative flex-shrink-0 flex flex-col items-center">
            <svg
              width="280"
              height="280"
              viewBox="0 0 280 280"
              className="overflow-visible"
            >
              {/* Concentric grid circles/polygons */}
              {gridLevels.map((lvl, idx) => (
                <polygon
                  key={idx}
                  points={axes
                    .map((axis) => {
                      const r = lvl * maxR;
                      return `${cx + r * Math.cos(axis.angle)},${
                        cy + r * Math.sin(axis.angle)
                      }`;
                    })
                    .join(" ")}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray={idx === 3 ? "none" : "3,3"}
                />
              ))}

              {/* Axis lines */}
              {axes.map((axis, idx) => {
                const end = getCoordinates(100, axis.angle);
                return (
                  <line
                    key={idx}
                    x1={cx}
                    y1={cy}
                    x2={end.x}
                    y2={end.y}
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                  />
                );
              })}

              {/* Player Score Polygon */}
              <polygon
                points={polygonPoints}
                fill="rgba(14, 165, 233, 0.25)"
                stroke="#0284c7"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {axes.map((axis, idx) => {
                const pt = getCoordinates(axis.score, axis.angle);
                return (
                  <circle
                    key={idx}
                    cx={pt.x}
                    cy={pt.y}
                    r="4.5"
                    fill="#0284c7"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                );
              })}

              {/* Axis Labels */}
              <text
                x={cx}
                y={cy - maxR - 12}
                textAnchor="middle"
                className="text-[11px] font-bold fill-slate-700"
              >
                Memilah ({radarScores.memilah}%)
              </text>
              <text
                x={cx + maxR + 10}
                y={cy + 4}
                textAnchor="start"
                className="text-[11px] font-bold fill-slate-700"
              >
                Pengetahuan ({radarScores.pengetahuan}%)
              </text>
              <text
                x={cx}
                y={cy + maxR + 18}
                textAnchor="middle"
                className="text-[11px] font-bold fill-slate-700"
              >
                Aksi Nyata ({radarScores.aksiNyata}%)
              </text>
              <text
                x={cx - maxR - 10}
                y={cy + 4}
                textAnchor="end"
                className="text-[11px] font-bold fill-slate-700"
              >
                Konsistensi ({radarScores.konsistensi}%)
              </text>
            </svg>
          </div>

          {/* Rapor Details & Ecobot Advice */}
          <div className="flex-1 space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Target className="w-3.5 h-3.5" />
                <span>Rapor Kepedulian Lingkungan</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-800">
                Peta Keseimbangan Aksi Bumi
              </h3>
              <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">
                Rapor ini mengukur 4 pilar penting pahlawan lingkungan:
                ketelitian memilah sampah, wawasan materi, aksi nyata di rumah,
                dan ketekunan belajar setiap hari.
              </p>
            </div>

            {/* Ecobot Suggestion Box */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-200 flex items-center justify-center text-xl flex-shrink-0">
                  🤖
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-900 mb-0.5">
                    Saran Ecobot untukmu:
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    {radarScores.saranEcobot}
                  </p>
                </div>
              </div>

              <Link to={radarScores.tautanSaran} className="flex-shrink-0">
                <Button variant="primary" size="sm" className="gap-1.5 text-xs">
                  <span>Mulai Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>

      {/* 2. 14 Key Statistics Cards */}
      <div>
        <h3 className="font-extrabold text-slate-800 text-lg mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-sky-600" />
          <span>Statistik Lengkap Aktivitas</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {statCards.map((card, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-600 truncate">
                  {card.label}
                </span>
                <div className={`p-2 rounded-xl ${card.bg}`}>{card.icon}</div>
              </div>

              <div>
                <div className="text-lg md:text-xl font-extrabold text-slate-800">
                  {card.value}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {card.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Recent Activity Log */}
      <Card className="p-6 border-slate-100 shadow-sm">
        <h3 className="font-extrabold text-slate-800 text-base mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-500" />
          <span>Riwayat Aktivitas Terakhir</span>
        </h3>

        {activityLog.length === 0 ? (
          <p className="text-xs text-slate-400 italic text-center py-4">
            Belum ada aktivitas tercatat.
          </p>
        ) : (
          <div className="space-y-3">
            {activityLog.slice(0, 8).map((act) => (
              <div
                key={act.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold flex-shrink-0">
                    {act.type === "game"
                      ? "🎮"
                      : act.type === "quiz"
                      ? "📝"
                      : act.type === "reading"
                      ? "📖"
                      : act.type === "action"
                      ? "🌱"
                      : "🏆"}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-800 truncate">
                      {act.title}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {act.description}
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 ml-3">
                  <div className="text-[10px] text-slate-400 font-medium">
                    {act.timestamp}
                  </div>
                  {act.xpEarned > 0 && (
                    <div className="text-[11px] font-bold text-amber-600">
                      +{act.xpEarned} XP
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
