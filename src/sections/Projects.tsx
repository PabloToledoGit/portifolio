import { ProjectCard } from '../components/ProjectCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';
import nutrifyImg from '../assets/nutrify.png';
import nutrifyDashboardImg from '../assets/nutrify-dashboard.png';
import './projects.css';

export const Projects = () => {
    const { t } = useLanguage();

    const projects = [
        {
            title: 'Nutrify',
            description: t('projects.nutrify.desc'),
            tags: ['React', 'Node.js', 'OpenAI API', 'Mercado Pago', 'UX/UI'],
            image: nutrifyImg,
            link: 'https://www.nutrifyservice.com',
            instagram: 'https://www.instagram.com/nutrifyservice/'
        },
        {
            title: 'Nutrify Dashboard',
            description: t('projects.dashboard.desc'),
            tags: ['React', 'TypeScript', 'Admin'],
            image: nutrifyDashboardImg,
            link: 'https://nutrify-dash.vercel.app',
            github: '#'
        },
        {
            title: 'Social App UI',
            description: t('projects.social.desc'),
            tags: ['React', 'Framer Motion', 'Tailwind'],
            image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
            link: '#',
            github: '#'
        }
    ];

    return (
        <section id="projects" className="projects section-padding">
            <div className="container">
                <ScrollReveal width="100%">
                    <div className="section-header">
                        <h2>{t('projects.title')}</h2>
                        <p>{t('projects.subtitle')}</p>
                    </div>
                </ScrollReveal>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <ScrollReveal key={index} delay={index * 0.1}>
                            <ProjectCard {...project} />
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};
