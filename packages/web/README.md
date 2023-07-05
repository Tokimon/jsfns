# @jsfns/web

<a href="https://tokimon.github.io/jsfns/web" target="__blank" style="font-size: 50px; display: block; text-align: center;">@jsfns/web documentation</a>

This is a collection of simple, no dependency, JavaScript snippets with the aim
of making it easier to work with vanilla JavaScript in the browser.

## Methods

[addClass](https://tokimon.github.io/jsfns/web#addClass), [append](https://tokimon.github.io/jsfns/web#append), [attr](https://tokimon.github.io/jsfns/web#attr), [boxModel](https://tokimon.github.io/jsfns/web#boxModel), [children](https://tokimon.github.io/jsfns/web#children), [classNameString](https://tokimon.github.io/jsfns/web#classNameString), [contentBoxSize](https://tokimon.github.io/jsfns/web#contentBoxSize), [contentSize](https://tokimon.github.io/jsfns/web#contentSize), [copyEvent](https://tokimon.github.io/jsfns/web#copyEvent), [createElement](https://tokimon.github.io/jsfns/web#createElement), [css](https://tokimon.github.io/jsfns/web#css), [domReady](https://tokimon.github.io/jsfns/web#domReady), [elementData](https://tokimon.github.io/jsfns/web#elementData), [elmIndex](https://tokimon.github.io/jsfns/web#elmIndex), [ensureHTML](https://tokimon.github.io/jsfns/web#ensureHTML), [find](https://tokimon.github.io/jsfns/web#find), [findByClass](https://tokimon.github.io/jsfns/web#findByClass), [findById](https://tokimon.github.io/jsfns/web#findById), [findByName](https://tokimon.github.io/jsfns/web#findByName), [findByQuery](https://tokimon.github.io/jsfns/web#findByQuery), [findByTagName](https://tokimon.github.io/jsfns/web#findByTagName), [getCurrentDocument](https://tokimon.github.io/jsfns/web#getCurrentDocument), [getCurrentWindow](https://tokimon.github.io/jsfns/web#getCurrentWindow), [hasClass](https://tokimon.github.io/jsfns/web#hasClass), [hidden](https://tokimon.github.io/jsfns/web#hidden), [inDOM](https://tokimon.github.io/jsfns/web#inDOM), [innerSize](https://tokimon.github.io/jsfns/web#innerSize), [innerXML](https://tokimon.github.io/jsfns/web#innerXML), [insertAfter](https://tokimon.github.io/jsfns/web#insertAfter), [insertBefore](https://tokimon.github.io/jsfns/web#insertBefore), [inView](https://tokimon.github.io/jsfns/web#inView), [invisible](https://tokimon.github.io/jsfns/web#invisible), [isBlob](https://tokimon.github.io/jsfns/web#isBlob), [isDocument](https://tokimon.github.io/jsfns/web#isDocument), [isDOMChildNode](https://tokimon.github.io/jsfns/web#isDOMChildNode), [isDOMContainer](https://tokimon.github.io/jsfns/web#isDOMContainer), [isDOMElement](https://tokimon.github.io/jsfns/web#isDOMElement), [isDOMFragment](https://tokimon.github.io/jsfns/web#isDOMFragment), [isDOMNode](https://tokimon.github.io/jsfns/web#isDOMNode), [isDOMRoot](https://tokimon.github.io/jsfns/web#isDOMRoot), [isEventTarget](https://tokimon.github.io/jsfns/web#isEventTarget), [isHTMLChildElement](https://tokimon.github.io/jsfns/web#isHTMLChildElement), [isHTMLElement](https://tokimon.github.io/jsfns/web#isHTMLElement), [isWindow](https://tokimon.github.io/jsfns/web#isWindow), [marginBoxSize](https://tokimon.github.io/jsfns/web#marginBoxSize), [nextSiblings](https://tokimon.github.io/jsfns/web#nextSiblings), [off](https://tokimon.github.io/jsfns/web#off), [on](https://tokimon.github.io/jsfns/web#on), [outerSize](https://tokimon.github.io/jsfns/web#outerSize), [parseSelector](https://tokimon.github.io/jsfns/web#parseSelector), [position](https://tokimon.github.io/jsfns/web#position), [prepend](https://tokimon.github.io/jsfns/web#prepend), [previousSiblings](https://tokimon.github.io/jsfns/web#previousSiblings), [removeClass](https://tokimon.github.io/jsfns/web#removeClass), [replaceClass](https://tokimon.github.io/jsfns/web#replaceClass), [replaceNode](https://tokimon.github.io/jsfns/web#replaceNode), [scrollInfo](https://tokimon.github.io/jsfns/web#scrollInfo), [scrollParent](https://tokimon.github.io/jsfns/web#scrollParent), [selectorToHTML](https://tokimon.github.io/jsfns/web#selectorToHTML), [siblings](https://tokimon.github.io/jsfns/web#siblings), [toDOM](https://tokimon.github.io/jsfns/web#toDOM), [toggleClass](https://tokimon.github.io/jsfns/web#toggleClass), [trigger](https://tokimon.github.io/jsfns/web#trigger), [uniqueNodeList](https://tokimon.github.io/jsfns/web#uniqueNodeList), [vendorPrefixed](https://tokimon.github.io/jsfns/web#vendorPrefixed), [viewport](https://tokimon.github.io/jsfns/web#viewport), [visible](https://tokimon.github.io/jsfns/web#visible), [wrap](https://tokimon.github.io/jsfns/web#wrap)

## Files to fit your needs

All methods are written in TypeScript and converted into various JS versions suiting your use case:

- `.js`: ES 6 syntax.
- `.mjs`: ES 2022 syntax
- `.cjs`: ES 6 syntax + CommonJS `require` imports
- `.d.ts`: TypeScript description files

## [@jsfns/core](https://tokimon.github.io/jsfns/core)

Searching for more basic, environment agnostic JavaScript methods? Check out: [@jsfns/core](https://tokimon.github.io/jsfns/core)

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
