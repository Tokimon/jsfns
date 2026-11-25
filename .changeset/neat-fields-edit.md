---
"@jsfns/web": minor
---

- Added `isEditableElement` — whether a user can edit an element's content or value directly (text inputs, textareas and `contenteditable`, unless read-only or disabled)
- Added `isVoidElement` — whether an element can never have children (`<input>`, `<br>`, ...), and exported the list of `voidTags`
- `parseSelector` is rewritten without regex and now supports Tailwind style class names and IDs (`md:hidden`, `-ml-2`, `w-1/2`, `p-0.5`, `bg-[#fff]`, `[&>div]:flex`) and CSS escaped names (`md\:hidden`)
- `css` now accepts `null` as a value in an object of properties (it removes the property), applies falsy values like `0` and `''` instead of skipping them, and handles `!important` with any spacing or casing
- Added the missing default export of `copyEvent`
- Corrected the `isHTMLChildElement` docs: `document.body` is not a child element (its `offsetParent` is always `null`), and neither are children of void elements
