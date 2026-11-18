import React, { useState } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Eye,
  RefreshCw,
  BatteryCharging,
  Gamepad2,
  RotateCcw,
  Sparkles,
  Smartphone,
  Laptop,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { audioService } from "../../services/audio/index.ts";
import {
  GRAPHICS_OPTIONS,
  CONTROL_MODE_OPTIONS,
  JOYSTICK_SIZE_OPTIONS,
} from "../../data/pengaturan/options.ts";
import {
  isTouchDevice,
  detectRecommendedGraphicsQuality,
} from "../../data/pengaturan/hardware.ts";
import type { PlayerSettings, JoystickSize } from "../../types/player.ts";

interface TabGameProps {
  settings: PlayerSettings;
  onUpdateSettings: (partial: Partial<PlayerSettings>) => void;
  onResetSection: (section: "suara" | "grafis" | "kontrol") => void;
  onNotifySave: (msg?: string) => void;
}

export const TabGame: React.FC<TabGameProps> = ({
  settings,
  onUpdateSettings,
  onResetSection,
  onNotifySave,
}) => {
  const [controlGuideTab, setControlGuideTab] = useState<"laptop" | "hp">("laptop");
  const [detectedQuality, setDetectedQuality] = useState<"low" | "medium" | "high">(() =>
    detectRecommendedGraphicsQuality()
  );
  const [isDetecting, setIsDetecting] = useState(false);

  const hasTouch = isTouchDevice();

  const handleRedetectHardware = () => {
    setIsDetecting(true);
    setTimeout(() => {
      const q = detectRecommendedGraphicsQuality();
      setDetectedQuality(q);
      setIsDetecting(false);
      onNotifySave(`Perangkat diperiksa: Disarankan grafis ${q === "high" ? "Tinggi" : q === "low" ? "Rendah" : "Sedang"}`);
    }, 400);
  };

  const handlePlayTone = (kind: "music" | "sfx") => {
    audioService.playTestTone(kind);
  };

  return (
    <div className="space-y-6">
      {/* ==================== 1. KARTU SUARA ==================== */}
      <Card className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 flex items-center justify-center font-bold">
              {settings.muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-800 dark:text-white">
                Pengaturan Suara
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Atur volume musik latar dan efek suara saat bermain
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onResetSection("suara");
              onNotifySave("Pengaturan suara dikembalikan ke awal");
            }}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 transition"
            title="Kembalikan suara ke nilai awal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kembalikan ke Awal</span>
          </button>
        </div>

        {/* Mute All Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 mb-5">
          <div>
            <div className="text-sm font-bold text-slate-800 dark:text-white">
              Bisukan Semua Suara
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Matikan seluruh audio dalam game untuk bermain tenang
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              role="switch"
              aria-checked={settings.muted}
              checked={settings.muted}
              onChange={(e) => {
                onUpdateSettings({ muted: e.target.checked });
                onNotifySave(e.target.checked ? "Suara dibisukan" : "Suara diaktifkan");
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>

        {/* Sliders: Music & SFX */}
        <div className={`space-y-5 transition-opacity ${settings.muted ? "opacity-40" : "opacity-100"}`}>
          {/* Music Volume */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
              <span className="flex items-center gap-1.5">
                <span>🎵 Musik Latar</span>
              </span>
              <span className="font-mono text-slate-500">{settings.musicVolume}%</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={settings.musicVolume}
                onChange={(e) => onUpdateSettings({ musicVolume: Number(e.target.value) })}
                aria-valuetext={`Musik ${settings.musicVolume} persen`}
                className="flex-1 accent-sky-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handlePlayTone("music")}
                className="text-xs shrink-0 rounded-xl"
                disabled={settings.muted || settings.musicVolume === 0}
              >
                <Play className="w-3 h-3 mr-1 fill-current" />
                Tes Musik
              </Button>
            </div>
          </div>

          {/* SFX Volume */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
              <span className="flex items-center gap-1.5">
                <span>🔔 Efek Suara (Pilah & Koin)</span>
              </span>
              <span className="font-mono text-slate-500">{settings.sfxVolume}%</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={settings.sfxVolume}
                onChange={(e) => onUpdateSettings({ sfxVolume: Number(e.target.value) })}
                aria-valuetext={`Efek Suara ${settings.sfxVolume} persen`}
                className="flex-1 accent-emerald-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handlePlayTone("sfx")}
                className="text-xs shrink-0 rounded-xl"
                disabled={settings.muted || settings.sfxVolume === 0}
              >
                <Play className="w-3 h-3 mr-1 fill-current" />
                Tes Efek
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* ==================== 2. KARTU GRAFIS ==================== */}
      <Card className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-sky-950/60 dark:text-emerald-300 flex items-center justify-center font-bold">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-800 dark:text-white">
                Kualitas Grafis 3D
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Atur performa visual kota 3D sesuai kemampuan perangkatmu
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onResetSection("grafis");
              onNotifySave("Pengaturan grafis dikembalikan ke awal");
            }}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kembalikan ke Awal</span>
          </button>
        </div>

        {/* Quality Options Segmented Control */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
            <span>Tingkat Kualitas</span>
            <button
              type="button"
              onClick={handleRedetectHardware}
              disabled={isDetecting}
              className="text-[11px] text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isDetecting ? "animate-spin" : ""}`} />
              <span>{isDetecting ? "Mengecek..." : "Deteksi Ulang"}</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl" role="radiogroup" aria-label="Kualitas Grafis">
            {GRAPHICS_OPTIONS.map((opt) => {
              const currentNorm =
                settings.graphicsQuality === "rendah"
                  ? "low"
                  : settings.graphicsQuality === "tinggi"
                  ? "high"
                  : settings.graphicsQuality === "sedang"
                  ? "medium"
                  : settings.graphicsQuality;

              const isSelected = currentNorm === opt.id;
              const isRecommended = detectedQuality === opt.id;

              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => {
                    onUpdateSettings({ graphicsQuality: opt.id });
                    onNotifySave(`Grafis diubah ke ${opt.label}`);
                  }}
                  className={`relative py-3 px-2 rounded-xl text-center transition cursor-pointer ${
                    isSelected
                      ? "bg-emerald-600 text-white shadow-md font-black"
                      : "text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/60 font-bold"
                  }`}
                >
                  <div className="text-xs uppercase tracking-wider">{opt.label}</div>
                  {isRecommended && (
                    <span
                      className={`inline-block text-[9px] px-1.5 py-0.2 rounded-full font-bold mt-1 ${
                        isSelected
                          ? "bg-white/30 text-white"
                          : "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                      }`}
                    >
                      Disarankan
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            {settings.graphicsQuality === "low" || settings.graphicsQuality === "rendah"
              ? "Rendah: Visual lebih ringan, baterai lebih awet, sangat lancar untuk HP lama."
              : settings.graphicsQuality === "high" || settings.graphicsQuality === "tinggi"
              ? "Tinggi: Efek bayangan dan pencahayaan kota Harapan tampil maksimal."
              : "Sedang: Keseimbangan optimal antara tampilan tajam dan animasi lancar."}
          </p>
        </div>

        {/* Battery Saver Toggle (TODO: Engine Hook) */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-start gap-3">
            <BatteryCharging className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-slate-800 dark:text-white">
                Hemat Baterai
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Membatasi frame rate saat baterai perangkat lemah agar bermain lebih awet
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-3">
            <input
              type="checkbox"
              role="switch"
              aria-checked={settings.batterySaver}
              checked={settings.batterySaver}
              onChange={(e) => {
                // TODO: Hubungkan ke FPS limiter engine Babylon saat diimplementasikan
                onUpdateSettings({ batterySaver: e.target.checked });
                onNotifySave(e.target.checked ? "Mode hemat baterai aktif" : "Mode hemat baterai nonaktif");
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>
      </Card>

      {/* ==================== 3. KARTU KONTROL ==================== */}
      <Card className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 flex items-center justify-center font-bold">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-800 dark:text-white">
                Kontrol Bermain
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pilih mode navigasi keyboard atau analog sentuh di layar
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onResetSection("kontrol");
              onNotifySave("Pengaturan kontrol dikembalikan ke awal");
            }}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kembalikan ke Awal</span>
          </button>
        </div>

        {/* Mode Selector */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
            <span>Pilihan Mode Kontrol</span>
            <span className="text-[11px] font-semibold text-slate-400">
              {hasTouch ? "📱 Layar sentuh terdeteksi" : "💻 Keyboard terdeteksi"}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl" role="radiogroup" aria-label="Mode Kontrol">
            {CONTROL_MODE_OPTIONS.map((mode) => {
              const currentNorm =
                settings.controlMode === "otomatis"
                  ? "auto"
                  : settings.controlMode === "analog"
                  ? "touch"
                  : settings.controlMode;

              const isSelected = currentNorm === mode.id;

              return (
                <button
                  key={mode.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => {
                    onUpdateSettings({ controlMode: mode.id });
                    onNotifySave(`Mode kontrol: ${mode.label}`);
                  }}
                  className={`py-3 px-2 rounded-xl text-center transition cursor-pointer ${
                    isSelected
                      ? "bg-purple-600 text-white shadow-md font-black"
                      : "text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/60 font-bold"
                  }`}
                >
                  <div className="text-xs uppercase tracking-wider">{mode.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Left-Handed Mode Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 mb-5">
          <div>
            <div className="text-sm font-bold text-slate-800 dark:text-white">
              Mode Kidal (Tangan Kiri)
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tukar posisi: Analog di sebelah kanan, tombol aksi di sebelah kiri
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-3">
            <input
              type="checkbox"
              role="switch"
              aria-checked={settings.leftHanded}
              checked={settings.leftHanded}
              onChange={(e) => {
                onUpdateSettings({ leftHanded: e.target.checked });
                onNotifySave(e.target.checked ? "Mode kidal diaktifkan" : "Mode kidal dinonaktifkan");
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>

        {/* Joystick Size Control with Live Miniature Preview */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 mb-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-slate-800 dark:text-white">
                Ukuran Analog Sentuh
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pilih ukuran tombol lingkaran analog agar nyaman untuk jarimu
              </p>

              <div className="flex gap-2 mt-3">
                {JOYSTICK_SIZE_OPTIONS.map((sz) => {
                  const isSelected = settings.joystickSize === sz.id;
                  return (
                    <button
                      key={sz.id}
                      type="button"
                      onClick={() => {
                        onUpdateSettings({ joystickSize: sz.id as JoystickSize });
                        onNotifySave(`Ukuran analog: ${sz.label}`);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                        isSelected
                          ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                          : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600"
                      }`}
                    >
                      {sz.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Miniature Analog Preview */}
            <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center relative shadow-inner shrink-0">
              <div
                className={`rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center transition-all duration-300 ${
                  settings.joystickSize === "kecil"
                    ? "w-12 h-12"
                    : settings.joystickSize === "besar"
                    ? "w-20 h-20"
                    : "w-16 h-16"
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-purple-600 shadow-sm" />
              </div>
              <span className="absolute bottom-1 text-[9px] text-slate-400 font-semibold">
                Pratinjau
              </span>
            </div>
          </div>
        </div>

        {/* Visual Controls Guide Tabs */}
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Panduan Cepat Tombol
            </span>

            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setControlGuideTab("laptop")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  controlGuideTab === "laptop"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Laptop className="w-3 h-3" />
                <span>Laptop</span>
              </button>

              <button
                type="button"
                onClick={() => setControlGuideTab("hp")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  controlGuideTab === "hp"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Smartphone className="w-3 h-3" />
                <span>HP / Tablet</span>
              </button>
            </div>
          </div>

          {controlGuideTab === "laptop" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-700/80 border border-slate-200/80 dark:border-slate-600 flex items-center gap-2">
                <kbd className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px] font-bold border border-slate-300 dark:border-slate-600">
                  W A S D
                </kbd>
                <span className="text-slate-600 dark:text-slate-300">Berjalan menjelajahi kota</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-700/80 border border-slate-200/80 dark:border-slate-600 flex items-center gap-2">
                <kbd className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px] font-bold border border-slate-300 dark:border-slate-600">
                  E / Spasi
                </kbd>
                <span className="text-slate-600 dark:text-slate-300">Ambil & buang sampah</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-700/80 border border-slate-200/80 dark:border-slate-600 flex items-center gap-2">
                  <span className="text-lg">🕹️</span>
                  <span className="text-slate-600 dark:text-slate-300">Geser analog virtual di layar</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-700/80 border border-slate-200/80 dark:border-slate-600 flex items-center gap-2">
                  <span className="text-lg">🟢</span>
                  <span className="text-slate-600 dark:text-slate-300">Tekan tombol bulat hijau AMBIL / BUANG</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-[11px]">
                💡 <strong>Tips Seru:</strong> Di HP, putar perangkat ke posisi <strong>Landscape (Horizontal)</strong> untuk sudut pandang bermain yang lebih luas dan nyaman!
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
