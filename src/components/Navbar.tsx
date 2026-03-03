import { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Github, Linkedin, Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.experience'), href: '#experience' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <a href="#" className="nav-logo">
          Pablo Toledo<span className="logo-dot">.</span>
        </a>

        <div className="nav-desktop">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button
              className="lang-toggle"
              onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
              aria-label="Toggle language"
            >
              <Globe size={18} />
              <span>{language.toUpperCase()}</span>
            </button>
            <div className="nav-socials">
              <a href="https://github.com/PabloToledoGit?tab=repositories" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/pablo-toledo-371256275/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="nav-mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ul className="mobile-links">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mobile-actions">
              <button
                onClick={() => {
                  setLanguage(language === 'pt' ? 'en' : 'pt');
                  setIsMobileMenuOpen(false);
                }}
              >
                <Globe size={18} /> {language === 'pt' ? 'English' : 'Português'}
              </button>
              <div className="mobile-socials">
                <a href="https://github.com/PabloToledoGit?tab=repositories" target="_blank" rel="noopener noreferrer"><Github /></a>
                <a href="https://www.linkedin.com/in/pablo-toledo-371256275/" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: var(--transition-base);
          padding: var(--space-4) 0;
        }

        .navbar.scrolled {
          background: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          padding: var(--space-3) 0;
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .logo-dot {
          color: var(--muted);
        }

        .nav-desktop {
          display: none;
          align-items: center;
          gap: var(--space-8);
        }

        @media (min-width: 768px) {
          .nav-desktop {
            display: flex;
          }
        }

        .nav-links {
          display: flex;
          gap: var(--space-6);
        }

        .nav-links a {
          font-size: var(--small);
          font-weight: 500;
          color: var(--muted);
        }

        .nav-links a:hover {
          color: var(--text);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: var(--space-5);
          padding-left: var(--space-5);
          border-left: 1px solid var(--border);
        }

        .lang-toggle {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          background: var(--surface2);
          color: var(--muted);
        }

        .lang-toggle:hover {
          color: var(--accent);
          background: var(--surface);
        }

        .nav-socials {
          display: flex;
          gap: var(--space-4);
          color: var(--muted);
        }

        .nav-socials a:hover {
          color: var(--accent);
        }

        .mobile-menu-toggle {
          display: block;
          color: var(--text);
        }

        @media (min-width: 768px) {
          .mobile-menu-toggle {
            display: none;
          }
        }

        .nav-mobile {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          padding: var(--space-6);
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .mobile-links a {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .mobile-actions {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          padding-top: var(--space-4);
          border-top: 1px solid var(--border);
        }

        .mobile-socials {
          display: flex;
          gap: var(--space-6);
        }
      `}</style>
    </nav>
  );
};
