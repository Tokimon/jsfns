import type { CSSStyleKey } from './types';

import vendorPrefixed from './vendorPrefixed';



let div: HTMLDivElement;



export type PrefixedPropMatch = {
  prefix: string;
  jsProp: string;
  cssProp: string;
  value?: string;
}



export function supportsProp(prop: CSSStyleKey, value?: string): boolean {
  if (!div) { div = document.createElement('div'); }
  if (typeof div.style[prop] === 'undefined') return false;
  if (!value) return true;

  div.style[prop] = value;
  return div.style[prop] === value;
}



/**
 * Detect wether or not the given css property (and/or) value is supported by
 * the current browser
 *
 * @param prop    - Property to test
 * @param value   - Value to test with the property
 * @returns Returns object if property is supported with prefix, otherwise a boolean is returned
 *
 * @example
 *
 * ```ts
 * supportsCSS('appearance') // --> true
 * supportsCSS('text-align-last') // --> false
 *
 * supportsCSS('user-drag', 'element')
 * // --> { prefix: 'webkit', jsProp: 'webkitUserDrag', cssProp: '-webkit-user-drag', value: 'element' }
 * ```
 */
export function supportsCSS(prop: CSSStyleKey, value?: string): PrefixedPropMatch | boolean {
  // Testing prefixed values
  const props = vendorPrefixed(prop);
  const values = value ? vendorPrefixed(value) : undefined;

  // Property (+ value) is supported natively as is
  if (supportsProp(props[0].js, values?.[0].css)) return true;

  for (let i = 1; i < props.length; i++) {
    const { prefix, js, css } = props[i];
    const prefixedProp = js as CSSStyleKey;
    const prefixedValue = values?.[i].css;

    // Prefixed prop
    if (supportsProp(prefixedProp, value)) return { prefix, jsProp: prefixedProp, cssProp: css, value };

    // Prefixed value
    if (prefixedValue && supportsProp(prop, prefixedValue)) return { prefix, jsProp: prop, cssProp: css, value: prefixedValue };

    // Prefixed prop and value
    if (supportsProp(prefixedProp, prefixedValue)) return { prefix, jsProp: prefixedProp, cssProp: css, value: prefixedValue };
  }

  // No prefix support has been found
  return false;
}

export default supportsCSS;
