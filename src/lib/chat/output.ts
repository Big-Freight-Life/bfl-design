/**
 * Output sanitization for bot replies.
 *
 * Defense in depth — even though our frontend renders bot output as plain
 * text (not HTML), we still sanitize before returning to the client. If
 * downstream code is ever changed to render markdown or HTML, this prevents
 * a model-generated XSS payload from sneaking through.
 */

const HIDDEN_CHARS_RE = /[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g;
const CONTROL_CHARS_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

// Strip simple HTML/script-ish content as defense in depth
const TAG_RE = /<\/?[a-zA-Z][^>]*>/g;
const SCRIPT_BLOCK_RE = /<script[\s\S]*?<\/script>/gi;
const STYLE_BLOCK_RE = /<style[\s\S]*?<\/style>/gi;

const MAX_REPLY_LENGTH = 4000;

export function sanitizeBotReply(text: string): string {
  if (typeof text !== 'string') return '';

  let result = text.normalize('NFC');

  // Remove script/style blocks first (before generic tag stripping)
  result = result.replace(SCRIPT_BLOCK_RE, '');
  result = result.replace(STYLE_BLOCK_RE, '');

  // Strip any remaining HTML tags
  result = result.replace(TAG_RE, '');

  // Strip hidden chars and control chars
  result = result.replace(HIDDEN_CHARS_RE, '');
  result = result.replace(CONTROL_CHARS_RE, '');

  // Trim and cap length
  result = result.trim();
  if (result.length > MAX_REPLY_LENGTH) {
    result = result.slice(0, MAX_REPLY_LENGTH).trimEnd() + '…';
  }

  return result;
}
