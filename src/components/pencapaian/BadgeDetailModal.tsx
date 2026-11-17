import React from "react";
import { Link } from "react-router-dom";
import { X, Lock, CheckCircle2, Award, Sparkles, ExternalLink } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import ProgressBar from "../ui/ProgressBar";
import type { BadgeDefinition } from "../../data/pencapaian/types";

interface BadgeDetailModalProps {
  badge: (BadgeDefinition & {
    unlocked: boolean;
    unlockedAt?: string;
    seen: boolean;
    currentProgress?: number;
  }) | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({
  badge,
  isOpen,
  onClose,
}) => {
  if (!badge) return null;

  const percent =
    badge.target && badge.target > 0
      ? Math.min(100, Math.round(((badge.currentProgress || 0) / badge.target) * 100))
      : badge.unlocked
      ? 100
      : 0;

  const categoryLabels: Record<string, { label: string; color: string }> = {
    game: { label: "Game 3D", color: "bg-emerald-100 text-emerald-800" },
    belajar: { label: "Pustaka & Kuis", color: "bg-sky-100 text-sky-800" },
    kebiasaan: { label: "Aksi Nyata", color: "bg-amber-100 text-amber-800" },
    spesial: { label: "Lencana Spesial", color: "bg-purple-100 text-purple-800" },
  };

  const cat = categoryLabels[badge.kategori] || {
    label: badge.kategori,
    color: "bg-slate-100 text-slate-700",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detail Lencana">
      <div className="space-y-6 pt-1">
        {/* Header with big badge icon */}
        <div className="flex flex-col items-center text-center">
          <div
            className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mb-3 shadow-lg relative ${
              badge.unlocked
                ? "bg-gradient-to-tr from-amber-200 to-yellow-400 border-4 border-yellow-300 ring-4 ring-yellow-100/80 animate-bounce-short"
                : "bg-slate-100 border-4 border-slate-200 text-slate-400"
            }`}
          >
            {badge.unlocked ? (
              <span>{badge.ikon}</span>
            ) : (
              <div className="relative flex items-center justify-center">
                <span className="opacity-30 filter grayscale">{badge.ikon}</span>
                <Lock className="w-8 h-8 text-slate-400 absolute" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-1">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${cat.color}`}
            >
              {cat.label}
            </span>
            {badge.unlocked ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Terbuka</span>
              </span>
            ) : !badge.available ? (
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                Segera Hadir
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                <Lock className="w-3 h-3" />
                <span>Terkunci</span>
              </span>
            )}
          </div>

          <h2 className="text-xl font-extrabold text-slate-800">{badge.nama}</h2>
          <p className="text-sm text-slate-600 mt-1 max-w-sm">{badge.deskripsi}</p>
        </div>

        {/* Progress or Unlock Info */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Syarat Pembukaan:</span>
            {badge.unlocked ? (
              <span className="text-emerald-600 font-semibold">
                {badge.unlockedAt || "Tercapai!"}
              </span>
            ) : (
              <span className="text-slate-500 font-medium">
                {badge.currentProgress || 0} / {badge.target || 1}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {badge.syaratTeks}
          </p>

          {!badge.unlocked && badge.available && badge.target > 1 && (
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                <span>Progres Kamu</span>
                <span>{percent}%</span>
              </div>
              <ProgressBar progress={percent} color="amber" height="h-2" />
            </div>
          )}
        </div>

        {/* Ecobot Message */}
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-sky-50 border border-sky-100">
          <div className="w-10 h-10 rounded-xl bg-sky-200 flex items-center justify-center text-xl flex-shrink-0">
            🤖
          </div>
          <div className="flex-1 text-xs">
            <div className="font-bold text-sky-900 mb-0.5">Pesan Ecobot:</div>
            <p className="text-sky-800 leading-relaxed italic">
              "{badge.pesanEcobot}"
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="ghost" size="md" onClick={onClose}>
            Tutup
          </Button>

          {badge.tautan && (
            <Link to={badge.tautan} onClick={onClose}>
              <Button variant="primary" size="md" className="gap-2">
                <span>Buka Aktivitas</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Modal>
  );
};
