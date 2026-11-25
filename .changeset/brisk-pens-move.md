---
"@jsfns/web": major
---

- **BREAKING:** `position` is replaced by `positionAbsolute` (relative to the document), `positionRelative` (relative to the offset parent) and the new `positionRelativeTo` (relative to another element). Each returns a plain `Position`, so the `PositionData` type and its `relative` property are gone
- **BREAKING:** `elmIndex` is renamed to `nodeIndex`. It accepts any value (returns `-1` if it isn't a child node) and now counts all sibling nodes, including text and comment nodes, not only elements
