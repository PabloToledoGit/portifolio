import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { ProjectModal } from '../components/ProjectModal';

export const Projects = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
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
  ];

  return (
    <section id="projects" className="projects section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-label">03 // {t('projects.title')}</span>
          <h2 className="section-title">{t('projects.subtitle')}</h2>
        </div>

        <div className="projects-list">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-feature"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="project-media">
                <div className="media-placeholder">
                  <span>{project.title}</span>
                </div>
              </div>

              <div className="project-info">
                <div className="project-tags">
                  {project.stack.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-outcomes">
                  {project.impact.map(item => (
                    <div key={item} className="outcome-item">
                      <div className="outcome-dot"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="project-links">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="project-link btn-link"
                  >
                    {t('projects.view_case')} <ArrowUpRight size={16} />
                  </button>
                  <a href="#" className="project-link secondary">
                    <Github size={16} /> GitHub
                  </a>
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
