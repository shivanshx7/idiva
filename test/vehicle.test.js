import { describe, it, expect } from 'vitest';
import { isValidVehicleNumber, parseVehicleNumber } from '../src/vehicle.js';

describe('isValidVehicleNumber', () => {
  it('accepts a valid vehicle number with single-letter series', () => {
    expect(isValidVehicleNumber('MH12A1234')).toBe(true);
  });

  it('accepts a valid vehicle number with two-letter series', () => {
    expect(isValidVehicleNumber('MH12AB1234')).toBe(true);
  });

  it('accepts lowercase and trims whitespace', () => {
    expect(isValidVehicleNumber('  mh12ab1234  ')).toBe(true);
  });

  it('rejects an unknown state code', () => {
    expect(isValidVehicleNumber('XX12AB1234')).toBe(false);
  });

  it('rejects wrong digit count for RTO code', () => {
    expect(isValidVehicleNumber('MH1AB1234')).toBe(false);
  });

  it('rejects wrong digit count for the final number', () => {
    expect(isValidVehicleNumber('MH12AB123')).toBe(false);
  });

  it('rejects non-string and empty input', () => {
    expect(isValidVehicleNumber(null)).toBe(false);
    expect(isValidVehicleNumber(undefined)).toBe(false);
    expect(isValidVehicleNumber(1234)).toBe(false);
    expect(isValidVehicleNumber('')).toBe(false);
  });
});

describe('parseVehicleNumber', () => {
  it('returns structured data for a valid number', () => {
    expect(parseVehicleNumber('MH12AB1234')).toEqual({
      valid: true,
      stateCode: 'MH',
      stateName: 'Maharashtra',
      rtoCode: '12',
    });
  });

  it('returns null for an invalid number', () => {
    expect(parseVehicleNumber('INVALID')).toBeNull();
  });
});