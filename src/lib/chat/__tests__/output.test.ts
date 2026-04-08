import { describe, it, expect } from 'vitest';
import { sanitizeBotReply } from '../output';

describe('sanitizeBotReply', () => {
  it('passes through normal text', () => {
    expect(sanitizeBotReply('Hello, how can I help?')).toBe('Hello, how can I help?');
  });

  it('strips script tags', () => {
    expect(sanitizeBotReply('Hello<script>alert(1)</script>world')).toBe('Helloworld');
  });

  it('strips style tags and content', () => {
    expect(sanitizeBotReply('a<style>body{color:red}</style>b')).toBe('ab');
  });

  it('strips arbitrary HTML tags', () => {
    expect(sanitizeBotReply('Hello <b>bold</b> and <i>italic</i>')).toBe('Hello bold and italic');
  });

  it('strips zero-width and control chars', () => {
    expect(sanitizeBotReply('a\u200Bb\u0000c')).toBe('abc');
  });

  it('caps length and adds ellipsis', () => {
    const long = 'a'.repeat(5000);
    const result = sanitizeBotReply(long);
    expect(result.length).toBeLessThanOrEqual(4001);
    expect(result.endsWith('…')).toBe(true);
  });

  it('handles non-string', () => {
    // @ts-expect-error - testing runtime safety
    expect(sanitizeBotReply(null)).toBe('');
    // @ts-expect-error - testing runtime safety
    expect(sanitizeBotReply(42)).toBe('');
  });

  it('trims whitespace', () => {
    expect(sanitizeBotReply('  hello  ')).toBe('hello');
  });
});
