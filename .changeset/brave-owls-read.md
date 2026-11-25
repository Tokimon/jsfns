---
"@jsfns/core": patch
---

- `getProperty` (and `deleteProperty`, which uses it) now only reads own properties — inherited keys like `constructor` and `__proto__` no longer resolve
