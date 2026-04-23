import type { GeneralWindow } from './types.js';

/**
 * Is the given object a Window object (eg. window or IFrame.contentWindow)
 *
 * @param obj - The object to check
 * @returns Is it a Window object or not
 *
 * @example
 *
 * ```ts
 * isWindow(window) // --> true
 *
 * isWindow(document) // --> false
 * isWindow(document.body) // --> false
 * ```
 */
export function isWindow(obj: unknown): obj is GeneralWindow {
	return obj instanceof Window || Object.prototype.toString.call(obj).includes('object Window');
}

export default isWindow;
