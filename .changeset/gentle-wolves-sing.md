---
"@jsfns/web": major
---

- **BREAKING:** `domReady` renamed to `onDomReady`; `docComplete` renamed to `isDocComplete`
- `append`, `prepend` now validate input with `isDOMElement()` instead of a plain truthy check
- `on`, `off`, `trigger` generic signatures reworked (`<T extends EventTarget>`) so the bound/returned element type matches the concrete element passed in, instead of a widened type
- `wrap`'s JSDoc corrected — it always returned the wrapper element (or `null`), never the boolean previously (incorrectly) documented; return type now explicitly annotated as `Element | null`
- Added missing `@typeParam` documentation and fixed inaccurate JSDoc examples (`attr`, `css`, `find`, `findByClass`, `findById`, `findByName`, `findByQuery`, `findByTagName`, `copyEvent`, `on`, `off`, `uniqueNodeList`, `ActualEvent`, `EventHandler`)
