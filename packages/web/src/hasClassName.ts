/**
 * Does all (or any) of the listed class names exist in the DOM elements list of class names
 *
 * @param elm - DOM element to test
 * @param classNames - Class names to test
 * @param any - Test if at least one class name exist
 * @returns All/any class names listed were found in the elements list of class names
 *
 * @example
 *
 * ```ts
 * hasClass(myElm, 'open') // --> true if myElm has the "open" class name
 * hasClass(myElm, ['open', 'shown']) // -> true if myElm has some or all given class names
 * hasClass(myElm, ['open', 'shown'], true) // -> true if myElm has all given class names
 * ```
 */
export function hasClassName(elm: Element, classNames: string | string[], any?: boolean): boolean {
  const checkFn = any ? 'some' : 'every';
  const cns = !Array.isArray(classNames) ? [classNames] : classNames;

  return cns[checkFn]((cn) => elm.classList.contains(cn));
}

export default hasClassName;

/**
 * Does any of the listed class names exist in the DOM elements list of class names
 *
 * @param elm - DOM element to test
 * @param classNames - Class names to test
 * @returns At least one of the class names listed were found in the elements list of class names
 *
 * @example
 *
 * ```ts
 * hasAnyClassName(myElm, 'open') // --> true if myElm has the "open" class name
 * hasAnyClassName(myElm, ['open', 'shown']) // -> true if myElm has at least one of the given class names
 * ```
 */
export function hasAnyClassName(elm: Element, classNames: string | string[]): boolean {
  return hasClassName(elm, classNames, true);
}

/**
 * Does all of the listed class names exist in the DOM elements list of class names
 *
 * @param elm - DOM element to test
 * @param classNames - Class names to test
 * @returns All of the class names listed were found in the elements list of class names
 *
 * @example
 *
 * ```ts
 * hasAllClassNames(myElm, 'open') // --> true if myElm has the "open" class name
 * hasAllClassNames(myElm, ['open', 'shown']) // -> true if myElm has all given class names
 * ```
 */
export function hasAllClassNames(elm: Element, classNames: string | string[]): boolean {
  return hasClassName(elm, classNames, false);
}
