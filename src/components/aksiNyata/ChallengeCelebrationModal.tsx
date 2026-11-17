import React, { useEffect, useRef } from "react";
import { Sparkles, Trophy, RotateCcw, ArrowRight, X } from "lucide-react";
import { EcobotMascot } from "../ecobot/EcobotMascot";

interface ChallengeCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartNewRound: () => void;
  nickname: string;
}

export const ChallengeCelebrationModal: React.FC<ChallengeCelebrationModalProps> = ({
  isOpen,
  onClose,
  onStartNewRound,
  nickname,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      buttonRef.current?.focus();
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
      aria-labelledby="celebration-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl border-4 border-amber-300 text-center relative overflow-hidden space-y-4">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-gradient-to-b from-amber-300/40 to-transparent blur-xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup perayaan"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Mascot */}
        <div className="w-28 h-28 mx-auto flex items-center justify-center animate-bounce">
          <EcobotMascot
            pose="happy"
            size="hero"
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-black uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>TANTANGAN SELESAI</span>
          </div>

          <h3
            id="celebration-title"
            className="text-2xl font-black text-slate-900"
          >
            Luar Biasa, {nickname || "Pahlawan"}!
          </h3>
          <p className="text-xs text-slate-600 font-semibold mt-1 max-w-sm mx-auto leading-relaxed">
            Kamu telah menuntaskan seluruh 7 hari aksi nyata ramah lingkungan. Tindakan kecilmu membuat bumi bernapas lebih lega!
          </p>
        </div>

        {/* Unlocked Badge Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/60 border border-amber-200 flex items-center gap-3 text-left">
          <div className="w-12 h-12 rounded-xl bg-amber-400 text-white flex items-center justify-center text-2xl shrink-0 shadow-xs">
            🌟
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">
              BADGE EPIC TERBUKA!
            </span>
            <h4 className="text-sm font-black text-slate-900">
              Pahlawan Nyata
            </h4>
            <p className="text-[11px] text-slate-600 font-medium">
              +150 XP & +80 Poin bonus penyelesaian diterima!
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-11 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs transition"
          >
            Lihat Hasilku
          </button>
          <button
            ref={buttonRef}
            type="button"
            onClick={() => {
              onStartNewRound();
              onClose();
            }}
            className="flex-1 h-11 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mulai Putaran Baru</span>
          </button>
        </div>
      </div>
    </div>
  );
};
