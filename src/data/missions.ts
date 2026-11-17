export type MissionType = "harian" | "mingguan" | "utama";
export type MissionCategory = "game" | "baca" | "kuis" | "aksi-nyata" | "streak";

export interface MissionDefinition {
  id: string;
  tipe: MissionType;
  judul: string;
  deskripsi: string;
  kategori: MissionCategory;
  event: string;
  target: number;
  xp: number;
  poin: number;
  tautan: string;
}

export interface ChestRewardConfig {
  xp: number;
  poin: number;
  title: string;
  description: string;
}

export const CHEST_REWARDS: Record<"harian" | "mingguan", ChestRewardConfig> = {
  harian: {
    xp: 30,
    poin: 20,
    title: "Peti Bonus Harian",
    description: "Klaim semua 3 misi harian untuk membuka peti bonus spesial hari ini!",
  },
  mingguan: {
    xp: 100,
    poin: 60,
    title: "Peti Bonus Mingguan",
    description: "Selesaikan 3 misi mingguan untuk membuka peti harta karun kota!",
  },
};

/**
 * POOL HARIAN (10 Misi)
 * Sesuai PRD Bagian B
 */
export const DAILY_MISSION_POOL: MissionDefinition[] = [
  {
    id: "h-baca-1",
    tipe: "harian",
    judul: "Baca 1 Materi Pustaka",
    deskripsi: "Buka dan baca 1 materi edukasi tentang lingkungan di Pustaka.",
    kategori: "baca",
    event: "materi_dibaca",
    target: 1,
    xp: 20,
    poin: 10,
    tautan: "/pustaka",
  },
  {
    id: "h-kuis-1",
    tipe: "harian",
    judul: "Selesaikan 1 Kuis",
    deskripsi: "Uji wawasan memilah sampah dengan menyelesaikan 1 kuis.",
    kategori: "kuis",
    event: "kuis_selesai",
    target: 1,
    xp: 25,
    poin: 10,
    tautan: "/kuis",
  },
  {
    id: "h-kuis-harian",
    tipe: "harian",
    judul: "Kerjakan Kuis Harian",
    deskripsi: "Jawab tantangan 5 soal kuis harian bersama teman-teman.",
    kategori: "kuis",
    event: "kuis_harian_selesai",
    target: 1,
    xp: 30,
    poin: 15,
    tautan: "/kuis",
  },
  {
    id: "h-pilah-10",
    tipe: "harian",
    judul: "Pilah 10 Sampah di Game",
    deskripsi: "Bantu Ecobot memilah 10 sampah ke tong yang tepat di game 3D.",
    kategori: "game",
    event: "sampah_benar",
    target: 10,
    xp: 25,
    poin: 15,
    tautan: "/main-game",
  },
  {
    id: "h-pilah-20",
    tipe: "harian",
    judul: "Pilah 20 Sampah dengan Benar",
    deskripsi: "Tunjukkan ketelitianmu dengan memilah 20 sampah secara tepat.",
    kategori: "game",
    event: "sampah_benar",
    target: 20,
    xp: 35,
    poin: 20,
    tautan: "/main-game",
  },
  {
    id: "h-game-1",
    tipe: "harian",
    judul: "Main 1 Misi di Game",
    deskripsi: "Masuk ke Zona Kota dan mulai petualangan membersihkan kota.",
    kategori: "game",
    event: "misi_game_dimulai",
    target: 1,
    xp: 20,
    poin: 10,
    tautan: "/main-game",
  },
  {
    id: "h-bintang",
    tipe: "harian",
    judul: "Raih Minimal 2 Bintang",
    deskripsi: "Selesaikan misi game dengan akurasi memilah minimal 75%.",
    kategori: "game",
    event: "bintang_2_plus",
    target: 1,
    xp: 30,
    poin: 15,
    tautan: "/main-game",
  },
  {
    id: "h-aksi-1",
    tipe: "harian",
    judul: "Centang 1 Tugas Aksi Nyata",
    deskripsi: "Lakukan kebiasaan ramah lingkungan di rumah dan centang tugasnya.",
    kategori: "aksi-nyata",
    event: "aksi_nyata_dicentang",
    target: 1,
    xp: 20,
    poin: 10,
    tautan: "/aksi-nyata",
  },
  {
    id: "h-fakta",
    tipe: "harian",
    judul: "Baca Fakta Harian Ecobot",
    deskripsi: "Buka kartu Fakta Harian di Beranda untuk menambah wawasan.",
    kategori: "baca",
    event: "fakta_dibaca",
    target: 1,
    xp: 10,
    poin: 5,
    tautan: "/beranda",
  },
  {
    id: "h-kartu",
    tipe: "harian",
    judul: "Buka 3 Kartu Materi",
    deskripsi: "Geser dan pelajari 3 slide kartu materi ringkas di Pustaka.",
    kategori: "baca",
    event: "kartu_dibuka",
    target: 3,
    xp: 15,
    poin: 10,
    tautan: "/pustaka",
  },
];

/**
 * POOL MINGGUAN (3 Misi Tetap)
 */
export const WEEKLY_MISSIONS: MissionDefinition[] = [
  {
    id: "m-bintang",
    tipe: "mingguan",
    judul: "Raih 3 Bintang di 1 Misi Game",
    deskripsi: "Capai akurasi pemilahan minimal 90% pada salah satu misi game kota.",
    kategori: "game",
    event: "bintang_3",
    target: 1,
    xp: 60,
    poin: 30,
    tautan: "/main-game",
  },
  {
    id: "m-streak",
    tipe: "mingguan",
    judul: "Jaga Streak 5 Hari",
    deskripsi: "Buka dan beraktivitas di ECOBOT selama 5 hari berturut-turut minggu ini.",
    kategori: "streak",
    event: "hari_aktif_minggu",
    target: 5,
    xp: 80,
    poin: 40,
    tautan: "/beranda",
  },
  {
    id: "m-materi",
    tipe: "mingguan",
    judul: "Baca 5 Materi Berbeda",
    deskripsi: "Pelajari 5 topik edukasi lingkungan yang berbeda di Pustaka.",
    kategori: "baca",
    event: "materi_dibaca_unik",
    target: 5,
    xp: 60,
    poin: 30,
    tautan: "/pustaka",
  },
];

/**
 * UTAMA (8 Tonggak Jangka Panjang)
 */
export const MAIN_MILESTONE_MISSIONS: MissionDefinition[] = [
  {
    id: "u-misi1",
    tipe: "utama",
    judul: "Selesaikan Misi 1: Taman Kota",
    deskripsi: "Kuasai pemilahan sampah organik dan anorganik dasar di Taman.",
    kategori: "game",
    event: "misi_game_selesai:taman",
    target: 1,
    xp: 50,
    poin: 30,
    tautan: "/main-game",
  },
  {
    id: "u-misi2",
    tipe: "utama",
    judul: "Selesaikan Misi 2: Pasar",
    deskripsi: "Pilah sampah membingungkan dan bantu pedagang di pasar tradisional.",
    kategori: "game",
    event: "misi_game_selesai:pasar",
    target: 1,
    xp: 60,
    poin: 40,
    tautan: "/main-game",
  },
  {
    id: "u-pembaca",
    tipe: "utama",
    judul: "Baca 5 Materi di Pustaka",
    deskripsi: "Jelajahi minimal 5 topik materi lingkungan hidup dari awal hingga akhir.",
    kategori: "baca",
    event: "materi_dibaca_unik",
    target: 5,
    xp: 60,
    poin: 30,
    tautan: "/pustaka",
  },
  {
    id: "u-pintar",
    tipe: "utama",
    judul: "Dapat Skor 100% di 3 Kuis",
    deskripsi: "Tuntaskan 3 kuis dengan nilai sempurna tanpa ada jawaban salah.",
    kategori: "kuis",
    event: "kuis_sempurna",
    target: 3,
    xp: 80,
    poin: 50,
    tautan: "/kuis",
  },
  {
    id: "u-level3",
    tipe: "utama",
    judul: "Capai Level 3 (Penjaga Taman)",
    deskripsi: "Kumpulkan 250 XP untuk naik pangkat menjadi Penjaga Taman Kota.",
    kategori: "streak",
    event: "level_tercapai",
    target: 3,
    xp: 50,
    poin: 40,
    tautan: "/beranda",
  },
  {
    id: "u-streak7",
    tipe: "utama",
    judul: "Streak 7 Hari Penuh",
    deskripsi: "Belajar dan rawat bumi setiap hari selama seminggu penuh tanpa putus.",
    kategori: "streak",
    event: "streak_maks",
    target: 7,
    xp: 100,
    poin: 60,
    tautan: "/beranda",
  },
  {
    id: "u-tantangan",
    tipe: "utama",
    judul: "Selesaikan Tantangan 7 Hari",
    deskripsi: "Tuntaskan seluruh lembar aksi nyata ramah lingkungan di rumah.",
    kategori: "aksi-nyata",
    event: "tantangan_7_selesai",
    target: 1,
    xp: 150,
    poin: 80,
    tautan: "/aksi-nyata",
  },
  {
    id: "u-kota",
    tipe: "utama",
    judul: "Capai Meter Kota 100%",
    deskripsi: "Selesaikan semua zona petualangan hingga Kota Harapan bersih berkilau!",
    kategori: "game",
    event: "meter_kota",
    target: 100,
    xp: 200,
    poin: 100,
    tautan: "/main-game",
  },
];

/**
 * Pure deterministic hash function
 */
export function hashDateKey(dateKey: string): number {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = ((hash << 5) - hash + dateKey.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Pure deterministic selection of 3 daily missions:
 * - Deterministic based on dateKey (YYYY-MM-DD)
 * - Guarantees >= 1 learning (baca/kuis)
 * - Guarantees >= 1 game
 * - Exactly 3 distinct missions
 */
export function getDailyMissionsForDate(dateKey: string): MissionDefinition[] {
  const seed = hashDateKey(dateKey);

  const learningPool = DAILY_MISSION_POOL.filter(
    (m) => m.kategori === "baca" || m.kategori === "kuis"
  );
  const gamePool = DAILY_MISSION_POOL.filter((m) => m.kategori === "game");

  // 1. Pick 1 learning
  const learningIndex = seed % learningPool.length;
  const mission1 = learningPool[learningIndex];

  // 2. Pick 1 game
  const gameIndex = Math.floor(seed / 7) % gamePool.length;
  const mission2 = gamePool[gameIndex];

  // 3. Pick 1 remaining mission from the pool that isn't mission1 or mission2
  const remainingPool = DAILY_MISSION_POOL.filter(
    (m) => m.id !== mission1.id && m.id !== mission2.id
  );
  const remainingIndex = Math.floor(seed / 31) % remainingPool.length;
  const mission3 = remainingPool[remainingIndex];

  return [mission1, mission2, mission3];
}

/**
 * Returns formatted dateKey in local timezone (YYYY-MM-DD)
 */
export function getLocalDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Returns ISO week key (e.g. "2026-W47") starting on Monday
 */
export function getLocalWeekKey(date = new Date()): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

/**
 * Calculates remaining time until midnight local time (23:59:59)
 */
export function getRemainingDailyTime(now = new Date()): {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
} {
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diffMs = Math.max(0, midnight.getTime() - now.getTime());

  const totalSecs = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSecs / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;

  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return {
    hours,
    minutes,
    seconds,
    formatted: `${hh}:${mm}:${ss}`,
  };
}

/**
 * Calculates remaining time until next Monday 00:00:00 local time
 */
export function getRemainingWeeklyTime(now = new Date()): {
  days: number;
  hours: number;
  formatted: string;
} {
  const nextMonday = new Date(now);
  const day = nextMonday.getDay();
  const daysUntilMonday = (8 - (day === 0 ? 7 : day)) % 7 || 7;
  nextMonday.setDate(nextMonday.getDate() + daysUntilMonday);
  nextMonday.setHours(0, 0, 0, 0);

  const diffMs = Math.max(0, nextMonday.getTime() - now.getTime());
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  return {
    days,
    hours,
    formatted: `${days} hari ${hours} jam`,
  };
}
