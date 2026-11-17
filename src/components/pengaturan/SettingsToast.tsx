import React from "react";
import { Check } from "lucide-react";

interface SettingsToastProps {
  show: boolean;
  message?: string;
}

export const SettingsToast: React.FC<SettingsToastProps> = ({
  show,
  message = "Pengaturan tersimpan otomatis",
}) => {
  if (!show) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900/90 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg backdrop-blur-md border border-slate-700/60 animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950">
        <Check className="w-3 h-3 stroke-[3]" />
      </div>
      <span>{message}</span>
    </div>
  );
};
