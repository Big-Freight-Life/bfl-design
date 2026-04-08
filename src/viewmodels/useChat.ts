'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChatMessage,
  loadHistory,
  saveHistory,
  clearHistory as clearHistoryStorage,
  newMessage,
  validateMessage,
  isNotificationDismissed,
  dismissNotification as dismissNotificationStorage,
} from '@/models/chat';

interface SendResult {
  ok: boolean;
  error?: string;
}

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  isOpen: boolean;
  hasUnread: boolean;
  /** True when the first-visit notification badge + preview should be shown */
  showFirstVisitNotice: boolean;
  /** Dismiss the first-visit notice (and persist so it never re-appears) */
  dismissNotice: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  send: (text: string) => Promise<SendResult>;
  clear: () => void;
}

const WELCOME_MESSAGE = `Hi — I'm Raybot, Ray's assistant for Big Freight Life. Ray runs an applied AI design and architecture practice here. Tell me what you're working on or what brought you to the site, and I'll help if I can.`;

const FIRST_VISIT_DELAY_MS = 10000;
const FIRST_VISIT_AUTO_DISMISS_MS = 30000;

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [showFirstVisitNotice, setShowFirstVisitNotice] = useState(false);
  const hydratedRef = useRef(false);

  // Hydrate from localStorage once on mount
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    const stored = loadHistory();
    if (stored.length === 0) {
      setMessages([newMessage('assistant', WELCOME_MESSAGE)]);
    } else {
      setMessages(stored);
    }
  }, []);

  // Persist on every change (after hydration)
  useEffect(() => {
    if (!hydratedRef.current) return;
    if (messages.length === 0) return;
    saveHistory(messages);
  }, [messages]);

  // Clear unread badge and notice when panel opens
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      if (showFirstVisitNotice) {
        setShowFirstVisitNotice(false);
        dismissNotificationStorage();
      }
    }
  }, [isOpen, showFirstVisitNotice]);

  // First-visit notice: show after delay if user hasn't dismissed before
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isNotificationDismissed()) return;

    const showTimer = setTimeout(() => {
      setShowFirstVisitNotice(true);
      setHasUnread(true);
    }, FIRST_VISIT_DELAY_MS);

    const dismissTimer = setTimeout(() => {
      setShowFirstVisitNotice(false);
    }, FIRST_VISIT_DELAY_MS + FIRST_VISIT_AUTO_DISMISS_MS);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(dismissTimer);
    };
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const dismissNotice = useCallback(() => {
    setShowFirstVisitNotice(false);
    setHasUnread(false);
    dismissNotificationStorage();
  }, []);

  const send = useCallback(
    async (text: string): Promise<SendResult> => {
      const validationError = validateMessage(text);
      if (validationError) {
        setError(validationError);
        return { ok: false, error: validationError };
      }

      setError(null);
      const userMsg = newMessage('user', text.trim());
      const updated = [...messages, userMsg];
      setMessages(updated);
      setIsLoading(true);

      try {
        const payload = updated.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: payload }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          const errMsg = data.error ?? `Request failed (${res.status})`;
          setError(errMsg);
          setIsLoading(false);
          return { ok: false, error: errMsg };
        }

        const data = (await res.json()) as { reply: string; leadCaptured?: boolean };
        if (!data.reply) {
          setError('Empty response from assistant');
          setIsLoading(false);
          return { ok: false, error: 'Empty response' };
        }

        const assistantMsg = newMessage('assistant', data.reply);
        setMessages((prev) => [...prev, assistantMsg]);
        if (!isOpen) setHasUnread(true);
        setIsLoading(false);
        return { ok: true };
      } catch (err) {
        const errMsg =
          err instanceof Error ? err.message : 'Network error — please try again';
        setError(errMsg);
        setIsLoading(false);
        return { ok: false, error: errMsg };
      }
    },
    [messages, isOpen],
  );

  const clear = useCallback(() => {
    clearHistoryStorage();
    setMessages([newMessage('assistant', WELCOME_MESSAGE)]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    isOpen,
    hasUnread,
    showFirstVisitNotice,
    dismissNotice,
    open,
    close,
    toggle,
    send,
    clear,
  };
}
