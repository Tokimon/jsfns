import { kebabCase } from "@jsfns/core/kebabCase";
import { pascalCase } from "@jsfns/core/pascalCase";

/** No prefix */
export type VendorNone = {
  /** No prefix needed */
  prefix: "";
  /** JS method without prefix */
  js: string;
  /** CSS property without prefix */
  css: string;
};

/** WebKit vendor prefix */
export type VendorWebkit = {
  /** The webkit prefix name */
  prefix: "webkit";
  /** The webkit prefix for JS methods */
  js: `webkit${string}`;
  /** The webkit prefix for CSS properties */
  css: `-webkit-${string}`;
};

/** Mozilla vendor prefix */
export type VendorMozilla = {
  /** The mozilla prefix name */
  prefix: "moz";
  /** The mozilla prefix for JS methods */
  js: `moz${string}`;
  /** The mozilla prefix for CSS properties */
  css: `-moz-${string}`;
};

/** Microsoft vendor prefix */
export type VendorMicrosoft = {
  /** The microsoft prefix name */
  prefix: "ms";
  /** The microsoft prefix for JS methods */
  js: `ms${string}`;
  /** The microsoft prefix for CSS properties */
  css: `-ms-${string}`;
};

/** Opera vendor prefix */
export type VendorOpera = {
  /** The opera prefix name */
  prefix: "o";
  /** The opera prefix for JS methods */
  js: `o${string}`;
  /** The opera prefix for CSS properties */
  css: `-o-${string}`;
};

/**
 * A tuple containing all known vendor-prefixed variants for a given property name.
 * Ordered as: '', 'webkit', 'moz', 'ms', 'o'
 */
export type VendorPrefixing = [
  VendorNone,
  VendorWebkit,
  VendorMozilla,
  VendorMicrosoft,
  VendorOpera,
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
    { prefix: "", js: pascalStr, css: kebabCaseStr },
    {
      prefix: "webkit",
      js: `webkit${pascalStr}`,
      css: `-webkit-${kebabCaseStr}`,
    },
    { prefix: "moz", js: `moz${pascalStr}`, css: `-moz-${kebabCaseStr}` },
    { prefix: "ms", js: `ms${pascalStr}`, css: `-ms-${kebabCaseStr}` },
    { prefix: "o", js: `o${pascalStr}`, css: `-o-${kebabCaseStr}` },
  ];
}

export default vendorPrefixed;
