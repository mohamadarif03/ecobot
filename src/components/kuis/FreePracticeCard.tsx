import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Clock, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { QUIZ_TOPICS } from "../../data/kuis/topics";

export const FreePracticeCard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<string>("campur");
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [useTimer, setUseTimer] = useState<boolean>(false);

  const handleStartPractice = () => {
    const params = new URLSearchParams({
      mode: "latihan",
      jumlah: questionCount.toString(),
      timer: useTimer ? "true" : "false",
    });

    if (selectedTopic !== "campur") {
      params.set("topik", selectedTopic);
    }

    navigate(`/kuis/main?${params.toString()}`);
  };

  return (
    <article className="rounded-[24px] border border-sky-100 bg-gradient-to-br from-white via-sky-50/30 to-blue-50/20 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-sky-100/70">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20 shrink-0">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10.5px] font-black uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-sky-600" />
              Mode Latihan Bebas
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">
              Latihan Tanpa Beban
            </h3>
          </div>
        </div>

        <span className="text-[11.5px] font-bold text-slate-500 bg-slate-100/80 px-3 py-1 rounded-full self-start sm:self-auto">
          Asah Ingatan Kapan Saja
        </span>
      </div>

      <p className="text-[13px] text-slate-600 mt-3 leading-relaxed">
        Bebas pilih materi dan jumlah soal untuk berlatih. Cocok untuk menguji ingatan tanpa takut kehilangan skor.
      </p>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
        {/* Topic Picker */}
        <div className="space-y-1.5">
          <label className="text-xs font-black text-slate-700 block">
            Pilih Materi
          </label>
          <div className="relative">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full h-11 px-3.5 pr-8 rounded-xl bg-white border border-slate-200 text-slate-800 text-[13px] font-bold focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
            >
              <option value="campur">Campur (Semua Materi)</option>
              {QUIZ_TOPICS.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.judul}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Question Count */}
        <div className="space-y-1.5">
          <label className="text-xs font-black text-slate-700 block">
            Jumlah Soal
          </label>
          <div className="flex gap-2">
            {[5, 10].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setQuestionCount(count)}
                className={`flex-1 h-11 rounded-xl font-black text-xs transition border flex items-center justify-center gap-1 ${
                  questionCount === count
                    ? "bg-sky-500 text-white border-sky-500 shadow-xs"
                    : "bg-white text-slate-700 border-slate-200 hover:border-sky-300"
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{count} Soal</span>
              </button>
            ))}
          </div>
        </div>

        {/* Timer Toggle */}
        <div className="space-y-1.5">
          <label className="text-xs font-black text-slate-700 block">
            Tantangan Waktu
          </label>
          <button
            type="button"
            onClick={() => setUseTimer(!useTimer)}
            className={`w-full h-11 rounded-xl font-black text-xs transition border flex items-center justify-center gap-1.5 ${
              useTimer
                ? "bg-amber-500 text-white border-amber-500 shadow-xs"
                : "bg-white text-slate-700 border-slate-200 hover:border-amber-300"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{useTimer ? "Dengan Timer (30s)" : "Santai (Tanpa Timer)"}</span>
          </button>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-5 pt-4 border-t border-sky-100/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-[11.5px] text-slate-400 font-semibold">
          *Latihan bebas tidak memberi XP harian tambahan agar seimbang.
        </p>

        <button
          type="button"
          onClick={handleStartPractice}
          className="h-11 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-[13px] flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02] transition"
        >
          <span>Mulai Latihan Sekarang</span>
          <ArrowRight className="w-4 h-4 text-sky-400" />
        </button>
      </div>
    </article>
  );
};
