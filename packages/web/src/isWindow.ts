import { getObjectName } from '@jsfns/core/getObjectName.js';
import type { GeneralWindow } from './types.ts';

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
	return obj instanceof Window || getObjectName(obj) === 'Window';
}

export default isWindow;
