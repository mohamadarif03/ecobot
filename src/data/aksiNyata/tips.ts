export const ECOBOT_ACTION_TIPS = [
  "Membawa botol minum sendiri setiap hari bisa menghemat lebih dari 150 botol plastik per tahun!",
  "Tahukah kamu? Kulit pisang dan sisa sayur di rumah bisa disulap jadi pupuk kompos yang menyuburkan tanaman.",
  "Mematikan lampu saat keluar kamar selama 1 jam membantu menghemat energi untuk menyalakan radio selama seharian.",
  "Tutup botol plastik jangan dibuang sembarangan ya! Kamu bisa mengumpulkannya untuk kerajinan atau bank sampah.",
  "Gunakan kedua sisi kertas buku tulismu sebelum mengganti ke buku baru agar pohon-pohon di hutan tetap terlindungi.",
  "Mencuci tangan dan menggosok gigi dengan keran ditutup bisa menghemat hingga 6 liter air bersih setiap kali!",
  "Ajak teman sekelasmu membuat lomba pilah sampah plastik di sekolah. Bersih-bersih jadi jauh lebih seru!",
  "Bawa tas belanja kain sendiri saat jajan ke minimarket. Keren, hemat, dan tidak menambah tumpukan plastik.",
];

export function getRandomActionTip(): string {
  const index = Math.floor(Math.random() * ECOBOT_ACTION_TIPS.length);
  return ECOBOT_ACTION_TIPS[index];
}
