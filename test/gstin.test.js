import { describe, it, expect } from 'vitest';
import { isValidGSTIN, parseGSTIN } from '../src/gstin.js';

describe('isValidGSTIN', () => {
  it('rejects wrong length', () => {
    expect(isValidGSTIN('27ABCDE1234F1Z')).toBe(false);
  });

  it('rejects wrong structural pattern', () => {
    expect(isValidGSTIN('XXABCDE1234F1Z5')).toBe(false);
  });

  it('rejects non-string and empty input', () => {
    expect(isValidGSTIN(null)).toBe(false);
    expect(isValidGSTIN(undefined)).toBe(false);
    expect(isValidGSTIN(123456789012345)).toBe(false);
    expect(isValidGSTIN('')).toBe(false);
  });

  it('rejects a structurally valid GSTIN with a wrong checksum digit', () => {
    
    expect(isValidGSTIN('27ABCDE1234F1Z5')).toBe(false);
  });

  it('accepts a well-formed GSTIN with the correct checksum', () => {
    expect(isValidGSTIN('27ABCDE1234F1Z0')).toBe(true);
  });
});

describe('parseGSTIN', () => {
  it('returns structured data for a valid GSTIN', () => {
    expect(parseGSTIN('27ABCDE1234F1Z0')).toEqual({
      valid: true,
      stateCode: '27',
      stateName: 'Maharashtra',
      pan: 'ABCDE1234F',
      entityCode: '1',
    });
  });

  it('returns null for an invalid GSTIN', () => {
    expect(parseGSTIN('INVALID')).toBeNull();
  });
});