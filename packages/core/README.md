# [@jsfns/core](https://tokimon.github.io/jsfns-docs/core)
![Code Coverage 100](https://badgen.net/badge/coverage/100%25/green)

This is a collection of simple, no dependency, JavaScript snippets with the aim
of making it easier to work with vanilla JavaScript.

## Methods

| Available methods |||||
| --- | --- | --- | --- | --- |
| [camelCase](https://tokimon.github.io/jsfns-docs/core#camelCase) | [capitalize](https://tokimon.github.io/jsfns-docs/core#capitalize) | [chunkString](https://tokimon.github.io/jsfns-docs/core#chunkString) | [formatCurrency](https://tokimon.github.io/jsfns-docs/core#formatCurrency) | [formatNumber](https://tokimon.github.io/jsfns-docs/core#formatNumber) |
| [fuzzySearch](https://tokimon.github.io/jsfns-docs/core#fuzzySearch) | [hash](https://tokimon.github.io/jsfns-docs/core#hash) | [hexToNumber](https://tokimon.github.io/jsfns-docs/core#hexToNumber) | [hexToRGB](https://tokimon.github.io/jsfns-docs/core#hexToRGB) | [isBoolean](https://tokimon.github.io/jsfns-docs/core#isBoolean) |
| [isFunction](https://tokimon.github.io/jsfns-docs/core#isFunction) | [isGenerator](https://tokimon.github.io/jsfns-docs/core#isGenerator) | [isNumber](https://tokimon.github.io/jsfns-docs/core#isNumber) | [isNumeric](https://tokimon.github.io/jsfns-docs/core#isNumeric) | [isObject](https://tokimon.github.io/jsfns-docs/core#isObject) |
| [isString](https://tokimon.github.io/jsfns-docs/core#isString) | [kebabCase](https://tokimon.github.io/jsfns-docs/core#kebabCase) | [leadingZero](https://tokimon.github.io/jsfns-docs/core#leadingZero) | [limitDecimals](https://tokimon.github.io/jsfns-docs/core#limitDecimals) | [minMax](https://tokimon.github.io/jsfns-docs/core#minMax) |
| [numberToHex](https://tokimon.github.io/jsfns-docs/core#numberToHex) | [pascalCase](https://tokimon.github.io/jsfns-docs/core#pascalCase) | [phrasify](https://tokimon.github.io/jsfns-docs/core#phrasify) | [popAtIndex](https://tokimon.github.io/jsfns-docs/core#popAtIndex) | [promisefy](https://tokimon.github.io/jsfns-docs/core#promisefy) |
| [randomCryptoId](https://tokimon.github.io/jsfns-docs/core#randomCryptoId) | [randomHexColor](https://tokimon.github.io/jsfns-docs/core#randomHexColor) | [randomId](https://tokimon.github.io/jsfns-docs/core#randomId) | [randomInt](https://tokimon.github.io/jsfns-docs/core#randomInt) | [randomRGBColor](https://tokimon.github.io/jsfns-docs/core#randomRGBColor) |
| [RGBToHex](https://tokimon.github.io/jsfns-docs/core#RGBToHex) | [safeDateChange](https://tokimon.github.io/jsfns-docs/core#safeDateChange) | [snakeCase](https://tokimon.github.io/jsfns-docs/core#snakeCase) | [truncate](https://tokimon.github.io/jsfns-docs/core#truncate) | [uniqueArray](https://tokimon.github.io/jsfns-docs/core#uniqueArray) |


## Files to fit your needs

All methods are written in TypeScript and converted into various JS versions suiting your use case:

- `.js`: ES 6 syntax.
- `.mjs`: ES 2022 syntax
- `.cjs`: ES 6 syntax + CommonJS `require` imports
- `.d.ts`: TypeScript description files

## [@jsfns/web](https://tokimon.github.io/jsfns-docs/web)

Searching for browser specific methods? Check out: [@jsfns/web](https://tokimon.github.io/jsfns-docs/web)

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
