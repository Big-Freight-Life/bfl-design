/**
 * Lead capture validation.
 *
 * Server-side validation that runs on EVERY tool call from the model.
 * Never trust the model's output blindly — every field is re-validated here.
 */

// RFC 5322-ish but simplified — good enough for sanity check
const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;

// Common disposable / burner email domains. Not exhaustive — defense in depth.
const DISPOSABLE_DOMAINS = new Set<string>([
  'mailinator.com',
  'mailinator.net',
  'mailinator.org',
  'guerrillamail.com',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamail.biz',
  'guerrillamail.de',
  'guerrillamailblock.com',
  'sharklasers.com',
  'grr.la',
  '10minutemail.com',
  '10minutemail.net',
  'tempmail.com',
  'temp-mail.org',
  'temp-mail.io',
  'tempmailaddress.com',
  'throwawaymail.com',
  'yopmail.com',
  'yopmail.net',
  'yopmail.fr',
  'yopmail.org',
  'maildrop.cc',
  'discard.email',
  'discardmail.com',
  'trashmail.com',
  'trashmail.net',
  'trashmail.de',
  'getnada.com',
  'nada.email',
  'fakeinbox.com',
  'dispostable.com',
  'mintemail.com',
  'mailcatch.com',
  'spambox.us',
  'spam4.me',
  'emailondeck.com',
  'mohmal.com',
  'fake-email.net',
  'fakemail.net',
  'deadaddress.com',
  'mailnesia.com',
  'tempinbox.com',
  'spamgourmet.com',
  'inboxbear.com',
  'tempr.email',
  'moakt.com',
]);

const NAME_RE = /^[\p{L}\p{M}.''\- ]{2,80}$/u;

export interface LeadValidationResult {
  ok: boolean;
  /** Error message safe to surface back to the model (not the user) */
  error?: string;
}

export function validateLeadName(name: string): LeadValidationResult {
  if (!name) return { ok: false, error: 'Name is required' };
  if (name.length < 2) return { ok: false, error: 'Name too short' };
  if (name.length > 80) return { ok: false, error: 'Name too long' };
  // Reject ALL CAPS gibberish (heuristic)
  if (name === name.toUpperCase() && name.length > 4) {
    return { ok: false, error: 'Name should not be all caps' };
  }
  // Allow letters, marks, common punctuation
  if (!NAME_RE.test(name)) {
    return { ok: false, error: 'Name contains invalid characters' };
  }
  return { ok: true };
}

export function validateLeadEmail(email: string): LeadValidationResult {
  if (!email) return { ok: false, error: 'Email is required' };
  if (email.length > 254) return { ok: false, error: 'Email too long' };
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'Invalid email format' };

  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return { ok: false, error: 'Invalid email domain' };

  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { ok: false, error: 'Disposable email addresses are not accepted' };
  }

  // Block obviously fake domains
  if (domain === 'example.com' || domain === 'test.com' || domain === 'localhost') {
    return { ok: false, error: 'Please use a real email address' };
  }

  return { ok: true };
}

export function validateLeadSummary(summary: string): LeadValidationResult {
  if (!summary) return { ok: false, error: 'Summary is required' };
  if (summary.length < 10) return { ok: false, error: 'Summary too short' };
  if (summary.length > 1000) return { ok: false, error: 'Summary too long' };
  return { ok: true };
}

export interface ValidatedLead {
  name: string;
  email: string;
  summary: string;
}

export function validateLead(input: {
  name: string;
  email: string;
  summary: string;
}): { ok: true; lead: ValidatedLead } | { ok: false; error: string } {
  const nameCheck = validateLeadName(input.name);
  if (!nameCheck.ok) return { ok: false, error: nameCheck.error! };

  const emailCheck = validateLeadEmail(input.email);
  if (!emailCheck.ok) return { ok: false, error: emailCheck.error! };

  const summaryCheck = validateLeadSummary(input.summary);
  if (!summaryCheck.ok) return { ok: false, error: summaryCheck.error! };

  return {
    ok: true,
    lead: {
      name: input.name,
      email: input.email.toLowerCase(),
      summary: input.summary,
    },
  };
}
