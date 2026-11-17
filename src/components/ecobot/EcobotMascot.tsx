import React, { useState } from "react";

// TODO: Ganti placeholder SVG ini dengan aset final gambar Ecobot dari /assets/ecobot/ecobot-wave.png jika file gambar sudah disiapkan.
interface EcobotMascotProps {
  className?: string;
  size?: "mini" | "sidebar" | "hero" | "banner";
  pose?: "wave" | "thumbs-up" | "happy";
}

export const EcobotMascot: React.FC<EcobotMascotProps> = ({
  className = "",
  size = "sidebar",
}) => {
  const [imgError, setImgError] = useState(false);

  // If the actual image file exists at /assets/ecobot/ecobot-wave.png, display it
  if (!imgError) {
    return (
      <img
        src="/assets/ecobot/ecobot-wave.png"
        alt="Maskot Ecobot - Robot Daur Ulang Biru Langit"
        onError={() => setImgError(true)}
        className={`${className} object-contain pointer-events-none select-none`}
      />
    );
  }

  // High-fidelity fallback SVG: Cute friendly sky-blue robot with green leaf sprout on head, big round eyes, pink cheeks, and waving hand
  const isMini = size === "mini";
  const viewBox = isMini ? "0 0 36 36" : "0 0 160 160";

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
        <rect x="7" y="10" width="22" height="18" rx="7" fill="#38BDF8" />
        {/* Face screen */}
        <rect x="9.5" y="12.5" width="17" height="13" rx="4.5" fill="#0F172A" />
        {/* Big eyes */}
        <circle cx="14" cy="18.5" r="2.4" fill="#38BDF8" />
        <circle cx="14.8" cy="17.7" r="0.9" fill="#FFFFFF" />
        <circle cx="22" cy="18.5" r="2.4" fill="#38BDF8" />
        <circle cx="22.8" cy="17.7" r="0.9" fill="#FFFFFF" />
        {/* Cheeks */}
        <circle cx="11.5" cy="21.5" r="1.3" fill="#FB7185" opacity="0.8" />
        <circle cx="24.5" cy="21.5" r="1.3" fill="#FB7185" opacity="0.8" />
      </svg>
    );
  }

  return (
    <svg
      className={`${className} pointer-events-none select-none`}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Maskot Ecobot"
    >
      {/* Glow / Antenna shadow */}
      <circle cx="80" cy="22" r="6" fill="#22C55E" opacity="0.3" />

      {/* Leaf Sprout Antenna (Green sprout on top of head) */}
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

      {/* Robot Ears / Bolts */}
      <rect x="22" y="72" width="10" height="20" rx="4" fill="#0284C7" />
      <rect x="128" y="72" width="10" height="20" rx="4" fill="#0284C7" />

      {/* Robot Head Body (Sky Blue Rounded Chassis) */}
      <rect
        x="28"
        y="44"
        width="104"
        height="84"
        rx="34"
        fill="url(#ecobot-chassis-grad)"
        stroke="#0284C7"
        strokeWidth="3.5"
      />

      {/* Gloss shine on head */}
      <path
        d="M48 54C62 48 98 48 112 54"
        stroke="#BAE6FD"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Face Screen (Dark Navy with Soft Bezel) */}
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

      {/* Big Round Happy Eyes (Cyan glow with gleam) */}
      <g>
        {/* Left Eye */}
        <circle cx="60" cy="84" r="12" fill="#38BDF8" />
        <circle cx="64" cy="80" r="4.2" fill="#FFFFFF" />
        <circle cx="58" cy="88" r="1.8" fill="#FFFFFF" />

        {/* Right Eye */}
        <circle cx="100" cy="84" r="12" fill="#38BDF8" />
        <circle cx="104" cy="80" r="4.2" fill="#FFFFFF" />
        <circle cx="98" cy="88" r="1.8" fill="#FFFFFF" />
      </g>

      {/* Blushing Cheeks (Pink soft dots) */}
      <circle cx="48" cy="98" r="6" fill="#FB7185" opacity="0.75" />
      <circle cx="112" cy="98" r="6" fill="#FB7185" opacity="0.75" />

      {/* Happy Smile */}
      <path
        d="M74 94C76 98 84 98 86 94"
        stroke="#38BDF8"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Cute Waving Arm (Right Arm) */}
      <g>
        <path
          d="M132 94C144 86 150 72 144 60C140 52 130 54 132 64C134 72 130 82 124 88"
          fill="#38BDF8"
          stroke="#0284C7"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Hand mitten */}
        <circle cx="142" cy="58" r="9" fill="#0EA5E9" stroke="#0284C7" strokeWidth="2.5" />
        <circle cx="140" cy="54" r="4" fill="#38BDF8" />
      </g>

      {/* Left Relaxed Arm */}
      <path
        d="M28 92C18 100 16 112 20 122"
        stroke="#0EA5E9"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle cx="20" cy="122" r="7" fill="#38BDF8" />

      {/* Lower Chassis / Torso with Leaf Emblem */}
      <path
        d="M50 128H110C110 128 104 150 80 150C56 150 50 128 50 128Z"
        fill="#0284C7"
        stroke="#0369A1"
        strokeWidth="2.5"
      />
      {/* Torso Badge (Recycling Leaf) */}
      <path
        d="M80 134C84 134 88 138 88 142C84 142 80 146 80 146C80 146 76 142 72 142C72 138 76 134 80 134Z"
        fill="#22C55E"
      />

      {/* Gradients */}
      <defs>
        <linearGradient
          id="ecobot-chassis-grad"
          x1="28"
          y1="44"
          x2="132"
          y2="128"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#38BDF8" />
          <stop offset="0.5" stopColor="#22B8F0" />
          <stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
    </svg>
  );
};
