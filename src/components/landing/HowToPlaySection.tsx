import React, { useState } from "react";
import {
  Compass,
  Hand,
  Trash2,
  Laptop,
  Smartphone,
  HelpCircle,
  Gamepad2,
  RotateCw,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export const HowToPlaySection: React.FC = () => {
  const [deviceTab, setDeviceTab] = useState<"pc" | "touch">("pc");

  return (
    <section
      id="cara-bermain"
      aria-label="Cara Bermain Game ECOBOT"
      className="relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-white border-t border-emerald-950/5 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow & Main Title */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-emerald-800 bg-emerald-100/80 px-4 py-1.5 rounded-full mb-4">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>Alur Bermain Cepat</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal font-serif text-slate-900 tracking-tight leading-[1.15]">
            Tiga Langkah Mudah Mengembalikan Senyum Kota
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Tidak ada aturan rumit. Ikuti ritme sederhana ini dan saksikan kota 3D menjadi asri kembali!
          </p>
        </div>

        {/* ==================== 1. CONTINUOUS ADVENTURE STREAM (ZERO CARDS) ==================== */}
        <div className="relative mb-24">
          {/* Connecting line behind steps on desktop */}
          <div className="hidden md:block absolute top-16 left-16 right-16 h-1 bg-gradient-to-r from-emerald-200 via-amber-200 to-emerald-400 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              {/* Big Floating Icon & Number Badge */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                  <Compass className="w-10 h-10 text-emerald-600" />
                </div>
                <span className="absolute -top-1 -right-1 w-9 h-9 rounded-full bg-emerald-600 text-white font-mono font-black text-sm flex items-center justify-center shadow-md">
                  01
                </span>
              </div>

              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 mb-1">
                Langkah Pertama
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Jelajahi Sudut Kota
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-xs">
                Gerakkan karaktermu menyusuri taman bermain, trotoar, dan tepi sungai untuk menemukan
                sampah yang berserakan.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                  <Hand className="w-10 h-10 text-amber-600" />
                </div>
                <span className="absolute -top-1 -right-1 w-9 h-9 rounded-full bg-amber-500 text-white font-mono font-black text-sm flex items-center justify-center shadow-md">
                  02
                </span>
              </div>

              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 mb-1">
                Langkah Kedua
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Ambil Sampah Tercecer
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-xs">
                Dekati botol, daun gugur, atau baterai bekas, lalu tekan tombol aksi untuk memungutnya
                ke dalam kantong daur ulangmu.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                  <Trash2 className="w-10 h-10 text-emerald-600" />
                </div>
                <span className="absolute -top-1 -right-1 w-9 h-9 rounded-full bg-emerald-600 text-white font-mono font-black text-sm flex items-center justify-center shadow-md">
                  03
                </span>
              </div>

              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 mb-1">
                Langkah Ketiga
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Pilah ke Tiga Tong
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-xs">
                Masukkan ke tong yang benar: <strong>Hijau</strong> (Organik), <strong>Kuning</strong> (Anorganik),
                atau <strong>Merah</strong> (B3) untuk kombo dan bonus XP!
              </p>
            </div>
          </div>
        </div>

        {/* ==================== 2. FLOWING CONTROLS SHOWCASE (ZERO CARDS) ==================== */}
        <div className="pt-16 border-t border-emerald-950/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full mb-3">
                <Gamepad2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Kendali Responsif</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Bermain Nyaman di Semua Perangkat
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-lg">
                Tidak perlu install aplikasi. Game berjalan otomatis langsung di peramban komputermu
                maupun ponsel sentuh.
              </p>
            </div>

            {/* Minimalist Switcher Pills */}
            <div className="inline-flex p-1 bg-slate-100 rounded-2xl shrink-0 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setDeviceTab("pc")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                  deviceTab === "pc"
                    ? "bg-white text-emerald-800 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Laptop className="w-4 h-4" />
                <span>Laptop / Komputer</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceTab("touch")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                  deviceTab === "touch"
                    ? "bg-white text-emerald-800 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>HP / Tablet (Layar Sentuh)</span>
              </button>
            </div>
          </div>

          {/* Interactive Control Display Stream (Seamless & Flat) */}
          {deviceTab === "pc" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6">
              {/* PC Key 1 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <kbd className="w-10 h-10 rounded-xl bg-slate-900 text-white font-mono font-black text-sm flex items-center justify-center shadow-md">
                    W
                  </kbd>
                  <kbd className="w-10 h-10 rounded-xl bg-slate-900 text-white font-mono font-black text-sm flex items-center justify-center shadow-md">
                    A
                  </kbd>
                  <kbd className="w-10 h-10 rounded-xl bg-slate-900 text-white font-mono font-black text-sm flex items-center justify-center shadow-md">
                    S
                  </kbd>
                  <kbd className="w-10 h-10 rounded-xl bg-slate-900 text-white font-mono font-black text-sm flex items-center justify-center shadow-md">
                    D
                  </kbd>
                </div>
                <h4 className="text-base font-extrabold text-slate-900">Bergerak Menjelajah</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Gunakan tombol W A S D atau tombol Panah Arah untuk berjalan maju, mundur, dan
                  berkeliling kota secara luwes.
                </p>
              </div>

              {/* PC Key 2 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <kbd className="px-3.5 h-10 rounded-xl bg-emerald-600 text-white font-mono font-black text-sm flex items-center justify-center shadow-md">
                    Spasi
                  </kbd>
                  <span className="text-xs text-slate-400 font-bold">atau</span>
                  <kbd className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-mono font-black text-sm flex items-center justify-center shadow-md">
                    E
                  </kbd>
                </div>
                <h4 className="text-base font-extrabold text-slate-900">Tombol Aksi Interaktif</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tekan Spasi atau tombol E saat berada di dekat sampah untuk memungut, dan tekan lagi di
                  depan tong untuk membuang.
                </p>
              </div>

              {/* PC Key 3 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <kbd className="px-3 h-10 rounded-xl bg-slate-800 text-amber-300 font-mono font-black text-sm flex items-center justify-center shadow-md">
                    ESC
                  </kbd>
                </div>
                <h4 className="text-base font-extrabold text-slate-900">Menu Jeda & Pengaturan</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Buka menu jeda sewaktu-waktu untuk memeriksa target misi, mengatur volume musik, atau
                  menyesuaikan grafis game.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6">
              {/* Touch 1 */}
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold">
                  🕹️
                </div>
                <h4 className="text-base font-extrabold text-slate-900">Virtual Joystick Kiri</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Geser jemari di lingkaran analog kiri untuk mengarahkan langkah karakter. Sensitivitas
                  dan ukuran joystick dapat disesuaikan.
                </p>
              </div>

              {/* Touch 2 */}
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shadow-md">
                  AKSI
                </div>
                <h4 className="text-base font-extrabold text-slate-900">Tombol Aksi Bulat Kanan</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tombol pintar berukuran besar yang otomatis berubah warna dan teks saat kamu mendekati
                  sampah (AMBIL) atau tong (BUANG).
                </p>
              </div>

              {/* Touch 3 */}
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                  <RotateCw className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="text-base font-extrabold text-slate-900">Putar HP (Posisi Landscape)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mainkan dalam posisi mendatar untuk pengalaman 3D terbaik dengan area pandang yang luas
                  tanpa terhalang jempolmu.
                </p>
              </div>
            </div>
          )}

          {/* Clean Bottom Link to Help */}
          <div className="mt-8 flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-500 font-medium">
              💡 Apakah kamu kidal? Kamu bisa menukar posisi tombol di Pusat Pengaturan.
            </span>
            <Link
              to="/bantuan?tab=kontrol"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 underline"
            >
              <span>Pelajari tata letak HUD lengkap di Pusat Bantuan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
