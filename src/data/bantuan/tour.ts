import type { TourStep } from "./types.ts";

export const TOUR_STEPS: TourStep[] = [
  {
    id: "tour-step-1",
    stepNumber: 1,
    title: "Hai! Selamat Datang di ECOBOT",
    targetSelector: "#sidebar-navigation",
    description:
      "Aku Ecobot! Aku akan menemanimu belajar menjaga kelestarian bumi. Di sebelah kiri ini ada Menu Navigasi untuk berpindah ke berbagai ruangan seru.",
    mascotMood: "senang",
    ecobotTip: "Kamu bisa membuka menu kapan saja untuk menjelajahi seluruh fitur!",
    quickAction: {
      label: "Buka Beranda",
      path: "/beranda",
    },
  },
  {
    id: "tour-step-2",
    stepNumber: 2,
    title: "Game 3D Kota Bersih",
    targetSelector: "#nav-item-main-game",
    description:
      "Ayo bersihkan taman kota dari sampah! Gerakkan karaktermu, ambil sampah yang tercecer, dan masukkan ke tong Hijau, Kuning, atau Merah.",
    mascotMood: "semangat",
    ecobotTip: "Raih akurasi 90% atau lebih untuk membawa pulang 3 Bintang Emas!",
    quickAction: {
      label: "Mulai Main Game",
      path: "/main-game",
    },
  },
  {
    id: "tour-step-3",
    stepNumber: 3,
    title: "Pusat Misi & Peti Hadiah",
    targetSelector: "#nav-item-misi",
    description:
      "Di sini ada Misi Harian dan Misi Mingguan. Setiap kali kamu memilah sampah atau belajar, misimu terisi otomatis dan bisa diklaim hadiahnya!",
    mascotMood: "bangga",
    ecobotTip: "Jangan lupa klaim hadiah sebelum tengah malam ya!",
    quickAction: {
      label: "Lihat Misi Hari Ini",
      path: "/misi",
    },
  },
  {
    id: "tour-step-4",
    stepNumber: 4,
    title: "Pustaka Edukasi & Pusat Kuis",
    targetSelector: "#nav-item-kuis",
    description:
      "Ingin tahu kenapa plastik berbahaya atau cara membuat kompos? Baca kartunya di Pustaka, lalu uji ingatanmu di Pusat Kuis tanpa takut salah!",
    mascotMood: "bicara",
    ecobotTip: "Kuis harian hanya 5 soal dan memberi bonus XP yang melimpah!",
    quickAction: {
      label: "Coba Kuis Harian",
      path: "/kuis",
    },
  },
  {
    id: "tour-step-5",
    stepNumber: 5,
    title: "Toko Daur Ulang & Lencana",
    targetSelector: "#nav-item-toko",
    description:
      "Tukarkan koin yang kamu dapatkan dengan topi lucu, pakaian petualang, dan warna cat baru untukku di Toko! Semuanya 100% gratis tanpa uang asli.",
    mascotMood: "senang",
    ecobotTip: "Pamerkan juga lencana hebatmu di halaman Pencapaian!",
    quickAction: {
      label: "Kunjungi Toko",
      path: "/toko",
    },
  },
  {
    id: "tour-step-6",
    stepNumber: 6,
    title: "Pengaturan & Pusat Bantuan",
    targetSelector: "#nav-item-pengaturan",
    description:
      "Jika game terasa berat, kamu kidal, ingin mengatur volume musik, atau butuh bantuan jawaban, kamu bisa membuka Pengaturan dan Bantuan kapan saja.",
    mascotMood: "fokus",
    ecobotTip: "Kamu juga bisa mengunduh file cadangan data agar progresmu selalu aman!",
    quickAction: {
      label: "Buka Pengaturan",
      path: "/pengaturan",
    },
  },
];
