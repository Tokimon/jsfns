import type { CSSStyleKey } from './types';

import isString from '@js-fns/core/isString';
import kebabCase from '@js-fns/core/kebabCase';



export type CSSStyleProperties = { [key in CSSStyleKey]?: string | number | null };



const applyValue = (
  elm: HTMLElement,
  property: CSSStyleKey,
  value: string | number | null,
  important: boolean
) => {
  const val = value != null ? String(value) : '';

  if (important) {
    const imp = important ? 'important' : undefined;
    elm.style.setProperty(kebabCase(property), val, imp);
  } else {
    elm.style[property] = val;
  }

  // This part here is for when the value is a number,
  // but the property can't accept just a numeric value,
  // so "px" has to be added
  if (!Number.isNaN(Number(val)) && elm.style[property] !== val) {
    applyValue(elm, property, value + 'px', important);
  }
};

const setValue = (
  elm: HTMLElement,
  property: CSSStyleKey,
  value: string | number | null
): void => {
  let important = false;

  if (isString(value) && value.includes('!important')) {
    value = value.split(' ')[0];
    important = true;
  }

  applyValue(elm, property, value, important);
};

/**
 * Get a given style property.
 * if value is set (not undefined), it will be set before returning
 */
const handleSingleValue = (
  elm: HTMLElement,
  property: CSSStyleKey,
  value?: string | number | null
) => {
  if (value !== undefined) {
    setValue(elm, property, value);
    return window.getComputedStyle(elm);
  }

  // Get all computed styles as that gives a more correct value
  const val = window.getComputedStyle(elm)
    .getPropertyValue(kebabCase(property));

  // Ensure to return a numeric value if possible
  const numeric = parseFloat(val);
  return !Number.isNaN(numeric) ? numeric : val;
};

/**
 * Traverse the `propertyMap` and set style on element accordingly
 */
const handleMultipleValues = (
  elm: HTMLElement,
  properties?: CSSStyleProperties
): CSSStyleDeclaration => {
  if (properties) {
    (Object.entries(properties) as [CSSStyleKey, typeof properties[CSSStyleKey]][])
      .forEach(([key, value]) => {
        value && setValue(elm, key, value);
      });
  }

  return window.getComputedStyle(elm);
};


/**
 * Set multiple inline styling properties on a DOM element.
 *
 * - `null` as value, removes the given property
 * - `!important` in the value will be parsed and set correctly
 *
 * @param elm - DOM element to set the style on
 * @param style - Styling to set on the element
 * @returns All styling on the element
 *
 * @example
 *
 * ```ts
 * css(MyElm, { fontSize: 30, fontWeight: 'bold !important' }) // --> All computed styles of MyElm
 * ```
 */
function css(elm: HTMLElement, style?: CSSStyleProperties): CSSStyleDeclaration;

/**
 * Get or set an inline style property on a DOM element.
 *
 * - `null` removes the given property
 * - `!important` added to the value, it will be parsed and set correctly
 * - Values that are pure numbers or pixel values will be converted to number before returned
 *
 * @param elm - DOM element to get/set the style on
 * @param style - Style property name
 * @param value - The new value
 * @returns All styling on the element or the value of the given style property
 *
 * @example
 *
 * ```ts
 * css(MyElm, 'fontSize', 30) // --> All computed styles of MyElm
 * css(MyElm, 'fontSize') // --> 30
 * css(MyElm, 'borderSize') // --> '1px'
 * ```
 */
function css(elm: HTMLElement, property: CSSStyleKey, value?: string | number): string | number | null | CSSStyleDeclaration;

function css(
  elm: HTMLElement,
  property?: CSSStyleKey | CSSStyleProperties,
  value?: string | number | null
): CSSStyleDeclaration | string | number | null {
  return isString(property)
    ? handleSingleValue(elm, property, value)
    : handleMultipleValues(elm, property);
}

export default css;
