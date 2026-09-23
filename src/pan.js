import { sanitize } from './utils/sanitize.js';

// 4th character of a PAN indicates the holder type
const HOLDER_TYPES = {
  P: 'Individual',
  C: 'Company',
  H: 'Hindu Undivided Family (HUF)',
  F: 'Firm',
  A: 'Association of Persons (AOP)',
  T: 'Trust',
  B: 'Body of Individuals (BOI)',
  L: 'Local Authority',
  J: 'Artificial Juridical Person',
  G: 'Government',
};

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

/**
 * Validates the structural format of an Indian PAN (Permanent Account Number).
 * Note: this checks structure only. The final check character is assigned
 * by an internal CBDT algorithm that isn't publicly documented, so it
 * can't be independently re-verified here.
 *
 * @param {unknown} value
 * @returns {boolean}
 */
export function isValidPAN(value) {
  const clean = sanitize(value);
  if (!clean) return false;
  if (!PAN_REGEX.test(clean)) return false;
  return HOLDER_TYPES[clean[3]] !== undefined;
}

/**
 * Parses a PAN into its components if structurally valid.
 *
 * @param {unknown} value
 * @returns {{ valid: boolean, holderType: string, fourthChar: string } | null}
 */
export function parsePAN(value) {
  const clean = sanitize(value);
  if (!clean || !PAN_REGEX.test(clean)) return null;

  const fourthChar = clean[3];
  const holderType = HOLDER_TYPES[fourthChar];
  if (!holderType) return null;

  return {
    valid: true,
    holderType,
    fourthChar,
  };
}