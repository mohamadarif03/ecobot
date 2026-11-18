import type { PlayerState } from "../types/player.ts";

export interface Game3DCharacterAppearance {
  skin: string;
  outfitColorHex: string;
  topiId: string | null;
  kacamataId: string | null;
  aksesoriId: string | null;
}

/**
 * Bridge helper for future 3D WebGL / Three.js game engine
 * Reads the latest cosmetics from inventory and player state
 */
export function get3DCharacterAppearance(state: PlayerState): Game3DCharacterAppearance {
  const equipped = state.inventory?.equipped?.character || {};
  const outfitColor = state.character?.outfitColor || "#4ADE80";

  return {
    skin: state.character?.skin || "adventurer",
    outfitColorHex: outfitColor,
    topiId: equipped.topi || null,
    kacamataId: equipped.kacamata || null,
    aksesoriId: equipped.aksesori || null,
  };
}
