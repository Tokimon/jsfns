# @jsfns/core

## 2.0.0

### Major Changes

- 92ae9de: - Added `toWords`
  - Refactored casing methods to use `toWords` instead of `phrasify`
  - `phrasify` now also uses `toWords`
  - Migrated away from `jest` to `vitest`
  - Upgraded Typescript to TSGO
  - Added missing test in test that did not have 100% coverage. Now all tests have 100% coverage
  - Updated package dependencies
- 61deebc: - Renamed `minMax` to `clamp` (and restructured arguments a bit)
  - Improved typescipt build and validation, using tsgo
  - Dropped support for .cjs files
- a1b3155: - Added `getProperty` — read a value from an object or array by following a dot-separated or array path; returns `{ success, value }` to distinguish a missing path from a stored `null`/`undefined`
  - Added `deleteProperty` — remove a property by path, with `cleanup`, `immutable`, and `safe` options
  - Added `isEmpty`
  - Added `isObjectLike`
  - Refactored `isObject` to build on `isObjectLike`
  - Simplified `popAtIndex`
  - Moved general-purpose types `NotFirst`, `Maybe`, and `Dictionary` here from `@jsfns/web` (import them from `@jsfns/core/types.js`)
  - Bumped TypeScript target to ES2023

### Patch Changes

- 607aeb6: - Updated is\*\* method signatures (but not functionality)

## 1.2.1

### Patch Changes

- 7ac56c4: Added better documentation and type descriptions

## 1.2.0

### Minor Changes

- Updates:
  - Switched to Biome for linting and formatting
  - Added `throttle` and `debounce` methods
