import { sanitize } from './utils/sanitize.js';

// Full state code -> name table (as per GST state code list)
const STATE_CODES = {
  '01': 'Jammu and Kashmir',
  '02': 'Himachal Pradesh',
  '03': 'Punjab',
  '04': 'Chandigarh',
  '05': 'Uttarakhand',
  '06': 'Haryana',
  '07': 'Delhi',
  '08': 'Rajasthan',
  '09': 'Uttar Pradesh',
  '10': 'Bihar',
  '11': 'Sikkim',
  '12': 'Arunachal Pradesh',
  '13': 'Nagaland',
  '14': 'Manipur',
  '15': 'Mizoram',
  '16': 'Tripura',
  '17': 'Meghalaya',
  '18': 'Assam',
  '19': 'West Bengal',
  '20': 'Jharkhand',
  '21': 'Odisha',
  '22': 'Chhattisgarh',
  '23': 'Madhya Pradesh',
  '24': 'Gujarat',
  '25': 'Daman and Diu',
  '26': 'Dadra and Nagar Haveli',
  '27': 'Maharashtra',
  '28': 'Andhra Pradesh (Old)',
  '29': 'Karnataka',
  '30': 'Goa',
  '31': 'Lakshadweep',
  '32': 'Kerala',
  '33': 'Tamil Nadu',
  '34': 'Puducherry',
  '35': 'Andaman and Nicobar Islands',
  '36': 'Telangana',
  '37': 'Andhra Pradesh',
  '38': 'Ladakh',
};

const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

// mod-36 checksum alphabet: 0-9 then A-Z
const CHECKSUM_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Computes the mod-36 checksum character for the first 14 characters of a GSTIN.
 * @param {string} first14
 * @returns {string}
 */
function computeChecksum(first14) {
  let factor = 2;
  let sum = 0;
  const codeLength = CHECKSUM_CHARS.length;

  for (let i = first14.length - 1; i >= 0; i--) {
    const codePoint = CHECKSUM_CHARS.indexOf(first14[i]);
    let addend = factor * codePoint;
    factor = factor === 2 ? 1 : 2;
    addend = Math.floor(addend / codeLength) + (addend % codeLength);
    sum += addend;
  }

  const checksumIndex = (codeLength - (sum % codeLength)) % codeLength;
  return CHECKSUM_CHARS[checksumIndex];
}

/**
 * Validates the structural format and mod-36 checksum of a GSTIN.
 *
 * @param {unknown} value
 * @returns {boolean}
 */
export function isValidGSTIN(value) {
  const clean = sanitize(value);
  if (!clean) return false;
  if (clean.length !== 15) return false;
  if (!GSTIN_REGEX.test(clean)) return false;

  const first14 = clean.slice(0, 14);
  const providedChecksum = clean[14];
  return computeChecksum(first14) === providedChecksum;
}

/**
 * Parses a GSTIN into its components if structurally valid and checksum-correct.
 *
 * @param {unknown} value
 * @returns {{ valid: boolean, stateCode: string, stateName: string, pan: string, entityCode: string } | null}
 */
export function parseGSTIN(value) {
  if (!isValidGSTIN(value)) return null;

  const clean = sanitize(value);
  const stateCode = clean.slice(0, 2);

  return {
    valid: true,
    stateCode,
    stateName: STATE_CODES[stateCode] ?? 'Unknown',
    pan: clean.slice(2, 12),
    entityCode: clean[12],
  };
}