/**
 * Get/set the value of an attribute on a given DOM element
 *
 * @param elm - The DOM element to fetch/set the attribute from
 * @param attrName - Name of the attribute to handle
 * @param value - Value to insert into the attribute
 * @returns Data found in the attribute (the old value if {value} is defined)
 *
 * @example
 *
 * ```ts
 * // Get the value of an attribute
 * attr(document.documentElement, 'lang'); // --> eg. 'en-US'
 *
 * // Set the value of an attribute
 * attr(document.documentElement, 'lang', 'da-DK'); // --> <html lang="da-DK">
 *
 * // Set a boolean value
 * attr(MyInput, readonly, true); // --> <input readonly />
 * attr(MyInput, readonly, false); // --> <input />
 * ```
 */
export function attr(elm: Element, attrName: string, value?: string | number | boolean | null): string | null {
  const currVal = elm.getAttribute(attrName);

  if (value === false || value === null) elm.removeAttribute(attrName);
  else if (value !== undefined) elm.setAttribute(attrName, value === true ? '' : String(value));

  return currVal;
}

export default attr;
