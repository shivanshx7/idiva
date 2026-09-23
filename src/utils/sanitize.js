/**
 * Normalizes input before validation: trims whitespace, uppercases,
 * and strips spaces/hyphens. Returns null for anything that isn't
 * a usable string, so validators can bail out safely without throwing.
 *
 * @param {unknown} value
 * @returns {string | null}
 */
export function sanitize(value) {
  if (typeof value !== 'string') return null;

  const cleaned = value.trim().toUpperCase().replace(/[\s-]/g, '');

  if (cleaned.length === 0) return null;

  return cleaned;
}