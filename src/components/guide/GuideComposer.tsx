import { useLanguage } from '../../i18n/LanguageContext';
import { Send } from 'lucide-react';

interface GuideComposerProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export const GuideComposer = ({
  value,
  onChange,
  onSubmit,
  disabled,
  inputRef,
}: GuideComposerProps) => {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="guide-composer" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('assistant.placeholder')}
        className="guide-composer-input"
        aria-label={t('assistant.placeholder')}
        disabled={disabled}
      />
      <button
        type="submit"
        className="guide-composer-send"
        aria-label={t('assistant.send')}
        disabled={disabled}
      >
        <Send size={18} />
      </button>
      <style>{`
        .guide-composer {
          display: flex;
          flex-shrink: 0;
          gap: var(--space-2);
          padding: var(--space-4);
          border-top: 1px solid var(--border);
        }
        .guide-composer-input {
          flex: 1;
          padding: var(--space-3) var(--space-4);
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          color: var(--text);
          font-size: 0.9375rem;
          font-family: inherit;
        }
        .guide-composer-input::placeholder {
          color: var(--muted);
        }
        .guide-composer-input:focus {
          outline: none;
          border-color: var(--muted);
        }
        .guide-composer-send {
          padding: var(--space-3);
          background: var(--accent);
          color: var(--bg);
          border-radius: var(--radius-md);
          flex-shrink: 0;
        }
        .guide-composer-send:hover:not(:disabled) {
          opacity: 0.9;
        }
      `}</style>
    </form>
  );
};
