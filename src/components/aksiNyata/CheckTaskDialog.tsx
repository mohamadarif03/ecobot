import React, { useState, useEffect, useRef } from "react";
import { X, Check, Sparkles, Smile, Meh, Frown, Users, ArrowRight } from "lucide-react";
import type { ChallengeTask } from "../../data/aksiNyata/types";

interface CheckTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: ChallengeTask;
  onConfirm: (data: {
    feeling: "gampang" | "lumayan" | "susah";
    parentConfirmed: boolean;
  }) => void;
}

export const CheckTaskDialog: React.FC<CheckTaskDialogProps> = ({
  isOpen,
  onClose,
  task,
  onConfirm,
}) => {
  const [feeling, setFeeling] = useState<"gampang" | "lumayan" | "susah">("gampang");
  const [parentConfirmed, setParentConfirmed] = useState<boolean>(false);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      confirmButtonRef.current?.focus();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({ feeling, parentConfirmed });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-task-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-white rounded-[32px] p-6 sm:p-7 shadow-2xl border border-sky-100 relative overflow-hidden space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10.5px] font-black uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Hari {task.day} dari 7</span>
            </div>
            <h3
              id="dialog-task-title"
              className="text-lg font-black text-slate-900 leading-snug"
            >
              {task.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dialog"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. Feeling Picker */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 block">
              Bagaimana perasaanmu saat melakukan aksi ini?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "gampang", label: "Gampang", icon: Smile, color: "text-emerald-600 bg-emerald-50 border-emerald-300" },
                { id: "lumayan", label: "Lumayan", icon: Meh, color: "text-amber-600 bg-amber-50 border-amber-300" },
                { id: "susah", label: "Susah", icon: Frown, color: "text-sky-600 bg-sky-50 border-sky-300" },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = feeling === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFeeling(item.id as "gampang" | "lumayan" | "susah")}
                    className={`h-16 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 font-black text-xs transition cursor-pointer ${
                      isSelected
                        ? item.color + " shadow-xs ring-2 ring-emerald-200"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Parent Confirmation Checkbox */}
          <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/60 transition">
            <input
              type="checkbox"
              checked={parentConfirmed}
              onChange={(e) => setParentConfirmed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-sky-500 focus:ring-sky-400 border-slate-300 cursor-pointer"
            />
            <div className="text-xs font-semibold text-slate-700 leading-snug">
              <span className="font-bold flex items-center gap-1.5 text-slate-900">
                <Users className="w-3.5 h-3.5 text-sky-600" />
                Sudah dilihat atau ditemani orang tua / guru
              </span>
              <span className="text-[11px] text-slate-500 font-normal mt-0.5 block">
                (Opsional, memberi tahu Ecobot kamu didampingi)
              </span>
            </div>
          </label>

          {/* Reward note */}
          <div className="flex items-center justify-between text-xs px-1">
            <span className="font-bold text-slate-400">Hadiah penyelesaian hari ini:</span>
            <span className="font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              +15 XP · +5 Poin
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs transition"
            >
              Nanti Saja
            </button>
            <button
              ref={confirmButtonRef}
              type="submit"
              className="flex-1 h-11 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 hover:scale-105 active:scale-95 transition"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Simpan Tugas</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
