interface HeroSectionProps {
  onBeginJourney: () => void;
}

export function HeroSection({ onBeginJourney }: HeroSectionProps) {
  return (
    <main
      id="home"
      className="relative z-10 flex flex-col items-center justify-center text-center px-6 pb-40"
      style={{ paddingTop: 'calc(8rem - 75px)' }}
    >
      <h1 className="text-5xl sm:text-7xl md:text-8xl max-w-7xl font-normal font-serif leading-[0.95] tracking-[-1.2px] sm:tracking-[-1.8px] md:tracking-[-2.46px] text-[#000000] animate-fade-rise text-balance">
        Beyond <em className="italic text-[#6F6F6F] font-normal">silence,</em> we
        build <em className="italic text-[#6F6F6F] font-normal">the eternal.</em>
      </h1>

      <p className="text-base sm:text-lg max-w-2xl mt-8 leading-relaxed text-[#6F6F6F] animate-fade-rise-delay">
        Building platforms for brilliant minds, fearless makers, and thoughtful
        souls. Through the noise, we craft digital havens for deep work and
        pure flows.
      </p>

      <button
        type="button"
        onClick={onBeginJourney}
        className="rounded-full px-14 py-5 text-base mt-12 bg-[#000000] text-[#FFFFFF] hover:scale-[1.03] transition-transform duration-200 animate-fade-rise-delay-2 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#000000]"
      >
        Begin Journey
      </button>
    </main>
  );
}
