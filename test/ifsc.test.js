import { describe, it, expect } from 'vitest';
import { isValidIFSC, parseIFSC } from '../src/ifsc.js';

describe('isValidIFSC', () => {
  it('accepts a valid IFSC', () => {
    expect(isValidIFSC('SBIN0001234')).toBe(true);
  });

  it('accepts lowercase and trims whitespace', () => {
    expect(isValidIFSC('  sbin0001234  ')).toBe(true);
  });

  it('rejects wrong length', () => {
    expect(isValidIFSC('SBIN000123')).toBe(false);
    expect(isValidIFSC('SBIN00012345')).toBe(false);
  });

  it('rejects when 5th character is not 0', () => {
    expect(isValidIFSC('SBIN1001234')).toBe(false);
  });

  it('rejects non-letter bank code', () => {
    expect(isValidIFSC('12IN0001234')).toBe(false);
  });

  it('rejects non-string and empty input', () => {
    expect(isValidIFSC(null)).toBe(false);
    expect(isValidIFSC(undefined)).toBe(false);
    expect(isValidIFSC(9999)).toBe(false);
    expect(isValidIFSC('')).toBe(false);
  });
});

describe('parseIFSC', () => {
  it('returns structured data for a valid IFSC', () => {
    expect(parseIFSC('SBIN0001234')).toEqual({
      valid: true,
      bankCode: 'SBIN',
      branchCode: '001234',
    });
  });

  it('returns null for an invalid IFSC', () => {
    expect(parseIFSC('INVALID')).toBeNull();
  });
});