import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Gamepad2,
  BookOpen,
  HelpCircle,
  Trophy,
  MoreHorizontal,
  X,
  Target,
  Leaf,
  ShoppingBag,
  Award,
  Settings,
} from "lucide-react";
import { BOTTOM_NAV_ITEMS, OTHER_MENU_ITEMS } from "../../config/navigation";
import { usePlayerStore } from "../../store/playerStore";
import { calculateLevel } from "../../data/levels";

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { state } = usePlayerStore();
  const levelInfo = calculateLevel(state.xp);

  const renderIcon = (name: string, active: boolean) => {
    const cls = `w-5 h-5 ${active ? "text-sky-600 stroke-[2.4]" : "text-slate-500"}`;
    switch (name) {
      case "home":
        return <Home className={cls} />;
      case "game":
        return <Gamepad2 className={cls} />;
      case "book":
        return <BookOpen className={cls} />;
      case "quiz":
        return <HelpCircle className={cls} />;
      case "trophy":
        return <Trophy className={cls} />;
      default:
        return <Home className={cls} />;
    }
  };

  const renderOtherIcon = (name: string) => {
    switch (name) {
      case "target":
        return <Target className="w-5 h-5 text-emerald-600" />;
      case "leaf":
        return <Leaf className="w-5 h-5 text-green-600" />;
      case "shop":
        return <ShoppingBag className="w-5 h-5 text-amber-600" />;
      case "podium":
        return <Award className="w-5 h-5 text-indigo-600" />;
      case "settings":
        return <Settings className="w-5 h-5 text-slate-600" />;
      case "help":
      default:
        return <HelpCircle className="w-5 h-5 text-sky-600" />;
    }
  };

  return (
    <>
      {/* Fixed Bottom Navigation Bar on Mobile */}
      <nav
        aria-label="Navigasi Bawah Mobile"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-sky-100 shadow-[0_-4px_16px_rgba(14,165,233,0.08)] px-2 py-1.5 flex items-center justify-around"
      >
        {BOTTOM_NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition ${
                isActive ? "text-sky-600 font-extrabold" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${
                  isActive ? "bg-sky-100 shadow-2xs" : ""
                }`}
              >
                {renderIcon(item.icon, isActive)}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Lainnya Button */}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-2xl text-slate-500 hover:text-slate-900 cursor-pointer ${
            drawerOpen ? "text-sky-600 font-extrabold" : ""
          }`}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center">
            <MoreHorizontal className="w-5 h-5 text-slate-500" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-medium">Lainnya</span>
        </button>
      </nav>

      {/* "Lainnya" Drawer Modal */}
      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="bg-white rounded-t-[28px] p-5 shadow-2xl border-t border-sky-100 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-sky-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-base">
                  {state.avatar || "🤖"}
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-slate-900 leading-tight">
                    {state.nickname || "Pahlawan Cilik"}
                  </h4>
                  <p className="text-[11px] font-bold text-sky-700">
                    Level {levelInfo.level} · {levelInfo.title}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Menu Items Grid */}
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {OTHER_MENU_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition ${
                    location.pathname === item.path
                      ? "bg-sky-50 border-sky-200 font-bold text-sky-950"
                      : "bg-[#F8FAFC] hover:bg-sky-50/70 border-slate-100 text-slate-700"
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-2xs shrink-0">
                    {renderOtherIcon(item.icon)}
                  </div>
                  <span className="text-[12.5px] font-bold leading-tight">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Back to Home landing link */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/"
                onClick={() => setDrawerOpen(false)}
                className="text-xs font-semibold text-slate-500 hover:text-black flex items-center gap-1.5"
              >
                <span>← Kembali ke Halaman Utama (/)</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
