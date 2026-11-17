import React, { useState } from "react";
import { Lock, Sparkles, CheckCircle2, Filter } from "lucide-react";
import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";
import { BadgeDetailModal } from "./BadgeDetailModal";
import type { BadgeDefinition, BadgeCategory } from "../../data/pencapaian/types";

export interface EnrichedBadgeItem extends BadgeDefinition {
  unlocked: boolean;
  unlockedAt?: string;
  seen: boolean;
  currentProgress?: number;
}

interface BadgeGridProps {
  badges: EnrichedBadgeItem[];
  onMarkSeen: (badgeId: string) => void;
  selectedBadgeId?: string | null;
  onClearSelectedBadge?: () => void;
}

export const BadgeGrid: React.FC<BadgeGridProps> = ({
  badges,
  onMarkSeen,
  selectedBadgeId,
  onClearSelectedBadge,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [ownershipFilter, setOwnershipFilter] = useState<string>("all");
  const [activeModalBadge, setActiveModalBadge] = useState<EnrichedBadgeItem | null>(null);

  // If selectedBadgeId is passed from parent/right panel, open it
  React.useEffect(() => {
    if (selectedBadgeId) {
      const found = badges.find((b) => b.id === selectedBadgeId);
      if (found) {
        setActiveModalBadge(found);
        if (!found.seen && found.unlocked) {
          onMarkSeen(found.id);
        }
      }
    }
  }, [selectedBadgeId, badges, onMarkSeen]);

  // Categories
  const categories: { id: string; label: string }[] = [
    { id: "all", label: "Semua Kategori" },
    { id: "game", label: "Game 3D" },
    { id: "belajar", label: "Belajar" },
    { id: "kebiasaan", label: "Kebiasaan" },
    { id: "spesial", label: "Spesial" },
  ];

  // Ownership filters
  const hasNew = badges.some((b) => b.unlocked && !b.seen);
  const ownerships: { id: string; label: string }[] = [
    { id: "all", label: "Semua" },
    { id: "unlocked", label: "Sudah Dimiliki" },
    { id: "locked", label: "Belum Dimiliki" },
    ...(hasNew ? [{ id: "new", label: "Baru!" }] : []),
  ];

  // Filtered badges
  const filteredBadges = badges.filter((b) => {
    // Category match
    if (categoryFilter !== "all" && b.kategori !== categoryFilter) return false;
    // Ownership match
    if (ownershipFilter === "unlocked" && !b.unlocked) return false;
    if (ownershipFilter === "locked" && b.unlocked) return false;
    if (ownershipFilter === "new" && (!b.unlocked || b.seen)) return false;
    return true;
  });

  const handleCardClick = (badge: EnrichedBadgeItem) => {
    setActiveModalBadge(badge);
    if (badge.unlocked && !badge.seen) {
      onMarkSeen(badge.id);
    }
  };

  const handleCloseModal = () => {
    setActiveModalBadge(null);
    if (onClearSelectedBadge) {
      onClearSelectedBadge();
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategoryFilter(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                categoryFilter === c.id
                  ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Ownership Pills */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          {ownerships.map((o) => (
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

      {/* Badges Grid */}
      {filteredBadges.length === 0 ? (
        <Card className="p-8 text-center border-dashed border-2 border-slate-200">
          <p className="text-sm text-slate-500">
            Tidak ada lencana pada filter ini. Coba pilih filter lainnya!
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBadges.map((badge) => {
            const percent =
              badge.target && badge.target > 0
                ? Math.min(
                    100,
                    Math.round(((badge.currentProgress || 0) / badge.target) * 100)
                  )
                : badge.unlocked
                ? 100
                : 0;

            return (
              <button
                key={badge.id}
                onClick={() => handleCardClick(badge)}
                className={`group relative text-left p-4 rounded-2xl border transition-all flex flex-col justify-between hover:shadow-md active:scale-98 ${
                  badge.unlocked
                    ? "bg-gradient-to-b from-white to-amber-50/40 border-amber-200/90 shadow-sm hover:border-amber-400"
                    : "bg-slate-50/80 border-slate-200/80 text-slate-400 hover:border-slate-300"
                }`}
              >
                {/* Unread "Baru!" badge dot */}
                {badge.unlocked && !badge.seen && (
                  <span className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-extrabold uppercase animate-pulse">
                    Baru!
                  </span>
                )}

                <div>
                  {/* Badge Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-3 shadow-inner relative transition-transform group-hover:scale-105 ${
                      badge.unlocked
                        ? "bg-amber-100 text-amber-700 border-2 border-amber-300"
                        : "bg-slate-200/60 text-slate-400 border border-slate-200"
                    }`}
                  >
                    {badge.unlocked ? (
                      <span>{badge.ikon}</span>
                    ) : (
                      <div className="relative flex items-center justify-center">
                        <span className="opacity-30 filter grayscale">
                          {badge.ikon}
                        </span>
                        <Lock className="w-5 h-5 text-slate-400 absolute" />
                      </div>
                    )}
                  </div>

                  {/* Badge Title & Short Description */}
                  <h3
                    className={`font-bold text-sm leading-snug line-clamp-1 ${
                      badge.unlocked ? "text-slate-800" : "text-slate-500"
                    }`}
                  >
                    {badge.nama}
                  </h3>

                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {badge.deskripsi}
                  </p>
                </div>

                {/* Footer status / progress */}
                <div className="mt-3 pt-2.5 border-t border-slate-100/80 w-full">
                  {badge.unlocked ? (
                    <div className="flex items-center justify-between text-[10px] text-emerald-600 font-semibold">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Terbuka</span>
                      </span>
                      <span className="text-slate-400">
                        {badge.unlockedAt || "Didapat"}
                      </span>
                    </div>
                  ) : !badge.available ? (
                    <div className="text-[10px] text-slate-400 font-medium">
                      Segera Hadir
                    </div>
                  ) : badge.target > 1 ? (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                        <span>Progres</span>
                        <span>
                          {badge.currentProgress || 0}/{badge.target}
                        </span>
                      </div>
                      <ProgressBar progress={percent} color="amber" height="h-1.5" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                      <Lock className="w-2.5 h-2.5" />
                      <span>Belum terbuka</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      <BadgeDetailModal
        badge={activeModalBadge}
        isOpen={!!activeModalBadge}
        onClose={handleCloseModal}
      />
    </div>
  );
};
