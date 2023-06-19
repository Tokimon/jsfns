/**
 * Adds one or multiple class names to a DOM element
 *
 * @param elm - HTML ELement to add class names to
 * @param classNames - Class name(s) to add
 * @returns The given `elm`
 *
 * @example
 *
 * ```ts
 * addClass(MyNode, 'active') // --> <div class="active" />
 * addClass(MyNode, ['active', 'open']) // --> <div class="active open" />
 * ```
 */
export function addClass(elm: Element, classNames: string | string[]): Element {
  if (!Array.isArray(classNames)) classNames = [classNames];

  elm.classList.add(...classNames);

  return elm;
}

export default addClass;
