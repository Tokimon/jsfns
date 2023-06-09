import pascalCase from '@js-fns/core/pascalCase';
import kebabCase from '@js-fns/core/kebabCase';



export type VendorPrefixing = {
  prefix: 'webkit' | 'moz' | 'ms' | 'o'
  js: string;
  css: string;
}



/**
 * Add vendor prefixes to a string
 *
 * @param str - String to add vendor prefixes to
 * @returns Array of the various vendor vendorPrefixed versions of the string
 */
export default function vendorPrefixed(str: string): VendorPrefixing[] {
  const pascalStr = pascalCase(`${str}`);
  const kebabCaseStr = kebabCase(str);

  return [
    { prefix: 'webkit', js: `webkit${pascalStr}`, css: `-webkit-${kebabCaseStr}` },
    { prefix: 'moz', js: `moz${pascalStr}`, css: `-moz-${kebabCaseStr}` },
    { prefix: 'ms', js: `ms${pascalStr}`, css: `-ms-${kebabCaseStr}` },
    { prefix: 'o', js: `o${pascalStr}`, css: `-o-${kebabCaseStr}` }
  ];
}
