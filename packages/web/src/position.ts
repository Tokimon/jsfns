/** Position description of a DOM element */
export type Position = {
	/** Number of pixels from the top */
	top: number;
	/** Number of pixels from the left */
	left: number;
	/** Number of pixels from the left to the right side of the element */
	right: number;
	/** Number of pixels from the top to the bottom side of the element */
	bottom: number;
};

const zeroPosition = (): Position => ({ top: 0, left: 0, right: 0, bottom: 0 });

function absoluteOffset(
	elm: HTMLElement | null,
	attr: 'offsetTop' | 'offsetLeft',
	accumulatedPosition = 0,
): number {
	if (!elm) return accumulatedPosition;
	return absoluteOffset(elm.offsetParent as HTMLElement, attr, accumulatedPosition + elm[attr]);
}

function createPosition(elm: HTMLElement, top: number, left: number): Position {
	const right = left + elm.offsetWidth;
	const bottom = top + elm.offsetHeight;

	return { top, left, right, bottom };
}

/**
 * Get the position of a DOM element relative to the document
 *
 * @param elm - The DOM element to find the position of
 * @returns the absolute position of the element (a 0 position if `elm` is `null`)
 *
 * @example
 *
 * ```ts
 * // Returns a 0 position
 * positionAbsolute(null);
 *
 * // Get the position of a given element
 * positionAbsolute(MyElm);
 * ```
 */
export function positionAbsolute(elm: HTMLElement | null): Position {
	if (!elm) return zeroPosition();
	return createPosition(elm, absoluteOffset(elm, 'offsetTop'), absoluteOffset(elm, 'offsetLeft'));
}

/**
 * Get the position of a DOM element relative to its offset parent
 *
 * @param elm - The DOM element to find the position of
 * @returns the position relative to the offset parent (a 0 position if `elm` is `null`)
 *
 * @example
 *
 * ```ts
 * // Returns a 0 position
 * positionRelative(null);
 *
 * // Get the position of a given element compared to its offset parent
 * positionRelative(MyElm);
 * ```
 */
export function positionRelative(elm: HTMLElement | null): Position {
	if (!elm) return zeroPosition();
	return createPosition(elm, elm.offsetTop, elm.offsetLeft);
}

/**
 * Get the position of a DOM element relative to another DOM element
 *
 * @param elm - The DOM element to find the position of
 * @param target - The DOM element to measure the position from (`null` gives the absolute position). Scroll offsets are not taken into account.
 * @returns the position of `elm` relative to `target` (a 0 position if `elm` is `null`)
 *
 * @example
 *
 * ```ts
 * // Position of MyElm compared to OtherElm
 * positionRelativeTo(MyElm, OtherElm);
 *
 * // Position of MyElm compared to its scroll parent
 * positionRelativeTo(MyElm, scrollParent(MyElm));
 * ```
 */
export function positionRelativeTo(elm: HTMLElement | null, target: Element | null): Position {
	if (!elm) return zeroPosition();

	const targetElm = target as HTMLElement | null;

	return createPosition(
		elm,
		absoluteOffset(elm, 'offsetTop') - absoluteOffset(targetElm, 'offsetTop'),
		absoluteOffset(elm, 'offsetLeft') - absoluteOffset(targetElm, 'offsetLeft'),
	);
}
