import React, { createContext, useState, useContext } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

const translations = {
    pt: {
        // Navbar
        "nav.about": "Sobre",
        "nav.projects": "Projetos",
        "nav.contact": "Contato",

        // Hero
        "hero.greeting": "Olá, eu sou",
        "hero.role": "Desenvolvedor Fullstack Web & Mobile especializado em criar soluções modernas, escaláveis e de alto impacto.",
        "hero.projects": "Ver Projetos",
        "hero.contact": "Entrar em contato",

        // About
        "about.title": "Sobre mim",
        "about.p1": "Sou desenvolvedor Web Fullstack e Mobile com experiência em criar desde interfaces interativas até sistemas robustos. Tenho facilidade com integração de IA em sistemas, gateways de pagamento e desenvolvimento cross-platform com Flutter.",
        "about.p2": "Atualmente foco no ecossistema moderno de desenvolvimento (React, Node.js, Flutter). Sou graduado em Análise e Desenvolvimento de Sistemas pela Estácio.",
        "about.skills": "Minhas Tecnologias",

        // Experience
        "exp.title": "Experiência Profissional",
        "exp.details": "Ver detalhes",
        "exp.less": "Menos detalhes",
        "exp.current": "Atual",
        "exp.project": "Projeto",
        "exp.enterprise": "Empreendimento",
        "exp.previous": "Anterior",

        "exp.role1": "Analista de Sistemas Junior (Desenvolvedor Web)",
        "exp.desc1": "Desenvolvimento e manutenção de sistemas web, focando em React e tecnologias modernas.",
        "exp.detail1.1": "Desenvolvimento de interfaces reativas.",
        "exp.detail1.2": "Manutenção de código legado e refatoração.",
        "exp.detail1.3": "Integração com APIs RESTful.",

        "exp.role2": "Desenvolvedor Web Freelancer",
        "exp.desc2": "Atuação como freelancer no desenvolvimento de soluções web personalizadas.",
        "exp.detail2.1": "Entrega de projetos com prazos curtos.",
        "exp.detail2.2": "Comunicação direta com stakeholders.",
        "exp.detail2.3": "Foco em qualidade e performance.",

        "exp.role3": "Proprietário & Criador",
        "exp.desc3": "Gestão e desenvolvimento de soluções para o negócio.",
        "exp.detail3.1": "Faturamento de R$ 150k+.",
        "exp.detail3.2": "Comunidade com 10k+ seguidores.",
        "exp.detail3.3": "Liderança de equipe com 6 pessoas.",
        "exp.detail3.4": "Desenvolvimento da plataforma completa.",

        "exp.role4": "Auxiliar Administrativo (T.I.)",
        "exp.desc4": "Suporte administrativo com foco em demandas de Tecnologia da Informação.",
        "exp.detail4.1": "Suporte técnico interno.",
        "exp.detail4.2": "Gestão de infraestrutura básica.",
        "exp.detail4.3": "Automação de processos administrativos.",

        // Projects
        "projects.title": "Projetos Selecionados",
        "projects.subtitle": "Alguns dos trabalhos que desenvolvi recentemente.",
        "projects.nutrify.desc": "Plataforma de dietas personalizadas com IA e lógica nutricional validada. Integração com Mercado Pago e foco em UX.",
        "projects.nutrify_mobile.desc": "Aplicativo mobile multiplataforma para acompanhamento de dietas, com scanner de refeições via IA e integração em tempo real com o servidor.",
        "projects.dashboard.desc": "Painel administrativo avançado com rastreamento de métricas, performance de anúncios (Meta Ads) e insights estratégicos gerados por IA.",

        // Contact
        "contact.title": "Vamos construir algo juntos?",
        "contact.subtitle": "Estou sempre aberto a novos projetos e parcerias.",
        "contact.btn": "Mandar mensagem",

        // Footer
        "footer.rights": "Todos os direitos reservados."
    },
    en: {
        // Navbar
        "nav.about": "About",
        "nav.projects": "Projects",
        "nav.contact": "Contact",

        // Hero
        "hero.greeting": "Hi, I am",
        "hero.role": "Fullstack Web & Mobile Developer specialized in creating modern, scalable, and high-impact solutions.",
        "hero.projects": "View Projects",
        "hero.contact": "Get in touch",

        // About
        "about.title": "About me",
        "about.p1": "I am a Fullstack Web and Mobile Developer experienced in creating everything from interactive interfaces to robust systems. I have expertise in AI integration, payment gateways, and cross-platform development with Flutter.",
        "about.p2": "Currently focused on the modern development ecosystem (React, Node.js, Flutter). Graduated in Systems Analysis and Development from Estácio.",
        "about.skills": "My Tech Stack",

        // Experience
        "exp.title": "Professional Experience",
        "exp.details": "See details",
        "exp.less": "Less details",
        "exp.current": "Current",
        "exp.project": "Project",
        "exp.enterprise": "Enterprise",
        "exp.previous": "Previous",

        "exp.role1": "Junior Systems Analyst (Web Developer)",
        "exp.desc1": "Development and maintenance of web systems, focusing on React and modern technologies.",
        "exp.detail1.1": "Development of reactive interfaces.",
        "exp.detail1.2": "Legacy code maintenance and refactoring.",
        "exp.detail1.3": "Integration with RESTful APIs.",

        "exp.role2": "Freelance Web Developer",
        "exp.desc2": "Freelancer developing custom web solutions.",
        "exp.detail2.1": "Delivery of projects with short deadlines.",
        "exp.detail2.2": "Direct communication with stakeholders.",
        "exp.detail2.3": "Focus on quality and performance.",

        "exp.role3": "Owner & Creator",
        "exp.desc3": "Management and development of business solutions.",
        "exp.detail3.1": "Revenue of R$ 150k+.",
        "exp.detail3.2": "Community with 10k+ followers.",
        "exp.detail3.3": "Team leadership of 6 people.",
        "exp.detail3.4": "Full platform development.",

        "exp.role4": "Administrative Assistant (IT)",
        "exp.desc4": "Administrative support focused on IT demands.",
        "exp.detail4.1": "Internal technical support.",
        "exp.detail4.2": "Basic infrastructure management.",
        "exp.detail4.3": "Automation of administrative processes.",

        // Projects
        "projects.title": "Selected Projects",
        "projects.subtitle": "Some of the work I've developed recently.",
        "projects.nutrify.desc": "Personalized diet platform with AI and validated nutritional logic. Mercado Pago integration and UX focus.",
        "projects.nutrify_mobile.desc": "Cross-platform mobile app for diet tracking, featuring AI meal scanning and real-time server integration.",
        "projects.dashboard.desc": "Advanced administrative dashboard with metrics tracking, ad performance (Meta Ads), and strategic AI-generated insights.",

        // Contact
        "contact.title": "Let's build something together?",
        "contact.subtitle": "I'm always open to new projects and partnerships.",
        "contact.btn": "Send message",

        // Footer
        "footer.rights": "All rights reserved."
    }
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('pt');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'pt' ? 'en' : 'pt');
    };

    const t = (key: string) => {
        // @ts-ignore
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
