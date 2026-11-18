import React from "react";
import { Link } from "react-router-dom";
import { X, Lock, CheckCircle2, BookOpen, Sparkles, ExternalLink } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import type { FactCardDefinition } from "../../data/pencapaian/types";

interface FactCardDetailModalProps {
  card: (FactCardDefinition & {
    unlocked: boolean;
    unlockedAt?: string;
    seen: boolean;
  }) | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FactCardDetailModal: React.FC<FactCardDetailModalProps> = ({
  card,
  isOpen,
  onClose,
}) => {
  if (!card) return null;

  const rarityMeta = {
    umum: {
      label: "Fakta Umum",
      color: "bg-slate-100 text-slate-700 border-slate-200",
      accent: "from-emerald-400 to-blue-500",
    },
    langka: {
      label: "Fakta Langka",
      color: "bg-indigo-100 text-indigo-800 border-indigo-200",
      accent: "from-indigo-500 to-purple-600",
    },
    epik: {
      label: "Fakta Epik",
      color: "bg-amber-100 text-amber-800 border-amber-300",
      accent: "from-amber-400 via-orange-500 to-yellow-500",
    },
  }[card.kelangkaan];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Kartu Fakta Edukasi">
      <div className="space-y-6 pt-1">
        {/* Big Card Visual */}
        <div
          className={`relative rounded-3xl p-6 text-white overflow-hidden shadow-xl bg-gradient-to-br ${
            card.unlocked ? rarityMeta.accent : "from-slate-600 to-slate-800"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-black/20 backdrop-blur-md">
              {card.unlocked ? rarityMeta.label : "Kartu Terkunci"}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm">
              {card.kategori}
            </span>
          </div>

          <div className="text-center py-4">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl mb-3 shadow-inner">
              {card.unlocked ? (
                <span>{card.ikon}</span>
              ) : (
                <Lock className="w-10 h-10 text-white/60" />
              )}
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight mb-2">
              {card.unlocked ? card.judul : "???"}
            </h2>
            <p className="text-xs md:text-sm text-white/90 leading-relaxed max-w-md mx-auto">
              {card.unlocked
                ? card.fakta
                : "Buka kartu ini dengan belajar dan menjalankan aksi pelestarian lingkungan!"}
            </p>
          </div>

          {card.unlocked && (
            <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] text-white/80">
              <span>Sumber: {card.sumberMateri}</span>
              <span>{card.unlockedAt || "Telah Dikoleksi"}</span>
            </div>
          )}
        </div>

        {/* Unlock Requirement Info */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
          <div className="text-xs font-bold text-slate-700">Cara Membuka:</div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {card.syaratTeks}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="ghost" size="md" onClick={onClose}>
            Tutup
          </Button>

          <Link
            to={card.pustakaSlug ? `/pustaka?materi=${card.pustakaSlug}` : "/pustaka"}
            onClick={onClose}
          >
            <Button variant="primary" size="md" className="gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Baca di Pustaka</span>
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
