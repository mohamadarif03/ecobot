import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  Clock,
  AlertTriangle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Gamepad2,
  Trash2,
} from "lucide-react";
import { WASTE_ITEMS, WasteItem } from "../data/wasteItems";
import { WasteIllustration } from "./WasteIllustration";
import { usePlayerStore } from "../store/playerStore";

export const WasteRailSection: React.FC = () => {
  const navigate = useNavigate();
  const { state } = usePlayerStore();
  const [activeIndex, setActiveIndex] = useState<number>(3); // Kantong plastik as default facing
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [modalItem, setModalItem] = useState<WasteItem | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const currentFocusIndex = hoverIndex !== null ? hoverIndex : activeIndex;

  const handleOpenModal = (item: WasteItem) => {
    setModalItem(item);
  };

  const handleCloseModal = () => {
    setModalItem(null);
  };

  const handlePrevItem = useCallback(() => {
    if (!modalItem) return;
    const currentIndex = WASTE_ITEMS.findIndex((w) => w.id === modalItem.id);
    const prevIndex = (currentIndex - 1 + WASTE_ITEMS.length) % WASTE_ITEMS.length;
    setModalItem(WASTE_ITEMS[prevIndex]);
    setActiveIndex(prevIndex);
  }, [modalItem]);

  const handleNextItem = useCallback(() => {
    if (!modalItem) return;
    const currentIndex = WASTE_ITEMS.findIndex((w) => w.id === modalItem.id);
    const nextIndex = (currentIndex + 1) % WASTE_ITEMS.length;
    setModalItem(WASTE_ITEMS[nextIndex]);
    setActiveIndex(nextIndex);
  }, [modalItem]);

  // Keyboard trap and Esc handler for modal
  useEffect(() => {
    if (!modalItem) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal();
      } else if (e.key === "ArrowLeft") {
        handlePrevItem();
      } else if (e.key === "ArrowRight") {
        handleNextItem();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalItem, handlePrevItem, handleNextItem]);

  const handlePlayGameClick = () => {
    if (!state.nickname || state.nickname.trim() === "") {
      navigate("/onboarding");
    } else {
      navigate("/main-game");
    }
  };

  const renderStatusBadge = (item: WasteItem) => {
    if (item.statusWarna === "green") {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
          <Check className="w-3 h-3 stroke-[3]" />
          <span>{item.label}</span>
        </span>
      );
    }
    if (item.statusWarna === "yellow") {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full">
          <Clock className="w-3 h-3 stroke-[2.5]" />
          <span>{item.label}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300 px-2 py-0.5 rounded-full">
        <AlertTriangle className="w-3 h-3 stroke-[2.5]" />
        <span>{item.label}</span>
      </span>
    );
  };

  return (
    <section
      id="fakta-sampah"
      aria-label="Dinding Waktu Lama Terurai"
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-black/10 overflow-hidden"
    >
      {/* Background Dotted Grid Pattern (matching template aesthetic) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow */}
        <span className="text-xs font-black uppercase tracking-[0.2em] text-[#15803D] bg-emerald-50 border border-emerald-200/80 px-4 py-1.5 rounded-full shadow-2xs mb-3">
          DINDING WAKTU · LAMA TERURAI
        </span>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal font-serif text-[#000000] tracking-tight max-w-3xl">
          Berapa lama sampah bertahan di alam?
        </h2>

        {/* Caption */}
        <p className="text-base sm:text-lg text-[#6F6F6F] max-w-xl mt-3 leading-relaxed">
          Geser rail, sentuh sampahnya, lihat apa yang terjadi.
        </p>

        {/* ==================== 3D SUSPENSION RAIL SYSTEM ==================== */}
        <div className="w-full mt-12 relative pb-8">
          {/* Top Rail Bar (Heavy black metallic beam) */}
          <div className="relative w-full h-4 rounded-full bg-gradient-to-b from-[#475569] via-[#0F172A] to-[#020617] shadow-md flex items-center justify-between px-6 z-20">
            {/* Brackets / Rail Mounting Pegs */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((b) => (
              <div
                key={b}
                className="w-4 h-6 -top-1 relative bg-gradient-to-r from-slate-400 via-slate-600 to-slate-800 rounded-xs shadow-inner"
              />
            ))}
          </div>

          {/* Rail Items Container (Horizontal scrollable on mobile, flex on desktop) */}
          <div className="relative mt-2 pt-2 flex items-end justify-between gap-3 sm:gap-4 overflow-x-auto pb-6 snap-x snap-mandatory px-4 scrollbar-none">
            {WASTE_ITEMS.map((item, index) => {
              const isFront = currentFocusIndex === index;
              const isSpotlight = item.sorotan;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleOpenModal(item)}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onFocus={() => setHoverIndex(index)}
                  onBlur={() => setHoverIndex(null)}
                  aria-label={`${item.nama}, terurai sekitar ${item.label}`}
                  className={`group relative flex flex-col items-center shrink-0 snap-center outline-none cursor-pointer transition-all duration-300 ease-out ${
                    isSpotlight ? "w-[155px] sm:w-[170px]" : "w-[130px] sm:w-[145px]"
                  }`}
                  style={{
                    transform: isFront
                      ? "translateY(-18px) scale(1.06)"
                      : "translateY(0) scale(0.96)",
                    zIndex: isFront ? 30 : 10 + index,
                  }}
                >
                  {/* Hanging Hook & String */}
                  <div className="flex flex-col items-center">
                    {/* Metal Hook */}
                    <div className="w-3 h-5 rounded-t-full border-t-2 border-x-2 border-slate-700 bg-transparent"></div>
                    {/* Cord / String */}
                    <div className="w-[1.5px] h-6 bg-slate-400"></div>
                  </div>

                  {/* Hanging Price Tag (Decomposition Time Badge) */}
                  <div className="relative -mt-1 mb-2 transform -rotate-3 transition-transform group-hover:rotate-0">
                    <div className="bg-white/95 backdrop-blur-xs rounded-lg px-2.5 py-1 shadow-md border border-slate-200 flex flex-col items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mb-0.5"></div>
                      {renderStatusBadge(item)}
                    </div>
                  </div>

                  {/* Waste Item Illustration (3D card container) */}
                  <div
                    className={`relative w-full rounded-[22px] p-3 transition-all duration-300 ${
                      isFront
                        ? "bg-emerald-50/80 shadow-[0_12px_28px_rgba(14,165,233,0.18)] ring-2 ring-sky-300"
                        : "bg-white/70 hover:bg-white shadow-sm border border-slate-100"
                    } ${isSpotlight ? "h-[250px] sm:h-[275px]" : "h-[220px] sm:h-[240px]"}`}
                  >
                    {/* Spotlight Ribbon */}
                    {isSpotlight && (
                      <span className="absolute top-2 right-2 text-[9px] font-black tracking-wider uppercase bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full shadow-2xs">
                        Sorotan
                      </span>
                    )}

                    <WasteIllustration
                      id={item.id}
                      alt={item.nama}
                      className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Item Name Label Under Card */}
                  <div className="mt-3 text-center">
                    <p
                      className={`text-[13.5px] font-bold tracking-tight transition-colors ${
                        isFront ? "text-[#15803D] font-black" : "text-slate-800"
                      }`}
                    >
                      {item.nama}
                    </p>
                    <span className="text-[11px] font-medium text-slate-500">
                      {item.timelineLabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ==================== TIMELINE SCALE BAR ==================== */}
          <div className="mt-8 max-w-4xl mx-auto px-4">
            <div className="relative w-full">
              {/* Scale Line */}
              <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 rounded-full w-full"></div>

              {/* Scale Ticks & Labels */}
              <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 mt-2">
                <span className="flex items-center gap-1 text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Minggu</span>
                </span>
                <span className="flex items-center gap-1 text-amber-700">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>Tahun</span>
                </span>
                <span className="flex items-center gap-1 text-orange-700">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span>Abad</span>
                </span>
                <span className="flex items-center gap-1 text-rose-700">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>Ribuan Tahun</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handlePlayGameClick}
            className="rounded-full px-10 py-4 text-sm sm:text-base font-black bg-[#22C55E] hover:bg-[#4ADE80] text-slate-950 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
          >
            <Gamepad2 className="w-5 h-5 text-slate-950" />
            <span>Coba Pilah di Game</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Disclaimer text */}
          <p className="text-xs text-slate-400 max-w-md">
            *Angka adalah perkiraan dan bisa berbeda tergantung kondisi lingkungan.
          </p>
        </div>
      </div>

      {/* ==================== INTERACTIVE DETAIL MODAL ==================== */}
      {modalItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-waste-title"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={handleCloseModal}
        >
          <div
            ref={modalRef}
            className="w-full max-w-2xl bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl border border-emerald-100 text-left relative overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleCloseModal}
              title="Tutup (Esc)"
              aria-label="Tutup jendela informasi sampah"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body */}
            <div className="overflow-y-auto pr-1 space-y-5">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Waste Illustration */}
                <div className="w-36 h-48 sm:w-44 sm:h-56 bg-emerald-50 rounded-3xl p-4 flex items-center justify-center shrink-0 border border-emerald-100 shadow-inner">
                  <WasteIllustration
                    id={modalItem.id}
                    alt={modalItem.nama}
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                    <span
                      className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                        modalItem.category === "Organik"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      {modalItem.jenis}
                    </span>
                    {renderStatusBadge(modalItem)}
                  </div>

                  <h3
                    id="modal-waste-title"
                    className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight"
                  >
                    {modalItem.nama}
                  </h3>

                  {/* Tong Sampah Rekomendasi */}
                  <div className="mt-3 p-3 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow-2xs"
                      style={{ backgroundColor: modalItem.tongColor }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        Tong Sampah yang Benar
                      </span>
                      <p className="text-xs font-black text-slate-900">
                        {modalItem.tong}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dampak ke Alam Card */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 text-slate-800">
                <span className="text-xs font-black uppercase tracking-wider text-rose-800 flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Dampak ke Alam</span>
                </span>
                <p className="text-sm leading-relaxed text-slate-700">
                  {modalItem.dampak}
                </p>
              </div>

              {/* Tips Coba di Rumah */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 text-slate-800">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Aksi Nyata: Coba Ini!</span>
                </span>
                <p className="text-sm font-bold text-emerald-950 leading-relaxed">
                  {modalItem.tips}
                </p>
              </div>

              {/* Balon Reaksi Ecobot */}
              <div className="p-4 rounded-2xl bg-[#DCFCE7] border border-emerald-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-200/80 text-emerald-700 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-900">
                    Komentar Ecobot
                  </span>
                  <p className="text-sm font-black text-emerald-950 mt-0.5">
                    "{modalItem.ecobot}"
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer Controls (Prev/Next + Game Action) */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevItem}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextItem}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handlePlayGameClick}
                className="bg-[#22C55E] hover:bg-[#4ADE80] text-slate-950 font-black text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow-sm transition hover:scale-105 cursor-pointer"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Coba Pilah di Game</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
