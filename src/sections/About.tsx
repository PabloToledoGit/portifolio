import { ScrollReveal } from '../components/ScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';
import './about.css';

export const About = () => {
    const { t } = useLanguage();

    return (
        <section id="about" className="about section-padding">
            <div className="container about-content">
                <ScrollReveal width="100%">
                    <div className="about-text">
                        <h2>{t('about.title')}</h2>
                        <p>
                            {t('about.p1')}
                        </p>
                        <p>
                            {t('about.p2')}
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal width="100%" delay={0.2}>
                    <div className="skills">
                        <h3>{t('about.skills')}</h3>
                        <div className="skills-grid">
                            {['React', 'Node.js', 'Flutter', 'Dart', 'TypeScript', 'Clean Architecture', 'OpenAI API', 'Git'].map(skill => (
                                <div key={skill} className="skill-item">{skill}</div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};
