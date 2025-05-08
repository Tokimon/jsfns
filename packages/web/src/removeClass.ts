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
export function removeClass(elm: Element | null, classNames: string | string[]): typeof elm {
	if (!elm) return null;

	const cns = !Array.isArray(classNames) ? [classNames] : classNames;

	elm.classList.remove(...cns);

	return elm;
}

export default removeClass;
