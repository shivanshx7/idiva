import { sanitize } from './utils/sanitize.js';

// IFSC format: 4 letters (bank code) + '0' (reserved) + 6 alphanumeric (branch code)
const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

/**
 * Validates the structural format of an Indian IFSC code
 * (Indian Financial System Code — identifies a bank branch).
 *
 * @param {unknown} value
 * @returns {boolean}
 */
export function isValidIFSC(value) {
  const clean = sanitize(value);
  if (!clean) return false;
  return IFSC_REGEX.test(clean);
}

/**
 * Parses an IFSC code into its components if structurally valid.
 *
 * @param {unknown} value
 * @returns {{ valid: boolean, bankCode: string, branchCode: string } | null}
 */
export function parseIFSC(value) {
  const clean = sanitize(value);
  if (!clean || !IFSC_REGEX.test(clean)) return null;

  return {
    valid: true,
    bankCode: clean.slice(0, 4),
    branchCode: clean.slice(5),
  };
}