import { describe, it, expect } from 'vitest';
import { isValidUPI } from '../src/upi.js';

describe('isValidUPI', () => {
  it('accepts a valid UPI VPA', () => {
    expect(isValidUPI('shivansh@oksbi')).toBe(true);
    expect(isValidUPI('shivansh.sharma@ybl')).toBe(true);
    expect(isValidUPI('shivansh_99@paytm')).toBe(true);
  });

  it('trims surrounding whitespace', () => {
    expect(isValidUPI('  shivansh@oksbi  ')).toBe(true);
  });

  it('rejects missing @ separator', () => {
    expect(isValidUPI('shivanshoksbi')).toBe(false);
  });

  it('rejects a bank handle with digits or symbols', () => {
    expect(isValidUPI('shivansh@ok123')).toBe(false);
  });

  it('rejects an empty handle before @', () => {
    expect(isValidUPI('@oksbi')).toBe(false);
  });

  it('rejects non-string and empty input', () => {
    expect(isValidUPI(null)).toBe(false);
    expect(isValidUPI(undefined)).toBe(false);
    expect(isValidUPI(12345)).toBe(false);
    expect(isValidUPI('')).toBe(false);
  });
});