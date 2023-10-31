# [@jsfns/web](https://tokimon.github.io/jsfns-docs/web)
![Code Coverage 100](https://badgen.net/badge/coverage/100%25/green)

This is a collection of simple, no dependency, JavaScript snippets with the aim
of making it easier to work with vanilla JavaScript in the browser.

## Methods

| Available methods |||||
| --- | --- | --- | --- | --- |
| [addClass](https://tokimon.github.io/jsfns-docs/web#addClass) | [append](https://tokimon.github.io/jsfns-docs/web#append) | [attr](https://tokimon.github.io/jsfns-docs/web#attr) | [boxModel](https://tokimon.github.io/jsfns-docs/web#boxModel) | [children](https://tokimon.github.io/jsfns-docs/web#children) |
| [classNameString](https://tokimon.github.io/jsfns-docs/web#classNameString) | [contentBoxSize](https://tokimon.github.io/jsfns-docs/web#contentBoxSize) | [contentSize](https://tokimon.github.io/jsfns-docs/web#contentSize) | [copyEvent](https://tokimon.github.io/jsfns-docs/web#copyEvent) | [createElement](https://tokimon.github.io/jsfns-docs/web#createElement) |
| [css](https://tokimon.github.io/jsfns-docs/web#css) | [domReady](https://tokimon.github.io/jsfns-docs/web#domReady) | [elementData](https://tokimon.github.io/jsfns-docs/web#elementData) | [elmIndex](https://tokimon.github.io/jsfns-docs/web#elmIndex) | [ensureHTML](https://tokimon.github.io/jsfns-docs/web#ensureHTML) |
| [find](https://tokimon.github.io/jsfns-docs/web#find) | [findByClass](https://tokimon.github.io/jsfns-docs/web#findByClass) | [findById](https://tokimon.github.io/jsfns-docs/web#findById) | [findByName](https://tokimon.github.io/jsfns-docs/web#findByName) | [findByQuery](https://tokimon.github.io/jsfns-docs/web#findByQuery) |
| [findByTagName](https://tokimon.github.io/jsfns-docs/web#findByTagName) | [getCurrentDocument](https://tokimon.github.io/jsfns-docs/web#getCurrentDocument) | [getCurrentWindow](https://tokimon.github.io/jsfns-docs/web#getCurrentWindow) | [hasClass](https://tokimon.github.io/jsfns-docs/web#hasClass) | [hidden](https://tokimon.github.io/jsfns-docs/web#hidden) |
| [inDOM](https://tokimon.github.io/jsfns-docs/web#inDOM) | [innerSize](https://tokimon.github.io/jsfns-docs/web#innerSize) | [innerXML](https://tokimon.github.io/jsfns-docs/web#innerXML) | [insertAfter](https://tokimon.github.io/jsfns-docs/web#insertAfter) | [insertBefore](https://tokimon.github.io/jsfns-docs/web#insertBefore) |
| [inView](https://tokimon.github.io/jsfns-docs/web#inView) | [invisible](https://tokimon.github.io/jsfns-docs/web#invisible) | [isBlob](https://tokimon.github.io/jsfns-docs/web#isBlob) | [isDocument](https://tokimon.github.io/jsfns-docs/web#isDocument) | [isDOMChildNode](https://tokimon.github.io/jsfns-docs/web#isDOMChildNode) |
| [isDOMContainer](https://tokimon.github.io/jsfns-docs/web#isDOMContainer) | [isDOMElement](https://tokimon.github.io/jsfns-docs/web#isDOMElement) | [isDOMFragment](https://tokimon.github.io/jsfns-docs/web#isDOMFragment) | [isDOMNode](https://tokimon.github.io/jsfns-docs/web#isDOMNode) | [isDOMRoot](https://tokimon.github.io/jsfns-docs/web#isDOMRoot) |
| [isEventTarget](https://tokimon.github.io/jsfns-docs/web#isEventTarget) | [isHTMLChildElement](https://tokimon.github.io/jsfns-docs/web#isHTMLChildElement) | [isHTMLElement](https://tokimon.github.io/jsfns-docs/web#isHTMLElement) | [isWindow](https://tokimon.github.io/jsfns-docs/web#isWindow) | [marginBoxSize](https://tokimon.github.io/jsfns-docs/web#marginBoxSize) |
| [nextSiblings](https://tokimon.github.io/jsfns-docs/web#nextSiblings) | [off](https://tokimon.github.io/jsfns-docs/web#off) | [on](https://tokimon.github.io/jsfns-docs/web#on) | [outerSize](https://tokimon.github.io/jsfns-docs/web#outerSize) | [parseSelector](https://tokimon.github.io/jsfns-docs/web#parseSelector) |
| [position](https://tokimon.github.io/jsfns-docs/web#position) | [prepend](https://tokimon.github.io/jsfns-docs/web#prepend) | [previousSiblings](https://tokimon.github.io/jsfns-docs/web#previousSiblings) | [removeClass](https://tokimon.github.io/jsfns-docs/web#removeClass) | [replaceClass](https://tokimon.github.io/jsfns-docs/web#replaceClass) |
| [replaceNode](https://tokimon.github.io/jsfns-docs/web#replaceNode) | [scrollInfo](https://tokimon.github.io/jsfns-docs/web#scrollInfo) | [scrollParent](https://tokimon.github.io/jsfns-docs/web#scrollParent) | [selectorToHTML](https://tokimon.github.io/jsfns-docs/web#selectorToHTML) | [siblings](https://tokimon.github.io/jsfns-docs/web#siblings) |
| [toDOM](https://tokimon.github.io/jsfns-docs/web#toDOM) | [toggleClass](https://tokimon.github.io/jsfns-docs/web#toggleClass) | [trigger](https://tokimon.github.io/jsfns-docs/web#trigger) | [types.d](https://tokimon.github.io/jsfns-docs/web#types.d) | [uniqueNodeList](https://tokimon.github.io/jsfns-docs/web#uniqueNodeList) |
| [vendorPrefixed](https://tokimon.github.io/jsfns-docs/web#vendorPrefixed) | [viewport](https://tokimon.github.io/jsfns-docs/web#viewport) | [visible](https://tokimon.github.io/jsfns-docs/web#visible) | [wrap](https://tokimon.github.io/jsfns-docs/web#wrap) |


## Files to fit your needs

All methods are written in TypeScript and converted into various JS versions suiting your use case:

- `.js`: ES 6 syntax.
- `.mjs`: ES 2022 syntax
- `.cjs`: ES 6 syntax + CommonJS `require` imports
- `.d.ts`: TypeScript description files

## [@jsfns/core](https://tokimon.github.io/jsfns-docs/core)

Searching for more basic, environment agnostic JavaScript methods? Check out: [@jsfns/core](https://tokimon.github.io/jsfns-docs/core)

## ES version support

All methods are using latest techniques and generally no efforts have been made to
accommodate older browsers which do not support certain features. Polyfills should
be used to fill the gap. This is intentional as the need for polyfills are ever
diminishing, with modern browsers (and Node environments) getting updated all the time the vast
majority of the methods will be supported at one point. Also, with compilers like Babel,
polyfills can be included automatically in the build process, making it simple to ensure full support.
Therefore it is more future proof and clutter free to leave fallbacks and polyfills out of
the methods and just focus on core functionality.

## Installation

```
npm i @jsfns/web
```

```
yarn add @jsfns/web
```

```
pnpm i @jsfns/web
```

## Usage

```js
// JS + MJS Modules
import { append } from '@jsfns/web/append';
append(document.body, '<span>Appended content</span>');
```

```js
// CommonJS Require Modules
const { append } = require('@jsfns/web/append');
append(document.body, '<span>Appended content</span>');
```

## Something missing?

If you have any questions, find any bugs or have ideas for missing functionality you would like to see included, feel
free to add an issue in the [issue list](https://github.com/Tokimon/jsfns/issues) or perhaps do a
[Pull Request](https://github.com/Tokimon/jsfns/pulls) of a great method you created.
