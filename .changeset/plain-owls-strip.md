---
"@jsfns/core": minor
---

- Added `toStrippedText` — strips text down to a plain form for accent insensitive matching (e.g. before `fuzzySearch`): removes accents, replaces compatibility forms (`ﬁ` → `fi`), turns whitespace into spaces and typographic quotes into plain ones. Case is kept and the length may change
