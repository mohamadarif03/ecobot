import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";

// TODO: Tim edukasi dapat memverifikasi dan memperbarui tautan sumber resmi berikut ini sesuai rilis data KLHK & UNEP terbaru.
const REFERENSI_LIST = [
  {
    nama: "Kementerian Lingkungan Hidup dan Kehutanan (KLHK RI)",
    deskripsi: "Sistem Informasi Pengelolaan Sampah Nasional (SIPSN) mengenai komposisi timbulan sampah organik dan anorganik di Indonesia.",
    kategori: "Pemerintah Nasional",
  },
  {
    nama: "United Nations Environment Programme (UNEP)",
    deskripsi: "Laporan global mengenai dampak polusi mikroplastik terhadap ekosistem laut dan estimasi waktu degradasi polimer plastik.",
    kategori: "Organisasi Internasional",
  },
  {
    nama: "National Oceanic and Atmospheric Administration (NOAA)",
    deskripsi: "Data kelautan mengenai perjalanan sampah plastik di samudra dan dampaknya bagi kehidupan satwa air.",
    kategori: "Penelitian Sains",
  },
  {
    nama: "World Wide Fund for Nature (WWF Indonesia)",
    deskripsi: "Kampanye pengurangan sampah plastik sekali pakai dan konservasi hutan melalui daur ulang kertas.",
    kategori: "Konservasi Alam",
  },
  {
    nama: "Dinas Lingkungan Hidup & Bank Sampah Indonesia",
    deskripsi: "Standar pewarnaan tempat sampah 3 warna (Hijau Organik, Kuning Anorganik, Merah B3).",
    kategori: "Edukasi Komunitas",
  },
];

export default function SumberPage() {
  return (
    <div className="min-h-screen bg-[#F0F9FF] text-slate-800 p-6 sm:p-12">
      <div className="max-w-3xl mx-auto bg-white rounded-[32px] p-8 sm:p-12 shadow-lg border border-sky-100">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-black mb-6 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Utama</span>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Sumber Referensi & Data
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              Rujukan Ilmiah dan Sumber Terpercaya Data Lingkungan ECOBOT
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mt-4 mb-8">
          Angka waktu perkiraan terurai sampah dan fakta lingkungan yang disajikan di ECOBOT dirangkum dari publikasi lembaga lingkungan terpercaya untuk memudahkan pemahaman anak-anak.
        </p>

        <div className="space-y-4">
          {REFERENSI_LIST.map((ref, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-sky-300 transition"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10.5px] font-black uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                  {ref.kategori}
                </span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="text-base font-black text-slate-900 mt-2">
                {ref.nama}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {ref.deskripsi}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
          <span>© 2026 ECOBOT Indonesia</span>
          <Link to="/" className="font-bold text-sky-600 hover:underline">
            Tutup & Kembali
          </Link>
        </div>
      </div>
    </div>
  );
}
