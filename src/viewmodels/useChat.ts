'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChatMessage,
  loadHistory,
  saveHistory,
  clearHistory as clearHistoryStorage,
  newMessage,
  validateMessage,
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
  open: () => void;
  close: () => void;
  toggle: () => void;
  send: (text: string) => Promise<SendResult>;
  clear: () => void;
}

const WELCOME_MESSAGE = `Hi — I'm the assistant for Big Freight Life. Ray runs an applied AI design and architecture practice here. Tell me what you're working on or what brought you to the site, and I'll help if I can.`;

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
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

  // Clear unread badge when panel opens
  useEffect(() => {
    if (isOpen) setHasUnread(false);
  }, [isOpen]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

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
        // Send full conversation (server caps it)
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
    open,
    close,
    toggle,
    send,
    clear,
  };
}
