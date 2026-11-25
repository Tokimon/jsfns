---
"@jsfns/core": patch
---

- `toWords` and `capitalize` now support letters and digits from any language (`'ÉcoleÜber-straße'` → `['École', 'Über', 'straße']`) instead of only ASCII
- `DebounceCallback` now accepts callbacks with typed parameters and any return value (it used to be `(...args: unknown[]) => void`)
- Added the missing default export of `isEmpty`
