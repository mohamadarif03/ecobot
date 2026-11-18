import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TOUR_STEPS } from "../../data/bantuan/tour";
import { EcobotMascot } from "../ecobot/EcobotMascot";

interface GuidedTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const GuidedTourModal: React.FC<GuidedTourModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard events (Esc, Arrow keys)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        if (currentStepIndex < TOUR_STEPS.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          onComplete();
        }
      } else if (e.key === "ArrowLeft") {
        if (currentStepIndex > 0) {
          setCurrentStepIndex((prev) => prev - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentStepIndex, onClose, onComplete]);

  if (!isOpen) return null;

  const currentStep = TOUR_STEPS[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === TOUR_STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-4 border-emerald-400 overflow-hidden transform transition-all">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-indigo-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧭</span>
            <span className="text-xs font-black tracking-wider uppercase text-emerald-100">
              Tur Panduan ECOBOT
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold font-mono">
              {currentStepIndex + 1} / {TOUR_STEPS.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-xs font-bold transition-colors"
              title="Tutup (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Step Progress Line */}
        <div className="w-full bg-slate-100 h-1.5 flex">
          {TOUR_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-full flex-1 transition-all ${
                i <= currentStepIndex ? "bg-amber-400" : "bg-transparent"
              }`}
            />
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              <EcobotMascot
                size="sidebar"
                pose="happy"
                className="drop-shadow-md"
              />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Langkah {currentStep.stepNumber}
              </span>
              <h3 id="tour-modal-title" className="text-xl font-extrabold text-slate-800 leading-tight">
                {currentStep.title}
              </h3>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {currentStep.description}
          </p>

          {/* Ecobot Tip Speech Bubble */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-2.5">
            <span className="text-base flex-shrink-0">🤖</span>
            <p className="leading-snug">
              <strong>Tips Ecobot:</strong> {currentStep.ecobotTip}
            </p>
          </div>

          {/* Optional Quick Link */}
          {currentStep.quickAction && (
            <div className="text-center pt-1">
              <Link
                to={currentStep.quickAction.path}
                onClick={onComplete}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-800 underline inline-flex items-center gap-1"
              >
                <span>Coba langsung: {currentStep.quickAction.label}</span>
                <span>↗</span>
              </Link>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Lewati Tur
          </button>

          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-all"
              >
                ← Kembali
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-600 active:scale-95 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <span>{isLast ? "Selesai! 🎉" : "Lanjut →"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
