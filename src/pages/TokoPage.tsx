import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { User, Bot, Smile, ShoppingBag } from "lucide-react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { usePlayerStore } from "../store/playerStore";
import { TokoHero } from "../components/toko/TokoHero";
import { TokoCatalogTab } from "../components/toko/TokoCatalogTab";
import { KoleksikuTab } from "../components/toko/KoleksikuTab";
import { TokoRightPanel } from "../components/toko/TokoRightPanel";
import { TokoPurchaseConfirmModal } from "../components/toko/TokoPurchaseConfirmModal";
import Tabs from "../components/ui/Tabs";
import { calculateLevel } from "../data/levels";
import { ALL_SHOP_ITEMS } from "../data/toko/items";
import type {
  ShopCategory,
  ShopItemDefinition,
} from "../data/toko/types.ts";
import type { InventoryEquipped } from "../types/player.ts";

export const TokoPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTab = searchParams.get("tab") || "karakter";
  const activeTab = ["karakter", "ecobot", "stiker", "koleksi"].includes(rawTab)
    ? rawTab
    : "karakter";

  const targetItemId = searchParams.get("item");

  const {
    state,
    purchaseItem,
    equipItem,
    unequipItem,
    resetAppearance,
    getShopItems,
    getEquipped,
    getAffordableItems,
    getNearestAffordable,
  } = usePlayerStore();

  const levelInfo = calculateLevel(state.xp);
  const equipped = getEquipped();
  const shopItems = getShopItems(activeTab !== "koleksi" ? activeTab : undefined);
  const affordableItems = getAffordableItems();
  const nearestAffordableResult = getNearestAffordable();

  // Temporary Preview Overrides for "Coba Dulu"
  const [previewOverrides, setPreviewOverrides] = useState<InventoryEquipped>(() => ({
    character: { ...equipped.character },
    ecobot: { ...equipped.ecobot },
    stiker: equipped.stiker,
  }));

  // Update preview when real equipped changes if not trying on
  const [hasActivePreview, setHasActivePreview] = useState(false);

  useEffect(() => {
    if (!hasActivePreview) {
      setPreviewOverrides({
        character: { ...equipped.character },
        ecobot: { ...equipped.ecobot },
        stiker: equipped.stiker,
      });
    }
  }, [equipped, hasActivePreview]);

  // Modal confirmation state
  const [itemToBuy, setItemToBuy] = useState<ShopItemDefinition | null>(null);

  // If URL has ?item=..., automatically open it if valid
  useEffect(() => {
    if (targetItemId) {
      const found = ALL_SHOP_ITEMS.find((it) => it.id === targetItemId);
      if (found) {
        // Switch tab to item category
        if (found.kategori !== activeTab && activeTab !== "koleksi") {
          setSearchParams({ tab: found.kategori, item: found.id });
        }
      }
    }
  }, [targetItemId, activeTab, setSearchParams]);

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  const handleTryOn = (item: ShopItemDefinition) => {
    setHasActivePreview(true);
    setPreviewOverrides((prev) => {
      const next = {
        character: { ...prev.character },
        ecobot: { ...prev.ecobot },
        stiker: prev.stiker,
      };

      if (item.kategori === "karakter") {
        if (item.sub === "topi") next.character.topi = item.id;
        else if (item.sub === "kacamata") next.character.kacamata = item.id;
        else if (item.sub === "aksesori") next.character.aksesori = item.id;
        else if (item.sub === "warnaBaju") next.character.warnaBaju = item.swatchHex;
      } else if (item.kategori === "ecobot") {
        if (item.sub === "topi") next.ecobot.topi = item.id;
        else if (item.sub === "kacamata") next.ecobot.kacamata = item.id;
        else if (item.sub === "aksesori") next.ecobot.aksesori = item.id;
        else if (item.sub === "syal") next.ecobot.syal = item.id;
        else if (item.sub === "warna") next.ecobot.warna = item.id;
      }

      return next;
    });
  };

  const handleClearPreview = () => {
    setHasActivePreview(false);
    setPreviewOverrides({
      character: { ...equipped.character },
      ecobot: { ...equipped.ecobot },
      stiker: equipped.stiker,
    });
  };

  const handleBuyClick = (item: ShopItemDefinition) => {
    setItemToBuy(item);
  };

  const handleConfirmPurchase = (item: ShopItemDefinition) => {
    const res = purchaseItem(item.id);
    setItemToBuy(null);
    if (res.success) {
      // Automatically equip bought item right away
      equipItem(item.sub, item.id);
      handleClearPreview();
    }
  };

  const handleEquipItem = (item: ShopItemDefinition) => {
    equipItem(item.sub, item.id);
    handleClearPreview();
  };

  const tabsConfig = [
    {
      id: "karakter",
      label: "Karakter",
      icon: <User className="w-4 h-4" />,
    },
    {
      id: "ecobot",
      label: "Ecobot",
      icon: <Bot className="w-4 h-4" />,
    },
    {
      id: "stiker",
      label: "Stiker Profil",
      icon: <Smile className="w-4 h-4" />,
    },
    {
      id: "koleksi",
      label: "Koleksiku",
      count: Object.keys(state.inventory?.owned || {}).length,
      icon: <ShoppingBag className="w-4 h-4" />,
    },
  ];

  return (
    <DashboardLayout
      title="Toko Ecobot"
      subtitle="Tukar poin belajarmu jadi gaya keren"
    >
      <div className="space-y-6">
        {/* Hero Banner */}
        <TokoHero
          nickname={state.nickname}
          points={state.points}
          ownedCount={Object.keys(state.inventory?.owned || {}).length}
          totalItems={ALL_SHOP_ITEMS.length}
          level={levelInfo.level}
          equippedEcobot={equipped.ecobot}
          nearestAffordable={
            nearestAffordableResult ? nearestAffordableResult.item : null
          }
          onOpenKoleksi={() => handleTabChange("koleksi")}
          onQuickBuy={handleBuyClick}
        />

        {/* Navigation Tabs */}
        <div className="border-b border-slate-200">
          <Tabs
            tabs={tabsConfig}
            activeTab={activeTab}
            onChange={handleTabChange}
          />
        </div>

        {/* Main Grid: Content (Left) + Right Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Catalog or Collection) */}
          <div className="lg:col-span-2">
            {activeTab === "koleksi" ? (
              <KoleksikuTab
                owned={state.inventory?.owned || {}}
                equipped={equipped}
                onEquip={handleEquipItem}
                onUnequip={(slot, targetType) => unequipItem(slot, targetType)}
                onResetAppearance={resetAppearance}
                onNavigateToCatalog={(cat) => handleTabChange(cat)}
              />
            ) : (
              <TokoCatalogTab
                category={activeTab as ShopCategory}
                items={shopItems}
                previewOverrides={previewOverrides}
                onTryOn={handleTryOn}
                onBuy={handleBuyClick}
                onEquip={handleEquipItem}
              />
            )}
          </div>

          {/* Right Column (Pratinjauku) */}
          <div className="lg:col-span-1">
            <TokoRightPanel
              points={state.points}
              character={state.character}
              equipped={equipped}
              previewOverrides={previewOverrides}
              hasActivePreview={hasActivePreview}
              onClearPreview={handleClearPreview}
              onResetAppearance={resetAppearance}
            />
          </div>
        </div>
      </div>

      {/* Confirmation Purchase Modal */}
      <TokoPurchaseConfirmModal
        item={itemToBuy}
        currentPoints={state.points}
        isOpen={!!itemToBuy}
        onClose={() => setItemToBuy(null)}
        onConfirm={handleConfirmPurchase}
      />
    </DashboardLayout>
  );
};

export default TokoPage;
