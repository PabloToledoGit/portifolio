import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ProjectModalProps {
    project: {
        id: string;
        title: string;
        description: string;
        stack: string[];
    } | null;
    onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
    const { t } = useLanguage();

    if (!project) return null;

    return (
        <AnimatePresence>
            {project && (
                <div className="modal-overlay" onClick={onClose}>
                    <motion.div
                        className="modal-container"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal-close" onClick={onClose} aria-label={t('projects.close')}>
                            <X size={24} />
                        </button>

                        <div className="modal-content">
                            <header className="modal-header">
                                <div className="modal-tags">
                                    {project.stack.map(tag => <span key={tag} className="tag">{tag}</span>)}
                                </div>
                                <h2 className="modal-title">{project.title}</h2>
                                <p className="modal-desc">{project.description}</p>
                            </header>

                            <div className="modal-body">
                                <section className="modal-section">
                                    <h3 className="section-subtitle">{t('projects.problem')}</h3>
                                    <p>{t(`projects.${project.id}.case_problem` as any)}</p>
                                </section>

                                <section className="modal-section">
                                    <h3 className="section-subtitle">{t('projects.solution')}</h3>
                                    <p>{t(`projects.${project.id}.case_solution` as any)}</p>
                                </section>

                                <section className="modal-section">
                                    <h3 className="section-subtitle">{t('projects.results')}</h3>
                                    <p>{t(`projects.${project.id}.case_results` as any)}</p>
                                </section>
                            </div>
                        </div>
                    </motion.div>

                    <style>{`
                        .modal-overlay {
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: rgba(0, 0, 0, 0.85);
                            backdrop-filter: blur(8px);
                            z-index: 2000;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: var(--space-5);
                        }

                        .modal-container {
                            background: var(--surface);
                            width: 100%;
                            max-width: 800px;
                            max-height: 90vh;
                            border-radius: var(--radius-lg);
                            border: 1px solid var(--border);
                            position: relative;
                            overflow-y: auto;
                            scrollbar-width: thin;
                        }

                        .modal-close {
                            position: absolute;
                            top: var(--space-5);
                            right: var(--space-5);
                            color: var(--muted);
                            transition: var(--transition-base);
                        }

                        .modal-close:hover {
                            color: var(--text);
                            transform: rotate(90deg);
                        }

                        .modal-content {
                            padding: var(--space-10);
                        }

                        .modal-header {
                            margin-bottom: var(--space-10);
                            border-bottom: 1px solid var(--border);
                            padding-bottom: var(--space-8);
                        }

                        .modal-tags {
                            display: flex;
                            flex-wrap: wrap;
                            gap: var(--space-2);
                            margin-bottom: var(--space-4);
                        }

                        .modal-title {
                            font-size: 2.5rem;
                            margin-bottom: var(--space-4);
                        }

                        .modal-desc {
                            font-size: 1.125rem;
                            color: var(--muted);
                            line-height: 1.6;
                        }

                        .modal-body {
                            display: flex;
                            flex-direction: column;
                            gap: var(--space-8);
                        }

                        .modal-section h3 {
                            font-size: 0.875rem;
                            text-transform: uppercase;
                            letter-spacing: 0.1em;
                            color: var(--accent);
                            margin-bottom: var(--space-3);
                        }

                        .modal-section p {
                            font-size: 1.125rem;
                            line-height: 1.7;
                            color: var(--text);
                        }

                        @media (max-width: 768px) {
                            .modal-content {
                                padding: var(--space-6);
                            }
                            .modal-title {
                                font-size: 1.75rem;
                            }
                        }
                    `}</style>
                </div>
            )}
        </AnimatePresence>
    );
};
