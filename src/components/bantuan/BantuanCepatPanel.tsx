import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ICON_LEGEND } from "../../data/bantuan/guide";
import { ABOUT_CONFIG } from "../../config/about";
import { CONTACT_CONFIG } from "../../config/contact";
import { EcobotMascot } from "../ecobot/EcobotMascot";

const RANDOM_TIPS = [
  "Bilas botol susu atau jus sebelum dibuang ke tong kuning agar tidak mengundang semut!",
  "Daun gugur yang dijadikan kompos bisa menyuburkan pot tanaman cabai di teras rumah.",
  "Baterai bekas tidak boleh dibakar karena uap kimianya berbahaya bagi paru-paru.",
  "Kamu bisa mengunduh file cadangan di Pengaturan agar levelmu tidak hilang saat ganti perangkat.",
  "Mode hemat baterai di menu Pengaturan membantu game berjalan lebih lancar di laptop hemat daya.",
];

export const BantuanCepatPanel: React.FC = () => {
  const [tipIndex, setTipIndex] = useState<number>(0);

  useEffect(() => {
    // Random tip on load
    setTipIndex(Math.floor(Math.random() * RANDOM_TIPS.length));
  }, []);

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % RANDOM_TIPS.length);
  };

  return (
    <aside className="space-y-6">
      {/* 1. Tautan Cepat Pertolongan Pertama */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🚨</span>
          <h3 className="text-base font-extrabold text-slate-800">Pertolongan Cepat</h3>
        </div>

        <div className="space-y-2">
          <Link
            to="/bantuan?tab=cara-bermain#section-alur-harian"
            className="group block p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 transition-all"
          >
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-emerald-700">
              <span>Lupa harus ke mana?</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Lihat panduan alur seru 15 menit satu hari.
            </p>
          </Link>

          <Link
            to="/pengaturan?tab=grafis"
            className="group block p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-100 hover:border-amber-200 transition-all"
          >
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-amber-800">
              <span>Game terasa lambat / lag?</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Aktifkan kualitas grafis rendah & hemat baterai.
            </p>
          </Link>

          <Link
            to="/pengaturan?tab=data"
            className="group block p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 transition-all"
          >
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-emerald-800">
              <span>Ingin simpan / pulihkan data?</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Unduh cadangan data ke file .json dengan aman.
            </p>
          </Link>
        </div>
      </div>

      {/* 2. Mini Legenda Ikon */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏷️</span>
          <h3 className="text-base font-extrabold text-slate-800">Simbol & Hadiah</h3>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {ICON_LEGEND.slice(0, 4).map((ic) => (
            <div
              key={ic.label}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2"
            >
              <span className="text-lg">{ic.icon}</span>
              <div>
                <div className="text-xs font-bold text-slate-800">{ic.label}</div>
                <div className="text-[10px] text-slate-500 leading-none">{ic.desc.slice(0, 15)}...</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Tips Acak Ecobot */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border-2 border-amber-200/70 shadow-sm relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <EcobotMascot size="mini" pose="wave" />
          </div>
          <div>
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Tips Sahabat Bumi
              </span>
              <button
                type="button"
                onClick={handleNextTip}
                className="text-[11px] text-amber-700 hover:text-amber-950 underline font-semibold"
                title="Ganti tips lain"
              >
                Ganti ↻
              </button>
            </div>
            <p className="text-xs text-amber-900 mt-1.5 leading-relaxed">
              &ldquo;{RANDOM_TIPS[tipIndex]}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* 4. Tentang & Kontak untuk Pendidik */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            Informasi Aplikasi
          </h4>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
            v{ABOUT_CONFIG.version}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-snug">
          {ABOUT_CONFIG.appName} oleh {ABOUT_CONFIG.teamName}.
        </p>

        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
          <div>
            <strong>Kontak Pendidik:</strong> {CONTACT_CONFIG.supportEmail}
          </div>
          <div className="text-[10px] text-slate-400 leading-tight">
            {CONTACT_CONFIG.noticeForKids}
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <Link
            to="/privasi"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 underline"
          >
            Kebijakan Privasi
          </Link>
          <Link
            to="/sumber"
            className="text-xs font-bold text-slate-500 hover:text-slate-700 underline"
          >
            Sumber Referensi
          </Link>
        </div>
      </div>
    </aside>
  );
};
