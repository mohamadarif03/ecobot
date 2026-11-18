import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Lock, HeartHandshake } from "lucide-react";
import { EcobotMascot } from "../components/ecobot/EcobotMascot";

export default function PrivasiPage() {
  return (
    <div className="min-h-screen bg-[#F0F9FF] text-slate-800 p-6 sm:p-12">
      <div className="max-w-3xl mx-auto bg-white rounded-[32px] p-8 sm:p-12 shadow-lg border border-emerald-100">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-black mb-6 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Utama</span>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Kebijakan Privasi ECOBOT
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              Perlindungan Keamanan & Privasi Anak-Anak (Usia 8-13 Tahun)
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-600">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
            <EcobotMascot size="mini" className="w-8 h-8 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm font-bold text-emerald-950">
              "Di ECOBOT, keamananmu adalah nomor satu! Kami tidak pernah meminta alamat rumah, nomor telepon, atau data rahasia apa pun."
            </p>
          </div>

          <section className="space-y-2">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>1. Data yang Disimpan</span>
            </h3>
            <p>
              ECOBOT hanya meminta <strong>nama panggilan (nickname)</strong> dan pilihan karakter avatar agar pengalaman bermain terasa personal. Semua data progres belajar (XP, level, poin, streak) disimpan secara lokal di perangkatmu (browser LocalStorage) dan tidak diunggah ke server mana pun.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-emerald-600" />
              <span>2. Tanpa Iklan & Tanpa Pembelian Uang Asli</span>
            </h3>
            <p>
              Web ini 100% bebas dari iklan pihak ketiga, tanpa pelacak komersial, dan tidak memiliki transaksi pembelian uang sungguhan. Semua poin didapatkan murni dari aktivitas belajar dan memilah sampah.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span>🛡️ 3. Ramah Anak & Guru</span>
            </h3>
            <p>
              Seluruh konten telah disesuaikan untuk pendampingan belajar IPA/PLH di sekolah dasar dan menengah pertama.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
          <span>© 2026 ECOBOT Indonesia</span>
          <Link to="/" className="font-bold text-emerald-600 hover:underline">
            Tutup & Kembali
          </Link>
        </div>
      </div>
    </div>
  );
}
