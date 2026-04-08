import { describe, it, expect } from 'vitest';
import {
  validateLeadName,
  validateLeadEmail,
  validateLeadSummary,
  validateLead,
} from '../validation';

describe('validateLeadName', () => {
  it('accepts a normal name', () => {
    expect(validateLeadName('Jane Doe').ok).toBe(true);
  });

  it('accepts names with hyphens and apostrophes', () => {
    expect(validateLeadName("Jean-Pierre O'Connor").ok).toBe(true);
  });

  it('accepts non-Latin characters', () => {
    expect(validateLeadName('María García').ok).toBe(true);
    expect(validateLeadName('李雷').ok).toBe(true);
  });

  it('rejects empty', () => {
    expect(validateLeadName('').ok).toBe(false);
  });

  it('rejects too short', () => {
    expect(validateLeadName('a').ok).toBe(false);
  });

  it('rejects too long', () => {
    expect(validateLeadName('a'.repeat(81)).ok).toBe(false);
  });

  it('rejects all caps gibberish', () => {
    expect(validateLeadName('ASDFGHJK').ok).toBe(false);
  });

  it('rejects names with digits', () => {
    expect(validateLeadName('Jane123').ok).toBe(false);
  });

  it('rejects names with special chars', () => {
    expect(validateLeadName('<script>').ok).toBe(false);
    expect(validateLeadName('Jane@Doe').ok).toBe(false);
  });
});

describe('validateLeadEmail', () => {
  it('accepts a normal email', () => {
    expect(validateLeadEmail('jane@example.org').ok).toBe(true);
  });

  it('rejects invalid format', () => {
    expect(validateLeadEmail('not-an-email').ok).toBe(false);
    expect(validateLeadEmail('a@b').ok).toBe(false);
    expect(validateLeadEmail('@example.com').ok).toBe(false);
    expect(validateLeadEmail('foo@.com').ok).toBe(false);
  });

  it('rejects too long', () => {
    expect(validateLeadEmail('a'.repeat(250) + '@example.org').ok).toBe(false);
  });

  it('rejects disposable email domains', () => {
    expect(validateLeadEmail('foo@mailinator.com').ok).toBe(false);
    expect(validateLeadEmail('foo@guerrillamail.com').ok).toBe(false);
    expect(validateLeadEmail('foo@yopmail.com').ok).toBe(false);
    expect(validateLeadEmail('foo@10minutemail.com').ok).toBe(false);
  });

  it('rejects example.com and test.com', () => {
    expect(validateLeadEmail('foo@example.com').ok).toBe(false);
    expect(validateLeadEmail('foo@test.com').ok).toBe(false);
  });

  it('handles uppercase domain', () => {
    expect(validateLeadEmail('foo@MAILINATOR.COM').ok).toBe(false);
  });
});

describe('validateLeadSummary', () => {
  it('accepts a normal summary', () => {
    expect(
      validateLeadSummary('Visitor wants to redesign their permit system.').ok,
    ).toBe(true);
  });

  it('rejects too short', () => {
    expect(validateLeadSummary('hi').ok).toBe(false);
  });

  it('rejects empty', () => {
    expect(validateLeadSummary('').ok).toBe(false);
  });

  it('rejects too long', () => {
    expect(validateLeadSummary('a'.repeat(1001)).ok).toBe(false);
  });
});

describe('validateLead', () => {
  it('accepts valid lead', () => {
    const result = validateLead({
      name: 'Jane Doe',
      email: 'jane@acme.org',
      summary: 'Wants help redesigning their internal review system.',
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.lead.email).toBe('jane@acme.org');
    }
  });

  it('lowercases email', () => {
    const result = validateLead({
      name: 'Jane Doe',
      email: 'Jane@Acme.Org',
      summary: 'Wants help redesigning their internal review system.',
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.lead.email).toBe('jane@acme.org');
    }
  });

  it('rejects bad name', () => {
    expect(
      validateLead({
        name: '<script>',
        email: 'jane@acme.org',
        summary: 'Wants help redesigning their internal review system.',
      }).ok,
    ).toBe(false);
  });

  it('rejects bad email', () => {
    expect(
      validateLead({
        name: 'Jane Doe',
        email: 'jane@mailinator.com',
        summary: 'Wants help redesigning their internal review system.',
      }).ok,
    ).toBe(false);
  });

  it('rejects bad summary', () => {
    expect(
      validateLead({
        name: 'Jane Doe',
        email: 'jane@acme.org',
        summary: 'hi',
      }).ok,
    ).toBe(false);
  });
});
