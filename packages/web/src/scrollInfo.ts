import { isDOMElement } from './isDOMElement';
import type { GeneralWindow } from './types';
import { viewport } from './viewport';

/** The scroll information summary */
export type ScrollInfo = {
	/** The horizontal scroll position */
	x: number;
	/** The vertical scroll position */
	y: number;
	/** The maximum horizontal scroll position */
	xMax: number;
	/** The maximum vertical scroll position */
	yMax: number;
	/** The horizontal scroll percentage */
	xPct: number;
	/** The vertical scroll percentage */
	yPct: number;
};

/**
 * Gather the current scroll position information of a DOM element or the window
 *
 * @param elm - The element to find the scrolling position from
 * @returns The scroll information
 *
 * @example
 *
 * ```ts
 * scrollInfo(window)
 * scrollInfo(document)
 * scrollInfo(MyElm)
 * ```
 */
export function scrollInfo(elm: Element | GeneralWindow | Document = document): ScrollInfo {
	const _elm = !isDOMElement(elm) ? viewport(elm) : elm;

	const info = { x: 0, y: 0, xMax: 0, yMax: 0, xPct: 0, yPct: 0 };

	info.x = _elm.scrollLeft;
	info.y = _elm.scrollTop;

	info.xMax = Math.max(_elm.scrollWidth - _elm.clientWidth, 0);
	info.yMax = Math.max(_elm.scrollHeight - _elm.clientHeight, 0);

	if (info.xMax) info.xPct = info.x / info.xMax;
	if (info.yMax) info.yPct = info.y / info.yMax;

	return info;
}

export default scrollInfo;
