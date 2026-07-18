# @jsfns/core

## 3.0.0

### Major Changes

- 2321171: - **BREAKING:** `hexToNumber` now returns `NaN` for unparseable input instead of `0`
  - **BREAKING:** `hexToRGB` now returns `RGBTuple | null` (was `number[]`); malformed hex (e.g. `''`, `'#ab'`) returns `null` instead of `[0, 0, 0]`
  - **BREAKING:** `popAtIndexPure`'s generic `T` now represents the item type rather than the array/tuple type: `popAtIndexPure<T>(list: T[], index): [T | undefined, T[]]`
  - Added `popItem`/`popItemPure` to find, remove, and return an array entry by predicate
  - Added `roundDecimals`, `minDecimals`, `safeToFixed`, and `toSafeFractionDigits` for safer decimal handling
  - `limitDecimals` rebuilt on the new decimal helpers; invalid or out-of-range decimal counts (negative, >100, non-numeric) are now handled safely instead of producing `NaN` or unexpected output
  - `getProperty` now accepts an optional `<T>` type parameter to assert the found value's type
  - `chunkString` reimplemented without regex; `size <= 0` now explicitly returns `['']`
  - Fixed a possible crash in `randomCryptoId` for large `length` values
  - Added missing `@typeParam` documentation and fixed minor JSDoc issues (`isGenerator`, `getProperty`, `popAtIndex`, `uniqueArray`, `Maybe`, `Dictionary`)

### Minor Changes

- fb01ed0: - Added `MicroEvents`, a simple, environment-agnostic typed event bus (`subscribe`, `unsubscribe`, `unsubscribeAll`, `trigger`), with `once` and `when` subscription options

## 2.1.0

### Minor Changes

- b85fd0d: Cross-realm support for value guards:

  - Add `isMap`, `isSet`, and `isPlainObject` guards that work across realms (e.g. iframes)
  - Add a `getObjectName` helper
  - `isEmpty` now correctly recognises `Map`s, `Set`s, and plain objects from another realm

## 2.0.1

### Patch Changes

- c485298: Update Methods listing table in README

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
