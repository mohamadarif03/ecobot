import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export type NavSection = 'Home' | 'Studio' | 'About' | 'Journal' | 'Reach Us';

const MENU_ITEMS: NavSection[] = ['Home', 'Studio', 'About', 'Journal', 'Reach Us'];

interface NavbarProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  onBeginJourney: () => void;
}

export function Navbar({
  activeSection,
  onSelectSection,
  onBeginJourney,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (section: NavSection) => {
    onSelectSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative z-10 w-full">
      <div className="flex items-center justify-between gap-8 px-8 py-6 max-w-7xl mx-auto">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('Home');
          }}
          className="text-3xl tracking-tight font-serif text-[#000000] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#000000]"
        >
          Aethera<sup className="text-xs align-super ml-0.5">®</sup>
        </a>

        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8"
        >
          {MENU_ITEMS.map((item) => {
            const isActive = activeSection === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => handleNavClick(item)}
                aria-current={isActive ? 'page' : undefined}
                className={`text-sm transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#000000] ${
                  isActive
                    ? 'text-[#000000]'
                    : 'text-[#6F6F6F] hover:text-[#000000]'
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onBeginJourney}
            className="hidden sm:inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm bg-[#000000] text-[#FFFFFF] hover:scale-[1.03] transition-transform duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#000000]"
          >
            Begin Journey
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full text-[#000000] hover:bg-black/5 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute inset-x-4 top-20 z-20 rounded-2xl bg-white/95 backdrop-blur-xl border border-black/10 p-6 shadow-lg">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-4">
            {MENU_ITEMS.map((item) => {
              const isActive = activeSection === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className={`text-left text-base py-1 transition-colors cursor-pointer ${
                    isActive ? 'text-[#000000] font-medium' : 'text-[#6F6F6F]'
                  }`}
                >
                  {item}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onBeginJourney();
              }}
              className="mt-2 w-full rounded-full px-6 py-3 text-sm bg-[#000000] text-[#FFFFFF] hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
            >
              Begin Journey
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
