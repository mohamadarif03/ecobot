import { useNavigate } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { LoopingVideoBackground } from '../components/LoopingVideoBackground';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import SkateDeckRailDemo from '../demo';
import { EcobotIntroSection } from '../components/landing/EcobotIntroSection';
import { HowToPlaySection } from '../components/landing/HowToPlaySection';
import { GamePreviewSection } from '../components/landing/GamePreviewSection';
import { DoodleCrewFooter } from '@/components/ui/doodle-crew-footer';
import { usePlayerStore } from '../store/playerStore';

export default function LandingPage() {
  const navigate = useNavigate();
  const { state } = usePlayerStore();

  const handleStartAdventure = () => {
    if (!state.nickname || state.nickname.trim() === '') {
      navigate('/onboarding');
    } else {
      navigate('/beranda');
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white text-[#000000] scroll-smooth font-sans">
      {/* Fixed Sticky Navbar */}
      <Navbar />

      {/* ==================== HERO SECTION CONTAINER ==================== */}
      <div className="relative min-h-screen w-full flex flex-col justify-between pt-20 sm:pt-24">
        <LoopingVideoBackground />

        <HeroSection onBeginJourney={handleStartAdventure} />

        {/* Scroll indicator to the section below */}
        <div className="relative z-10 pb-6 text-center">
          <a
            href="#fakta-sampah"
            className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#555555] hover:text-[#000000] transition-colors bg-white/70 backdrop-blur-xs px-4 py-2 rounded-full border border-black/10 shadow-2xs"
          >
            <span>Lihat berapa lama sampah terurai</span>
            <ArrowDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-black transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* ==================== 1. RAIL SAMPAH SECTION (3D SUSPENSION RAIL) ==================== */}
      <SkateDeckRailDemo id="fakta-sampah" autoplay={true} />

      {/* ==================== 2. KENALAN DENGAN ECOBOT ==================== */}
      <EcobotIntroSection />

      {/* ==================== 3. CARA BERMAIN ==================== */}
      <HowToPlaySection />

      {/* ==================== 4. PREVIEW GAME & FITUR ==================== */}
      <GamePreviewSection />

      {/* ==================== 5. FOOTER DOODLE CREW ==================== */}
      <DoodleCrewFooter
        wordmark="ECOBOT"
        brand="ECOBOT"
        blurb="Belajar jaga bumi lewat petualangan seru."
        tagline="Dunia kecil untuk pahlawan bumi masa depan."
        preset="paper"
        copyright="© 2026 ECOBOT. Semua hak dilindungi."
        columns={[
          {
            title: "NAVIGASI",
            links: [
              { label: "Beranda", href: "#home" },
              { label: "Fakta Sampah", href: "#fakta-sampah" },
              { label: "Cara Bermain", href: "#cara-bermain" },
              { label: "Kenalan Ecobot", href: "#kenalan-ecobot" },
            ],
          },
          {
            title: "BELAJAR",
            links: [
              { label: "Dashboard", href: "/beranda" },
              { label: "Pustaka Edukasi", href: "/pustaka" },
              { label: "Kuis & Tantangan", href: "/kuis" },
              { label: "Aksi Nyata", href: "/aksi-nyata" },
            ],
          },
          {
            title: "TENTANG",
            links: [
              { label: "Tentang Proyek", href: "#kenalan-ecobot" },
              { label: "Sumber Referensi Data", href: "/sumber" },
              { label: "Kebijakan Privasi", href: "/privasi" },
            ],
          },
        ]}
        actions={[
          {
            label: "Mulai Petualangan",
            href: "/beranda",
            variant: "solid",
            icon: "bolt",
            onClick: handleStartAdventure,
          },
          {
            label: "Lihat Fakta Sampah",
            href: "#fakta-sampah",
            variant: "outline",
            icon: "sparkle",
          },
        ]}
        legal={[
          { label: "Kebijakan Privasi", href: "/privasi" },
          { label: "Sumber Referensi", href: "/sumber" },
        ]}
        socials={[
          { label: "Instagram", href: "https://instagram.com" },
          { label: "YouTube", href: "https://youtube.com" },
          { label: "TikTok", href: "https://tiktok.com" },
        ]}
        backToTop={true}
        backToTopLabel="Ke atas"
      />
    </div>
  );
}
