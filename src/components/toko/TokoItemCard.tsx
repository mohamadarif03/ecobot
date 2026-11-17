import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Coins,
  CheckCircle2,
  Lock,
  Award,
  Sparkles,
  Eye,
  Check,
} from "lucide-react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { ItemArt } from "../../data/toko/art";
import type {
  ShopItemDefinition,
  ItemStatusInfo,
} from "../../data/toko/types.ts";

interface TokoItemCardProps {
  item: ShopItemDefinition;
  statusInfo: ItemStatusInfo;
  isTryingOn: boolean;
  onTryOn: (item: ShopItemDefinition) => void;
  onBuy: (item: ShopItemDefinition) => void;
  onEquip: (item: ShopItemDefinition) => void;
}

export const TokoItemCard: React.FC<TokoItemCardProps> = ({
  item,
  statusInfo,
  isTryingOn,
  onTryOn,
  onBuy,
  onEquip,
}) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { status } = statusInfo;
  const isOwned = status === "dimiliki" || status === "dipakai";
  const isEquipped = status === "dipakai";
  const canBuy = status === "bisa_dibeli";

  return (
    <>
      <div
        className={`relative flex flex-col justify-between p-4 rounded-3xl border transition-all hover:shadow-md select-none ${
          isEquipped
            ? "bg-emerald-50/40 border-emerald-300 ring-2 ring-emerald-200 shadow-xs"
            : isTryingOn
            ? "bg-amber-50/40 border-amber-300 ring-2 ring-amber-200"
            : isOwned
            ? "bg-white border-slate-200 hover:border-sky-300"
            : "bg-white/80 border-slate-100 hover:border-slate-200"
        }`}
      >
        {/* Top Indicators: Category & Try-on badge */}
        <div className="flex items-center justify-between gap-1 mb-2">
          <span className="text-[10.5px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {item.sub}
          </span>

          {isTryingOn && (
            <span className="text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 animate-pulse">
              Dicoba
            </span>
          )}
          {isEquipped && (
            <span className="text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 flex items-center gap-1">
              <Check className="w-3 h-3" />
              <span>Dipakai</span>
            </span>
          )}
        </div>

        {/* Item Illustration */}
        <div
          onClick={() => setIsDetailOpen(true)}
          className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-b from-slate-50 to-sky-50/30 flex items-center justify-center p-2.5 my-2 cursor-pointer transition-transform hover:scale-105"
        >
          <ItemArt itemId={item.id} className="w-full h-full" />
        </div>

        {/* Name and Price */}
        <div className="text-center my-1">
          <h4
            onClick={() => setIsDetailOpen(true)}
            className="font-extrabold text-slate-800 text-xs md:text-sm truncate cursor-pointer hover:text-sky-600"
          >
            {item.nama}
          </h4>

          <div className="flex items-center justify-center gap-1 mt-1">
            {item.harga > 0 ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                <Coins className="w-3 h-3" />
                <span>{item.harga} Poin</span>
              </span>
            ) : item.syarat.tipe === "gratis" ? (
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Gratis
              </span>
            ) : (
              <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                Hadiah Lencana
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-1.5">
          {/* Main Action Button */}
          {isEquipped ? (
            <Button
              variant="outline"
              size="sm"
              disabled
              className="w-full text-xs text-emerald-700 bg-emerald-50 border-emerald-200 cursor-default opacity-100"
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              <span>Sedang Dipakai</span>
            </Button>
          ) : isOwned ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onEquip(item)}
              className="w-full text-xs bg-emerald-600 hover:bg-emerald-700"
            >
              <span>Pakai Item</span>
            </Button>
          ) : canBuy ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onBuy(item)}
              className="w-full text-xs gap-1"
            >
              <span>Beli</span>
            </Button>
          ) : status === "poin_kurang" ? (
            <div className="text-center">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="w-full text-[11px] text-slate-400 bg-slate-50 cursor-not-allowed"
              >
                <span>Kurang {statusInfo.pointsNeeded} Poin</span>
              </Button>
              <Link
                to="/misi"
                className="inline-block text-[10px] font-bold text-sky-600 hover:underline mt-1"
              >
                Cari Poin di Misi &rarr;
              </Link>
            </div>
          ) : status === "terkunci_level" ? (
            <Button
              variant="outline"
              size="sm"
              disabled
              className="w-full text-[11px] text-slate-400 bg-slate-50 cursor-not-allowed gap-1"
            >
              <Lock className="w-3 h-3" />
              <span>Capai Level {statusInfo.levelRequired}</span>
            </Button>
          ) : status === "hadiah_badge" ? (
            <Button
              variant="outline"
              size="sm"
              disabled
              className="w-full text-[10px] text-purple-700 bg-purple-50 border-purple-200 cursor-not-allowed gap-1"
            >
              <Award className="w-3 h-3" />
              <span>Badge {statusInfo.badgeRequiredName}</span>
            </Button>
          ) : null}

          {/* Try-on button (only for wearable accessories and colors) */}
          {item.kategori !== "stiker" && !isEquipped && (
            <button
              type="button"
              onClick={() => onTryOn(item)}
              className={`w-full py-1 text-[11px] font-bold rounded-xl transition cursor-pointer ${
                isTryingOn
                  ? "bg-amber-100 text-amber-900"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              {isTryingOn ? "Sedang Dicoba" : "Coba Dulu 👀"}
            </button>
          )}
        </div>
      </div>

      {/* Item Detail Modal */}
      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title="Detail Aksesori"
      >
        <div className="space-y-5 text-center">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-sky-50 border-2 border-sky-100 flex items-center justify-center p-3">
            <ItemArt itemId={item.id} className="w-full h-full" />
          </div>

          <div>
            <div className="inline-block px-3 py-0.5 rounded-full text-xs font-bold uppercase bg-slate-100 text-slate-700 mb-1">
              {item.kategori} &bull; {item.sub}
            </div>
            <h3 className="text-xl font-extrabold text-slate-800">{item.nama}</h3>
            <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
              {item.deskripsi}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
            <div className="flex justify-between font-semibold text-slate-700">
              <span>Harga:</span>
              <span className="font-extrabold text-amber-600">
                {item.harga > 0 ? `${item.harga} Poin` : "Gratis / Hadiah"}
              </span>
            </div>
            <div className="flex justify-between text-slate-500 mt-1">
              <span>Status:</span>
              <span className="font-bold text-slate-700">{statusInfo.label}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="ghost"
              size="md"
              onClick={() => setIsDetailOpen(false)}
            >
              Tutup
            </Button>

            {isOwned && !isEquipped && (
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  onEquip(item);
                  setIsDetailOpen(false);
                }}
              >
                Pakai Sekarang
              </Button>
            )}

            {canBuy && (
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  setIsDetailOpen(false);
                  onBuy(item);
                }}
              >
                Beli Sekarang
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
