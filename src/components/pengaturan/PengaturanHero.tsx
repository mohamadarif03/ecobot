import React from "react";
import { Sliders, Volume2, VolumeX, Eye, Gamepad2 } from "lucide-react";
import { Card } from "../ui/Card";
import { EcobotMascot } from "../ecobot/EcobotMascot";
import type { PlayerSettings } from "../../types/player.ts";

interface PengaturanHeroProps {
  nickname: string;
  settings: PlayerSettings;
}

export const PengaturanHero: React.FC<PengaturanHeroProps> = ({ nickname, settings }) => {
  const isMuted = Boolean(settings.muted);
  const graphicsLabel =
    settings.graphicsQuality === "low" || settings.graphicsQuality === "rendah"
      ? "Rendah"
      : settings.graphicsQuality === "high" || settings.graphicsQuality === "tinggi"
      ? "Tinggi"
      : "Sedang";

  const controlLabel =
    settings.controlMode === "keyboard"
      ? "Keyboard"
      : settings.controlMode === "touch" || settings.controlMode === "analog"
      ? "Analog Sentuh"
      : "Otomatis";

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-500 text-white border-0 shadow-lg p-5 sm:p-6">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-emerald-400/20 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5">
        {/* Left Side: Greeting & Status Chips */}
        <div className="space-y-3 text-center sm:text-left max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase">
            <Sliders className="w-3.5 h-3.5" />
            <span>Pusat Kendali Ecobot</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Halo, {nickname}! 👋
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-emerald-50/90 leading-relaxed">
              Atur profil, suara, grafis, kontrol, dan kenyamanan belajarmu sesuai keinginan. Semua perubahan tersimpan otomatis!
            </p>
          </div>

          {/* Quick Summary Chips */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/20 backdrop-blur-md text-xs font-semibold">
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-rose-200" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-yellow-200" />
              )}
              <span>Suara: {isMuted ? "Dibisukan" : `${settings.musicVolume}%`}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/20 backdrop-blur-md text-xs font-semibold">
              <Eye className="w-3.5 h-3.5 text-emerald-200" />
              <span>Grafis: {graphicsLabel}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/20 backdrop-blur-md text-xs font-semibold">
              <Gamepad2 className="w-3.5 h-3.5 text-purple-200" />
              <span>Kontrol: {controlLabel}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Mascot */}
        <div className="relative shrink-0 flex items-center justify-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 relative flex items-center justify-center drop-shadow-xl">
            <EcobotMascot size="hero" className="w-full h-full object-contain filter drop-shadow-md" />
          </div>
        </div>
      </div>
    </Card>
  );
};
