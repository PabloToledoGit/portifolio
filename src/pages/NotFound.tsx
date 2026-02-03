import { motion } from 'framer-motion';
import { Home as HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const NotFound = () => {
    const { language } = useLanguage();

    const content = {
        en: {
            title: "404",
            subtitle: "Page Not Found",
            description: "The page you're looking for doesn't exist or has been moved.",
            back: "Back to Home"
        },
        pt: {
            title: "404",
            subtitle: "Página Não Encontrada",
            description: "A página que você está procurando não existe ou foi movida.",
            back: "Voltar ao Início"
        }
    };

    const t = language === 'pt' ? content.pt : content.en;

    return (
        <motion.div
            className="not-found"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '0 20px',
                background: 'var(--bg-primary)'
            }}
        >
            <motion.h1
                style={{
                    fontSize: '8rem',
                    margin: 0,
                    background: 'linear-gradient(45deg, var(--accent-primary), var(--accent-secondary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 800
                }}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                {t.title}
            </motion.h1>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{t.subtitle}</h2>
            <p style={{ maxWidth: '500px', marginBottom: '2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {t.description}
            </p>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        padding: '12px 24px',
                        borderRadius: '30px',
                        background: 'var(--accent-primary)',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                    }}
                >
                    <HomeIcon size={20} />
                    {t.back}
                </motion.button>
            </Link>
        </motion.div>
    );
};

export default NotFound;
