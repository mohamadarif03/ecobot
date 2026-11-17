import React from "react";
import { Link } from "react-router-dom";
import {
  Coins,
  Sparkles,
  Zap,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Gamepad2,
  BookOpen,
  HelpCircle,
  Award,
} from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { PlayerAvatarPreview } from "../game/PlayerAvatarPreview";
import { EcobotMascot } from "../ecobot/EcobotMascot";
import { ItemArt } from "../../data/toko/art";
import type {
  CharacterCustomization,
  InventoryEquipped,
} from "../../types/player.ts";

interface TokoRightPanelProps {
  points: number;
  character: CharacterCustomization;
  equipped: InventoryEquipped;
  previewOverrides: InventoryEquipped;
  hasActivePreview: boolean;
  onClearPreview: () => void;
  onResetAppearance: () => void;
}

export const TokoRightPanel: React.FC<TokoRightPanelProps> = ({
  points,
  character,
  equipped,
  previewOverrides,
  hasActivePreview,
  onClearPreview,
  onResetAppearance,
}) => {
  return (
    <div className="space-y-6">
      {/* 1. Saldo Poin Card */}
      <Card className="p-5 border-slate-100 shadow-sm bg-gradient-to-br from-amber-500/10 via-yellow-500/10 to-amber-500/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <Coins className="w-6 h-6 text-yellow-100" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500">Saldo Poin Belajar</div>
              <div className="text-2xl font-black text-slate-800">{points}</div>
            </div>
          </div>

          <Link to="/misi">
            <Button variant="primary" size="sm" className="text-xs gap-1">
              <span>Cari Poin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </Card>

      {/* 2. Pratinjauku (Karakterku & Ecobot) */}
      <Card className="p-5 border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span>Pratinjau Gayaku</span>
          </h3>

          {hasActivePreview ? (
            <button
              type="button"
              onClick={onClearPreview}
              className="text-[11px] font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
            >
              Lepas Pratinjau ✕
            </button>
          ) : (
            <button
              type="button"
              onClick={onResetAppearance}
              title="Lepas semua aksesori ke tampilan dasar"
              className="text-[11px] font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Awal</span>
            </button>
          )}
        </div>

        {/* Dual Avatars Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Karakter Card */}
          <div className="p-3 rounded-2xl bg-gradient-to-b from-sky-50/50 to-white border border-sky-100 text-center flex flex-col items-center justify-between">
            <span className="text-[11px] font-bold text-slate-600 mb-1">
              Karakterku
            </span>
            <div className="my-1">
              <PlayerAvatarPreview
                character={character}
                equippedOverrides={previewOverrides.character}
                size="sm"
              />
            </div>
            <span className="text-[10px] text-slate-400 font-medium truncate max-w-full">
              {previewOverrides.character.topi || "Tanpa Topi"}
            </span>
          </div>

          {/* Ecobot Card */}
          <div className="p-3 rounded-2xl bg-gradient-to-b from-emerald-50/50 to-white border border-emerald-100 text-center flex flex-col items-center justify-between">
            <span className="text-[11px] font-bold text-slate-600 mb-1">
              Ecobot
            </span>
            <div className="w-20 h-20 my-1 flex items-center justify-center">
              <EcobotMascot
                size="hero"
                equippedOverrides={previewOverrides.ecobot}
                className="w-full h-full"
              />
            </div>
            <span className="text-[10px] text-slate-400 font-medium truncate max-w-full">
              {previewOverrides.ecobot.topi || "Ecobot Sahabat"}
            </span>
          </div>
        </div>

        {/* Stiker Profil Aktif */}
        {equipped.stiker && (
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-purple-50 border border-purple-100 text-xs text-purple-900 mb-2">
            <div className="w-6 h-6 shrink-0">
              <ItemArt itemId={equipped.stiker} className="w-full h-full" />
            </div>
            <div className="truncate">
              <strong>Stiker Profil:</strong> {equipped.stiker}
            </div>
          </div>
        )}

        {hasActivePreview && (
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 text-center font-medium">
            Sedang mencoba tampilan. Tekan tombol <strong>Beli</strong> atau{" "}
            <strong>Pakai</strong> pada kartu item untuk menerapkannya!
          </div>
        )}
      </Card>

      {/* 3. Cara Dapat Poin Card */}
      <Card className="p-5 border-slate-100 shadow-sm">
        <h4 className="font-extrabold text-slate-800 text-sm mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Cara Dapat Poin</span>
        </h4>

        <div className="space-y-2 text-xs">
          <Link
            to="/main-game"
            className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100"
          >
            <div className="flex items-center gap-2 text-slate-700">
              <Gamepad2 className="w-4 h-4 text-emerald-500" />
              <span>Main Game Kota</span>
            </div>
            <span className="font-bold text-emerald-600">+10/sampah</span>
          </Link>

          <Link
            to="/kuis"
            className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100"
          >
            <div className="flex items-center gap-2 text-slate-700">
              <Award className="w-4 h-4 text-purple-500" />
              <span>Kuis Harian</span>
            </div>
            <span className="font-bold text-purple-600">+15 poin</span>
          </Link>

          <Link
            to="/misi"
            className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100"
          >
            <div className="flex items-center gap-2 text-slate-700">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span>Misi Harian</span>
            </div>
            <span className="font-bold text-sky-600">+20–50 poin</span>
          </Link>

          <Link
            to="/aksi-nyata"
            className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100"
          >
            <div className="flex items-center gap-2 text-slate-700">
              <BookOpen className="w-4 h-4 text-rose-500" />
              <span>Aksi Nyata & Refleksi</span>
            </div>
            <span className="font-bold text-rose-600">+15–30 poin</span>
          </Link>
        </div>
      </Card>

      {/* 4. Upgrade Reminder Card */}
      <Card className="p-4 rounded-2xl bg-slate-50 border-slate-100 text-xs">
        <div className="font-bold text-slate-700 mb-1 flex items-center gap-1.5">
          <span>🛠️</span>
          <span>Upgrade Gameplay Ada di Main Game</span>
        </div>
        <p className="text-slate-500 leading-relaxed mb-2">
          Tas Besar, Sepatu Cepat, dan Penjepit Panjang dapat di-upgrade di ruang
          persiapan sebelum bermain.
        </p>
        <Link
          to="/main-game"
          className="font-bold text-sky-600 hover:underline inline-flex items-center gap-1"
        >
          <span>Buka Upgrade Main Game</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </Card>

      {/* 5. Tips Ecobot Card */}
      <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-sky-200 flex items-center justify-center text-lg shrink-0">
          🤖
        </div>
        <div className="text-xs">
          <div className="font-bold text-sky-900 mb-0.5">Tips Ecobot:</div>
          <p className="text-sky-800 leading-relaxed italic">
            "Poin didapat dari belajar dan beraksi. Makin rajin kamu menjaga
            kebersihan, makin keren tokomu!"
          </p>
        </div>
      </div>
    </div>
  );
};
