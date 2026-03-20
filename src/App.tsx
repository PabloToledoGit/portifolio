import { lazy, Suspense } from 'react';
import { useSmoothAnchorNavigation } from './hooks/useSmoothAnchorNavigation';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Highlights } from './sections/Highlights';
import { About } from './sections/About';
import { StoryExperienceSection } from './sections/StoryExperienceSection';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';

const PortfolioGuideSection = lazy(() => import('./sections/PortfolioGuideSection').then((m) => ({ default: m.PortfolioGuideSection })));
const OperationsConsoleSection = lazy(() => import('./sections/OperationsConsoleSection').then((m) => ({ default: m.OperationsConsoleSection })));
import { Footer } from './components/Footer';
import { ExperienceIndicator } from './components/experience/ExperienceIndicator';
import { ExperienceToast } from './components/experience/ExperienceToast';
import { LanguageProvider } from './i18n/LanguageContext';
import { ExperienceProvider } from './context/ExperienceContext';
import './styles/globals.css';

function AppContent() {
  useSmoothAnchorNavigation();

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <Suspense fallback={<section className="section-padding" style={{ minHeight: 120 }} />}>
          <PortfolioGuideSection />
        </Suspense>
        <About />
        <StoryExperienceSection />
        <Projects />
        <Suspense fallback={<section className="section-padding" style={{ minHeight: 200, background: 'var(--surface)' }} />}>
          <OperationsConsoleSection />
        </Suspense>
        <Contact />
      </main>
      <Footer />
      <ExperienceIndicator />
      <ExperienceToast />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ExperienceProvider>
        <SmoothScrollProvider>
          <AppContent />
        </SmoothScrollProvider>
      </ExperienceProvider>
    </LanguageProvider>
  );
}

export default App;
