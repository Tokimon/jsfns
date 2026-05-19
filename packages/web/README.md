# @jsfns/web
![Code Coverage 100](https://badgen.net/badge/coverage/100%25/green)

<a href="https://tokimon.github.io/jsfns/web" target="__blank" style="font-size: 50px; display: block; text-align: center;">@jsfns/web documentation</a>

This is a collection of simple, no dependency, JavaScript snippets with the aim
of making it easier to work with vanilla JavaScript in the browser.

## Methods

| Available methods |||
| --- | --- | --- | --- |
| [addClass](https://tokimon.github.io/jsfns/web#addClass) | [append](https://tokimon.github.io/jsfns/web#append) | [attr](https://tokimon.github.io/jsfns/web#attr) | [boxModel](https://tokimon.github.io/jsfns/web#boxModel) |
| [children](https://tokimon.github.io/jsfns/web#children) | [classNameString](https://tokimon.github.io/jsfns/web#classNameString) | [contentBoxSize](https://tokimon.github.io/jsfns/web#contentBoxSize) | [contentSize](https://tokimon.github.io/jsfns/web#contentSize) |
| [copyEvent](https://tokimon.github.io/jsfns/web#copyEvent) | [createElement](https://tokimon.github.io/jsfns/web#createElement) | [css](https://tokimon.github.io/jsfns/web#css) | [domReady](https://tokimon.github.io/jsfns/web#domReady) |
| [elementData](https://tokimon.github.io/jsfns/web#elementData) | [elmIndex](https://tokimon.github.io/jsfns/web#elmIndex) | [ensureHTML](https://tokimon.github.io/jsfns/web#ensureHTML) | [find](https://tokimon.github.io/jsfns/web#find) |
| [findByClass](https://tokimon.github.io/jsfns/web#findByClass) | [findById](https://tokimon.github.io/jsfns/web#findById) | [findByName](https://tokimon.github.io/jsfns/web#findByName) | [findByQuery](https://tokimon.github.io/jsfns/web#findByQuery) |
| [findByTagName](https://tokimon.github.io/jsfns/web#findByTagName) | [getCurrentDocument](https://tokimon.github.io/jsfns/web#getCurrentDocument) | [getCurrentWindow](https://tokimon.github.io/jsfns/web#getCurrentWindow) | [hasClass](https://tokimon.github.io/jsfns/web#hasClass) |
| [hidden](https://tokimon.github.io/jsfns/web#hidden) | [inDOM](https://tokimon.github.io/jsfns/web#inDOM) | [inView](https://tokimon.github.io/jsfns/web#inView) | [innerSize](https://tokimon.github.io/jsfns/web#innerSize) |
| [innerXML](https://tokimon.github.io/jsfns/web#innerXML) | [insertAfter](https://tokimon.github.io/jsfns/web#insertAfter) | [insertBefore](https://tokimon.github.io/jsfns/web#insertBefore) | [invisible](https://tokimon.github.io/jsfns/web#invisible) |
| [isBlob](https://tokimon.github.io/jsfns/web#isBlob) | [isDOMChildNode](https://tokimon.github.io/jsfns/web#isDOMChildNode) | [isDOMContainer](https://tokimon.github.io/jsfns/web#isDOMContainer) | [isDOMElement](https://tokimon.github.io/jsfns/web#isDOMElement) |
| [isDOMFragment](https://tokimon.github.io/jsfns/web#isDOMFragment) | [isDOMNode](https://tokimon.github.io/jsfns/web#isDOMNode) | [isDOMRoot](https://tokimon.github.io/jsfns/web#isDOMRoot) | [isDocument](https://tokimon.github.io/jsfns/web#isDocument) |
| [isEventTarget](https://tokimon.github.io/jsfns/web#isEventTarget) | [isHTMLChildElement](https://tokimon.github.io/jsfns/web#isHTMLChildElement) | [isHTMLElement](https://tokimon.github.io/jsfns/web#isHTMLElement) | [isWindow](https://tokimon.github.io/jsfns/web#isWindow) |
| [marginBoxSize](https://tokimon.github.io/jsfns/web#marginBoxSize) | [nextSiblings](https://tokimon.github.io/jsfns/web#nextSiblings) | [off](https://tokimon.github.io/jsfns/web#off) | [on](https://tokimon.github.io/jsfns/web#on) |
| [outerSize](https://tokimon.github.io/jsfns/web#outerSize) | [parseSelector](https://tokimon.github.io/jsfns/web#parseSelector) | [position](https://tokimon.github.io/jsfns/web#position) | [prepend](https://tokimon.github.io/jsfns/web#prepend) |
| [previousSiblings](https://tokimon.github.io/jsfns/web#previousSiblings) | [removeClass](https://tokimon.github.io/jsfns/web#removeClass) | [replaceClass](https://tokimon.github.io/jsfns/web#replaceClass) | [replaceNode](https://tokimon.github.io/jsfns/web#replaceNode) |
| [scrollInfo](https://tokimon.github.io/jsfns/web#scrollInfo) | [scrollParent](https://tokimon.github.io/jsfns/web#scrollParent) | [selectorToHTML](https://tokimon.github.io/jsfns/web#selectorToHTML) | [siblings](https://tokimon.github.io/jsfns/web#siblings) |
| [toDOM](https://tokimon.github.io/jsfns/web#toDOM) | [toggleClass](https://tokimon.github.io/jsfns/web#toggleClass) | [trigger](https://tokimon.github.io/jsfns/web#trigger) | [types](https://tokimon.github.io/jsfns/web#types) |
| [uniqueNodeList](https://tokimon.github.io/jsfns/web#uniqueNodeList) | [vendorPrefixed](https://tokimon.github.io/jsfns/web#vendorPrefixed) | [viewport](https://tokimon.github.io/jsfns/web#viewport) | [visible](https://tokimon.github.io/jsfns/web#visible) |
| [wrap](https://tokimon.github.io/jsfns/web#wrap) |


## [@jsfns/core](https://tokimon.github.io/jsfns/core)

Searching for more basic, environment agnostic JavaScript methods? Check out: [@jsfns/core](https://tokimon.github.io/jsfns/core)

## ES version support

These packages use modern JavaScript with no bundled polyfills or
fallbacks. If you need to support older runtimes, add polyfills through
your build pipeline (Babel, core-js, etc.) — most are injected
automatically. Keeping the library polyfill-free makes it leaner and
more future-proof, since modern browsers and Node versions already cover
the vast majority of features.

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

```
bun add @jsfns/web
```

## Usage

```js
// JS + MJS Modules
import { append } from '@jsfns/web/append';
append(document.body, '<span>Appended content</span>');
```


## Something missing?

Questions, bugs, or ideas for new functionality? Open an
[issue](https://github.com/Tokimon/jsfns/issues), or submit a
[pull request](https://github.com/Tokimon/jsfns/pulls) with your
contribution.
