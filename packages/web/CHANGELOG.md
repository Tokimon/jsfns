# @jsfns/web

## 3.0.0

### Major Changes

- 2321171: - **BREAKING:** `domReady` renamed to `onDomReady`; `docComplete` renamed to `isDocComplete`
  - `append`, `prepend` now validate input with `isDOMElement()` instead of a plain truthy check
  - `on`, `off`, `trigger` generic signatures reworked (`<T extends EventTarget>`) so the bound/returned element type matches the concrete element passed in, instead of a widened type
  - `wrap`'s JSDoc corrected — it always returned the wrapper element (or `null`), never the boolean previously (incorrectly) documented; return type now explicitly annotated as `Element | null`
  - Added missing `@typeParam` documentation and fixed inaccurate JSDoc examples (`attr`, `css`, `find`, `findByClass`, `findById`, `findByName`, `findByQuery`, `findByTagName`, `copyEvent`, `on`, `off`, `uniqueNodeList`, `ActualEvent`, `EventHandler`)

### Patch Changes

- Updated dependencies [fb01ed0]
- Updated dependencies [2321171]
  - @jsfns/core@3.0.0

## 2.1.0

### Minor Changes

- e43f74f: Cross-realm support for DOM guards:

  - Fix `on`/`off` failing on an iframe's `contentWindow` ([#24](https://github.com/Tokimon/jsfns/issues/24)): `isEventTarget` no longer relies on a realm-bound `instanceof`
  - `isBlob`, `isWindow`, and `isHTMLElement` now detect targets from another realm (e.g. iframes)
  - Add a `GlobalWindow` type

### Patch Changes

- Updated dependencies [b85fd0d]
  - @jsfns/core@2.1.0

## 2.0.1

### Patch Changes

- c485298: Update Methods listing table in README
- Updated dependencies [c485298]
  - @jsfns/core@2.0.1

## 2.0.0

### Major Changes

- a1b3155: - **BREAKING:** The general-purpose types `NotFirst`, `Maybe`, and `Dictionary` have moved to `@jsfns/core`. Import them from `@jsfns/core/types.js` instead of `@jsfns/web/types.js`. Web-specific types (`GeneralWindow`, `EventName`, `ActualEvent`, `EventHandler`, `Size`) remain in `@jsfns/web/types.js`.
- 61deebc: - Improved typescipt build and validation, using tsgo
  - Dropped support for .cjs files

### Minor Changes

- 92ae9de: - Migrated away from `jest` to `vitest`
  - Upgraded Typescript to TSGO
  - Added missing test in test that did not have 100% coverage. Now all tests have 100% coverage
  - Updated package dependencies

### Patch Changes

- 607aeb6: - Updated is\*\* methods (mostly signatures and not functionlity)
- Updated dependencies [92ae9de]
- Updated dependencies [61deebc]
- Updated dependencies [607aeb6]
- Updated dependencies [a1b3155]
  - @jsfns/core@2.0.0

## 1.1.3

### Patch Changes

- 7ac56c4: Added better documentation and type descriptions
- Updated dependencies [7ac56c4]
  - @jsfns/core@1.2.1

## 1.1.2

### Patch Changes

- Updates:
  - Switched to Biome for linting and formatting
  - `css` : Added support for CSS variables
  - Ensured that the `types.d.ts` file is included into the npm package
- Updated dependencies
  - @jsfns/core@1.2.0
