/**
 * Is the given object a viable event target (implements the `addEventListener`
 * and `removeEventListener` functions — the methods `on` and `off` rely on)
 *
 * @param obj - The object to check
 * @returns Is it an Event Target or not
 *
 * @example
 *
 * ```ts
 * isEventTarget(window) // --> true
 * isEventTarget(document) // --> true
 * isEventTarget(document.documentElement) // --> true
 * isEventTarget(document.body) // --> true
 * isEventTarget(new XMLHttpRequest()) // --> true
 *
 * isEventTarget({}) // --> false
 * ```
 */
export const isEventTarget = (obj: unknown): obj is EventTarget =>
	obj instanceof EventTarget ||
	(obj != null &&
		typeof (obj as EventTarget).addEventListener === 'function' &&
		typeof (obj as EventTarget).removeEventListener === 'function');

export default isEventTarget;
