import { kebabCase } from '@jsfns/core/kebabCase';
import { pascalCase } from '@jsfns/core/pascalCase';

export type VendorPrefixing = [
  { prefix: ''; js: string; css: string },
  { prefix: 'webkit'; js: `webkit${string}`; css: `-webkit-${string}` },
  { prefix: 'moz'; js: `moz${string}`; css: `-moz-${string}` },
  { prefix: 'ms'; js: `ms${string}`; css: `-ms-${string}` },
  { prefix: 'o'; js: `o${string}`; css: `-o-${string}` }
];

/**
 * Add vendor prefixes to a string
 *
 * @param str - String to add vendor prefixes to
 * @returns Array of the various vendor vendorPrefixed versions of the string
 *
 * @example
 *
 * ```ts
 * vendorPrefixed('backface-visibility')
 * // [
 * //   { prefix: '', js: 'backfaceVisibility', css: 'backface-visibility' }
 * //   { prefix: 'webkit', js: 'webkitBackfaceVisibility', css: '-webkit-backface-visibility' }
 * //   { prefix: 'moz', js: 'mozBackfaceVisibility', css: '-moz-backface-visibility' }
 * //   { prefix: 'ms', js: 'msBackfaceVisibility', css: '-ms-backface-visibility' }
 * //   { prefix: 'o', js: 'oBackfaceVisibility', css: '-o-backface-visibility' }
 * // ]
 * ```
 */
export function vendorPrefixed(str: string): VendorPrefixing {
  const pascalStr = pascalCase(str);
  const kebabCaseStr = kebabCase(str);

  return [
    { prefix: '', js: pascalStr, css: kebabCaseStr },
    { prefix: 'webkit', js: `webkit${pascalStr}`, css: `-webkit-${kebabCaseStr}` },
    { prefix: 'moz', js: `moz${pascalStr}`, css: `-moz-${kebabCaseStr}` },
    { prefix: 'ms', js: `ms${pascalStr}`, css: `-ms-${kebabCaseStr}` },
    { prefix: 'o', js: `o${pascalStr}`, css: `-o-${kebabCaseStr}` },
  ];
}

export default vendorPrefixed;
