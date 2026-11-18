import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, HelpCircle, PanelLeft } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { onNewAchievementUnlocked } from "../../store/playerStore";

interface DashboardLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  rightAction?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title,
  subtitle,
  children,
  rightAction,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  useEffect(() => {
    const unsubscribe = onNewAchievementUnlocked((badge) => {
      triggerToast(
        `🏆 Lencana Baru: ${badge.nama}! Ecobot bangga padamu!`
      );
    });
    return unsubscribe;
  }, []);

  return (
    <div className="h-screen bg-[#F0FDF4] text-slate-800 font-sans p-3 sm:p-5 flex gap-4 lg:gap-5 relative overflow-hidden">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-slate-900/90 backdrop-blur-md text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-2xl shadow-xl border border-white/20 transition-all animate-bounce">
          {toastMsg}
        </div>
      )}

      {/* Left Sidebar on Desktop & Tablet (Fixed in viewport with independent internal scroll) */}
      <div className="hidden md:flex shrink-0 h-full">
        <Sidebar
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
        />
      </div>

      {/* Main Content Area (Independent scroll container) */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto pr-1 lg:pr-2 pb-20 md:pb-6 custom-sidebar-scroll">
        {/* Top Bar Header */}
        <header className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3.5">
            {/* Sidebar toggle button (desktop) */}
            <button
              type="button"
              onClick={() => setIsCollapsed((prev) => !prev)}
              title={isCollapsed ? "Buka Sidebar" : "Ciutkan Sidebar"}
              className="w-10 h-10 rounded-full bg-white border border-emerald-100 shadow-2xs hidden md:flex items-center justify-center text-slate-700 hover:bg-emerald-50 transition shrink-0 cursor-pointer"
            >
              <PanelLeft className="w-[18px] h-[18px]" />
            </button>

            <div>
              <h1 className="text-[22px] sm:text-[24px] font-black text-slate-900 tracking-tight leading-snug">
                {title}
              </h1>
              <p className="text-[13px] sm:text-[14px] font-medium text-slate-500 line-clamp-1">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Right Action Circular Buttons */}
          <div className="flex items-center gap-2">
            {rightAction}

            <Link
              to="/bantuan"
              className="w-10 h-10 rounded-full bg-white border border-emerald-100 shadow-2xs flex items-center justify-center text-slate-700 hover:bg-emerald-50 transition relative cursor-pointer"
              title="Bantuan & Panduan Ecobot"
            >
              <HelpCircle className="w-[18px] h-[18px]" />
            </Link>

            <button
              type="button"
              onClick={() => triggerToast("Semua misi harian siap dikerjakan!")}
              className="w-10 h-10 rounded-full bg-white border border-emerald-100 shadow-2xs flex items-center justify-center text-slate-700 hover:bg-emerald-50 transition relative cursor-pointer"
              title="Notifikasi"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] absolute top-1 right-1 ring-2 ring-white"></span>
              <Bell className="w-[18px] h-[18px]" />
            </button>
          </div>
        </header>

        {/* Page Main Workspace Content */}
        <div className="mt-4">{children}</div>
      </main>

      {/* Mobile Bottom Navigation (only on screens < 768px) */}
      <MobileBottomNav />
    </div>
  );
};
