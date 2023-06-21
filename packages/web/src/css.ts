import isString from '@js-fns/core/isString';
import kebabCase from '@js-fns/core/kebabCase';

export type CSSStyleProperties = Record<string, string | number | null | undefined>;

const applyValue = (elm: HTMLElement, property: string, value: string | number | null, important: boolean) => {
  property = kebabCase(property);
  const val = value != null ? String(value) : '';
  const imp = important ? 'important' : undefined;

  elm.style.setProperty(property, val, imp);

  // This part here is for when the value is a number,
  // but the property can't accept just a numeric value,
  // so "px" has to be added
  if (!Number.isNaN(Number(val)) && elm.style.getPropertyValue(property) !== val) {
    applyValue(elm, property, val + 'px', important);
  }
};

const setValue = (elm: HTMLElement, property: string, value: string | number | null): void => {
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
const handleSingleValue = (elm: HTMLElement, property: string, value?: string | number | null) => {
  if (value !== undefined) {
    setValue(elm, property, value);
    return window.getComputedStyle(elm);
  }

  // Get all computed styles as that gives a more correct value
  const val = window.getComputedStyle(elm).getPropertyValue(kebabCase(property));

  // Ensure to return a numeric value if possible
  const numeric = parseFloat(val);
  return !Number.isNaN(numeric) ? numeric : val;
};

/**
 * Traverse the `propertyMap` and set style on element accordingly
 */
const handleMultipleValues = (elm: HTMLElement, properties?: CSSStyleProperties): CSSStyleDeclaration => {
  if (properties) {
    Object.entries(properties).forEach(([key, value]) => {
      value && setValue(elm, key, value);
    });
  }

  return window.getComputedStyle(elm);
};

/**
 * Get the computed styling of a DOM element.
 *
 * @param elm - DOM element to set the style of
 * @returns All styling on the element
 *
 * @example
 *
 * ```ts
 * css(MyElm) // --> All computed styles of MyElm
 * ```
 */
function css(elm: HTMLElement): CSSStyleDeclaration;

/**
 * Gets a given inline style property on a DOM element.
 * Return values that are pure numbers or pixel values will be converted to pure number first
 *
 * @param elm - DOM element to get/set the style on
 * @param property - Style property name
 * @returns All styling on the element or the value of the given style property
 *
 * @example
 *
 * ```ts
 * css(MyElm, 'font-size') // --> 30
 * css(MyElm, 'borderSize') // --> '1px'
 * ```
 */
function css(elm: HTMLElement, property: string): string | number | null;

/**
 * Set multiple inline styling properties on a DOM element.
 *
 * Notes on values:
 * - `null` as value, removes the given property
 * - `!important` in the value will be parsed and set correctly (eg. font-size: 15px !important)
 *
 * @param elm - DOM element to set the style on
 * @param styles - Styling to set on the element
 * @returns All styling on the element
 *
 * @example
 *
 * ```ts
 * css(MyElm, { fontSize: 30, 'font-weight': 'bold !important' }) // --> All computed styles of MyElm
 * ```
 */
function css(elm: HTMLElement, styles: CSSStyleProperties): CSSStyleDeclaration;

/**
 * Set a given inline style property on a DOM element.
 *
 * Notes on values:
 * - `null` removes the given property
 * - `!important` added to the value, it will be parsed and set correctly
 *
 * @param elm - DOM element to get/set the style on
 * @param property - Style property name
 * @param value - The new value
 * @returns All styling on the element or the value of the given style property
 *
 * @example
 *
 * ```ts
 * css(MyElm, 'fontSize', 30) // --> All computed styles of MyElm
 * ```
 */
function css(elm: HTMLElement, property: string, value: NonNullable<CSSStyleProperties[string]>): CSSStyleDeclaration;

function css(
  elm: HTMLElement,
  property?: string | CSSStyleProperties,
  value?: string | number | null
): CSSStyleDeclaration | string | number | null {
  return isString(property) ? handleSingleValue(elm, property, value) : handleMultipleValues(elm, property);
}

export { css };
export default css;
