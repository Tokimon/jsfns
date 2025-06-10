import { isNumeric } from "@jsfns/core/isNumeric";
import { isString } from "@jsfns/core/isString";
import { kebabCase } from "@jsfns/core/kebabCase";

/** Convert camelCase property name to kebab-case */
export type CamelToKebab<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
    ? `${Lowercase<T>}${CamelToKebab<U>}`
    : `${Lowercase<T>}-${CamelToKebab<U>}`
  : S;

/** The CSSStyle property names */
export type CSSStyleDeclarationKeys = {
  [K in keyof CSSStyleDeclaration]: CSSStyleDeclaration[K] extends (
    ...args: unknown[]
  ) => unknown
    ? never
    : K;
}[keyof CSSStyleDeclaration];

/** The CSSStyle property names in kebab-case */
export type KebabCaseCSSStyleDeclarationKeys = {
  [K in CSSStyleDeclarationKeys as K extends string
    ? CamelToKebab<K>
    : never]?: string | number;
};

/** The CSSStyle property names in camelCase */
export type CamelCaseCSSStyleDeclarationKeys = {
  [K in CSSStyleDeclarationKeys as K extends string ? K : never]?:
    | string
    | number;
};

/** All valid CSS properties */
export type CSSStyleProperties = CamelCaseCSSStyleDeclarationKeys &
  KebabCaseCSSStyleDeclarationKeys;

/** A valid CSS property */
export type CSSProperty = keyof CSSStyleProperties;

function normalizePropName(prop: CSSProperty) {
  return (
    prop.includes("-") ? prop : kebabCase(prop)
  ) as keyof KebabCaseCSSStyleDeclarationKeys;
}

function applyValue(
  elm: HTMLElement,
  property: CSSProperty,
  value: string | number | null,
  important: boolean,
) {
  const prop = normalizePropName(property);
  const val = value != null ? String(value) : "";
  const imp = important ? "important" : undefined;

  elm.style.setProperty(prop, val, imp);

  // This part here is for when the value is a number,
  // but the property can't accept just a numeric value,
  // so "px" has to be added
  if (isNumeric(val) && elm.style.getPropertyValue(prop) !== val) {
    applyValue(elm, prop, val + "px", important);
  }
}

function setValue(
  elm: HTMLElement,
  property: CSSProperty,
  value: string | number | null,
): void {
  let important = false;
  let val = value;

  if (isString(val) && val.includes("!important")) {
    val = val.split(" ")[0];
    important = true;
  }

  applyValue(elm, property, val, important);
}

/**
 * Get a given style property.
 * if value is set (not undefined), it will be set before returning
 */
function handleSingleValue(
  elm: HTMLElement,
  property: CSSProperty,
  value?: string | number | null,
) {
  if (value !== undefined) {
    setValue(elm, property, value);
    return window.getComputedStyle(elm);
  }

  // Get all computed styles as that gives a more correct value
  const val = window
    .getComputedStyle(elm)
    .getPropertyValue(normalizePropName(property));

  // Ensure to return a numeric value if possible
  const numeric = Number.parseFloat(val);
  return !Number.isNaN(numeric) ? numeric : val;
}

/**
 * Traverse the `propertyMap` and set style on element accordingly
 */
function handleMultipleValues(
  elm: HTMLElement,
  properties?: CSSStyleProperties,
): CSSStyleDeclaration {
  if (properties) {
    for (const [key, value] of Object.entries(properties)) {
      value && setValue(elm, key as CSSProperty, value);
    }
  }

  return window.getComputedStyle(elm);
}

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
function css(
  elm: HTMLElement,
  property: string,
  value: string | number | null,
): CSSStyleDeclaration;

function css(
  elm: HTMLElement,
  property?: CSSProperty | CSSStyleProperties,
  value?: string | number | null,
): CSSStyleDeclaration | string | number | null {
  return isString(property)
    ? handleSingleValue(elm, property, value)
    : handleMultipleValues(elm, property);
}

export { css };
export default css;
