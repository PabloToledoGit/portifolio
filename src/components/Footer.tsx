import { useLanguage } from '../contexts/LanguageContext';
import './footer.css';

export const Footer = () => {
    const { t } = useLanguage();
    return (
        <footer className="footer">
            <div className="container footer-content">
                <p>&copy; {new Date().getFullYear()} Pablo Toledo. {t('footer.rights')}</p>
            </div>
        </footer>
    );
};
