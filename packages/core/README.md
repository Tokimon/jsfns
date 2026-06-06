# @jsfns/core
![Code Coverage 100](https://badgen.net/badge/coverage/100%25/green)

<a href="https://tokimon.github.io/jsfns/core" target="__blank" style="font-size: 50px; display: block; text-align: center;">@jsfns/core documentation</a>

This is a collection of simple, no dependency, JavaScript snippets with the aim
of making it easier to work with vanilla JavaScript.

## Available methods

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));">
<a href="https://tokimon.github.io/jsfns/core#RGBToHex" style="padding: 10px;">RGBToHex</a>
<a href="https://tokimon.github.io/jsfns/core#camelCase" style="padding: 10px;">camelCase</a>
<a href="https://tokimon.github.io/jsfns/core#capitalize" style="padding: 10px;">capitalize</a>
<a href="https://tokimon.github.io/jsfns/core#chunkString" style="padding: 10px;">chunkString</a>
<a href="https://tokimon.github.io/jsfns/core#clamp" style="padding: 10px;">clamp</a>
<a href="https://tokimon.github.io/jsfns/core#debounce" style="padding: 10px;">debounce</a>
<a href="https://tokimon.github.io/jsfns/core#deleteProperty" style="padding: 10px;">deleteProperty</a>
<a href="https://tokimon.github.io/jsfns/core#formatCurrency" style="padding: 10px;">formatCurrency</a>
<a href="https://tokimon.github.io/jsfns/core#formatNumber" style="padding: 10px;">formatNumber</a>
<a href="https://tokimon.github.io/jsfns/core#fuzzySearch" style="padding: 10px;">fuzzySearch</a>
<a href="https://tokimon.github.io/jsfns/core#getProperty" style="padding: 10px;">getProperty</a>
<a href="https://tokimon.github.io/jsfns/core#hash" style="padding: 10px;">hash</a>
<a href="https://tokimon.github.io/jsfns/core#hexToNumber" style="padding: 10px;">hexToNumber</a>
<a href="https://tokimon.github.io/jsfns/core#hexToRGB" style="padding: 10px;">hexToRGB</a>
<a href="https://tokimon.github.io/jsfns/core#isBoolean" style="padding: 10px;">isBoolean</a>
<a href="https://tokimon.github.io/jsfns/core#isEmpty" style="padding: 10px;">isEmpty</a>
<a href="https://tokimon.github.io/jsfns/core#isFunction" style="padding: 10px;">isFunction</a>
<a href="https://tokimon.github.io/jsfns/core#isGenerator" style="padding: 10px;">isGenerator</a>
<a href="https://tokimon.github.io/jsfns/core#isNumber" style="padding: 10px;">isNumber</a>
<a href="https://tokimon.github.io/jsfns/core#isNumeric" style="padding: 10px;">isNumeric</a>
<a href="https://tokimon.github.io/jsfns/core#isObject" style="padding: 10px;">isObject</a>
<a href="https://tokimon.github.io/jsfns/core#isObjectLike" style="padding: 10px;">isObjectLike</a>
<a href="https://tokimon.github.io/jsfns/core#isString" style="padding: 10px;">isString</a>
<a href="https://tokimon.github.io/jsfns/core#kebabCase" style="padding: 10px;">kebabCase</a>
<a href="https://tokimon.github.io/jsfns/core#leadingZero" style="padding: 10px;">leadingZero</a>
<a href="https://tokimon.github.io/jsfns/core#limitDecimals" style="padding: 10px;">limitDecimals</a>
<a href="https://tokimon.github.io/jsfns/core#numberToHex" style="padding: 10px;">numberToHex</a>
<a href="https://tokimon.github.io/jsfns/core#pascalCase" style="padding: 10px;">pascalCase</a>
<a href="https://tokimon.github.io/jsfns/core#phrasify" style="padding: 10px;">phrasify</a>
<a href="https://tokimon.github.io/jsfns/core#popAtIndex" style="padding: 10px;">popAtIndex</a>
<a href="https://tokimon.github.io/jsfns/core#promisefy" style="padding: 10px;">promisefy</a>
<a href="https://tokimon.github.io/jsfns/core#randomCryptoId" style="padding: 10px;">randomCryptoId</a>
<a href="https://tokimon.github.io/jsfns/core#randomHexColor" style="padding: 10px;">randomHexColor</a>
<a href="https://tokimon.github.io/jsfns/core#randomId" style="padding: 10px;">randomId</a>
<a href="https://tokimon.github.io/jsfns/core#randomInt" style="padding: 10px;">randomInt</a>
<a href="https://tokimon.github.io/jsfns/core#randomRGBColor" style="padding: 10px;">randomRGBColor</a>
<a href="https://tokimon.github.io/jsfns/core#safeDateChange" style="padding: 10px;">safeDateChange</a>
<a href="https://tokimon.github.io/jsfns/core#snakeCase" style="padding: 10px;">snakeCase</a>
<a href="https://tokimon.github.io/jsfns/core#throttle" style="padding: 10px;">throttle</a>
<a href="https://tokimon.github.io/jsfns/core#toWords" style="padding: 10px;">toWords</a>
<a href="https://tokimon.github.io/jsfns/core#truncate" style="padding: 10px;">truncate</a>
<a href="https://tokimon.github.io/jsfns/core#types" style="padding: 10px;">types</a>
<a href="https://tokimon.github.io/jsfns/core#uniqueArray" style="padding: 10px;">uniqueArray</a>
</div>

## [@jsfns/web](https://tokimon.github.io/jsfns/web)

Searching for browser specific methods? Check out: [@jsfns/web](https://tokimon.github.io/jsfns/web)

## ES version support

These packages use modern JavaScript with no bundled polyfills or
fallbacks. If you need to support older runtimes, add polyfills through
your build pipeline (Babel, core-js, etc.) — most are injected
automatically. Keeping the library polyfill-free makes it leaner and
more future-proof, since modern browsers and Node versions already cover
the vast majority of features.

## Installation

```
npm i @jsfns/core
```

```
yarn add @jsfns/core
```

```
pnpm i @jsfns/core
```

```
bun add @jsfns/core
```

## Usage

```js
// JS + MJS Modules
import { camelCase } from '@jsfns/core/camelCase';
camelCase('Camel cased phrase'); // camelCasedPhrase
```


## Something missing?

Questions, bugs, or ideas for new functionality? Open an
[issue](https://github.com/Tokimon/jsfns/issues), or submit a
[pull request](https://github.com/Tokimon/jsfns/pulls) with your
contribution.
