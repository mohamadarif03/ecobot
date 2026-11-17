import React, { useEffect, useRef } from "react";
import {
  X,
  Check,
  Sparkles,
  ShieldAlert,
  Clock,
  Layers,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import type { CreativeIdea } from "../../data/aksiNyata/types";

interface IdeaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  idea: CreativeIdea;
  isTried: boolean;
  onMarkTried: (id: string) => void;
}

export const IdeaDetailModal: React.FC<IdeaDetailModalProps> = ({
  isOpen,
  onClose,
  idea,
  isTried,
  onMarkTried,
}) => {
  const tryButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      tryButtonRef.current?.focus();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="idea-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="w-full max-w-lg bg-white rounded-[32px] p-6 sm:p-7 shadow-2xl border border-sky-100 relative my-8 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
                {idea.difficulty} · {idea.estimatedTime}
              </span>
              {isTried && (
                <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Sudah Dicoba
                </span>
              )}
            </div>
            <h3 id="idea-title" className="text-xl font-black text-slate-900">
              {idea.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup panduan"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Safety Note */}
        {idea.needsAdultSupervision && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900 font-bold leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-black text-amber-950">Catatan Keselamatan Anak</p>
              <p className="font-semibold text-amber-800 mt-0.5">
                {idea.adultNote || idea.safetyNote}
              </p>
            </div>
          </div>
        )}

        {/* Materials List */}
        <div className="space-y-2">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-500" />
            <span>Alat & Bahan</span>
          </h4>
          <ul className="text-xs text-slate-700 font-semibold space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            {idea.materials.map((mat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                <span>{mat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Numbered Steps */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
            Langkah-Langkah Pembuatan
          </h4>
          <ol className="space-y-2 text-xs font-semibold text-slate-700">
            {idea.steps.map((step, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-100 shadow-2xs"
              >
                <span className="w-6 h-6 rounded-lg bg-sky-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="leading-relaxed mt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Tips */}
        {idea.tips && (
          <div className="flex items-start gap-2 p-3 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs text-sky-900 font-semibold">
            <Lightbulb className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <p>
              <strong className="font-black">Tips Keren: </strong>
              {idea.tips}
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
            <span>Hadiah:</span>
            <span className="font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              +{idea.rewardXp} XP · +{idea.rewardPoints} Poin
            </span>
          </div>

          {isTried ? (
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-100 px-4 py-2 rounded-full">
              <Check className="w-4 h-4 stroke-[3] text-emerald-600" />
              <span>Sudah Dicoba di Rumah!</span>
            </div>
          ) : (
            <button
              ref={tryButtonRef}
              type="button"
              onClick={() => {
                onMarkTried(idea.id);
                onClose();
              }}
              className="h-11 px-6 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 hover:scale-105 active:scale-95 transition"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Aku Sudah Mencobanya!</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
