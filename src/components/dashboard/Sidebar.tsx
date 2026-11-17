import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Gamepad2,
  BookOpen,
  Leaf,
  Home,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { MENU_GROUPS } from "../../config/navigation";
import { usePlayerStore, selectClaimableCount } from "../../store/playerStore";
import { calculateLevel } from "../../data/levels";
import { EcobotMascot } from "../ecobot/EcobotMascot";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = usePlayerStore();
  const levelInfo = calculateLevel(state.xp);

  // Calculate badges for groups (single source of truth: all claimable missions and chests)
  const claimableMissionsCount = selectClaimableCount(state);
  const newBadgesCount = state.badges.length;

  // Track accordion open state per group - only open the group that owns the active route.
  // When on /beranda or any standalone page, all accordion groups remain collapsed.
  const getInitialOpenState = (pathname: string): Record<string, boolean> => {
    const activeGroup = MENU_GROUPS.find((g) =>
      g.items.some((item) => item.path === pathname)
    );
    const result: Record<string, boolean> = {};
    for (const group of MENU_GROUPS) {
      result[group.id] = activeGroup ? activeGroup.id === group.id : false;
    }
    return result;
  };

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    getInitialOpenState(location.pathname)
  );

  // Automatically update accordion groups when navigating
  useEffect(() => {
    setOpenGroups(getInitialOpenState(location.pathname));
  }, [location.pathname]);

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const renderGroupIcon = (iconName: string) => {
    switch (iconName) {
      case "joystick":
        return <Gamepad2 className="w-4 h-4" />;
      case "book":
        return <BookOpen className="w-4 h-4" />;
      case "leaf":
      default:
        return <Leaf className="w-4 h-4" />;
    }
  };

  const isHomeActive = location.pathname === "/beranda";

  return (
    <aside
      id="sidebar"
      className={`${
        isCollapsed ? "w-[84px]" : "w-[262px]"
      } shrink-0 bg-white rounded-[26px] p-3.5 flex flex-col justify-between shadow-[0_2px_12px_rgba(14,165,233,0.06)] border border-sky-100/90 transition-all duration-300 select-none`}
    >
      {/* Top Section: Brand + Navigation */}
      <div>
        {/* Brand Header Card */}
        <Link
          to="/beranda"
          title="Kembali ke Beranda ECOBOT"
          className="relative rounded-[20px] bg-gradient-to-br from-[#38BDF8] via-[#22B8F0] to-[#0EA5E9] p-4 h-[98px] overflow-hidden flex flex-col justify-center shadow-xs block group"
        >
          {/* Decorative background circles */}
          <div className="w-10 h-10 rounded-full bg-sky-200/35 absolute top-2 right-14 pointer-events-none"></div>
          <div className="w-6 h-6 rounded-full bg-emerald-400/70 absolute top-3.5 right-14 pointer-events-none"></div>
          <div className="w-16 h-16 rounded-full bg-sky-300/30 absolute -bottom-4 right-12 pointer-events-none"></div>

          {!isCollapsed ? (
            <>
              {/* Brand Title & Small Icon */}
              <div className="relative z-10 flex items-center gap-2">
                <div className="w-7 h-7 rounded-[8px] bg-sky-100/95 border border-white/80 flex items-center justify-center shadow-2xs shrink-0 overflow-hidden">
                  <EcobotMascot size="mini" className="w-6 h-6" />
                </div>
                <span className="text-[19px] font-black text-slate-950 tracking-tight leading-none group-hover:text-white transition-colors">
                  ECOBOT
                </span>
              </div>
              <span className="relative z-10 text-[11.5px] font-bold text-slate-900/85 mt-1.5 ml-0.5 truncate">
                Petualangan Kota Bersih
              </span>

              {/* Peeking Ecobot Mascot */}
              <div className="w-[78px] h-[86px] absolute -bottom-2 -right-1 z-10 pointer-events-none">
                <EcobotMascot size="sidebar" className="w-full h-full" />
              </div>
            </>
          ) : (
            <div className="relative z-10 flex items-center justify-center">
              <EcobotMascot size="mini" className="w-8 h-8" />
            </div>
          )}
        </Link>

        {/* Top Single Item: Beranda */}
        <Link
          to="/beranda"
          className={`w-full mt-4 flex items-center gap-3 px-2.5 py-2 rounded-2xl transition group ${
            isHomeActive
              ? "bg-sky-500 text-white font-bold shadow-sm"
              : "hover:bg-sky-50/80 text-slate-700"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition border ${
              isHomeActive
                ? "bg-white text-sky-600 border-white/20 shadow-2xs"
                : "bg-[#F0F8FF] text-sky-700 border-sky-100/80 group-hover:bg-sky-100"
            }`}
          >
            <Home className="w-4 h-4" />
          </div>
          {!isCollapsed && (
            <span
              className={`text-[13.5px] ${
                isHomeActive
                  ? "font-bold text-white"
                  : "font-bold text-slate-700 group-hover:text-slate-900"
              }`}
            >
              Beranda
            </span>
          )}
        </Link>

        {/* Section Label: DAFTAR MENU */}
        {!isCollapsed && (
          <div className="mt-4 mb-2 px-2.5 flex items-center justify-between">
            <span className="text-[10.5px] font-extrabold tracking-wider text-slate-400 uppercase">
              DAFTAR MENU
            </span>
            <span className="text-[11px] font-medium text-slate-400">
              {MENU_GROUPS.length} grup
            </span>
          </div>
        )}

        {/* Accordion Menu Groups */}
        <div className="space-y-1.5 mt-1">
          {MENU_GROUPS.map((group) => {
            const isOpen = openGroups[group.id] ?? false;
            const hasActiveChild = group.items.some((item) => item.path === location.pathname);

            // Calculate badge for group
            let groupBadgeNumber = group.items.length;
            if (group.id === "petualangan" && claimableMissionsCount > 0) {
              groupBadgeNumber = claimableMissionsCount;
            } else if (group.id === "aksi-hadiah" && newBadgesCount > 0) {
              groupBadgeNumber = newBadgesCount;
            }

            return (
              <div
                key={group.id}
                className={`rounded-[20px] transition-colors border ${
                  isOpen || hasActiveChild
                    ? "bg-[#F4F9FF] p-2 border-sky-100/70"
                    : "p-1 border-transparent"
                }`}
              >
                {/* Group Trigger */}
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center justify-between px-1.5 py-1 rounded-xl text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-2xs transition ${
                        isOpen || hasActiveChild
                          ? "bg-[#38BDF8] text-slate-950"
                          : "bg-[#F0F8FF] text-sky-700 border border-sky-100/80"
                      }`}
                    >
                      {renderGroupIcon(group.iconName)}
                    </div>
                    {!isCollapsed && (
                      <span className="text-[13.5px] font-bold text-slate-800">
                        {group.title}
                      </span>
                    )}
                  </div>

                  {!isCollapsed && (
                    <div className="flex items-center gap-1.5 pr-1">
                      <span className="w-5 h-5 rounded-full bg-white border border-sky-100 text-[11px] font-bold text-slate-600 flex items-center justify-center shadow-2xs">
                        {groupBadgeNumber}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  )}
                </button>

                {/* Submenu Items */}
                {!isCollapsed && isOpen && (
                  <div className="mt-2 space-y-1 pl-2.5 pr-1 pb-1">
                    {group.items.map((subItem) => {
                      const isActive = location.pathname === subItem.path;

                      let badgeText: string | null = null;
                      if (subItem.badgeKey === "claimableMissions" && claimableMissionsCount > 0) {
                        badgeText = `${claimableMissionsCount}`;
                      } else if (subItem.badgeKey === "newBadges" && newBadgesCount > 0) {
                        badgeText = `${newBadgesCount}`;
                      }

                      return (
                        <Link
                          key={subItem.id}
                          to={subItem.path}
                          className={`w-full flex items-center justify-between text-[13px] px-3.5 py-2 rounded-[13px] transition ${
                            isActive
                              ? "bg-sky-500 text-white font-bold shadow-sm"
                              : "text-slate-600 hover:text-slate-900 hover:bg-white/70 font-medium"
                          }`}
                        >
                          <span className="truncate">{subItem.label}</span>

                          {subItem.isSpecial ? (
                            <span
                              className={`text-[10px] uppercase tracking-wider font-black px-2 py-0.5 rounded-full shadow-2xs ${
                                isActive
                                  ? "bg-white text-sky-600"
                                  : "bg-sky-100 text-sky-700 border border-sky-200"
                              }`}
                            >
                              Mulai
                            </span>
                          ) : badgeText ? (
                            <span
                              className={`text-[10.5px] font-extrabold px-1.5 py-0.2 rounded-full ${
                                isActive
                                  ? "bg-white text-emerald-600 shadow-2xs"
                                  : "bg-[#22C55E] text-white"
                              }`}
                            >
                              {badgeText}
                            </span>
                          ) : null}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-sky-100/90 my-3 mx-2"></div>

        {/* Settings & Guide Links */}
        <div className="space-y-1">
          <Link
            to="/pengaturan"
            className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-2xl transition group ${
              location.pathname === "/pengaturan"
                ? "bg-sky-500 text-white font-bold shadow-sm"
                : "hover:bg-sky-50/70 text-slate-700"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition border ${
                location.pathname === "/pengaturan"
                  ? "bg-white text-sky-600 border-white/20 shadow-2xs"
                  : "bg-[#F0F8FF] text-sky-700 border-sky-100/80 group-hover:bg-sky-100"
              }`}
            >
              <Settings className="w-4 h-4" />
            </div>
            {!isCollapsed && (
              <span
                className={`text-[13.5px] ${
                  location.pathname === "/pengaturan"
                    ? "font-bold text-white"
                    : "font-semibold text-slate-700 group-hover:text-slate-900"
                }`}
              >
                Pengaturan
              </span>
            )}
          </Link>

          <Link
            to="/bantuan"
            className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-2xl transition group ${
              location.pathname === "/bantuan"
                ? "bg-sky-500 text-white font-bold shadow-sm"
                : "hover:bg-sky-50/70 text-slate-700"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition border ${
                location.pathname === "/bantuan"
                  ? "bg-white text-sky-600 border-white/20 shadow-2xs"
                  : "bg-[#F0F8FF] text-sky-700 border-sky-100/80 group-hover:bg-sky-100"
              }`}
            >
              <HelpCircle className="w-4 h-4" />
            </div>
            {!isCollapsed && (
              <span
                className={`text-[13.5px] ${
                  location.pathname === "/bantuan"
                    ? "font-bold text-white"
                    : "font-semibold text-slate-700 group-hover:text-slate-900"
                }`}
              >
                Bantuan
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Bottom User Profile Card */}
      <div className="mt-6 bg-[#E6F4FE] border border-sky-200/80 rounded-[18px] p-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full bg-[#38BDF8] text-slate-950 font-extrabold text-[15px] flex items-center justify-center shrink-0 shadow-2xs">
            {state.avatar || "🤖"}
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="text-[13px] font-extrabold text-slate-900 truncate leading-tight">
                {state.nickname || "Pahlawan Cilik"}
              </p>
              <p className="text-[11px] font-bold text-sky-700 leading-tight mt-0.5 truncate">
                Level {levelInfo.level} · {levelInfo.title}
              </p>
            </div>
          )}
        </div>

        <button
          type="button"
          title="Keluar ke Halaman Utama"
          onClick={() => navigate("/")}
          className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-sky-200/50 transition shrink-0 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
