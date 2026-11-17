import type { LigaTier, LigaTierDefinition } from "./types.ts";

export const LIGA_TIERS: Record<LigaTier, LigaTierDefinition> = {
  perunggu: {
    id: "perunggu",
    nama: "Liga Perunggu",
    ikon: "🥉",
    warna: "text-amber-700 dark:text-amber-400",
    bgWarna: "bg-amber-100 dark:bg-amber-950/40",
    borderWarna: "border-amber-300 dark:border-amber-700",
    minXp: 100,
    hadiahPoin: 30,
    hadiahXp: 15,
    deskripsi: "Kumpulkan 100 XP dalam satu minggu untuk memulai perjalanan liga ramah lingkungan!",
  },
  perak: {
    id: "perak",
    nama: "Liga Perak",
    ikon: "🥈",
    warna: "text-slate-600 dark:text-slate-300",
    bgWarna: "bg-slate-100 dark:bg-slate-800/60",
    borderWarna: "border-slate-300 dark:border-slate-600",
    minXp: 250,
    hadiahPoin: 60,
    hadiahXp: 30,
    deskripsi: "Raih 250 XP dalam seminggu untuk membuktikan konsistensi belajarmu!",
  },
  emas: {
    id: "emas",
    nama: "Liga Emas",
    ikon: "🥇",
    warna: "text-yellow-600 dark:text-yellow-400",
    bgWarna: "bg-yellow-50 dark:bg-yellow-950/40",
    borderWarna: "border-yellow-300 dark:border-yellow-600",
    minXp: 500,
    hadiahPoin: 120,
    hadiahXp: 60,
    deskripsi: "Pencapaian luar biasa! Kumpulkan 500 XP seminggu dan raih lencana Bintang Mingguan!",
  },
};

export const LIGA_TIER_LIST: LigaTierDefinition[] = [
  LIGA_TIERS.perunggu,
  LIGA_TIERS.perak,
  LIGA_TIERS.emas,
];
