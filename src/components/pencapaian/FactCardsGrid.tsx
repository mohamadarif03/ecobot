import React, { useState } from "react";
import { Lock, Sparkles, BookOpen, CheckCircle2 } from "lucide-react";
import Card from "../ui/Card";
import { FactCardDetailModal } from "./FactCardDetailModal";
import type { FactCardDefinition } from "../../data/pencapaian/types";

export interface EnrichedFactCardItem extends FactCardDefinition {
  unlocked: boolean;
  unlockedAt?: string;
  seen: boolean;
}

interface FactCardsGridProps {
  cards: EnrichedFactCardItem[];
  onMarkSeen: (cardId: string) => void;
}

export const FactCardsGrid: React.FC<FactCardsGridProps> = ({
  cards,
  onMarkSeen,
}) => {
  const [rarityFilter, setRarityFilter] = useState<string>("all");
  const [ownershipFilter, setOwnershipFilter] = useState<string>("all");
  const [activeCard, setActiveCard] = useState<EnrichedFactCardItem | null>(null);

  const rarityPills = [
    { id: "all", label: "Semua Kelangkaan" },
    {
      id: "umum",
      label: `Umum (${cards.filter((c) => c.kelangkaan === "umum").length})`,
    },
    {
      id: "langka",
      label: `Langka (${cards.filter((c) => c.kelangkaan === "langka").length})`,
    },
    {
      id: "epik",
      label: `Epik (${cards.filter((c) => c.kelangkaan === "epik").length})`,
    },
  ];

  const ownershipPills = [
    { id: "all", label: "Semua" },
    { id: "unlocked", label: "Sudah Dikoleksi" },
    { id: "locked", label: "Belum" },
  ];

  const filteredCards = cards.filter((c) => {
    if (rarityFilter !== "all" && c.kelangkaan !== rarityFilter) return false;
    if (ownershipFilter === "unlocked" && !c.unlocked) return false;
    if (ownershipFilter === "locked" && c.unlocked) return false;
    return true;
  });

  const handleCardClick = (card: EnrichedFactCardItem) => {
    setActiveCard(card);
    if (card.unlocked && !card.seen) {
      onMarkSeen(card.id);
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case "epik":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "langka":
        return "bg-indigo-100 text-indigo-800 border-indigo-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          {rarityPills.map((r) => (
            <button
              key={r.id}
              onClick={() => setRarityFilter(r.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                rarityFilter === r.id
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          {ownershipPills.map((o) => (
            <button
              key={o.id}
              onClick={() => setOwnershipFilter(o.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                ownershipFilter === o.id
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200/70"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      {filteredCards.length === 0 ? (
        <Card className="p-8 text-center border-dashed border-2 border-slate-200">
          <p className="text-sm text-slate-500">
            Tidak ada kartu fakta pada filter ini.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {filteredCards.map((card) => {
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`group relative text-left p-4 rounded-2xl border transition-all flex flex-col justify-between hover:shadow-md active:scale-98 ${
                  card.unlocked
                    ? card.kelangkaan === "epik"
                      ? "bg-gradient-to-br from-amber-50 to-orange-50/50 border-amber-300 shadow-sm hover:border-amber-400 ring-1 ring-amber-200/50"
                      : card.kelangkaan === "langka"
                      ? "bg-gradient-to-br from-indigo-50/50 to-sky-50/50 border-indigo-200 shadow-sm hover:border-indigo-400"
                      : "bg-white border-slate-200 hover:border-emerald-300"
                    : "bg-slate-50 border-slate-200/80 text-slate-400 hover:border-slate-300"
                }`}
              >
                {/* Unread "Baru!" dot */}
                {card.unlocked && !card.seen && (
                  <span className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-extrabold uppercase animate-pulse">
                    Baru!
                  </span>
                )}

                <div>
                  {/* Top info: Rarity tag & Category */}
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border ${getRarityBadge(
                        card.kelangkaan
                      )}`}
                    >
                      {card.kelangkaan}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate">
                      {card.kategori}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-2.5 shadow-inner transition-transform group-hover:scale-105 ${
                      card.unlocked
                        ? card.kelangkaan === "epik"
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : card.kelangkaan === "langka"
                          ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
                          : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-slate-200/60 text-slate-400"
                    }`}
                  >
                    {card.unlocked ? (
                      <span>{card.ikon}</span>
                    ) : (
                      <Lock className="w-5 h-5 text-slate-400" />
                    )}
                  </div>

                  {/* Title & Preview */}
                  <h4
                    className={`font-bold text-sm leading-snug line-clamp-1 ${
                      card.unlocked ? "text-slate-800" : "text-slate-500"
                    }`}
                  >
                    {card.unlocked ? card.judul : "???"}
                  </h4>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {card.unlocked ? card.fakta : card.syaratTeks}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                  {card.unlocked ? (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Terkoleksi</span>
                    </span>
                  ) : (
                    <span className="text-slate-400 font-medium">
                      Klik untuk cara buka
                    </span>
                  )}
                  <span className="text-emerald-600 font-medium group-hover:underline">
                    Detail &rarr;
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <FactCardDetailModal
        card={activeCard}
        isOpen={!!activeCard}
        onClose={() => setActiveCard(null)}
      />
    </div>
  );
};
