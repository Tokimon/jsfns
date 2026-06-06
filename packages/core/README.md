# @jsfns/core
![Code Coverage 100](https://badgen.net/badge/coverage/100%25/green)

<a href="https://tokimon.github.io/jsfns/core" target="__blank" style="font-size: 50px; display: block; text-align: center;">@jsfns/core documentation</a>

This is a collection of simple, no dependency, JavaScript snippets with the aim
of making it easier to work with vanilla JavaScript.

## Available methods

<table>
<tr><td><a href="https://tokimon.github.io/jsfns/core#RGBToHex">RGBToHex</a></td><td><a href="https://tokimon.github.io/jsfns/core#camelCase">camelCase</a></td><td><a href="https://tokimon.github.io/jsfns/core#capitalize">capitalize</a></td><td><a href="https://tokimon.github.io/jsfns/core#chunkString">chunkString</a></td></tr>
<tr><td><a href="https://tokimon.github.io/jsfns/core#clamp">clamp</a></td><td><a href="https://tokimon.github.io/jsfns/core#debounce">debounce</a></td><td><a href="https://tokimon.github.io/jsfns/core#deleteProperty">deleteProperty</a></td><td><a href="https://tokimon.github.io/jsfns/core#formatCurrency">formatCurrency</a></td></tr>
<tr><td><a href="https://tokimon.github.io/jsfns/core#formatNumber">formatNumber</a></td><td><a href="https://tokimon.github.io/jsfns/core#fuzzySearch">fuzzySearch</a></td><td><a href="https://tokimon.github.io/jsfns/core#getProperty">getProperty</a></td><td><a href="https://tokimon.github.io/jsfns/core#hash">hash</a></td></tr>
<tr><td><a href="https://tokimon.github.io/jsfns/core#hexToNumber">hexToNumber</a></td><td><a href="https://tokimon.github.io/jsfns/core#hexToRGB">hexToRGB</a></td><td><a href="https://tokimon.github.io/jsfns/core#isBoolean">isBoolean</a></td><td><a href="https://tokimon.github.io/jsfns/core#isEmpty">isEmpty</a></td></tr>
<tr><td><a href="https://tokimon.github.io/jsfns/core#isFunction">isFunction</a></td><td><a href="https://tokimon.github.io/jsfns/core#isGenerator">isGenerator</a></td><td><a href="https://tokimon.github.io/jsfns/core#isNumber">isNumber</a></td><td><a href="https://tokimon.github.io/jsfns/core#isNumeric">isNumeric</a></td></tr>
<tr><td><a href="https://tokimon.github.io/jsfns/core#isObject">isObject</a></td><td><a href="https://tokimon.github.io/jsfns/core#isObjectLike">isObjectLike</a></td><td><a href="https://tokimon.github.io/jsfns/core#isString">isString</a></td><td><a href="https://tokimon.github.io/jsfns/core#kebabCase">kebabCase</a></td></tr>
<tr><td><a href="https://tokimon.github.io/jsfns/core#leadingZero">leadingZero</a></td><td><a href="https://tokimon.github.io/jsfns/core#limitDecimals">limitDecimals</a></td><td><a href="https://tokimon.github.io/jsfns/core#numberToHex">numberToHex</a></td><td><a href="https://tokimon.github.io/jsfns/core#pascalCase">pascalCase</a></td></tr>
<tr><td><a href="https://tokimon.github.io/jsfns/core#phrasify">phrasify</a></td><td><a href="https://tokimon.github.io/jsfns/core#popAtIndex">popAtIndex</a></td><td><a href="https://tokimon.github.io/jsfns/core#promisefy">promisefy</a></td><td><a href="https://tokimon.github.io/jsfns/core#randomCryptoId">randomCryptoId</a></td></tr>
<tr><td><a href="https://tokimon.github.io/jsfns/core#randomHexColor">randomHexColor</a></td><td><a href="https://tokimon.github.io/jsfns/core#randomId">randomId</a></td><td><a href="https://tokimon.github.io/jsfns/core#randomInt">randomInt</a></td><td><a href="https://tokimon.github.io/jsfns/core#randomRGBColor">randomRGBColor</a></td></tr>
<tr><td><a href="https://tokimon.github.io/jsfns/core#safeDateChange">safeDateChange</a></td><td><a href="https://tokimon.github.io/jsfns/core#snakeCase">snakeCase</a></td><td><a href="https://tokimon.github.io/jsfns/core#throttle">throttle</a></td><td><a href="https://tokimon.github.io/jsfns/core#toWords">toWords</a></td></tr>
<tr><td><a href="https://tokimon.github.io/jsfns/core#truncate">truncate</a></td><td><a href="https://tokimon.github.io/jsfns/core#types">types</a></td><td><a href="https://tokimon.github.io/jsfns/core#uniqueArray">uniqueArray</a></td><td></td></tr>

</table>

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
