import { useLanguage } from '../../i18n/LanguageContext';
import { MessageCircle, ExternalLink } from 'lucide-react';

interface StoryLinkBridgeProps {
  onAskAssistant?: () => void;
  projectsHref?: string;
}

export const StoryLinkBridge = ({ onAskAssistant, projectsHref = '#projects' }: StoryLinkBridgeProps) => {
  const { t } = useLanguage();

  return (
    <div className="story-link-bridge">
      {onAskAssistant && (
        <button
          type="button"
          className="story-bridge-btn"
          onClick={onAskAssistant}
          aria-label={t('story.ask_assistant')}
        >
          <MessageCircle size={16} />
          <span>{t('story.ask_assistant')}</span>
        </button>
      )}
      <a href={projectsHref} className="story-bridge-btn story-bridge-link">
        <ExternalLink size={16} />
        <span>{t('story.view_projects')}</span>
      </a>
      <style>{`
        .story-link-bridge {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          margin-top: var(--space-6);
          padding-top: var(--space-6);
          border-top: 1px solid var(--border);
        }
        .story-bridge-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--muted);
          background: none;
          border: none;
          cursor: pointer;
          transition: color var(--transition-fast);
        }
        .story-bridge-btn:hover {
          color: var(--text);
        }
        .story-bridge-link {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};
