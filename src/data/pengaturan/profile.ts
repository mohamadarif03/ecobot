import { hasProfanity } from "../peringkat/profanity.ts";

export interface AvatarOption {
  id: string;
  icon: string;
  label: string;
  deskripsi: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: "robot", icon: "🤖", label: "Robot Pintar", deskripsi: "Sahabat daur ulang berteknologi ramah lingkungan" },
  { id: "fox", icon: "🦊", label: "Rubah Ceria", deskripsi: "Lincah menjelajahi hutan dan taman kota" },
  { id: "girl", icon: "👧", label: "Petualang Cilik", deskripsi: "Selalu bersemangat menjaga kebersihan sungai dan laut" },
  { id: "boy", icon: "👦", label: "Penjaga Taman", deskripsi: "Rajin memilah sampah dan merawat tanaman hijau" },
];

export interface NicknameValidationResult {
  valid: boolean;
  error?: string;
  sanitized?: string;
}

/**
 * Validates player nickname according to child-safety rules:
 * - 2 to 16 characters
 * - Letters, numbers, spaces, and hyphens only
 * - No profanity / vulgar words
 */
export function validateNickname(rawName: string): NicknameValidationResult {
  if (!rawName || typeof rawName !== "string") {
    return { valid: false, error: "Yuk, tulis nama panggilanmu dulu ya!" };
  }

  const trimmed = rawName.trim();

  if (trimmed.length < 2) {
    return { valid: false, error: "Nama panggilan minimal 2 karakter ya!" };
  }

  if (trimmed.length > 16) {
    return { valid: false, error: "Nama panggilan maksimal 16 karakter agar pas di layar." };
  }

  // Letters, numbers, spaces, hyphens
  const validPattern = /^[a-zA-Z0-9\s-]+$/;
  if (!validPattern.test(trimmed)) {
    return {
      valid: false,
      error: "Gunakan huruf, angka, spasi, atau tanda hubung (-) saja ya!",
    };
  }

  if (hasProfanity(trimmed)) {
    return {
      valid: false,
      error: "Wah, pilih nama panggilan yang lebih sopan dan ramah ya!",
    };
  }

  return { valid: true, sanitized: trimmed };
}
