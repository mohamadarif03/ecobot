import React from "react";
import type { CharacterCustomization } from "../../types/player.ts";

export interface PlayerAvatarPreviewProps {
  character?: Partial<CharacterCustomization>;
  equippedOverrides?: {
    topi?: string;
    kacamata?: string;
    aksesori?: string;
    warnaBaju?: string;
  };
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const PlayerAvatarPreview: React.FC<PlayerAvatarPreviewProps> = ({
  character = {},
  equippedOverrides,
  className = "",
  size = "md",
}) => {
  const skin = character.skin || "adventurer";
  const outfitColor =
    equippedOverrides?.warnaBaju || character.outfitColor || "#38BDF8";

  // Active accessories (overrides take precedence if previewing)
  const activeTopi = equippedOverrides?.topi !== undefined ? equippedOverrides.topi : character.accessory === "leaf_hat" ? "topi-daun" : undefined;
  const activeKacamata = equippedOverrides?.kacamata !== undefined ? equippedOverrides.kacamata : character.accessory === "eco_goggles" ? "kacamata-pelindung" : undefined;
  const activeAksesori = equippedOverrides?.aksesori;

  // Dimensions
  const dims = {
    sm: "w-24 h-28",
    md: "w-40 h-48",
    lg: "w-52 h-64",
    xl: "w-64 h-76",
  }[size];

  // Skin tone & theme colors
  let headColor = "#FED7AA"; // warm peach
  let hairColor = "#78350F"; // brown
  let pantsColor = "#1E293B"; // slate dark
  let shoesColor = "#0F172A";

  if (skin === "robot_suit") {
    headColor = "#CBD5E1";
    hairColor = "#64748B";
    pantsColor = "#334155";
  } else if (skin === "park_ranger") {
    hairColor = "#451A03";
    pantsColor = "#166534";
  } else if (skin === "clean_astronaut") {
    headColor = "#F1F5F9";
    hairColor = "#0284C7";
    pantsColor = "#E2E8F0";
  }

  return (
    <div
      className={`relative flex items-center justify-center select-none ${dims} ${className}`}
    >
      {/* Soft Ground Shadow */}
      <div className="absolute -bottom-2 w-3/4 h-3 rounded-full bg-slate-900/15 blur-xs" />

      {/* Blocky Character SVG */}
      <svg
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-md"
      >
        {/* ==================== LEGS & SHOES ==================== */}
        {/* Left Leg */}
        <rect x="33" y="78" width="14" height="26" rx="3" fill={pantsColor} />
        <rect x="31" y="100" width="16" height="8" rx="3" fill={shoesColor} />

        {/* Right Leg */}
        <rect x="53" y="78" width="14" height="26" rx="3" fill={pantsColor} />
        <rect x="53" y="100" width="16" height="8" rx="3" fill={shoesColor} />

        {/* ==================== TORSO / SHIRT ==================== */}
        {/* Main Body */}
        <rect
          x="28"
          y="44"
          width="44"
          height="36"
          rx="5"
          fill={outfitColor}
          stroke="#0F172A"
          strokeWidth="2.5"
        />
        {/* Belt */}
        <rect x="28" y="74" width="44" height="6" fill="#0F172A" />
        <rect
          x="46"
          y="73"
          width="8"
          height="8"
          rx="1.5"
          fill="#FACC15"
          stroke="#713F12"
          strokeWidth="1"
        />

        {/* Eco Badge on Chest */}
        <circle cx="39" cy="56" r="4" fill="#22C55E" />
        <path
          d="M38 56L39 58L41 54"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Left Arm */}
        <rect
          x="14"
          y="46"
          width="12"
          height="28"
          rx="4"
          fill={outfitColor}
          stroke="#0F172A"
          strokeWidth="2"
        />
        <rect
          x="15"
          y="70"
          width="10"
          height="7"
          rx="3"
          fill={activeAksesori === "sarung-tangan" ? "#F59E0B" : headColor}
          stroke={activeAksesori === "sarung-tangan" ? "#B45309" : "none"}
          strokeWidth={activeAksesori === "sarung-tangan" ? "1" : "0"}
        />

        {/* Right Arm */}
        <rect
          x="74"
          y="46"
          width="12"
          height="28"
          rx="4"
          fill={outfitColor}
          stroke="#0F172A"
          strokeWidth="2"
        />
        <rect
          x="75"
          y="70"
          width="10"
          height="7"
          rx="3"
          fill={activeAksesori === "sarung-tangan" ? "#F59E0B" : headColor}
          stroke={activeAksesori === "sarung-tangan" ? "#B45309" : "none"}
          strokeWidth={activeAksesori === "sarung-tangan" ? "1" : "0"}
        />

        {/* ==================== HEAD & FACE ==================== */}
        {/* Neck */}
        <rect x="44" y="40" width="12" height="6" rx="1" fill={headColor} />

        {/* Head Block */}
        <rect
          x="30"
          y="14"
          width="40"
          height="30"
          rx="6"
          fill={headColor}
          stroke="#0F172A"
          strokeWidth="2.5"
        />

        {/* Hair Styles based on Skin */}
        {skin !== "robot_suit" && skin !== "clean_astronaut" && (
          <path
            d="M30 24C30 16 36 12 50 12C64 12 70 16 70 24V20C70 16 64 12 50 12C36 12 30 16 30 20Z"
            fill={hairColor}
          />
        )}

        {/* Hair Top Cap */}
        <rect x="29" y="12" width="42" height="8" rx="3" fill={hairColor} />

        {/* Big Cute Eyes */}
        <rect x="38" y="24" width="6" height="8" rx="2" fill="#0F172A" />
        <circle cx="39.5" cy="26" r="1.5" fill="white" />

        <rect x="56" y="24" width="6" height="8" rx="2" fill="#0F172A" />
        <circle cx="57.5" cy="26" r="1.5" fill="white" />

        {/* Pink Blush */}
        <ellipse cx="36" cy="34" rx="3.5" ry="2" fill="#FDA4AF" opacity="0.8" />
        <ellipse cx="64" cy="34" rx="3.5" ry="2" fill="#FDA4AF" opacity="0.8" />

        {/* Smile */}
        <path
          d="M46 34C48 37 52 37 54 34"
          stroke="#0F172A"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* ==================== LAYER: KACAMATA ==================== */}
        {activeKacamata === "kacamata-bulat" && (
          <g>
            <circle cx="41" cy="28" r="7" fill="#E0F2FE" fillOpacity="0.7" stroke="#0F172A" strokeWidth="2" />
            <circle cx="59" cy="28" r="7" fill="#E0F2FE" fillOpacity="0.7" stroke="#0F172A" strokeWidth="2" />
            <line x1="48" y1="28" x2="52" y2="28" stroke="#0F172A" strokeWidth="2" />
            <line x1="29" y1="28" x2="34" y2="28" stroke="#0F172A" strokeWidth="1.5" />
            <line x1="66" y1="28" x2="71" y2="28" stroke="#0F172A" strokeWidth="1.5" />
          </g>
        )}

        {activeKacamata === "kacamata-hijau" && (
          <g>
            <rect x="34" y="22" width="14" height="12" rx="3" fill="#DCFCE7" fillOpacity="0.7" stroke="#16A34A" strokeWidth="2" />
            <rect x="52" y="22" width="14" height="12" rx="3" fill="#DCFCE7" fillOpacity="0.7" stroke="#16A34A" strokeWidth="2" />
            <line x1="48" y1="28" x2="52" y2="28" stroke="#16A34A" strokeWidth="2" />
          </g>
        )}

        {activeKacamata === "kacamata-pelindung" && (
          <g>
            <rect x="29" y="24" width="42" height="4" fill="#0284C7" />
            <rect x="34" y="20" width="13" height="13" rx="3" fill="#38BDF8" stroke="#0369A1" strokeWidth="2" opacity="0.9" />
            <line x1="36" y1="22" x2="42" y2="28" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="53" y="20" width="13" height="13" rx="3" fill="#38BDF8" stroke="#0369A1" strokeWidth="2" opacity="0.9" />
            <line x1="55" y1="22" x2="61" y2="28" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}

        {/* ==================== LAYER: TOPI ==================== */}
        {activeTopi === "topi-daun" && (
          <g>
            <ellipse cx="50" cy="12" rx="18" ry="5" fill="#15803D" stroke="#14532D" strokeWidth="1.5" />
            <path d="M50 7C48 1 54 -1 56 2C58 5 54 7 50 7Z" fill="#22C55E" stroke="#15803D" strokeWidth="1" />
            <path d="M50 7V10" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}

        {activeTopi === "topi-jerami" && (
          <g>
            <ellipse cx="50" cy="12" rx="26" ry="6" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
            <path d="M35 11C35 -1 41 -6 50 -6C59 -6 65 -1 65 11Z" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
            <rect x="36" y="7" width="28" height="4" fill="#0284C7" />
          </g>
        )}

        {activeTopi === "topi-pelindung" && (
          <g>
            <path d="M30 13C30 0 38 -5 50 -5C62 -5 70 0 70 13H30Z" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
            <rect x="25" y="11" width="50" height="5" rx="2" fill="#38BDF8" stroke="#0369A1" strokeWidth="1.5" />
            <circle cx="50" cy="3" r="4" fill="#22C55E" />
          </g>
        )}

        {activeTopi === "helm-relawan" && (
          <g>
            <path d="M28 14C28 -2 36 -8 50 -8C64 -8 72 -2 72 14H28Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
            <rect x="24" y="11" width="52" height="5" rx="2" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
            <circle cx="50" cy="3" r="4.5" fill="#15803D" />
            <circle cx="50" cy="3" r="2" fill="#86EFAC" />
          </g>
        )}

        {/* ==================== LAYER: AKSESORI ==================== */}
        {activeAksesori === "syal-hijau" && (
          <g>
            <path d="M32 40C32 40 50 48 68 40C70 46 66 52 56 52C46 52 38 48 32 40Z" fill="#16A34A" stroke="#14532D" strokeWidth="2" />
            <path d="M54 48V62C54 64 60 64 60 62V46" fill="#22C55E" stroke="#14532D" strokeWidth="1.5" />
          </g>
        )}

        {activeAksesori === "tas-kain" && (
          <g>
            {/* Strap across chest */}
            <line x1="32" y1="44" x2="68" y2="76" stroke="#475569" strokeWidth="2.5" />
            {/* Bag resting on side */}
            <rect x="64" y="66" width="16" height="18" rx="3" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
            <circle cx="72" cy="75" r="3" fill="#22C55E" />
          </g>
        )}

        {activeAksesori === "tas-daur-ulang" && (
          <g>
            {/* Backpack straps */}
            <rect x="33" y="46" width="4" height="26" rx="2" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
            <rect x="63" y="46" width="4" height="26" rx="2" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
          </g>
        )}
      </svg>
    </div>
  );
};

// Also export alias CharacterPreview for backwards compatibility
export const CharacterPreview = PlayerAvatarPreview;
export default PlayerAvatarPreview;
