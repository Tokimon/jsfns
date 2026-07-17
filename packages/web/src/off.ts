import type { NotFirst } from '@jsfns/core/types.js';
import { isEventTarget } from './isEventTarget.js';
import type { EventHandler, EventName } from './types.js';

type Args<E extends EventName = EventName> = [
	elm: EventTarget,
	eventNames: E | E[],
	handler: EventHandler<E>,
	options?: AddEventListenerOptions,
];

/**
 * Remove an event handler for one or more event names from a given DOM element.
 *
 * @param elm - DOM element to remove the event from
 * @param eventNames - Event names to remove the handler from
 * @param handler - Handler to remove from the event
 * @param options - Options to pass to the 'removeEventListener'
 * @typeParam E - The inferred event name(s)
 * @returns `elm`
 *
 * @example
 *
 * ```ts
 * off(MyElm, 'click', () => {})
 * off(MyElm, 'click', () => {}, { passive: true })
 * off(MyElm, ['mouseenter', 'touchstart'], () => {})
 * ```
 */
function off<T extends EventTarget, E extends EventName>(
	elm: T,
	eventNames: E | E[],
	handler: EventHandler<E>,
	options?: AddEventListenerOptions,
): T;

/**
 * Remove an event handler for one or more event names from `document`
 *
 * @param eventNames - Event names to remove the handler from
 * @param handler - Handler to remove from the event
 * @param options - Options to pass to the 'removeEventListener'
 * @typeParam E - The inferred event name(s)
 * @return document
 *
 * @example
 *
 * ```ts
 * off('click', () => {})
 * off('click', () => {}, { passive: true })
 * off(['mouseenter', 'touchstart'], () => {})
 * ```
 */
function off<E extends EventName>(
	eventNames: E | E[],
	handler: EventHandler<E>,
	options?: AddEventListenerOptions,
): Document;

function off<E extends EventName>(...args: Args<E> | NotFirst<Args<E>>): EventTarget {
	const [elm, eventNames, handler, options] = (
		isEventTarget(args[0]) ? args : [document, ...args]
	) as Args<E>;

	const evts = !Array.isArray(eventNames) ? [eventNames] : eventNames;

	for (const evt of evts) elm.removeEventListener(evt, handler as EventListener, options);

	return elm;
}

export { off };
export default off;
