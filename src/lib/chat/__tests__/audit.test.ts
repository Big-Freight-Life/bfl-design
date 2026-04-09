import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { audit } from '../audit';

interface ParsedEntry {
  ts: string;
  event: string;
  severity: string;
  source: string;
  [key: string]: unknown;
}

function parseLastCall(spy: ReturnType<typeof vi.spyOn>): ParsedEntry {
  const calls = spy.mock.calls;
  expect(calls.length).toBeGreaterThan(0);
  const line = calls[calls.length - 1][0] as string;
  expect(typeof line).toBe('string');
  expect(line.startsWith('[audit] ')).toBe(true);
  const json = line.slice('[audit] '.length);
  return JSON.parse(json) as ParsedEntry;
}

describe('audit', () => {
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('produces a single-line JSON object with the [audit] prefix', () => {
    audit('chat.request', { messages: 3 });
    expect(logSpy).toHaveBeenCalledTimes(1);
    const line = logSpy.mock.calls[0][0] as string;
    // Exactly one line — no embedded newlines inside the JSON.
    expect(line.includes('\n')).toBe(false);
    expect(line.startsWith('[audit] ')).toBe(true);
    // Ensure the suffix is valid JSON.
    expect(() => JSON.parse(line.slice('[audit] '.length))).not.toThrow();
  });

  it('includes ts, event, severity, source, and spread data fields', () => {
    audit('chat.request', { messages: 5, inputChars: 120 });
    const entry = parseLastCall(logSpy);
    expect(typeof entry.ts).toBe('string');
    // ISO 8601 check — Date parses it back round-trip.
    expect(Number.isNaN(Date.parse(entry.ts))).toBe(false);
    expect(entry.event).toBe('chat.request');
    expect(entry.severity).toBe('info');
    expect(entry.source).toBe('raybot');
    expect(entry.messages).toBe(5);
    expect(entry.inputChars).toBe(120);
  });

  it('derives severity "warn" for chat.blocked.* events', () => {
    const blocked = [
      'chat.blocked.origin',
      'chat.blocked.rate-limit',
      'chat.blocked.budget',
      'chat.blocked.injection',
      'chat.blocked.length',
      'chat.blocked.malformed',
    ] as const;
    for (const event of blocked) {
      logSpy.mockClear();
      audit(event, {});
      const entry = parseLastCall(logSpy);
      expect(entry.severity).toBe('warn');
      expect(entry.event).toBe(event);
    }
  });

  it('derives severity "error" for chat.error', () => {
    audit('chat.error', { reason: 'boom' });
    const entry = parseLastCall(logSpy);
    expect(entry.severity).toBe('error');
  });

  it('derives severity "info" for chat.tool.lead-captured and sets audit flag', () => {
    audit('chat.tool.lead-captured', {});
    const entry = parseLastCall(logSpy);
    expect(entry.severity).toBe('info');
    expect(entry.audit).toBe(true);
  });

  it('derives severity "info" for default / success events', () => {
    audit('chat.success', {});
    expect(parseLastCall(logSpy).severity).toBe('info');
    logSpy.mockClear();
    audit('chat.request', {});
    expect(parseLastCall(logSpy).severity).toBe('info');
    logSpy.mockClear();
    audit('chat.tool.lead-attempt', {});
    expect(parseLastCall(logSpy).severity).toBe('info');
  });

  it('source is always "raybot"', () => {
    const events = ['chat.request', 'chat.error', 'chat.blocked.injection', 'chat.success'] as const;
    for (const event of events) {
      logSpy.mockClear();
      audit(event, {});
      expect(parseLastCall(logSpy).source).toBe('raybot');
    }
  });

  it('data fields do not overwrite required fields', () => {
    // Caller tries to smuggle a different event, severity, source, ts.
    audit('chat.request', {
      event: 'hacked.event',
      severity: 'debug',
      source: 'not-raybot',
      ts: '1999-01-01T00:00:00.000Z',
      // Legitimate spread data alongside the collisions.
      messages: 2,
    } as Record<string, unknown>);
    const entry = parseLastCall(logSpy);
    expect(entry.event).toBe('chat.request');
    expect(entry.severity).toBe('info');
    expect(entry.source).toBe('raybot');
    // ts should be a fresh ISO timestamp, not the smuggled one.
    expect(entry.ts).not.toBe('1999-01-01T00:00:00.000Z');
    expect(Number.isNaN(Date.parse(entry.ts))).toBe(false);
    // But legitimate data still flows through.
    expect(entry.messages).toBe(2);
  });

  it('anonymizes the ip field', () => {
    audit('chat.request', { ip: '203.0.113.42' });
    const entry = parseLastCall(logSpy);
    expect(entry.ip).not.toBe('203.0.113.42');
    expect(typeof entry.ip).toBe('string');
    expect((entry.ip as string).length).toBe(12);
  });

  it('does not throw on non-serializable (circular) data', () => {
    const circular: Record<string, unknown> = { messages: 1 };
    circular.self = circular;
    expect(() => audit('chat.request', circular)).not.toThrow();
    // A fallback line should still have been emitted.
    expect(logSpy).toHaveBeenCalled();
    const entry = parseLastCall(logSpy);
    expect(entry.event).toBe('chat.request');
    expect(entry.source).toBe('raybot');
    expect(entry.severity).toBe('info');
    expect(typeof entry.auditError).toBe('string');
  });
});
