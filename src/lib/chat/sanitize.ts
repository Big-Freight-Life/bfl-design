/**
 * Input sanitization for chat messages.
 *
 * Defends against:
 * - Unicode homoglyph / normalization attacks (NFC normalization)
 * - Zero-width and bidi control characters used to hide text
 * - Control characters that could break protocols downstream
 * - Oversized inputs
 */

// Zero-width chars + bidi controls + BOM
const HIDDEN_CHARS_RE = /[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g;

// Control chars except \n (\u000A), \r (\u000D), \t (\u0009)
const CONTROL_CHARS_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export interface SanitizeResult {
  text: string;
  /** Original length before sanitization */
  originalLength: number;
  /** Whether the input was modified during sanitization */
  modified: boolean;
}

export function sanitizeUserText(input: unknown, maxLength: number): SanitizeResult {
  if (typeof input !== 'string') {
    return { text: '', originalLength: 0, modified: false };
  }

  const original = input;

  // 1. Unicode normalize (NFC) — defangs homoglyph variants
  let result = original.normalize('NFC');

  // 2. Strip zero-width / bidi controls
  result = result.replace(HIDDEN_CHARS_RE, '');

  // 3. Strip dangerous control chars (keep \n, \r, \t)
  result = result.replace(CONTROL_CHARS_RE, '');

  // 4. Collapse excessive whitespace runs (4+ newlines → 2)
  result = result.replace(/\n{4,}/g, '\n\n');

  // 5. Trim leading/trailing whitespace
  result = result.trim();

  // 6. Hard length cap
  if (result.length > maxLength) {
    result = result.slice(0, maxLength);
  }

  return {
    text: result,
    originalLength: original.length,
    modified: result !== original,
  };
}

/**
 * Sanitize a string we got from an LLM tool call.
 * More aggressive: also strips anything that looks like HTML/script.
 */
export function sanitizeToolStringInput(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') return '';
  let result = input.normalize('NFC');
  result = result.replace(HIDDEN_CHARS_RE, '');
  result = result.replace(CONTROL_CHARS_RE, '');
  // Strip HTML-ish content (defense in depth — we render as text but tool inputs go to email)
  result = result.replace(/<[^>]*>/g, '');
  result = result.trim();
  if (result.length > maxLength) result = result.slice(0, maxLength);
  return result;
}
