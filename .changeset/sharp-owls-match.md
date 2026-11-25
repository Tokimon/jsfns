---
"@jsfns/core": major
---

- **BREAKING:** `fuzzySearch` is now a typo tolerant search at the start of the input instead of an in-order character match (`'src'` no longer matches `'search me'`). The search may deviate (insert, delete, substitute or swap two neighbouring characters) by up to `floor(searchWord.length * maxDeviation)` edits (default `0.2`), the first `exactPrefixLength` characters (default `2`) and the last `exactSuffixLength` (default `0`) must match exactly, and the rest of the input is ignored
- `caseSensitive` in the `fuzzySearch` options is now optional
