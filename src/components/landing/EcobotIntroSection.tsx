import React from "react";
import { Sparkles, Bot, Leaf, Sun, HeartHandshake, ShieldCheck } from "lucide-react";
import { EcobotMascot } from "../ecobot/EcobotMascot";

export const EcobotIntroSection: React.FC = () => {
  return (
    <section
      id="kenalan-ecobot"
      aria-label="Kenalan dengan Ecobot"
      className="relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-white via-[#F4FBF6] to-white overflow-hidden border-t border-emerald-950/5"
    >
      {/* Decorative ambient glowing circles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-teal-200/25 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Top Header Badge & Title */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-emerald-800 bg-emerald-100/80 px-4 py-1.5 rounded-full mb-4">
            <Bot className="w-4 h-4 text-emerald-600" />
            <span>Karakter & Sahabat Belajar</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal font-serif text-slate-900 tracking-tight leading-[1.15]">
            Kenalan dengan <span className="text-emerald-600 font-semibold italic">Ecobot</span>, Robot Cilik Penjaga Bumi
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Diciptakan dari material daur ulang dan ditenagai sinar matahari, Ecobot hadir untuk
            menemani setiap langkah petualangan anak-anak belajar mencintai lingkungan.
          </p>
        </div>

        {/* Character Showcase: Flowing Split Layout (Tanpa Card / Kotak Berbingkai) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Mascot Living Spotlight & Speech Bubble */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Ambient soft ground shadow */}
            <div className="w-56 h-12 bg-emerald-950/10 rounded-full blur-xl absolute bottom-4 pointer-events-none" />

            {/* Ecobot Mascot Floating */}
            <div className="relative z-10 transition-transform hover:scale-105 duration-300">
              <EcobotMascot size="hero" className="w-64 h-64 sm:w-80 sm:h-80 drop-shadow-2xl" />
            </div>

            {/* Kawaii Speech Bubble */}
            <div className="relative z-20 -mt-4 bg-emerald-600 text-white px-6 py-3.5 rounded-3xl shadow-lg shadow-emerald-600/25 max-w-xs text-center transform -rotate-1">
              <p className="text-sm sm:text-base font-extrabold leading-tight">
                &ldquo;Halo kawan! Ayo kita buat kota jadi bersih dan hijau lagi!&rdquo;
              </p>
              {/* Little speech tail pointer */}
              <div className="w-3 h-3 bg-emerald-600 rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2" />
            </div>

            {/* Trait Tags Stream */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1 rounded-full bg-emerald-100/90 text-emerald-900">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>Selalu Ceria</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1 rounded-full bg-emerald-100/90 text-emerald-900">
                <Leaf className="w-3 h-3 text-emerald-600" />
                <span>Pakar 3R</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1 rounded-full bg-amber-100/90 text-amber-900">
                <ShieldCheck className="w-3 h-3 text-amber-600" />
                <span>100% Ramah Anak</span>
              </span>
            </div>
          </div>

          {/* Right Column: Narrative Story & Key Traits (Border-free clean stream) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Bukan Sekadar Maskot, Tapi Guru yang Menyenangkan
              </h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Ecobot bukan robot biasa. Di kepalanya tumbuh tunas daun hijau ajaib yang akan bersinar
                terang setiap kali kamu berhasil memilah sampah ke tong yang tepat. Ecobot tidak pernah
                menghukum ketika kamu salah, melainkan memberi petunjuk ramah agar kamu paham solusinya.
              </p>
            </div>

            {/* Flowing Feature Points with Clean Minimal Dividers (No boxed cards) */}
            <div className="space-y-6 pt-4 border-t border-emerald-900/10">
              {/* Point 1 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Leaf className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    Tunas Daun Pengingat Kebaikan
                  </h4>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Setiap aksi pedulimu di game maupun di rumah memberi energi pada tunas daun Ecobot
                    untuk terus tumbuh mekar dan menyebarkan bibit kebaikan.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Sun className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    Bertenaga Cahaya Matahari Bersih
                  </h4>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Mengajarkan anak tentang energi terbarukan sejak dini—Ecobot bebas dari bahan bakar fosil
                    dan memanfaatkan energi surya alami tanpa emisi kotor.
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    Menghargai Proses, Tanpa Menghakimi
                  </h4>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Salah membuang sampah? Tidak masalah! Ecobot akan tersenyum dan menjelaskan sifat bahan
                    tersebut sehingga rasa ingin tahu anak tetap menyala dengan gembira.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
