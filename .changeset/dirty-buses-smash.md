---
"@jsfns/core": major
---

- Added `toWords`
- Refactored casing methods to use `toWords` instead of `phrasify`
- `phrasify` now also uses `toWords`
- Migrated away from `jest` to `vitest`
- Upgraded Typescript to TSGO
- Added missing test in test that did not have 100% coverage. Now all tests have 100% coverage
- Updated package dependencies
