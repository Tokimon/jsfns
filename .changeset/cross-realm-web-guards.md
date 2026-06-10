---
"@jsfns/web": minor
---

Cross-realm support for DOM guards:

- Fix `on`/`off` failing on an iframe's `contentWindow` ([#24](https://github.com/Tokimon/jsfns/issues/24)): `isEventTarget` no longer relies on a realm-bound `instanceof`
- `isBlob`, `isWindow`, and `isHTMLElement` now detect targets from another realm (e.g. iframes)
- Add a `GlobalWindow` type
