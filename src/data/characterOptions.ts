export interface CharacterSkin {
  id: string;
  name: string;
  description: string;
  pricePoints: number;
  unlockedByDefault: boolean;
}

export interface CharacterColor {
  id: string;
  name: string;
  hex: string;
  borderHex: string;
}

export interface CharacterAccessory {
  id: string;
  name: string;
  description: string;
  pricePoints: number;
  unlockedByDefault: boolean;
}

export const CHARACTER_SKINS: CharacterSkin[] = [
  {
    id: "adventurer",
    name: "Petualang Cilik",
    description: "Kostum penjelajah kota yang gesit dan selalu siap memilah.",
    pricePoints: 0,
    unlockedByDefault: true,
  },
  {
    id: "robot_suit",
    name: "Sahabat Ecobot",
    description: "Baju setelan robot futuristik dengan panel surya portabel.",
    pricePoints: 0,
    unlockedByDefault: true,
  },
  {
    id: "park_ranger",
    name: "Penjaga Taman",
    description: "Seragam relawan hijau pelindung pepohonan dan bunga kota.",
    pricePoints: 0,
    unlockedByDefault: true,
  },
  {
    id: "clean_astronaut",
    name: "Astronot Bersih",
    description: "Baju antariksa anti-radiasi berteknologi penyaring udara super.",
    pricePoints: 0,
    unlockedByDefault: true,
  },
];

export const CHARACTER_COLORS: CharacterColor[] = [
  { id: "sky_blue", name: "Biru Langit", hex: "#4ADE80", borderHex: "#15803D" },
  { id: "emerald_green", name: "Hijau Daun", hex: "#22C55E", borderHex: "#15803D" },
  { id: "bright_yellow", name: "Kuning Cerah", hex: "#FACC15", borderHex: "#CA8A04" },
  { id: "sunset_orange", name: "Oranye Ceria", hex: "#FB923C", borderHex: "#C2410C" },
  { id: "grape_purple", name: "Ungu Anggur", hex: "#A855F7", borderHex: "#7E22CE" },
  { id: "clean_white", name: "Putih Bersih", hex: "#F8FAFC", borderHex: "#94A3B8" },
];

export const CHARACTER_ACCESSORIES: CharacterAccessory[] = [
  {
    id: "none",
    name: "Tanpa Aksesori",
    description: "Gaya santai apa adanya tanpa perlengkapan kepala.",
    pricePoints: 0,
    unlockedByDefault: true,
  },
  {
    id: "leaf_hat",
    name: "Topi Tunas Daun",
    description: "Topi lucu berhiaskan tunas daun kembaran Ecobot.",
    pricePoints: 0,
    unlockedByDefault: true,
  },
  {
    id: "eco_goggles",
    name: "Kacamata Pelindung",
    description: "Kacamata pelindung mata dari debu dan serpihan sampah.",
    pricePoints: 120,
    unlockedByDefault: false,
  },
];
