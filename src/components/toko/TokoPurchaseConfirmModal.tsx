import React from "react";
import { Coins, CheckCircle2, AlertCircle, ShoppingBag } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { ItemArt } from "../../data/toko/art";
import type { ShopItemDefinition } from "../../data/toko/types.ts";

interface TokoPurchaseConfirmModalProps {
  item: ShopItemDefinition | null;
  currentPoints: number;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (item: ShopItemDefinition) => void;
}

export const TokoPurchaseConfirmModal: React.FC<TokoPurchaseConfirmModalProps> = ({
  item,
  currentPoints,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!item) return null;

  const pointsAfter = currentPoints - item.harga;
  const isAffordable = pointsAfter >= 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Konfirmasi Pembelian">
      <div className="space-y-6 pt-1 text-center">
        {/* Item Big Preview */}
        <div className="w-24 h-24 mx-auto rounded-3xl bg-sky-50 border-2 border-sky-100 flex items-center justify-center p-3 shadow-inner">
          <ItemArt itemId={item.id} className="w-full h-full" />
        </div>

        <div>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 mb-1.5">
            {item.kategori} &bull; {item.sub}
          </div>
          <h3 className="text-xl font-extrabold text-slate-800">{item.nama}</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
            {item.deskripsi}
          </p>
        </div>

        {/* Price & Balance Calculation */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5 text-xs text-left">
          <div className="flex justify-between items-center text-slate-600 font-medium">
            <span>Saldo Poin Kamu:</span>
            <span className="font-bold text-slate-800">{currentPoints} Poin</span>
          </div>

          <div className="flex justify-between items-center text-amber-700 font-medium">
            <span>Harga Item:</span>
            <span className="font-extrabold">-{item.harga} Poin</span>
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-black">
            <span className="text-slate-800">Sisa Poin Nanti:</span>
            <span className={isAffordable ? "text-emerald-600" : "text-rose-600"}>
              {pointsAfter} Poin
            </span>
          </div>
        </div>

        {!isAffordable && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-left">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>
              Poinmu belum cukup untuk membeli item ini. Kerjakan misi atau kuis
              terlebih dahulu untuk mengumpulkan lebih banyak poin!
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="ghost" size="md" onClick={onClose}>
            Batal
          </Button>

          <Button
            variant="primary"
            size="md"
            disabled={!isAffordable}
            onClick={() => onConfirm(item)}
            className="gap-2 bg-amber-500 hover:bg-amber-600 shadow-amber-500/20"
          >
            <Coins className="w-4 h-4" />
            <span>Ya, Beli ({item.harga} Poin)</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
