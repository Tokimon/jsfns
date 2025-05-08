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
export function addClass(elm: Element | null, classNames: string | string[]): typeof elm {
	if (!elm) return null;

	const cns = !Array.isArray(classNames) ? [classNames] : classNames;
	elm.classList.add(...cns);

	return elm;
}

export default addClass;
