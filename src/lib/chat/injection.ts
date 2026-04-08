/**
 * Prompt injection pre-filter.
 *
 * Blocks the most common jailbreak / prompt injection patterns at the
 * input layer BEFORE they reach the model. This is a coarse first line
 * of defense — a determined attacker can always rephrase. The point is to:
 *
 * - Stop low-effort drive-by attacks at zero model cost
 * - Reduce log noise from obvious abuse
 * - Build a forensic signal we can monitor
 *
 * The model itself has additional injection defenses in its system prompt.
 * This filter is a second layer.
 */

// Patterns are matched against a normalized, lowercased version of the input.
// Each pattern is intentionally broad to catch variants.
const INJECTION_PATTERNS: ReadonlyArray<{ name: string; pattern: RegExp }> = [
  // Direct instruction override attempts
  { name: 'ignore-instructions', pattern: /\bignore\s+(?:all\s+)?(?:the\s+)?(?:(?:previous|prior|above|earlier)\s+)?(?:instructions?|prompts?|rules?|guidelines?)\b/i },
  { name: 'disregard-instructions', pattern: /\bdisregard\s+(?:all\s+)?(?:the\s+)?(?:(?:previous|prior|above|earlier)\s+)?(?:instructions?|prompts?|rules?|guidelines?)\b/i },
  { name: 'forget-instructions', pattern: /\bforget\s+(?:everything|all|your|the)\b/i },
  { name: 'override-instructions', pattern: /\boverride\s+(?:your|the|all)\s+(?:instructions?|prompts?|rules?|guidelines?)\b/i },

  // System prompt / role-play attacks
  { name: 'reveal-prompt', pattern: /\b(?:reveal|show|print|display|output|repeat)\s+(?:me\s+)?(?:your|the)\s+(?:system\s+)?(?:prompt|instructions?|guidelines?|rules?)\b/i },
  { name: 'tell-me-instructions', pattern: /\btell\s+me\s+(?:your|the)\s+(?:system\s+)?(?:prompt|instructions?|guidelines?|rules?)\b/i },
  { name: 'verbatim-prompt', pattern: /\brepeat\s+(?:your|the)\s+(?:prompt|instructions?)\s+verbatim\b/i },
  { name: 'what-are-you-told', pattern: /\bwhat\s+(?:have\s+you\s+been|were\s+you|are\s+you)\s+(?:told|instructed|asked|programmed)\b/i },

  // Role-swap / persona injection
  { name: 'you-are-now', pattern: /\byou\s+are\s+now\s+(?!raybot\b)/i },
  { name: 'pretend-to-be', pattern: /\bpretend\s+(?:to\s+be|you\s+are|that\s+you)\b/i },
  { name: 'act-as-if', pattern: /\bact\s+as\s+(?:if\s+you\b|a\b|an\b)/i },
  { name: 'roleplay', pattern: /\brole[\s-]?play(?:\s+as)?\b/i },

  // Known jailbreak names
  { name: 'dan-jailbreak', pattern: /\bdan\b.*\b(?:jail|do\s+anything|broken|free)/i },
  { name: 'developer-mode', pattern: /\b(?:developer|debug|admin|sudo|root)\s+mode\b/i },
  { name: 'switch-mode', pattern: /\bswitch\s+to\s+(?:developer|debug|admin|sudo|root)\s+mode\b/i },
  { name: 'jailbreak', pattern: /\b(?:jailbreak|jail[\s-]?broken)\b/i },

  // System prompt extraction tricks
  { name: 'translate-instructions', pattern: /\btranslate\s+(?:your|the)\s+(?:instructions?|prompt|system)\b/i },
  { name: 'encode-decode-prompt', pattern: /\b(?:encode|decode)\s+(?:your|the)\s+(?:instructions?|prompt|system)\b/i },
  { name: 'continue-after', pattern: /\bcontinue\s+(?:after|past)\s+(?:your|the)\s+(?:instructions?|system|prompt)\b/i },

  // No safety claims
  { name: 'no-restrictions', pattern: /\b(?:no|without)\s+(?:restrictions?|safety|filters?|guardrails?|limits?)\b/i },
  { name: 'unrestricted-ai', pattern: /\bunrestricted\s+(?:ai|assistant|chat|mode|model)\b/i },
];

export interface InjectionCheckResult {
  detected: boolean;
  /** Name of the matched pattern, if any (for logging) */
  pattern?: string;
}

export function detectInjection(input: string): InjectionCheckResult {
  if (typeof input !== 'string' || input.length === 0) {
    return { detected: false };
  }

  // Normalize for matching: lowercase, collapse whitespace, strip non-printable
  const normalized = input
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  for (const { name, pattern } of INJECTION_PATTERNS) {
    if (pattern.test(normalized)) {
      return { detected: true, pattern: name };
    }
  }

  return { detected: false };
}
