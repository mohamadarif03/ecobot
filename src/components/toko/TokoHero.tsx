import React from "react";
import { Sparkles, Coins, ShoppingBag, ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import { EcobotMascot } from "../ecobot/EcobotMascot";
import type { InventoryEquipped } from "../../types/player.ts";
import type { ShopItemDefinition } from "../../data/toko/types.ts";

interface TokoHeroProps {
  nickname: string;
  points: number;
  ownedCount: number;
  totalItems: number;
  level: number;
  equippedEcobot?: InventoryEquipped["ecobot"];
  nearestAffordable: ShopItemDefinition | null;
  onOpenKoleksi: () => void;
  onQuickBuy: (item: ShopItemDefinition) => void;
}

export const TokoHero: React.FC<TokoHeroProps> = ({
  nickname,
  points,
  ownedCount,
  totalItems,
  level,
  equippedEcobot,
  nearestAffordable,
  onOpenKoleksi,
  onQuickBuy,
}) => {
  // Dynamic Title based on collection
  let title = "Yuk, dandani karakter dan Ecobot-mu!";
  if (ownedCount >= totalItems) {
    title = "Wow, koleksimu lengkap!";
  } else if (ownedCount > 5) {
    title = `Keren! Kamu sudah punya ${ownedCount} item pilihan!`;
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-600 p-6 md:p-8 text-white shadow-xl shadow-sky-500/20 mb-8">
      {/* Background decorations */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-yellow-300/15 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Dari Ecobot</span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
            {title}
          </h1>

          <p className="text-sky-100 text-sm md:text-base leading-relaxed">
            Tukar poin yang kamu dapat dari memilah sampah, kuis, dan aksi nyata
            dengan aksesori keren. Tidak ada uang sungguhan, semua murni hasil
            belajarmu!
          </p>

          {/* Quick Stat Chips */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-xs md:text-sm font-semibold">
              <Coins className="w-4 h-4 text-yellow-300" />
              <span>{points} Poin</span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-xs md:text-sm font-semibold">
              <ShoppingBag className="w-4 h-4 text-emerald-300" />
              <span>
                {ownedCount}/{totalItems} Item Dimiliki
              </span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-xs md:text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Level {level}</span>
            </div>
          </div>
        </div>

        {/* Mascot & CTA Button */}
        <div className="flex items-center gap-5 self-center md:self-auto">
          {/* Peeking Ecobot with active cosmetics */}
          <div className="w-28 h-28 md:w-36 md:h-36 flex items-center justify-center filter drop-shadow-lg">
            <EcobotMascot
              size="hero"
              equippedOverrides={equippedEcobot}
              className="w-full h-full"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={onOpenKoleksi}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-sky-800 font-bold text-xs md:text-sm shadow-lg hover:bg-sky-50 active:scale-95 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-sky-600" />
              <span>Lihat Koleksiku</span>
            </button>

            {nearestAffordable && points >= nearestAffordable.harga && (
              <button
                type="button"
                onClick={() => onQuickBuy(nearestAffordable)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>Beli {nearestAffordable.nama}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
