---
"@jsfns/core": minor
---

- Added `getByPointer` — read a value from an object or array using a JSON Pointer (RFC 6901, e.g. `'/a/b/0'`); returns `{ success, value }` like `getProperty`. A pointer that doesn't start with `/` (including the empty string) fails
