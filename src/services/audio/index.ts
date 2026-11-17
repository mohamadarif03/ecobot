/**
 * Web Audio API based sound synthesizer for test tones and game audio.
 * Does not require any external audio files.
 */

class AudioService {
  private ctx: AudioContext | null = null;
  private musicVolume = 0.8;
  private sfxVolume = 0.8;
  private isMuted = false;

  private initContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setVolumes(config: { musicVolume?: number; sfxVolume?: number; muted?: boolean }) {
    if (typeof config.musicVolume === "number") {
      this.musicVolume = Math.max(0, Math.min(100, config.musicVolume)) / 100;
    }
    if (typeof config.sfxVolume === "number") {
      this.sfxVolume = Math.max(0, Math.min(100, config.sfxVolume)) / 100;
    }
    if (typeof config.muted === "boolean") {
      this.isMuted = config.muted;
    }
  }

  /**
   * Plays a short synthesized test tone for previewing audio settings
   */
  public playTestTone(kind: "music" | "sfx"): void {
    if (this.isMuted) return;

    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (kind === "music") {
      // Cheerful gentle 3-note arpeggio (C5 -> E5 -> G5)
      const volume = this.musicVolume;
      if (volume <= 0) return;

      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0, now + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.2 * volume, now + idx * 0.1 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.4);
      });
    } else {
      // Playful snappy eco-pickup ping (rising pitch)
      const volume = this.sfxVolume;
      if (volume <= 0) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5

      gain.gain.setValueAtTime(0.25 * volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    }
  }

  public getContext(): AudioContext | null {
    return this.initContext();
  }
}

export const audioService = new AudioService();
