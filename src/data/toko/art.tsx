import React from "react";

interface ItemArtProps {
  itemId: string;
  className?: string;
}

export const ItemArt: React.FC<ItemArtProps> = ({ itemId, className = "w-full h-full" }) => {
  switch (itemId) {
    // ---------------- TOPIS ----------------
    case "topi-daun":
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <ellipse cx="40" cy="50" rx="30" ry="12" fill="#15803D" stroke="#14532D" strokeWidth="2" />
          <path d="M40 38C34 22 46 16 52 24C58 32 48 38 40 38Z" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
          <path d="M40 38V44" stroke="#14532D" strokeWidth="3" strokeLinecap="round" />
          <circle cx="48" cy="26" r="2" fill="#DCFCE7" />
        </svg>
      );

    case "topi-jerami":
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <ellipse cx="40" cy="52" rx="34" ry="12" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
          <path d="M22 50C22 34 30 24 40 24C50 24 58 34 58 50Z" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2.5" />
          <rect x="23" y="46" width="34" height="6" fill="#0284C7" />
          <circle cx="34" cy="34" r="2" fill="#FFFFFF" />
        </svg>
      );

    case "topi-pelindung":
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <path d="M16 52C16 32 26 22 40 22C54 22 64 32 64 52H16Z" fill="#0284C7" stroke="#0369A1" strokeWidth="2.5" />
          <path d="M12 52H68C72 52 74 56 68 60H12C6 56 8 52 12 52Z" fill="#38BDF8" stroke="#0369A1" strokeWidth="2" />
          <circle cx="40" cy="38" r="8" fill="#22C55E" />
          <path d="M38 38L40 40L43 36" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "helm-relawan":
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <path d="M18 52C18 30 28 20 40 20C52 20 62 30 62 52H18Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
          <rect x="14" y="50" width="52" height="6" rx="2" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
          <rect x="36" y="24" width="8" height="24" fill="#FEF3C7" opacity="0.6" />
          <circle cx="40" cy="38" r="6" fill="#15803D" />
          <circle cx="40" cy="38" r="3" fill="#86EFAC" />
        </svg>
      );

    // ---------------- KACAMATA ----------------
    case "kacamata-bulat":
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <circle cx="28" cy="42" r="14" fill="#E0F2FE" stroke="#0F172A" strokeWidth="3" />
          <circle cx="52" cy="42" r="14" fill="#E0F2FE" stroke="#0F172A" strokeWidth="3" />
          <path d="M42 42H38" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          <path d="M14 42H10" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          <path d="M66 42H70" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          <path d="M24 38L32 46" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M48 38L56 46" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "kacamata-hijau":
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <rect x="14" y="32" width="22" height="18" rx="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="3" />
          <rect x="44" y="32" width="22" height="18" rx="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="3" />
          <line x1="36" y1="41" x2="44" y2="41" stroke="#16A34A" strokeWidth="3" />
          <line x1="14" y1="36" x2="8" y2="36" stroke="#16A34A" strokeWidth="2.5" />
          <line x1="66" y1="36" x2="72" y2="36" stroke="#16A34A" strokeWidth="2.5" />
          <path d="M20 38L26 44" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M50 38L56 44" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "kacamata-pelindung":
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <rect x="10" y="30" width="60" height="24" rx="8" fill="#38BDF8" stroke="#0284C7" strokeWidth="3" fillOpacity="0.8" />
          <line x1="14" y1="36" x2="28" y2="48" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="42" y1="36" x2="56" y2="48" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="6" y="38" width="6" height="8" rx="2" fill="#0F172A" />
          <rect x="68" y="38" width="6" height="8" rx="2" fill="#0F172A" />
        </svg>
      );

    // ---------------- AKSESORI ----------------
    case "syal-hijau":
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <path d="M20 38C20 38 40 46 60 38C62 44 60 52 50 54C40 54 30 52 20 44V38Z" fill="#16A34A" stroke="#14532D" strokeWidth="2.5" />
          <path d="M48 48V66C48 68 56 68 56 66V46" fill="#22C55E" stroke="#14532D" strokeWidth="2" />
          <line x1="50" y1="64" x2="54" y2="64" stroke="#FEF08A" strokeWidth="2" />
        </svg>
      );

    case "tas-kain":
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <rect x="22" y="32" width="36" height="38" rx="5" fill="#F1F5F9" stroke="#334155" strokeWidth="2.5" />
          <path d="M32 32V20C32 16 48 16 48 20V32" stroke="#334155" strokeWidth="3" fill="none" />
          <circle cx="40" cy="50" r="10" fill="#22C55E" />
          <path d="M40 44C38 44 35 48 40 54C45 48 42 44 40 44Z" fill="#DCFCE7" />
        </svg>
      );

    case "sarung-tangan":
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <g transform="translate(18, 20)">
            <rect x="2" y="16" width="20" height="24" rx="6" fill="#F59E0B" stroke="#92400E" strokeWidth="2" />
            <rect x="18" y="24" width="8" height="12" rx="3" fill="#F59E0B" stroke="#92400E" strokeWidth="2" />
            <rect x="0" y="36" width="24" height="6" rx="2" fill="#16A34A" />
          </g>
          <g transform="translate(42, 20)">
            <rect x="2" y="16" width="20" height="24" rx="6" fill="#F59E0B" stroke="#92400E" strokeWidth="2" />
            <rect x="-4" y="24" width="8" height="12" rx="3" fill="#F59E0B" stroke="#92400E" strokeWidth="2" />
            <rect x="0" y="36" width="24" height="6" rx="2" fill="#16A34A" />
          </g>
        </svg>
      );

    case "tas-daur-ulang":
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <rect x="20" y="22" width="40" height="46" rx="8" fill="#0284C7" stroke="#0369A1" strokeWidth="2.5" />
          <rect x="26" y="38" width="28" height="24" rx="4" fill="#38BDF8" stroke="#0369A1" strokeWidth="2" />
          <path d="M34 22V16H46V22" stroke="#0369A1" strokeWidth="3" fill="none" />
          <path d="M37 46L40 43L43 46" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 43V53" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // ---------------- WARNA BAJU ----------------
    case "warna-baju-biru":
    case "warna-baju-hijau":
    case "warna-baju-kuning":
    case "warna-baju-pink":
    case "warna-baju-ungu":
    case "warna-baju-toska": {
      const colorMap: Record<string, string> = {
        "warna-baju-biru": "#38BDF8",
        "warna-baju-hijau": "#22C55E",
        "warna-baju-kuning": "#F59E0B",
        "warna-baju-pink": "#EC4899",
        "warna-baju-ungu": "#8B5CF6",
        "warna-baju-toska": "#14B8A6",
      };
      const hex = colorMap[itemId] || "#38BDF8";
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <path d="M26 22L14 36L22 42L28 34V64H52V34L58 42L66 36L54 22H26Z" fill={hex} stroke="#0F172A" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M34 22C34 26 46 26 46 22" stroke="#0F172A" strokeWidth="2" />
          <circle cx="40" cy="40" r="4" fill="#FFFFFF" fillOpacity="0.8" />
        </svg>
      );
    }

    // ---------------- ECOBOT ACCESSORIES ----------------
    case "ecobot-topi-kapten":
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <ellipse cx="40" cy="50" rx="30" ry="10" fill="#0F172A" stroke="#334155" strokeWidth="2" />
          <path d="M20 48C20 30 28 22 40 22C52 22 60 30 60 48H20Z" fill="#F8FAFC" stroke="#0F172A" strokeWidth="2.5" />
          <rect x="22" y="44" width="36" height="6" fill="#F59E0B" />
          <circle cx="40" cy="34" r="5" fill="#F59E0B" />
          <path d="M40 31V37M37 34H43" stroke="#78350F" strokeWidth="1.5" />
        </svg>
      );

    case "ecobot-pita-daun":
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <path d="M38 40C28 32 24 46 36 44C38 44 40 40 38 40Z" fill="#22C55E" stroke="#16A34A" strokeWidth="2" />
          <path d="M42 40C52 32 56 46 44 44C42 44 40 40 42 40Z" fill="#22C55E" stroke="#16A34A" strokeWidth="2" />
          <circle cx="40" cy="42" r="5" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
        </svg>
      );

    case "ecobot-kacamata":
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <rect x="14" y="32" width="24" height="18" rx="4" fill="#0F172A" stroke="#334155" strokeWidth="2.5" />
          <rect x="42" y="32" width="24" height="18" rx="4" fill="#0F172A" stroke="#334155" strokeWidth="2.5" />
          <line x1="38" y1="40" x2="42" y2="40" stroke="#0F172A" strokeWidth="3" />
          <line x1="18" y1="36" x2="30" y2="46" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          <line x1="46" y1="36" x2="58" y2="46" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "ecobot-syal-biru":
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <path d="M22 36C22 36 40 44 58 36C60 42 58 50 48 52C38 52 30 50 22 42V36Z" fill="#0284C7" stroke="#0369A1" strokeWidth="2.5" />
          <path d="M46 46V64C46 66 54 66 54 64V44" fill="#38BDF8" stroke="#0369A1" strokeWidth="2" />
        </svg>
      );

    case "ecobot-mahkota-bunga":
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <ellipse cx="40" cy="46" rx="28" ry="8" fill="none" stroke="#15803D" strokeWidth="2.5" />
          <circle cx="24" cy="42" r="6" fill="#F43F5E" />
          <circle cx="24" cy="42" r="2.5" fill="#FEF08A" />
          <circle cx="40" cy="38" r="7" fill="#F59E0B" />
          <circle cx="40" cy="38" r="3" fill="#FFFFFF" />
          <circle cx="56" cy="42" r="6" fill="#8B5CF6" />
          <circle cx="56" cy="42" r="2.5" fill="#FEF08A" />
        </svg>
      );

    case "ecobot-warna-biru":
    case "ecobot-warna-mint":
    case "ecobot-warna-kuning":
    case "ecobot-warna-pink":
    case "ecobot-emas": {
      const colorMap: Record<string, string> = {
        "ecobot-warna-biru": "#38BDF8",
        "ecobot-warna-mint": "#34D399",
        "ecobot-warna-kuning": "#FBBF24",
        "ecobot-warna-pink": "#F472B6",
        "ecobot-emas": "#F59E0B",
      };
      const hex = colorMap[itemId] || "#38BDF8";
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <rect x="22" y="24" width="36" height="32" rx="10" fill={hex} stroke="#0F172A" strokeWidth="2.5" />
          <rect x="26" y="28" width="28" height="22" rx="6" fill="#0F172A" />
          <circle cx="34" cy="38" r="3.5" fill={hex} />
          <circle cx="46" cy="38" r="3.5" fill={hex} />
          {itemId === "ecobot-emas" && (
            <path d="M40 18L42 22L46 23L43 26L44 30L40 28L36 30L37 26L34 23L38 22Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
          )}
        </svg>
      );
    }

    // ---------------- STIKER PROFIL ----------------
    case "stiker-daun":
      return (
        <svg viewBox="0 0 60 60" className={className} fill="none">
          <circle cx="30" cy="30" r="24" fill="#DCFCE7" />
          <path d="M30 14C22 18 18 28 22 36C26 44 38 46 44 38C46 34 46 24 30 14Z" fill="#16A34A" stroke="#14532D" strokeWidth="2" />
          <path d="M24 34L36 22" stroke="#DCFCE7" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "stiker-tunas":
      return (
        <svg viewBox="0 0 60 60" className={className} fill="none">
          <circle cx="30" cy="30" r="24" fill="#ECFDF5" />
          <path d="M30 44V26" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <path d="M30 30C24 24 20 28 22 32C24 34 28 34 30 30Z" fill="#22C55E" />
          <path d="M30 26C36 20 40 24 38 28C36 30 32 30 30 26Z" fill="#16A34A" />
        </svg>
      );

    case "stiker-bintang":
      return (
        <svg viewBox="0 0 60 60" className={className} fill="none">
          <circle cx="30" cy="30" r="24" fill="#FEF3C7" />
          <path d="M30 14L34 24L45 25L37 32L39 43L30 37L21 43L23 32L15 25L26 24Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="30" cy="28" r="2" fill="#FFFFFF" />
        </svg>
      );

    case "stiker-matahari":
      return (
        <svg viewBox="0 0 60 60" className={className} fill="none">
          <circle cx="30" cy="30" r="24" fill="#FFFBEB" />
          <circle cx="30" cy="30" r="12" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
          <g stroke="#F59E0B" strokeWidth="3" strokeLinecap="round">
            <line x1="30" y1="10" x2="30" y2="14" />
            <line x1="30" y1="46" x2="30" y2="50" />
            <line x1="10" y1="30" x2="14" y2="30" />
            <line x1="46" y1="30" x2="50" y2="30" />
          </g>
        </svg>
      );

    case "stiker-penyu":
      return (
        <svg viewBox="0 0 60 60" className={className} fill="none">
          <circle cx="30" cy="30" r="24" fill="#E0F2FE" />
          <ellipse cx="30" cy="32" rx="14" ry="11" fill="#16A34A" stroke="#14532D" strokeWidth="2" />
          <circle cx="30" cy="18" r="5" fill="#22C55E" />
          <circle cx="18" cy="24" r="3.5" fill="#22C55E" />
          <circle cx="42" cy="24" r="3.5" fill="#22C55E" />
          <circle cx="20" cy="40" r="3" fill="#22C55E" />
          <circle cx="40" cy="40" r="3" fill="#22C55E" />
        </svg>
      );

    case "stiker-bumi":
      return (
        <svg viewBox="0 0 60 60" className={className} fill="none">
          <circle cx="30" cy="30" r="22" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
          <path d="M22 22C24 18 30 18 34 22C36 26 30 30 26 28Z" fill="#22C55E" />
          <path d="M36 34C40 32 46 34 44 40C40 44 34 40 36 34Z" fill="#22C55E" />
          <path d="M18 36C22 36 24 42 20 44Z" fill="#22C55E" />
        </svg>
      );

    case "stiker-kupu":
      return (
        <svg viewBox="0 0 60 60" className={className} fill="none">
          <circle cx="30" cy="30" r="24" fill="#FDF2F8" />
          <path d="M30 30C22 18 12 24 16 32C18 36 26 36 30 32Z" fill="#F472B6" />
          <path d="M30 30C38 18 48 24 44 32C42 36 34 36 30 32Z" fill="#F472B6" />
          <path d="M30 32C24 38 18 42 22 46C26 48 30 40 30 32Z" fill="#FB7185" />
          <path d="M30 32C36 38 42 42 38 46C34 48 30 40 30 32Z" fill="#FB7185" />
          <line x1="30" y1="20" x2="30" y2="44" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case "stiker-pelangi":
      return (
        <svg viewBox="0 0 60 60" className={className} fill="none">
          <circle cx="30" cy="30" r="24" fill="#F0FDF4" />
          <path d="M14 40C14 24 46 24 46 40" stroke="#F43F5E" strokeWidth="3" fill="none" />
          <path d="M18 40C18 28 42 28 42 40" stroke="#FBBF24" strokeWidth="3" fill="none" />
          <path d="M22 40C22 32 38 32 38 40" stroke="#38BDF8" strokeWidth="3" fill="none" />
        </svg>
      );

    case "stiker-api":
      return (
        <svg viewBox="0 0 60 60" className={className} fill="none">
          <circle cx="30" cy="30" r="24" fill="#FFF1F2" />
          <path d="M30 12C34 20 42 24 42 34C42 42 36 48 30 48C24 48 18 42 18 34C18 24 26 20 30 12Z" fill="#F43F5E" />
          <path d="M30 26C32 30 36 32 36 38C36 42 33 45 30 45C27 45 24 42 24 38C24 32 28 30 30 26Z" fill="#FBBF24" />
        </svg>
      );

    case "stiker-pahlawan":
      return (
        <svg viewBox="0 0 60 60" className={className} fill="none">
          <circle cx="30" cy="30" r="24" fill="#EFF6FF" />
          <path d="M30 12L42 18V30C42 38 36 46 30 48C24 48 18 38 18 30V18L30 12Z" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
          <path d="M26 30L29 33L35 27" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none">
          <circle cx="40" cy="40" r="28" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
          <circle cx="40" cy="40" r="10" fill="#94A3B8" />
        </svg>
      );
  }
};
