import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Unlock, Code2, Smartphone, Cpu, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import pabloImg from '../assets/pablo.png';
import './hero.css';

export const Hero = () => {
    const { t } = useLanguage();
    const [clicks, setClicks] = useState(0);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const requiredClicks = 10;

    const [isShaking, setIsShaking] = useState(false);

    const handleImageClick = () => {
        if (isUnlocked) return;

        const newClicks = clicks + 1;
        setClicks(newClicks);

        // Trigger shake
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 400);

        if (newClicks >= requiredClicks) {
            setIsUnlocked(true);
            setTimeout(() => {
                window.open('https://wa.me/5524998630185', '_blank');
            }, 800);
        }
    };

    const progress = (clicks / requiredClicks) * 100;

    const floatingIcons = [
        { Icon: Code2, label: 'React', delay: 0, x: -120, y: -60 },
        { Icon: Smartphone, label: 'Flutter', delay: 0.2, x: 120, y: -40 },
        { Icon: Cpu, label: 'Node.js', delay: 0.4, x: -100, y: 80 },
        { Icon: Globe, label: 'Fullstack', delay: 0.6, x: 110, y: 70 },
    ];

    return (
        <section className="hero section-padding">
            <div className="hero-background-effects">
                <div className="glow-1"></div>
                <div className="glow-2"></div>
            </div>

            <div className="container hero-content">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    className="hero-grid"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                    }}
                >
                    <div className="hero-left">

                        <motion.h1
                            className="hero-title"
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                            }}
                        >
                            Pablo <br />
                            <span className="text-gradient">Toledo</span>
                        </motion.h1>

                        <motion.p
                            className="hero-subtitle"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                            }}
                        >
                            {t('hero.role')}
                        </motion.p>

                        <motion.div
                            className="hero-actions"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <a href="#projects" className="btn-primary">
                                {t('hero.projects')} <ArrowRight size={18} />
                                <span className="btn-shine"></span>
                            </a>
                            <a href="#contact" className="btn-secondary">
                                {t('hero.contact')}
                            </a>
                        </motion.div>
                    </div>

                    <div className="hero-right">
                        <motion.div
                            className="profile-section"
                            variants={{
                                hidden: { opacity: 0, scale: 0.9 },
                                visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } }
                            }}
                        >
                            <div className="profile-visual-wrapper">
                                {/* Floating Tech Chips */}
                                {floatingIcons.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="tech-chip"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: 1,
                                            y: [0, -10, 0],
                                            transition: {
                                                delay: item.delay + 0.5,
                                                y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                            }
                                        }}
                                        style={{ left: `calc(50% + ${item.x}px)`, top: `calc(50% + ${item.y}px)` }}
                                    >
                                        <item.Icon size={16} />
                                        <span>{item.label}</span>
                                    </motion.div>
                                ))}

                                <div
                                    className={`profile-image-wrapper ${isUnlocked ? 'unlocked' : ''} ${isShaking ? 'shaking' : ''}`}
                                    onClick={handleImageClick}
                                >
                                    <div className="image-inner">
                                        <img src={pabloImg} alt="Pablo Toledo" className="profile-image" />
                                    </div>
                                    <motion.div
                                        className="status-badge"
                                        animate={isUnlocked ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                                    >
                                        {isUnlocked ? <Unlock size={18} /> : <Lock size={18} />}
                                    </motion.div>

                                    {/* Pulse effect when unlocked */}
                                    {isUnlocked && <div className="unlock-pulse"></div>}
                                </div>
                            </div>

                            <div className="gamification-box glass">
                                <div className="gamification-header">
                                    <span className="unlock-text">
                                        {isUnlocked ? t('hero.unlock_success') : t('hero.unlock_label')}
                                    </span>
                                    <span className="click-count">{clicks}/{requiredClicks}</span>
                                </div>
                                <div className="progress-container">
                                    <motion.div
                                        className="progress-bar"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ type: "spring", stiffness: 60, damping: 15 }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
