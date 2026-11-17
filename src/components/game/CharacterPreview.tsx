import React from "react";
import type { CharacterCustomization } from "../../types/player";

interface CharacterPreviewProps {
  character: CharacterCustomization;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const CharacterPreview: React.FC<CharacterPreviewProps> = ({
  character,
  className = "",
  size = "md",
}) => {
  const { skin, outfitColor, accessory } = character;

  // Dimensions
  const dims = {
    sm: "w-24 h-28",
    md: "w-40 h-48",
    lg: "w-52 h-64",
  }[size];

  // Primary outfit color with fallback
  const shirtColor = outfitColor || "#38BDF8";

  // Skin tone & theme colors
  let headColor = "#FED7AA"; // warm peach
  let hairColor = "#78350F"; // brown
  let pantsColor = "#1E293B"; // slate dark
  let shoesColor = "#0F172A";

  if (skin === "robot_suit") {
    headColor = "#CBD5E1"; // metallic light
    hairColor = "#64748B";
    pantsColor = "#334155";
  } else if (skin === "park_ranger") {
    hairColor = "#451A03";
    pantsColor = "#166534"; // deep forest
  } else if (skin === "clean_astronaut") {
    headColor = "#F1F5F9";
    hairColor = "#0284C7";
    pantsColor = "#E2E8F0";
  }

  return (
    <div className={`relative flex items-center justify-center select-none ${dims} ${className}`}>
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
        {/* Left Shoe */}
        <rect x="31" y="100" width="16" height="8" rx="3" fill={shoesColor} />

        {/* Right Leg */}
        <rect x="53" y="78" width="14" height="26" rx="3" fill={pantsColor} />
        {/* Right Shoe */}
        <rect x="53" y="100" width="16" height="8" rx="3" fill={shoesColor} />

        {/* ==================== TORSO / SHIRT ==================== */}
        {/* Main Body */}
        <rect x="28" y="44" width="44" height="36" rx="5" fill={shirtColor} stroke="#0F172A" strokeWidth="2.5" />
        {/* Belt */}
        <rect x="28" y="74" width="44" height="6" fill="#0F172A" />
        <rect x="46" y="73" width="8" height="8" rx="1.5" fill="#FACC15" stroke="#713F12" strokeWidth="1" />

        {/* Eco Badge on Chest */}
        <circle cx="39" cy="56" r="4" fill="#22C55E" />
        <path d="M38 56L39 58L41 54" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Left Arm */}
        <rect x="14" y="46" width="12" height="28" rx="4" fill={shirtColor} stroke="#0F172A" strokeWidth="2" />
        <rect x="15" y="70" width="10" height="7" rx="3" fill={headColor} />

        {/* Right Arm */}
        <rect x="74" y="46" width="12" height="28" rx="4" fill={shirtColor} stroke="#0F172A" strokeWidth="2" />
        <rect x="75" y="70" width="10" height="7" rx="3" fill={headColor} />

        {/* ==================== HEAD & FACE ==================== */}
        {/* Neck */}
        <rect x="44" y="40" width="12" height="6" rx="1" fill={headColor} />

        {/* Head Block */}
        <rect x="30" y="14" width="40" height="30" rx="6" fill={headColor} stroke="#0F172A" strokeWidth="2.5" />

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
        <path d="M46 34C48 37 52 37 54 34" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />

        {/* ==================== ACCESSORIES ==================== */}
        {/* Leaf Hat */}
        {accessory === "leaf_hat" && (
          <g>
            <ellipse cx="50" cy="12" rx="16" ry="4" fill="#15803D" />
            <path d="M50 8C48 2 54 0 56 3C58 6 54 8 50 8Z" fill="#22C55E" stroke="#15803D" strokeWidth="1" />
            <path d="M50 8V11" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}

        {/* Eco Goggles */}
        {accessory === "eco_goggles" && (
          <g>
            {/* Goggle Strap */}
            <rect x="29" y="25" width="42" height="4" fill="#0284C7" />
            {/* Left Lens */}
            <rect x="35" y="21" width="12" height="12" rx="3" fill="#38BDF8" stroke="#0369A1" strokeWidth="2" opacity="0.9" />
            <line x1="37" y1="23" x2="43" y2="29" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            {/* Right Lens */}
            <rect x="53" y="21" width="12" height="12" rx="3" fill="#38BDF8" stroke="#0369A1" strokeWidth="2" opacity="0.9" />
            <line x1="55" y1="23" x2="61" y2="29" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}

        {/* Robot Antenna for Robot Skin */}
        {skin === "robot_suit" && (
          <g>
            <rect x="48" y="5" width="4" height="8" rx="1" fill="#64748B" />
            <circle cx="50" cy="4" r="3" fill="#38BDF8" />
          </g>
        )}

        {/* Astronaut Helmet Visor */}
        {skin === "clean_astronaut" && (
          <rect x="33" y="18" width="34" height="18" rx="6" fill="#0284C7" opacity="0.4" stroke="#38BDF8" strokeWidth="2" />
        )}
      </svg>
    </div>
  );
};
