import { useEffect } from 'react';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Experience } from '../sections/Experience';
import { Projects } from '../sections/Projects';
import { Contact } from '../sections/Contact';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Home = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [hash]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Contact />
        </motion.div>
    );
};

export default Home;
