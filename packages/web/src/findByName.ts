import findUniqueNodeCollection from './findUniqueNodeCollection';



const byName = (name: string) => document.getElementsByName(name);



/**
 * Find DOM elements with the given name
 *
 * @param names - Value of name attribute to find the elements by
 * @returns List of found DOM elements
 *
 * @example
 *
 * ```ts
 * findByName('my-element-name') // --> all "[name=my-element-name]" elements
 * findByName(['my-element-name', 'my-second-name']) // --> all "[name=my-element-name]" and "[name=my-second-name]" elements
 * ```
 */
export default function findByName(names: string | string[]): Element[] {
  return findUniqueNodeCollection(names, byName);
}
