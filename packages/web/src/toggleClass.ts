/**
 * Toggles (add/remove) one or multiple class names on a DOM element
 *
 * @param elm - DOM element to toggle class names from
 * @param classNames - Class names to toggle
 * @param force - Force to add/remove the given class names (true = add, false = remove)
 * @returns The given `elm`
 *
 * @example
 *
 * ```ts
 * // <div class="active open" />
 * toggleClass(MyNode, 'active') // --> <div class="open" />
 * toggleClass(MyNode, ['active', 'open']) // --> <div class="active" />
 *
 * // <div class="active open" />
 * toggleClass(MyNode, 'active', true) // --> <div class="active open" />
 * toggleClass(MyNode, 'active', false) // --> <div class="open" />
 * ```
 */
export function toggleClass(
	elm: Element | null,
	classNames: string | string[],
	force?: boolean,
): typeof elm {
	if (!elm) return null;

	const cns = !Array.isArray(classNames) ? [classNames] : classNames;

	for (const cn of cns) elm.classList.toggle(cn, force);

	return elm;
}

export default toggleClass;
