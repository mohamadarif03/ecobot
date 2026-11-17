import { useState } from 'react';
import { Menu, X, Bot, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePlayerStore } from '../store/playerStore';

export type NavItem =
  | 'Beranda'
  | 'Fakta Sampah'
  | 'Kenalan Ecobot'
  | 'Cara Bermain'
  | 'Fitur'
  | 'Tentang';
export type NavSection = NavItem | 'Home' | 'Studio' | 'About' | 'Journal' | 'Reach Us';

interface NavLinkConfig {
  label: NavItem;
  href: string;
}

const NAV_LINKS: NavLinkConfig[] = [
  { label: 'Beranda', href: '#home' },
  { label: 'Fakta Sampah', href: '#fakta-sampah' },
  { label: 'Kenalan Ecobot', href: '#kenalan-ecobot' },
  { label: 'Cara Bermain', href: '#cara-bermain' },
  { label: 'Fitur', href: '#fitur' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { state } = usePlayerStore();

  const handleStartAdventure = () => {
    if (!state.nickname || state.nickname.trim() === '') {
      navigate('/onboarding');
    } else {
      navigate('/beranda');
    }
  };

  const handleScrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 72;
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementTop - navHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-black/5 shadow-2xs transition-all duration-200">
      <div className="flex items-center justify-between gap-6 px-6 sm:px-8 py-3.5 sm:py-4 max-w-7xl mx-auto">
        {/* Brand Logo ECOBOT */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-2xl sm:text-3xl tracking-tight font-black font-sans text-[#000000] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#000000] group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-400 to-sky-500 flex items-center justify-center text-slate-950 shadow-2xs group-hover:scale-105 transition">
            <Bot className="w-5 h-5 text-slate-950" />
          </div>
          <span>ECOBOT</span>
        </a>

        {/* Desktop Primary Navigation */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-6"
        >
          {NAV_LINKS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleScrollToSection(item.href)}
              className="text-sm font-bold text-[#6F6F6F] hover:text-[#000000] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#000000]"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Primary Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleStartAdventure}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 rounded-full px-7 py-3 text-sm font-black bg-[#5BC0EB] hover:bg-[#38BDF8] text-slate-950 shadow-sm hover:scale-[1.03] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5BC0EB]"
          >
            <span>Mulai Petualangan</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full text-[#000000] hover:bg-black/5 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute inset-x-4 top-20 z-30 rounded-3xl bg-white/95 backdrop-blur-xl border border-sky-100 p-6 shadow-xl">
          <nav aria-label="Navigasi Menu Mobile" className="flex flex-col gap-4">
            {NAV_LINKS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleScrollToSection(item.href)}
                className="text-left text-base font-bold text-[#6F6F6F] hover:text-[#000000] py-1 cursor-pointer"
              >
                {item.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleStartAdventure();
              }}
              className="mt-2 w-full text-center rounded-full py-3.5 text-sm font-black bg-[#5BC0EB] text-slate-950 shadow-md cursor-pointer"
            >
              Mulai Petualangan
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
