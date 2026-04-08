/**
 * Origin / Referer header check.
 *
 * Defense in depth — these headers can be spoofed by determined attackers,
 * but they raise the bar significantly against drive-by abuse and bots
 * calling our API directly.
 */

const PRODUCTION_ORIGINS = [
  'https://bfl.design',
  'https://www.bfl.design',
  'https://bfl-design.vercel.app',
];

const DEV_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
];

export function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');

  // Allow extra origins from env var (comma-separated)
  const envExtra = process.env.CHAT_ALLOWED_ORIGINS?.split(',').map((s) => s.trim()) ?? [];

  const allowed = [...PRODUCTION_ORIGINS, ...envExtra];
  if (process.env.NODE_ENV !== 'production') {
    allowed.push(...DEV_ORIGINS);
  }

  // Allow Vercel preview deployments (bfl-design-*.vercel.app)
  const isVercelPreview = (url: string | null): boolean => {
    if (!url) return false;
    try {
      const parsed = new URL(url);
      return (
        parsed.hostname.endsWith('.vercel.app') &&
        parsed.hostname.includes('bfl-design')
      );
    } catch {
      return false;
    }
  };

  if (origin && (allowed.includes(origin) || isVercelPreview(origin))) {
    return true;
  }

  if (referer) {
    if (isVercelPreview(referer)) return true;
    if (allowed.some((a) => referer.startsWith(a))) return true;
  }

  return false;
}
