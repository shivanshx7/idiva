import { describe, it, expect } from 'vitest';
import { isValidPAN, parsePAN } from '../src/pan.js';

describe('isValidPAN', () => {
  it('accepts a valid PAN', () => {
    expect(isValidPAN('ABCPE1234F')).toBe(true);
  });

  it('accepts lowercase and trims whitespace', () => {
    expect(isValidPAN('  abcpe1234f  ')).toBe(true);
  });

  it('rejects wrong length', () => {
    expect(isValidPAN('ABCPE1234')).toBe(false);
    expect(isValidPAN('ABCPE1234FF')).toBe(false);
  });

  it('rejects wrong character pattern', () => {
    expect(isValidPAN('12345ABCDE')).toBe(false);
    expect(isValidPAN('ABCPE123F4')).toBe(false);
  });

  it('rejects an invalid holder-type character', () => {
    expect(isValidPAN('ABCXE1234F')).toBe(false); // 'X' is not a valid holder type
  });

  it('rejects non-string and empty input', () => {
    expect(isValidPAN(null)).toBe(false);
    expect(isValidPAN(undefined)).toBe(false);
    expect(isValidPAN(12345)).toBe(false);
    expect(isValidPAN('')).toBe(false);
  });
});

describe('parsePAN', () => {
  it('returns structured data for a valid PAN', () => {
    expect(parsePAN('ABCPE1234F')).toEqual({
      valid: true,
      holderType: 'Individual',
      fourthChar: 'P',
    });
  });

  it('returns null for an invalid PAN', () => {
    expect(parsePAN('INVALID')).toBeNull();
  });
});