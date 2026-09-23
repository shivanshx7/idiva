import { sanitize } from './utils/sanitize.js';
import { validateVerhoeff } from './utils/verhoeff.js';

// Aadhaar is 12 digits and, per UIDAI rules, never starts with 0 or 1
const AADHAAR_REGEX = /^[2-9][0-9]{11}$/;

/**
 * Validates the structural format and Verhoeff checksum of an Aadhaar number.
 * Note: this confirms the number is well-formed and internally consistent —
 * it does not confirm the Aadhaar is actually issued or active, which
 * requires a live UIDAI lookup that isn't publicly available.
 *
 * @param {unknown} value
 * @returns {boolean}
 */
export function isValidAadhaar(value) {
  const clean = sanitize(value);
  if (!clean) return false;
  if (!AADHAAR_REGEX.test(clean)) return false;
  return validateVerhoeff(clean);
}