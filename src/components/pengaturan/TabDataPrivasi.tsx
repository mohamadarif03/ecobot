import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  ChevronDown,
  Printer,
  Download,
  Upload,
  RotateCcw,
  AlertTriangle,
  FileCheck,
  Check,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import {
  triggerBackupDownload,
  validateAndSanitizeBackup,
} from "../../data/pengaturan/backup.ts";
import { PARENT_TEACHER_INFO } from "../../data/pengaturan/options.ts";
import type { PlayerState } from "../../types/player.ts";
import type { BackupValidationResult } from "../../data/pengaturan/types.ts";

interface TabDataPrivasiProps {
  state: PlayerState;
  showOnBoard: boolean;
  onToggleShowOnBoard: (value: boolean) => void;
  onResetGameProgress: () => void;
  onResetAllData: () => void;
  onRestoreBackup: (sanitizedData: Partial<PlayerState>) => void;
  onUndoRestoreBackup: () => boolean;
  onNotifySave: (msg?: string) => void;
}

export const TabDataPrivasi: React.FC<TabDataPrivasiProps> = ({
  state,
  showOnBoard,
  onToggleShowOnBoard,
  onResetGameProgress,
  onResetAllData,
  onRestoreBackup,
  onUndoRestoreBackup,
  onNotifySave,
}) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Accordion state for parents/teachers
  const [isParentOpen, setIsParentOpen] = useState(false);

  // Restore Modal State
  const [restoreModalOpen, setRestoreModalOpen] = useState(false);
  const [restoreValidation, setRestoreValidation] = useState<BackupValidationResult | null>(null);
  const [restoreStep, setRestoreStep] = useState<1 | 2>(1);

  // Reset Game Modal State
  const [resetGameModalOpen, setResetGameModalOpen] = useState(false);
  const [resetGameStep, setResetGameStep] = useState<1 | 2>(1);

  // Reset All Modal State
  const [resetAllModalOpen, setResetAllModalOpen] = useState(false);
  const [resetAllStep, setResetAllStep] = useState<1 | 2>(1);
  const [confirmDeleteText, setConfirmDeleteText] = useState("");

  // Check if undo restore is available in sessionStorage
  const [canUndoRestore, setCanUndoRestore] = useState<boolean>(() => {
    try {
      return Boolean(sessionStorage.getItem("ecobot_previous_backup_restore"));
    } catch {
      return false;
    }
  });

  // Handle Backup File Selected
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".json")) {
      alert("Silakan pilih berkas cadangan dengan format .json.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        const validation = validateAndSanitizeBackup(content);
        setRestoreValidation(validation);
        setRestoreStep(1);
        setRestoreModalOpen(true);
      }
    };
    reader.readAsText(file);

    // Reset input value so same file can be selected again
    e.target.value = "";
  };

  const handleConfirmRestore = () => {
    if (restoreValidation?.valid && restoreValidation.sanitizedData) {
      onRestoreBackup(restoreValidation.sanitizedData);
      setRestoreModalOpen(false);
      setCanUndoRestore(true);
      onNotifySave("Progres berhasil dipulihkan dari cadangan!");
    }
  };

  const handleUndoRestore = () => {
    const success = onUndoRestoreBackup();
    if (success) {
      setCanUndoRestore(false);
      onNotifySave("Pemulihan dibatalkan, data kembali ke sebelumnya.");
    }
  };

  const handleConfirmResetGame = () => {
    onResetGameProgress();
    setResetGameModalOpen(false);
    setResetGameStep(1);
    onNotifySave("Progres misi kota berhasil di-reset ke awal.");
  };

  const handleConfirmResetAll = () => {
    if (confirmDeleteText.trim().toUpperCase() !== "HAPUS") return;
    onResetAllData();
    setResetAllModalOpen(false);
    navigate("/onboarding");
  };

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input for Backup Import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />

      {/* ==================== 1. KARTU PRIVASI PAPAN PERINGKAT ==================== */}
      <Card className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm">
        <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-9 h-9 rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-800 dark:text-white">
              Privasi Papan Peringkat
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kendalikan visibilitas profilmu di papan peringkat teman-teman
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-start gap-3">
            {showOnBoard ? (
              <Eye className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            ) : (
              <EyeOff className="w-5 h-5 text-slate-400 mt-0.5" />
            )}
            <div>
              <div className="text-sm font-bold text-slate-800 dark:text-white">
                Tampilkan Namaku di Papan Peringkat
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {showOnBoard
                  ? "Nama panggilan dan avatarmu dapat dilihat teman-teman lain."
                  : "Namamu disamarkan sebagai 'Pemain Rahasia' 🕵️ bagi pengguna lain."}
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-3">
            <input
              type="checkbox"
              role="switch"
              aria-checked={showOnBoard}
              checked={showOnBoard}
              onChange={(e) => {
                onToggleShowOnBoard(e.target.checked);
                onNotifySave(e.target.checked ? "Nama tampil di peringkat" : "Nama disamarkan di peringkat");
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>
      </Card>

      {/* ==================== 2. KARTU ORANG TUA & GURU ==================== */}
      <Card className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm">
        <button
          type="button"
          onClick={() => setIsParentOpen((prev) => !prev)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-800 dark:text-white">
                {PARENT_TEACHER_INFO.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Informasi keamanan data, privasi anak, dan lembar rapor belajar
              </p>
            </div>
          </div>

          <ChevronDown
            className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
              isParentOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isParentOpen && (
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs animate-in fade-in duration-200">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {PARENT_TEACHER_INFO.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {PARENT_TEACHER_INFO.points.map((pt, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60"
                >
                  <div className="font-bold text-slate-800 dark:text-white mb-1">
                    {pt.title}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    {pt.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex gap-4 text-slate-500">
                <Link to="/privasi" className="hover:text-sky-600 flex items-center gap-1 font-semibold">
                  <span>Kebijakan Privasi Lengkap</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <Link to="/sumber" className="hover:text-sky-600 flex items-center gap-1 font-semibold">
                  <span>Sumber Referensi Materi</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <Button
                type="button"
                onClick={handlePrintSummary}
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-xs shadow-sm flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Ringkasan Belajar</span>
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* ==================== 3. KARTU CADANGKAN PROGRES ==================== */}
      <Card className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm">
        <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 flex items-center justify-center font-bold">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-800 dark:text-white">
              Cadangkan & Pulihkan Data
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Simpan berkas cadangan ke komputer agar progres tidak hilang saat ganti perangkat
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Unduh Cadangan */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-800/50 border border-indigo-100 dark:border-indigo-900/60 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-1">
                Unduh Cadangan (Ekspor)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Simpan file JSON berisi profil, level, lencana, dan seluruh progres belajarmu.
              </p>
            </div>

            <Button
              type="button"
              onClick={() => {
                triggerBackupDownload(state);
                onNotifySave("Berkas cadangan berhasil diunduh!");
              }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black shadow-sm flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Cadangan</span>
            </Button>
          </div>

          {/* Pulihkan dari Cadangan */}
          <div className="p-4 rounded-2xl bg-sky-50/50 dark:bg-slate-800/50 border border-sky-100 dark:border-sky-900/60 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-1">
                Pulihkan dari Cadangan (Impor)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Muat kembali file cadangan ECOBOT untuk melanjutkan petualanganmu di sini.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-sky-300 dark:border-sky-700 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-950/40 rounded-2xl text-xs font-black flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Pilih File Cadangan</span>
            </Button>
          </div>
        </div>

        {canUndoRestore && (
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
            <span className="text-xs text-amber-800 dark:text-amber-300 font-semibold">
              Kamu baru saja memulihkan cadangan. Ingin kembali ke data sebelumnya?
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleUndoRestore}
              className="text-xs font-bold text-amber-700 border-amber-300 hover:bg-amber-100 rounded-xl shrink-0"
            >
              Batalkan Pemulihan
            </Button>
          </div>
        )}
      </Card>

      {/* ==================== 4. KARTU RESET (ZONA HATI-HATI) ==================== */}
      <Card className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm">
        <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="w-9 h-9 rounded-2xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-800 dark:text-white">
              Pusat Reset & Pembersihan
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pilihan untuk mengulang misi game atau memulai dari lembaran baru
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Reset Progres Game Only */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="font-bold text-sm text-slate-800 dark:text-white">
                Reset Progres Game 3D
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5 max-w-lg">
                Mengulang 6 misi game dan upgrade peralatan dari awal. <strong>Profil, XP, Poin, Lencana, dan Pustaka tetap aman!</strong>
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setResetGameStep(1);
                setResetGameModalOpen(true);
              }}
              className="text-xs font-bold text-amber-700 border-amber-300 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300 rounded-2xl shrink-0"
            >
              Reset Progres Game
            </Button>
          </div>

          {/* Reset All Player Data */}
          <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="font-bold text-sm text-rose-900 dark:text-rose-200">
                Hapus Semua Data Pemain
              </div>
              <p className="text-xs text-rose-700/80 dark:text-rose-300/80 leading-relaxed mt-0.5 max-w-lg">
                Menghapus seluruh profil, progres, lencana, dan skor di perangkat ini. Kamu akan diarahkan kembali ke layar penyambutan.
              </p>
            </div>

            <Button
              type="button"
              onClick={() => {
                setResetAllStep(1);
                setConfirmDeleteText("");
                setResetAllModalOpen(true);
              }}
              className="text-xs font-black bg-rose-500 hover:bg-rose-600 text-white rounded-2xl shadow-sm shrink-0"
            >
              Hapus Semua Data
            </Button>
          </div>
        </div>
      </Card>

      {/* ==================== PRINT ONLY SUMMARY SHEET ==================== */}
      <div className="hidden print:block p-8 max-w-3xl mx-auto space-y-6 font-sans">
        <div className="border-b-2 border-slate-900 pb-4 text-center">
          <h1 className="text-2xl font-black uppercase tracking-wide">
            ECOBOT - Rapor Ringkasan Belajar Lingkungan
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Media Edukasi Daur Ulang & Kebiasaan Peduli Lingkungan untuk Siswa Cilik
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-bold">Nama Panggilan:</span> {state.nickname}
          </div>
          <div>
            <span className="font-bold">Level Belajar:</span> Level {state.xp > 0 ? Math.floor(state.xp / 100) + 1 : 1}
          </div>
          <div>
            <span className="font-bold">Total Pengalaman:</span> {state.xp} XP
          </div>
          <div>
            <span className="font-bold">Poin Apresiasi:</span> {state.points} Poin
          </div>
          <div>
            <span className="font-bold">Materi Pustaka Dibaca:</span>{" "}
            {Object.values(state.contentProgress || {}).filter((p) => p.completed).length} Materi
          </div>
          <div>
            <span className="font-bold">Kuis Diselesaikan:</span>{" "}
            {state.quizProgress?.stats?.totalQuizzes || 0} Kali
          </div>
          <div>
            <span className="font-bold">Lencana Terbuka:</span>{" "}
            {Object.keys(state.achievements?.badges || {}).length || state.badges.length} Badge
          </div>
          <div>
            <span className="font-bold">Hari Aktif Belajar:</span> {state.streak} Hari berturut-turut
          </div>
        </div>

        <div className="pt-6 border-t border-slate-300 text-xs text-slate-500 text-center">
          Dokumen ini dicetak mandiri dari perangkat siswa pada {new Date().toLocaleDateString("id-ID", { dateStyle: "full" })}. Seluruh aktivitas dilakukan secara privat tanpa pengumpulan data pribadi.
        </div>
      </div>

      {/* ==================== RESTORE MODAL ==================== */}
      {restoreModalOpen && (
        <Modal
          isOpen={restoreModalOpen}
          onClose={() => setRestoreModalOpen(false)}
          title="Pulihkan Progres dari Cadangan"
        >
          <div className="space-y-4 text-xs">
            {!restoreValidation?.valid ? (
              <div className="p-4 rounded-2xl bg-rose-50 text-rose-700 border border-rose-200">
                <div className="font-bold text-sm mb-1">Berkas Tidak Valid</div>
                <p>{restoreValidation?.error || "Gagal membaca berkas cadangan."}</p>
              </div>
            ) : restoreStep === 1 ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="font-bold text-sm text-slate-800 dark:text-white mb-2">
                    Ringkasan Berkas Cadangan:
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nama Pemain:</span>
                    <span className="font-bold text-slate-800 dark:text-white">
                      {restoreValidation.summary?.avatar} {restoreValidation.summary?.nickname}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Level & Skor:</span>
                    <span className="font-bold text-slate-800 dark:text-white">
                      Lv.{restoreValidation.summary?.level} ({restoreValidation.summary?.xp} XP)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Badge & Kuis:</span>
                    <span className="font-bold text-slate-800 dark:text-white">
                      {restoreValidation.summary?.badgesCount} Badge · {restoreValidation.summary?.quizzesCompletedCount} Kuis
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] pt-1 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400">Dicadangkan pada:</span>
                    <span className="text-slate-500">{restoreValidation.summary?.exportedAt}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 text-xs">
                  ⚠️ Memulihkan cadangan ini akan menimpa data progres yang sedang aktif saat ini.
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <Button variant="outline" size="sm" onClick={() => setRestoreModalOpen(false)}>
                    Batal
                  </Button>
                  <Button
                    size="sm"
                    className="bg-sky-500 hover:bg-sky-600 text-white font-bold"
                    onClick={() => setRestoreStep(2)}
                  >
                    Lanjut Konfirmasi
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-sky-50 text-sky-900 border border-sky-200">
                  <div className="font-bold text-sm mb-1">Konfirmasi Akhir</div>
                  <p>
                    Apakah kamu yakin ingin menimpa data sekarang dengan cadangan milik{" "}
                    <strong>{restoreValidation.summary?.nickname}</strong>?
                  </p>
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <Button variant="outline" size="sm" onClick={() => setRestoreStep(1)}>
                    Kembali
                  </Button>
                  <Button
                    size="sm"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
                    onClick={handleConfirmRestore}
                  >
                    Ya, Terapkan Cadangan
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* ==================== RESET GAME MODAL ==================== */}
      {resetGameModalOpen && (
        <Modal
          isOpen={resetGameModalOpen}
          onClose={() => setResetGameModalOpen(false)}
          title="Reset Progres Game 3D"
        >
          <div className="space-y-4 text-xs">
            {resetGameStep === 1 ? (
              <div className="space-y-3">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Tindakan ini akan mengembalikan seluruh misi game (Zona 1-6) dan peningkatan peralatan tas/sepatu kembali ke status awal.
                </p>
                <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                  ✓ Profilmu, level, XP, poin toko, lencana, dan riwayat kuis <strong>tetap tersimpan aman</strong>.
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <Button variant="outline" size="sm" onClick={() => setResetGameModalOpen(false)}>
                    Batal
                  </Button>
                  <Button
                    size="sm"
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold"
                    onClick={() => setResetGameStep(2)}
                  >
                    Lanjut
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-slate-800 dark:text-white font-bold">
                  Yakin ingin mengulang petualangan game dari Misi 1?
                </p>
                <div className="flex gap-2 justify-end pt-2">
                  <Button variant="outline" size="sm" onClick={() => setResetGameStep(1)}>
                    Batal
                  </Button>
                  <Button
                    size="sm"
                    className="bg-amber-600 hover:bg-amber-700 text-white font-black"
                    onClick={handleConfirmResetGame}
                  >
                    Ya, Mulai Game dari Awal
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* ==================== RESET ALL DATA MODAL ==================== */}
      {resetAllModalOpen && (
        <Modal
          isOpen={resetAllModalOpen}
          onClose={() => setResetAllModalOpen(false)}
          title="Hapus Semua Data Pemain"
        >
          <div className="space-y-4 text-xs">
            {resetAllStep === 1 ? (
              <div className="space-y-3">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Tindakan ini akan <strong>menghapus seluruh data belajar</strong> di peramban ini, termasuk nama panggilan, level, XP, poin, badge, dan kustomisasi karakter.
                </p>
                <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200">
                  💡 <strong>Saran Ramah:</strong> Sebaiknya unduh cadangan file terlebih dahulu sebelum menghapus, agar progres belajarmu tidak hilang selamanya.
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <Button variant="outline" size="sm" onClick={() => setResetAllModalOpen(false)}>
                    Batal
                  </Button>
                  <Button
                    size="sm"
                    className="bg-rose-500 hover:bg-rose-600 text-white font-bold"
                    onClick={() => setResetAllStep(2)}
                  >
                    Lanjut ke Langkah Terakhir
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-slate-800 dark:text-white font-bold">
                  Ketik kata <span className="text-rose-600 uppercase font-black">HAPUS</span> di bawah ini untuk konfirmasi:
                </p>

                <input
                  type="text"
                  value={confirmDeleteText}
                  onChange={(e) => setConfirmDeleteText(e.target.value)}
                  placeholder="Ketik HAPUS"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 font-mono font-bold text-center text-sm outline-none focus:border-rose-500"
                />

                <div className="flex gap-2 justify-end pt-2">
                  <Button variant="outline" size="sm" onClick={() => setResetAllStep(1)}>
                    Kembali
                  </Button>
                  <Button
                    size="sm"
                    disabled={confirmDeleteText.trim().toUpperCase() !== "HAPUS"}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-black disabled:opacity-40"
                    onClick={handleConfirmResetAll}
                  >
                    Hapus Seluruh Data
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
