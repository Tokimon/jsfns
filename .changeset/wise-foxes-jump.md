---
"@jsfns/core": major
---

- Added `getProperty` — read a value from an object or array by following a dot-separated or array path; returns `{ success, value }` to distinguish a missing path from a stored `null`/`undefined`
- Added `deleteProperty` — remove a property by path, with `cleanup`, `immutable`, and `safe` options
- Added `isEmpty`
- Added `isObjectLike`
- Refactored `isObject` to build on `isObjectLike`
- Simplified `popAtIndex`
- Moved general-purpose types `NotFirst`, `Maybe`, and `Dictionary` here from `@jsfns/web` (import them from `@jsfns/core/types.d.ts`)
- Bumped TypeScript target to ES2023
