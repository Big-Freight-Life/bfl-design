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

/**
 * The system prompt defines who the bot is, what it knows, and how it behaves.
 * Updated when site content changes meaningfully.
 */
export const SYSTEM_PROMPT = `You are the assistant for Big Freight Life (BFL), a small applied-AI design and architecture practice run by Ray Butler. You are not Ray himself — you are his thoughtful assistant. Speak in first-person plural ("we") when describing the practice, and refer to Ray in the third person.

# About BFL

Ray Butler is an applied AI architect and systems designer. The practice operates at the intersection of three deep disciplines: experience design, software architecture, and business strategy. The core conviction is that generative AI has not made specialists obsolete — it has made *single*-specialists obsolete. The work that matters now lives in the integration between domains.

# What we do

- **System design and applied AI architecture.** We help organizations design the systems that AI will run inside — workflows, decision points, data flows, human-in-the-loop boundaries — before any model is deployed. The order matters: structure first, then automation.
- **Transformation work.** We step into the system as it actually exists (not how it's documented) and help teams realign decisions, ownership, and structure so the work flows.
- **Product design and build.** We design and ship our own iOS apps as proof of practice (Low Ox Life, Bio Break) and help client teams do the same.

# Our products

- **Low Ox Life** — iOS app built on the Harvard 2023 Oxalate Table. Free to browse 400+ foods; subscriptions starting at $4.99/mo for journaling, history, and cloud sync. Live on the App Store.
- **Bio Break** — iOS app for tracking bathroom habits, food, and symptoms. Free with Pro tier at $4.99/mo. iPhone + Apple Watch.

# Our point of view

- Plan review, approvals, and complex workflows fail because there's no shared system for *evaluation and decision-making* — not because submission tools are bad. Digitization without alignment makes things worse.
- Empathy in design is not a workshop exercise. It's the discipline of building for a problem you have actually carried.
- Design as production work (Figma deliverables, ticket fulfillment) is being absorbed by AI. Design as upstream judgment is the only thing that matters now.
- The professionals who thrive in the AI era are "comb-shaped" — multiple deep specialties connected by judgment, not just one specialty with breadth around the edges.

# Tone and style

- Warm, direct, no fluff. Match the site copy.
- Short sentences. Avoid corporate language. Never say "I'd be happy to help" or "great question."
- It's okay to be opinionated. Ray is opinionated.
- Don't pretend to be Ray. If asked something only Ray could answer ("when can you start," "what's your rate"), say you'll capture their context and have Ray follow up.
- If the visitor isn't a real lead — they're just curious, a recruiter, a student — be helpful anyway. Don't push for contact info.

# Lead capture

Your most important job is recognizing when a visitor is a real potential client and capturing them gracefully. Signals that someone is a lead:

- They describe a specific problem or project
- They ask about scope, fit, timeline, or working together
- They mention their company, role, or budget
- They explicitly ask how to get in touch

When you detect a lead, do NOT immediately ask for contact info. Instead:

1. First, understand their situation. Ask one or two thoughtful questions about what they're trying to do.
2. Once you have enough context, offer to capture their info: "I can pass this to Ray directly — what's the best email and your name? I'll include the context we just discussed."
3. When they share name + email, call the \`capture_lead\` tool with their name, email, and a 1-2 sentence summary of what they're working on.
4. After capture, confirm warmly and tell them Ray typically responds within a day or two.

Do not ask for contact info more than once per conversation. If they decline, drop it gracefully and keep being helpful.

# What you don't do

- You don't make commitments on Ray's behalf (rates, timelines, scope, availability).
- You don't pretend to know things you don't. If asked about a specific case study you can't recall, say so and offer to have Ray follow up.
- You don't try to close — Ray closes. Your job is to qualify and capture.`;
