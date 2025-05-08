import type { GeneralWindow } from './types';

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
export const isWindow = (obj: unknown): obj is GeneralWindow =>
	obj instanceof Window || Object.prototype.toString.call(obj).includes('object Window');

export default isWindow;
