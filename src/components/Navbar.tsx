import { motion } from 'framer-motion';
import { Github, Linkedin, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './navbar.css';

export const Navbar = () => {
    const { t, language, toggleLanguage } = useLanguage();

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container nav-content">
                <div className="logo">Pablo Toledo.</div>
                <ul className="nav-links">
                    <li><a href="#about">{t('nav.about')}</a></li>
                    <li><a href="#projects">{t('nav.projects')}</a></li>
                    <li><a href="#contact">{t('nav.contact')}</a></li>
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
        </motion.nav>
    );
};
