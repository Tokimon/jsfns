/**
 * Find the children of a given DOM element and return it as an Array
 *
 * @param elm - DOM element to find children from
 * @returns List of found child DOM elements
 *
 * @example
 *
 * ```ts
 * children(someDiv);
 * ```
 */
export const children = (elm: ParentNode): Element[] => Array.from(elm.children);

export default children;
