import React, { useState } from "react";
import { ShoppingBag, RotateCcw, Check, Sparkles } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { ItemArt } from "../../data/toko/art";
import { ALL_SHOP_ITEMS } from "../../data/toko/items";
import type {
  InventoryEquipped,
  InventoryOwnedItem,
} from "../../types/player.ts";
import type { ShopItemDefinition } from "../../data/toko/types.ts";

interface KoleksikuTabProps {
  owned: Record<string, InventoryOwnedItem>;
  equipped: InventoryEquipped;
  onEquip: (item: ShopItemDefinition) => void;
  onUnequip: (
    slot: string,
    targetType: "character" | "ecobot" | "stiker"
  ) => void;
  onResetAppearance: () => void;
  onNavigateToCatalog: (category: string) => void;
}

export const KoleksikuTab: React.FC<KoleksikuTabProps> = ({
  owned,
  equipped,
  onEquip,
  onUnequip,
  onResetAppearance,
  onNavigateToCatalog,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Filter items that are owned
  const ownedItems = ALL_SHOP_ITEMS.filter((item) => !!owned[item.id]);

  const categories = [
    { id: "all", label: "Semua Koleksi" },
    { id: "karakter", label: "Karakter" },
    { id: "ecobot", label: "Ecobot" },
    { id: "stiker", label: "Stiker" },
  ];

  const filteredItems = ownedItems.filter((item) => {
    if (activeCategory !== "all" && item.kategori !== activeCategory) {
      return false;
    }
    return true;
  });

  const isEquipped = (item: ShopItemDefinition) => {
    if (item.kategori === "karakter") {
      const slot = item.sub as keyof typeof equipped.character;
      return equipped.character[slot] === item.id;
    }
    if (item.kategori === "ecobot") {
      const slot = item.sub as keyof typeof equipped.ecobot;
      return equipped.ecobot[slot] === item.id;
    }
    if (item.kategori === "stiker") {
      return equipped.stiker === item.id;
    }
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === c.id
                  ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onResetAppearance}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
          title="Lepas semua aksesori ke tampilan dasar awal"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Kembalikan ke Awal</span>
        </button>
      </div>

      {/* Grid of Owned Items */}
      {filteredItems.length === 0 ? (
        <Card className="p-8 text-center border-dashed border-2 border-slate-200">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-sky-50 text-sky-500 flex items-center justify-center text-3xl mb-3 shadow-inner">
            🛍️
          </div>
          <h3 className="font-bold text-slate-800 text-base mb-1">
            Belum Ada Koleksi di Kategori Ini
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4 leading-relaxed">
            Yuk tukarkan poin belajarmu dengan aksesori lucu dan gaya keren untuk
            karakter dan Ecobot!
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => onNavigateToCatalog("karakter")}
          >
            Jelajahi Toko Sekarang
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => {
            const equippedNow = isEquipped(item);

            return (
              <div
                key={item.id}
                className={`p-4 rounded-3xl border flex flex-col justify-between transition-all ${
                  equippedNow
                    ? "bg-emerald-50/50 border-emerald-300 ring-2 ring-emerald-200 shadow-sm"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-2">
                    <span className="uppercase">{item.sub}</span>
                    {equippedNow && (
                      <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <Check className="w-3 h-3" />
                        <span>Dipakai</span>
                      </span>
                    )}
                  </div>

                  <div className="w-20 h-20 mx-auto rounded-2xl bg-slate-50 flex items-center justify-center p-2.5 my-2">
                    <ItemArt itemId={item.id} className="w-full h-full" />
                  </div>

                  <h4 className="font-extrabold text-slate-800 text-xs text-center truncate mt-1">
                    {item.nama}
                  </h4>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100">
                  {equippedNow ? (
                    item.sub === "warnaBaju" || item.id === "ecobot-warna-biru" ? (
                      <div className="text-[11px] font-semibold text-emerald-600 text-center py-1">
                        Warna Utama
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          onUnequip(
                            item.sub,
                            item.kategori as "character" | "ecobot" | "stiker"
                          )
                        }
                        className="w-full text-xs text-rose-600 border-rose-200 hover:bg-rose-50"
                      >
                        Lepas
                      </Button>
                    )
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onEquip(item)}
                      className="w-full text-xs"
                    >
                      Pakai
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
