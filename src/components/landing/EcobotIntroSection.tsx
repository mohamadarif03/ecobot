import React from "react";
import { Sparkles, Heart, Bot, Zap, Leaf, Sprout, Star } from "lucide-react";
import { EcobotMascot } from "../ecobot/EcobotMascot";

export const EcobotIntroSection: React.FC = () => {
  return (
    <section
      id="kenalan-ecobot"
      aria-label="Kenalan dengan Ecobot"
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-[#F0F9FF] to-white overflow-hidden border-t border-black/5"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#0284C7] bg-white border border-sky-200 px-4 py-1.5 rounded-full shadow-2xs mb-4">
          <Bot className="w-3.5 h-3.5 text-sky-500" />
          <span>SAHABAT LINGKUNGAN CILIK</span>
        </span>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal font-serif text-[#000000] tracking-tight max-w-3xl">
          Kenalan dengan <span className="text-[#0284C7] font-semibold">Ecobot</span>
        </h2>

        {/* Mascot & Profile Hero Container */}
        <div className="mt-12 w-full max-w-4xl bg-white rounded-[36px] p-8 sm:p-12 shadow-[0_8px_32px_rgba(14,165,233,0.1)] border border-sky-100 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
          {/* Decorative Background Blob */}
          <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-sky-200/50 to-emerald-200/40 absolute -top-16 -left-16 pointer-events-none filter blur-2xl"></div>

          {/* Left: Big Ecobot Illustration */}
          <div className="relative shrink-0 w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center bg-gradient-to-b from-sky-50 to-[#E0F2FE] rounded-[32px] p-6 border border-sky-100/90 shadow-inner">
            <EcobotMascot size="hero" className="w-full h-full" />
            <span className="absolute -bottom-2.5 bg-emerald-500 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              <Leaf className="w-3 h-3" />
              <span>Maskot Resmi</span>
            </span>
          </div>

          {/* Right: Bio & Traits */}
          <div className="flex-1 text-center md:text-left space-y-4">
            {/* Traits Chips */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-black bg-sky-100 text-sky-900 px-3.5 py-1 rounded-full border border-sky-200">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Penasaran</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-black bg-emerald-100 text-emerald-900 px-3.5 py-1 rounded-full border border-emerald-200">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Rajin</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-black bg-amber-100 text-amber-900 px-3.5 py-1 rounded-full border border-amber-200">
                <Heart className="w-3.5 h-3.5 text-amber-600" />
                <span>Suka Memilah</span>
              </span>
            </div>

            {/* Speech Greeting */}
            <div className="p-4 rounded-2xl bg-[#E0F2FE]/70 border border-sky-200/80">
              <p className="text-lg sm:text-xl font-black text-sky-950 leading-snug">
                "Hai! Aku Ecobot. Ayo bantu aku bersihkan kota!"
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Ecobot adalah robot daur ulang ramah berwarna biru langit yang suka berpetualang. Dengan tunas daun ajaib di kepalanya, Ecobot tahu jenis dan sifat semua sampah yang ada di bumi. Dia akan selalu menemanimu di setiap misi, memberi semangat, dan membagikan tips seru!
            </p>
          </div>
        </div>

        {/* 3 Small Feature Cards Below */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
          <div className="p-5 rounded-2xl bg-white border border-sky-100 text-left shadow-2xs hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-3 shadow-2xs">
              <Bot className="w-5 h-5" />
            </div>
            <h4 className="text-[15px] font-black text-slate-900">Teknologi Ramah Bumi</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Dibuat dari bahan daur ulang yang kuat dan digerakkan oleh energi surya bersih.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-sky-100 text-left shadow-2xs hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 shadow-2xs">
              <Sprout className="w-5 h-5" />
            </div>
            <h4 className="text-[15px] font-black text-slate-900">Tunas Daun Pengingat</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Tunas di kepalanya mekar berseri setiap kali kamu membuang sampah ke tong yang benar.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-sky-100 text-left shadow-2xs hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3 shadow-2xs">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <h4 className="text-[15px] font-black text-slate-900">Teman Setia Bermain</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Tidak pernah menghukum ketika salah, tapi selalu membantumu belajar dengan ceria.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
