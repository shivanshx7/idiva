import { sanitize } from './utils/sanitize.js';

// State/UT codes used on vehicle registration plates (distinct from GSTIN's numeric codes)
const VEHICLE_STATE_CODES = {
  AP: 'Andhra Pradesh', AR: 'Arunachal Pradesh', AS: 'Assam', BR: 'Bihar',
  CG: 'Chhattisgarh', GA: 'Goa', GJ: 'Gujarat', HR: 'Haryana',
  HP: 'Himachal Pradesh', JH: 'Jharkhand', KA: 'Karnataka', KL: 'Kerala',
  MP: 'Madhya Pradesh', MH: 'Maharashtra', MN: 'Manipur', ML: 'Meghalaya',
  MZ: 'Mizoram', NL: 'Nagaland', OD: 'Odisha', PB: 'Punjab',
  RJ: 'Rajasthan', SK: 'Sikkim', TN: 'Tamil Nadu', TS: 'Telangana',
  TR: 'Tripura', UP: 'Uttar Pradesh', UK: 'Uttarakhand', WB: 'West Bengal',
  AN: 'Andaman and Nicobar Islands', CH: 'Chandigarh',
  DN: 'Dadra and Nagar Haveli and Daman and Diu', DL: 'Delhi',
  JK: 'Jammu and Kashmir', LA: 'Ladakh', LD: 'Lakshadweep', PY: 'Puducherry',
};

// SS DD L(L) NNNN — 2 letters, 2 digits, 1-2 letters, 4 digits
const VEHICLE_REGEX = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;

/**
 * Validates the structural format of an Indian vehicle registration number,
 * e.g. "MH12AB1234". Checks format and known state code only.
 *
 * @param {unknown} value
 * @returns {boolean}
 */
export function isValidVehicleNumber(value) {
  const clean = sanitize(value);
  if (!clean) return false;
  if (!VEHICLE_REGEX.test(clean)) return false;
  const stateCode = clean.slice(0, 2);
  return VEHICLE_STATE_CODES[stateCode] !== undefined;
}

/**
 * Parses a vehicle registration number into its components if valid.
 *
 * @param {unknown} value
 * @returns {{ valid: boolean, stateCode: string, stateName: string, rtoCode: string } | null}
 */
export function parseVehicleNumber(value) {
  const clean = sanitize(value);
  if (!clean || !VEHICLE_REGEX.test(clean)) return null;

  const stateCode = clean.slice(0, 2);
  const stateName = VEHICLE_STATE_CODES[stateCode];
  if (!stateName) return null;

  return {
    valid: true,
    stateCode,
    stateName,
    rtoCode: clean.slice(2, 4),
  };
}