import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePlayerStore } from '../store/playerStore';
import { EcobotMascot } from './ecobot/EcobotMascot';

interface HeroSectionProps {
  onBeginJourney?: () => void;
}

export function HeroSection({ onBeginJourney }: HeroSectionProps) {
  const navigate = useNavigate();
  const { state } = usePlayerStore();

  const handleStartAdventure = () => {
    if (onBeginJourney) {
      onBeginJourney();
      return;
    }
    if (!state.nickname || state.nickname.trim() === '') {
      navigate('/onboarding');
    } else {
      navigate('/beranda');
    }
  };

  return (
    <main
      id="home"
      className="relative z-10 flex flex-col items-center justify-center text-center px-6 pb-28 pt-10 sm:pt-16 max-w-7xl mx-auto"
    >
      {/* Main Headline (Pola kata biasa + kata italic abu-abu dari template) */}
      <h1 className="text-4xl sm:text-7xl md:text-8xl max-w-6xl font-normal font-serif leading-[1.0] tracking-[-1.2px] sm:tracking-[-2px] text-[#000000] animate-fade-rise text-balance">
        Bersihkan kota, <em className="italic text-[#6F6F6F] font-normal">selamatkan bumi,</em> bersama Ecobot.
      </h1>

      {/* Subtext */}
      <p className="text-base sm:text-xl max-w-2xl mt-6 leading-relaxed text-[#555555] font-sans font-medium animate-fade-rise-delay">
        Main game 3D seru, pilah sampah, dan belajar kenapa bumi butuh bantuanmu.
      </p>

      {/* CTA Button in Sky Blue (#22C55E) */}
      <button
        type="button"
        onClick={handleStartAdventure}
        className="rounded-full px-12 py-4 sm:py-5 text-base sm:text-lg font-black mt-10 bg-[#22C55E] hover:bg-[#4ADE80] text-slate-950 hover:scale-[1.04] shadow-lg transition-all duration-200 animate-fade-rise-delay-2 whitespace-nowrap cursor-pointer flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22C55E]"
      >
        <span>Mulai Petualangan</span>
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Floating Ecobot Mascot in Bottom Right Valley */}
      <div className="hidden lg:block absolute bottom-8 right-6 xl:right-12 z-20 pointer-events-none select-none">
        <div className="w-48 h-48 xl:w-56 xl:h-56 animate-[bounce_4s_ease-in-out_infinite] motion-reduce:animate-none filter drop-shadow-xl">
          <EcobotMascot size="hero" className="w-full h-full" />
        </div>
      </div>

      {/* 3 Cute Mini Waste Bins in the Grass Landscape (Green, Yellow, Red) */}
      <div className="relative mt-12 flex items-center justify-center gap-4 sm:gap-6 z-10 pointer-events-none select-none">
        {/* Green Organic Bin */}
        <div className="flex flex-col items-center">
          <svg className="w-8 sm:w-10 h-10 sm:h-12" viewBox="0 0 32 40" fill="none">
            <rect x="6" y="10" width="20" height="26" rx="4" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
            <path d="M4 10H28" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
            <rect x="12" y="6" width="8" height="4" rx="2" fill="#16A34A" stroke="#15803D" strokeWidth="1.5" />
            <path d="M16 18C18 18 20 20 20 23C18 23 16 25 16 25C16 25 14 23 12 23C12 20 14 18 16 18Z" fill="#DCFCE7" />
          </svg>
          <span className="text-[10px] font-black text-emerald-800 uppercase tracking-tight mt-0.5">
            Organik
          </span>
        </div>

        {/* Yellow Inorganic Bin */}
        <div className="flex flex-col items-center">
          <svg className="w-8 sm:w-10 h-10 sm:h-12" viewBox="0 0 32 40" fill="none">
            <rect x="6" y="10" width="20" height="26" rx="4" fill="#EAB308" stroke="#A16207" strokeWidth="2" />
            <path d="M4 10H28" stroke="#A16207" strokeWidth="3" strokeLinecap="round" />
            <rect x="12" y="6" width="8" height="4" rx="2" fill="#CA8A04" stroke="#A16207" strokeWidth="1.5" />
            <circle cx="16" cy="22" r="3.5" fill="#FEF08A" />
          </svg>
          <span className="text-[10px] font-black text-amber-900 uppercase tracking-tight mt-0.5">
            Anorganik
          </span>
        </div>

        {/* Red B3 Hazard Bin */}
        <div className="flex flex-col items-center">
          <svg className="w-8 sm:w-10 h-10 sm:h-12" viewBox="0 0 32 40" fill="none">
            <rect x="6" y="10" width="20" height="26" rx="4" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
            <path d="M4 10H28" stroke="#B91C1C" strokeWidth="3" strokeLinecap="round" />
            <rect x="12" y="6" width="8" height="4" rx="2" fill="#DC2626" stroke="#B91C1C" strokeWidth="1.5" />
            <path d="M16 18L13 24H19L16 18Z" fill="#FEE2E2" />
          </svg>
          <span className="text-[10px] font-black text-rose-900 uppercase tracking-tight mt-0.5">
            B3 Limbah
          </span>
        </div>
      </div>
    </main>
  );
}
