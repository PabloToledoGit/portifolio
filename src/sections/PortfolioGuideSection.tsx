import { useState, useEffect } from 'react';
import { GuideIntro } from '../components/guide/GuideIntro';
import { GuideExperienceShell } from '../components/guide/GuideExperienceShell';

export const PortfolioGuideSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('openAssistant', handler);
    return () => window.removeEventListener('openAssistant', handler);
  }, []);

  return (
    <section id="guide" className="portfolio-guide-section section-padding">
      <div className="container">
        <GuideIntro onLaunch={() => setIsOpen(true)} />
      </div>

      <GuideExperienceShell isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <style>{`
        .portfolio-guide-section {
          background: var(--surface);
          border-top: 1px solid var(--border);
        }
      `}</style>
    </section>
  );
};
