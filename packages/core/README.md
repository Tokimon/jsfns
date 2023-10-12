# @jsfns/core

<a href="https://tokimon.github.io/jsfns/core" target="__blank" style="font-size: 50px; display: block; text-align: center;">@jsfns/core documentation</a>

This is a collection of simple, no dependency, JavaScript snippets with the aim
of making it easier to work with vanilla JavaScript.

## Methods

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 5px">
<a href="https://tokimon.github.io/jsfns/core#camelCase">camelCase</a>
<a href="https://tokimon.github.io/jsfns/core#capitalize">capitalize</a>
<a href="https://tokimon.github.io/jsfns/core#chunkString">chunkString</a>
<a href="https://tokimon.github.io/jsfns/core#formatCurrency">formatCurrency</a>
<a href="https://tokimon.github.io/jsfns/core#formatNumber">formatNumber</a>
<a href="https://tokimon.github.io/jsfns/core#fuzzySearch">fuzzySearch</a>
<a href="https://tokimon.github.io/jsfns/core#hash">hash</a>
<a href="https://tokimon.github.io/jsfns/core#hexToNumber">hexToNumber</a>
<a href="https://tokimon.github.io/jsfns/core#hexToRGB">hexToRGB</a>
<a href="https://tokimon.github.io/jsfns/core#isBoolean">isBoolean</a>
<a href="https://tokimon.github.io/jsfns/core#isFunction">isFunction</a>
<a href="https://tokimon.github.io/jsfns/core#isGenerator">isGenerator</a>
<a href="https://tokimon.github.io/jsfns/core#isNumber">isNumber</a>
<a href="https://tokimon.github.io/jsfns/core#isNumeric">isNumeric</a>
<a href="https://tokimon.github.io/jsfns/core#isObject">isObject</a>
<a href="https://tokimon.github.io/jsfns/core#isString">isString</a>
<a href="https://tokimon.github.io/jsfns/core#kebabCase">kebabCase</a>
<a href="https://tokimon.github.io/jsfns/core#leadingZero">leadingZero</a>
<a href="https://tokimon.github.io/jsfns/core#limitDecimals">limitDecimals</a>
<a href="https://tokimon.github.io/jsfns/core#minMax">minMax</a>
<a href="https://tokimon.github.io/jsfns/core#numberToHex">numberToHex</a>
<a href="https://tokimon.github.io/jsfns/core#pascalCase">pascalCase</a>
<a href="https://tokimon.github.io/jsfns/core#phrasify">phrasify</a>
<a href="https://tokimon.github.io/jsfns/core#popAtIndex">popAtIndex</a>
<a href="https://tokimon.github.io/jsfns/core#promisefy">promisefy</a>
<a href="https://tokimon.github.io/jsfns/core#randomCryptoId">randomCryptoId</a>
<a href="https://tokimon.github.io/jsfns/core#randomHexColor">randomHexColor</a>
<a href="https://tokimon.github.io/jsfns/core#randomId">randomId</a>
<a href="https://tokimon.github.io/jsfns/core#randomInt">randomInt</a>
<a href="https://tokimon.github.io/jsfns/core#randomRGBColor">randomRGBColor</a>
<a href="https://tokimon.github.io/jsfns/core#RGBToHex">RGBToHex</a>
<a href="https://tokimon.github.io/jsfns/core#safeDateChange">safeDateChange</a>
<a href="https://tokimon.github.io/jsfns/core#snakeCase">snakeCase</a>
<a href="https://tokimon.github.io/jsfns/core#truncate">truncate</a>
<a href="https://tokimon.github.io/jsfns/core#uniqueArray">uniqueArray</a>
</div>

## Files to fit your needs

All methods are written in TypeScript and converted into various JS versions suiting your use case:

- `.js`: ES 6 syntax.
- `.mjs`: ES 2022 syntax
- `.cjs`: ES 6 syntax + CommonJS `require` imports
- `.d.ts`: TypeScript description files

## [@jsfns/web](https://tokimon.github.io/jsfns/web)

Searching for browser specific methods? Check out: [@jsfns/web](https://tokimon.github.io/jsfns/web)

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
npm i @jsfns/core
```

```
yarn add @jsfns/core
```

```
pnpm i @jsfns/core
```

## Usage

```js
// JS + MJS Modules
import { camelCase } from '@jsfns/core/camelCase';
camelCase('Camel cased phrase'); // camelCasedPhrase
```

```js
// CommonJS Require Modules
const { camelCase } = require('@jsfns/core/camelCase');
camelCase('Camel cased phrase'); // camelCasedPhrase
```

## Something missing?

If you have any questions, find any bugs or have ideas for missing functionality you would like to see included, feel
free to add an issue in the [issue list](https://github.com/Tokimon/jsfns/issues) or perhaps do a
[Pull Request](https://github.com/Tokimon/jsfns/pulls) of a great method you created.
