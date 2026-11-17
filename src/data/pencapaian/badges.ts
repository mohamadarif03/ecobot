import type { BadgeDefinition } from "./types.ts";
import type { PlayerState } from "../../types/player.ts";
import { calculateLevel } from "../levels.ts";

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  // 1. GAME
  {
    id: "pemilah-cilik",
    nama: "Pemilah Cilik",
    deskripsi: "Selesaikan Misi 1 di Zona Taman Kota bersama Ecobot.",
    kategori: "game",
    ikon: "🌱",
    syaratTeks: "Selesaikan Misi 1: Taman Kota",
    available: true,
    target: 1,
    pesanEcobot: "Langkah awal yang luar biasa! Kamu sudah membuktikan kemampuan memilah sampah di taman.",
    tautan: "/main-game",
    ambilProgres: (state: PlayerState) => {
      const m1 = state.missionProgress.find((m) => m.missionId === 1);
      return m1 && m1.status === "completed" ? 1 : 0;
    },
    cek: (state: PlayerState) => {
      const m1 = state.missionProgress.find((m) => m.missionId === 1);
      return Boolean(m1 && m1.status === "completed");
    },
  },
  {
    id: "si-teliti",
    nama: "Si Teliti",
    deskripsi: "Capai akurasi pemilahan sampah minimal 90% dalam satu misi game.",
    kategori: "game",
    ikon: "🎯",
    syaratTeks: "Akurasi pemilahan ≥ 90% di satu misi game",
    available: true,
    target: 1,
    pesanEcobot: "Mata elangmu sangat teliti! Sampah organik dan anorganik masuk ke tong yang tepat.",
    tautan: "/main-game",
    ambilProgres: (state: PlayerState) => {
      const bestAcc = Math.max(
        0,
        ...state.missionProgress.map((m) => m.accuracy || 0)
      );
      return bestAcc >= 90 ? 1 : 0;
    },
    cek: (state: PlayerState) => {
      return state.missionProgress.some((m) => (m.accuracy || 0) >= 90);
    },
  },
  {
    id: "penjaga-sungai",
    nama: "Penjaga Sungai",
    deskripsi: "Selesaikan Misi 3 di Tepi Sungai untuk membersihkan aliran air kota.",
    kategori: "game",
    ikon: "🌊",
    syaratTeks: "Selesaikan Misi 3: Tepi Sungai",
    available: false, // Mengikuti ketersediaan stage 3D misi 3
    target: 1,
    pesanEcobot: "Air sungai kembali jernih berkat aksi tangkasmu menjaga kebersihan tepi air.",
    tautan: "/main-game",
    ambilProgres: (state: PlayerState) => {
      const m3 = state.missionProgress.find((m) => m.missionId === 3);
      return m3 && m3.status === "completed" ? 1 : 0;
    },
    cek: (state: PlayerState) => {
      const m3 = state.missionProgress.find((m) => m.missionId === 3);
      return Boolean(m3 && m3.status === "completed");
    },
  },
  {
    id: "raja-combo",
    nama: "Raja Combo",
    deskripsi: "Capai Combo x3 pemilahan cepat secara beruntun di ban berjalan.",
    kategori: "game",
    ikon: "⚡",
    syaratTeks: "Capai Combo x3 di ban berjalan",
    available: false, // Menunggu implementasi mini-game ban berjalan
    target: 3,
    pesanEcobot: "Kecepatan tanganmu luar biasa! Tiga sampah dipilah cepat tanpa salah satu pun.",
    tautan: "/main-game",
    ambilProgres: (state: PlayerState) => {
      return (state.stats as any)?.comboTertinggi || 0;
    },
    cek: (state: PlayerState) => {
      return ((state.stats as any)?.comboTertinggi || 0) >= 3;
    },
  },
  {
    id: "kota-bersih",
    nama: "Kota Bersih!",
    deskripsi: "Tingkatkan Meter Kebersihan Kota Harapan hingga mencapai 100%.",
    kategori: "game",
    ikon: "🏆",
    syaratTeks: "Meter Kebersihan Kota mencapai 100%",
    available: true,
    target: 100,
    pesanEcobot: "Kota Harapan bersinar terang dan hijau! Seluruh warga berterima kasih padamu.",
    tautan: "/main-game",
    ambilProgres: (state: PlayerState) => {
      return state.cityCleanlinessMeter || 0;
    },
    cek: (state: PlayerState) => {
      return (state.cityCleanlinessMeter || 0) >= 100;
    },
  },

  // 2. BELAJAR
  {
    id: "pembaca-rajin",
    nama: "Pembaca Rajin",
    deskripsi: "Membaca dan menyelesaikan 5 materi kartu edukasi di Pustaka.",
    kategori: "belajar",
    ikon: "📚",
    syaratTeks: "Baca 5 materi di Pustaka Edukasi",
    available: true,
    target: 5,
    pesanEcobot: "Kamu sangat berwawasan! Pengetahuan adalah kunci utama melindungi bumi kita.",
    tautan: "/pustaka",
    ambilProgres: (state: PlayerState) => {
      return Object.values(state.contentProgress || {}).filter((p) => p.completed).length;
    },
    cek: (state: PlayerState) => {
      const readCount = Object.values(state.contentProgress || {}).filter((p) => p.completed).length;
      return readCount >= 5;
    },
  },
  {
    id: "si-pintar",
    nama: "Si Pintar",
    deskripsi: "Raih skor sempurna 100% pada 3 kuis lingkungan yang berbeda.",
    kategori: "belajar",
    ikon: "🧠",
    syaratTeks: "Raih skor 100% pada 3 kuis",
    available: true,
    target: 3,
    pesanEcobot: "Nilai sempurna! Pengetahuan lingkunganmu sudah seperti ilmuwan cilik sejati.",
    tautan: "/kuis",
    ambilProgres: (state: PlayerState) => {
      return state.quizProgress?.stats?.perfectCount || 0;
    },
    cek: (state: PlayerState) => {
      return (state.quizProgress?.stats?.perfectCount || 0) >= 3;
    },
  },
  {
    id: "ahli-istilah",
    nama: "Ahli Istilah",
    deskripsi: "Pelajari dan buka 10 istilah lingkungan baru di Glosarium Pustaka.",
    kategori: "belajar",
    ikon: "📖",
    syaratTeks: "Buka 10 istilah di Glosarium Pustaka",
    available: false, // Pelacakan per istilah belum dicatat di store
    target: 10,
    pesanEcobot: "Kosakata hijau kamu sangat luas! Kamu paham arti istilah-istilah penting bumi.",
    tautan: "/pustaka?tab=glosarium",
    ambilProgres: () => 0,
    cek: () => false,
  },

  // 3. KEBIASAAN
  {
    id: "api-semangat",
    nama: "Api Semangat",
    deskripsi: "Pertahankan kebiasaan belajar dan aktif membuka ECOBOT selama 7 hari berturut-turut.",
    kategori: "kebiasaan",
    ikon: "🔥",
    syaratTeks: "Streak belajar 7 hari beruntun",
    available: true,
    target: 7,
    pesanEcobot: "Semangatmu tidak pernah padam! Konsistensi 7 hari membuktikan dedikasimu.",
    tautan: "/beranda",
    ambilProgres: (state: PlayerState) => {
      return Math.min(7, state.streak || 0);
    },
    cek: (state: PlayerState) => {
      return (state.streak || 0) >= 7;
    },
  },
  {
    id: "pahlawan-nyata",
    nama: "Pahlawan Nyata",
    deskripsi: "Selesaikan seluruh rangkaian Tantangan 7 Hari Aksi Nyata di rumah.",
    kategori: "kebiasaan",
    ikon: "🌟",
    syaratTeks: "Selesaikan Tantangan 7 Hari Aksi Nyata",
    available: true,
    target: 7,
    pesanEcobot: "Aksi nyatamu di rumah membawa perubahan nyata untuk bumi kita semua!",
    tautan: "/aksi-nyata",
    ambilProgres: (state: PlayerState) => {
      const daysCount = Object.keys(state.aksiNyata?.challenge?.current?.days || {}).length;
      return Math.min(7, daysCount);
    },
    cek: (state: PlayerState) => {
      const challenge = state.aksiNyata?.challenge;
      const daysCount = Object.keys(challenge?.current?.days || {}).length;
      return daysCount >= 7 || (challenge?.rounds || 0) > 0;
    },
  },
  {
    id: "kreatif-daur-ulang",
    nama: "Kreator Daur Ulang",
    deskripsi: "Mempraktikkan dan mencoba setidaknya 3 ide kreasi daur ulang di rumah.",
    kategori: "kebiasaan",
    ikon: "🎨",
    syaratTeks: "Coba 3 Ide Kreatif daur ulang",
    available: true,
    target: 3,
    pesanEcobot: "Tangan terampilmu menyulap barang bekas menjadi kreasi baru yang berguna!",
    tautan: "/aksi-nyata?tab=ide",
    ambilProgres: (state: PlayerState) => {
      return Object.values(state.aksiNyata?.ideas || {}).filter((i) => i.tried).length;
    },
    cek: (state: PlayerState) => {
      const triedCount = Object.values(state.aksiNyata?.ideas || {}).filter((i) => i.tried).length;
      return triedCount >= 3;
    },
  },

  // 4. SPESIAL
  {
    id: "level-5",
    nama: "Duta Lingkungan",
    deskripsi: "Raih Level 5 dengan mengumpulkan pengalaman belajar dan bermain di ECOBOT.",
    kategori: "spesial",
    ikon: "🎖️",
    syaratTeks: "Capai Level 5 (Duta Lingkungan)",
    available: true,
    target: 5,
    pesanEcobot: "Selamat! Kamu kini telah menjadi Duta Lingkungan panutan bagi teman-temanmu.",
    tautan: "/beranda",
    ambilProgres: (state: PlayerState) => {
      const currentLevel = calculateLevel(state.xp).level;
      return Math.min(5, currentLevel);
    },
    cek: (state: PlayerState) => {
      return calculateLevel(state.xp).level >= 5;
    },
  },
  {
    id: "gaya-keren",
    nama: "Gaya Keren",
    deskripsi: "Miliki setidaknya 5 item aksesori atau gaya keren di Toko Ecobot.",
    kategori: "spesial",
    ikon: "✨",
    syaratTeks: "Miliki 5 item di Toko Ecobot",
    available: true,
    target: 5,
    pesanEcobot: "Keren sekali gayamu! Belajar giat membuahkan penampilan yang membanggakan.",
    tautan: "/toko",
    ambilProgres: (state: PlayerState) => {
      const bought = Object.values(state.inventory?.owned || {}).filter(
        (it) => it.source === "beli" || it.source === "badge"
      ).length;
      return Math.min(5, bought);
    },
    cek: (state: PlayerState) => {
      const bought = Object.values(state.inventory?.owned || {}).filter(
        (it) => it.source === "beli" || it.source === "badge"
      ).length;
      return bought >= 5;
    },
  },
];
