---
"@jsfns/core": minor
---

- Added `validateProperty` — checks the value at a JSON Pointer (via `getByPointer`) against a validator; a missing path is `false` and never reaches the validator. With a type guard it also narrows `input` to include the validated path (e.g. `'/user/name'` narrows `data` to have `user.name`)
