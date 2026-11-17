import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayerStore } from "../store/playerStore";
import { EcobotMascot } from "../components/ecobot/EcobotMascot";
import { Sparkles, ArrowRight } from "lucide-react";
import { AVATAR_OPTIONS, validateNickname } from "../data/pengaturan/profile.ts";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { state, setNickname } = usePlayerStore();
  const [nameInput, setNameInput] = useState(state.nickname || "Raka");
  const [selectedAvatar, setSelectedAvatar] = useState(state.avatar || "🤖");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateNickname(nameInput);
    if (!res.valid) {
      setErrorMsg(res.error || "Yuk tulis nama panggilanmu dulu!");
      return;
    }
    setNickname(res.sanitized!, selectedAvatar);
    navigate("/beranda");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E0F2FE] via-[#EBF5FD] to-white flex items-center justify-center p-4">
      <div className="w-full max-w-[480px] bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(14,165,233,0.12)] border border-sky-100 text-center relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 inset-x-0 h-2.5 bg-gradient-to-r from-sky-400 via-emerald-400 to-sky-500"></div>

        {/* Mascot */}
        <div className="w-24 h-24 mx-auto mb-3">
          <EcobotMascot size="hero" className="w-full h-full" />
        </div>

        <span className="inline-block text-xs font-black uppercase tracking-wider text-sky-700 bg-sky-100/80 px-3 py-1 rounded-full mb-2">
          Selamat Datang di ECOBOT
        </span>

        <h2 className="text-[24px] sm:text-[28px] font-black text-slate-900 tracking-tight leading-tight">
          Ayo Mulai Petualanganmu!
        </h2>
        <p className="text-[14px] text-slate-500 mt-1 mb-6">
          Bantu Ecobot membersihkan kota dan jadi Pahlawan Lingkungan cilik!
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          {/* Nickname Input */}
          <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1.5">
              Siapa nama panggilanmu?
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
                setErrorMsg("");
              }}
              placeholder="Contoh: Raka, Alya, Budi..."
              maxLength={16}
              className="w-full bg-[#F3F9FF] border border-sky-100 focus:border-sky-400 focus:ring-4 focus:ring-sky-100/60 rounded-2xl px-4 py-3 text-[15px] font-bold text-slate-900 outline-none transition"
              autoFocus
            />
            {errorMsg && (
              <p className="text-xs font-bold text-rose-500 mt-1.5">{errorMsg}</p>
            )}
          </div>

          {/* Avatar Selection */}
          <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-2">
              Pilih karakter avatarmu:
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {AVATAR_OPTIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedAvatar(item.icon)}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center transition cursor-pointer ${
                    selectedAvatar === item.icon
                      ? "border-sky-500 bg-sky-50 shadow-xs scale-105"
                      : "border-slate-100 bg-[#F8FAFC] hover:border-sky-200"
                  }`}
                >
                  <span className="text-2xl mb-1">{item.icon}</span>
                  <span className="text-[10px] font-bold text-slate-600 truncate w-full text-center">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-slate-950 font-black text-[15px] py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Masuk ke Dashboard</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
}
