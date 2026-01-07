import { useState } from 'react';
import { ScrollReveal } from '../components/ScrollReveal';
import { ChevronDown, ChevronUp, Users, DollarSign, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './experience.css';
import { motion, AnimatePresence } from 'framer-motion';

export const Experience = () => {
    const { t } = useLanguage();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const experiencesList = [
        {
            role: t("exp.role1"),
            company: "Grupo Sels",
            period: t("exp.current"),
            description: t("exp.desc1"),
            details: [
                t("exp.detail1.1"),
                t("exp.detail1.2"),
                t("exp.detail1.3")
            ],
            highlight: false
        },
        {
            role: t("exp.role2"),
            company: "Grupo Sels",
            period: t("exp.project"),
            description: t("exp.desc2"),
            details: [
                t("exp.detail2.1"),
                t("exp.detail2.2"),
                t("exp.detail2.3")
            ],
            highlight: false
        },
        {
            role: t("exp.role3"),
            company: "Nutrify",
            period: t("exp.enterprise"),
            description: t("exp.desc3"),
            details: [
                t("exp.detail3.1"),
                t("exp.detail3.2"),
                t("exp.detail3.3"),
                t("exp.detail3.4")
            ],
            highlight: true
        },
        {
            role: t("exp.role4"),
            company: "Sarton",
            period: t("exp.previous"),
            description: t("exp.desc4"),
            details: [
                t("exp.detail4.1"),
                t("exp.detail4.2"),
                t("exp.detail4.3")
            ],
            highlight: false
        }
    ];

    return (
        <section id="experience" className="experience section-padding">
            <div className="container">
                <ScrollReveal width="100%">
                    <h2 className="section-title">{t('exp.title')}</h2>
                    <div className="timeline">
                        {experiencesList.map((exp, index) => (
                            <div key={index} className="timeline-item">
                                <div className={`timeline-content ${exp.highlight ? 'highlight-card' : ''}`}>
                                    <span className="period">{exp.period}</span>
                                    <h3>{exp.role}</h3>
                                    <h4>{exp.company}</h4>
                                    <p>{exp.description}</p>

                                    <button
                                        className="btn-details"
                                        onClick={() => toggleExpand(index)}
                                    >
                                        {expandedIndex === index ? t('exp.less') : t('exp.details')}
                                        {expandedIndex === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>

                                    <AnimatePresence>
                                        {expandedIndex === index && (
                                            <motion.div
                                                className="experience-details"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ul>
                                                    {exp.details?.map((detail, i) => (
                                                        <li key={i}>{detail}</li>
                                                    ))}
                                                </ul>
                                                {exp.highlight && (
                                                    <div className="highlight-stats">
                                                        <div className="stat">
                                                            <DollarSign size={16} />
                                                            <span>150k+ Faturamento</span>
                                                        </div>
                                                        <div className="stat">
                                                            <Users size={16} />
                                                            <span>10k+ Seguidores</span>
                                                        </div>
                                                        <div className="stat">
                                                            <Award size={16} />
                                                            <span>Equipe de 6</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};
