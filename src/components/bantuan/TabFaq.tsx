import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FAQ_ITEMS, FAQ_CATEGORIES } from "../../data/bantuan/faq";
import type { FaqCategory } from "../../data/bantuan/types";

export const TabFaq: React.FC = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory | "semua">("semua");
  const [openItemIds, setOpenItemIds] = useState<Record<string, boolean>>({});
  const [feedbackState, setFeedbackState] = useState<Record<string, "helpful" | "unhelpful">>({});

  // Auto-expand item if URL contains hash #faq-...
  useEffect(() => {
    if (location.hash && location.hash.startsWith("#faq-")) {
      const targetId = location.hash.replace("#", "");
      const found = FAQ_ITEMS.find((f) => f.id === targetId);
      if (found) {
        setSelectedCategory("semua");
        setOpenItemIds((prev) => ({ ...prev, [targetId]: true }));
        // Scroll to target element smoothly
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 200);
      }
    }
  }, [location.hash]);

  const toggleItem = (id: string) => {
    setOpenItemIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleFeedback = (id: string, type: "helpful" | "unhelpful") => {
    setFeedbackState((prev) => ({
      ...prev,
      [id]: type,
    }));
  };

  const filteredItems =
    selectedCategory === "semua"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter Chips */}
      <div>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Pilih Kategori Bantuan:
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Menampilkan {filteredItems.length} dari {FAQ_ITEMS.length} pertanyaan
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {FAQ_CATEGORIES.map((cat) => {
            const count =
              cat.id === "semua"
                ? FAQ_ITEMS.length
                : FAQ_ITEMS.filter((f) => f.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all active:scale-95 ${
                  selectedCategory === cat.id
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] ${
                    selectedCategory === cat.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const isOpen = Boolean(openItemIds[item.id]);
          const feedback = feedbackState[item.id];

          return (
            <div
              key={item.id}
              id={item.id}
              className={`rounded-3xl border-2 transition-all overflow-hidden ${
                isOpen
                  ? "bg-white border-emerald-300 shadow-md shadow-emerald-500/5"
                  : "bg-white border-slate-200/80 hover:border-slate-300"
              }`}
            >
              {/* Question Header */}
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">
                    {item.category === "bermain"
                      ? "🎮"
                      : item.category === "hadiah"
                      ? "🎁"
                      : item.category === "belajar"
                      ? "📚"
                      : item.category === "akun"
                      ? "🛡️"
                      : "⚙️"}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
                      {item.question}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-semibold text-slate-400">
                        #{item.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-slate-500 bg-slate-100 transition-transform ${
                    isOpen ? "rotate-180 bg-emerald-100 text-emerald-700" : ""
                  }`}
                >
                  ↓
                </div>
              </button>

              {/* Answer Content */}
              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-4 text-slate-700">
                  <p className="text-sm sm:text-base leading-relaxed">{item.answer}</p>

                  {/* Tips Box */}
                  {item.tips && (
                    <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm text-amber-950 flex items-start gap-2.5">
                      <span className="text-base flex-shrink-0">💡</span>
                      <span className="leading-snug">
                        <strong>Tips Ecobot:</strong> {item.tips}
                      </span>
                    </div>
                  )}

                  {/* Action Link & Feedback */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    {item.actionLink ? (
                      <Link
                        to={item.actionLink.href}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 transition-colors"
                      >
                        <span>{item.actionLink.label}</span>
                        <span>↗</span>
                      </Link>
                    ) : (
                      <div />
                    )}

                    {/* Helpfulness Feedback */}
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>Apakah jawaban ini membantu?</span>
                      {feedback ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-xl">
                          ✓ Terima kasih atas masukanmu!
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleFeedback(item.id, "helpful")}
                            className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-bold transition-colors"
                            title="Jawaban ini sangat membantu"
                          >
                            👍 Ya
                          </button>
                          <button
                            type="button"
                            onClick={() => handleFeedback(item.id, "unhelpful")}
                            className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 font-bold transition-colors"
                            title="Jawaban ini belum menjawab pertanyaanku"
                          >
                            👎 Belum Jelas
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
