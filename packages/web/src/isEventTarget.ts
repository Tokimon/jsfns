/**
 * Is the given object a viable event target (implements the addEventListener function)
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
export const isEventTarget = (obj: unknown): obj is EventTarget => obj instanceof EventTarget;

export default isEventTarget;
