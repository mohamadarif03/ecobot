import React, { useState, useRef } from "react";
import {
  Award,
  Lock,
  CheckCircle2,
  Download,
  Printer,
  Sparkles,
  ShieldCheck,
  Eye,
} from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import type { CertificateDefinition } from "../../data/pencapaian/types";

export interface EnrichedCertificateItem extends CertificateDefinition {
  status: "locked" | "eligible" | "issued";
  issuedAt?: string;
  serial?: string;
}

interface CertificatesTabProps {
  certificates: EnrichedCertificateItem[];
  nickname: string;
  onIssueCertificate: (certId: string) => { serial: string; issuedAt: string } | null;
}

export const CertificatesTab: React.FC<CertificatesTabProps> = ({
  certificates,
  nickname,
  onIssueCertificate,
}) => {
  const [activeCert, setActiveCert] = useState<EnrichedCertificateItem | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const handleClaim = (cert: EnrichedCertificateItem) => {
    const result = onIssueCertificate(cert.id);
    if (result) {
      const updated = {
        ...cert,
        status: "issued" as const,
        serial: result.serial,
        issuedAt: result.issuedAt,
      };
      setActiveCert(updated);
      setIsPreviewOpen(true);
    }
  };

  const handleOpenPreview = (cert: EnrichedCertificateItem) => {
    setActiveCert(cert);
    setIsPreviewOpen(true);
  };

  // Download PNG using native Canvas
  const handleDownloadPNG = () => {
    if (!activeCert) return;

    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 800);
    if (activeCert.tier === "emas") {
      gradient.addColorStop(0, "#fffbeb");
      gradient.addColorStop(0.5, "#fef3c7");
      gradient.addColorStop(1, "#fde68a");
    } else if (activeCert.tier === "perak") {
      gradient.addColorStop(0, "#f8fafc");
      gradient.addColorStop(0.5, "#f1f5f9");
      gradient.addColorStop(1, "#e2e8f0");
    } else {
      gradient.addColorStop(0, "#fff7ed");
      gradient.addColorStop(0.5, "#ffedd5");
      gradient.addColorStop(1, "#fed7aa");
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 800);

    // Border decoration
    ctx.strokeStyle =
      activeCert.tier === "emas"
        ? "#d97706"
        : activeCert.tier === "perak"
        ? "#64748b"
        : "#b45309";
    ctx.lineWidth = 14;
    ctx.strokeRect(30, 30, 1140, 740);

    ctx.strokeStyle =
      activeCert.tier === "emas"
        ? "#f59e0b"
        : activeCert.tier === "perak"
        ? "#94a3b8"
        : "#d97706";
    ctx.lineWidth = 4;
    ctx.strokeRect(45, 45, 1110, 710);

    // Text Header
    ctx.textAlign = "center";
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("ECOBOT ACADEMY LINGKUNGAN HIDUP", 600, 110);

    ctx.font = "900 44px sans-serif";
    ctx.fillStyle =
      activeCert.tier === "emas"
        ? "#b45309"
        : activeCert.tier === "perak"
        ? "#334155"
        : "#9a3412";
    ctx.fillText("SERTIFIKAT PENGHARGAAN", 600, 175);

    ctx.font = "italic 22px sans-serif";
    ctx.fillStyle = "#64748b";
    ctx.fillText("Dengan bangga diberikan kepada pahlawan cilik bumi:", 600, 240);

    // Kid Nickname
    ctx.font = "bold 56px sans-serif";
    ctx.fillStyle = "#0f172a";
    ctx.fillText(nickname, 600, 320);

    // Title / Title honor
    ctx.font = "bold 28px sans-serif";
    ctx.fillStyle = "#0284c7";
    ctx.fillText(`"${activeCert.namaGelar}"`, 600, 380);

    // Reason description
    ctx.font = "20px sans-serif";
    ctx.fillStyle = "#334155";
    ctx.fillText(activeCert.alasan, 600, 440);
    ctx.fillText(
      "atas dedikasi aktif menjaga kebersihan lingkungan dan kelestarian bumi.",
      600,
      475
    );

    // Footer info: Serial and Date
    ctx.textAlign = "left";
    ctx.font = "18px sans-serif";
    ctx.fillStyle = "#475569";
    ctx.fillText(`Nomor Seri: ${activeCert.serial || "ECO-2026-PREVIEW"}`, 100, 680);
    ctx.fillText(`Tanggal Terbit: ${activeCert.issuedAt || "Hari ini"}`, 100, 710);

    // Stamp / Ecobot signature
    ctx.textAlign = "right";
    ctx.fillText("Ecobot & Tim Pengembang", 1100, 680);
    ctx.font = "bold 18px sans-serif";
    ctx.fillStyle = "#0284c7";
    ctx.fillText("✓ Terverifikasi Resmi", 1100, 710);

    // Export to download
    const link = document.createElement("a");
    link.download = `Sertifikat-${activeCert.tier}-${nickname}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <Card className="p-6 md:p-8 border-slate-100 shadow-sm bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl flex-shrink-0 shadow-md shadow-amber-500/20">
            📜
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-lg">
              Sertifikat Resmi Pahlawan Lingkungan
            </h3>
            <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">
              Raih sertifikat berharga dengan menyelesaikan tantangan besar!
              Setiap sertifikat memiliki nomor seri unik dan bisa diunduh
              sebagai gambar atau dicetak untuk dipajang di kamarmu.
            </p>
          </div>
        </div>
      </Card>

      {/* 3 Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certificates.map((cert) => {
          const isIssued = cert.status === "issued";
          const isEligible = cert.status === "eligible";
          const isLocked = cert.status === "locked";

          const tierTheme = {
            perunggu: {
              badge: "bg-amber-100 text-amber-900 border-amber-300",
              ring: "hover:border-amber-400",
              accent: "text-amber-800",
              iconBg: "bg-amber-100 text-amber-800",
            },
            perak: {
              badge: "bg-slate-200 text-slate-800 border-slate-300",
              ring: "hover:border-slate-400",
              accent: "text-slate-700",
              iconBg: "bg-slate-200 text-slate-700",
            },
            emas: {
              badge: "bg-yellow-200 text-yellow-900 border-yellow-400",
              ring: "hover:border-yellow-400",
              accent: "text-yellow-800",
              iconBg: "bg-yellow-100 text-yellow-800",
            },
          }[cert.tier];

          return (
            <div
              key={cert.id}
              className={`p-6 rounded-3xl border-2 flex flex-col justify-between transition-all bg-white shadow-sm ${
                isIssued
                  ? `${cert.borderClass} ${tierTheme.ring} shadow-md`
                  : isEligible
                  ? "border-emerald-400 bg-emerald-50/20 animate-pulse-gentle"
                  : "border-slate-200 bg-slate-50/60 opacity-80"
              }`}
            >
              <div>
                {/* Header status */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider border ${tierTheme.badge}`}
                  >
                    Tingkat {cert.tier}
                  </span>

                  {isIssued ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Terbit</span>
                    </span>
                  ) : isEligible ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Siap Klaim</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                      <Lock className="w-3 h-3" />
                      <span>Terkunci</span>
                    </span>
                  )}
                </div>

                {/* Certificate Icon & Title */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto shadow-inner ${tierTheme.iconBg}`}
                >
                  {cert.tier === "emas"
                    ? "🥇"
                    : cert.tier === "perak"
                    ? "🥈"
                    : "🥉"}
                </div>

                <h4 className="text-center font-extrabold text-slate-800 text-base mb-1">
                  {cert.judul}
                </h4>

                <div className="text-center text-xs font-semibold text-sky-600 mb-3">
                  Gelar: "{cert.namaGelar}"
                </div>

                <p className="text-xs text-slate-500 text-center leading-relaxed mb-4">
                  {cert.deskripsi}
                </p>

                {/* Requirements info */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs mb-4">
                  <div className="font-bold text-slate-700 mb-0.5">Syarat:</div>
                  <div className="text-slate-600">{cert.syaratTeks}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2">
                {isIssued ? (
                  <div className="space-y-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full gap-2 text-xs"
                      onClick={() => handleOpenPreview(cert)}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat & Unduh</span>
                    </Button>
                    <div className="text-[10px] text-center text-slate-400">
                      No. Seri: {cert.serial}
                    </div>
                  </div>
                ) : isEligible ? (
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full gap-2 text-xs bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => handleClaim(cert)}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Klaim Sertifikat Sekarang</span>
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled
                    className="w-full text-xs text-slate-400 bg-slate-100 cursor-not-allowed"
                  >
                    <Lock className="w-3.5 h-3.5 mr-1" />
                    <span>Belum Memenuhi Syarat</span>
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview & Print Modal */}
      {activeCert && (
        <Modal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          title="Pratinjau Sertifikat"
        >
          <div className="space-y-6">
            {/* Printable Certificate Frame */}
            <div
              ref={certRef}
              id="printable-certificate"
              className={`relative rounded-3xl p-8 text-center border-8 shadow-2xl transition-all ${
                activeCert.tier === "emas"
                  ? "bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 border-amber-500"
                  : activeCert.tier === "perak"
                  ? "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 border-slate-400"
                  : "bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 border-amber-700"
              }`}
            >
              {/* Inner decorative frame */}
              <div className="border-2 border-dashed border-amber-600/40 p-6 rounded-2xl">
                <div className="text-xs font-black tracking-widest text-slate-500 uppercase mb-2">
                  ECOBOT ACADEMY LINGKUNGAN HIDUP
                </div>

                <div className="text-2xl md:text-3xl font-black text-amber-900 tracking-tight mb-2">
                  SERTIFIKAT PENGHARGAAN
                </div>

                <p className="text-xs text-slate-600 italic mb-4">
                  Diberikan dengan penuh rasa bangga kepada:
                </p>

                <div className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
                  {nickname}
                </div>

                <div className="inline-block px-4 py-1 rounded-full bg-white/80 border border-amber-300 text-sky-700 text-sm font-bold mb-4 shadow-sm">
                  "{activeCert.namaGelar}"
                </div>

                <p className="text-xs md:text-sm text-slate-700 max-w-md mx-auto leading-relaxed mb-6">
                  {activeCert.alasan} serta komitmen nyata dalam menjaga
                  kebersihan lingkungan Kota Harapan.
                </p>

                {/* Footer seal & signatures */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-300/80 text-[11px] text-slate-600">
                  <div className="text-left space-y-0.5">
                    <div>
                      <strong>No. Seri:</strong> {activeCert.serial}
                    </div>
                    <div>
                      <strong>Diterbitkan:</strong> {activeCert.issuedAt}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                      🤖
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-800">ECOBOT Official</div>
                      <div className="text-emerald-600 font-semibold text-[10px]">
                        ✓ Terverifikasi
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <Button
                variant="ghost"
                size="md"
                onClick={() => setIsPreviewOpen(false)}
              >
                Tutup
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={handlePrint}
                  className="gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak / Simpan PDF</span>
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={handleDownloadPNG}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh PNG</span>
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Print Stylesheet */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-certificate, #printable-certificate * {
            visibility: visible;
          }
          #printable-certificate {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border-width: 8px !important;
            page-break-after: avoid;
          }
        }
      `}</style>
    </div>
  );
};
