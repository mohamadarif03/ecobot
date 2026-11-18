import React from "react";
import { Link } from "react-router-dom";
import {
  FEATURE_MENU_ITEMS,
  LEARNING_FLOW_STAGES,
  PARENTS_AND_TEACHERS_INFO,
} from "../../data/bantuan/featureMap";

export const TabPetaFitur: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* 1. Learning Flow Diagram */}
      <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
            <span>🔄</span> Lingkaran Edukasi Interaktif
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Alur Pembelajaran Gamifikasi ECOBOT
          </h2>
          <p className="text-sm text-emerald-100 mt-1 max-w-2xl">
            Dari pemahaman konsep di layar hingga aksi nyata di rumahmu, inilah 4 siklus kebiasaan
            baik yang dibangun ECOBOT:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {LEARNING_FLOW_STAGES.map((stg) => (
              <Link
                key={stg.stage}
                to={stg.actionUrl}
                className="group bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 rounded-2xl p-5 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="text-3xl mb-3 p-2 rounded-xl bg-white/10 inline-block">
                    {stg.icon}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {stg.title}
                  </h3>
                  <p className="text-xs text-emerald-100 mt-2 leading-relaxed">{stg.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-300">
                  <span>Kunjungi</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Full Sidebar Menus Grid */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span>🗺️</span> Peta Navigasi Lengkap
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
            Daftar Seluruh Ruangan & Menu ECOBOT
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Semua fitur di bawah ini dapat kamu akses langsung dari menu bilah samping (sidebar)
            kapan saja:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURE_MENU_ITEMS.map((item) => (
            <div
              key={item.id}
              id={`feature-card-${item.id}`}
              className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                    {item.iconName}
                  </span>
                  <span className="px-3 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    ✓ Siap Dimainkan
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {item.shortDescription}
                </p>

                {/* Highlights */}
                <div className="mt-4 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Hal Seru di Dalamnya:
                  </span>
                  {item.highlights.map((hl, i) => (
                    <div key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 max-w-[60%] leading-tight">
                  {item.targetUserNote}
                </span>
                <Link
                  to={item.path}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors"
                >
                  Buka Ruangan ↗
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Guide for Parents & Teachers */}
      <section className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span>👨‍👩‍👧‍👦</span> Untuk Orang Tua & Guru
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
            {PARENTS_AND_TEACHERS_INFO.title}
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            {PARENTS_AND_TEACHERS_INFO.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PARENTS_AND_TEACHERS_INFO.keyPoints.map((pt, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-start gap-4"
            >
              <span className="text-3xl p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex-shrink-0">
                {pt.icon}
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{pt.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{pt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
