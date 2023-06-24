import { vendorPrefixed } from './vendorPrefixed';

export type PrefixedPropMatch = {
  prefix: string;
  jsProp: string;
  cssProp: string;
  value?: string;
};

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
export function supportsCSS(prop: string, value: string): PrefixedPropMatch | boolean {
  // Testing prefixed values
  const props = vendorPrefixed(prop);
  const values = vendorPrefixed(value);

  // Property (+ value) is supported natively as is
  if (CSS.supports(props[0].js, values[0].css)) return true;

  for (let i = 1; i < props.length; i++) {
    const { prefix, js, css } = props[i];
    const prefixedProp = js;
    const prefixedValue = values[i].css;

    // Prefixed prop
    if (CSS.supports(prefixedProp, value)) return { prefix, jsProp: prefixedProp, cssProp: css, value };

    // Prefixed value
    if (CSS.supports(prop, prefixedValue)) return { prefix, jsProp: prop, cssProp: css, value: prefixedValue };

    // Prefixed prop and value
    if (CSS.supports(prefixedProp, prefixedValue)) return { prefix, jsProp: prefixedProp, cssProp: css, value: prefixedValue };
  }

  // No prefix support has been found
  return false;
}

export default supportsCSS;
