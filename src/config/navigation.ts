export interface SubMenuItem {
  id: string;
  label: string;
  path: string;
  isSpecial?: boolean; // For "Main Game" highlighted
  badgeKey?: "claimableMissions" | "newBadges";
}

export interface MenuGroup {
  id: string;
  title: string;
  iconName: "joystick" | "book" | "leaf";
  items: SubMenuItem[];
}

export const MENU_GROUPS: MenuGroup[] = [
  {
    id: "petualangan",
    title: "Petualangan",
    iconName: "joystick",
    items: [
      { id: "main-game", label: "Main Game", path: "/main-game", isSpecial: true },
      { id: "misi", label: "Misi", path: "/misi", badgeKey: "claimableMissions" },
    ],
  },
  {
    id: "belajar",
    title: "Belajar",
    iconName: "book",
    items: [
      { id: "pustaka", label: "Pustaka Edukasi", path: "/pustaka" },
      { id: "kuis", label: "Kuis & Tantangan", path: "/kuis" },
    ],
  },
  {
    id: "aksi-hadiah",
    title: "Aksi & Hadiah",
    iconName: "leaf",
    items: [
      { id: "aksi-nyata", label: "Aksi Nyata", path: "/aksi-nyata" },
      { id: "pencapaian", label: "Pencapaian", path: "/pencapaian", badgeKey: "newBadges" },
      { id: "toko", label: "Toko", path: "/toko" },
      { id: "papan-peringkat", label: "Papan Peringkat", path: "/papan-peringkat" },
    ],
  },
];

export const BOTTOM_NAV_ITEMS = [
  { id: "beranda", label: "Beranda", path: "/beranda", icon: "home" },
  { id: "main-game", label: "Main Game", path: "/main-game", icon: "game" },
  { id: "pustaka", label: "Pustaka", path: "/pustaka", icon: "book" },
  { id: "kuis", label: "Kuis", path: "/kuis", icon: "quiz" },
  { id: "pencapaian", label: "Pencapaian", path: "/pencapaian", icon: "trophy" },
];

export const OTHER_MENU_ITEMS = [
  { id: "misi", label: "Misi & Tugas", path: "/misi", icon: "target" },
  { id: "aksi-nyata", label: "Aksi Nyata 7 Hari", path: "/aksi-nyata", icon: "leaf" },
  { id: "toko", label: "Toko Hadiah", path: "/toko", icon: "shop" },
  { id: "papan-peringkat", label: "Papan Peringkat", path: "/papan-peringkat", icon: "podium" },
  { id: "pengaturan", label: "Pengaturan", path: "/pengaturan", icon: "settings" },
  { id: "bantuan", label: "Bantuan & Cara Main", path: "/bantuan", icon: "help" },
];
