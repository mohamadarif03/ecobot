export interface TutorialStep {
  id: string;
  speaker: string;
  text: string;
  targetObjective?: "move" | "pickup" | "bin" | "none";
}

export const TAMAN_KOTA_TUTORIAL = {
  intro: [
    {
      id: "intro-1",
      speaker: "Ecobot",
      text: "Halo, {nickname}! Aku Ecobot. Taman kota ini banyak sampah berserakan. Mau bantu aku membersihkannya?",
    },
    {
      id: "intro-2",
      speaker: "Ecobot",
      text: "Gunakan tombol analog di kiri atau keyboard W A S D untuk berjalan di sekeliling taman.",
    },
  ],
  steps: {
    moveSuccess: "Bagus sekali! Sekarang cari sampah yang bersinar berkilau di sekitarmu.",
    pickupSuccess: "Hebat! Sampah sudah masuk ke tasmu (kapasitas tas: {capacity} sampah).",
    binGuidance: "Lihat 3 tong di dekat gerbang: Hijau (Organik), Kuning (Anorganik), Merah (B3). Dekati tong lalu tekan BUANG!",
    firstSortSuccess: "Pintar! Sampah pertama berhasil dipilah. Sekarang ayo bersihkan sisa sampah di taman!",
  },
  bubbles: {
    halfway: "Luar biasa, sudah setengah jalan! Taman mulai terlihat lebih segar dan asri!",
    bagFull: "Tasmu sudah penuh! Ayo buang dulu sampah yang kamu bawa ke tong yang tepat.",
    idleHint: "Sedang bingung mencari sampah? Ikuti panah penunjuk arah di depanmu!",
    wrongConsecutive: "Jangan patah semangat! Ingat: Makanan = Hijau, Kemasan = Kuning, Baterai = Merah.",
    lastOne: "Tinggal 1 sampah lagi! Kamu pahlawan lingkungan sejati!",
    completed: "Horeee! Taman kota bersih berseri! Terima kasih banyak, {nickname}!",
  },
};
