export interface LoadingTip {
  id: number;
  tip: string;
  category: "Organik" | "Anorganik" | "B3" | "Gaya Hidup";
}

export const LOADING_TIPS: LoadingTip[] = [
  {
    id: 1,
    tip: "Sampah organik seperti sisa buah dan kulit pisang bisa diolah jadi pupuk kompos penyubur tanaman.",
    category: "Organik",
  },
  {
    id: 2,
    tip: "Bawa botol minum (tumbler) dan kotak bekal sendiri dari rumah untuk mengurangi sampah plastik sekali pakai.",
    category: "Gaya Hidup",
  },
  {
    id: 3,
    tip: "Satu botol plastik butuh waktu hingga 450 tahun untuk terurai di alam bebas. Yuk kurangi plastik!",
    category: "Anorganik",
  },
  {
    id: 4,
    tip: "Baterai bekas dan lampu neon termasuk limbah B3. Jangan dibakar atau dibuang sembarangan karena beracun.",
    category: "B3",
  },
  {
    id: 5,
    tip: "Kertas koran dan kardus kering bisa didaur ulang menjadi kertas baru dan menyelamatkan pohon dari penebangan.",
    category: "Anorganik",
  },
  {
    id: 6,
    tip: "Matikan keran air saat sedang menyikat gigi atau mencuci tangan untuk menghemat literan air bersih.",
    category: "Gaya Hidup",
  },
  {
    id: 7,
    tip: "Gunakan tas belanja berbahan kain yang bisa dipakai berulang kali saat belanja di pasar atau minimarket.",
    category: "Gaya Hidup",
  },
  {
    id: 8,
    tip: "Kaleng minuman dari aluminium bisa dilebur dan didaur ulang berkali-kali tanpa menurunkan kualitas logamnya.",
    category: "Anorganik",
  },
  {
    id: 9,
    tip: "Membuang sampah ke selokan bisa menyumbat aliran air sungai dan menyebabkan banjir saat musim hujan tiba.",
    category: "Gaya Hidup",
  },
  {
    id: 10,
    tip: "Minyak jelantah sisa menggoreng jangan dibuang ke wastafel! Kumpulkan di botol untuk diolah jadi lilin atau biodiesel.",
    category: "B3",
  },
  {
    id: 11,
    tip: "Matikan lampu, kipas angin, dan televisi saat kamu keluar ruangan untuk menghemat energi listrik.",
    category: "Gaya Hidup",
  },
  {
    id: 12,
    tip: "Kaca adalah bahan daur ulang abadi! Botol kaca bisa dicairkan menjadi botol baru berkali-kali tanpa batas.",
    category: "Anorganik",
  },
  {
    id: 13,
    tip: "Habiskan makanan di piringmu! Makanan yang terbuang sia-sia menghasilkan gas metana berbahaya saat menumpuk di TPA.",
    category: "Organik",
  },
  {
    id: 14,
    tip: "Ajak teman dan keluargamu belajar memilah sampah bersama agar lingkungan sekitar rumah selalu asri dan sehat.",
    category: "Gaya Hidup",
  },
];

export function getRandomLoadingTip(): LoadingTip {
  const index = Math.floor(Math.random() * LOADING_TIPS.length);
  return LOADING_TIPS[index];
}
