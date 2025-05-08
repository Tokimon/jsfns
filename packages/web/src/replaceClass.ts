import { addClass } from './addClass';
import { removeClass } from './removeClass';

/**
 * Replaces css class with another on a DOM element.
 *
 * @param elm - HTML ELement to remove class names from
 * @param classNames - Class names to remove
 * @returns Returns element given in 'elm'
 *
 * @example
 *
 * ```ts
 * // <div class="active open" />
 * replaceClass(MyNode, 'active', 'inactive') // --> <div class="inactive open" />
 * replaceClass(MyNode, ['active', 'open'], ['inactive', 'closed']) // --> <div class="inactive closed" />
 * replaceClass(MyNode, 'active', ['inactive', 'removed']) // --> <div class="inactive removed open" />
 * ```
 */
export function replaceClass(
	elm: Element | null,
	classNames: string | string[],
	replacements: string | string[],
) {
	return addClass(removeClass(elm, classNames), replacements);
}

export default replaceClass;
