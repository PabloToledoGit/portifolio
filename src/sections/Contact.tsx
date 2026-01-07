import { ScrollReveal } from '../components/ScrollReveal';
import { Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './contact.css';

export const Contact = () => {
    const { t } = useLanguage();

    return (
        <section id="contact" className="contact section-padding">
            <div className="container text-center">
                <ScrollReveal width="100%">
                    <div>
                        <h2>{t('contact.title')}</h2>
                        <p className="contact-subtitle">{t('contact.subtitle')}</p>

                        <div className="contact-info">
                            <div className="contact-item">
                                <Mail className="icon" />
                                <span>pablotoledoemail@gmail.com</span>
                            </div>
                            <div className="contact-item">
                                <MapPin className="icon" />
                                <span>Brasil</span>
                            </div>
                        </div>

                        <a href="mailto:pablotoledoemail@gmail.com" className="btn-primary btn-large">
                            {t('contact.btn')}
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};
