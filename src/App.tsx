import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navbar } from './components/Navbar';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const App = () => {
  const location = useLocation();

  return (
    <LanguageProvider>
      <div className="app">
        <AnimatedBackground />
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
