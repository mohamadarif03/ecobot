import React from "react";
import { Link } from "react-router-dom";
import {
  PC_KEYBOARD_CONTROLS,
  MOBILE_TOUCH_CONTROLS,
  HUD_ELEMENTS,
} from "../../data/bantuan/controls";

export const TabKontrol: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* 1. PC & Laptop Controls */}
      <section id="section-kontrol-pc" className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span>💻</span> Komputer & Laptop
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
            Panduan Kontrol Keyboard & Mouse
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Bermain di laptop atau komputer lebih leluasa menggunakan tombol keyboard WASD atau
            tombol Panah arah.
          </p>
        </div>

        {/* Visual Keyboard SVG Diagram */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* SVG Visual Keys */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4">
                Tampilan Tombol Utama
              </span>

              {/* WASD Layout */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-xl bg-slate-700 border-b-4 border-slate-950 flex flex-col items-center justify-center shadow-lg text-amber-400 font-black text-xl">
                  W
                  <span className="text-[9px] text-slate-300 font-normal">Maju</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-14 h-14 rounded-xl bg-slate-700 border-b-4 border-slate-950 flex flex-col items-center justify-center shadow-lg text-amber-400 font-black text-xl">
                    A
                    <span className="text-[9px] text-slate-300 font-normal">Kiri</span>
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-slate-700 border-b-4 border-slate-950 flex flex-col items-center justify-center shadow-lg text-amber-400 font-black text-xl">
                    S
                    <span className="text-[9px] text-slate-300 font-normal">Mundur</span>
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-slate-700 border-b-4 border-slate-950 flex flex-col items-center justify-center shadow-lg text-amber-400 font-black text-xl">
                    D
                    <span className="text-[9px] text-slate-300 font-normal">Kanan</span>
                  </div>
                </div>
              </div>

              {/* Action and Space Keys */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <div className="px-5 py-3 rounded-xl bg-emerald-600 border-b-4 border-emerald-950 flex flex-col items-center justify-center shadow-lg text-white font-black text-sm">
                  <span>E</span>
                  <span className="text-[10px] text-emerald-100 font-normal">Ambil / Buang</span>
                </div>

                <div className="px-8 py-3 rounded-xl bg-emerald-600 border-b-4 border-sky-950 flex flex-col items-center justify-center shadow-lg text-white font-black text-sm">
                  <span>SPASI</span>
                  <span className="text-[10px] text-emerald-100 font-normal">Aksi Interaksi</span>
                </div>

                <div className="px-4 py-3 rounded-xl bg-slate-700 border-b-4 border-slate-950 flex flex-col items-center justify-center shadow-lg text-slate-300 font-bold text-xs">
                  <span>ESC</span>
                  <span className="text-[10px] text-slate-400 font-normal">Menu Jeda</span>
                </div>
              </div>
            </div>

            {/* Explanations List */}
            <div className="w-full lg:w-1/2 space-y-3">
              {PC_KEYBOARD_CONTROLS.map((ctrl) => (
                <div
                  key={ctrl.key}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60"
                >
                  <span className="px-2.5 py-1 rounded-lg bg-slate-700 text-amber-300 text-xs font-mono font-bold flex-shrink-0">
                    {ctrl.key}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-white">{ctrl.action}</div>
                    <div className="text-xs text-slate-300 mt-0.5">{ctrl.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mobile & Tablet Touch Controls */}
      <section id="section-kontrol-mobile" className="space-y-6 pt-6 border-t border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span>📱</span> Ponsel & Tablet
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
            Panduan Layar Sentuh (Touchscreen)
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Bermain di smartphone atau tablet sangat mudah dengan Virtual Joystick fleksibel dan tombol aksi pintar yang otomatis berubah fungsi.
          </p>
        </div>

        {/* Visual Mobile Screen Mockup */}
        <div className="bg-gradient-to-br from-emerald-600 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* SVG Touchscreen Simulator */}
            <div className="w-full md:w-1/2 bg-slate-900/90 rounded-2xl p-6 border-4 border-slate-700 aspect-[16/9] flex flex-col justify-between relative shadow-inner">
              {/* Top HUD simulated */}
              <div className="flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-lg">
                  <span>⚡ Lv. 5</span>
                  <span className="text-amber-300 font-bold">🪙 450</span>
                </div>
                <div className="bg-emerald-600/80 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                  Kebersihan 82%
                </div>
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center font-bold">
                  ⏸
                </div>
              </div>

              {/* Game viewport hint */}
              <div className="text-center text-xs text-slate-400 font-mono">
                [ Area 3D Kota Bersih ]
                <div className="text-[10px] text-slate-500 mt-1">Usap layar untuk putar kamera</div>
              </div>

              {/* Bottom Touch Controls */}
              <div className="flex items-end justify-between">
                {/* Left Joystick */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/40 bg-white/10 flex items-center justify-center relative">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/70 shadow-lg flex items-center justify-center text-xs font-bold text-slate-800">
                    🕹️
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500 border-2 border-white/60 flex flex-col items-center justify-center shadow-lg active:scale-95 transition-all">
                  <span className="text-sm font-black">AMBIL</span>
                  <span className="text-[9px] text-emerald-100 font-medium">/ BUANG</span>
                </div>
              </div>
            </div>

            {/* Mobile Controls Detail */}
            <div className="w-full md:w-1/2 space-y-4">
              {MOBILE_TOUCH_CONTROLS.map((ctrl) => (
                <div
                  key={ctrl.element}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15"
                >
                  <div className="flex items-center justify-between text-amber-300 text-xs font-bold">
                    <span>{ctrl.element}</span>
                    <span className="text-emerald-200 text-[11px] font-normal">{ctrl.position}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white mt-1 leading-relaxed">
                    {ctrl.description}
                  </p>
                  <div className="mt-2 text-[11px] text-emerald-200 flex items-center gap-1.5">
                    <span>💡</span>
                    <span>{ctrl.tips}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Helpful Tips: Landscape & Left-Handed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tip 1: Landscape Rotation */}
          <div className="bg-amber-50 rounded-3xl p-6 border-2 border-amber-200/80 flex items-start gap-4">
            <span className="text-4xl p-2.5 rounded-2xl bg-white shadow-sm border border-amber-100 flex-shrink-0">
              🔄
            </span>
            <div>
              <h3 className="text-base font-bold text-amber-950">
                Tips: Putar Perangkat ke Posisi Mendatar (Landscape)
              </h3>
              <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed">
                Pengalaman bermain game 3D paling asyik dirasakan pada layar mendatar! Sudut pandang
                kamera lebih luas, dan kedua jemarimu tidak saling bertabrakan saat menggerakkan
                karakter.
              </p>
            </div>
          </div>

          {/* Tip 2: Left-Handed Mode */}
          <div className="bg-purple-50 rounded-3xl p-6 border-2 border-purple-200/80 flex items-start gap-4">
            <span className="text-4xl p-2.5 rounded-2xl bg-white shadow-sm border border-purple-100 flex-shrink-0">
              ✋
            </span>
            <div>
              <h3 className="text-base font-bold text-purple-950">
                Apakah Kamu Kidal? Aktifkan Mode Tangan Kiri
              </h3>
              <p className="text-xs sm:text-sm text-purple-900 mt-1 leading-relaxed">
                Kamu bisa menukar posisi joystick analog ke kanan dan tombol aksi ke kiri agar sesuai
                dengan kebiasaan tanganmu.
              </p>
              <div className="mt-3">
                <Link
                  to="/pengaturan?tab=kontrol"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <span>Atur Mode Kidal di Pengaturan</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Numbered HUD Layout Diagram */}
      <section id="section-hud-layout" className="space-y-6 pt-6 border-t border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span>🗺️</span> Antarmuka Layar (HUD)
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
            Tata Letak Layar Permainan (Heads-Up Display)
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Kenali setiap angka dan ikon pada layar agar kamu selalu tahu status misi, sisa sampah,
            dan perolehan poinmu.
          </p>
        </div>

        {/* Visual HUD Map */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border-4 border-slate-700 shadow-xl relative">
          <div className="aspect-[16/9] w-full bg-slate-800/90 rounded-2xl p-4 sm:p-6 border border-slate-700 relative flex flex-col justify-between">
            {/* Top row */}
            <div className="flex items-start justify-between">
              {/* HUD 1 & 2 */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border-2 border-emerald-400">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center">
                    1
                  </span>
                  <span className="text-xs font-bold text-emerald-200">Level & XP</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border-2 border-amber-400">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs font-black flex items-center justify-center">
                    2
                  </span>
                  <span className="text-xs font-bold text-amber-200">Koin</span>
                </div>
              </div>

              {/* HUD 4 (Mission) */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border-2 border-yellow-400">
                <span className="w-5 h-5 rounded-full bg-yellow-500 text-white text-xs font-black flex items-center justify-center">
                  4
                </span>
                <span className="text-xs font-bold text-yellow-200">Panel Target Misi</span>
              </div>

              {/* HUD 3 & 5 */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border-2 border-emerald-400">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center">
                    3
                  </span>
                  <span className="text-xs font-bold text-emerald-200">Kebersihan</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-slate-900/90 border-2 border-rose-400">
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-xs font-black flex items-center justify-center">
                    5
                  </span>
                  <span className="text-xs font-bold text-rose-200">Jeda</span>
                </div>
              </div>
            </div>

            {/* Center Area */}
            <div className="text-center py-4">
              <span className="px-4 py-1.5 rounded-full bg-white/10 text-xs font-mono text-slate-300">
                Ruang 3D Kota Bersih Interaktif
              </span>
            </div>

            {/* Bottom row */}
            <div className="flex items-end justify-between">
              {/* HUD 6: Joystick */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border-2 border-indigo-400">
                <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-xs font-black flex items-center justify-center">
                  6
                </span>
                <span className="text-xs font-bold text-indigo-200">Joystick Gerak</span>
              </div>

              {/* HUD 7: Action */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border-2 border-emerald-400">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center">
                  7
                </span>
                <span className="text-xs font-bold text-emerald-200">Tombol Aksi</span>
              </div>
            </div>
          </div>
        </div>

        {/* HUD Elements Breakdown Table/Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HUD_ELEMENTS.map((item) => (
            <div
              key={item.number}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-500/20">
                {item.number}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base">{item.icon}</span>
                  <h3 className="text-sm font-bold text-slate-800">{item.name}</h3>
                </div>
                <div className="text-[11px] font-semibold text-emerald-600 mt-0.5">
                  Posisi: {item.position}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
