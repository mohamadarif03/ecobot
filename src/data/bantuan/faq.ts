import type { FaqItem, FaqCategory } from "./types.ts";

export const FAQ_CATEGORIES: { id: FaqCategory | "semua"; label: string; icon: string }[] = [
  { id: "semua", label: "Semua Pertanyaan", icon: "💬" },
  { id: "bermain", label: "Cara Bermain & Game", icon: "🎮" },
  { id: "hadiah", label: "Poin, XP & Hadiah", icon: "🎁" },
  { id: "belajar", label: "Belajar & Aksi Nyata", icon: "📚" },
  { id: "akun", label: "Akun, Data & Privasi", icon: "🛡️" },
  { id: "teknis", label: "Bantuan Teknis & Perangkat", icon: "⚙️" },
];

export const FAQ_ITEMS: FaqItem[] = [
  // ==========================================
  // KATEGORI 1: BERMAIN & GAME (6 item)
  // ==========================================
  {
    id: "faq-cara-memungut-sampah",
    category: "bermain",
    question: "Bagaimana cara memungut sampah di dalam game 3D?",
    answer:
      "Arahkan karaktermu mendekati sampah yang berserakan di jalan atau taman. Ketika jarakmu sudah cukup dekat, tombol aksi di layar akan menyala dan bertuliskan 'AMBIL'. Tekan tombol tersebut di layar sentuh, atau tekan tombol Spasi / E pada keyboard laptopmu.",
    keywords: ["ambil", "pungut", "memungut", "sampah", "spasi", "tombol aksi"],
    actionLink: { label: "Coba Main Game", href: "/main-game" },
    tips: "Jika tombol tidak bereaksi, pastikan kantong sampahmu belum penuh ya!",
  },
  {
    id: "faq-warna-tong-sampah",
    category: "bermain",
    question: "Apa bedanya tong sampah Hijau, Kuning, dan Merah?",
    answer:
      "Tong Hijau khusus untuk sampah Organik (sisa makanan, kulit buah, daun gugur yang mudah membusuk). Tong Kuning khusus sampah Anorganik (botol plastik, kaleng, kardus bersih yang bisa didaur ulang). Tong Merah khusus sampah B3 (baterai bekas, lampu neon, botol kimia beracun yang berbahaya).",
    keywords: ["tong", "warna", "hijau", "kuning", "merah", "organik", "anorganik", "b3"],
    actionLink: { label: "Lihat Panduan Tiga Tong", href: "/bantuan?tab=cara-bermain" },
    tips: "Membuang ke tong yang tepat akan melipatgandakan poin kombo pemilahanmu!",
  },
  {
    id: "faq-kapasitas-kantong",
    category: "bermain",
    question: "Kenapa karakterku tidak bisa mengambil sampah lagi?",
    answer:
      "Itu artinya Kantong Daur Ulang yang kamu bawa sudah penuh! Kamu harus segera menuju ke deretan tong sampah terdekat untuk membuang dan memilah sampah yang kamu bawa. Setelah kantong kosong, kamu bisa memungut sampah lagi.",
    keywords: ["kantong penuh", "tas penuh", "tidak bisa ambil", "upgrade kantong"],
    actionLink: { label: "Tingkatkan Kapasitas Kantong", href: "/main-game" },
    tips: "Kamu bisa meningkatkan daya tampung kantongmu di menu Upgrade di halaman Main Game.",
  },
  {
    id: "faq-kombo-pemilahan",
    category: "bermain",
    question: "Apa itu Kombo Pemilahan dan bagaimana cara mendapatkannya?",
    answer:
      "Kombo Pemilahan adalah bonus bertubi-tubi saat kamu membuang sampah ke tong yang benar secara berturut-turut tanpa salah. Setiap kali kamu benar, angka kombo bertambah (misalnya x2, x3, hingga x10) dan memberi bonus XP lebih besar!",
    keywords: ["kombo", "combo", "pemilahan", "multiplier", "bonus xp"],
    tips: "Jika kamu salah memasukkan sampah ke tong yang keliru, kombo akan kembali ke angka 0.",
  },
  {
    id: "faq-kebersihan-kota",
    category: "bermain",
    question: "Bagaimana cara menaikkan Meter Kebersihan Kota sampai 100%?",
    answer:
      "Meter Kebersihan Kota di pojok kanan atas menunjukkan seberapa asri taman kota. Angka ini akan terus naik setiap kali kamu berhasil memungut sampah dan membuangnya ke tong yang benar. Bersihkan seluruh sampah yang tersisa di area bermain untuk meraih kebersihan 100%!",
    keywords: ["kebersihan kota", "meteran", "100%", "kota bersih", "bar hijau"],
    actionLink: { label: "Bersihkan Kota Sekarang", href: "/main-game" },
  },
  {
    id: "faq-syarat-3-bintang",
    category: "bermain",
    question: "Bagaimana cara mendapatkan 3 Bintang Emas di setiap misi?",
    answer:
      "Untuk meraih 3 Bintang Emas, kamu harus menyelesaikan target jumlah sampah misi dan menjaga tingkat akurasi pemilahan minimal 90%. Artinya, dari 10 sampah yang kamu buang, maksimal hanya boleh salah 1 kali saja!",
    keywords: ["bintang", "3 bintang", "akurasi", "sempurna", "emas"],
    actionLink: { label: "Periksa Aturan Bintang", href: "/bantuan?tab=cara-bermain" },
  },

  // ==========================================
  // KATEGORI 2: POIN, XP & HADIAH (6 item)
  // ==========================================
  {
    id: "faq-perbedaan-xp-poin",
    category: "hadiah",
    question: "Apa bedanya XP (⚡) dan Poin Koin (🪙)?",
    answer:
      "XP (Experience Points) adalah poin pengalaman untuk menaikkan Level karaktermu. XP tidak akan pernah berkurang atau habis. Sedangkan Poin Koin adalah uang virtual daur ulang yang kamu dapatkan dari misi dan kuis untuk membeli kostum, warna Ecobot, atau stiker di Toko.",
    keywords: ["xp", "poin", "koin", "beda xp poin", "uang game"],
    actionLink: { label: "Kunjungi Toko Kustomisasi", href: "/toko" },
  },
  {
    id: "faq-apakah-toko-pakai-uang-asli",
    category: "hadiah",
    question: "Apakah item di Toko membutuhkan uang sungguhan (rupiah)?",
    answer:
      "Sama sekali TIDAK! Seluruh kostum, topi, warna Ecobot, dan stiker di Toko ECOBOT 100% GRATIS dan hanya dapat ditukarkan menggunakan Poin Koin yang kamu kumpulkan dari ketekunan bermain dan belajar. Tidak ada pembelian dalam aplikasi (in-app purchase) maupun iklan.",
    keywords: ["uang asli", "rupiah", "beli", "bayar", "gratis", "in-app purchase"],
    actionLink: { label: "Buka Toko ECOBOT", href: "/toko" },
    tips: "Orang tua tidak perlu khawatir, game ini dirancang aman bagi anak tanpa risiko tagihan finansial.",
  },
  {
    id: "faq-cara-klaim-misi",
    category: "hadiah",
    question: "Kapan saya bisa mengklaim hadiah Misi Harian dan Mingguan?",
    answer:
      "Ketika bilah progres misi harian atau mingguanmu sudah mencapai target (misal 5/5), tombol 'Klaim Hadiah' akan menyala kuning cerah. Tekan tombol tersebut di halaman Misi untuk menerima bonus XP dan Poin!",
    keywords: ["klaim", "misi harian", "misi mingguan", "ambil hadiah"],
    actionLink: { label: "Lihat Status Misi", href: "/misi" },
    tips: "Misi Harian diperbarui setiap tengah malam pukul 00.00 WIB, jadi jangan lupa klaim sebelum hari berganti ya!",
  },
  {
    id: "faq-peti-harta-karun",
    category: "hadiah",
    question: "Bagaimana cara membuka Peti Harta Karun di halaman Misi?",
    answer:
      "Peti Harian akan terbuka jika kamu menyelesaikan seluruh 3 Misi Harian di hari tersebut. Sedangkan Peti Mingguan akan terbuka jika kamu menuntaskan seluruh 4 Misi Mingguan. Peti ini berisi bonus ratusan XP dan koin ekstra yang melimpah!",
    keywords: ["peti", "chest", "harta karun", "bonus besar", "klaim peti"],
    actionLink: { label: "Cek Peti Misi", href: "/misi" },
  },
  {
    id: "faq-cara-naik-level",
    category: "hadiah",
    question: "Bagaimana cara menaikkan level karakter dan apa saja gelarnya?",
    answer:
      "Setiap aktivitas positif yang kamu lakukan (memilah sampah di game, membaca topik pustaka, menjawab kuis, mencatat aksi nyata) memberikan XP. Saat XP memenuhi kuota, levelmu akan otomatis naik. Gelar dimulai dari 'Pemula Hijau' (Lv 1), 'Sahabat Bumi' (Lv 5), hingga 'Pahlawan Lingkungan Abadi' (Lv 20)!",
    keywords: ["naik level", "level up", "gelar", "pangkat", "pahlawan bumi"],
    actionLink: { label: "Lihat Rapor Levelmu", href: "/pencapaian" },
  },
  {
    id: "faq-streak-terputus",
    category: "hadiah",
    question: "Apa yang terjadi jika saya lupa membuka web selama 1 hari (Streak terputus)?",
    answer:
      "Jika kamu melewatkan satu hari kalender tanpa melakukan aktivitas belajar, penghitung Streak (Hari Berturut-turut) akan kembali ke angka 1 saat kamu login lagi. Namun tenang, seluruh XP, Poin koin, Level, dan Lencana yang sudah kamu miliki TETAP AMAN dan tidak akan hilang!",
    keywords: ["streak", "hari berturut-turut", "terputus", "reset streak", "api"],
    tips: "Luangkan waktu 3 menit setiap hari untuk membaca 1 materi atau mencatat aksi nyata agar streakmu terus menyala!",
  },

  // ==========================================
  // KATEGORI 3: BELAJAR & AKSI NYATA (6 item)
  // ==========================================
  {
    id: "faq-apa-itu-pustaka-edukasi",
    category: "belajar",
    question: "Apa yang bisa saya pelajari di Pustaka Edukasi?",
    answer:
      "Pustaka Edukasi berisi kumpulan topik lingkungan hidup yang disajikan lewat kartu geser pendek yang mudah dibaca dan dilengkapi ilustrasi ramah anak. Kamu bisa belajar tentang jenis-jenis sampah, bahaya mikroplastik, cara kerja daur ulang, pembuatan kompos, dan tips menghemat energi.",
    keywords: ["pustaka", "belajar", "kartu baca", "materi", "edukasi"],
    actionLink: { label: "Buka Pustaka", href: "/pustaka" },
    tips: "Setiap kali kamu menyelesaikan membaca satu topik materi, kamu akan dihadiahi bonus XP!",
  },
  {
    id: "faq-jenis-kuis",
    category: "belajar",
    question: "Apa perbedaan Kuis Harian, Kuis Topik, dan Duel Cepat?",
    answer:
      "Kuis Harian terdiri dari 5 soal acak yang disegarkan setiap hari untuk melatih ingatanmu. Kuis Topik menguji pemahaman materi yang baru saja kamu baca di Pustaka. Sedangkan Duel Cepat adalah adu tangkas menjawab soal dalam batas waktu untuk melatih kecepatan berpikir!",
    keywords: ["kuis harian", "kuis topik", "duel cepat", "soal", "trivia"],
    actionLink: { label: "Pusat Kuis", href: "/kuis" },
  },
  {
    id: "faq-salah-jawab-kuis",
    category: "belajar",
    question: "Apakah ada pengurangan poin jika saya salah menjawab soal kuis?",
    answer:
      "TIDAK ADA pengurangan poin atau hukuman sama sekali! Kuis ECOBOT dirancang untuk menguatkan pemahaman, bukan menakut-nakuti anak. Jika jawabanmu keliru, Ecobot akan menampilkan penjelasan ramah mengapa jawaban tersebut kurang tepat sehingga kamu bisa belajar dari kesalahan.",
    keywords: ["salah kuis", "hukuman", "kurang poin", "penjelasan kuis"],
    tips: "Kamu bisa mengulang kuis kapan saja sampai benar-benar paham materi yang diajarkan.",
  },
  {
    id: "faq-tantangan-7-hari",
    category: "belajar",
    question: "Bagaimana cara mengikuti Tantangan 7 Hari di menu Aksi Nyata?",
    answer:
      "Buka menu Aksi Nyata lalu mulai Tantangan 7 Hari Kebiasaan Hijau. Setiap hari akan ada satu misi sederhana di dunia nyata (seperti membawa botol minum sendiri, mematikan lampu kamar saat siang, atau memilah sampah dapur). Lakukan aksi tersebut di rumah, lalu centang tombol 'Selesai Hari Ini'.",
    keywords: ["tantangan 7 hari", "aksi nyata", "kebiasaan", "dunia nyata", "rumah"],
    actionLink: { label: "Mulai Tantangan 7 Hari", href: "/aksi-nyata" },
    tips: "Menyelesaikan putaran 7 hari penuh akan membuka Lencana Kehormatan dan hadiah koin melimpah!",
  },
  {
    id: "faq-kalkulator-sampah",
    category: "belajar",
    question: "Bagaimana cara kerja Kalkulator Jejak Sampah?",
    answer:
      "Kalkulator Jejak Sampah membantumu memperkirakan berapa banyak sampah yang dihasilkan keluargamu dalam sehari. Kamu cukup memilih perkiraan jumlah kantong plastik, botol minuman, dan sisa makanan yang dibuang. Ecobot akan menghitung dampaknya dan memberikan saran cerdas untuk menguranginya.",
    keywords: ["kalkulator", "jejak sampah", "hitung sampah", "keluarga", "plastik"],
    actionLink: { label: "Coba Kalkulator Sampah", href: "/aksi-nyata" },
  },
  {
    id: "faq-ide-kreatif-daur-ulang",
    category: "belajar",
    question: "Apakah saya bisa membuat kerajinan tangan dari barang bekas di rumah?",
    answer:
      "Tentu saja bisa! Di menu Aksi Nyata terdapat tab 'Ide Kreatif' yang menyediakan panduan langkah demi langkah membuat pot tanaman dari botol plastik bekas, celengan dari kaleng biskuit, dan tempat pensil dari kardus. Minta dampingan orang tua saat menggunakan gunting ya!",
    keywords: ["ide kreatif", "kerajinan", "daur ulang", "botol bekas", "diy"],
    actionLink: { label: "Lihat Ide Kreatif", href: "/aksi-nyata" },
  },

  // ==========================================
  // KATEGORI 4: AKUN, DATA & PRIVASI (5 item)
  // ==========================================
  {
    id: "faq-apakah-harus-daftar-email",
    category: "akun",
    question: "Apakah saya perlu mendaftar menggunakan alamat email atau nomor telepon?",
    answer:
      "TIDAK PERLU sama sekali! ECOBOT sepenuhnya menjunjung tinggi privasi anak-anak. Kamu hanya perlu memilih nama panggilan kesukaanmu dan avatar karakter saat pertama kali masuk tanpa memasukkan alamat email, nomor telepon, maupun kata sandi apa pun.",
    keywords: ["daftar", "login", "email", "telepon", "privasi anak", "registrasi"],
    actionLink: { label: "Baca Kebijakan Privasi", href: "/privasi" },
    tips: "Data kamu aman di peramban perangkatmu sendiri dan tidak dikirim ke server pelacak pihak ketiga.",
  },
  {
    id: "faq-ganti-nama-dan-avatar",
    category: "akun",
    question: "Apakah saya bisa mengganti nama panggilan dan foto avatar?",
    answer:
      "Bisa kapan saja! Masuk ke menu Pengaturan, pilih tab 'Profil', lalu ketik nama panggilan barumu dan pilih salah satu avatar seru yang tersedia. Jangan lupa tekan tombol 'Simpan Profil'.",
    keywords: ["ganti nama", "ganti avatar", "profil", "nickname", "foto"],
    actionLink: { label: "Ubah Profil di Pengaturan", href: "/pengaturan?tab=profil" },
    tips: "Nama panggilan harus sopan, terdiri dari 3 hingga 15 karakter, dan tidak boleh mengandung kata sandi rahasia.",
  },
  {
    id: "faq-cara-backup-data",
    category: "akun",
    question: "Bagaimana cara memindahkan data permainan ke laptop atau HP lain?",
    answer:
      "Buka menu Pengaturan, lalu pilih tab 'Cadangan & Privasi'. Tekan tombol 'Unduh Cadangan Data (.json)' untuk menyimpan file progresmu. Di perangkat baru, buka halaman yang sama dan pilih 'Pulihkan dari File (.json)' untuk melanjutkan petualanganmu tanpa kehilangan level maupun lencana!",
    keywords: ["backup", "cadangan", "pindah data", "ekspor", "impor", "restore", "json"],
    actionLink: { label: "Buka Cadangan Data", href: "/pengaturan?tab=data" },
  },
  {
    id: "faq-apakah-data-hilang-saat-clear-cache",
    category: "akun",
    question: "Apakah progres bermain akan hilang jika saya menghapus riwayat browser?",
    answer:
      "Jika kamu membersihkan 'Penyimpanan Situs' atau 'Local Storage' browser secara menyeluruh, data permainan dapat ikut terhapus karena game ini menyimpannya di perangkatmu. Oleh karena itu, kami sarankan mengunduh file Cadangan Data (.json) secara berkala ya!",
    keywords: ["hapus cache", "data hilang", "clear history", "localstorage"],
    tips: "File cadangan berukuran sangat kecil (hanya beberapa kilobyte) dan bisa kamu simpan di folder dokumen atau flashdisk.",
  },
  {
    id: "faq-cara-reset-semua-data",
    category: "akun",
    question: "Bagaimana jika saya ingin mengulang petualangan dari awal (Level 1)?",
    answer:
      "Jika kamu ingin mengulang permainan dari awal seperti pemain baru, buka menu Pengaturan -> tab 'Cadangan & Privasi' -> gulir ke bawah ke zona 'Reset Semua Data'. Tekan tombol merah dan konfirmasi pilihanmu. Ingat, tindakan ini akan menghapus seluruh XP, poin, dan lencana yang tersimpan di perangkat ini.",
    keywords: ["reset data", "mulai dari awal", "hapus semua", "level 1 lagi"],
    actionLink: { label: "Menu Cadangan & Reset", href: "/pengaturan?tab=data" },
  },

  // ==========================================
  // KATEGORI 5: BANTUAN TEKNIS & PERANGKAT (5 item)
  // ==========================================
  {
    id: "faq-game-lag-atau-patah",
    category: "teknis",
    question: "Game 3D terasa lambat, patah-patah, atau kipas laptop berbunyi kencang?",
    answer:
      "Buka menu Pengaturan -> tab 'Grafis', lalu ubah Kualitas Grafis ke opsi 'Rendah (Hemat)' dan aktifkan tombol 'Mode Hemat Baterai'. Ini akan menyederhanakan efek bayangan 3D dan menurunkan beban prosesor sehingga permainan berjalan jauh lebih lancar di laptop atau HP spesifikasi standar.",
    keywords: ["lag", "patah-patah", "lambat", "grafis", "fps", "kipas", "berat"],
    actionLink: { label: "Atur Grafis di Pengaturan", href: "/pengaturan?tab=grafis" },
    tips: "Tutup tab browser lain yang sedang memutar video YouTube untuk membebaskan memori RAM perangkatmu.",
  },
  {
    id: "faq-suara-dan-musik-tidak-bunyi",
    category: "teknis",
    question: "Kenapa musik ceria dan efek suara game tidak terdengar?",
    answer:
      "Periksa tiga hal berikut: 1. Pastikan tombol 'Bisukan Semua Suara' di menu Pengaturan dalam keadaan mati (nonaktif). 2. Geser volume Musik dan Efek Suara ke angka 70% atau lebih. 3. Beberapa browser melarang suara berbunyi otomatis sebelum pemain menyentuh atau mengklik layar satu kali.",
    keywords: ["suara", "musik", "tidak bunyi", "audio", "bisu", "mute", "volume"],
    actionLink: { label: "Atur Suara di Pengaturan", href: "/pengaturan?tab=suara" },
  },
  {
    id: "faq-layar-game-terpotong-di-hp",
    category: "teknis",
    question: "Layar game tampak terlalu sempit di layar HP saya?",
    answer:
      "Game 3D ECOBOT dirancang paling nyaman dimainkan dalam posisi MENDATAR (Landscape). Putar perangkat HP atau tabletmu ke posisi horizontal dan pastikan fitur 'Kunci Rotasi Otomatis' di ponselmu sudah dimatikan agar layar otomatis melebar penuh.",
    keywords: ["layar terpotong", "layar sempit", "landscape", "miringkan hp", "rotasi"],
    tips: "Jika teks terasa terlalu besar di layar kecil, kamu bisa mengubah Ukuran Teks ke opsi 'Normal' di Pengaturan -> Tampilan.",
  },
  {
    id: "faq-tombol-kontrol-kidal",
    category: "teknis",
    question: "Saya kidal, bisakah joystick analog dipindahkan ke sebelah kanan?",
    answer:
      "Tentu saja bisa! Buka menu Pengaturan -> tab 'Kontrol Game', lalu aktifkan sakelar 'Mode Kidal (Tangan Kiri)'. Virtual joystick akan langsung berpindah ke sudut kanan bawah layar, dan tombol aksi berpindah ke sudut kiri bawah sehingga nyaman dimainkan dengan tangan kirimu.",
    keywords: ["kidal", "tangan kiri", "tukar tombol", "left handed", "joystick kanan"],
    actionLink: { label: "Atur Kontrol di Pengaturan", href: "/pengaturan?tab=kontrol" },
  },
  {
    id: "faq-dukungan-peramban-browser",
    category: "teknis",
    question: "Browser apa saja yang didukung oleh ECOBOT?",
    answer:
      "ECOBOT berjalan optimal di seluruh peramban modern yang mendukung WebGL dan HTML5: Google Chrome, Mozilla Firefox, Microsoft Edge, Safari (di iPad/iPhone/Mac), dan Opera. Pastikan browser yang kamu gunakan sudah diperbarui ke versi terbaru.",
    keywords: ["browser", "chrome", "edge", "firefox", "safari", "webgl", "kompatibilitas"],
  },
];
