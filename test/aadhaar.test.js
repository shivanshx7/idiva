import { describe, it, expect } from 'vitest';
import { isValidAadhaar } from '../src/aadhaar.js';
import { validateVerhoeff } from '../src/utils/verhoeff.js';

describe('validateVerhoeff (isolated algorithm check)', () => {
  it('validates a known-correct Verhoeff sequence', () => {
    // "2363" is a standard test vector for the Verhoeff algorithm
    expect(validateVerhoeff('2363')).toBe(true);
  });

  it('rejects a sequence with a corrupted digit', () => {
    expect(validateVerhoeff('2364')).toBe(false);
  });
});

describe('isValidAadhaar', () => {
  it('rejects wrong length', () => {
    expect(isValidAadhaar('12345')).toBe(false);
    expect(isValidAadhaar('1234567890123')).toBe(false);
  });

  it('rejects numbers starting with 0 or 1', () => {
    expect(isValidAadhaar('012345678901')).toBe(false);
    expect(isValidAadhaar('112345678901')).toBe(false);
  });

  it('rejects non-numeric characters', () => {
    expect(isValidAadhaar('23456789012A')).toBe(false);
  });

  it('rejects non-string and empty input', () => {
    expect(isValidAadhaar(null)).toBe(false);
    expect(isValidAadhaar(undefined)).toBe(false);
    expect(isValidAadhaar(234567890123)).toBe(false);
    expect(isValidAadhaar('')).toBe(false);
  });

  it('rejects a 12-digit number that fails the Verhoeff checksum', () => {
    // structurally fine (starts 2-9, 12 digits) but checksum will fail
    // for an arbitrary sequence not constructed to pass
    expect(isValidAadhaar('234567890123')).toBe(false);
  });
  
  it('accepts a well-formed number that passes the Verhoeff checksum', () => {
  expect(isValidAadhaar('234567890124')).toBe(true);
  });
});