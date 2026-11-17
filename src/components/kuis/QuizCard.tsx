import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Star,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import type { QuizTopicMeta } from "../../data/kuis/types";
import { usePlayerStore, getTopicStatus, getTopicQuizStats } from "../../store/playerStore";

interface QuizCardProps {
  topic: QuizTopicMeta;
}

export const QuizCard: React.FC<QuizCardProps> = ({ topic }) => {
  const { state } = usePlayerStore();
  const readingStatus = getTopicStatus(state, topic.slug);
  const quizStats = getTopicQuizStats(state, topic.id);

  const isMaterialRead = readingStatus === "selesai";

  return (
    <article className="rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-sky-200 transition-all duration-200 flex flex-col justify-between">
      {/* Top Section */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <span
                className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${topic.badgeBg}`}
              >
                KUIS TOPIK
              </span>
              <h3 className="text-[15.5px] font-black text-slate-900 leading-snug mt-1 truncate">
                {topic.judul}
              </h3>
            </div>
          </div>

          {/* Stars Earned */}
          <div className="flex items-center gap-0.5 shrink-0 bg-amber-50 px-2 py-1 rounded-full border border-amber-100/80">
            {[1, 2, 3].map((starIndex) => (
              <Star
                key={starIndex}
                className={`w-3.5 h-3.5 ${
                  starIndex <= quizStats.bestStars
                    ? "text-amber-400 fill-amber-400"
                    : "text-slate-200"
                }`}
              />
            ))}
          </div>
        </div>

        <p className="text-[12.5px] text-slate-500 line-clamp-2 leading-relaxed">
          {topic.deskripsi}
        </p>

        {/* Reading Status Pill */}
        <div>
          {isMaterialRead ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Materi sudah dibaca</span>
            </span>
          ) : (
            <Link
              to={`/pustaka/${topic.slug}`}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-2.5 py-0.5 rounded-full transition"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-600" />
              <span>Baca materinya dulu (lebih mudah!)</span>
            </Link>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
            <span>5 Soal</span>
            <span>·</span>
            {quizStats.attempts > 0 ? (
              <span className="text-emerald-700 font-extrabold">
                Skor Terbaik: {quizStats.bestScore}/5
              </span>
            ) : (
              <span>Belum dikerjakan</span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <span className="inline-flex items-center gap-1 text-[10.5px] font-black text-sky-800">
              <Sparkles className="w-3 h-3 text-sky-600" />
              <span>+30 XP</span>
            </span>
            <span className="text-[10px] text-slate-400 font-bold">(+10 jika 100%)</span>
          </div>
        </div>

        <Link
          to={`/kuis/main?mode=topik&topik=${topic.id}&jumlah=5`}
          className="h-10 px-4 rounded-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-slate-950 font-black text-[12.5px] flex items-center gap-1.5 shadow-2xs hover:scale-105 transition shrink-0"
        >
          <span>{quizStats.attempts > 0 ? "Ulangi" : "Mulai Kuis"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
