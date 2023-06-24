import { isDOMNode } from './isDOMNode';

/**
 * Make a unique list of Elements from on or multiple Element collections
 * (usually as a result of some element selection method)
 *
 * @returns The unique list of elements
 *
 * @example
 *
 * ```ts
 * const byClassName = (selector) => document.getElementsByClassName(selector)
 *
 * // Using a single selector
 * findUniqueNodeCollection('my-elements', byClassName);
 *
 * // Using multiple selectors
 * findUniqueNodeCollection(['.my-element', 'sone-other-elements'], byClassName);
 * ```
 */
export function uniqueNodeList(
  ...args: (Element | NodeListOf<Element> | HTMLAllCollection | HTMLCollectionOf<Element> | null)[]
): Element[] {
  const collection = new Set<Element>();

  for (const arg of args) {
    if (!arg) continue;

    if (isDOMNode(arg)) {
      collection.add(arg);
    } else {
      for (let i = 0; i < arg.length; i++) collection.add(arg[i]);
    }
  }

  return Array.from(collection);
}

export default uniqueNodeList;
