import { sanitize } from './utils/sanitize.js';

// handle: 2-256 chars, letters/digits/dots/hyphens/underscores
// @ separator
// bank handle: 2-64 chars, letters only (e.g. oksbi, ybl, paytm)
const UPI_REGEX = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;

/**
 * Validates the structural format of a UPI VPA (Virtual Payment Address),
 * e.g. "name@oksbi". This checks format only — there is no public algorithm
 * or API to confirm a VPA is actually registered and active.
 *
 * @param {unknown} value
 * @returns {boolean}
 */
export function isValidUPI(value) {
  // UPI IDs are case-sensitive in the handle portion in practice, but bank
  // handles are conventionally lowercase — sanitize() uppercases everything,
  // which would break this, so UPI validates on trimmed raw input instead.
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (trimmed.length === 0) return false;
  return UPI_REGEX.test(trimmed);
}