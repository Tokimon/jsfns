# @jsfns/web

<a href="https://tokimon.github.io/jsfns/web" target="__blank" style="font-size: 50px; display: block; text-align: center;">@jsfns/web documentation</a>

This is a collection of simple, no dependency, JavaScript snippets with the aim
of making it easier to work with vanilla JavaScript in the browser.

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
