import React, { useState } from "react";
import Card from "../ui/Card";
import { TokoItemCard } from "./TokoItemCard";
import type {
  ShopCategory,
  ShopItemDefinition,
  ItemStatusInfo,
} from "../../data/toko/types.ts";
import type { InventoryEquipped } from "../../types/player.ts";

interface TokoCatalogTabProps {
  category: ShopCategory;
  items: (ShopItemDefinition & { statusInfo: ItemStatusInfo })[];
  previewOverrides: InventoryEquipped;
  onTryOn: (item: ShopItemDefinition) => void;
  onBuy: (item: ShopItemDefinition) => void;
  onEquip: (item: ShopItemDefinition) => void;
}

export const TokoCatalogTab: React.FC<TokoCatalogTabProps> = ({
  category,
  items,
  previewOverrides,
  onTryOn,
  onBuy,
  onEquip,
}) => {
  const [subFilter, setSubFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Determine subcategory filters based on active main category
  const subCategories =
    category === "karakter"
      ? [
          { id: "all", label: "Semua Karakter" },
          { id: "topi", label: "Topi" },
          { id: "kacamata", label: "Kacamata" },
          { id: "aksesori", label: "Aksesori" },
          { id: "warnaBaju", label: "Warna Baju" },
        ]
      : category === "ecobot"
      ? [
          { id: "all", label: "Semua Ecobot" },
          { id: "topi", label: "Topi & Mahkota" },
          { id: "kacamata", label: "Kacamata" },
          { id: "syal", label: "Syal" },
          { id: "aksesori", label: "Pita" },
          { id: "warna", label: "Warna Tubuh" },
        ]
      : [{ id: "all", label: "Semua Stiker Profil" }];

  const statusFilters = [
    { id: "all", label: "Semua" },
    { id: "unowned", label: "Belum Dimiliki" },
    { id: "affordable", label: "Bisa Kubeli" },
  ];

  // Filtering logic
  const filteredItems = items.filter((item) => {
    // Sub-category match
    if (subFilter !== "all" && item.sub !== subFilter) {
      return false;
    }

    // Status filter match
    if (
      statusFilter === "unowned" &&
      (item.statusInfo.status === "dimiliki" ||
        item.statusInfo.status === "dipakai")
    ) {
      return false;
    }

    if (
      statusFilter === "affordable" &&
      item.statusInfo.status !== "bisa_dibeli"
    ) {
      return false;
    }

    return true;
  });

  const isTryingOn = (item: ShopItemDefinition) => {
    if (item.kategori === "karakter") {
      const slot = item.sub as keyof typeof previewOverrides.character;
      return previewOverrides.character[slot] === item.id;
    }
    if (item.kategori === "ecobot") {
      const slot = item.sub as keyof typeof previewOverrides.ecobot;
      return previewOverrides.ecobot[slot] === item.id;
    }
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Sub-Filters and Status Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
        {/* Sub-category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {subCategories.map((s) => (
            <button
              key={s.id}
              onClick={() => setSubFilter(s.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                subFilter === s.id
                  ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          {statusFilters.map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === st.id
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200/70"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of items */}
      {filteredItems.length === 0 ? (
        <Card className="p-8 text-center border-dashed border-2 border-slate-200">
          <p className="text-sm text-slate-500">
            Tidak ada item pada filter ini. Coba pilih filter lainnya!
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <TokoItemCard
              key={item.id}
              item={item}
              statusInfo={item.statusInfo}
              isTryingOn={isTryingOn(item)}
              onTryOn={onTryOn}
              onBuy={onBuy}
              onEquip={onEquip}
            />
          ))}
        </div>
      )}
    </div>
  );
};
