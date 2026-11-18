import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Sparkles,
  Trophy,
  Flame,
  Coins,
  Star,
  CheckCircle2,
  ChevronRight,
  ShoppingBag,
  Gamepad2,
  AlertCircle,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { AVATAR_OPTIONS, validateNickname } from "../../data/pengaturan/profile.ts";
import { calculateLevel } from "../../data/levels.ts";
import type { PlayerState } from "../../types/player.ts";

interface TabProfilProps {
  state: PlayerState;
  onUpdateProfile: (data: { nickname?: string; avatar?: string }) => void;
  onNotifySave: (msg?: string) => void;
}

export const TabProfil: React.FC<TabProfilProps> = ({
  state,
  onUpdateProfile,
  onNotifySave,
}) => {
  const [nicknameInput, setNicknameInput] = useState(state.nickname || "Raka");
  const [selectedAvatar, setSelectedAvatar] = useState(state.avatar || "🤖");
  const [nameError, setNameError] = useState<string | null>(null);
  const [statusAnnouncement, setStatusAnnouncement] = useState<string>("");

  const levelInfo = calculateLevel(state.xp);
  const equippedStiker = state.inventory?.equipped?.stiker;
  const totalStars = state.missionProgress.reduce((sum, m) => sum + (m.stars || 0), 0);
  const badgesCount = Object.keys(state.achievements?.badges || {}).length || state.badges.length;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNicknameInput(val);

    if (val.trim()) {
      const res = validateNickname(val);
      setNameError(res.valid ? null : res.error || null);
    } else {
      setNameError(null);
    }
  };

  const handleSaveNickname = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateNickname(nicknameInput);
    if (!res.valid) {
      setNameError(res.error || "Nama panggilan tidak valid.");
      return;
    }

    try {
      onUpdateProfile({ nickname: res.sanitized });
      setNameError(null);
      setStatusAnnouncement(`Nama panggilan berhasil diubah menjadi ${res.sanitized}!`);
      onNotifySave("Nama panggilan diperbarui!");
    } catch (err: any) {
      setNameError(err.message || "Gagal mengubah nama panggilan.");
    }
  };

  const handleSelectAvatar = (avatarIcon: string) => {
    setSelectedAvatar(avatarIcon);
    onUpdateProfile({ avatar: avatarIcon });
    setStatusAnnouncement(`Avatar diubah!`);
    onNotifySave("Avatar diperbarui!");
  };

  return (
    <div className="space-y-6">
      {/* Hidden Live Region for Screen Readers */}
      <div className="sr-only" role="status" aria-live="polite">
        {statusAnnouncement}
      </div>

      {/* 1. Kartu Profilku */}
      <Card className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm">
        <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-sky-950/60 dark:text-emerald-300 flex items-center justify-center font-bold">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-800 dark:text-white">
              Profilku
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ganti nama panggilan dan avatar karakter belajarmu
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          {/* Avatar Preview */}
          <div className="relative flex flex-col items-center">
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-sky-100 to-emerald-100 dark:from-slate-800 dark:to-slate-700 border-4 border-white dark:border-slate-800 shadow-md flex items-center justify-center text-5xl">
              <span>{state.avatar || selectedAvatar}</span>
              {equippedStiker && (
                <span className="absolute -bottom-1 -right-1 text-2xl bg-white dark:bg-slate-800 rounded-full shadow p-0.5">
                  {equippedStiker === "stiker-daun"
                    ? "🍃"
                    : equippedStiker === "stiker-bintang"
                    ? "⭐"
                    : equippedStiker === "stiker-api"
                    ? "🔥"
                    : equippedStiker === "stiker-pahlawan"
                    ? "👑"
                    : "✨"}
                </span>
              )}
            </div>
            <span className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">
              {state.nickname}
            </span>
          </div>

          {/* Nickname Form */}
          <form onSubmit={handleSaveNickname} className="flex-1 w-full space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="nickname-field" className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Nama Panggilan
              </label>
              <span className="text-[11px] font-semibold text-slate-400">
                {nicknameInput.length} / 16 karakter
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="nickname-field"
                type="text"
                value={nicknameInput}
                onChange={handleNameChange}
                maxLength={16}
                placeholder="Contoh: Raka, Alya, Budi..."
                className="flex-1 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-900 rounded-2xl px-4 py-2.5 text-sm font-bold text-slate-800 dark:text-white outline-none transition"
              />
              <Button
                type="submit"
                disabled={Boolean(nameError) || nicknameInput.trim() === state.nickname}
                className="px-5 py-2.5 text-xs font-black bg-emerald-600 hover:bg-emerald-600 text-white rounded-2xl shadow-sm shrink-0"
              >
                Ubah Nama
              </Button>
            </div>

            {nameError ? (
              <div className="flex items-center gap-1.5 text-xs text-rose-500 font-semibold pt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{nameError}</span>
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 pt-0.5">
                Nama panggilan akan tampil di dashboard, sertifikat, dan papan peringkat.
              </p>
            )}
          </form>
        </div>

        {/* Avatar Choices Grid */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-3">
            Pilih Avatar Karakter
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {AVATAR_OPTIONS.map((item) => {
              const isSelected = (state.avatar || selectedAvatar) === item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectAvatar(item.icon)}
                  className={`p-3.5 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition text-center cursor-pointer ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50/70 dark:bg-sky-950/40 shadow-sm scale-102"
                      : "border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-slate-400 line-clamp-1">
                    {item.deskripsi}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* 2. Kartu Ringkasan Petualanganku (Read-only) */}
      <Card className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-extrabold text-base text-slate-800 dark:text-white">
              Ringkasan Petualanganku
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Catatan prestasi dan pencapaian belajarmu selama ini
            </p>
          </div>

          <Link
            to="/pencapaian"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1"
          >
            <span>Buka Pencapaian</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-sky-950/40 border border-emerald-100 dark:border-sky-900/60">
            <div className="text-xs text-emerald-700 dark:text-emerald-300 font-bold mb-1">
              Level & Gelar
            </div>
            <div className="text-base font-black text-slate-800 dark:text-white truncate">
              Lv.{levelInfo.level} · {levelInfo.title}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60">
            <div className="text-xs text-emerald-700 dark:text-emerald-300 font-bold mb-1 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-emerald-600" />
              <span>Total XP</span>
            </div>
            <div className="text-base font-black text-slate-800 dark:text-white">
              {state.xp.toLocaleString("id-ID")} XP
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/60">
            <div className="text-xs text-amber-700 dark:text-amber-300 font-bold mb-1 flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-amber-600" />
              <span>Poin Toko</span>
            </div>
            <div className="text-base font-black text-slate-800 dark:text-white">
              {state.points.toLocaleString("id-ID")} Poin
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/60">
            <div className="text-xs text-rose-700 dark:text-rose-300 font-bold mb-1 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Streak Belajar</span>
            </div>
            <div className="text-base font-black text-slate-800 dark:text-white">
              {state.streak} Hari
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/60">
            <div className="text-xs text-purple-700 dark:text-purple-300 font-bold mb-1 flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-purple-600" />
              <span>Badge Terbuka</span>
            </div>
            <div className="text-base font-black text-slate-800 dark:text-white">
              {badgesCount} Badge
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/60">
            <div className="text-xs text-teal-700 dark:text-teal-300 font-bold mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Bintang Game</span>
            </div>
            <div className="text-base font-black text-slate-800 dark:text-white">
              {totalStars} ⭐
            </div>
          </div>
        </div>
      </Card>

      {/* 3. Kartu Dandan Karakter & Toko */}
      <Card className="p-6 bg-gradient-to-r from-sky-50/60 via-purple-50/40 to-emerald-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border border-emerald-100 dark:border-slate-800 rounded-3xl shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">✨</span>
              <h4 className="font-extrabold text-base text-slate-800 dark:text-white">
                Dandan Karakter & Kostum
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
              Mau ganti topi, kacamata, warna baju karakter, atau mendandani Ecobot? Tukar poin belajarmu di Toko Kustomisasi!
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/toko?tab=koleksi"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-2xs transition"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Koleksiku</span>
            </Link>

            <Link
              to="/main-game"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-600 text-white text-xs font-black shadow-sm transition"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Karakterku</span>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};
