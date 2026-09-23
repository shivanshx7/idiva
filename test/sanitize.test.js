import { describe, it, expect } from 'vitest';
import { sanitize } from '../src/utils/sanitize.js';

describe('sanitize', () => {
  it('trims and uppercases a valid string', () => {
    expect(sanitize('  abcde1234f  ')).toBe('ABCDE1234F');
  });

  it('strips internal spaces', () => {
    expect(sanitize('2341 2341 2341')).toBe('234123412341');
  });

  it('strips hyphens', () => {
    expect(sanitize('ABC-123')).toBe('ABC123');
  });

  it('returns null for non-string input', () => {
    expect(sanitize(null)).toBeNull();
    expect(sanitize(undefined)).toBeNull();
    expect(sanitize(12345)).toBeNull();
    expect(sanitize({})).toBeNull();
  });

  it('returns null for empty or whitespace-only string', () => {
    expect(sanitize('')).toBeNull();
    expect(sanitize('   ')).toBeNull();
  });
});