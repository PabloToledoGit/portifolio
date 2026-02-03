import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './navbar.css';

export const Navbar = () => {
    const { t, language, toggleLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        if (location.pathname !== '/') {
            e.preventDefault();
            navigate('/#' + target.replace('#', ''));
        } else {
            // Let the default behavior handle it or use scrollIntoView if needed
            // But usually browsers handle #id on the same page.
            closeMenu();
        }
    };

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="nav-content">
                <Link to="/" className="logo" onClick={() => window.scrollTo(0, 0)}>Pablo Toledo.</Link>

                {/* Mobile Menu Button */}
                <button className="menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Menu */}
                <div className="desktop-menu">
                    <ul className="nav-links">
                        <li><a href="#about" onClick={(e) => handleAnchorClick(e, 'about')}>{t('nav.about')}</a></li>
                        <li><a href="#projects" onClick={(e) => handleAnchorClick(e, 'projects')}>{t('nav.projects')}</a></li>
                        <li><a href="#contact" onClick={(e) => handleAnchorClick(e, 'contact')}>{t('nav.contact')}</a></li>
                    </ul>
                    <div className="social-links">
                        <button onClick={toggleLanguage} className="lang-btn">
                            <Globe size={18} />
                            <span>{language.toUpperCase()}</span>
                        </button>
                        <a href="https://github.com/PabloToledoGit" target="_blank" rel="noopener noreferrer" aria-label="Github"><Github size={20} /></a>
                        <a href="https://www.linkedin.com/in/pablo-toledo-371256275/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <motion.div
                    className={`mobile-menu ${isOpen ? 'open' : ''}`}
                    initial={false}
                    animate={isOpen ? { opacity: 1, pointerEvents: 'auto' } : { opacity: 0, pointerEvents: 'none' }}
                >
                    <ul className="mobile-nav-links">
                        <li><a href="#about" onClick={(e) => { handleAnchorClick(e, 'about'); closeMenu(); }}>{t('nav.about')}</a></li>
                        <li><a href="#projects" onClick={(e) => { handleAnchorClick(e, 'projects'); closeMenu(); }}>{t('nav.projects')}</a></li>
                        <li><a href="#contact" onClick={(e) => { handleAnchorClick(e, 'contact'); closeMenu(); }}>{t('nav.contact')}</a></li>
                    </ul>
                    <div className="mobile-social-links">
                        <button onClick={toggleLanguage} className="lang-btn">
                            <Globe size={18} />
                            <span>{language.toUpperCase()}</span>
                        </button>
                        <div className="social-icons">
                            <a href="https://github.com/PabloToledoGit" target="_blank" rel="noopener noreferrer" aria-label="Github"><Github size={24} /></a>
                            <a href="https://www.linkedin.com/in/pablo-toledo-371256275/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={24} /></a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
};
