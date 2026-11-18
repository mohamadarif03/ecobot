import React from "react";
import { Link } from "react-router-dom";
import { Gamepad2, BookOpen, HelpCircle, Leaf, Sparkles, ArrowRight, Play, Bot } from "lucide-react";

export const GamePreviewSection: React.FC = () => {
  const CHAPTERS = [
    {
      number: "01",
      title: "Simulasi Kota 3D",
      subtitle: "Petualangan Fisika & Memilah Sampah",
      description:
        "Jelajahi 6 zona kota penuh tantangan. Ambil sampah yang tercecer dan masukkan ke tong yang tepat untuk mendapatkan poin kombo dan 3 bintang emas.",
      icon: <Gamepad2 className="w-6 h-6 text-emerald-600" />,
      link: "/main-game",
      actionText: "Mulai Main Game",
      tag: "Interaktif",
    },
    {
      number: "02",
      title: "Pustaka Edukasi Lingkungan",
      subtitle: "Kartu Geser Mini & Glosarium Anak",
      description:
        "Baca fakta menarik seputar siklus daur ulang, bahaya mikroplastik bagi laut, dan cara membuat pupuk kompos alami dari sisa sayur dapur.",
      icon: <BookOpen className="w-6 h-6 text-emerald-600" />,
      link: "/pustaka",
      actionText: "Buka Pustaka",
      tag: "Wawasan",
    },
    {
      number: "03",
      title: "Pusat Kuis & Tantangan",
      subtitle: "5 Soal Harian Ramah Tanpa Hukuman",
      description:
        "Latih daya ingatmu setiap hari. Jika keliru menjawab, Ecobot akan tersenyum dan memberikan penjelasan logis yang mudah dimengerti.",
      icon: <HelpCircle className="w-6 h-6 text-amber-600" />,
      link: "/kuis",
      actionText: "Ikuti Kuis",
      tag: "Asah Ingatan",
    },
    {
      number: "04",
      title: "Aksi Nyata di Rumah",
      subtitle: "Tantangan 7 Hari & Hitung Jejak Sampah",
      description:
        "Bawa ilmu dari game ke kehidupan nyata di rumah: membawa tumbler sendiri, mematikan lampu siang hari, dan menghitung jejak sampah keluargamu.",
      icon: <Leaf className="w-6 h-6 text-teal-600" />,
      link: "/aksi-nyata",
      actionText: "Mulai Tantangan",
      tag: "Dunia Nyata",
    },
  ];

  return (
    <section
      id="fitur"
      aria-label="Preview Game dan Fitur Unggulan"
      className="relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#F4FBF6] via-white to-white border-t border-emerald-950/5 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow & Title */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-emerald-800 bg-emerald-100/80 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>FITUR LENGKAP ECOBOT</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal font-serif text-slate-900 tracking-tight leading-[1.15]">
            Satu Aplikasi, Ragam Petualangan Ramah Lingkungan
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Dari simulasi 3D yang seru hingga kebiasaan positif di rumah, setiap fitur saling
            terhubung untuk menumbuhkan cinta lingkungan secara alami.
          </p>
        </div>

        {/* ==================== 1. WIDE 3D CINEMA VIEWPORT (TANPA CARD KAKU) ==================== */}
        <div className="relative mb-24 overflow-hidden rounded-[40px] shadow-2xl border-2 border-slate-900 bg-slate-950">
          <div className="relative w-full h-[320px] sm:h-[460px] bg-gradient-to-b from-emerald-500 via-teal-400 to-emerald-700 flex flex-col justify-between p-6 sm:p-10">
            {/* Top Game HUD Strip */}
            <div className="relative z-10 flex items-center justify-between text-xs font-black text-slate-900 flex-wrap gap-2">
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                <Bot className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Level 1 · Sahabat Bumi</span>
                <span className="text-emerald-700 font-extrabold">| 150 Poin</span>
              </div>

              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm flex items-center gap-2 text-emerald-900">
                <span>Kebersihan Kota:</span>
                <span className="font-extrabold text-emerald-600">85% Asri</span>
              </div>
            </div>

            {/* Center Callout: World Stage */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
              <Link
                to="/main-game"
                className="group w-24 h-24 rounded-full bg-white/95 backdrop-blur-md shadow-2xl flex items-center justify-center text-emerald-600 mb-4 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
                title="Mulai mainkan game 3D"
              >
                <Play className="w-10 h-10 ml-1.5 fill-emerald-500 text-emerald-600 group-hover:fill-emerald-600" />
              </Link>
              <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs sm:text-sm font-extrabold px-5 py-2 rounded-full mb-1">
                Simulasi 3D Kota Bersih Interaktif
              </span>
              <p className="text-xs sm:text-sm text-slate-900 font-bold mt-1 max-w-md">
                Jelajahi taman kota, pilah sampah ke 3 tong, dan kumpulkan poin daur ulang!
              </p>
            </div>

            {/* Bottom Strip: 3 Bins Legend & Direct Button */}
            <div className="relative z-10 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-sm">
                  Hijau: Organik
                </span>
                <span className="px-3 py-1 rounded-xl bg-amber-500 text-white font-extrabold text-xs shadow-sm">
                  Kuning: Anorganik
                </span>
                <span className="px-3 py-1 rounded-xl bg-rose-600 text-white font-extrabold text-xs shadow-sm">
                  Merah: B3
                </span>
              </div>

              <Link
                to="/main-game"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <span>Masuk ke Game 3D</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ==================== 2. EDITORIAL FEATURE CHAPTERS (ZERO CARDS) ==================== */}
        <div>
          <div className="mb-10 text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Jelajahi Setiap Babak Edukasi
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Setiap sudut aplikasi dirancang saling melengkapi untuk pengalaman belajar yang utuh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {CHAPTERS.map((ch) => (
              <div
                key={ch.number}
                className="flex items-start gap-6 pt-6 border-t-2 border-slate-100 group"
              >
                {/* Big Editorial Number */}
                <span className="font-mono text-3xl sm:text-4xl font-black text-slate-300 group-hover:text-emerald-500 transition-colors shrink-0">
                  {ch.number}
                </span>

                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-700">
                      {ch.tag}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-emerald-50 transition-colors">
                      {ch.icon}
                    </div>
                  </div>

                  <h4 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {ch.title}
                  </h4>

                  <p className="text-xs font-bold text-slate-500">
                    {ch.subtitle}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed pt-1">
                    {ch.description}
                  </p>

                  <div className="pt-3">
                    <Link
                      to={ch.link}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 hover:text-emerald-800 transition-colors group-hover:translate-x-1 duration-200"
                    >
                      <span>{ch.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
