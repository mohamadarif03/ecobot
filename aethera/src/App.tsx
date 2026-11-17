import { useState } from 'react';
import { LoopingVideoBackground } from './components/LoopingVideoBackground';
import { Navbar, NavSection } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SectionOverlay } from './components/SectionOverlay';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('Home');
  const [journeyOpen, setJourneyOpen] = useState(false);

  const handleSelectSection = (section: NavSection) => {
    setJourneyOpen(false);
    setActiveSection(section);
  };

  const handleOpenJourney = () => {
    setJourneyOpen(true);
  };

  const handleCloseOverlay = () => {
    setJourneyOpen(false);
    setActiveSection('Home');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-[#000000]">
      <LoopingVideoBackground />

      <Navbar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onBeginJourney={handleOpenJourney}
      />

      <HeroSection onBeginJourney={handleOpenJourney} />

      <SectionOverlay
        activeSection={activeSection}
        journeyOpen={journeyOpen}
        onClose={handleCloseOverlay}
        onOpenJourney={handleOpenJourney}
      />
    </div>
  );
}
