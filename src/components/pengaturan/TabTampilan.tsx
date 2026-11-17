import React from "react";
import {
  Sparkles,
  Type,
  Eye,
  Globe,
  RotateCcw,
  CheckCircle2,
  Info,
  Layers,
} from "lucide-react";
import { Card } from "../ui/Card";
import {
  REDUCE_MOTION_OPTIONS,
  TEXT_SIZE_OPTIONS,
  LANGUAGE_OPTIONS,
} from "../../data/pengaturan/options.ts";
import type { PlayerSettings, ReduceMotionSetting, TextSizeSetting } from "../../types/player.ts";

interface TabTampilanProps {
  settings: PlayerSettings;
  onUpdateSettings: (partial: Partial<PlayerSettings>) => void;
  onResetSection: (section: "tampilan") => void;
  onNotifySave: (msg?: string) => void;
}

export const TabTampilan: React.FC<TabTampilanProps> = ({
  settings,
  onUpdateSettings,
  onResetSection,
  onNotifySave,
}) => {
  return (
    <div className="space-y-6">
      {/* ==================== 1. KARTU KENYAMANAN & AKSESIBILITAS ==================== */}
      <Card className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 flex items-center justify-center font-bold">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-800 dark:text-white">
                Kenyamanan & Aksesibilitas
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sesuaikan ukuran huruf, animasi, dan kontras warna sesuai kebutuhan mata
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onResetSection("tampilan");
              onNotifySave("Pengaturan tampilan dikembalikan ke awal");
            }}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kembalikan ke Awal</span>
          </button>
        </div>

        {/* Reduce Motion Options */}
        <div className="space-y-3 mb-6">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
            Gerakan Animasi Layar
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5" role="radiogroup" aria-label="Gerakan Animasi">
            {REDUCE_MOTION_OPTIONS.map((opt) => {
              const isSelected = settings.reduceMotion === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => {
                    onUpdateSettings({ reduceMotion: opt.id as ReduceMotionSetting });
                    onNotifySave(`Animasi: ${opt.label}`);
                  }}
                  className={`p-3.5 rounded-2xl border-2 text-left transition cursor-pointer ${
                    isSelected
                      ? "border-teal-500 bg-teal-50/70 dark:bg-teal-950/40 shadow-sm"
                      : "border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <div className="font-bold text-xs text-slate-800 dark:text-white mb-0.5">
                    {opt.label}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    {opt.deskripsi}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Text Size 3-level Control */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Ukuran Huruf (Font Size)</span>
            </label>
            <span className="text-[11px] font-semibold text-slate-400">
              {settings.textSize === "sangat-besar"
                ? "Sangat Besar (120%)"
                : settings.textSize === "besar"
                ? "Besar (110%)"
                : "Normal (100%)"}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl" role="radiogroup" aria-label="Ukuran Huruf">
            {TEXT_SIZE_OPTIONS.map((opt) => {
              const isSelected = settings.textSize === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => {
                    onUpdateSettings({ textSize: opt.id as TextSizeSetting });
                    onNotifySave(`Ukuran teks: ${opt.label}`);
                  }}
                  className={`py-3 px-2 rounded-xl text-center transition cursor-pointer ${
                    isSelected
                      ? "bg-teal-600 text-white shadow-md font-black"
                      : "text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/60 font-bold"
                  }`}
                >
                  <div className="text-xs uppercase tracking-wider">{opt.label}</div>
                  <div className="text-[10px] opacity-80 mt-0.5">{opt.scalePercent}%</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* High Contrast Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 mb-5">
          <div>
            <div className="text-sm font-bold text-slate-800 dark:text-white">
              Kontras Tinggi
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pertajam garis tepi dan warna teks agar lebih mudah dibaca
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-3">
            <input
              type="checkbox"
              role="switch"
              aria-checked={settings.highContrast}
              checked={settings.highContrast}
              onChange={(e) => {
                onUpdateSettings({ highContrast: e.target.checked });
                onNotifySave(e.target.checked ? "Kontras tinggi aktif" : "Kontras normal");
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>

        {/* Icon Labels Switch */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
          <div>
            <div className="text-sm font-bold text-slate-800 dark:text-white">
              Tampilkan Label pada Ikon Navigasi
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Menampilkan keterangan teks yang jelas pada tombol navigasi
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-3">
            <input
              type="checkbox"
              role="switch"
              aria-checked={settings.iconLabels}
              checked={settings.iconLabels}
              onChange={(e) => {
                onUpdateSettings({ iconLabels: e.target.checked });
                onNotifySave(e.target.checked ? "Label ikon diaktifkan" : "Label ikon disembunyikan");
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>
      </Card>

      {/* ==================== 2. KARTU PRATINJAU LANGSUNG ==================== */}
      <Card className="p-6 bg-gradient-to-r from-sky-50 via-teal-50 to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border border-teal-200 dark:border-slate-700 rounded-3xl shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <h4 className="font-extrabold text-sm text-slate-800 dark:text-white">
            Pratinjau Tampilan Teks
          </h4>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-2">
          <h5 className="font-black text-slate-900 dark:text-white leading-tight">
            Memilah Sampah Itu Mudah & Menyenangkan! 🌍
          </h5>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Kotak ini menunjukkan bagaimana tulisan materi dan kuis akan tampil di layar perangkatmu. Huruf tetap proporsional dan mudah dibaca tanpa memotong tata letak dashboard.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              Organik: Hijau
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold">
              Anorganik: Kuning
            </span>
          </div>
        </div>
      </Card>

      {/* ==================== 3. KARTU BAHASA ==================== */}
      <Card className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm">
        <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-9 h-9 rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-800 dark:text-white">
              Bahasa (Language)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pilihan bahasa pengantar materi edukasi ECOBOT
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LANGUAGE_OPTIONS.map((lang) => {
            const isSelected = settings.language === lang.id;
            const isAvailable = lang.available;

            return (
              <div
                key={lang.id}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between transition ${
                  isSelected
                    ? "border-sky-500 bg-sky-50/70 dark:bg-sky-950/40 shadow-sm"
                    : isAvailable
                    ? "border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 cursor-pointer"
                    : "border-slate-200/60 dark:border-slate-800/60 opacity-60 bg-slate-50 dark:bg-slate-800/40 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <div className="font-bold text-sm text-slate-800 dark:text-white">
                      {lang.label}
                    </div>
                    {lang.tag && (
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 mt-0.5">
                        {lang.tag}
                      </span>
                    )}
                  </div>
                </div>

                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                ) : null}
              </div>
            );
          })}
        </div>

        <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Seluruh narasi materi dan kuis saat ini disajikan penuh dalam Bahasa Indonesia ramah anak.</span>
        </p>
      </Card>
    </div>
  );
};
