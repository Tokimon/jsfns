---
"@jsfns/core": patch
---

- `getProperty` (and `deleteProperty`, which uses it) now only reads own properties — inherited keys like `constructor` and `__proto__` no longer resolve
- `getProperty` now returns a discriminated union (`{ success: true, value: T } | { success: false, value: null }`), so `value` narrows to `T` once `success` is checked
