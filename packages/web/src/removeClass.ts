/**
 * Remove one or multiple class names from a DOM element
 *
 * @param elm - HTML ELement to remove class names from
 * @param classNames - Class names to remove
 * @returns Returns element given in 'elm'
 *
 * @example
 *
 * ```ts
 * // <div class="active open" />
 * removeClass(MyNode, 'active') // --> <div class="open" />
 * removeClass(MyNode, ['active', 'open']) // --> <div class="" />
 * ```
 */
export default function removeClass(elm: Element, classNames: string | string[]): Element {
  if (!Array.isArray(classNames)) classNames = [classNames];

  elm.classList.remove(...classNames);

  return elm;
}
