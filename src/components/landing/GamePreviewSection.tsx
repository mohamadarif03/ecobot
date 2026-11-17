import React from "react";
import { Link } from "react-router-dom";
import { Gamepad2, BookOpen, HelpCircle, Leaf, Sparkles, ArrowRight, Play, Bot } from "lucide-react";

export const GamePreviewSection: React.FC = () => {
  return (
    <section
      id="fitur"
      aria-label="Preview Game dan Fitur Unggulan"
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F0F9FF] via-white to-white border-t border-black/5"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#0284C7] bg-white border border-sky-200 px-4 py-1.5 rounded-full shadow-2xs mb-4">
          <Sparkles className="w-3.5 h-3.5 text-sky-500" />
          <span>DUNIA 3D BLOCKY</span>
        </span>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal font-serif text-[#000000] tracking-tight max-w-3xl">
          Preview Game & Fitur Belajar
        </h2>

        {/* Caption */}
        <p className="text-base sm:text-lg text-[#6F6F6F] max-w-xl mt-3 leading-relaxed">
          Semua fitur dirancang agar anak belajar mengelola sampah tanpa terasa bosan.
        </p>

        {/* ==================== 3D GAME SCREEN MOCKUP ==================== */}
        <div className="mt-12 w-full max-w-4xl bg-slate-950 rounded-[36px] p-3 sm:p-5 shadow-2xl border-4 border-slate-900 overflow-hidden relative group">
          {/* Simulated 3D Low-Poly World Canvas Area */}
          <div className="relative w-full h-[280px] sm:h-[400px] rounded-[28px] overflow-hidden bg-gradient-to-b from-sky-400 via-sky-200 to-emerald-400 flex flex-col justify-between p-6">
            {/* Top Game HUD Simulation */}
            <div className="relative z-10 flex items-center justify-between text-xs font-black text-slate-900">
              <div className="bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Level 1 · Relawan Baru</span>
                <span className="text-sky-700 font-bold">| 100 Poin</span>
              </div>

              <div className="bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 text-emerald-800">
                <span>Kebersihan Kota:</span>
                <span className="font-extrabold">45%</span>
              </div>
            </div>

            {/* Center Scene: Blocky 3D World Concept art */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-xs shadow-xl flex items-center justify-center text-sky-600 mb-3 group-hover:scale-110 transition duration-300">
                <Play className="w-8 h-8 ml-1 fill-sky-500 text-sky-500" />
              </div>
              <span className="bg-slate-900/80 backdrop-blur-xs text-white text-xs font-bold px-4 py-1.5 rounded-full mb-1">
                Zona 1: Taman Kota Hijau (3D Blocky)
              </span>
              <p className="text-xs text-slate-800/80 font-bold">
                Babylon.js 3D Physics Engine · Low-Poly Roblox Style
              </p>
            </div>

            {/* Bottom HUD: Mini Tong Sampah and Joypad hints */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white font-bold text-[11px] shadow-sm">
                  Hijau: Organik
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-white font-bold text-[11px] shadow-sm">
                  Kuning: Anorganik
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-rose-500 text-white font-bold text-[11px] shadow-sm">
                  Merah: B3
                </span>
              </div>

              <Link
                to="/main-game"
                className="bg-slate-950 hover:bg-slate-900 text-white font-black text-xs px-4 py-2 rounded-full shadow-md transition hover:scale-105"
              >
                Buka Game (Segera)
              </Link>
            </div>
          </div>
        </div>

        {/* ==================== 4 FITUR CARDS ==================== */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-5xl">
          {/* Feature 1 */}
          <Link
            to="/main-game"
            className="p-6 rounded-[28px] bg-white border border-sky-100 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between group hover:-translate-y-1"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4 group-hover:bg-sky-500 group-hover:text-white transition">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-black text-slate-900 group-hover:text-sky-600 transition">
                Main Game 3D
              </h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Jelajahi 6 misi seru mulai dari taman kota hingga ban berjalan cepat daur ulang.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-sky-600 gap-1">
              <span>Masuk ke Game</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Feature 2 */}
          <Link
            to="/pustaka"
            className="p-6 rounded-[28px] bg-white border border-sky-100 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between group hover:-translate-y-1"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-white transition">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition">
                Pustaka Edukasi
              </h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Kartu slide bergambar singkat dan glosarium istilah ramah anak tanpa teks membosankan.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-600 gap-1">
              <span>Baca Materi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Feature 3 */}
          <Link
            to="/kuis"
            className="p-6 rounded-[28px] bg-white border border-sky-100 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between group hover:-translate-y-1"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition">
                Kuis & Tantangan
              </h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Kuis harian 5 soal dengan penjelasan ramah dari Ecobot untuk setiap jawabanmu.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-amber-600 gap-1">
              <span>Uji Pengetahuan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Feature 4 */}
          <Link
            to="/aksi-nyata"
            className="p-6 rounded-[28px] bg-white border border-sky-100 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between group hover:-translate-y-1"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-teal-500 group-hover:text-white transition">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-black text-slate-900 group-hover:text-teal-600 transition">
                Aksi Nyata 7 Hari
              </h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Membentuk kebiasaan membawa tumbler, menolak kantong plastik, dan mematikan lampu.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-teal-600 gap-1">
              <span>Mulai Tantangan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
