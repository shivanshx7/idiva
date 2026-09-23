![CI](https://github.com/shivanshx7/idiva/actions/workflows/ci.yml/badge.svg)
# idiva

Validate and parse Indian identity and business documents — PAN, Aadhaar, GSTIN, IFSC, UPI, and vehicle registration numbers — with real checksum algorithms where one exists, not just regex guessing.

Most validation libraries for Indian documents check format only. This one goes further where it can: Aadhaar numbers are verified against the **Verhoeff checksum algorithm** (the same class of error-detecting checksum used in ISBN and other high-integrity identifiers), and GSTIN numbers are verified against India's official **mod-36 checksum**. Where no public checksum algorithm exists (PAN's final character, UPI VPAs), the library is explicit about that limitation rather than pretending otherwise.

## Install

```bash
npm install @shivn7h/idiva
```

## Usage

```js
import {
  isValidPAN,
  parsePAN,
  isValidAadhaar,
  isValidGSTIN,
  parseGSTIN,
  isValidIFSC,
  parseIFSC,
  isValidUPI,
  isValidVehicleNumber,
  parseVehicleNumber,
} from '@shivn7h/idiva';

isValidPAN('ABCPE1234F');       // true
parsePAN('ABCPE1234F');
// { valid: true, holderType: 'Individual', fourthChar: 'P' }

isValidAadhaar('234567890124'); // true — passes Verhoeff checksum

isValidGSTIN('27ABCDE1234F1Z0'); // true — passes mod-36 checksum
parseGSTIN('27ABCDE1234F1Z0');
// { valid: true, stateCode: '27', stateName: 'Maharashtra', pan: 'ABCDE1234F', entityCode: '1' }

isValidIFSC('SBIN0001234');     // true
parseIFSC('SBIN0001234');
// { valid: true, bankCode: 'SBIN', branchCode: '001234' }

isValidUPI('shivansh@oksbi');   // true

isValidVehicleNumber('MH12AB1234'); // true
parseVehicleNumber('MH12AB1234');
// { valid: true, stateCode: 'MH', stateName: 'Maharashtra', rtoCode: '12' }
```

Every function accepts messy real-world input — extra whitespace, lowercase, hyphens — and normalizes before validating. None of them throw; invalid or malformed input (including `null`, `undefined`, and non-string values) simply returns `false` or `null`.

## API

| Function | Returns | Checksum verified? |
|---|---|---|
| `isValidPAN(value)` | `boolean` | Structure + holder-type only |
| `parsePAN(value)` | object or `null` | — |
| `isValidAadhaar(value)` | `boolean` | ✅ Verhoeff |
| `isValidGSTIN(value)` | `boolean` | ✅ mod-36 |
| `parseGSTIN(value)` | object or `null` | — |
| `isValidIFSC(value)` | `boolean` | Structure only (no public checksum) |
| `parseIFSC(value)` | object or `null` | — |
| `isValidUPI(value)` | `boolean` | Structure only (no public checksum) |
| `isValidVehicleNumber(value)` | `boolean` | Structure + known state code |
| `parseVehicleNumber(value)` | object or `null` | — |

## What this library does *not* do

This validates structure and, where possible, checksum correctness. It does **not** confirm a document is actually issued, active, or belongs to a real person — that requires a live government API (UIDAI for Aadhaar, GSTN for GSTIN) that isn't publicly available. Treat a `true` result as "well-formed," not "verified to exist."

## Why

Most Node projects touching Indian user data end up writing PAN/GSTIN/IFSC regex inline, once, badly, with no test coverage. This exists so that check is correct once and reusable everywhere.

## License

MIT