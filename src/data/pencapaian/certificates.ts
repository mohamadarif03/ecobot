import type { CertificateDefinition } from "./types.ts";
import type { PlayerState } from "../../types/player.ts";
import { calculateLevel } from "../levels.ts";

export const CERTIFICATE_DEFINITIONS: CertificateDefinition[] = [
  {
    id: "cert-perunggu",
    tier: "perunggu",
    judul: "Relawan Cilik ECOBOT",
    namaGelar: "Relawan Lingkungan Berbakat",
    deskripsi: "Diberikan kepada relawan baru yang telah menunjukkan kepedulian awal dan mencapai Level 3 di ECOBOT.",
    alasan: "Telah aktif belajar memilah sampah dan membiasakan diri menjaga kebersihan lingkungan bersama Ecobot.",
    borderClass: "border-amber-600/40",
    bgGradient: "from-amber-500/10 via-amber-50/50 to-orange-50/20",
    accentColor: "#D97706",
    syaratTeks: "Capai Level 3 (Penjaga Taman)",
    cek: (state: PlayerState) => calculateLevel(state.xp).level >= 3,
  },
  {
    id: "cert-perak",
    tier: "perak",
    judul: "Penjaga Lingkungan ECOBOT",
    namaGelar: "Penjaga Kelestarian Kota",
    deskripsi: "Diberikan kepada duta lingkungan yang telah berwawasan luas, mencapai Level 5, dan mengoleksi minimal 3 badge.",
    alasan: "Telah membuktikan konsistensi tinggi dalam menyelesaikan kuis, membaca materi edukasi, dan mengoleksi badge kebersihan.",
    borderClass: "border-slate-400/50",
    bgGradient: "from-slate-400/10 via-sky-50/40 to-slate-50/30",
    accentColor: "#64748B",
    syaratTeks: "Capai Level 5 dan miliki minimal 3 badge",
    cek: (state: PlayerState) => {
      const isLevel5 = calculateLevel(state.xp).level >= 5;
      const badgeCount = state.achievements?.badges
        ? Object.keys(state.achievements.badges).length
        : state.badges.length;
      return isLevel5 && badgeCount >= 3;
    },
  },
  {
    id: "cert-emas",
    tier: "emas",
    judul: "Pahlawan Kota Bersih ECOBOT",
    namaGelar: "Pahlawan Pelindung Bumi Sejati",
    deskripsi: "Pemberian penghargaan tertinggi atas keberhasilan memulihkan kebersihan Kota Harapan hingga 100%.",
    alasan: "Telah mengabdikan diri sebagai pahlawan teladan dan menuntaskan pemilahan seluruh zona kota hingga bersih seutuhnya.",
    borderClass: "border-amber-400",
    bgGradient: "from-amber-400/20 via-yellow-50 to-amber-100/30",
    accentColor: "#F59E0B",
    syaratTeks: "Dapatkan badge 'Kota Bersih!' (Meter Kebersihan Kota 100%)",
    cek: (state: PlayerState) => {
      const hasKotaBersihBadge = state.achievements?.badges
        ? Boolean(state.achievements.badges["kota-bersih"])
        : state.badges.some((b) => b.id === "kota-bersih");
      return hasKotaBersihBadge || (state.cityCleanlinessMeter || 0) >= 100;
    },
  },
];
