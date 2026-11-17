import React from "react";
import { Link } from "react-router-dom";
import {
  CORE_PLAY_STEPS,
  ADVANCED_PLAY_STEPS,
  TRASH_BINS,
  STAR_RULES,
  ECONOMY_CONCEPTS,
  ICON_LEGEND,
  ONE_DAY_FLOW,
} from "../../data/bantuan/guide";

export const TabCaraBermain: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* 1. Core Steps */}
      <section id="section-langkah-bermain" className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span>🎮</span> Langkah Demi Langkah
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
            Cara Bermain Game 3D Kota Bersih
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Tiga langkah mudah untuk membersihkan kota bersama Ecobot dan menyelamatkan bumi dari timbunan sampah!
          </p>
        </div>

        {/* 3 Core Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CORE_PLAY_STEPS.map((step) => (
            <div
              key={step.step}
              id={`guide-step-${step.step}`}
              className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                    {step.icon}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold border ${step.badgeColor}`}
                  >
                    {step.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-800">{step.title}</h3>
                <p className="text-xs font-semibold text-sky-600 mt-0.5">{step.subtitle}</p>

                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2">
                  <span className="text-sm flex-shrink-0">💡</span>
                  <span className="leading-snug">{step.tips}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2 Advanced Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {ADVANCED_PLAY_STEPS.map((step) => (
            <div
              key={step.step}
              id={`guide-step-${step.step}`}
              className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 border-2 border-slate-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2.5 rounded-2xl bg-white shadow-sm border border-slate-100">
                    {step.icon}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold border ${step.badgeColor}`}
                  >
                    {step.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-800">{step.title}</h3>
                <p className="text-xs font-semibold text-purple-600 mt-0.5">{step.subtitle}</p>

                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60">
                <div className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-200/60 text-xs text-sky-900 flex items-start gap-2">
                  <span className="text-sm flex-shrink-0">💡</span>
                  <span className="leading-snug">{step.tips}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Tiga Tong Sampah */}
      <section id="section-tiga-tong" className="space-y-6 pt-6 border-t border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span>🗑️</span> Kenali Jenis Sampah
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
            Tiga Tong Sampah Sahabat Bumi
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Di kota ECOBOT, kamu akan menemukan 3 tong dengan warna berbeda. Jangan sampai tertukar
            ya, setiap jenis sampah memiliki tujuan olahannya masing-masing!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TRASH_BINS.map((bin) => (
            <div
              key={bin.id}
              className={`rounded-3xl p-6 border-2 shadow-sm ${bin.bgLight} ${bin.borderLight} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md text-white font-black"
                    style={{ backgroundColor: bin.colorHex }}
                  >
                    ♻️
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold ${bin.badgeBg} ${bin.badgeText}`}
                  >
                    {bin.category}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900">{bin.name}</h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                  {bin.description}
                </p>

                {/* Examples */}
                <div className="mt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Contoh Sampah:
                  </h4>
                  <ul className="space-y-1.5">
                    {bin.examples.map((ex, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-800 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: bin.colorHex }} />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 space-y-3">
                <div className="p-3 rounded-2xl bg-white/80 border border-slate-200/80 text-xs text-slate-700">
                  <p className="font-bold text-slate-900 flex items-center gap-1 mb-1">
                    <span>📌</span> Tips Memilah:
                  </p>
                  <p className="leading-snug">{bin.tips}</p>
                </div>

                <div className="p-3 rounded-2xl bg-white/80 border border-slate-200/80 text-xs text-slate-700">
                  <p className="font-bold text-amber-800 flex items-center gap-1 mb-1">
                    <span>✨</span> Fakta Menarik:
                  </p>
                  <p className="leading-snug">{bin.funFact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Aturan Bintang Misi */}
      <section id="section-aturan-bintang" className="space-y-6 pt-6 border-t border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span>⭐</span> Sistem Penilaian
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
            Aturan Bintang Misi (1, 2, atau 3 Bintang)
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Berapa banyak bintang emas yang bisa kamu bawa pulang di setiap misi? Bintang ditentukan
            oleh ketelitianmu dalam memilih tong sampah yang tepat!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STAR_RULES.map((rule) => (
            <div
              key={rule.stars}
              className={`rounded-3xl p-6 border-2 transition-all ${
                rule.stars === 3
                  ? "bg-gradient-to-b from-yellow-50 to-amber-50 border-amber-300 shadow-md shadow-amber-500/10"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${
                        i < rule.stars ? "text-amber-400 drop-shadow-sm" : "text-slate-200"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                  {rule.badgeText}
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-800">{rule.label}</h3>
              <p className="text-xs font-bold text-amber-700 mt-1">{rule.condition}</p>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                {rule.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Gamifikasi: XP vs Poin vs Level vs Streak vs Badge */}
      <section id="section-gamifikasi" className="space-y-6 pt-6 border-t border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span>💎</span> Gamifikasi Ramah Anak
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
            Pahami XP, Poin Koin, Level, dan Lencana
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Semua aktivitas baikmu di ECOBOT dihargai! Berikut adalah arti dari setiap simbol hadiah
            yang kamu temukan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ECONOMY_CONCEPTS.map((eco) => (
            <div
              key={eco.name}
              className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl p-2 rounded-2xl bg-slate-50 border border-slate-100">
                    {eco.icon}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold border ${eco.badgeColor}`}
                  >
                    Hadiah
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-800">{eco.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{eco.shortDesc}</p>

                <div className="mt-4 space-y-2">
                  <div className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-700">Cara Dapat:</span>
                    <p className="text-slate-600 mt-0.5">{eco.howToEarn}</p>
                  </div>
                  <div className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-700">Kegunaan:</span>
                    <p className="text-slate-600 mt-0.5">{eco.usage}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Legenda Ikon Cepat */}
      <section className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
        <h3 className="text-base font-extrabold text-slate-800 mb-4 flex items-center gap-2">
          <span>🏷️</span> Legenda Ikon Cepat
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {ICON_LEGEND.map((item) => (
            <div
              key={item.label}
              className="bg-white p-3.5 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center"
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-xs font-bold text-slate-800">{item.label}</span>
              <span className="text-[10px] text-slate-500 leading-tight mt-0.5">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Alur Satu Hari yang Seru */}
      <section id="section-alur-harian" className="space-y-6 pt-6 border-t border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span>☀️</span> Rutinitas Seru
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
            Alur Satu Hari yang Seru Bersama ECOBOT
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Bingung mau mulai dari mana? Ikuti rute petualangan harian 15 menit ini untuk hasil belajar yang maksimal!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {ONE_DAY_FLOW.map((flow) => (
            <Link
              key={flow.step}
              to={flow.href}
              className="group bg-white rounded-2xl p-5 border-2 border-slate-100 hover:border-sky-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[11px] font-extrabold border border-sky-200">
                  {flow.badge}
                </span>
                <h3 className="text-sm font-bold text-slate-800 group-hover:text-sky-600 transition-colors mt-3">
                  {flow.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{flow.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
                <span>Buka</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
