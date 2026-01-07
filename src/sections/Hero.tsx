import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './hero.css';

export const Hero = () => {
    const { t } = useLanguage();

    return (
        <section className="hero section-padding">
            <div className="container hero-content">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    <motion.h1
                        className="hero-title"
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.8, ease: "easeOut" }
                            }
                        }}
                    >
                        {t('hero.greeting')} <br />
                        <span className="text-gradient">Pablo Toledo</span>
                    </motion.h1>

                    <motion.p
                        className="hero-subtitle"
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.8, ease: "easeOut" }
                            }
                        }}
                    >
                        {t('hero.role')}
                    </motion.p>

                    <motion.div
                        className="hero-actions"
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.8, ease: "easeOut" }
                            }
                        }}
                    >
                        <a href="#projects" className="btn-primary">
                            {t('hero.projects')} <ArrowRight size={18} />
                        </a>
                        <a href="#contact" className="btn-secondary">
                            {t('hero.contact')}
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
