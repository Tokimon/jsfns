# @js-fns/web

## [@js-fns/web Docs](https://tokimon.github.io/js-fns/web)

This is a collection of simple, no dependency, JavaScript snippets with the aim
of making it easier to work with vanilla JavaScript in the browser.

All helpers are written in TypeScript and converted into various JS versions suiting your use case:

- `.js`: ES 6 syntax.
- `.mjs`: ES 2022 syntax
- `.cjs`: ES 6 syntax + CommonJS `require` imports
- `.d.ts`: TypeScript description files

## Environment agnostic helpers

Searching for more basic, environment agnostic JavaScript methods? Check out: [@js-fns/core](https://tokimon.github.io/js-fns/core)

## ES version support

All methods are using latest techniques and generally no efforts have been made to
accommodate older browsers which do not support certain features. Polyfills should
be used to fill the gap. This is intentional as the need for polyfills are ever
diminishing, with modern browsers (and Node environments) getting updated all the time the vast
majority of the methods will be supported at one point. Also, with compilers like Babel,
polyfills can be included automatically in the build process, making it simple to ensure full support.
Therefore it is more future proof and clutter free to leave fallbacks and polyfills out of
the methods and just focus on core functionality.

**Note**  
You will have to add these snippets as part of your transpilation if you wish to have
enable auto detection of polyfills.

## Installation

```
npm i @js-fns/web
```

```
yarn add @js-fns/web
```

```
pnpm i @js-fns/web
```

## Usage

```js
// JS + MJS Modules
import { append } from '@js-fns/web/append';
append(document.body, '<span>Appended content</span>');
```

```js
// CommonJS Require Modules
const { append } = require('@js-fns/web/append');
append(document.body, '<span>Appended content</span>');
```

## Something missing?

If you have any questions, find any bugs or have ideas for missing functionality you would like to see included, feel
free to add an issue in the [issue list](https://github.com/Tokimon/js-fns/issues) or perhaps do a
[Pull Request](https://github.com/Tokimon/js-fns/pulls) of a great snippet you created.
