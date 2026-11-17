import React from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "./DashboardLayout";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";
import { EcobotMascot } from "../ecobot/EcobotMascot";

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  moduleName: string;
  description: string;
  actionText?: string;
  actionDisabled?: boolean;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  subtitle,
  icon,
  moduleName,
  description,
  actionText,
  actionDisabled = true,
}) => {
  return (
    <DashboardLayout title={title} subtitle={subtitle}>
      <div className="bg-white rounded-[26px] p-8 sm:p-12 shadow-[0_2px_12px_rgba(14,165,233,0.05)] border border-sky-100/80 flex flex-col items-center justify-center text-center min-h-[460px]">
        {/* Module Icon and Mascot Illustration */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full bg-[#E0F2FE] text-sky-600 flex items-center justify-center shadow-inner">
            {icon}
          </div>
          <div className="w-14 h-14 absolute -bottom-2 -right-3 pointer-events-none">
            <EcobotMascot size="mini" className="w-full h-full" />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200/80 mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>Fase Pengembangan</span>
        </div>

        {/* Title */}
        <h3 className="text-[22px] sm:text-[24px] font-black text-slate-900 tracking-tight">
          {moduleName} Segera Hadir!
        </h3>

        {/* Description */}
        <p className="text-[14px] sm:text-[15px] text-slate-500 max-w-[480px] leading-relaxed mt-2.5">
          {description}
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          {actionText && (
            <button
              type="button"
              disabled={actionDisabled}
              className={`font-black text-[14px] px-6 py-3 rounded-full flex items-center gap-2 shadow-sm transition ${
                actionDisabled
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed opacity-80"
                  : "bg-sky-500 hover:bg-sky-600 text-white cursor-pointer"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{actionText} (Segera)</span>
            </button>
          )}

          <Link
            to="/beranda"
            className="bg-[#E0F2FE] hover:bg-[#BAE6FD] text-slate-900 font-bold text-[14px] px-6 py-3 rounded-full flex items-center gap-2 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};
