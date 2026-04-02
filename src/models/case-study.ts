export interface CaseStudyCredentials {
  email: string;
  password: string;
}

export function validateCredentials(creds: CaseStudyCredentials): string | null {
  if (!creds.email.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(creds.email)) return 'Invalid email';
  if (!creds.password) return 'Password is required';
  return null;
}

export async function authenticateCaseStudy(creds: CaseStudyCredentials): Promise<{ success: boolean; error?: string }> {
  const response = await fetch('/api/case-study-auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    return { success: false, error: body.error ?? 'Authentication failed' };
  }
  return { success: true };
}
