import React, { useEffect } from "react";
import { usePlayerStore } from "../../store/playerStore";
import { audioService } from "../../services/audio/index.ts";

export const SettingsApplier: React.FC = () => {
  const { state } = usePlayerStore();
  const settings = state.settings;

  // 1. Sync Audio Service
  useEffect(() => {
    if (settings) {
      audioService.setVolumes({
        musicVolume: settings.musicVolume,
        sfxVolume: settings.sfxVolume,
        muted: settings.muted,
      });
    }
  }, [settings?.musicVolume, settings?.sfxVolume, settings?.muted]);

  // 2. Accessibility & Display attributes on documentElement
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    const reduceMotionSetting = settings?.reduceMotion || "ikuti";

    const applyMotion = (matchesPrefersReduce: boolean) => {
      if (reduceMotionSetting === "ya") {
        root.setAttribute("data-reduce-motion", "true");
      } else if (reduceMotionSetting === "tidak") {
        root.setAttribute("data-reduce-motion", "false");
      } else {
        root.setAttribute("data-reduce-motion", matchesPrefersReduce ? "true" : "false");
      }
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    applyMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (reduceMotionSetting === "ikuti") {
        applyMotion(e.matches);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    // Text Size
    const textSize = settings?.textSize || "normal";
    root.setAttribute("data-text-size", textSize);

    // High Contrast
    const highContrast = Boolean(settings?.highContrast);
    root.setAttribute("data-high-contrast", highContrast ? "true" : "false");

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  }, [settings?.reduceMotion, settings?.textSize, settings?.highContrast]);

  return null;
};
