import type { MoveVector } from "../engine/types";
import { TAMAN_KOTA_CONFIG } from "../data/tamanKotaConfig";

export class InputSystem {
  private rawVector: MoveVector = { x: 0, y: 0 };
  private activeVector: MoveVector = { x: 0, y: 0 };
  private lastActionTime = 0;
  private isEnabled = true;
  private deadzone = 0.08;

  setInput(vector: MoveVector) {
    if (!this.isEnabled) {
      this.activeVector = { x: 0, y: 0 };
      return;
    }

    this.rawVector = vector;
    const mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

    if (mag < this.deadzone) {
      this.activeVector = { x: 0, y: 0 };
    } else {
      // Normalize if mag > 1
      const scale = mag > 1 ? 1 / mag : 1;
      this.activeVector = {
        x: vector.x * scale,
        y: vector.y * scale,
      };
    }
  }

  getMovementVector(): MoveVector {
    if (!this.isEnabled) return { x: 0, y: 0 };
    return this.activeVector;
  }

  canTriggerAction(): boolean {
    if (!this.isEnabled) return false;
    const now = Date.now();
    if (now - this.lastActionTime >= TAMAN_KOTA_CONFIG.interaction.actionCooldownMs) {
      this.lastActionTime = now;
      return true;
    }
    return false;
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled) {
      this.activeVector = { x: 0, y: 0 };
      this.rawVector = { x: 0, y: 0 };
    }
  }

  reset() {
    this.activeVector = { x: 0, y: 0 };
    this.rawVector = { x: 0, y: 0 };
  }
}
