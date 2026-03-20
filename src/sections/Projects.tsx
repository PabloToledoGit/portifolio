import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useExperience } from '../context/ExperienceContext';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { ProjectModal } from '../components/ProjectModal';

export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  impact: string[];
  statusLabel?: string;
  categoryLabel?: string;
  highlight?: string;
  /** Default true; SIGBL has no public repo link */
  showGithub?: boolean;
};

export const Projects = () => {
  const { t } = useLanguage();
  const { trackInteraction, state } = useExperience();
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasRecordedVisit = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || hasRecordedVisit.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          hasRecordedVisit.current = true;
          trackInteraction('visit_projects');
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [trackInteraction]);

  const baseProjects: PortfolioProject[] = [
    {
      id: 'nutrify_web',
      title: t('projects.nutrify_web.title'),
      description: t('projects.nutrify_web.description'),
      stack: ['React', 'Node.js', 'OpenAI', 'Mercado Pago'],
      impact: ['R$ 150k+ Faturamento', 'Checkout Inteligente'],
    },
    {
      id: 'nutrify_mobile',
      title: t('projects.nutrify_mobile.title'),
      description: t('projects.nutrify_mobile.description'),
      stack: ['Flutter', 'Dart', 'Computer Vision'],
      impact: ['App Nativo', 'Visão Computacional'],
    },
    {
      id: 'dashboard',
      title: t('projects.dashboard.title'),
      description: t('projects.dashboard.description'),
      stack: ['React', 'TypeScript', 'Realtime Metrics'],
      impact: ['Métricas em Tempo Real', 'Enterprise Grade'],
    },
    {
      id: 'sigbl',
      title: t('projects.sigbl.title'),
      description: t('projects.sigbl.description'),
      stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js'],
      impact: [
        t('projects.sigbl.impact_line_1'),
        t('projects.sigbl.impact_line_2'),
        t('projects.sigbl.impact_line_3'),
      ],
      statusLabel: t('projects.sigbl.status_badge'),
      categoryLabel: t('projects.sigbl.category_tag'),
      highlight: t('projects.sigbl.highlight'),
      showGithub: false,
    },
  ];

  const secretUnlocked = state.unlockedProjectIds.includes('secret');
  const secretProject: PortfolioProject | null = secretUnlocked
    ? {
        id: 'secret',
        title: t('projects.secret.title'),
        description: t('projects.secret.description'),
        stack: ['Arquitetura', 'Event-Driven', 'SaaS'],
        impact: ['Conteúdo Desbloqueado', 'Visão de Sistema'],
      }
    : null;
  const projects = secretProject ? [...baseProjects, secretProject] : baseProjects;

  return (
    <section id="projects" className="projects section-padding" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">03 // {t('projects.title')}</span>
          <h2 className="section-title">{t('projects.subtitle')}</h2>
        </div>

        <div className="projects-list">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`project-feature ${project.id === 'sigbl' ? 'project-feature--institutional' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="project-media">
                <div className="media-placeholder">
                  <span>{project.id === 'sigbl' ? t('projects.sigbl.media_short') : project.title}</span>
                </div>
              </div>

              <div className="project-info">
                {(project.statusLabel || project.categoryLabel) && (
                  <div className="project-meta" aria-label={t('projects.sigbl.meta_aria')}>
                    {project.statusLabel ? (
                      <span className="project-status">{project.statusLabel}</span>
                    ) : null}
                    {project.categoryLabel ? (
                      <span className="project-category">{project.categoryLabel}</span>
                    ) : null}
                  </div>
                )}

                <div className="project-tags">
                  {project.stack.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                {project.highlight ? <p className="project-highlight">{project.highlight}</p> : null}

                <div className="project-outcomes">
                  {project.impact.map((item) => (
                    <div key={item} className="outcome-item">
                      <div className="outcome-dot"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="project-links">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="project-link btn-link"
                  >
                    {t('projects.view_case')} <ArrowUpRight size={16} />
                  </button>
                  {project.showGithub !== false ? (
                    <a href="#" className="project-link secondary">
                      <Github size={16} /> GitHub
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <style>{`
        .projects-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-16);
          margin-top: var(--space-10);
        }

        .project-feature {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-8);
          align-items: center;
        }

        @media (min-width: 992px) {
          .project-feature {
            grid-template-columns: 1.2fr 1fr;
          }
          .project-feature:nth-child(even) {
            direction: rtl;
          }
          .project-feature:nth-child(even) .project-info {
            direction: ltr;
            text-align: left;
          }
        }

        .project-media {
          aspect-ratio: 16/10;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: var(--transition-base);
        }

        .project-media:hover {
          border-color: var(--muted);
          transform: scale(1.02);
        }

        .media-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(45deg, var(--surface), var(--surface2));
          color: var(--muted);
          font-weight: 800;
          font-size: 2rem;
          opacity: 0.5;
        }

        .project-feature--institutional .media-placeholder {
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), var(--surface2));
          opacity: 0.85;
          font-size: clamp(1.25rem, 3.5vw, 2rem);
          letter-spacing: 0.06em;
          text-align: center;
          padding: var(--space-4);
          line-height: 1.25;
        }

        .project-feature--institutional .project-media {
          border-color: rgba(255, 255, 255, 0.14);
        }

        .project-meta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          align-items: center;
        }

        .project-status {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent);
        }

        .project-category {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.03);
        }

        .project-highlight {
          margin: 0;
          font-size: 0.9375rem;
          line-height: 1.55;
          color: var(--text);
          padding: var(--space-3) var(--space-4);
          background: rgba(255, 255, 255, 0.04);
          border-left: 2px solid var(--accent);
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
        }

        .project-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }

        .tag {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--muted);
          background: var(--surface2);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
        }

        .project-title {
          font-size: 2.5rem;
          letter-spacing: -0.03em;
        }

        .project-desc {
          font-size: 1.125rem;
          color: var(--muted);
          line-height: 1.6;
        }

        .project-outcomes {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          margin: var(--space-2) 0;
        }

        .outcome-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          font-size: var(--small);
          font-weight: 600;
        }

        .outcome-dot {
          width: 6px;
          height: 6px;
          background: var(--accent);
          border-radius: 50%;
        }

        .project-links {
          display: flex;
          gap: var(--space-5);
          margin-top: var(--space-4);
        }

        .project-link {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-weight: 700;
          border-bottom: 2px solid transparent;
          transition: var(--transition-base);
        }

        .btn-link {
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
            color: var(--text);
            font-family: inherit;
        }

        .project-link:hover {
          border-color: var(--accent);
        }

        .project-link.secondary {
          color: var(--muted);
        }
      `}</style>
    </section>
  );
};
