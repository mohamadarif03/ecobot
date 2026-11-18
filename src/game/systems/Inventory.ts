import type { TrashItemData } from "../engine/types";
import { TAMAN_KOTA_CONFIG } from "../data/tamanKotaConfig";

export class Inventory {
  private items: TrashItemData[] = [];
  private capacity: number;
  private selectedIndex = 0;
  private onChangeCallback?: (data: { items: TrashItemData[]; capacity: number; selectedIndex: number }) => void;

  constructor(bagLevel = 1, onChange?: (data: { items: TrashItemData[]; capacity: number; selectedIndex: number }) => void) {
    this.capacity = TAMAN_KOTA_CONFIG.upgrades.bagCapacityPerLevel[bagLevel] || 3;
    this.onChangeCallback = onChange;
  }

  getCapacity(): number {
    return this.capacity;
  }

  getItems(): TrashItemData[] {
    return [...this.items];
  }

  isFull(): boolean {
    return this.items.length >= this.capacity;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  addItem(item: TrashItemData): boolean {
    if (this.isFull()) return false;
    this.items.push(item);
    // Auto-select the newly picked item
    this.selectedIndex = this.items.length - 1;
    this.notify();
    return true;
  }

  getSelectedItem(): TrashItemData | null {
    if (this.isEmpty()) return null;
    if (this.selectedIndex < 0 || this.selectedIndex >= this.items.length) {
      this.selectedIndex = Math.max(0, this.items.length - 1);
    }
    return this.items[this.selectedIndex] || null;
  }

  removeSelectedItem(): TrashItemData | null {
    if (this.isEmpty()) return null;
    const removed = this.items.splice(this.selectedIndex, 1)[0];
    if (this.selectedIndex >= this.items.length) {
      this.selectedIndex = Math.max(0, this.items.length - 1);
    }
    this.notify();
    return removed || null;
  }

  selectSlot(index: number) {
    if (index >= 0 && index < this.items.length) {
      this.selectedIndex = index;
      this.notify();
    }
  }

  private notify() {
    this.onChangeCallback?.({
      items: [...this.items],
      capacity: this.capacity,
      selectedIndex: this.selectedIndex,
    });
  }

  clear() {
    this.items = [];
    this.selectedIndex = 0;
    this.notify();
  }
}
