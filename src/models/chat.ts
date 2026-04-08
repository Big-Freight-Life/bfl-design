/**
 * Chat model — pure TypeScript, no React.
 *
 * Defines message types, validation, persistence, and the system prompt
 * that gives the BFL chatbot its personality and knowledge.
 */

export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  /** Unix ms — used for ordering and display */
  timestamp: number;
}

export interface LeadCapture {
  name: string;
  email: string;
  context: string;
  capturedAt: number;
}

const STORAGE_KEY = 'bfl-chat-history-v1';
const LEAD_KEY = 'bfl-chat-lead-v1';
const MAX_HISTORY = 50;
export const MAX_MESSAGE_LENGTH = 2000;

/** Validate a user message before sending. Returns error string or null. */
export function validateMessage(text: string): string | null {
  const trimmed = text.trim();
  if (trimmed.length === 0) return 'Message cannot be empty';
  if (trimmed.length > MAX_MESSAGE_LENGTH)
    return `Message too long (max ${MAX_MESSAGE_LENGTH} characters)`;
  return null;
}

export function newMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    role,
    content,
    timestamp: Date.now(),
  };
}

/** Load messages from localStorage. Returns empty array if unavailable or corrupt. */
export function loadHistory(): ChatMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (m): m is ChatMessage =>
        typeof m === 'object' &&
        m !== null &&
        typeof m.id === 'string' &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        typeof m.timestamp === 'number',
    );
  } catch {
    return [];
  }
}

/** Save messages to localStorage, capped at MAX_HISTORY (keeps newest). */
export function saveHistory(messages: ChatMessage[]): void {
  if (typeof window === 'undefined') return;
  try {
    const trimmed = messages.slice(-MAX_HISTORY);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // localStorage may be disabled or full — silently ignore
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(LEAD_KEY);
  } catch {
    // ignore
  }
}

export function loadLead(): LeadCapture | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(LEAD_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      typeof parsed.name === 'string' &&
      typeof parsed.email === 'string'
    ) {
      return parsed as LeadCapture;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveLead(lead: LeadCapture): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LEAD_KEY, JSON.stringify(lead));
  } catch {
    // ignore
  }
}

// System prompt has moved to @/lib/chat/prompts.ts as a versioned template.
