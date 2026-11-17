import React, { useEffect, useRef } from "react";
import { Sparkles, Trophy, ArrowRight } from "lucide-react";
import { EcobotMascot } from "../ecobot/EcobotMascot";

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
  newTitle: string;
  nickname: string;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  isOpen,
  onClose,
  newLevel,
  newTitle,
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
      aria-labelledby="levelup-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl border-4 border-amber-300 text-center relative overflow-hidden">
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-gradient-to-b from-amber-300/40 to-transparent blur-xl pointer-events-none" />

        {/* Mascot */}
        <div className="w-24 h-24 mx-auto mb-2 flex items-center justify-center animate-bounce">
          <EcobotMascot
            pose="wave"
            size="hero"
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </div>

        {/* Badge & Title */}
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 font-black text-[12px] px-3.5 py-1 rounded-full mb-3 shadow-2xs">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>SELAMAT! NAIK LEVEL!</span>
        </div>

        <h2
          id="levelup-title"
          className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight"
        >
          Level {newLevel} Tercapai!
        </h2>

        <div className="my-3 py-2 px-4 rounded-2xl bg-gradient-to-r from-sky-50 via-emerald-50 to-sky-50 border border-sky-100 inline-block">
          <p className="text-[13px] font-extrabold text-slate-500">Gelar Barumu:</p>
          <p className="text-[18px] font-black text-sky-800 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{newTitle}</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </p>
        </div>

        <p className="text-[13.5px] text-slate-600 leading-relaxed max-w-xs mx-auto mb-6">
          Luar biasa, <strong className="text-slate-900">{nickname}</strong>! Kota Harapan semakin bersih dan hijau berkat aksimu hari ini!
        </p>

        <button
          ref={buttonRef}
          type="button"
          onClick={onClose}
          className="w-full h-12 rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 hover:from-sky-500 hover:to-sky-700 text-slate-950 font-black text-[14px] flex items-center justify-center gap-2 shadow-lg shadow-sky-500/30 transition transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>Lanjutkan Petualangan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
