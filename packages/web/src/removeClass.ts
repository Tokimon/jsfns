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
export function removeClass<T extends Element>(elm: T | null, classNames: string | string[]): T | null {
  if (!elm) return null;

  if (!Array.isArray(classNames)) classNames = [classNames];

  elm.classList.remove(...classNames);

  return elm;
}

export default removeClass;
