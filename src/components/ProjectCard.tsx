import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import './project-card.css';

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    image: string;
    link: string;
    github: string;
}

export const ProjectCard = ({ title, description, tags, image, link, github }: ProjectCardProps) => {
    return (
        <motion.div
            className="project-card"
            whileHover={{ y: -10 }}
        >
            <div className="card-image">
                <img src={image} alt={title} />
                <div className="overlay">
                    <a href={link} target="_blank" rel="noopener noreferrer"><ExternalLink /></a>
                    <a href={github} target="_blank" rel="noopener noreferrer"><Github /></a>
                </div>
            </div>
            <div className="card-content">
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="tags">
                    {tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
            </div>
        </motion.div>
    );
};
