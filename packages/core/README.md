# @jsfns/core
![Code Coverage 100](https://badgen.net/badge/coverage/100%25/green)

<a href="https://tokimon.github.io/jsfns/core" target="__blank" style="font-size: 50px; display: block; text-align: center;">@jsfns/core documentation</a>

This is a collection of simple, no dependency, JavaScript snippets with the aim
of making it easier to work with vanilla JavaScript.

## Methods

| Available methods |||
| --- | --- | --- | --- |
| [RGBToHex](https://tokimon.github.io/jsfns/core#RGBToHex) | [camelCase](https://tokimon.github.io/jsfns/core#camelCase) | [capitalize](https://tokimon.github.io/jsfns/core#capitalize) | [chunkString](https://tokimon.github.io/jsfns/core#chunkString) |
| [clamp](https://tokimon.github.io/jsfns/core#clamp) | [debounce](https://tokimon.github.io/jsfns/core#debounce) | [deleteProperty](https://tokimon.github.io/jsfns/core#deleteProperty) | [formatCurrency](https://tokimon.github.io/jsfns/core#formatCurrency) |
| [formatNumber](https://tokimon.github.io/jsfns/core#formatNumber) | [fuzzySearch](https://tokimon.github.io/jsfns/core#fuzzySearch) | [getProperty](https://tokimon.github.io/jsfns/core#getProperty) | [hash](https://tokimon.github.io/jsfns/core#hash) |
| [hexToNumber](https://tokimon.github.io/jsfns/core#hexToNumber) | [hexToRGB](https://tokimon.github.io/jsfns/core#hexToRGB) | [isBoolean](https://tokimon.github.io/jsfns/core#isBoolean) | [isEmpty](https://tokimon.github.io/jsfns/core#isEmpty) |
| [isFunction](https://tokimon.github.io/jsfns/core#isFunction) | [isGenerator](https://tokimon.github.io/jsfns/core#isGenerator) | [isNumber](https://tokimon.github.io/jsfns/core#isNumber) | [isNumeric](https://tokimon.github.io/jsfns/core#isNumeric) |
| [isObject](https://tokimon.github.io/jsfns/core#isObject) | [isObjectLike](https://tokimon.github.io/jsfns/core#isObjectLike) | [isString](https://tokimon.github.io/jsfns/core#isString) | [kebabCase](https://tokimon.github.io/jsfns/core#kebabCase) |
| [leadingZero](https://tokimon.github.io/jsfns/core#leadingZero) | [limitDecimals](https://tokimon.github.io/jsfns/core#limitDecimals) | [numberToHex](https://tokimon.github.io/jsfns/core#numberToHex) | [pascalCase](https://tokimon.github.io/jsfns/core#pascalCase) |
| [phrasify](https://tokimon.github.io/jsfns/core#phrasify) | [popAtIndex](https://tokimon.github.io/jsfns/core#popAtIndex) | [promisefy](https://tokimon.github.io/jsfns/core#promisefy) | [randomCryptoId](https://tokimon.github.io/jsfns/core#randomCryptoId) |
| [randomHexColor](https://tokimon.github.io/jsfns/core#randomHexColor) | [randomId](https://tokimon.github.io/jsfns/core#randomId) | [randomInt](https://tokimon.github.io/jsfns/core#randomInt) | [randomRGBColor](https://tokimon.github.io/jsfns/core#randomRGBColor) |
| [safeDateChange](https://tokimon.github.io/jsfns/core#safeDateChange) | [snakeCase](https://tokimon.github.io/jsfns/core#snakeCase) | [throttle](https://tokimon.github.io/jsfns/core#throttle) | [toWords](https://tokimon.github.io/jsfns/core#toWords) |
| [truncate](https://tokimon.github.io/jsfns/core#truncate) | [types](https://tokimon.github.io/jsfns/core#types) | [uniqueArray](https://tokimon.github.io/jsfns/core#uniqueArray) |


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
