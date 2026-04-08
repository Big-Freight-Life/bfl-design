import { describe, it, expect } from 'vitest';
import { sanitizeUserText, sanitizeToolStringInput } from '../sanitize';

describe('sanitizeUserText', () => {
  it('returns empty string for non-string input', () => {
    expect(sanitizeUserText(null, 100).text).toBe('');
    expect(sanitizeUserText(undefined, 100).text).toBe('');
    expect(sanitizeUserText(42, 100).text).toBe('');
  });

  it('strips zero-width characters', () => {
    const input = 'hel\u200Blo\u200C wo\u200Drld\uFEFF';
    expect(sanitizeUserText(input, 100).text).toBe('hello world');
  });

  it('strips bidi control characters', () => {
    const input = 'normal\u202Etext\u202C';
    expect(sanitizeUserText(input, 100).text).toBe('normaltext');
  });

  it('strips dangerous control chars but keeps newlines and tabs', () => {
    const input = 'line one\nline two\tcol\u0000\u0001\u007F';
    expect(sanitizeUserText(input, 100).text).toBe('line one\nline two\tcol');
  });

  it('collapses excessive newline runs', () => {
    const input = 'a\n\n\n\n\n\nb';
    expect(sanitizeUserText(input, 100).text).toBe('a\n\nb');
  });

  it('trims leading/trailing whitespace', () => {
    expect(sanitizeUserText('   hello   ', 100).text).toBe('hello');
  });

  it('truncates to max length', () => {
    const long = 'a'.repeat(200);
    const result = sanitizeUserText(long, 50);
    expect(result.text.length).toBe(50);
  });

  it('NFC-normalizes Unicode', () => {
    // Composed vs decomposed é
    const composed = '\u00e9';
    const decomposed = 'e\u0301';
    const out1 = sanitizeUserText(composed, 100).text;
    const out2 = sanitizeUserText(decomposed, 100).text;
    expect(out1).toBe(out2);
  });

  it('reports modification when input changed', () => {
    const result = sanitizeUserText('  hello  ', 100);
    expect(result.modified).toBe(true);
  });

  it('reports no modification when input was already clean', () => {
    const result = sanitizeUserText('hello world', 100);
    expect(result.modified).toBe(false);
  });
});

describe('sanitizeToolStringInput', () => {
  it('strips HTML tags', () => {
    expect(sanitizeToolStringInput('<script>alert(1)</script>hi', 100)).toBe(
      'alert(1)hi',
    );
  });

  it('strips control chars and zero-width', () => {
    expect(sanitizeToolStringInput('a\u200Bb\u0000c', 100)).toBe('abc');
  });

  it('truncates to max length', () => {
    expect(sanitizeToolStringInput('a'.repeat(200), 50).length).toBe(50);
  });

  it('returns empty for non-string', () => {
    expect(sanitizeToolStringInput(null, 100)).toBe('');
    expect(sanitizeToolStringInput(123, 100)).toBe('');
  });
});
