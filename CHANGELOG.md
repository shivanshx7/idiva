# Changelog

All notable changes to this project are documented here.
This project follows [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-09-23

### Added
- `isValidPAN` / `parsePAN` — structural validation and holder-type parsing for PAN
- `isValidAadhaar` — 12-digit format validation with Verhoeff checksum verification
- `isValidGSTIN` / `parseGSTIN` — structural validation with mod-36 checksum verification, state code and embedded PAN extraction
- `isValidIFSC` / `parseIFSC` — structural validation and bank/branch code parsing
- `isValidUPI` — VPA format validation
- `isValidVehicleNumber` / `parseVehicleNumber` — structural validation with known-state-code check and RTO code parsing
- Full test suite (51 tests) covering valid input, malformed input, and non-string/null/undefined input for every function