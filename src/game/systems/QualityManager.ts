import type { GraphicsQuality } from "../engine/types";

export class QualityManager {
  private currentQuality: GraphicsQuality = "medium";
  private engine: any;
  private fpsBuffer: number[] = [];
  private lastCheckTime = Date.now();
  private hasAutoDowngraded = false;
  private onQualityChange?: (newQuality: GraphicsQuality) => void;

  constructor(engine: any, initialQuality: GraphicsQuality = "medium", onQualityChange?: (newQuality: GraphicsQuality) => void) {
    this.engine = engine;
    this.currentQuality = initialQuality;
    this.onQualityChange = onQualityChange;
    this.applyQuality(initialQuality);
  }

  public applyQuality(quality: GraphicsQuality) {
    this.currentQuality = quality;

    if (!this.engine) return;

    if (quality === "low") {
      this.engine.setHardwareScalingLevel(1.5);
    } else if (quality === "medium") {
      this.engine.setHardwareScalingLevel(1.15);
    } else {
      this.engine.setHardwareScalingLevel(1.0);
    }
  }

  public monitorFps(dt: number) {
    if (this.hasAutoDowngraded) return;

    const fps = this.engine?.getFps() || 60;
    this.fpsBuffer.push(fps);
    if (this.fpsBuffer.length > 90) this.fpsBuffer.shift();

    const now = Date.now();
    if (now - this.lastCheckTime >= 3500 && this.fpsBuffer.length >= 60) {
      this.lastCheckTime = now;
      const avgFps = this.fpsBuffer.reduce((a, b) => a + b, 0) / this.fpsBuffer.length;

      // If average FPS < 24 and not on low quality, adaptively downgrade
      if (avgFps < 24) {
        if (this.currentQuality === "high") {
          this.applyQuality("medium");
          this.hasAutoDowngraded = true;
          this.onQualityChange?.("medium");
        } else if (this.currentQuality === "medium") {
          this.applyQuality("low");
          this.hasAutoDowngraded = true;
          this.onQualityChange?.("low");
        }
      }
    }
  }

  public getQuality(): GraphicsQuality {
    return this.currentQuality;
  }
}
