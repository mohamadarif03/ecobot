import type { QuizQuestion } from "./types.ts";
import { QUIZ_TOPICS } from "./topics.ts";

export const ALL_QUIZ_QUESTIONS: QuizQuestion[] = [
  // =========================================================================
  // TOPIK 1: quiz-jenis-sampah (materiSlug: jenis-sampah) - 8 Soal
  // =========================================================================
  {
    id: "q-js-1",
    topikId: "quiz-jenis-sampah",
    tingkat: "mudah",
    teks: "Kulit pisang dan sisa sayuran harus dibuang ke tong warna apa?",
    gambar: "/assets/sampah/kulit-pisang.svg",
    pilihan: [
      { id: "a", teks: "Kuning" },
      { id: "b", teks: "Hijau" },
      { id: "c", teks: "Merah" },
    ],
    benarId: "b",
    penjelasan: "Kulit pisang dan sayur adalah sampah organik yang mudah membusuk, jadi dibuang ke tong hijau.",
    hint: "Pikirkan warna daun yang segar di pepohonan.",
    materiSlug: "jenis-sampah",
  },
  {
    id: "q-js-2",
    topikId: "quiz-jenis-sampah",
    tingkat: "mudah",
    teks: "Manakah contoh sampah anorganik yang bisa didaur ulang?",
    gambar: "/assets/sampah/botol-plastik.svg",
    pilihan: [
      { id: "a", teks: "Daun mangga kering" },
      { id: "b", teks: "Sisa nasi kemarin" },
      { id: "c", teks: "Botol air minum plastik" },
      { id: "d", teks: "Kulit buah apel" },
    ],
    benarId: "c",
    penjelasan: "Botol plastik terbuat dari bahan anorganik buatan manusia yang bisa dilebur kembali di pabrik.",
    hint: "Pilih benda buatan pabrik yang tidak membusuk dalam seminggu.",
    materiSlug: "jenis-sampah",
  },
  {
    id: "q-js-3",
    topikId: "quiz-jenis-sampah",
    tingkat: "mudah",
    teks: "Tong sampah warna merah di ECOBOT disiapkan khusus untuk jenis apa?",
    gambar: "/assets/sampah/puntung-rokok.svg",
    pilihan: [
      { id: "a", teks: "Sampah basah sisa makanan" },
      { id: "b", teks: "Limbah B3 berbahaya" },
      { id: "c", teks: "Kardus dan kertas kering" },
    ],
    benarId: "b",
    penjelasan: "Warna merah adalah tanda waspada untuk limbah B3 seperti baterai dan obat kedaluwarsa.",
    hint: "Merah menandakan tanda bahaya dan peringatan.",
    materiSlug: "jenis-sampah",
  },
  {
    id: "q-js-4",
    topikId: "quiz-jenis-sampah",
    tingkat: "mudah",
    teks: "Apa yang dimaksud dengan sampah organik?",
    pilihan: [
      { id: "a", teks: "Sampah yang tahan ribuan tahun" },
      { id: "b", teks: "Sampah dari sisa makhluk hidup" },
      { id: "c", teks: "Pecahan kaca dan keramik" },
      { id: "d", teks: "Kabel listrik rusak" },
    ],
    benarId: "b",
    penjelasan: "Sampah organik berasal dari tumbuhan dan hewan, sehingga dapat terurai alami menjadi tanah.",
    hint: "Berasal dari alam hidup dan bisa membusuk.",
    materiSlug: "jenis-sampah",
  },
  {
    id: "q-js-5",
    topikId: "quiz-jenis-sampah",
    tingkat: "sedang",
    teks: "Baterai remote TV bekas masuk ke kelompok sampah mana?",
    gambar: "/assets/sampah/puntung-rokok.svg",
    pilihan: [
      { id: "a", teks: "Organik" },
      { id: "b", teks: "Anorganik biasa" },
      { id: "c", teks: "B3 (Bahan Berbahaya)" },
    ],
    benarId: "c",
    penjelasan: "Baterai mengandung zat kimia beracun yang dapat merusak tanah jika bocor.",
    hint: "Benda ini mengandung zat kimia berbahaya di dalamnya.",
    materiSlug: "jenis-sampah",
  },
  {
    id: "q-js-6",
    topikId: "quiz-jenis-sampah",
    tingkat: "sedang",
    teks: "Mengapa botol kaca masuk ke tong kuning anorganik?",
    gambar: "/assets/sampah/botol-kaca.svg",
    pilihan: [
      { id: "a", teks: "Karena mudah membusuk jadi pupuk" },
      { id: "b", teks: "Karena bisa didaur ulang berulang kali" },
      { id: "c", teks: "Karena mengandung racun berbahaya" },
    ],
    benarId: "b",
    penjelasan: "Kaca tidak membusuk secara alami tetapi bisa dilebur kembali menjadi botol baru berkali-kali.",
    hint: "Kaca adalah benda anorganik yang kuat dan bisa dilebur.",
    materiSlug: "jenis-sampah",
  },
  {
    id: "q-js-7",
    topikId: "quiz-jenis-sampah",
    tingkat: "sedang",
    teks: "Manakah pasangan sampah dan tong yang PALING tepat?",
    pilihan: [
      { id: "a", teks: "Koran bekas di tong merah" },
      { id: "b", teks: "Sisa apel di tong kuning" },
      { id: "c", teks: "Daun kering di tong hijau" },
      { id: "d", teks: "Baterai di tong hijau" },
    ],
    benarId: "c",
    penjelasan: "Daun kering adalah bahan organik sehingga harus dimasukkan ke tong hijau.",
    hint: "Cari benda alami yang masuk ke tong warna daun.",
    materiSlug: "jenis-sampah",
  },
  {
    id: "q-js-8",
    topikId: "quiz-jenis-sampah",
    tingkat: "mudah",
    teks: "Tong kuning di sekolahmu digunakan untuk menampung sampah apa?",
    gambar: "/assets/sampah/kaleng.svg",
    pilihan: [
      { id: "a", teks: "Sisa nasi dan buah" },
      { id: "b", teks: "Plastik, kertas, dan kaleng" },
      { id: "c", teks: "Lampu neon pecah" },
    ],
    benarId: "b",
    penjelasan: "Tong kuning adalah wadah sampah anorganik kering yang siap dikirim untuk didaur ulang.",
    hint: "Tempat barang kering yang bisa diolah kembali.",
    materiSlug: "jenis-sampah",
  },

  // =========================================================================
  // TOPIK 2: quiz-cara-memilah (materiSlug: cara-memilah) - 8 Soal
  // =========================================================================
  {
    id: "q-cm-1",
    topikId: "quiz-cara-memilah",
    tingkat: "mudah",
    teks: "Apa yang harus dilakukan sebelum membuang botol sirup manis ke tong daur ulang?",
    gambar: "/assets/sampah/botol-plastik.svg",
    pilihan: [
      { id: "a", teks: "Biarkan sisa sirup tetap penuh" },
      { id: "b", teks: "Kosongkan dan bilas bersih" },
      { id: "c", teks: "Bakar sampai meleleh" },
    ],
    benarId: "b",
    penjelasan: "Sisa cairan manis harus dibilas agar tidak mengotori barang lain dan tidak mengundang semut.",
    hint: "Kebersihan adalah kunci utama daur ulang yang sukses.",
    materiSlug: "cara-memilah",
  },
  {
    id: "q-cm-2",
    topikId: "quiz-cara-memilah",
    tingkat: "mudah",
    teks: "Mengapa kardus bekas sebaiknya diratakan atau dipipihkan sebelum dibuang?",
    gambar: "/assets/sampah/koran.svg",
    pilihan: [
      { id: "a", teks: "Agar warnanya berubah cerah" },
      { id: "b", teks: "Menghemat ruang di tempat sampah" },
      { id: "c", teks: "Supaya kardus bisa langsung membusuk" },
      { id: "d", teks: "Agar tidak bisa didaur ulang" },
    ],
    benarId: "b",
    penjelasan: "Kardus yang dipipihkan menghemat tempat di tong sampah dan memudahkan kerja truk pengangkut.",
    hint: "Benda pipih membutuhkan lebih sedikit tempat.",
    materiSlug: "cara-memilah",
  },
  {
    id: "q-cm-3",
    topikId: "quiz-cara-memilah",
    tingkat: "mudah",
    teks: "Apa akibat jika sampah organik dan anorganik dicampur dalam satu kantong?",
    pilihan: [
      { id: "a", teks: "Sampah plastik jadi lebih harum" },
      { id: "b", teks: "Kardus dan plastik jadi kotor dan bau" },
      { id: "c", teks: "Daur ulang menjadi jauh lebih cepat" },
    ],
    benarId: "b",
    penjelasan: "Cairan dari sisa makanan membasahi kertas dan plastik sehingga sulit dan kotor saat dipilah.",
    hint: "Sisa makanan yang busuk akan menempel pada kertas.",
    materiSlug: "cara-memilah",
  },
  {
    id: "q-cm-4",
    topikId: "quiz-cara-memilah",
    tingkat: "sedang",
    teks: "Manakah urutan langkah memilah botol plastik yang BENAR?",
    gambar: "/assets/sampah/botol-plastik.svg",
    pilihan: [
      { id: "a", teks: "Buang ke tong dulu, baru dicuci" },
      { id: "b", teks: "Kosongkan, bilas, remas gepeng, buang" },
      { id: "c", teks: "Bakar, kumpulkan abunya, lalu buang" },
      { id: "d", teks: "Isi air kotor, tutup rapat, buang" },
    ],
    benarId: "b",
    penjelasan: "Kosongkan sisa airnya, bilas sebentar, remas agar gepeng, lalu masukkan ke tong kuning.",
    hint: "Pastikan bersih dan kempes sebelum dibuang.",
    materiSlug: "cara-memilah",
  },
  {
    id: "q-cm-5",
    topikId: "quiz-cara-memilah",
    tingkat: "mudah",
    teks: "Kertas tisu basah berminyak sebaiknya dimasukkan ke mana?",
    pilihan: [
      { id: "a", teks: "Tong kuning daur ulang" },
      { id: "b", teks: "Tong residu sisa" },
      { id: "c", teks: "Kotak baterai khusus" },
    ],
    benarId: "b",
    penjelasan: "Kertas tisu kotor berminyak tidak bisa didaur ulang menjadi kertas baru dan tergolong residu.",
    hint: "Minyak merusak serat kertas sehingga tidak bisa didaur ulang.",
    materiSlug: "cara-memilah",
  },
  {
    id: "q-cm-6",
    topikId: "quiz-cara-memilah",
    tingkat: "sedang",
    teks: "Bolehkah membuang pecahan lampu neon ke tong sampah biasa?",
    gambar: "/assets/sampah/puntung-rokok.svg",
    pilihan: [
      { id: "a", teks: "Boleh, asal dibungkus plastik" },
      { id: "b", teks: "Tidak boleh, harus diserahkan ke tempat B3" },
      { id: "c", teks: "Boleh, dicampur sisa sayuran" },
    ],
    benarId: "b",
    penjelasan: "Lampu neon mengandung gas merkuri berbahaya yang bisa melukai dan meracuni udara.",
    hint: "Lampu neon tergolong limbah B3 berbahaya.",
    materiSlug: "cara-memilah",
  },
  {
    id: "q-cm-7",
    topikId: "quiz-cara-memilah",
    tingkat: "sedang",
    teks: "Apa manfaat memberi label 'Organik' dan 'Anorganik' di tong rumah?",
    pilihan: [
      { id: "a", teks: "Supaya tempat sampah terlihat mahal" },
      { id: "b", teks: "Membantu seluruh keluarga memilah dengan benar" },
      { id: "c", teks: "Menghilangkan bau sampah secara otomatis" },
      { id: "d", teks: "Supaya sampah tidak perlu dibuang" },
    ],
    benarId: "b",
    penjelasan: "Label yang jelas mencegah keluarga salah memasukkan sampah ke wadah yang keliru.",
    hint: "Petunjuk tulisan memudahkan semua orang di rumah.",
    materiSlug: "cara-memilah",
  },
  {
    id: "q-cm-8",
    topikId: "quiz-cara-memilah",
    tingkat: "sedang",
    teks: "Mengapa botol plastik bekas minyak goreng sulit didaur ulang?",
    gambar: "/assets/sampah/botol-plastik.svg",
    pilihan: [
      { id: "a", teks: "Minyak merusak mesin pencacah dan mengotori plastik" },
      { id: "b", teks: "Botol minyak warnanya selalu hitam" },
      { id: "c", teks: "Minyak goreng terbuat dari besi berat" },
    ],
    benarId: "a",
    penjelasan: "Lapisan minyak sulit dibersihkan dan mengganggu kualitas bijih plastik daur ulang.",
    hint: "Minyak lengket dan sulit dihilangkan dengan air biasa.",
    materiSlug: "cara-memilah",
  },

  // =========================================================================
  // TOPIK 3: quiz-daur-ulang (materiSlug: daur-ulang) - 8 Soal
  // =========================================================================
  {
    id: "q-du-1",
    topikId: "quiz-daur-ulang",
    tingkat: "mudah",
    teks: "Apa kepanjangan dari konsep 3R dalam pengelolaan sampah?",
    gambar: "/assets/sampah/kaleng.svg",
    pilihan: [
      { id: "a", teks: "Run, Read, Rest" },
      { id: "b", teks: "Reduce, Reuse, Recycle" },
      { id: "c", teks: "Remove, Rebuild, Repair" },
    ],
    benarId: "b",
    penjelasan: "3R adalah Reduce (Kurangi), Reuse (Pakai Ulang), dan Recycle (Daur Ulang).",
    hint: "Tiga kata bahasa Inggris berawalan huruf R.",
    materiSlug: "daur-ulang",
  },
  {
    id: "q-du-2",
    topikId: "quiz-daur-ulang",
    tingkat: "mudah",
    teks: "Manakah jurus 3R yang PALING utama dan pertama harus dilakukan?",
    pilihan: [
      { id: "a", teks: "Recycle (Mendaur ulang di pabrik)" },
      { id: "b", teks: "Reuse (Menggunakan kembali barang)" },
      { id: "c", teks: "Reduce (Mengurangi timbulan sampah)" },
    ],
    benarId: "c",
    penjelasan: "Mengurangi sampah sejak awal adalah cara terbaik agar bumi tidak dipenuhi tumpukan barang terbuang.",
    hint: "Langkah terbaik adalah mencegah sampah muncul sejak awal.",
    materiSlug: "daur-ulang",
  },
  {
    id: "q-du-3",
    topikId: "quiz-daur-ulang",
    tingkat: "mudah",
    teks: "Mengubah kaleng biskuit bekas menjadi tempat pensil adalah contoh jurus apa?",
    gambar: "/assets/sampah/kaleng.svg",
    pilihan: [
      { id: "a", teks: "Pakai Ulang (Reuse)" },
      { id: "b", teks: "Membakar sampah" },
      { id: "c", teks: "Membuang ke sungai" },
    ],
    benarId: "a",
    penjelasan: "Reuse berarti memakai kembali suatu benda untuk fungsi lain tanpa harus meleburnya di pabrik.",
    hint: "Barang tetap utuh dan dipakai untuk keperluan baru.",
    materiSlug: "daur-ulang",
  },
  {
    id: "q-du-4",
    topikId: "quiz-daur-ulang",
    tingkat: "sedang",
    teks: "Apa kehebatan kaleng aluminium dan botol kaca dalam proses daur ulang?",
    gambar: "/assets/sampah/kaleng.svg",
    pilihan: [
      { id: "a", teks: "Bisa terurai di tanah dalam 2 hari" },
      { id: "b", teks: "Bisa didaur ulang berulang kali tanpa rusak" },
      { id: "c", teks: "Bisa berubah menjadi pupuk tanaman" },
      { id: "d", teks: "Bisa dimakan oleh ikan di kolam" },
    ],
    benarId: "b",
    penjelasan: "Logam aluminium dan kaca dapat dilebur kembali berkali-kali tanpa mengurangi kekuatannya.",
    hint: "Kualitas bahannya tetap prima walau dilebur berkali-kali.",
    materiSlug: "daur-ulang",
  },
  {
    id: "q-du-5",
    topikId: "quiz-daur-ulang",
    tingkat: "sedang",
    teks: "Apa keuntungan warga menabung sampah di Bank Sampah?",
    pilihan: [
      { id: "a", teks: "Mendapat hadiah mobil setiap minggu" },
      { id: "b", teks: "Menukar sampah terpilah dengan tabungan uang" },
      { id: "c", teks: "Bisa membuang semua sampah tanpa dipilah" },
    ],
    benarId: "b",
    penjelasan: "Bank sampah menimbang sampah kering yang bersih dan mencatat nilainya sebagai tabungan uang.",
    hint: "Seperti menabung uang, tapi setoran awalnya berupa sampah terpilah.",
    materiSlug: "daur-ulang",
  },
  {
    id: "q-du-6",
    topikId: "quiz-daur-ulang",
    tingkat: "mudah",
    teks: "Membawa tas belanja kain sendiri dari rumah merupakan contoh aksi apa?",
    gambar: "/assets/sampah/kantong-plastik.svg",
    pilihan: [
      { id: "a", teks: "Reduce (Mengurangi kantong plastik)" },
      { id: "b", teks: "Membuat kompos" },
      { id: "c", teks: "Mencemari lingkungan" },
    ],
    benarId: "a",
    penjelasan: "Membawa tas kain mencegah kita menggunakan kantong kresek sekali pakai dari toko.",
    hint: "Mengurangi sampah baru yang masuk ke rumahmu.",
    materiSlug: "daur-ulang",
  },
  {
    id: "q-du-7",
    topikId: "quiz-daur-ulang",
    tingkat: "sedang",
    teks: "Kertas koran bekas yang didaur ulang di pabrik akan diolah menjadi apa?",
    gambar: "/assets/sampah/koran.svg",
    pilihan: [
      { id: "a", teks: "Kaca jendela mobil" },
      { id: "b", teks: "Bubur kertas untuk lembaran kertas baru" },
      { id: "c", teks: "Minyak goreng kemasan" },
      { id: "d", teks: "Batu bata bangunan" },
    ],
    benarId: "b",
    penjelasan: "Kertas bekas digiling dengan air menjadi bubur kertas (pulp) lalu dicetak menjadi kertas daur ulang.",
    hint: "Diolah menjadi bahan dasar pembuat kertas kembali.",
    materiSlug: "daur-ulang",
  },
  {
    id: "q-du-8",
    topikId: "quiz-daur-ulang",
    tingkat: "sedang",
    teks: "Mengapa daur ulang bisa menyelamatkan hutan pohon di bumi?",
    gambar: "/assets/sampah/koran.svg",
    pilihan: [
      { id: "a", teks: "Karena pabrik kertas tidak perlu menebang pohon baru" },
      { id: "b", teks: "Karena kertas daur ulang bisa disiram jadi pohon" },
      { id: "c", teks: "Karena pohon memakan sampah kertas" },
    ],
    benarId: "a",
    penjelasan: "Mendaur ulang kertas memanfaatkan serat lama sehingga penebangan pohon di hutan bisa dicegah.",
    hint: "Kertas baru dibuat dari kayu pohon di hutan.",
    materiSlug: "daur-ulang",
  },

  // =========================================================================
  // TOPIK 4: quiz-dampak-plastik (materiSlug: dampak-plastik) - 8 Soal
  // =========================================================================
  {
    id: "q-dp-1",
    topikId: "quiz-dampak-plastik",
    tingkat: "mudah",
    teks: "Berapa lama perkiraan waktu yang dibutuhkan satu botol plastik untuk terurai di alam?",
    gambar: "/assets/sampah/botol-plastik.svg",
    pilihan: [
      { id: "a", teks: "2 sampai 5 minggu" },
      { id: "b", teks: "Sekitar 1 tahun saja" },
      { id: "c", teks: "Hingga 450 tahun" },
    ],
    benarId: "c",
    penjelasan: "Berdasarkan rujukan NOAA, botol plastik membutuhkan waktu ratusan tahun karena ikatan kimianya sangat kuat.",
    hint: "Jauh lebih lama dari usia kakek buyutmu.",
    materiSlug: "dampak-plastik",
  },
  {
    id: "q-dp-2",
    topikId: "quiz-dampak-plastik",
    tingkat: "mudah",
    teks: "Mengapa penyu di laut sering menelan kantong plastik terapung?",
    gambar: "/assets/sampah/kantong-plastik.svg",
    pilihan: [
      { id: "a", teks: "Penyu sangat suka rasa plastik" },
      { id: "b", teks: "Penyu mengira plastik itu ubur-ubur makanannya" },
      { id: "c", teks: "Plastik membuat penyu bisa berenang cepat" },
    ],
    benarId: "b",
    penjelasan: "Kantong plastik transparan yang melayang di air terlihat mirip ubur-ubur bagi penglihatan penyu laut.",
    hint: "Bentuk kantong di air menyerupai mangsa favorit penyu.",
    materiSlug: "dampak-plastik",
  },
  {
    id: "q-dp-3",
    topikId: "quiz-dampak-plastik",
    tingkat: "sedang",
    teks: "Apa yang disebut dengan mikroplastik?",
    pilihan: [
      { id: "a", teks: "Plastik raksasa berukuran sebesar mobil" },
      { id: "b", teks: "Serpihan plastik sangat kecil di bawah 5 milimeter" },
      { id: "c", teks: "Jenis plastik yang bisa dimakan manusia" },
      { id: "d", teks: "Bahan bakar roket luar angkasa" },
    ],
    benarId: "b",
    penjelasan: "Mikroplastik adalah partikel remahan plastik sangat kecil hasil dari pengikisan sampah plastik besar.",
    hint: "Kata 'mikro' artinya benda yang berukuran amat sangat kecil.",
    materiSlug: "dampak-plastik",
  },
  {
    id: "q-dp-4",
    topikId: "quiz-dampak-plastik",
    tingkat: "sedang",
    teks: "Mengapa styrofoam merupakan wadah makanan yang berbahaya bagi alam?",
    gambar: "/assets/sampah/styrofoam.svg",
    pilihan: [
      { id: "a", teks: "Karena praktis tidak dapat terurai alami" },
      { id: "b", teks: "Karena mudah larut oleh air hujan" },
      { id: "c", teks: "Karena berubah jadi pupuk cair" },
    ],
    benarId: "a",
    penjelasan: "Styrofoam sangat rapuh tetapi zat kimianya tidak bisa diurai oleh mikroba alam dalam waktu singkat.",
    hint: "Benda putih ringan ini bertahan selamanya jika tidak didaur ulang.",
    materiSlug: "dampak-plastik",
  },
  {
    id: "q-dp-5",
    topikId: "quiz-dampak-plastik",
    tingkat: "mudah",
    teks: "Apa akibat yang terjadi jika saluran air kota tersumbat sampah plastik?",
    pilihan: [
      { id: "a", teks: "Sungai menjadi jernih seperti cermin" },
      { id: "b", teks: "Air meluap dan terjadi banjir saat hujan" },
      { id: "c", teks: "Udara kota menjadi wangi melati" },
    ],
    benarId: "b",
    penjelasan: "Sampah plastik menghalangi aliran air hujan menuju laut sehingga jalanan kota tergenang banjir.",
    hint: "Air yang tersumbat akan mencari jalan keluar ke jalanan.",
    materiSlug: "dampak-plastik",
  },
  {
    id: "q-dp-6",
    topikId: "quiz-dampak-plastik",
    tingkat: "sedang",
    teks: "Manakah sampah berikut yang membutuhkan waktu urai PALING LAMA di alam?",
    gambar: "/assets/sampah/botol-plastik.svg",
    pilihan: [
      { id: "a", teks: "Kulit pisang (2-5 minggu)" },
      { id: "b", teks: "Kertas koran (2-6 minggu)" },
      { id: "c", teks: "Botol plastik (hingga ratusan tahun)" },
      { id: "d", teks: "Daun mangga gugur" },
    ],
    benarId: "c",
    penjelasan: "Sesuai data dekomposisi alam, botol plastik membutuhkan hingga 450 tahun untuk hancur.",
    hint: "Pilih bahan sintetis pabrik terkuat di antara pilihan.",
    materiSlug: "dampak-plastik",
  },
  {
    id: "q-dp-7",
    topikId: "quiz-dampak-plastik",
    tingkat: "mudah",
    teks: "Aksi nyata apa yang bisa kamu lakukan untuk mengurangi sampah sedotan plastik?",
    pilihan: [
      { id: "a", teks: "Meminum langsung dari gelas atau pakai sedotan bambu" },
      { id: "b", teks: "Memakai lima sedotan plastik sekaligus" },
      { id: "c", teks: "Membuang sedotan ke selokan sekolah" },
    ],
    benarId: "a",
    penjelasan: "Menolak sedotan plastik dan minum langsung dari gelas adalah cara mudah menghentikan sampah kecil ini.",
    hint: "Gunakan alternatif yang bisa dicuci dan dipakai ulang.",
    materiSlug: "dampak-plastik",
  },
  {
    id: "q-dp-8",
    topikId: "quiz-dampak-plastik",
    tingkat: "sedang",
    teks: "Bagaimana mikroplastik di laut bisa sampai ke piring makan manusia?",
    pilihan: [
      { id: "a", teks: "Tertelan ikan laut lalu dimakan manusia" },
      { id: "b", teks: "Terbang ditiup angin masuk ke jendela kamar" },
      { id: "c", teks: "Disemprotkan oleh nelayan di pelabuhan" },
    ],
    benarId: "a",
    penjelasan: "Rantai makanan laut saling terhubung. Ikan memakan mikroplastik, dan akhirnya ikan tersebut dikonsumsi manusia.",
    hint: "Melalui rantai makanan di ekosistem lautan.",
    materiSlug: "dampak-plastik",
  },

  // =========================================================================
  // TOPIK 5: quiz-kompos (materiSlug: kompos) - 8 Soal
  // =========================================================================
  {
    id: "q-kp-1",
    topikId: "quiz-kompos",
    tingkat: "mudah",
    teks: "Apa itu kompos yang dibuat dari sampah organik?",
    gambar: "/assets/sampah/kulit-pisang.svg",
    pilihan: [
      { id: "a", teks: "Bahan bakar pembuat roket" },
      { id: "b", teks: "Pupuk alami penyubur tanah dan tanaman" },
      { id: "c", teks: "Cat dinding berwarna cokelat" },
      { id: "d", teks: "Obat nyamuk bakar" },
    ],
    benarId: "b",
    penjelasan: "Kompos adalah pupuk alami bergizi tinggi hasil pembusukan sisa bahan organik.",
    hint: "Bahan penyubur agar bunga dan sayuran tumbuh subur.",
    materiSlug: "kompos",
  },
  {
    id: "q-kp-2",
    topikId: "quiz-kompos",
    tingkat: "mudah",
    teks: "Manakah bahan 'hijau' kaya nitrogen untuk campuran kompos?",
    pilihan: [
      { id: "a", teks: "Bungkus plastik permen" },
      { id: "b", teks: "Sisa sayuran dan kulit buah" },
      { id: "c", teks: "Kaca jendela pecah" },
    ],
    benarId: "b",
    penjelasan: "Bahan hijau meliputi sisa sayur dan kulit buah segar yang kaya kandungan nitrogen.",
    hint: "Berasal dari sisa masakan segar di dapur.",
    materiSlug: "kompos",
  },
  {
    id: "q-kp-3",
    topikId: "quiz-kompos",
    tingkat: "sedang",
    teks: "Apa fungsi bahan 'cokelat' seperti daun kering dalam pembuatan kompos?",
    gambar: "/assets/sampah/koran.svg",
    pilihan: [
      { id: "a", teks: "Memberi unsur karbon dan menjaga rongga udara" },
      { id: "b", teks: "Membuat kompos berbau seperti minyak wangi" },
      { id: "c", teks: "Membunuh seluruh cacing di dalam tanah" },
    ],
    benarId: "a",
    penjelasan: "Bahan cokelat kering menyerap kelembapan berlebih dan memberi energi karbon bagi mikroorganisme.",
    hint: "Kering dan berserat untuk menyeimbangkan bahan basah.",
    materiSlug: "kompos",
  },
  {
    id: "q-kp-4",
    topikId: "quiz-kompos",
    tingkat: "mudah",
    teks: "Mengapa sisa daging dan minyak DILARANG dimasukkan ke wadah kompos rumahan?",
    gambar: "/assets/sampah/puntung-rokok.svg",
    pilihan: [
      { id: "a", teks: "Bisa membusuk berbau tajam dan mengundang tikus" },
      { id: "b", teks: "Daging membuat kompos jadi terlalu dingin" },
      { id: "c", teks: "Minyak membuat tanaman berubah warna ungu" },
    ],
    benarId: "a",
    penjelasan: "Daging dan lemak membusuk menghasilkan bau menyengat serta memancing lalat dan hewan pengerat datang.",
    hint: "Minyak dan daging mengundang hama pengganggu.",
    materiSlug: "kompos",
  },
  {
    id: "q-kp-5",
    topikId: "quiz-kompos",
    tingkat: "mudah",
    teks: "Makhluk kecil apa di tanah yang membantu menggemburkan dan mengurai bahan kompos?",
    gambar: "/assets/sampah/kulit-pisang.svg",
    pilihan: [
      { id: "a", teks: "Kelelawar goa" },
      { id: "b", teks: "Cacing tanah dan bakteri pengurai" },
      { id: "c", teks: "Burung elang terbang" },
    ],
    benarId: "b",
    penjelasan: "Cacing tanah dan mikroba tanah mengunyah sisa organik dan mengubahnya menjadi pupuk gembur.",
    hint: "Hewan tak berkaki yang hidup di dalam tanah lembap.",
    materiSlug: "kompos",
  },
  {
    id: "q-kp-6",
    topikId: "quiz-kompos",
    tingkat: "sedang",
    teks: "Apa ciri-ciri kompos yang sudah matang dan siap dipanen?",
    pilihan: [
      { id: "a", teks: "Berbau busuk menyengat dan masih panas" },
      { id: "b", teks: "Warnanya hitam gembur, dingin, dan beraroma segar seperti tanah" },
      { id: "c", teks: "Bahan sisa sayurannya masih utuh dan keras" },
    ],
    benarId: "b",
    penjelasan: "Kompos matang bertekstur remah hitam, suhunya sudah normal, dan beraroma tanah hutan yang segar.",
    hint: "Mirip tanah subur dan tidak ada bau menyengat.",
    materiSlug: "kompos",
  },
  {
    id: "q-kp-7",
    topikId: "quiz-kompos",
    tingkat: "sedang",
    teks: "Mengapa tumpukan ember kompos perlu diaduk seminggu sekali?",
    pilihan: [
      { id: "a", teks: "Supaya sampah berubah warna jadi pelangi" },
      { id: "b", teks: "Memasukkan udara oksigen bagi mikroba pengurai" },
      { id: "c", teks: "Menakut-nakuti cacing agar bekerja lebih giat" },
      { id: "d", teks: "Mendinginkan ember dari sinar matahari" },
    ],
    benarId: "b",
    penjelasan: "Bakteri pengurai membutuhkan udara oksigen agar proses pengomposan tidak menghasilkan bau busuk.",
    hint: "Makhluk pengurai juga butuh bernapas.",
    materiSlug: "kompos",
  },
  {
    id: "q-kp-8",
    topikId: "quiz-kompos",
    tingkat: "sedang",
    teks: "Berapa lama rata-rata waktu yang dibutuhkan untuk membuat kompos ember rumahan?",
    gambar: "/assets/sampah/kulit-pisang.svg",
    pilihan: [
      { id: "a", teks: "1 hari saja" },
      { id: "b", teks: "4 sampai 6 minggu" },
      { id: "c", teks: "10 tahun penuh" },
    ],
    benarId: "b",
    penjelasan: "Dengan kelembapan yang pas dan pengadukan teratur, kompos rumahan siap dalam waktu 4-6 minggu.",
    hint: "Sekitar satu hingga satu setengah bulan.",
    materiSlug: "kompos",
  },

  // =========================================================================
  // TOPIK 6: quiz-sampah-b3 (materiSlug: sampah-b3) - 8 Soal
  // =========================================================================
  {
    id: "q-b3-1",
    topikId: "quiz-sampah-b3",
    tingkat: "mudah",
    teks: "Apa arti singkatan dari B3?",
    gambar: "/assets/sampah/puntung-rokok.svg",
    pilihan: [
      { id: "a", teks: "Bahan Bersih, Bagus, dan Baik" },
      { id: "b", teks: "Bahan Berbahaya dan Beracun" },
      { id: "c", teks: "Barang Bekas Berharga" },
    ],
    benarId: "b",
    penjelasan: "B3 adalah singkatan resmi dari Bahan Berbahaya dan Beracun yang memerlukan penanganan ekstra.",
    hint: "Kata yang berhubungan dengan bahaya dan racun.",
    materiSlug: "sampah-b3",
  },
  {
    id: "q-b3-2",
    topikId: "quiz-sampah-b3",
    tingkat: "mudah",
    teks: "Manakah benda rumah tangga yang termasuk limbah B3?",
    gambar: "/assets/sampah/puntung-rokok.svg",
    pilihan: [
      { id: "a", teks: "Baterai bekas dan lampu neon" },
      { id: "b", teks: "Kardus sepatu robek" },
      { id: "c", teks: "Kulit buah semangka" },
      { id: "d", teks: "Sisa sedotan kertas" },
    ],
    benarId: "a",
    penjelasan: "Baterai dan lampu mengandung bahan kimia berat yang berbahaya jika pecah di lingkungan.",
    hint: "Peralatan elektronik yang memakai bahan kimia khusus.",
    materiSlug: "sampah-b3",
  },
  {
    id: "q-b3-3",
    topikId: "quiz-sampah-b3",
    tingkat: "sedang",
    teks: "Mengapa limbah B3 seperti baterai dan kaleng semprot DILARANG dibakar?",
    pilihan: [
      { id: "a", teks: "Bisa memicu ledakan dan melepaskan asap beracun" },
      { id: "b", teks: "Membuat api menjadi berwarna biru muda" },
      { id: "c", teks: "Karena baterai akan berubah jadi emas" },
    ],
    benarId: "a",
    penjelasan: "Tekanan udara di dalam kaleng semprot bisa meledak hebat dan bahan baterai melepas gas beracun ke udara.",
    hint: "Gas bertekanan dan zat kimia sangat reaktif terhadap panas api.",
    materiSlug: "sampah-b3",
  },
  {
    id: "q-b3-4",
    topikId: "quiz-sampah-b3",
    tingkat: "sedang",
    teks: "Bahaya apa yang terjadi jika cairan baterai bocor ke tanah pekarangan?",
    gambar: "/assets/sampah/puntung-rokok.svg",
    pilihan: [
      { id: "a", teks: "Tanah menjadi sangat subur seperti hutan" },
      { id: "b", teks: "Logam beratnya meresap dan mencemari air sumur warga" },
      { id: "c", teks: "Rumput pekarangan akan berbunga merah cerah" },
    ],
    benarId: "b",
    penjelasan: "Cairan asam dan logam timbal meresap bersama air hujan dan bisa mengotori sumber air minum bawah tanah.",
    hint: "Cairan berbahaya bisa mencemari air yang kita gunakan sehari-hari.",
    materiSlug: "sampah-b3",
  },
  {
    id: "q-b3-5",
    topikId: "quiz-sampah-b3",
    tingkat: "mudah",
    teks: "Bagaimana cara aman menyimpan baterai bekas di rumah sebelum disetor?",
    gambar: "/assets/sampah/kaleng.svg",
    pilihan: [
      { id: "a", teks: "Ditaruh di tempat tidur bayi" },
      { id: "b", teks: "Disimpan dalam wadah kering khusus tertutup" },
      { id: "c", teks: "Direndam di dalam ember air kamar mandi" },
    ],
    benarId: "b",
    penjelasan: "Kotak tertutup dan kering menjaga baterai tidak terkena air dan aman dari jangkauan anak kecil.",
    hint: "Gunakan wadah khusus yang aman dan kering.",
    materiSlug: "sampah-b3",
  },
  {
    id: "q-b3-6",
    topikId: "quiz-sampah-b3",
    tingkat: "sedang",
    teks: "Apa yang harus kamu lakukan jika melihat botol pembersih kimia bocor di lantai?",
    pilihan: [
      { id: "a", teks: "Memegang cairannya dengan tangan kosong" },
      { id: "b", teks: "Mencicipi baunya dari dekat" },
      { id: "c", teks: "Segera melapor ke orang tua atau guru untuk dibersihkan" },
    ],
    benarId: "c",
    penjelasan: "Cairan kimia bisa membuat kulit gatal atau iritasi, jadi mintalah bantuan orang dewasa yang berpengalaman.",
    hint: "Jangan sentuh langsung dan panggil bantuan orang dewasa.",
    materiSlug: "sampah-b3",
  },
  {
    id: "q-b3-7",
    topikId: "quiz-sampah-b3",
    tingkat: "mudah",
    teks: "Tong sampah warna apa yang disiapkan untuk menampung sampah B3 di tempat umum?",
    gambar: "/assets/sampah/puntung-rokok.svg",
    pilihan: [
      { id: "a", teks: "Tong Hijau" },
      { id: "b", teks: "Tong Kuning" },
      { id: "c", teks: "Tong Merah" },
    ],
    benarId: "c",
    penjelasan: "Warna merah melambangkan tanda bahaya khusus limbah berbahaya dan beracun B3.",
    hint: "Warna tanda bahaya dan peringatan waspada.",
    materiSlug: "sampah-b3",
  },
  {
    id: "q-b3-8",
    topikId: "quiz-sampah-b3",
    tingkat: "sedang",
    teks: "Ke mana obat-obatan yang sudah kedaluwarsa sebaiknya diserahkan?",
    pilihan: [
      { id: "a", teks: "Dibuang langsung ke sungai atau kloset" },
      { id: "b", teks: "Diserahkan ke apotek atau tempat penerimaan limbah medis" },
      { id: "c", teks: "Dihaluskan dan dijadikan pupuk pohon" },
    ],
    benarId: "b",
    penjelasan: "Apotek atau puskesmas memiliki prosedur pemusnahan obat yang aman agar zat kimianya tidak mencemari saluran air.",
    hint: "Fasilitas kesehatan memiliki tempat pembuangan obat yang aman.",
    materiSlug: "sampah-b3",
  },
];

/**
 * Pure pseudo-random hash generator for deterministic daily quiz selection
 */
export function hashSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Generates 5 deterministic questions for the Daily Quiz:
 * - Exactly 3 easy questions and 2 medium questions
 * - Spans different topics across the quiz bank
 * - Deterministic based on dateKey (YYYY-MM-DD)
 */
export function getDailyQuizQuestions(dateKey: string): QuizQuestion[] {
  const easyQuestions = ALL_QUIZ_QUESTIONS.filter((q) => q.tingkat === "mudah");
  const mediumQuestions = ALL_QUIZ_QUESTIONS.filter((q) => q.tingkat === "sedang");

  const seed = hashSeed(dateKey);

  // Pick 3 easy questions from different topics if possible
  const selected: QuizQuestion[] = [];
  const pickedTopics = new Set<string>();

  // 1. Easy 1
  const easyIdx1 = seed % easyQuestions.length;
  const q1 = easyQuestions[easyIdx1];
  selected.push(q1);
  pickedTopics.add(q1.topikId);

  // 2. Easy 2
  const easyPool2 = easyQuestions.filter((q) => !pickedTopics.has(q.topikId));
  const pool2 = easyPool2.length > 0 ? easyPool2 : easyQuestions.filter((q) => q.id !== q1.id);
  const easyIdx2 = Math.floor(seed / 7) % pool2.length;
  const q2 = pool2[easyIdx2];
  selected.push(q2);
  pickedTopics.add(q2.topikId);

  // 3. Easy 3
  const easyPool3 = easyQuestions.filter((q) => !pickedTopics.has(q.topikId));
  const pool3 = easyPool3.length > 0 ? easyPool3 : easyQuestions.filter((q) => q.id !== q1.id && q.id !== q2.id);
  const easyIdx3 = Math.floor(seed / 31) % pool3.length;
  const q3 = pool3[easyIdx3];
  selected.push(q3);
  pickedTopics.add(q3.topikId);

  // 4. Medium 1
  const medPool1 = mediumQuestions.filter((q) => !pickedTopics.has(q.topikId));
  const poolMed1 = medPool1.length > 0 ? medPool1 : mediumQuestions;
  const medIdx1 = Math.floor(seed / 13) % poolMed1.length;
  const q4 = poolMed1[medIdx1];
  selected.push(q4);
  pickedTopics.add(q4.topikId);

  // 5. Medium 2
  const medPool2 = mediumQuestions.filter((q) => q.id !== q4.id);
  const medIdx2 = Math.floor(seed / 17) % medPool2.length;
  const q5 = medPool2[medIdx2];
  selected.push(q5);

  return selected;
}

/**
 * Returns questions for a specific topic (optionally limited count)
 */
export function getTopicQuizQuestions(topikId: string, count = 5): QuizQuestion[] {
  const filtered = ALL_QUIZ_QUESTIONS.filter((q) => q.topikId === topikId);
  return filtered.slice(0, count);
}

/**
 * Dev-only validator to ensure quality of quiz bank:
 * - At least 8 questions per topic (PRD KQ-01)
 * - Correct answer ID exists in choices
 * - Choice count is 3 or 4
 * - Question text <= 25 words
 * - Option text <= 10 words
 * - Valid topicId and materiSlug
 */
export function validateQuizQuestions(): {
  passed: boolean;
  violations: { questionId: string; reason: string }[];
  topicCounts: Record<string, number>;
} {
  const violations: { questionId: string; reason: string }[] = [];
  const topicCounts: Record<string, number> = {};

  QUIZ_TOPICS.forEach((t) => {
    topicCounts[t.id] = 0;
  });

  ALL_QUIZ_QUESTIONS.forEach((q) => {
    // Count per topic
    topicCounts[q.topikId] = (topicCounts[q.topikId] || 0) + 1;

    // Check topic validity
    const topicMeta = QUIZ_TOPICS.find((t) => t.id === q.topikId);
    if (!topicMeta) {
      violations.push({ questionId: q.id, reason: `Invalid topikId: ${q.topikId}` });
    } else if (topicMeta.slug !== q.materiSlug) {
      violations.push({
        questionId: q.id,
        reason: `Mismatched materiSlug: expected ${topicMeta.slug}, got ${q.materiSlug}`,
      });
    }

    // Check correct answer ID
    const hasCorrect = q.pilihan.some((p) => p.id === q.benarId);
    if (!hasCorrect) {
      violations.push({
        questionId: q.id,
        reason: `benarId "${q.benarId}" not found in choices`,
      });
    }

    // Check choice count
    if (q.pilihan.length < 3 || q.pilihan.length > 4) {
      violations.push({
        questionId: q.id,
        reason: `Pilihan length must be 3 or 4, got ${q.pilihan.length}`,
      });
    }

    // Check question word count <= 25 words
    const qWords = q.teks.trim().split(/\s+/).filter(Boolean);
    if (qWords.length > 25) {
      violations.push({
        questionId: q.id,
        reason: `Question text exceeds 25 words (${qWords.length} words)`,
      });
    }

    // Check option word count <= 10 words
    q.pilihan.forEach((p) => {
      const pWords = p.teks.trim().split(/\s+/).filter(Boolean);
      if (pWords.length > 10) {
        violations.push({
          questionId: q.id,
          reason: `Option "${p.id}" exceeds 10 words (${pWords.length} words)`,
        });
      }
    });
  });

  // Verify at least 8 questions per topic
  QUIZ_TOPICS.forEach((t) => {
    if ((topicCounts[t.id] || 0) < 8) {
      violations.push({
        questionId: t.id,
        reason: `Topic has only ${topicCounts[t.id] || 0} questions (minimum 8 required)`,
      });
    }
  });

  return {
    passed: violations.length === 0,
    violations,
    topicCounts,
  };
}
