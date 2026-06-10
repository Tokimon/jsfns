---
"@jsfns/core": minor
---

Cross-realm support for value guards:

- Add `isMap`, `isSet`, and `isPlainObject` guards that work across realms (e.g. iframes)
- Add a `getObjectName` helper
- `isEmpty` now correctly recognises `Map`s, `Set`s, and plain objects from another realm
