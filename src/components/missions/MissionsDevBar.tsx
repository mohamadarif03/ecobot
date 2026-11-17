import React, { useState } from "react";
import { Wrench, ChevronDown, Play, RotateCcw, CalendarPlus } from "lucide-react";

interface MissionsDevBarProps {
  onSimulateEvent: (eventName: string, amount: number, id?: string) => void;
  onResetDaily: () => void;
  onResetWeekly: () => void;
  onAdvanceDay: () => void;
  simulatedOffsetDays?: number;
}

const DEV_EVENTS = [
  { name: "sampah_benar", label: "Pilah Sampah Benar (+5)", amount: 5 },
  { name: "sampah_benar", label: "Pilah Sampah Benar (+10)", amount: 10 },
  { name: "materi_dibaca", label: "Baca Materi Pustaka (+1)", amount: 1 },
  { name: "materi_dibaca_unik", label: "Baca Materi Unik Baru (+1)", amount: 1, uniqueId: "materi-sample-" },
  { name: "kuis_selesai", label: "Selesaikan 1 Kuis (+1)", amount: 1 },
  { name: "kuis_harian_selesai", label: "Kerjakan Kuis Harian (+1)", amount: 1 },
  { name: "misi_game_dimulai", label: "Mulai Misi Game (+1)", amount: 1 },
  { name: "bintang_2_plus", label: "Raih 2+ Bintang (+1)", amount: 1 },
  { name: "bintang_3", label: "Raih 3 Bintang (+1)", amount: 1 },
  { name: "aksi_nyata_dicentang", label: "Centang Aksi Nyata (+1)", amount: 1 },
  { name: "fakta_dibaca", label: "Baca Fakta Harian (+1)", amount: 1 },
  { name: "kartu_dibuka", label: "Buka Kartu Materi (+3)", amount: 3 },
  { name: "misi_game_selesai:taman", label: "Selesai Misi Taman Kota (+1)", amount: 1 },
  { name: "misi_game_selesai:pasar", label: "Selesai Misi Pasar (+1)", amount: 1 },
  { name: "tantangan_7_selesai", label: "Tantangan 7 Hari Selesai (+1)", amount: 1 },
];

export const MissionsDevBar: React.FC<MissionsDevBarProps> = ({
  onSimulateEvent,
  onResetDaily,
  onResetWeekly,
  onAdvanceDay,
  simulatedOffsetDays = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);

  // Show in dev mode or localhost
  const isDev =
    import.meta.env.DEV ||
    (typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"));

  if (!isDev) return null;

  const handleTriggerSimulate = () => {
    const ev = DEV_EVENTS[selectedEventIndex];
    if (ev) {
      const payloadId = ev.uniqueId ? `${ev.uniqueId}${Date.now()}` : undefined;
      onSimulateEvent(ev.name, ev.amount, payloadId);
    }
  };

  return (
    <div className="rounded-2xl border border-dashed border-amber-300 bg-amber-50/70 p-3 text-xs text-amber-900 mb-5">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 font-black text-amber-900 hover:text-amber-950 cursor-pointer"
        >
          <Wrench className="w-3.5 h-3.5 text-amber-600" />
          <span>Dev Tools Misi & Gamifikasi</span>
          {simulatedOffsetDays > 0 && (
            <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-mono text-[10px]">
              + {simulatedOffsetDays} hari
            </span>
          )}
          <ChevronDown
            className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        <span className="text-[10px] text-amber-700/80 font-medium hidden sm:inline">
          Hanya aktif di mode development untuk testing alur klaim & reset
        </span>
      </div>

      {isOpen && (
        <div className="mt-3 pt-3 border-t border-amber-200/80 flex flex-wrap items-center gap-2">
          {/* Select Event */}
          <div className="flex items-center gap-1.5 flex-1 min-w-[220px]">
            <select
              value={selectedEventIndex}
              onChange={(e) => setSelectedEventIndex(Number(e.target.value))}
              className="bg-white border border-amber-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-400 w-full"
            >
              {DEV_EVENTS.map((ev, idx) => (
                <option key={idx} value={idx}>
                  {ev.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleTriggerSimulate}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg flex items-center gap-1 shrink-0 transition"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Kirim</span>
            </button>
          </div>

          {/* Quick Resets */}
          <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={onResetDaily}
              className="px-2.5 py-1.5 bg-white hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold rounded-lg flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Harian</span>
            </button>

            <button
              type="button"
              onClick={onResetWeekly}
              className="px-2.5 py-1.5 bg-white hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold rounded-lg flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Mingguan</span>
            </button>

            <button
              type="button"
              onClick={onAdvanceDay}
              className="px-2.5 py-1.5 bg-amber-200 hover:bg-amber-300 text-amber-900 font-black rounded-lg flex items-center gap-1 transition"
            >
              <CalendarPlus className="w-3 h-3" />
              <span>+1 Hari</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
