import type { PlayerState } from "../../types/player.ts";

export type ShopCategory = "karakter" | "ecobot" | "stiker";

export type CharacterSubCategory = "topi" | "kacamata" | "aksesori" | "warnaBaju";
export type EcobotSubCategory = "topi" | "kacamata" | "aksesori" | "syal" | "warna";
export type StikerSubCategory = "stiker";

export type ShopSubCategory = CharacterSubCategory | EcobotSubCategory | StikerSubCategory;

export type RequirementType = "gratis" | "beli" | "level" | "badge";

export interface ShopItemRequirement {
  tipe: RequirementType;
  nilai?: number | string; // e.g., level number (3) or badge id ("kota-bersih")
}

export interface ShopItemDefinition {
  id: string;
  nama: string;
  kategori: ShopCategory;
  sub: ShopSubCategory;
  harga: number; // 0 for free/badge items
  syarat: ShopItemRequirement;
  deskripsi: string;
  swatchHex?: string; // for color items
  available: boolean;
}

export type ItemOwnershipStatus =
  | "dimiliki"
  | "dipakai"
  | "bisa_dibeli"
  | "poin_kurang"
  | "terkunci_level"
  | "hadiah_badge";

export interface ItemStatusInfo {
  status: ItemOwnershipStatus;
  label: string;
  canEquip: boolean;
  canBuy: boolean;
  pointsNeeded?: number;
  levelRequired?: number;
  badgeRequiredName?: string;
}
