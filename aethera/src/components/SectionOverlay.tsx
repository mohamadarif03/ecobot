import { useEffect, useState } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';
import { NavSection } from './Navbar';
import { validateJourneyForm, validateReachUsForm } from '../utils/videoLoop';

interface SectionOverlayProps {
  activeSection: NavSection;
  journeyOpen: boolean;
  onClose: () => void;
  onOpenJourney: () => void;
}

const STUDIO_PRACTICES = [
  {
    index: '01',
    title: 'Digital Havens',
    detail:
      'Calm, distraction-free web environments engineered for sustained concentration and long-form craft.',
  },
  {
    index: '02',
    title: 'Editorial Interfaces',
    detail:
      'Typographic precision paired with deliberate pacing, optical balance, and enduring structural clarity.',
  },
  {
    index: '03',
    title: 'Pure Flow Systems',
    detail:
      'Low-latency tools and tactile interactions designed to stay invisible while creative work happens.',
  },
];

const JOURNAL_ENTRIES = [
  {
    date: 'October 2026',
    topic: 'Architecture',
    title: 'Designing Software That Respects Quiet Attention',
    excerpt:
      'Why removing persistent chrome and sensory clutter restores cognitive depth across modern tools.',
  },
  {
    date: 'September 2026',
    topic: 'Typography',
    title: 'Contrast, Rhythm, and the Poetics of White Space',
    excerpt:
      'Lessons from classical print grids applied to fluid, high-density digital workspaces.',
  },
];

const FOCUS_OPTIONS = ['Digital Haven', 'Product Architecture', 'Creative Systems'];

export function SectionOverlay({
  activeSection,
  journeyOpen,
  onClose,
  onOpenJourney,
}: SectionOverlayProps) {
  const [journeyName, setJourneyName] = useState('');
  const [journeyEmail, setJourneyEmail] = useState('');
  const [journeyFocus, setJourneyFocus] = useState(FOCUS_OPTIONS[0]);
  const [journeyErrors, setJourneyErrors] = useState<Record<string, string>>({});
  const [journeySubmitted, setJourneySubmitted] = useState(false);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const isVisible = journeyOpen || activeSection !== 'Home';

  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onClose]);

  if (!isVisible) {
    return null;
  }

  const handleJourneySubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = validateJourneyForm({
      name: journeyName,
      email: journeyEmail,
      focus: journeyFocus,
    });
    if (!result.valid) {
      setJourneyErrors(result.errors as Record<string, string>);
      return;
    }
    setJourneyErrors({});
    setJourneySubmitted(true);
  };

  const handleContactSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = validateReachUsForm({
      name: contactName,
      email: contactEmail,
      message: contactMessage,
    });
    if (!result.valid) {
      setContactErrors(result.errors as Record<string, string>);
      return;
    }
    setContactErrors({});
    setContactSubmitted(true);
  };

  const resetAndClose = () => {
    setJourneySubmitted(false);
    setContactSubmitted(false);
    setJourneyErrors({});
    setContactErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={journeyOpen ? 'Begin Journey' : activeSection}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          resetAndClose();
        }
      }}
    >
      <div className="relative w-full max-w-2xl rounded-3xl bg-white/95 backdrop-blur-xl border border-black/10 p-8 sm:p-10 shadow-2xl text-left">
        <button
          type="button"
          onClick={resetAndClose}
          aria-label="Close dialog"
          className="absolute top-6 right-6 inline-flex items-center justify-center w-10 h-10 rounded-full text-[#6F6F6F] hover:text-[#000000] hover:bg-black/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {journeyOpen ? (
          <div>
            <p className="text-xs text-[#6F6F6F]">
              Commission &amp; Onboarding
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-serif text-[#000000]">
              Begin your journey with Aethera
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6F6F6F] leading-relaxed">
              Share your vision and we will prepare a dedicated studio session
              for your platform.
            </p>

            {journeySubmitted ? (
              <div className="mt-8 rounded-2xl border border-black/10 bg-black/[0.02] p-6">
                <div className="flex items-center gap-3 text-[#000000]">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#000000] text-[#FFFFFF]">
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="font-serif text-2xl">
                    Invitation received
                  </span>
                </div>
                <p className="mt-3 text-sm text-[#6F6F6F] leading-relaxed">
                  Thank you, {journeyName}. Our studio partners will reach out
                  to <span className="text-[#000000]">{journeyEmail}</span>{' '}
                  regarding {journeyFocus}.
                </p>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="mt-6 rounded-full px-8 py-3 text-sm bg-[#000000] text-[#FFFFFF] hover:scale-[1.03] transition-transform duration-200 cursor-pointer"
                >
                  Return to Hero
                </button>
              </div>
            ) : (
              <form onSubmit={handleJourneySubmit} className="mt-6 space-y-5" noValidate>
                <div>
                  <label className="block text-xs text-[#6F6F6F] mb-2">
                    Primary Focus
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {FOCUS_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setJourneyFocus(option)}
                        className={`rounded-full px-4 py-2 text-xs transition-colors cursor-pointer ${
                          journeyFocus === option
                            ? 'bg-[#000000] text-[#FFFFFF]'
                            : 'bg-black/5 text-[#6F6F6F] hover:text-[#000000]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="journey-name"
                      className="block text-xs text-[#6F6F6F] mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="journey-name"
                      type="text"
                      value={journeyName}
                      onChange={(e) => setJourneyName(e.target.value)}
                      placeholder="Elena Vance"
                      className="w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm text-[#000000] placeholder:text-[#6F6F6F]/60 focus:border-[#000000] focus:outline-none"
                    />
                    {journeyErrors.name && (
                      <p className="mt-1 text-xs text-red-600">{journeyErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="journey-email"
                      className="block text-xs text-[#6F6F6F] mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="journey-email"
                      type="email"
                      value={journeyEmail}
                      onChange={(e) => setJourneyEmail(e.target.value)}
                      placeholder="elena@studio.com"
                      className="w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm text-[#000000] placeholder:text-[#6F6F6F]/60 focus:border-[#000000] focus:outline-none"
                    />
                    {journeyErrors.email && (
                      <p className="mt-1 text-xs text-red-600">{journeyErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="rounded-full px-6 py-2.5 text-sm text-[#6F6F6F] hover:text-[#000000] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm bg-[#000000] text-[#FFFFFF] hover:scale-[1.03] transition-transform duration-200 cursor-pointer"
                  >
                    Request Studio Session
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : activeSection === 'Studio' ? (
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#000000]">
              Studio Practice
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6F6F6F] leading-relaxed">
              We partner with founders, researchers, and cultural institutions
              to shape enduring software built for calm focus.
            </p>
            <div className="mt-8 divide-y divide-black/10">
              {STUDIO_PRACTICES.map((item) => (
                <div key={item.index} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs text-[#6F6F6F] tabular-nums">
                      {item.index}.
                    </span>
                    <h3 className="text-xl font-serif text-[#000000]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 pl-6 text-sm text-[#6F6F6F] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={onOpenJourney}
                className="rounded-full px-7 py-3 text-sm bg-[#000000] text-[#FFFFFF] hover:scale-[1.03] transition-transform duration-200 cursor-pointer"
              >
                Begin Journey
              </button>
            </div>
          </div>
        ) : activeSection === 'About' ? (
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#000000]">
              About Aethera
            </h2>
            <p className="mt-4 text-base text-[#6F6F6F] leading-relaxed">
              Founded on the belief that tools shape thought, Aethera crafts
              environments that protect quiet concentration. Every interface is
              distilled until only essential clarity remains.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-black/10 pt-6">
              <div>
                <p className="text-2xl font-serif text-[#000000] tabular-nums">
                  14
                </p>
                <p className="mt-1 text-xs text-[#6F6F6F]">Platforms Shipped</p>
              </div>
              <div>
                <p className="text-2xl font-serif text-[#000000] tabular-nums">
                  4
                </p>
                <p className="mt-1 text-xs text-[#6F6F6F]">
                  Commissions per Year
                </p>
              </div>
              <div>
                <p className="text-2xl font-serif text-[#000000] tabular-nums">
                  0
                </p>
                <p className="mt-1 text-xs text-[#6F6F6F]">
                  Distractions Added
                </p>
              </div>
            </div>
          </div>
        ) : activeSection === 'Journal' ? (
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#000000]">
              Journal
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6F6F6F]">
              Notes on serene interfaces, spatial pacing, and enduring craft.
            </p>
            <div className="mt-8 divide-y divide-black/10">
              {JOURNAL_ENTRIES.map((entry) => (
                <article key={entry.title} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-2 text-xs text-[#6F6F6F]">
                    <span>{entry.topic}</span>
                    <span aria-hidden="true">·</span>
                    <span>{entry.date}</span>
                  </div>
                  <h3 className="mt-1.5 text-xl font-serif text-[#000000]">
                    {entry.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#6F6F6F] leading-relaxed">
                    {entry.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#000000]">
              Reach Us
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6F6F6F]">
              Write to our partners for commissions, collaborations, or studio
              inquiries.
            </p>

            {contactSubmitted ? (
              <div className="mt-8 rounded-2xl border border-black/10 bg-black/[0.02] p-6">
                <p className="font-serif text-2xl text-[#000000]">
                  Message delivered
                </p>
                <p className="mt-2 text-sm text-[#6F6F6F]">
                  Thank you, {contactName}. We will reply to {contactEmail}{' '}
                  shortly.
                </p>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="mt-6 rounded-full px-8 py-3 text-sm bg-[#000000] text-[#FFFFFF] hover:scale-[1.03] transition-transform duration-200 cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="mt-6 space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs text-[#6F6F6F] mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Marcus Lind"
                      className="w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm text-[#000000] focus:border-[#000000] focus:outline-none"
                    />
                    {contactErrors.name && (
                      <p className="mt-1 text-xs text-red-600">{contactErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs text-[#6F6F6F] mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="marcus@domain.com"
                      className="w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm text-[#000000] focus:border-[#000000] focus:outline-none"
                    />
                    {contactErrors.email && (
                      <p className="mt-1 text-xs text-red-600">{contactErrors.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs text-[#6F6F6F] mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tell us about what you are building..."
                    className="w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm text-[#000000] focus:border-[#000000] focus:outline-none resize-none"
                  />
                  {contactErrors.message && (
                    <p className="mt-1 text-xs text-red-600">{contactErrors.message}</p>
                  )}
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="rounded-full px-6 py-2.5 text-sm text-[#6F6F6F] hover:text-[#000000] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-full px-8 py-3 text-sm bg-[#000000] text-[#FFFFFF] hover:scale-[1.03] transition-transform duration-200 cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
