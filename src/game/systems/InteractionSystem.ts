import { Vector3 } from "@babylonjs/core";
import { TAMAN_KOTA_CONFIG } from "../data/tamanKotaConfig";
import type { ActionPromptState, TrashItemData } from "../engine/types";
import type { TrashBinsSystem, BinItemEntry } from "../entities/trashBins";
import type { TrashSpawner, ActiveTrashInstance } from "./TrashSpawner";
import type { Inventory } from "./Inventory";

export type InteractionTarget =
  | { type: "bin"; bin: BinItemEntry; distance: number }
  | { type: "trash"; trash: ActiveTrashInstance; distance: number }
  | { type: "none" };

export class InteractionSystem {
  private baseDistance = TAMAN_KOTA_CONFIG.interaction.baseDistance;
  private currentTarget: InteractionTarget = { type: "none" };
  private promptState: ActionPromptState = { visible: false, type: "none", label: "" };
  private onPromptChange?: (prompt: ActionPromptState) => void;

  constructor(hasGrabberUpgrade = false, onPromptChange?: (prompt: ActionPromptState) => void) {
    if (hasGrabberUpgrade) {
      this.baseDistance += TAMAN_KOTA_CONFIG.upgrades.grabberDistanceBonus;
    }
    this.onPromptChange = onPromptChange;
  }

  public update(
    playerPos: Vector3,
    binsSystem: TrashBinsSystem,
    trashSpawner: TrashSpawner,
    inventory: Inventory
  ): InteractionTarget {
    let nearestBin: BinItemEntry | null = null;
    let minBinDist = Infinity;

    // Check bins distance
    for (const bin of binsSystem.bins) {
      const dx = bin.position.x - playerPos.x;
      const dz = bin.position.z - playerPos.z;
      const d = Math.sqrt(dx * dx + dz * dz);
      if (d <= this.baseDistance + 0.6 && d < minBinDist) {
        minBinDist = d;
        nearestBin = bin;
      }
    }

    // Check nearest unpicked trash distance
    let nearestTrash: ActiveTrashInstance | null = null;
    let minTrashDist = Infinity;

    for (const t of trashSpawner.activeTrash) {
      if (t.picked) continue;
      const dx = t.root.position.x - playerPos.x;
      const dz = t.root.position.z - playerPos.z;
      const d = Math.sqrt(dx * dx + dz * dz);
      if (d <= this.baseDistance && d < minTrashDist) {
        minTrashDist = d;
        nearestTrash = t;
      }
    }

    // Determine priority
    const hasItems = !inventory.isEmpty();
    const selectedItem = inventory.getSelectedItem();

    let newTarget: InteractionTarget = { type: "none" };
    let newPrompt: ActionPromptState = { visible: false, type: "none", label: "" };

    if (nearestBin && hasItems) {
      // Prioritize throw into bin
      newTarget = { type: "bin", bin: nearestBin, distance: minBinDist };
      binsSystem.setHighlight(nearestBin.id);
      newPrompt = {
        visible: true,
        type: "bin",
        label: "Buang ke " + nearestBin.label,
        subLabel: selectedItem ? `(${selectedItem.name})` : undefined,
        targetId: nearestBin.id,
      };
    } else if (nearestTrash) {
      binsSystem.setHighlight(null);
      newTarget = { type: "trash", trash: nearestTrash, distance: minTrashDist };
      if (!inventory.isFull()) {
        newPrompt = {
          visible: true,
          type: "pickup",
          label: "Ambil " + nearestTrash.data.name,
          subLabel: `Slot: ${inventory.getItems().length}/${inventory.getCapacity()}`,
          targetId: nearestTrash.data.id,
        };
      } else {
        newPrompt = {
          visible: true,
          type: "full",
          label: "Tas Penuh!",
          subLabel: "Buang dulu ke tong ya",
          targetId: nearestTrash.data.id,
        };
      }
    } else {
      binsSystem.setHighlight(null);
      newPrompt = { visible: false, type: "none", label: "" };
    }

    this.currentTarget = newTarget;

    // Notify UI if prompt changed
    if (
      this.promptState.visible !== newPrompt.visible ||
      this.promptState.type !== newPrompt.type ||
      this.promptState.label !== newPrompt.label ||
      this.promptState.subLabel !== newPrompt.subLabel
    ) {
      this.promptState = newPrompt;
      this.onPromptChange?.(newPrompt);
    }

    return this.currentTarget;
  }

  public getCurrentTarget(): InteractionTarget {
    return this.currentTarget;
  }
}
