import React from "react";
import {
  Compass,
  Hand,
  Trash2,
  Laptop,
  Smartphone,
  HelpCircle,
  Gamepad2,
  Sparkles,
  CircleDot,
  RotateCw,
} from "lucide-react";

export const HowToPlaySection: React.FC = () => {
  return (
    <section
      id="cara-bermain"
      aria-label="Cara Bermain Game ECOBOT"
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-black/5"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#0284C7] bg-sky-50 border border-sky-200 px-4 py-1.5 rounded-full shadow-2xs mb-4">
          <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
          <span>MUDAH & SERU</span>
        </span>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal font-serif text-[#000000] tracking-tight max-w-3xl">
          Cara Bermain di Game 3D
        </h2>

        {/* Caption */}
        <p className="text-base sm:text-lg text-[#6F6F6F] max-w-xl mt-3 leading-relaxed">
          Tiga langkah mudah untuk mengembalikan senyum dan kebersihan kota!
        </p>

        {/* 3 Steps Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {/* Step 1 */}
          <div className="relative bg-[#F8FAFC] rounded-[30px] p-8 border border-slate-100 shadow-sm hover:shadow-md transition text-center flex flex-col items-center group">
            <span className="w-12 h-12 rounded-2xl bg-sky-500 text-white font-black text-xl flex items-center justify-center shadow-md -mt-12 mb-4 group-hover:scale-110 transition">
              1
            </span>
            <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4">
              <Compass className="w-8 h-8 text-sky-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Jalan Menjelajah Kota
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Kendalikan karaktermu berjalan menyusuri taman, pasar tradisional, dan tepi sungai yang kotor.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative bg-[#F8FAFC] rounded-[30px] p-8 border border-slate-100 shadow-sm hover:shadow-md transition text-center flex flex-col items-center group">
            <span className="w-12 h-12 rounded-2xl bg-amber-500 text-white font-black text-xl flex items-center justify-center shadow-md -mt-12 mb-4 group-hover:scale-110 transition">
              2
            </span>
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <Hand className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Ambil Sampah Berserakan
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Dekati sampah di tanah, tekan tombol aksi untuk mengambil dan memasukkannya ke dalam tas daur ulangmu.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative bg-[#F8FAFC] rounded-[30px] p-8 border border-slate-100 shadow-sm hover:shadow-md transition text-center flex flex-col items-center group">
            <span className="w-12 h-12 rounded-2xl bg-emerald-500 text-white font-black text-xl flex items-center justify-center shadow-md -mt-12 mb-4 group-hover:scale-110 transition">
              3
            </span>
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Trash2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Buang ke Tong yang Benar
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Pilih tong yang tepat: Hijau (Organik), Kuning (Anorganik), atau Merah (B3) untuk mendapatkan XP dan Poin!
            </p>
          </div>
        </div>

        {/* ==================== CONTROL GUIDELINES PANEL (LIGHT THEME) ==================== */}
        <div className="mt-16 w-full max-w-4xl bg-gradient-to-br from-sky-50/70 via-white to-emerald-50/40 rounded-[36px] p-7 sm:p-10 border-2 border-sky-100 shadow-[0_16px_40px_-15px_rgba(2,132,199,0.1)] text-left relative overflow-hidden">
          {/* Subtle decorative background circles */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 rounded-full bg-sky-200/30 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 rounded-full bg-emerald-200/30 blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 pb-6 border-b border-sky-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-1 rounded-full border border-sky-200">
                  <Gamepad2 className="w-3.5 h-3.5 text-sky-600" />
                  <span>Panduan Kontrol</span>
                </span>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                  Responsif & Mudah
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Bermain Nyaman di Semua Perangkat
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Pilih caramu bermain! ECOBOT otomatis mendeteksi kontrol terbaik untuk perangkatmu.
              </p>
            </div>
          </div>

          {/* 2 Responsive Cards */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Laptop & PC */}
            <div className="bg-white rounded-3xl p-6 border-2 border-sky-100 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shadow-xs">
                      <Laptop className="w-6 h-6 text-sky-600" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-slate-900">Laptop & Komputer</h4>
                      <p className="text-xs text-slate-500 font-medium">Navigasi Keyboard & Mouse</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                    PC Mode
                  </span>
                </div>

                <div className="space-y-3">
                  {/* WASD Row */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-800">Bergerak Menjelajah</span>
                      <span className="text-[11px] text-slate-500">Maju, mundur, belok kiri & kanan</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <kbd className="inline-flex items-center justify-center min-w-[26px] h-7 px-1.5 text-xs font-mono font-black text-slate-800 bg-white border border-slate-300 rounded-md shadow-[0_2px_0_#cbd5e1]">
                        W
                      </kbd>
                      <kbd className="inline-flex items-center justify-center min-w-[26px] h-7 px-1.5 text-xs font-mono font-black text-slate-800 bg-white border border-slate-300 rounded-md shadow-[0_2px_0_#cbd5e1]">
                        A
                      </kbd>
                      <kbd className="inline-flex items-center justify-center min-w-[26px] h-7 px-1.5 text-xs font-mono font-black text-slate-800 bg-white border border-slate-300 rounded-md shadow-[0_2px_0_#cbd5e1]">
                        S
                      </kbd>
                      <kbd className="inline-flex items-center justify-center min-w-[26px] h-7 px-1.5 text-xs font-mono font-black text-slate-800 bg-white border border-slate-300 rounded-md shadow-[0_2px_0_#cbd5e1]">
                        D
                      </kbd>
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-800">Ambil & Buang Sampah</span>
                      <span className="text-[11px] text-slate-500">Pungut sampah atau masukkan ke tong</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <kbd className="inline-flex items-center justify-center min-w-[26px] h-7 px-2 text-xs font-mono font-black text-slate-800 bg-white border border-slate-300 rounded-md shadow-[0_2px_0_#cbd5e1]">
                        E
                      </kbd>
                      <span className="text-[10px] text-slate-400 font-bold">atau</span>
                      <kbd className="inline-flex items-center justify-center h-7 px-2.5 text-xs font-mono font-black text-slate-800 bg-white border border-slate-300 rounded-md shadow-[0_2px_0_#cbd5e1]">
                        Spasi
                      </kbd>
                    </div>
                  </div>

                  {/* Pause Row */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-800">Jeda Permainan</span>
                      <span className="text-[11px] text-slate-500">Buka menu pause atau pengaturan</span>
                    </div>
                    <kbd className="inline-flex items-center justify-center h-7 px-2.5 text-xs font-mono font-black text-slate-800 bg-white border border-slate-300 rounded-md shadow-[0_2px_0_#cbd5e1] shrink-0">
                      ESC
                    </kbd>
                  </div>
                </div>
              </div>
            </div>

            {/* HP & Tablet */}
            <div className="bg-white rounded-3xl p-6 border-2 border-emerald-100 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
                      <Smartphone className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-slate-900">HP & Tablet</h4>
                      <p className="text-xs text-slate-500 font-medium">Layar Sentuh (Touchscreen Friendly)</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Touch Mode
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Joystick */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
                      <Gamepad2 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-800">Analog Virtual di Kiri Bawah</span>
                      <span className="text-[11px] text-slate-500">Sentuh dan geser jempol untuk berjalan bebas</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 shadow-2xs">
                      <CircleDot className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-800">Tombol Aksi di Kanan Bawah</span>
                      <span className="text-[11px] text-slate-500">Tombol bulat besar untuk memungut & membuang</span>
                    </div>
                  </div>

                  {/* Landscape */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 shadow-2xs">
                      <RotateCw className="w-5 h-5 text-sky-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-800">Posisi Layar Mendatar (Landscape)</span>
                      <span className="text-[11px] text-slate-500">Putar HP horizontal agar pandangan kota lebih luas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Friendly Bottom Note */}
          <div className="relative z-10 mt-6 p-4 rounded-2xl bg-white/90 border border-sky-100 flex items-center gap-3 shadow-2xs text-xs text-slate-600">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <p className="leading-relaxed">
              <strong className="text-slate-800 font-bold">Langsung Main di Browser:</strong> Tidak perlu mengunduh aplikasi tambahan di laptop maupun HP. Cukup buka situs dan mulai petualanganmu!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
