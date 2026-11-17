import React, { useState } from "react";
import {
  Clock,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Sprout,
  Pencil,
  PiggyBank,
} from "lucide-react";
import type { CreativeIdea } from "../../data/aksiNyata/types";
import { IdeaDetailModal } from "./IdeaDetailModal";

interface CreativeIdeaCardProps {
  idea: CreativeIdea;
  isTried: boolean;
  onMarkTried: (id: string) => void;
}

export const CreativeIdeaCard: React.FC<CreativeIdeaCardProps> = ({
  idea,
  isTried,
  onMarkTried,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getIdeaIcon = (iconName: string) => {
    switch (iconName) {
      case "Sprout":
        return <Sprout className="w-6 h-6" />;
      case "Pencil":
        return <Pencil className="w-6 h-6" />;
      case "PiggyBank":
        return <PiggyBank className="w-6 h-6" />;
      case "Sparkles":
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <>
      <IdeaDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        idea={idea}
        isTried={isTried}
        onMarkTried={onMarkTried}
      />

      <article className="rounded-[24px] border border-slate-100 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:border-sky-200 transition-all duration-200">
        <div className="space-y-3.5">
          {/* Top header */}
          <div className="flex items-start justify-between gap-3">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${idea.color} text-white flex items-center justify-center shadow-md shadow-sky-500/10 shrink-0`}
            >
              {getIdeaIcon(idea.icon)}
            </div>

            <div className="flex flex-col items-end gap-1">
              {isTried ? (
                <span className="inline-flex items-center gap-1 text-[10.5px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Sudah Dicoba
                </span>
              ) : (
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {idea.difficulty}
                </span>
              )}

              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{idea.estimatedTime}</span>
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-[15.5px] font-black text-slate-900 leading-snug">
              {idea.title}
            </h4>
            <p className="text-[12.5px] text-slate-600 leading-relaxed mt-1 line-clamp-2">
              {idea.description}
            </p>
          </div>

          {idea.needsAdultSupervision && (
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-100">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>Butuh bantuan orang dewasa</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <span className="text-xs font-black text-emerald-700">
              +{idea.rewardXp} XP
            </span>
            <span className="text-[11px] text-slate-400 font-bold">· +{idea.rewardPoints} Poin</span>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="h-9 px-4 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-800 font-black text-xs border border-sky-200 flex items-center gap-1.5 transition cursor-pointer"
          >
            <span>Lihat Caranya</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </article>
    </>
  );
};
