# @jsfns/web

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
