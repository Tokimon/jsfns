---
"@jsfns/web": minor
---

- `append`, `prepend`, `insertBefore`, `insertAfter` and `wrap` now infer the type of the created element from the leading tag of the given HTML or selector (`append('<input>')` is an `HTMLInputElement`, `append('.x')` an `HTMLDivElement`), and return the given node itself when one is passed. Pass a type argument to override the inferred type
- `append` and `prepend` can now be called without a root element, and then insert into `document.body`
- `insertBefore` and `insertAfter` now work on any element with a parent element, including ones in a detached tree (they used to need an element in the document)
- Added the `InsertResult`, `ElementFromMarkup`, `TagFromMarkup`, `LeadingLetters` and `Letter` types
