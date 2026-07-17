---
"@jsfns/core": major
---

- **BREAKING:** `hexToNumber` now returns `NaN` for unparseable input instead of `0`
- **BREAKING:** `hexToRGB` now returns `RGBTuple | null` (was `number[]`); malformed hex (e.g. `''`, `'#ab'`) returns `null` instead of `[0, 0, 0]`
- **BREAKING:** `popAtIndexPure`'s generic `T` now represents the item type rather than the array/tuple type: `popAtIndexPure<T>(list: T[], index): [T | undefined, T[]]`
- Added `popItem`/`popItemPure` to find, remove, and return an array entry by predicate
- Added `roundDecimals`, `minDecimals`, `safeToFixed`, and `toSafeFractionDigits` for safer decimal handling
- `limitDecimals` rebuilt on the new decimal helpers; invalid or out-of-range decimal counts (negative, >100, non-numeric) are now handled safely instead of producing `NaN` or unexpected output
- `getProperty` now accepts an optional `<T>` type parameter to assert the found value's type
- `chunkString` reimplemented without regex; `size <= 0` now explicitly returns `['']`
- Fixed a possible crash in `randomCryptoId` for large `length` values
- Added missing `@typeParam` documentation and fixed minor JSDoc issues (`isGenerator`, `getProperty`, `popAtIndex`, `uniqueArray`, `Maybe`, `Dictionary`)
