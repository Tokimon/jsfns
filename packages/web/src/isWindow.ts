import type { GeneralWindow } from './types';



/**
 * Is the given object a Window object
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
export default function isWindow(obj: unknown): obj is GeneralWindow {
  return obj instanceof Window && typeof (obj as GeneralWindow).self !== 'undefined';
}
