import { useState, useCallback, useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import type { TranslationKeys } from '../i18n/translations';
import { matchUserMessage, getResponseKeys } from '../lib/guideMatch';
import type { GuideTopicId } from '../data/guideTopics';
import type { RuntimeMode } from './useGuideRuntime';

const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_URL || '');

export interface GuideMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  topicId?: GuideTopicId;
}

interface UseGuideConversationProps {
  mode: RuntimeMode;
  onSendTrace?: (key: string, status: 'checking' | 'ready' | 'unavailable' | 'completed') => void;
  onMessageSent?: () => void;
}

export function useGuideConversation({
  mode,
  onSendTrace,
  onMessageSent,
}: UseGuideConversationProps) {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<GuideMessage[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const getLocalResponse = useCallback(
    (text: string): string => {
      const topicId = matchUserMessage(text);
      const { titleKey, bodyKey } = getResponseKeys(topicId);
      return `${t(titleKey as TranslationKeys)}\n\n${t(bodyKey as TranslationKeys)}`;
    },
    [t]
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isSending) return;

      const userMsg: GuideMessage = {
        id: `u_${Date.now()}`,
        role: 'user',
        content: trimmed,
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsSending(true);

      const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));

      if (mode === 'live') {
        onSendTrace?.('guide_runtime_sending', 'checking');
        await new Promise((r) => setTimeout(r, 180));
        onSendTrace?.('guide_runtime_processing', 'checking');

        try {
          const res = await fetch(`${API_BASE}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: trimmed, messages: history }),
          });
          const data = await res.json();

          onSendTrace?.('guide_runtime_completed', 'completed');

          const content = data.content || getLocalResponse(trimmed);
          setMessages((prev) => [
            ...prev,
            { id: `a_${Date.now()}`, role: 'assistant', content },
          ]);
        } catch {
          onSendTrace?.('guide_runtime_fallback', 'unavailable');
          const content = getLocalResponse(trimmed);
          setMessages((prev) => [
            ...prev,
            { id: `a_${Date.now()}`, role: 'assistant', content },
          ]);
        }
      } else {
        const content = getLocalResponse(trimmed);
        setMessages((prev) => [
          ...prev,
          { id: `a_${Date.now()}`, role: 'assistant', content },
        ]);
      }

      setIsSending(false);
      onMessageSent?.();
    },
    [mode, isSending, messages, getLocalResponse, onSendTrace, onMessageSent]
  );

  return {
    messages,
    input,
    setInput,
    isSending,
    sendMessage,
    listRef,
  };
}
