import React, { useState } from "react";

// TODO: Jika aset PNG /assets/ecobot/ecobot-wave.png tersedia dan ingin diwarnai secara dinamis,
// gunakan mask-image CSS atau siapkan varian file per warna. Saat ini pewarnaan dan aksesori berlapis
// dirender presisi melalui SVG layering kawaii bawaan.

export interface EcobotEquippedOverrides {
  topi?: string;
  kacamata?: string;
  aksesori?: string;
  syal?: string;
  warna?: string;
}

interface EcobotMascotProps {
  className?: string;
  size?: "mini" | "sidebar" | "hero" | "banner";
  pose?: "wave" | "thumbs-up" | "happy";
  equippedOverrides?: EcobotEquippedOverrides;
}

export const EcobotMascot: React.FC<EcobotMascotProps> = ({
  className = "",
  size = "sidebar",
  equippedOverrides,
}) => {
  // If accessories or custom colors are equipped, prefer SVG renderer to accurately stack layers
  const hasCustomCosmetics =
    !!equippedOverrides &&
    (!!equippedOverrides.topi ||
      !!equippedOverrides.kacamata ||
      !!equippedOverrides.aksesori ||
      !!equippedOverrides.syal ||
      (!!equippedOverrides.warna && equippedOverrides.warna !== "ecobot-warna-biru"));

  const [imgError, setImgError] = useState(false);

  // If no custom cosmetics and image exists, can show standard PNG
  if (!imgError && !hasCustomCosmetics) {
    return (
      <img
        src="/assets/ecobot/ecobot-wave.png"
        alt="Maskot Ecobot - Robot Daur Ulang Biru Langit"
        onError={() => setImgError(true)}
        className={`${className} object-contain pointer-events-none select-none`}
      />
    );
  }

  const isMini = size === "mini";
  const viewBox = isMini ? "0 0 36 36" : "0 0 160 160";

  // Body color based on equipped color
  const colorId = equippedOverrides?.warna || "ecobot-warna-biru";
  const bodyColorMap: Record<string, { main: string; dark: string; light: string }> = {
    "ecobot-warna-biru": { main: "#4ADE80", dark: "#15803D", light: "#BAE6FD" },
    "ecobot-warna-mint": { main: "#34D399", dark: "#059669", light: "#A7F3D0" },
    "ecobot-warna-kuning": { main: "#FBBF24", dark: "#D97706", light: "#FDE68A" },
    "ecobot-warna-pink": { main: "#F472B6", dark: "#DB2777", light: "#FBCFE8" },
    "ecobot-emas": { main: "#F59E0B", dark: "#B45309", light: "#FEF08A" },
  };
  const bodyColors = bodyColorMap[colorId] || bodyColorMap["ecobot-warna-biru"];

  const activeTopi = equippedOverrides?.topi;
  const activeKacamata = equippedOverrides?.kacamata;
  const activeAksesori = equippedOverrides?.aksesori;
  const activeSyal = equippedOverrides?.syal;

  if (isMini) {
    return (
      <svg
        className={className}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Ecobot Mini"
      >
        {/* Leaf sprout on top */}
        <path d="M18 7C18 3.5 22 3 23 6C23 8.5 20 9 18 9" fill="#22C55E" />
        <path d="M18 8C17 5 14 5 14 7.5C14 9.5 16.5 9.5 18 9.5" fill="#16A34A" />
        <path d="M18 7V10" stroke="#15803D" strokeWidth="1.2" strokeLinecap="round" />
        {/* Head chassis */}
        <rect x="7" y="10" width="22" height="18" rx="7" fill={bodyColors.main} />
        {/* Face screen */}
        <rect x="9.5" y="12.5" width="17" height="13" rx="4.5" fill="#0F172A" />
        {/* Big eyes */}
        <circle cx="14" cy="18.5" r="2.4" fill={bodyColors.main} />
        <circle cx="14.8" cy="17.7" r="0.9" fill="#FFFFFF" />
        <circle cx="22" cy="18.5" r="2.4" fill={bodyColors.main} />
        <circle cx="22.8" cy="17.7" r="0.9" fill="#FFFFFF" />
        {/* Cheeks */}
        <circle cx="11.5" cy="21.5" r="1.3" fill="#FB7185" opacity="0.8" />
        <circle cx="24.5" cy="21.5" r="1.3" fill="#FB7185" opacity="0.8" />
      </svg>
    );
  }

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        className="w-full h-full pointer-events-none select-none filter drop-shadow-md"
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Maskot Ecobot"
      >
        <defs>
          <linearGradient id="ecobot-chassis-grad-custom" x1="80" y1="44" x2="80" y2="128" gradientUnits="userSpaceOnUse">
            <stop stopColor={bodyColors.main} />
            <stop offset="1" stopColor={bodyColors.dark} />
          </linearGradient>
        </defs>

        {/* Glow / Antenna shadow */}
        <circle cx="80" cy="22" r="6" fill="#22C55E" opacity="0.3" />

        {/* Leaf Sprout Antenna */}
        <path
          d="M80 34C80 18 100 15 106 28C106 38 92 41 80 39"
          fill="#22C55E"
          stroke="#16A34A"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M80 37C76 24 62 23 60 33C58 41 71 43 78 40"
          fill="#4ADE80"
          stroke="#16A34A"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M80 32V46"
          stroke="#15803D"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* ACCESSORY: Pita Daun on Antenna */}
        {activeAksesori === "ecobot-pita-daun" && (
          <g>
            <path d="M78 36C68 30 64 42 76 40Z" fill="#16A34A" stroke="#14532D" strokeWidth="1.5" />
            <path d="M82 36C92 30 96 42 84 40Z" fill="#16A34A" stroke="#14532D" strokeWidth="1.5" />
            <circle cx="80" cy="38" r="4.5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
          </g>
        )}

        {/* Robot Ears / Bolts */}
        <rect x="22" y="72" width="10" height="20" rx="4" fill={bodyColors.dark} />
        <rect x="128" y="72" width="10" height="20" rx="4" fill={bodyColors.dark} />

        {/* Robot Head Body */}
        <rect
          x="28"
          y="44"
          width="104"
          height="84"
          rx="34"
          fill="url(#ecobot-chassis-grad-custom)"
          stroke={bodyColors.dark}
          strokeWidth="3.5"
        />

        {/* Gloss shine on head */}
        <path
          d="M48 54C62 48 98 48 112 54"
          stroke={bodyColors.light}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Face Screen */}
        <rect
          x="38"
          y="56"
          width="84"
          height="60"
          rx="22"
          fill="#0F172A"
          stroke="#334155"
          strokeWidth="2.5"
        />

        {/* Big Round Happy Eyes */}
        <g>
          <circle cx="60" cy="84" r="12" fill={bodyColors.main} />
          <circle cx="64" cy="80" r="4.2" fill="#FFFFFF" />
          <circle cx="58" cy="88" r="1.8" fill="#FFFFFF" />

          <circle cx="100" cy="84" r="12" fill={bodyColors.main} />
          <circle cx="104" cy="80" r="4.2" fill="#FFFFFF" />
          <circle cx="98" cy="88" r="1.8" fill="#FFFFFF" />
        </g>

        {/* Blushing Cheeks */}
        <circle cx="48" cy="98" r="6" fill="#FB7185" opacity="0.75" />
        <circle cx="112" cy="98" r="6" fill="#FB7185" opacity="0.75" />

        {/* Happy Smile */}
        <path
          d="M74 94C76 98 84 98 86 94"
          stroke={bodyColors.main}
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Waving Arm (Right) */}
        <g>
          <path
            d="M132 94C144 86 150 72 144 60C140 52 130 54 132 64C134 72 130 82 124 88"
            fill={bodyColors.main}
            stroke={bodyColors.dark}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="144" cy="58" r="6" fill={bodyColors.main} stroke={bodyColors.dark} strokeWidth="2.5" />
        </g>

        {/* Rest Arm (Left) */}
        <path
          d="M28 92C18 96 14 104 16 112C18 118 26 116 26 108"
          fill={bodyColors.main}
          stroke={bodyColors.dark}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* ACCESSORY: Kacamata Keren */}
        {activeKacamata === "ecobot-kacamata" && (
          <g>
            <rect x="44" y="74" width="32" height="20" rx="5" fill="#0F172A" stroke="#334155" strokeWidth="2.5" />
            <rect x="84" y="74" width="32" height="20" rx="5" fill="#0F172A" stroke="#334155" strokeWidth="2.5" />
            <line x1="76" y1="84" x2="84" y2="84" stroke="#0F172A" strokeWidth="3" />
            <line x1="48" y1="78" x2="64" y2="90" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" />
            <line x1="88" y1="78" x2="104" y2="90" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {/* ACCESSORY: Topi Kapten */}
        {activeTopi === "ecobot-topi-kapten" && (
          <g>
            <ellipse cx="80" cy="46" rx="46" ry="12" fill="#0F172A" stroke="#334155" strokeWidth="2.5" />
            <path d="M48 44C48 20 60 12 80 12C100 12 112 20 112 44H48Z" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3" />
            <rect x="52" y="38" width="56" height="6" fill="#F59E0B" />
            <circle cx="80" cy="26" r="6" fill="#F59E0B" />
          </g>
        )}

        {/* ACCESSORY: Mahkota Bunga */}
        {activeTopi === "ecobot-mahkota-bunga" && (
          <g>
            <ellipse cx="80" cy="44" rx="44" ry="10" fill="none" stroke="#15803D" strokeWidth="3" />
            <circle cx="56" cy="40" r="7" fill="#F43F5E" />
            <circle cx="56" cy="40" r="3" fill="#FEF08A" />
            <circle cx="80" cy="34" r="8" fill="#F59E0B" />
            <circle cx="80" cy="34" r="3.5" fill="#FFFFFF" />
            <circle cx="104" cy="40" r="7" fill="#8B5CF6" />
            <circle cx="104" cy="40" r="3" fill="#FEF08A" />
          </g>
        )}

        {/* ACCESSORY: Syal Biru */}
        {activeSyal === "ecobot-syal-biru" && (
          <g>
            <path d="M42 120C42 120 80 134 118 120C122 130 114 140 96 142C76 142 56 138 42 128V120Z" fill="#15803D" stroke="#0369A1" strokeWidth="3" />
            <path d="M92 134V154C92 158 104 158 104 154V130" fill="#4ADE80" stroke="#0369A1" strokeWidth="2.5" />
          </g>
        )}
      </svg>
    </div>
  );
};
