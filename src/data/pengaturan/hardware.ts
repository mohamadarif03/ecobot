/**
 * Hardware and platform capability detection helpers
 */

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-expect-error msMaxTouchPoints in older IE/Edge
    Boolean(navigator.msMaxTouchPoints > 0)
  );
}

export function detectRecommendedGraphicsQuality(): "low" | "medium" | "high" {
  if (typeof window === "undefined") return "medium";

  const cores = navigator.hardwareConcurrency || 4;
  // @ts-expect-error deviceMemory is supported in Chromium browsers
  const memory = navigator.deviceMemory || 4;

  if (cores >= 8 && memory >= 6) {
    return "high";
  }
  if (cores <= 2 || memory <= 2) {
    return "low";
  }
  return "medium";
}
